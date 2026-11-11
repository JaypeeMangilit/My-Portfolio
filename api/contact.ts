import type { VercelRequest, VercelResponse } from '@vercel/node'

interface ContactMessage {
  name: string
  email: string
  message: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/** Either a bare address or a display name wrapped around one. */
const SENDER_PATTERN = /^([^<>]*)<([^<>]+)>$/

/**
 * Resend only accepts "email@example.com" or "Name <email@example.com>".
 * Configuration values frequently arrive with stray whitespace, wrapping quotes,
 * exotic spaces, or the name and address swapped, so normalise the sender here
 * instead of forwarding a malformed value to the provider.
 */
function normalizeSender(value: string): string | null {
  const cleaned = value
    .replace(/[\u00a0\u2007\u202f]/g, ' ')
    .trim()
    .replace(/^["']+|["']+$/g, '')
    .trim()

  if (!cleaned) return null

  const match = SENDER_PATTERN.exec(cleaned)
  if (match) {
    const first = match[1].trim().replace(/^["']+|["']+$/g, '').trim()
    const second = match[2].trim()

    // "Name <email@example.com>"
    if (EMAIL_PATTERN.test(second)) {
      return first ? `${first} <${second}>` : second
    }

    // "email@example.com <Name>" — the two halves are the wrong way round.
    if (first && EMAIL_PATTERN.test(first)) {
      return second ? `${second} <${first}>` : first
    }

    return null
  }

  return EMAIL_PATTERN.test(cleaned) ? cleaned : null
}

/** Filled in only by bots — the field is hidden from real visitors. */
const HONEYPOT_FIELD = 'website'

/** Per-IP throttle: at most 5 messages every 15 minutes. */
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000

interface RateLimitEntry {
  count: number
  resetAt: number
}

// Serverless instances are ephemeral, so this map is per-instance and clears on
// cold starts. It deters casual abuse; use Vercel KV or Upstash for a strict,
// cross-instance limit.
const rateLimits = new Map<string, RateLimitEntry>()

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function clientIp(req: VercelRequest): string {
  const forwarded = req.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim()
  }
  const real = req.headers['x-real-ip']
  return typeof real === 'string' && real.length > 0 ? real : 'unknown'
}

/** Returns true while the client is still within the rate limit. */
function withinRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimits.get(ip)

  if (!entry || entry.resetAt <= now) {
    rateLimits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS })
    return true
  }

  if (entry.count >= RATE_LIMIT_MAX) return false

  entry.count += 1
  return true
}

function pruneRateLimits(): void {
  const now = Date.now()
  for (const [ip, entry] of rateLimits) {
    if (entry.resetAt <= now) rateLimits.delete(ip)
  }
}

function parseMessage(value: unknown): ContactMessage | null {
  if (!isRecord(value)) return null

  const { name, email, message } = value
  if (typeof name !== 'string' || typeof email !== 'string' || typeof message !== 'string') {
    return null
  }

  const normalized = {
    name: name.trim(),
    email: email.trim(),
    message: message.trim(),
  }

  if (
    !normalized.name ||
    normalized.name.length > 120 ||
    !EMAIL_PATTERN.test(normalized.email) ||
    normalized.email.length > 254 ||
    !normalized.message ||
    normalized.message.length > 5000
  ) {
    return null
  }

  return normalized
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const rawFrom = process.env.CONTACT_FROM_EMAIL ?? ''
  const from = normalizeSender(rawFrom)
  const to = process.env.CONTACT_TO_EMAIL?.trim() ?? ''

  if (!apiKey || !from || !EMAIL_PATTERN.test(to)) {
    console.error(
      'Contact email is not configured correctly. ' +
        `RESEND_API_KEY=${apiKey ? 'set' : 'missing'}, ` +
        `CONTACT_FROM_EMAIL=${JSON.stringify(rawFrom)} (expected "Name <email@example.com>"), ` +
        `CONTACT_TO_EMAIL=${JSON.stringify(to)}.`,
    )
    return res.status(503).json({ error: 'Email sending is not configured yet.' })
  }

  const ip = clientIp(req)
  if (!withinRateLimit(ip)) {
    return res.status(429).json({
      error: 'You are sending messages too quickly. Please wait a few minutes before trying again.',
    })
  }
  pruneRateLimits()

  const body = isRecord(req.body) ? req.body : {}

  // Honeypot: pretend the message went through so bots move on.
  if (typeof body[HONEYPOT_FIELD] === 'string' && body[HONEYPOT_FIELD].trim() !== '') {
    console.warn(`Honeypot triggered from ${ip}; message discarded.`)
    return res.status(200).json({ success: true })
  }

  const contact = parseMessage(body)
  if (!contact) {
    return res.status(400).json({ error: 'Please provide a valid name, email, and message.' })
  }

  const safeName = contact.name.replace(/[\r\n]+/g, ' ')
  let providerResponse: Response
  try {
    providerResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: contact.email,
        subject: `Portfolio inquiry from ${safeName}`,
        text: `${contact.message}\n\nFrom: ${safeName}\nReply to: ${contact.email}`,
      }),
    })
  } catch (error) {
    console.error('Could not reach the email provider.', error)
    return res.status(502).json({ error: 'The email service could not be reached. Please try again later.' })
  }

  if (!providerResponse.ok) {
    const detail = await providerResponse.text().catch(() => '')
    console.error('The email provider rejected a contact message.', providerResponse.status, detail)
    return res.status(502).json({ error: 'The email service could not send your message. Please try again later.' })
  }

  return res.status(200).json({ success: true })
}

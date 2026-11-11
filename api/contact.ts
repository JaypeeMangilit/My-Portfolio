import type { VercelRequest, VercelResponse } from '@vercel/node'

interface ContactMessage {
  name: string
  email: string
  message: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
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

  const contact = parseMessage(req.body)
  if (!contact) {
    return res.status(400).json({ error: 'Please provide a valid name, email, and message.' })
  }

  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.CONTACT_FROM_EMAIL
  const to = process.env.CONTACT_TO_EMAIL
  if (!apiKey || !from || !to) {
    console.error('Contact email is not configured. Set RESEND_API_KEY, CONTACT_FROM_EMAIL, and CONTACT_TO_EMAIL.')
    return res.status(503).json({ error: 'Email sending is not configured yet.' })
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
    console.error('The email provider rejected a contact message.', providerResponse.status)
    return res.status(502).json({ error: 'The email service could not send your message. Please try again later.' })
  }

  return res.status(200).json({ success: true })
}

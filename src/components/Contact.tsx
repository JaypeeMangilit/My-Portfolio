import { useState, type FormEvent } from 'react'
import { AlertCircle, CheckCircle2, Facebook, Mail, MapPin, Phone, Send } from 'lucide-react'
import { site } from '../config/site'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

interface FormState {
  name: string
  email: string
  message: string
  /** Honeypot — always empty for real visitors. */
  website: string
}

type FormErrors = Partial<Record<keyof FormState, string>>

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const initialForm: FormState = { name: '', email: '', message: '', website: '' }

type SubmissionStatus = 'idle' | 'submitting' | 'success' | 'error'

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<FormErrors>({})
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle')
  const [submissionMessage, setSubmissionMessage] = useState('')

  const update = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setSubmissionStatus('idle')
    setSubmissionMessage('')
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const next: FormErrors = {}
    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.email.trim()) next.email = 'Please enter your email address.'
    else if (!EMAIL_PATTERN.test(form.email.trim())) next.email = 'Please enter a valid email address.'
    if (!form.message.trim()) next.message = 'Please enter a message.'

    setErrors(next)
    if (Object.keys(next).length > 0) return

    setSubmissionStatus('submitting')
    setSubmissionMessage('')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          website: form.website,
        }),
      })
      if (!response.headers.get('content-type')?.includes('application/json')) {
        throw new Error(
          'The contact API is unavailable. For local testing, run the site with `vercel dev` instead of `npm run dev`.',
        )
      }

      let result: unknown
      try {
        result = await response.json()
      } catch {
        throw new Error('The contact API returned an invalid response. Please try again later.')
      }

      if (!response.ok) {
        const errorMessage = isRecord(result) && typeof result.error === 'string'
          ? result.error
          : 'Your message could not be sent. Please try again.'
        throw new Error(errorMessage)
      }

      if (!isRecord(result) || result.success !== true) {
        throw new Error('The server returned an unexpected response. Please try again.')
      }

      setSubmissionStatus('success')
      setSubmissionMessage('Your message was sent. Thank you for reaching out!')
      setForm(initialForm)
    } catch (error) {
      setSubmissionStatus('error')
      setSubmissionMessage(
        error instanceof Error ? error.message : 'Your message could not be sent. Please try again.',
      )
    }
  }

  const contactRows = [
    { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: 'Phone', value: site.phone, href: `tel:${site.phone}` },
    { icon: Facebook, label: 'Facebook', value: 'Facebook profile / page', href: site.facebook },
    { icon: MapPin, label: 'Location', value: site.location, href: '' },
  ].filter((row) => row.value.trim() !== '')

  const fieldClasses = (hasError: boolean) =>
    `w-full rounded-xl border bg-night px-4 py-3 text-sm text-white placeholder:text-muted/60 outline-none transition-colors focus:border-brand/60 focus:ring-2 focus:ring-brand/20 ${
      hasError ? 'border-red-500/60' : 'border-inputline'
    }`

  return (
    <section id="contact" className="relative border-t border-line py-20 sm:py-24">
      <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="Contact"
            title={
              <>
                Let&apos;s talk about <span className="text-gradient">your project</span>
              </>
            }
            description="Tell me what you need to make easier at work, and I'll get back to you with how I can help."
          />

          <ul className="mt-8 flex flex-col gap-3">
            {contactRows.map((row) => {
              const Icon = row.icon
              const content = (
                <>
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-line bg-surface text-brand">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                      {row.label}
                    </span>
                    <span className="block truncate text-sm font-medium text-white">{row.value}</span>
                  </span>
                </>
              )

              return (
                <li key={row.label}>
                  {row.href ? (
                    <a
                      href={row.href}
                      target={row.href.startsWith('http') ? '_blank' : undefined}
                      rel={row.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 rounded-2xl border border-transparent p-2 transition-colors hover:border-line hover:bg-surface"
                    >
                      {content}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 p-2">{content}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <form onSubmit={handleSubmit} noValidate className="card flex flex-col gap-5 p-6 sm:p-8">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Your Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jane Dela Cruz"
                  value={form.name}
                  onChange={(event) => update('name', event.target.value)}
                  aria-invalid={Boolean(errors.name)}
                  className={fieldClasses(Boolean(errors.name))}
                />
                {errors.name ? <p className="text-xs text-red-400">{errors.name}</p> : null}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Your Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(event) => update('email', event.target.value)}
                  aria-invalid={Boolean(errors.email)}
                  className={fieldClasses(Boolean(errors.email))}
                />
                {errors.email ? <p className="text-xs text-red-400">{errors.email}</p> : null}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={5}
                placeholder="Briefly describe what you need — for example, a student portal, a finance system, or an inventory tracker."
                value={form.message}
                onChange={(event) => update('message', event.target.value)}
                aria-invalid={Boolean(errors.message)}
                className={`${fieldClasses(Boolean(errors.message))} resize-y`}
              />
              {errors.message ? <p className="text-xs text-red-400">{errors.message}</p> : null}
            </div>

            {/* Honeypot: hidden from real visitors, filled in by most bots. */}
            <input
              type="text"
              id="contact-website"
              name="website"
              value={form.website}
              onChange={(event) => update('website', event.target.value)}
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="hidden"
            />

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-relaxed text-muted">
                Your message will be sent to my email. I&apos;ll use your email address to reply.
              </p>
              <button
                type="submit"
                disabled={submissionStatus === 'submitting'}
                className="btn-primary shrink-0 disabled:cursor-wait disabled:opacity-70"
              >
                <Send className="h-4 w-4" />
                {submissionStatus === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </div>

            {submissionStatus === 'success' ? (
              <p
                aria-live="polite"
                className="flex items-start gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-xs font-medium text-emerald-300"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
                {submissionMessage}
              </p>
            ) : null}

            {submissionStatus === 'error' ? (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-xs font-medium text-red-300"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                <span>
                  {submissionMessage} You can also email me directly at{' '}
                <a className="underline underline-offset-2" href={`mailto:${site.email}`}>
                  {site.email}
                </a>
                .
                </span>
              </p>
            ) : null}
          </form>
        </Reveal>
      </div>
    </section>
  )
}

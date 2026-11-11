import { Facebook, Mail, Phone } from 'lucide-react'
import { navLinks } from '../data/navigation'
import { site } from '../config/site'

const socialIcons = {
  facebook: Facebook,
  email: Mail,
  phone: Phone,
} as const

function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}

export default function Footer() {
  const year = new Date().getFullYear()
  const socials = site.socials.filter((link) => link.href && link.href !== '#')

  return (
    <footer className="border-t border-line bg-surface/60">
      <div className="shell grid grid-cols-1 gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <a href="#home" className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-iris font-display text-sm font-bold text-white">
              {initials(site.name)}
            </span>
            <span className="font-display text-base font-semibold text-white">{site.name}</span>
          </a>
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            {site.role} — {site.specialization.toLowerCase()}.
          </p>
          <div className="flex items-center gap-3">
            {socials.map((link) => {
              const Icon = socialIcons[link.kind]
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={link.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-night text-muted transition-colors hover:border-brand/50 hover:text-brand"
                >
                  <Icon className="h-4 w-4" />
                </a>
              )
            })}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">Explore</h3>
          <ul className="mt-4 flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="text-sm text-muted transition-colors hover:text-brand">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white">Contact</h3>
          <ul className="mt-4 flex flex-col gap-2.5 text-sm text-muted">
            <li>
              <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-brand">
                {site.email}
              </a>
            </li>
            <li>
              <a href={`tel:${site.phone}`} className="transition-colors hover:text-brand">
                {site.phone}
              </a>
            </li>
            <li>
              <a
                href={site.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-brand"
              >
                Facebook profile / page
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="shell flex flex-col items-center justify-between gap-2 py-6 text-center text-xs text-muted sm:flex-row sm:text-left">
          <p>
            &copy; {year} {site.name}. All rights reserved.
          </p>
          <p>{site.role}</p>
        </div>
      </div>
    </footer>
  )
}

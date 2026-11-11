import { Briefcase, CircleCheck, Mail, MapPin, User } from 'lucide-react'
import { site } from '../config/site'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const highlights = [
  'Custom web applications built around your process',
  'Database-driven systems with clean, organized data',
  'Management systems that reduce manual work',
]

export default function About() {
  const details = [
    { icon: User, label: 'Name', value: site.name },
    { icon: MapPin, label: 'Location', value: site.location },
    { icon: Mail, label: 'Email', value: site.email },
    { icon: Briefcase, label: 'Focus', value: site.specialization },
  ].filter((row) => row.value.trim() !== '')

  return (
    <section id="about" className="relative border-t border-line bg-surface/40 py-20 sm:py-24">
      <div className="shell grid grid-cols-1 gap-12 lg:grid-cols-[1fr_0.85fr] lg:gap-16">
        <Reveal>
          <SectionHeading
            align="left"
            eyebrow="About Me"
            title={
              <>
                Building systems that <span className="text-gradient">solve real problems</span>
              </>
            }
          />

          <div className="mt-6 flex flex-col gap-4">
            {site.about
              .filter((paragraph) => paragraph.trim() !== '')
              .map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-base leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}
          </div>

          <ul className="mt-8 flex flex-col gap-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-muted">
                <CircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={120}>
          <div className="card h-full p-7 sm:p-8">
            <h3 className="font-display text-lg font-semibold text-white">Personal Details</h3>
            <p className="mt-1 text-sm text-muted">The basics — replace the placeholders with your own.</p>

            <dl className="mt-6 flex flex-col divide-y divide-line">
              {details.map((row) => {
                const Icon = row.icon
                return (
                  <div key={row.label} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-night text-brand">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div className="min-w-0">
                      <dt className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                        {row.label}
                      </dt>
                      <dd className="truncate text-sm font-medium text-white">{row.value}</dd>
                    </div>
                  </div>
                )
              })}
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

import { technologies } from '../data/portfolio'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Technologies() {
  return (
    <section id="technologies" className="relative border-t border-line bg-surface/40 py-20 sm:py-24">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Technologies"
            title={
              <>
                Tools I <span className="text-gradient">work with</span>
              </>
            }
            description="The stack I reach for when building web applications and management systems."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {technologies.map((technology, index) => {
            const Icon = technology.icon
            return (
              <Reveal key={technology.name} delay={(index % 4) * 60}>
                <article className="card group flex h-full flex-col items-center gap-3 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:border-iris/40 hover:bg-elevated">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-line bg-night text-iris transition-colors duration-300 group-hover:border-brand/40 group-hover:text-brand">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="font-display text-base font-semibold text-white">{technology.name}</h3>
                  <p className="text-[13px] leading-relaxed text-muted">{technology.description}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

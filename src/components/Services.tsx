import { services } from '../data/portfolio'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Services() {
  return (
    <section id="services" className="relative py-20 sm:py-24">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Services"
            title={
              <>
                What I can <span className="text-gradient">build for you</span>
              </>
            }
            description="These are the kinds of systems I take on — designed around your workflow, not a generic template."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Reveal key={service.title} delay={(index % 4) * 70} className="h-full">
                <article className="card group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:bg-elevated">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-brand/20 to-iris/20 text-brand transition-transform duration-300 group-hover:scale-110">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-base font-semibold leading-snug text-white">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

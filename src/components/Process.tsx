import { processSteps } from '../data/portfolio'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Process() {
  return (
    <section id="process" className="relative border-t border-line bg-surface/40 py-20 sm:py-24">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Development Process"
            title={
              <>
                How I <span className="text-gradient">work with you</span>
              </>
            }
            description="A straightforward process that keeps you involved at every stage, from the first conversation to launch day."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {processSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <Reveal key={step.title} delay={index * 80} className="h-full">
                <article className="card relative flex h-full flex-col p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl font-bold text-gradient">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand/20 to-iris/20 text-brand">
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-base font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
                </article>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

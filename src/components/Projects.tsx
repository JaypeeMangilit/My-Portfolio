import { ArrowUpRight, ImageOff } from 'lucide-react'
import { site } from '../config/site'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

export default function Projects() {
  return (
    <section id="projects" className="relative py-20 sm:py-24">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Projects"
            title={
              <>
                Systems I have <span className="text-gradient">built and deployed</span>
              </>
            }
            description="A selection of live web applications. Screenshots and project details can be updated as these grow."
          />
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {site.projects.map((project, index) => (
            <Reveal key={project.title} delay={index * 100} className="h-full">
              <article className="card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-iris/40">
                <div className="relative aspect-video overflow-hidden bg-elevated">
                  {project.screenshot ? (
                    <img
                      src={project.screenshot}
                      alt={`${project.title} screenshot`}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[radial-gradient(circle_at_50%_35%,rgba(99,102,241,0.18),transparent_65%)] px-6 text-center">
                      <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-night/70 text-muted">
                        <ImageOff className="h-7 w-7" />
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                        Screenshot placeholder
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="font-display text-xl font-semibold text-white">{project.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{project.description}</p>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-white"
                  >
                    Visit Website
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

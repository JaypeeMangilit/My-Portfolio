import { ArrowRight, Code2, Mail } from 'lucide-react'
import { site } from '../config/site'
import Reveal from './Reveal'

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-24 pb-20 sm:pt-32 sm:pb-24 lg:pt-40 lg:pb-32">
      {/* Decorative background: soft color glows + faint grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-iris/20 blur-[120px]" />
        <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-brand/20 blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(156,163,175,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(156,163,175,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_72%)]" />
      </div>

      <div className="shell relative grid grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-4 py-1.5 text-xs font-medium text-muted">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-brand to-iris" />
            {site.specialization}
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            Full-Stack
            <br />
            <span className="text-gradient">Web Developer</span>
          </h1>

          <p className="mt-6 font-display text-lg font-semibold uppercase leading-relaxed tracking-[0.12em] text-white/90 sm:text-xl">
            {site.tagline}
          </p>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{site.intro}</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#projects" className="btn-primary">
              View Projects
              <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#contact" className="btn-outline">
              <Mail className="h-4 w-4" />
              Contact Me
            </a>
          </div>
        </Reveal>

        <Reveal delay={150} className="relative mx-auto w-full max-w-sm sm:max-w-md">
          <div className="relative">
            {/* Glow behind the portrait */}
            <div
              aria-hidden="true"
              className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-brand/25 via-transparent to-iris/25 blur-2xl"
            />

            {/* Gradient frame */}
            <div className="relative rounded-[1.75rem] bg-gradient-to-br from-brand to-iris p-[2px] shadow-2xl shadow-black/60">
              <div className="relative overflow-hidden rounded-[1.6rem] bg-night">
                <img
                  src={site.picture}
                  alt={`Portrait of ${site.name}`}
                  width={1024}
                  height={1024}
                  loading="eager"
                  decoding="async"
                  className="h-auto w-full object-cover"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-night/70 to-transparent"
                />
              </div>
            </div>

            {/* Floating role badge */}
            <div className="absolute -bottom-6 left-3 flex items-center gap-3 rounded-2xl border border-line bg-surface/90 px-4 py-3 shadow-xl shadow-black/40 backdrop-blur sm:-left-6">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-brand to-iris text-white">
                <Code2 className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-white">{site.role}</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

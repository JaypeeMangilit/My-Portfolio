import type { ReactNode } from 'react'

interface SectionHeadingProps {
  eyebrow: string
  title: ReactNode
  description?: string
  align?: 'left' | 'center'
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <div className={`flex w-full flex-col gap-4 ${alignment}`}>
      <span className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-brandsoft px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand">
        {eyebrow}
      </span>
      <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">{title}</h2>
      <span aria-hidden="true" className="h-1 w-14 rounded-full bg-gradient-to-r from-brand to-iris" />
      {description ? <p className="max-w-2xl text-base leading-relaxed text-muted">{description}</p> : null}
    </div>
  )
}

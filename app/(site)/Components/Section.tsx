type Props = {
  children: React.ReactNode
  /** `narrow` for reading copy and forms, `wide` for image grids. */
  width?: 'narrow' | 'wide'
  /** Slightly darker ground, for separating adjacent sections without a rule. */
  tint?: boolean
  className?: string
}

const widths = {
  narrow: 'max-w-3xl',
  wide: 'max-w-5xl',
} as const

// The single source of vertical rhythm for content below a PageHero. Nothing
// should set its own `min-h-screen` — that's what produced the stacked dead
// space on the inner pages.
export default function Section({
  children,
  width = 'wide',
  tint = false,
  className = '',
}: Props) {
  return (
    <section className={`${tint ? 'bg-cream-deep' : ''} py-14 md:py-20 ${className}`}>
      <div className={`mx-auto ${widths[width]} px-6`}>{children}</div>
    </section>
  )
}

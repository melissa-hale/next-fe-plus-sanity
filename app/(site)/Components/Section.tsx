type Props = {
  children: React.ReactNode
  /** `narrow` for reading copy and forms, `wide` for image grids. */
  width?: 'narrow' | 'wide'
  /** Slightly darker ground, for separating adjacent sections without a rule. */
  tint?: boolean
  /**
   * `tight` trims only the top padding, for the section directly beneath a
   * PageHero — the hero's own bottom padding already separates it from the
   * <h1>, and the full rhythm on top of that reads as dead space.
   */
  spacing?: 'default' | 'tight'
  className?: string
}

const widths = {
  narrow: 'max-w-3xl',
  wide: 'max-w-5xl',
} as const

const spacings = {
  default: 'py-14 md:py-20',
  tight: 'pt-8 pb-14 md:pt-10 md:pb-20',
} as const

// The single source of vertical rhythm for content below a PageHero. Nothing
// should set its own `min-h-screen` — that's what produced the stacked dead
// space on the inner pages.
export default function Section({
  children,
  width = 'wide',
  tint = false,
  spacing = 'default',
  className = '',
}: Props) {
  return (
    <section className={`${tint ? 'bg-cream-deep' : ''} ${spacings[spacing]} ${className}`}>
      <div className={`mx-auto ${widths[width]} px-6`}>{children}</div>
    </section>
  )
}

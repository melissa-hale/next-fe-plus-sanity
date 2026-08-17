type Props = {
  /** `lg` is the homepage band; `sm` is the shorter band used as a page header. */
  size?: 'lg' | 'sm'
  /**
   * Must match the `width` of the Section below, or the <h1> and the content
   * under it start at different left edges — both containers are `mx-auto`, so
   * a wide hero over a narrow section insets the copy 8rem past the heading.
   */
  width?: 'narrow' | 'wide'
  children: React.ReactNode
}

// Kept in sync with Section's widths by hand; the two are a matched pair.
const widths = {
  narrow: 'max-w-3xl',
  wide: 'max-w-5xl',
} as const

const sizes = {
  lg: 'min-h-[32rem] md:min-h-[65vh] py-16 md:py-20',
  // Asymmetric on purpose: the band is always followed by a Section, so a
  // symmetric pb stacked with that Section's pt put ~112px (mobile) between the
  // <h1> and the first line of content. The lighter bottom half of the pair
  // lives here; the Section below it uses `spacing="tight"`.
  sm: 'pt-12 pb-8 md:pt-16 md:pb-10',
} as const

export default function PageHero({ size = 'sm', width = 'wide', children }: Props) {
  return (
    <section className={`relative isolate flex items-center ${sizes[size]}`}>
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Same tiled wallpaper as the nav. `bg-site-bg-image` is defined once in
            tailwind.config.js, so the two can't drift apart. This has to be a CSS
            background rather than next/image: the source is a 200x200 tile, and
            `<Image fill>` would scale that one tile to cover the band instead of
            repeating it. */}
        <div className="absolute inset-0 bg-site-bg-image bg-repeat" />
        {/* Scrim does two jobs: keeps text legible over a busy pattern, and fades
            the band into the solid cream page underneath so there's no hard seam. */}
        <div className="absolute inset-0 bg-gradient-to-b from-cream/60 via-cream/45 to-cream" />
      </div>
      <div className={`mx-auto w-full ${widths[width]} px-6`}>{children}</div>
    </section>
  )
}

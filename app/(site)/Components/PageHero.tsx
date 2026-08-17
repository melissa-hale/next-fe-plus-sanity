type Props = {
  /** `lg` is the homepage band; `sm` is the shorter band used as a page header. */
  size?: 'lg' | 'sm'
  children: React.ReactNode
}

const sizes = {
  lg: 'min-h-[32rem] md:min-h-[65vh] py-16 md:py-20',
  sm: 'py-14 md:py-16',
} as const

export default function PageHero({ size = 'sm', children }: Props) {
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
      <div className="mx-auto w-full max-w-5xl px-6">{children}</div>
    </section>
  )
}

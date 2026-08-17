// app/(site)/Components/Home.tsx
import { getPage } from '@/sanity/sanity-utils'
import { PortableText } from '@portabletext/react'
import PageHero from './PageHero'

export default async function Home() {
  const page = await getPage('home')

  const serializer = {
    types: {
      block: ({ value }: any) => {
        if (value.children.length === 1 && value.children[0].text === '') {
          return null
        }
        return (
          <li className="flex gap-3 pb-2">
            <span aria-hidden="true" className="text-amber-400 text-lg">
              &#x2713;
            </span>
            <span>{value.children[0].text}</span>
          </li>
        )
      },
    },
  }

  return (
    <PageHero size="lg">
      <article
        className="mx-auto max-w-4xl rounded-2xl bg-cream/90 px-10 py-9 text-green-900 shadow-[0px_4px_16px_rgba(17,17,26,0.08),_0px_8px_24px_rgba(17,17,26,0.08)] sm:px-14 md:px-16 md:py-10"
        aria-label="Welcome to Wallcoverings By Don Dye"
      >
        <div className="mb-6">
          {/* Fluid size, not breakpoint steps: the title is a fixed 15.58em-wide
              string, so a step change at `md` always overshoots the container
              somewhere in the range above it. Scaling continuously with the
              viewport keeps the text-to-container ratio constant, so it holds one
              line everywhere down to ~720px. `font-bold` not `font-extrabold` —
              Ibarra Real Nova's weight axis stops at 700, and asking for 800 makes
              the browser synthesize bold, which widens glyphs unpredictably. */}
          <h1 className="mb-8 font-headers text-[clamp(2.25rem,6.1vw_-_0.7rem,2.875rem)] font-bold leading-tight [text-wrap:balance]">
            {page.title}
          </h1>
          {/* Keeps the document outline complete for crawlers without a second visible heading. */}
          <h2 className="sr-only">
            Professional Wallpaper Installation Services in Austin and Central Texas
          </h2>
        </div>

        <ul className="list-none pl-0 text-base font-medium text-gray-700">
          <PortableText value={page.section_content} components={serializer} />
        </ul>

        {/* flex, not `text-center`: the button is inline-flex, so in a block box it
            sits on the text baseline and the line box adds phantom descender space
            under it — extra bottom gap that no amount of trimming `pb` removes. */}
        <div className="mt-10 flex justify-center">
          <a
            href="/contact"
            className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-green-900 px-6 py-3 font-medium text-amber-200 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-800 hover:text-amber-200 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-300"
          >
            Get Your Free Estimate Today!
          </a>
        </div>
      </article>
    </PageHero>
  )
}

import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import PageHero from '../Components/PageHero'
import Section from '../Components/Section'
import ClosingCTA from '../Components/ClosingCTA'
import { serviceAreas } from './cities'
import { getGalleryProjects } from '@/sanity/sanity-utils'
import { thumbnail4x3 } from '@/sanity/image'

const BASE_URL = 'https://www.wallcoveringsbydondye.com'
const PHONE_DISPLAY = '(832) 788-3667'
const PHONE_HREF = 'tel:+18327883667'

// Kept short on purpose: the root template appends " | Wallcoverings By Don Dye"
// (27 chars), so anything much longer than this truncates in the SERP.
const TITLE = 'Service Areas in Central Texas'
const DESCRIPTION =
  'Wallcoverings By Don Dye installs and removes wallcovering across Central Texas — Austin, Round Rock, Cedar Park, Georgetown, Leander, Lakeway, Kyle, Buda, San Marcos, and the surrounding towns.'

export const metadata: Metadata = {
  // The root layout's title.template appends the brand, so this must not.
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: `${TITLE} | Wallcoverings By Don Dye`,
    description: DESCRIPTION,
    url: `${BASE_URL}/service-area`,
    siteName: 'Wallcoverings By Don Dye',
    locale: 'en_US',
    type: 'website',
  },
  // Without this, twitter:* falls through to the root layout's homepage copy
  // and the two cards disagree about what this page is. Same bug §6.B2 fixed on
  // the city pages; this page never had the override.
  twitter: {
    card: 'summary_large_image',
    title: `${TITLE} | Wallcoverings By Don Dye`,
    description: DESCRIPTION,
  },
  alternates: { canonical: `${BASE_URL}/service-area` },
}

/**
 * The one service area page.
 *
 * Replaced 13 per-city landing pages on 2026-08-17. Those pages each opened
 * with a paragraph characterising the town's building stock — construction
 * era, wall material, typical access problems — which read as expertise Don
 * has never claimed. The copy here says what he does and where he does it, and
 * stops there.
 *
 * Nothing on this page may attach a photo to a place. The gallery is not
 * location-tagged, so a photo can illustrate the work but never a town.
 */
export default async function ServiceAreaIndex() {
  const [photo] = await getGalleryProjects(1)

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Service Areas',
        item: `${BASE_URL}/service-area`,
      },
    ],
  }

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <PageHero size="sm">
        <h1 className="max-w-3xl font-headers text-4xl font-bold text-green-900 md:text-5xl">
          Wallcovering Service Areas in Central Texas
        </h1>
      </PageHero>

      {/* Copy left, photo right. The photo used to be a full-width 16/9 band
          above the text, which dominated the page and pushed everything real
          below the fold. At half width and 4/3 it illustrates rather than
          announces. */}
      <Section width="wide" spacing="tight">
        <div className="grid gap-12 md:grid-cols-2 md:items-center md:gap-14">
          <div>
            <p className="text-lg leading-relaxed text-gray-800">
              Wallcoverings By Don Dye works throughout Austin and the surrounding
              Central Texas area. 
            </p>
            <p className="mt-4 text-lg leading-relaxed text-gray-800">
              If your city is not on the list below, just give me a call.  I&apos;m generally happy to accommodate a wider area depending on my workload.
            </p>

            {/* Two tiers, per the CTA hierarchy: green is the conversion
                action, amber is navigation. The estimate button that used to
                sit here is now the closing CTA at the foot of the page, so the
                same green button doesn't appear twice. */}
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href={PHONE_HREF}
                className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-md bg-green-900 px-6 py-3 text-center text-amber-200 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-800 hover:text-amber-200 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-300"
              >
                Call Don — {PHONE_DISPLAY}
              </a>
              <Link
                href="/gallery"
                className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-md bg-amber-300 px-6 py-3 text-center text-gray-800 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-350 hover:text-gray-900 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-300"
              >
                See recent work
              </Link>
            </div>
          </div>

          {/* The photo links to the gallery too — it is the thing a visitor
              wants to see next, and clicking a picture of the work to reach
              more of it needs no explaining. */}
          {photo && (
            <Link
              href="/gallery"
              className="group relative block aspect-[4/3] w-full overflow-hidden rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-amber-300"
            >
              <Image
                src={thumbnail4x3(photo.image)}
                // Describes what is pictured, never where. The gallery carries
                // no location data, so alt text may not imply one.
                alt={photo.alt ?? photo.name}
                fill
                priority
                // See Components/Gallery.tsx — AVIF only beats WebP below the
                // default q=75, and this is the LCP element on this route.
                quality={65}
                sizes="(min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </Link>
          )}
        </div>
      </Section>

      <Section width="wide" tint>
        <h2 className="mb-8 font-headers text-2xl font-bold text-green-900 md:text-3xl">
          Service Areas in Central Texas
        </h2>
        {/* <p className="mb-8 text-base text-gray-700">
          
        </p> */}

        {/* Plain names, not links. Each town used to link to its own page; with
            those consolidated here, thirteen links pointing back at this page
            would be circular. */}
        <ul className="grid list-none grid-cols-2 gap-x-6 gap-y-3 pl-0 sm:grid-cols-3 lg:grid-cols-4">
          {serviceAreas.map((town) => (
            <li key={town} className="text-base text-gray-800">
              {town}
            </li>
          ))}
        </ul>
      </Section>

      {/* The page ends on the ask. "What to expect" used to close it out, but
          those steps describe working with Don rather than where he works, so
          they moved to the home page on 2026-08-18. Shared with the home page —
          see Components/ClosingCTA. */}
      <ClosingCTA
        heading="Ready to get started?"
        body="I'd love to hear about your project and what you have in mind."
      />
    </div>
  )
}

import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import PageHero from '../../Components/PageHero'
import Section from '../../Components/Section'

const BASE_URL = 'https://www.wallcoveringsbydondye.com'

type CityData = {
  name: string
  slug: string
  headline: string
  intro: string
  body: string
  neighborhoods: string
  metaDescription: string
}

const cities: Record<string, CityData> = {
  austin: {
    name: 'Austin',
    slug: 'austin',
    headline: 'Professional Wallpaper Installation in Austin, TX',
    intro:
      'Austin homeowners trust Wallcoverings By Don Dye for expert wallpaper installation and removal — backed by decades of professional wallcovering experience. From craftsman bungalows in Hyde Park to new construction in Mueller, from South Congress condos to sprawling estates in Tarrytown, Don brings the same meticulous attention to every project.',
    body: 'Austin\'s architecture is as eclectic as its culture — and wallcovering work demands an installer who can handle it all. We work with grasscloth, silk, vinyl, fabric-backed, peel-and-stick, and luxury designer papers. Every job starts with proper surface prep: patching, priming, and smoothing so the finished wall looks exactly the way it should. We also handle full wallpaper removal, including stubborn older installations on plaster or drywall.',
    neighborhoods: 'Hyde Park, Tarrytown, Mueller, South Congress, Rosedale, Clarksville, Bouldin Creek, Westover Hills',
    metaDescription:
      'Professional wallpaper installation in Austin, TX. Expert wallcovering installation and removal by Don Dye — serving Austin neighborhoods and the surrounding Central Texas area.',
  },
  'round-rock': {
    name: 'Round Rock',
    slug: 'round-rock',
    headline: 'Professional Wallpaper Installation in Round Rock, TX',
    intro:
      'Round Rock homeowners trust Wallcoverings By Don Dye for expert wallpaper installation and removal. Whether you\'re in a classic neighborhood near downtown Round Rock or a newer community off 1431 or 620, Don brings 40+ years of experience directly to your door.',
    body: 'From master bedrooms in Teravista to accent walls in Forest Creek and Mayfield Ranch, we\'ve helped Round Rock residents transform their spaces with quality wallcoverings. We handle every project from start to finish — surface preparation, precise installation, and clean cleanup — so you\'re left with walls you love.',
    neighborhoods: 'Teravista, Mayfield Ranch, Forest Creek, Vista Oaks, Stone Canyon',
    metaDescription:
      'Professional wallpaper installation in Round Rock, TX. Expert wallcovering installation and removal by Don Dye, serving Round Rock and surrounding Central Texas neighborhoods.',
  },
  'cedar-park': {
    name: 'Cedar Park',
    slug: 'cedar-park',
    headline: 'Expert Wallpaper Installation in Cedar Park, TX',
    intro:
      'Cedar Park residents rely on Wallcoverings By Don Dye for professional wallpaper installation and removal. We serve all of Cedar Park — from established neighborhoods near 183A to the newer developments along Whitestone Boulevard.',
    body: 'Cedar Park\'s growing community of beautifully designed homes deserves equally beautiful walls. We work with all wallpaper types — grasscloth, vinyl, fabric-backed, peel-and-stick, and luxury designer papers — installing each with the precision that only comes from decades of hands-on experience. We also handle full wallpaper removal, wall prep, and smoothing before any new installation.',
    neighborhoods: 'Buttercup Creek, Twin Creeks, Brushy Creek, Ranch at Brushy Creek, Avalon',
    metaDescription:
      'Professional wallpaper installation in Cedar Park, TX. Wallcoverings By Don Dye offers expert installation and removal throughout Cedar Park and the surrounding area.',
  },
  georgetown: {
    name: 'Georgetown',
    slug: 'georgetown',
    headline: 'Wallpaper Installation Services in Georgetown, TX',
    intro:
      'Georgetown\'s stunning homes — from historic Victorian cottages near the Square to modern builds in Wolf Ranch and Sun City — deserve wallcovering expertise that matches their character. Wallcoverings By Don Dye has been serving Georgetown homeowners with professional-grade installation since the beginning.',
    body: 'We understand that Georgetown homes range from carefully preserved historic interiors to brand-new construction, and each requires a different approach. Don Dye assesses your walls, recommends the right prep work, and installs your chosen wallcovering with the detail and care your home deserves. We also offer professional wallpaper removal for those ready for a fresh look.',
    neighborhoods: 'Wolf Ranch, Sun City, Wildwood, Georgetown Village, Berry Creek',
    metaDescription:
      'Professional wallpaper installation in Georgetown, TX. Expert wallcovering installation and removal by Don Dye — serving Georgetown\'s historic and newer neighborhoods alike.',
  },
  pflugerville: {
    name: 'Pflugerville',
    slug: 'pflugerville',
    headline: 'Wallpaper Installation in Pflugerville, TX',
    intro:
      'Pflugerville homeowners choose Wallcoverings By Don Dye for high-quality wallpaper installation that elevates any room. We serve all of Pflugerville, from established neighborhoods near Dessau Road to the fast-growing communities around SH-130.',
    body: 'Whether you\'re looking to add a bold accent wall in your living room, dress up a powder bath, or do a full-room installation in a master suite, we handle projects of every scope and budget. Every installation includes proper surface prep and precise seam matching — the hallmarks of work that looks professionally done because it is.',
    neighborhoods: 'Blackhawk, Avalon, Bohls Place, Reserve at Westcreek, Falcon Pointe',
    metaDescription:
      'Professional wallpaper installation in Pflugerville, TX. Wallcoverings By Don Dye offers expert wallcovering installation and removal services throughout Pflugerville.',
  },
  kyle: {
    name: 'Kyle',
    slug: 'kyle',
    headline: 'Professional Wallpaper Installation in Kyle, TX',
    intro:
      'Kyle is one of the fastest-growing cities in Texas, and its new homes deserve the detail work that makes them feel truly custom. Wallcoverings By Don Dye brings decades of wallcovering expertise to Kyle, offering professional installation and removal throughout the area.',
    body: 'New construction homes in Kyle often need surface prep before wallpaper can be properly installed — something not every installer addresses. Don Dye primes and prepares every surface correctly, ensuring your wallcovering adheres evenly, lies flat, and looks beautiful for years to come. We work with all materials including grasscloth, vinyl, and specialty designer papers.',
    neighborhoods: 'Plum Creek, 6 Creeks, Woodlands at Kyle, Crosswinds, Anthem',
    metaDescription:
      'Professional wallpaper installation in Kyle, TX. Expert wallcovering installation and removal services by Don Dye — serving Kyle and Hays County.',
  },
  buda: {
    name: 'Buda',
    slug: 'buda',
    headline: 'Wallpaper Installation Services in Buda, TX',
    intro:
      'Buda\'s charming community and growing number of distinctive homes make it a great fit for the craftsmanship Wallcoverings By Don Dye delivers. We offer professional wallpaper installation and removal for Buda homeowners who want results that look as good as they\'ll hold up.',
    body: 'From accent walls in newer developments to full-room installs in established homes, we work with Buda clients to select, prepare, and install the right wallcovering for their space. Don Dye\'s attention to pattern matching, seam placement, and corner detail is what sets professional installation apart from DIY — and why Buda clients keep calling back.',
    neighborhoods: 'Garlic Creek, Ruby Ranch, Whispering Hollow, Shadow Creek, Elm Grove',
    metaDescription:
      'Professional wallpaper installation in Buda, TX. Wallcoverings By Don Dye provides expert wallcovering installation and removal throughout Buda and Hays County.',
  },
  'san-marcos': {
    name: 'San Marcos',
    slug: 'san-marcos',
    headline: 'Wallpaper Installation in San Marcos, TX',
    intro:
      'San Marcos homeowners and property managers count on Wallcoverings By Don Dye for reliable, high-quality wallpaper installation and removal. We serve residential and commercial clients throughout San Marcos, bringing professional expertise to every project.',
    body: 'San Marcos homes range from historic bungalows near the university to new builds south of the square, and our work adapts to each. We handle all phases — removal of old wallcovering, surface repair and priming, and precise installation of new material. Whether you\'re refreshing a rental property or upgrading your own home, we deliver a clean, lasting result.',
    neighborhoods: 'Blanco Vista, The Highlands, Trace, Kissing Tree, Willow Springs',
    metaDescription:
      'Professional wallpaper installation in San Marcos, TX. Expert wallcovering installation and removal by Don Dye — serving San Marcos and Hays County.',
  },
  lakeway: {
    name: 'Lakeway',
    slug: 'lakeway',
    headline: 'Wallpaper Installation in Lakeway & Bee Cave, TX',
    intro:
      'Lakeway and Bee Cave homeowners expect the same level of craftsmanship they put into their homes — and that\'s exactly what Wallcoverings By Don Dye delivers. We serve the Lake Travis corridor, from Lakeway\'s established waterfront communities to the newer developments in Bee Cave and the Hills.',
    body: 'Homes in this area tend toward high-end finishes, and wallcovering installation is no exception. Whether you\'re working with a designer-specified grasscloth for a study, a custom mural panel for a dining room, or a luxurious fabric-backed paper for a master suite, Don Dye handles each material with the care it deserves. We also perform complete wallpaper removal and wall restoration before any new installation.',
    neighborhoods: 'Lakeway, The Hills, Bee Cave, Rough Hollow, Lake Travis Estates, Serene Hills',
    metaDescription:
      'Professional wallpaper installation in Lakeway and Bee Cave, TX. Expert wallcovering installation and removal by Don Dye — serving the Lake Travis corridor and surrounding communities.',
  },
  'dripping-springs': {
    name: 'Dripping Springs',
    slug: 'dripping-springs',
    headline: 'Wallpaper Installation in Dripping Springs, TX',
    intro:
      'Dripping Springs is known for its beautiful Hill Country homes, wineries, and a community that values quality craftsmanship. Wallcoverings By Don Dye brings that same standard to every wallpaper installation and removal project in the Dripping Springs area.',
    body: 'Hill Country homes often feature unique architectural details — vaulted ceilings, stone walls, and irregular surfaces — that require an experienced hand to work around. Don Dye has spent decades navigating exactly these kinds of challenges. We assess each space carefully, prepare surfaces properly, and install wallcoverings that complement the character of your home rather than fight it.',
    neighborhoods: 'Belterra, Caliterra, Headwaters, Reunion Ranch, Sunset Canyon, Deer Creek Ranch',
    metaDescription:
      'Professional wallpaper installation in Dripping Springs, TX. Expert wallcovering installation and removal by Don Dye — serving Dripping Springs and the surrounding Hill Country.',
  },
  leander: {
    name: 'Leander',
    slug: 'leander',
    headline: 'Wallpaper Installation in Leander, TX',
    intro:
      'Leander is one of the fastest-growing cities in the country, and its new and established neighborhoods alike deserve professional wallcovering work. Wallcoverings By Don Dye serves homeowners throughout Leander with expert installation and removal.',
    body: 'Whether your home is a newly built property in Bryson or Crystal Falls, or an older residence near downtown Leander, we bring the same thorough approach: proper surface preparation, precise pattern matching, and careful seam placement. New construction in particular often needs extra wall prep before wallpaper can go up correctly — and that\'s work we always do right the first time.',
    neighborhoods: 'Bryson, Crystal Falls, Mason Hills, Travisso, Bar W Ranch, Block House Creek',
    metaDescription:
      'Professional wallpaper installation in Leander, TX. Expert wallcovering installation and removal by Don Dye — serving Leander and northern Williamson County.',
  },
  manor: {
    name: 'Manor',
    slug: 'manor',
    headline: 'Wallpaper Installation in Manor & Hutto, TX',
    intro:
      'Manor and Hutto are among Austin\'s fastest-growing eastern communities, bringing a wave of new homes that are perfect for custom wallcovering work. Wallcoverings By Don Dye serves homeowners throughout this corridor with professional installation and removal.',
    body: 'East Austin\'s expansion has brought a mix of new construction and renovated older homes to Manor and Hutto — and both types present different wallcovering challenges. New builds often need skim coating and priming before installation. Older homes may need careful wallpaper removal and drywall repair. Either way, Don Dye handles every phase of the project from prep to finish.',
    neighborhoods: 'Shadow Glen, Wildhorse, ShadowGlen, Bohls Place, Star Ranch, Hutto Commons',
    metaDescription:
      'Professional wallpaper installation in Manor and Hutto, TX. Expert wallcovering installation and removal by Don Dye — serving eastern Travis and Williamson County communities.',
  },
  'westlake-hills': {
    name: 'Westlake Hills',
    slug: 'westlake-hills',
    headline: 'Wallpaper Installation in Westlake Hills, TX',
    intro:
      'Westlake Hills is home to some of Austin\'s most beautifully designed residences — and the wallcovering work inside them should be equally refined. Wallcoverings By Don Dye brings decades of professional wallcovering expertise to Westlake Hills and the surrounding Eanes ISD corridor, working with discerning homeowners and their interior designers.',
    body: 'In high-end homes, every detail matters. Don Dye works with the full range of luxury wallcoverings — hand-printed papers, natural fiber grasscloth, silk, linen, and specialty materials from top design houses. We coordinate directly with interior designers and contractors when needed, and we treat every home with the level of respect and discretion that Westlake clients expect.',
    neighborhoods: 'Westlake Hills, Lost Creek, Rollingwood, West Lake Hills Estates, Rob Roy, Barton Creek',
    metaDescription:
      'Professional wallpaper installation in Westlake Hills, TX. Expert wallcovering installation and removal by Don Dye — serving Westlake Hills, Rollingwood, and the greater Eanes area.',
  },
}

type Props = {
  params: { city: string }
}

export function generateStaticParams() {
  return Object.keys(cities).map((city) => ({ city }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const city = cities[params.city]
  if (!city) return {}

  const url = `${BASE_URL}/service-area/${city.slug}`
  return {
    title: `${city.headline} | Wallcoverings By Don Dye`,
    description: city.metaDescription,
    openGraph: {
      title: `${city.headline} | Wallcoverings By Don Dye`,
      description: city.metaDescription,
      url,
      siteName: 'Wallcoverings By Don Dye',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'Wallcoverings By Don Dye - Professional Wallpaper Installation',
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${city.headline} | Wallcoverings By Don Dye`,
      description: city.metaDescription,
    },
    alternates: { canonical: url },
  }
}

function CitySchema({ city }: { city: CityData }) {
  const localBusiness = {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    name: 'Wallcoverings By Don Dye',
    description: `Professional wallpaper installation and removal in ${city.name}, TX`,
    url: BASE_URL,
    telephone: '(832)788-3667',
    priceRange: '$$',
    areaServed: { '@type': 'City', name: city.name, addressRegion: 'TX' },
    serviceType: ['Wallpaper Installation', 'Wallpaper Removal', 'Custom Wall Treatments'],
    openingHours: 'Mo-Fr 08:00-17:00',
  }

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
      {
        '@type': 'ListItem',
        position: 3,
        name: city.name,
        item: `${BASE_URL}/service-area/${city.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  )
}

export default function CityPage({ params }: Props) {
  const city = cities[params.city]
  if (!city) notFound()

  return (
    <div>
      <CitySchema city={city} />

      <PageHero size="sm">
        <h1 className="max-w-3xl font-headers text-4xl font-extrabold text-green-900 md:text-5xl">
          {city.headline}
        </h1>
      </PageHero>

      <Section width="narrow">
        <p className="mb-5 text-lg leading-relaxed text-gray-800">{city.intro}</p>
        <p className="text-base leading-relaxed text-gray-700">{city.body}</p>

        <div className="mt-8 rounded-md border border-green-200 bg-green-50 p-5">
          <h2 className="mb-1 text-base font-semibold text-green-900">
            Neighborhoods we serve in {city.name}
          </h2>
          <p className="text-sm text-gray-600">{city.neighborhoods}</p>
        </div>
      </Section>

      <Section width="narrow" tint>
        <h2 className="mb-3 font-headers text-2xl font-bold text-green-900">
          Get a Free Estimate
        </h2>
        <p className="mb-5 text-base text-gray-800">
          Call Don at{' '}
          <a href="tel:+18327883667" className="font-semibold text-green-800 hover:underline">
            (832) 788-3667
          </a>{' '}
          or use the contact form to schedule your free {city.name} estimate.
        </p>
        <Link
          href="/contact"
          className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-green-900 px-6 py-3 text-amber-200 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-800 hover:text-amber-200 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-300"
        >
          Contact Us
        </Link>

        <div className="mt-12 border-t border-amber-200 pt-8">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-600">
            Other service areas
          </h3>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {Object.values(cities)
              .filter((c) => c.slug !== city.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/service-area/${c.slug}`}
                  className="text-sm text-green-800 hover:underline"
                >
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </Section>
    </div>
  )
}

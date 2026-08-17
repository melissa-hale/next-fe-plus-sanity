import { getPage, getPages } from '@/sanity/sanity-utils'
import { Metadata } from 'next'
import Header from './Components/Header'
import ContactForm from './ContactForm'
import Gallery from './Gallery'
import About from './About'

const BASE_URL = 'https://www.wallcoveringsbydondye.com'

type Props = {
  params: { slug: string }
}

// Titles here must NOT carry a " | Wallcoverings By Don Dye" suffix — the root
// layout's title.template appends it. Anything that spells the brand out again
// renders it twice and pushes the title past the SERP truncation point.
const fallbackMetadata: Record<string, { title: string; description: string }> = {
  about: {
    title: 'About Don Dye - Professional Wallpaper Installer | Austin, TX',
    description: "Austin's premier wallpaper installation specialist. Over 40 years of experience, now serving Central Texas with expert wallcovering services.",
  },
  contact: {
    title: 'Contact Don Dye | Free Estimates Austin, TX',
    description: 'Get a free estimate for professional wallpaper installation in Austin, TX. Contact Don Dye for expert wallcovering services in Central Texas.',
  },
  gallery: {
    title: 'Wallpaper Installation Gallery | Don Dye Austin, TX',
    description: 'View our portfolio of professional wallpaper installations in Austin and Central Texas. See quality wallcovering work by Don Dye.',
  },
}

// Without this, Next cannot know the slugs at build time and renders every one
// of these pages on demand with `cache-control: no-store` — which costs a Sanity
// round trip per request and disqualifies the pages from the browser's
// back/forward cache. Prerendering them picks up the 60s `revalidate` on the
// underlying fetches instead. `dynamicParams` stays at its default of true, so a
// page published in the Studio after a deploy still renders on first request.
export async function generateStaticParams() {
  const pages = await getPages()
  return pages.map((page) => ({ slug: page.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPage(params.slug)
  const fallback = fallbackMetadata[params.slug] ?? {
    title: page.title,
    description: `Professional wallpaper installation services in Austin, TX. ${page.title} - Expert wallcovering by Don Dye.`,
  }

  const title = page.seo?.metaTitle ?? fallback.title
  const description = page.seo?.metaDescription ?? fallback.description
  const ogImage = page.seo?.ogImageUrl ?? '/og-image.jpg'
  const url = `${BASE_URL}/${params.slug}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Wallcoverings By Don Dye',
      images: [{ url: ogImage, width: 1200, height: 630, alt: 'Wallcoverings By Don Dye - Professional Wallpaper Installation Austin TX' }],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    alternates: { canonical: url },
  }
}

function BreadcrumbSchema({ slug, title }: { slug: string; title: string }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: title, item: `${BASE_URL}/${slug}` },
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default async function Page({ params }: Props) {
  const page = await getPage(params.slug)

  return (
    <div>
      <BreadcrumbSchema slug={page.slug} title={page.title} />
      <Header
        title={page.title}
        id={page._id}
        width={page.slug === 'gallery' ? 'wide' : 'narrow'}
      >
        {page.slug == 'gallery' && <Gallery content={page.content} />}
        {page.slug == 'contact' && <ContactForm content={page.content} />}
        {page.slug == 'about' && <About content={page.content} />}
      </Header>
    </div>
  )
}
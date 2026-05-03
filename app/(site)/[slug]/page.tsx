import { getPage } from '@/sanity/sanity-utils'
import { Metadata } from 'next'
import Header from './Components/Header'
import ContactForm from './ContactForm'
import Gallery from './Gallery'
import About from './About'

const BASE_URL = 'https://www.wallcoveringsbydondye.com'

type Props = {
  params: { slug: string }
}

const fallbackMetadata: Record<string, { title: string; description: string }> = {
  about: {
    title: 'About Don Dye - Professional Wallpaper Installer | Austin, TX',
    description: "Austin's premier wallpaper installation specialist. Over 40 years of experience, now serving Central Texas with expert wallcovering services.",
  },
  contact: {
    title: 'Contact Wallcoverings By Don Dye | Free Estimates Austin, TX',
    description: 'Get a free estimate for professional wallpaper installation in Austin, TX. Contact Don Dye for expert wallcovering services in Central Texas.',
  },
  gallery: {
    title: 'Wallpaper Installation Gallery | Don Dye Austin, TX',
    description: 'View our portfolio of professional wallpaper installations in Austin and Central Texas. See quality wallcovering work by Don Dye.',
  },
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPage(params.slug)
  const fallback = fallbackMetadata[params.slug] ?? {
    title: `${page.title} | Wallcoverings By Don Dye`,
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
      <Header title={page.title} id={page._id}>
        {page.slug == 'gallery' && <Gallery content={page.content} />}
        {page.slug == 'contact' && <ContactForm content={page.content} />}
        {page.slug == 'about' && <About content={page.content} />}
      </Header>
    </div>
  )
}
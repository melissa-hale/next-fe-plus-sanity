// app/(site)/[slug]/page.tsx
import { getPage } from '@/sanity/sanity-utils'
import { Metadata } from 'next'
import Header from './Components/Header'
import ContactForm from './ContactForm'
import Gallery from './Gallery'
import About from './About'

type Props = {
  params: { slug: string }
}

// ADD THIS NEW FUNCTION - Generate dynamic metadata for each page
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = await getPage(params.slug)
  
  // SEO-optimized metadata for each page
  const metadataMap: Record<string, { title: string; description: string }> = {
    'about': {
      title: 'About Don Dye - Professional Wallpaper Installer | Austin, TX',
      description: 'Austin\'s premier wallpaper installation specialist. Over 40 years of experience, now serving Central Texas with expert wallcovering services.'
    },
    'contact': {
      title: 'Contact Wallcoverings By Don Dye | Free Estimates Austin, TX',
      description: 'Get a free estimate for professional wallpaper installation in Austin, TX. Contact Don Dye for expert wallcovering services in Central Texas.'
    },
    'gallery': {
      title: 'Wallpaper Installation Gallery | Don Dye Austin, TX',
      description: 'View our portfolio of professional wallpaper installations in Austin and Central Texas. See quality wallcovering work by Don Dye.'
    }
  }

  const pageMetadata = metadataMap[params.slug] || {
    title: `${page.title} | Wallcoverings By Don Dye`,
    description: `Professional wallpaper installation services in Austin, TX. ${page.title} - Expert wallcovering by Don Dye.`
  }

  return {
    title: pageMetadata.title,
    description: pageMetadata.description,
    openGraph: {
      title: pageMetadata.title,
      description: pageMetadata.description,
      url: `https://www.wallcoveringsbydondye.com/${params.slug}`, // UPDATE WITH YOUR ACTUAL DOMAIN
      siteName: 'Wallcoverings By Don Dye',
      images: [
        {
          url: '/og-image.jpg', // We'll create this in a later step
          width: 1200,
          height: 630,
          alt: 'Wallcoverings By Don Dye - Professional Wallpaper Installation Austin TX'
        }
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: pageMetadata.title,
      description: pageMetadata.description,
      images: ['/og-image.jpg'],
    },
    alternates: {
      canonical: `https://www.wallcoveringsbydondye.com/${params.slug}` // UPDATE WITH YOUR ACTUAL DOMAIN
    }
  }
}

// Your existing page component stays the same
export default async function Page({ params }: Props) {
  const page = await getPage(params.slug)

  return (
    <div>
      <Header title={page.title} id={page._id}>
        {page.slug == 'gallery' && <Gallery content={page.content} />}
        {page.slug == 'contact' && <ContactForm content={page.content} />}
        {page.slug == 'about' && <About content={page.content} />}
      </Header>
    </div>
  )
}
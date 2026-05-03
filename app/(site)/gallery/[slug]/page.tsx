import { getProject, getProjects } from '@/sanity/sanity-utils'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Ibarra_Real_Nova } from '@next/font/google'
import { notFound } from 'next/navigation'

const headerFont = Ibarra_Real_Nova({
  subsets: ['latin'],
  variable: '--font-dancing',
})

const BASE_URL = 'https://www.wallcoveringsbydondye.com'

type Props = {
  params: { slug: string }
}

export async function generateStaticParams() {
  const projects = await getProjects()
  return projects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params.slug)
  if (!project) return {}

  const title =
    project.seo?.metaTitle ??
    `${project.name} | Wallpaper Installation Gallery | Don Dye Austin TX`
  const description =
    project.seo?.metaDescription ??
    project.description ??
    `View this professional wallpaper installation by Don Dye in Austin, TX. Expert wallcovering work in Central Texas.`
  const ogImage = project.seo?.ogImageUrl ?? project.image ?? '/og-image.jpg'
  const url = `${BASE_URL}/gallery/${params.slug}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: 'Wallcoverings By Don Dye',
      images: [{ url: ogImage, width: 1200, height: 630, alt: project.alt ?? project.name }],
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

function ProjectSchema({ project }: { project: Awaited<ReturnType<typeof getProject>> }) {
  const imageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    name: project.name,
    description:
      project.description ??
      `Professional wallpaper installation by Don Dye — ${project.name}`,
    contentUrl: project.image,
    url: `${BASE_URL}/gallery/${project.slug}`,
    author: {
      '@type': 'Person',
      name: 'Don Dye',
      worksFor: {
        '@type': 'LocalBusiness',
        name: 'Wallcoverings By Don Dye',
        url: BASE_URL,
      },
    },
    ...(project.tags?.length ? { keywords: project.tags.join(', ') } : {}),
  }

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
      { '@type': 'ListItem', position: 2, name: 'Gallery', item: `${BASE_URL}/gallery` },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.name,
        item: `${BASE_URL}/gallery/${project.slug}`,
      },
    ],
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  )
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProject(params.slug)
  if (!project) notFound()

  return (
    <div className="max-w-3xl mx-auto min-h-screen p-8 bg-amber-100 bg-opacity-80">
      <ProjectSchema project={project} />

      <Link
        href="/gallery"
        className="text-green-800 hover:text-green-600 text-sm font-medium mb-6 inline-block"
      >
        ← Back to Gallery
      </Link>

      <h1
        className={`${headerFont.variable} font-headers text-green-900 text-4xl drop-shadow font-extrabold mb-6`}
      >
        {project.name}
      </h1>

      <div className="relative w-full aspect-[4/3] mb-6 rounded-sm overflow-hidden border border-gray-400 shadow">
        <Image
          src={project.image}
          alt={project.alt ?? project.name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      {project.description && (
        <p className="text-gray-700 text-lg leading-relaxed mb-6">{project.description}</p>
      )}

      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="border-t border-gray-300 pt-6">
        <p className="text-gray-700 mb-4">
          Interested in a similar look for your home? Don Dye serves Austin and all of Central
          Texas.
        </p>
        <Link href="/contact">
          <button
            type="button"
            className="text-gray-700 bg-amber-300 hover:bg-green-700 hover:text-gray-200 focus:ring-4 focus:outline-none font-medium rounded-md text-sm px-4 py-2"
          >
            Get a Free Estimate
          </button>
        </Link>
      </div>
    </div>
  )
}

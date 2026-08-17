import { getProject, getProjects } from '@/sanity/sanity-utils'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import PageHero from '../../Components/PageHero'
import Section from '../../Components/Section'

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
    <div>
      <ProjectSchema project={project} />

      <PageHero size="sm">
        <Link
          href="/gallery"
          className="mb-4 inline-block text-sm font-medium text-green-800 hover:text-green-600"
        >
          ← Back to Gallery
        </Link>
        <h1 className="font-headers text-4xl font-extrabold text-green-900 md:text-5xl">
          {project.name}
        </h1>
      </PageHero>

      <Section width="narrow">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-md">
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
          <p className="mt-8 text-lg leading-relaxed text-gray-800">{project.description}</p>
        )}

        {project.tags && project.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="mt-12 border-t border-amber-200 pt-8">
          <p className="mb-5 text-gray-800">
            Interested in a similar look for your home? Don Dye serves Austin and all of Central
            Texas.
          </p>
          <Link
            href="/contact"
            className="inline-flex min-h-[44px] items-center justify-center rounded-md bg-green-900 px-6 py-3 text-amber-200 shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:bg-green-800 hover:text-amber-200 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-amber-300"
          >
            Get a Free Estimate
          </Link>
        </div>
      </Section>
    </div>
  )
}

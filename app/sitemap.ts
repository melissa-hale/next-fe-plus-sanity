import { MetadataRoute } from 'next'
import { getPages, getProjects } from '@/sanity/sanity-utils'

const BASE_URL = 'https://www.wallcoveringsbydondye.com'

const CITY_SLUGS = [
  'austin',
  'round-rock',
  'cedar-park',
  'georgetown',
  'pflugerville',
  'kyle',
  'buda',
  'san-marcos',
  'lakeway',
  'dripping-springs',
  'leander',
  'manor',
  'westlake-hills',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [pages, projects] = await Promise.all([getPages(), getProjects()])

    const pageBySlug = Object.fromEntries(pages.map((p) => [p.slug, p]))
    const lastMod = (slug: string) =>
      pageBySlug[slug] ? new Date(pageBySlug[slug]._updatedAt) : new Date()

    console.log(lastMod('home'))

    const staticRoutes: MetadataRoute.Sitemap = [
      { url: BASE_URL,                lastModified: lastMod('home') },
      { url: `${BASE_URL}/about`,     lastModified: lastMod('about') },
      { url: `${BASE_URL}/contact`,   lastModified: lastMod('contact') },
      { url: `${BASE_URL}/gallery`,   lastModified: lastMod('gallery') },
    ]

    const pageRoutes: MetadataRoute.Sitemap = pages
      .filter((page) => !['about', 'contact', 'gallery', 'home'].includes(page.slug))
      .map((page) => ({
        url: `${BASE_URL}/${page.slug}`,
        lastModified: new Date(page._updatedAt),
      }))

    const projectRoutes: MetadataRoute.Sitemap = projects
      .filter((p) => p.slug)
      .map((project) => ({
        url: `${BASE_URL}/gallery/${project.slug}`,
        lastModified: new Date(project._updatedAt ?? project._createdAt),
      }))

    const cityRoutes: MetadataRoute.Sitemap = CITY_SLUGS.map((city) => ({
      url: `${BASE_URL}/service-area/${city}`,
      lastModified: new Date('2026-05-02'),
    }))

    return [...staticRoutes, ...pageRoutes, ...projectRoutes, ...cityRoutes]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return [{ url: BASE_URL, lastModified: new Date() }]
  }
}
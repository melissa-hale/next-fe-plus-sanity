// app/sitemap.ts
import { MetadataRoute } from 'next'
import { getPages, getProjects } from '@/sanity/sanity-utils'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.wallcoveringsbydondye.com' // UPDATE WITH YOUR ACTUAL DOMAIN
  
  try {
    const pages = await getPages()
    const projects = await getProjects()
    
    // Static routes - Next.js sitemap only needs url and lastModified
    const staticRoutes = [
      {
        url: baseUrl,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/about`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/contact`,
        lastModified: new Date(),
      },
      {
        url: `${baseUrl}/gallery`,
        lastModified: new Date(),
      }
    ]

    // Dynamic pages from Sanity (if you add more pages later)
    const pageRoutes = pages
      .filter(page => !['about', 'contact', 'gallery', 'home'].includes(page.slug))
      .map((page) => ({
        url: `${baseUrl}/${page.slug}`,
        lastModified: new Date(page._createdAt),
      }))

    return [...staticRoutes, ...pageRoutes]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return minimal sitemap if there's an error
    return [
      {
        url: baseUrl,
        lastModified: new Date(),
      }
    ]
  }
}
import { MetadataRoute } from 'next'
import { getPages, getProjects } from '@/sanity/sanity-utils'

const BASE_URL = 'https://www.wallcoveringsbydondye.com'

// Bump whenever /service-area's copy changes materially — a frozen date tells
// crawlers the page is stale when it isn't. Last change: 2026-08-17, when the
// 13 per-city routes were folded into this one page.
const SERVICE_AREA_UPDATED = new Date('2026-08-17')

// Without this the route is baked at build time and newly published pages and
// projects never reach the sitemap. Next uses the lowest revalidate in the
// segment, so the 60s on the Sanity fetches wins — this is the outer bound.
export const revalidate = 3600

// Sanity `page` slugs that must not be emitted as generic page routes.
//
// - about / contact / gallery: already listed in `staticRoutes` below, with the
//   home page, so including them here would duplicate them.
// - home: renders at `/` — the `staticRoutes` entry is the canonical one. (The
//   `/home` URL itself 301s to `/`; see next.config.js.)
// - my-process: renders EMPTY. `[slug]/page.tsx` only passes children for the
//   gallery, contact and about slugs, so every other page document falls
//   through to a bare <h1>. The Sanity document has 3 content blocks that no
//   code path renders. Submitting a blank page to Google is a soft-404 signal,
//   so it stays out until it either gets a renderer or gets deleted.
//   See CLAUDE.md Phase 8.8 — remove this entry once the page renders.
const EXCLUDED_FROM_SITEMAP = ['about', 'contact', 'gallery', 'home', 'my-process']

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    const [pages, projects] = await Promise.all([getPages(), getProjects()])

    const pageBySlug = Object.fromEntries(pages.map((p) => [p.slug, p]))
    const lastMod = (slug: string) =>
      pageBySlug[slug] ? new Date(pageBySlug[slug]._updatedAt) : new Date()

    const staticRoutes: MetadataRoute.Sitemap = [
      { url: BASE_URL,                lastModified: lastMod('home') },
      { url: `${BASE_URL}/about`,     lastModified: lastMod('about') },
      { url: `${BASE_URL}/contact`,   lastModified: lastMod('contact') },
      { url: `${BASE_URL}/gallery`,   lastModified: lastMod('gallery') },
    ]

    const pageRoutes: MetadataRoute.Sitemap = pages
      .filter((page) => !EXCLUDED_FROM_SITEMAP.includes(page.slug))
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

    // One route, not fourteen. The 13 /service-area/[city] URLs were removed on
    // 2026-08-17 and 301 to this page (see next.config.js) — listing a
    // redirecting URL in a sitemap is a crawl-budget waste and a soft error in
    // Search Console, so they must not reappear here.
    const serviceAreaRoutes: MetadataRoute.Sitemap = [
      { url: `${BASE_URL}/service-area`, lastModified: SERVICE_AREA_UPDATED },
    ]

    return [...staticRoutes, ...pageRoutes, ...projectRoutes, ...serviceAreaRoutes]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return [{ url: BASE_URL, lastModified: new Date() }]
  }
}
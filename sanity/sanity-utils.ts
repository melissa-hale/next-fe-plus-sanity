import { Project } from '@/types/Project';
import { Page } from '@/types/Page';
import { createClient, groq } from 'next-sanity'
import clientConfig from './config/client-config';

// Next's Data Cache defaults every fetch to `force-cache`, which meant Sanity
// responses were cached until the next deploy — publishing in the Studio never
// reached the live site. Revalidating puts new content live within a minute.
const cacheOptions = { next: { revalidate: 60 } } as const;

const projectFields = `
        _id,
        _createdAt,
        _updatedAt,
        name,
        "slug": slug.current,
        "image": image.asset->url,
        "alt": image.alt,
        url,
        content,
        description,
        tags,
        featured,
        featuredOrder
`;

export async function getProjects(): Promise<Project[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project"]{${projectFields}}`,
    {},
    cacheOptions
  );
}

/**
 * Projects for the homepage "Recent Work" grid.
 *
 * Ordering is controlled from the Studio: tick "Show on homepage" on a project
 * and optionally give it a "Homepage order" number. If nothing is flagged yet,
 * falls back to the newest projects so the homepage grid is never empty.
 */
export async function getFeaturedProjects(limit = 6): Promise<Project[]> {
  const projects: Project[] = await createClient(clientConfig).fetch(
    groq`*[_type == "project"] | order(coalesce(featuredOrder, 9999) asc, _createdAt desc){${projectFields}}`,
    {},
    cacheOptions
  );

  const featured = projects.filter((project) => project.featured);
  return (featured.length > 0 ? featured : projects).slice(0, limit);
}

export async function getProject(slug: string): Promise<Project> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project" && slug.current == $slug][0]{
        _id,
        _createdAt,
        _updatedAt,
        name,
        "slug": slug.current,
        "image": image.asset->url,
        "alt": image.alt,
        url,
        content,
        description,
        tags,
        seo {
          metaTitle,
          metaDescription,
          "ogImageUrl": ogImage.asset->url
        }
    }`,
    { slug }, //this is how you pass in a slug
    cacheOptions
  );
}

export async function getPages(): Promise<Page[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "page"]{
        _id,
        _createdAt,
        _updatedAt,
        title,
        "slug": slug.current
    }`,
    {},
    cacheOptions
  );
}

export async function getPage(slug: string): Promise<Page> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "page" && slug.current == $slug][0]{
        _id,
        _createdAt,
        title,
        "slug": slug.current,
        content,
        section_content,
        seo {
          metaTitle,
          metaDescription,
          "ogImageUrl": ogImage.asset->url
        }
    }`,
    { slug }, //this is how you pass in a slug
    cacheOptions
  );
}

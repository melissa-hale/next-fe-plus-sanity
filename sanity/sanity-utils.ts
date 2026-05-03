import { Project } from '@/types/Project';
import { Page } from '@/types/Page';
import { createClient, groq } from 'next-sanity'
import clientConfig from './config/client-config';

export async function getProjects(): Promise<Project[]> {
  return createClient(clientConfig).fetch(
    groq`*[_type == "project"]{
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
        tags
    }`
  );
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
    { slug } //this is how you pass in a slug
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
    }`
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
    { slug } //this is how you pass in a slug
  );
}

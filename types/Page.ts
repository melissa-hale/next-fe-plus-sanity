import { PortableTextBlock } from "sanity";

export type PageSeo = {
    metaTitle?: string;
    metaDescription?: string;
    ogImageUrl?: string;
}

export type Page = {
    _id: string;
    _createdAt: Date;
    _updatedAt: Date;
    title: string;
    slug: string;
    content: PortableTextBlock[];
    section_content: PortableTextBlock[];
    seo?: PageSeo;
}
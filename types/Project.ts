import { PortableTextBlock } from "sanity";

export type ProjectSeo = {
    metaTitle?: string;
    metaDescription?: string;
    ogImageUrl?: string;
}

export type Project = {
    _id: string;
    _createdAt: Date;
    _updatedAt: Date;
    name: string;
    slug: string;
    image: string;
    url: string;
    content: PortableTextBlock[];
    alt: string;
    description?: string;
    tags?: string[];
    featured?: boolean;
    featuredOrder?: number;
    seo?: ProjectSeo;
}

const project = {
    name: "project",
    title: "Projects",
    type: "document",
    fields: [
        {
            name: "name",
            title: "Name",
            type: "string"
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { source: "name" }
        },
        {
            name: "image",
            title: "Image",
            type: "image",
            options: { hotspot: true },
            fields: [
                {
                    name: "alt",
                    title: "Alt",
                    type: "string"
                }
            ]
        },
        {
            name: "url",
            title: "URL",
            type: "url"
        },
        {
            name: "content",
            title: "Content",
            type: "array",
            of: [{ type: "block" }]
        },
        {
            name: "description",
            title: "Description",
            type: "text",
            rows: 4
        },
        {
            name: "tags",
            title: "Tags",
            type: "array",
            of: [{ type: "string" }],
            options: { layout: "tags" }
        },
        {
            name: "featured",
            title: "Show on homepage",
            description: "Turn this on to include the project in the \"Recent Work\" grid on the homepage.",
            type: "boolean",
            initialValue: false
        },
        {
            name: "featuredOrder",
            title: "Homepage order",
            description: "Lower numbers show first (1, 2, 3...). Leave blank to sort by newest.",
            type: "number",
            hidden: ({ document }: any) => !document?.featured
        },
        {
            name: "seo",
            title: "SEO",
            type: "object",
            fields: [
                { name: "metaTitle", title: "Meta Title", type: "string" },
                { name: "metaDescription", title: "Meta Description", type: "text", rows: 3 },
                { name: "ogImage", title: "Social Share Image", type: "image" }
            ]
        },
    ],
    orderings: [
        {
            title: "Homepage order",
            name: "featuredOrderAsc",
            by: [{ field: "featuredOrder", direction: "asc" }]
        },
        {
            title: "Newest first",
            name: "createdAtDesc",
            by: [{ field: "_createdAt", direction: "desc" }]
        }
    ],
    // Surfaces which projects are on the homepage, and in what order, directly in
    // the Studio document list.
    preview: {
        select: {
            title: "name",
            media: "image",
            featured: "featured",
            featuredOrder: "featuredOrder"
        },
        prepare({ title, media, featured, featuredOrder }: any) {
            return {
                title,
                media,
                subtitle: featured
                    ? `★ Homepage${typeof featuredOrder === "number" ? ` · #${featuredOrder}` : ""}`
                    : "Gallery only"
            }
        }
    }
}

export default project
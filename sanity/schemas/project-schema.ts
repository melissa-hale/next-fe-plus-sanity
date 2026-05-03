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
            name: "seo",
            title: "SEO",
            type: "object",
            fields: [
                { name: "metaTitle", title: "Meta Title", type: "string" },
                { name: "metaDescription", title: "Meta Description", type: "text", rows: 3 },
                { name: "ogImage", title: "Social Share Image", type: "image" }
            ]
        },
    ]
}

export default project
const page = {
    name: "page",
    title: "Pages",
    type: "document",
    fields: [
        {
            name: "title",
            title: "Title",
            type: "string"
        },
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: { 
                source: "title",
                maxLength: 96
            }
        },
        {
            name: "content",
            title: "Content",
            type: "array",
            of: [{ type: "block"}]
        },
        {
            name: "section_content",
            title: "Section Content",
            type: "array",
            of: [{ type: "block"}]
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

export default page;
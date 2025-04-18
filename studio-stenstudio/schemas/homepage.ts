export default {
  name: "homepage",
  title: "Homepage",
  type: "document",
  groups: [
    {
      name: "content",
      title: "Content",
    },
    {
      name: "seo",
      title: "SEO",
    },
  ],
  fields: [
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "content",
    },
    {
      name: "sections",
      title: "Page Sections",
      type: "array",
      of: [{ type: "pageSection" }],
      group: "content",
    },
    {
      name: "heroHeading",
      title: "Hero Heading",
      type: "string",
      group: "content",
    },
    {
      name: "heroSubheading",
      title: "Hero Subheading",
      type: "text",
      rows: 3,
      group: "content",
    },
    {
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: {
        hotspot: true,
      },
      group: "content",
    },
    {
      name: "featuredPosts",
      title: "Featured Posts",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "post" }],
        },
      ],
      validation: (Rule) => Rule.max(3),
      group: "content",
    },
    {
      name: "seo",
      title: "SEO",
      type: "object",
      group: "seo",
      fields: [
        {
          name: "metaTitle",
          title: "Meta Title",
          type: "string",
        },
        {
          name: "metaDescription",
          title: "Meta Description",
          type: "text",
          rows: 3,
        },
        {
          name: "shareImage",
          title: "Share Image",
          type: "image",
        },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title || "Homepage",
      }
    },
  },
}

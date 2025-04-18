import { PageBuilderInput } from "../../components/page-builder-input"

export default {
  name: "pageSection",
  title: "Page Section",
  type: "object",
  components: {
    input: PageBuilderInput,
  },
  fields: [
    {
      name: "title",
      title: "Section Title",
      type: "string",
    },
    {
      name: "type",
      title: "Section Type",
      type: "string",
      options: {
        list: [
          { title: "Hero", value: "hero" },
          { title: "Features", value: "features" },
          { title: "Content", value: "content" },
          { title: "Gallery", value: "gallery" },
          { title: "Call to Action", value: "cta" },
        ],
      },
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
    },
    {
      name: "media",
      title: "Media",
      type: "array",
      of: [{ type: "image" }],
    },
    {
      name: "backgroundColor",
      title: "Background Color",
      type: "color",
    },
    {
      name: "textColor",
      title: "Text Color",
      type: "color",
    },
  ],
  preview: {
    select: {
      title: "title",
      type: "type",
    },
    prepare({ title, type }) {
      return {
        title: title || "Untitled Section",
        subtitle: `${type.charAt(0).toUpperCase() + type.slice(1)} Section`,
      }
    },
  },
}

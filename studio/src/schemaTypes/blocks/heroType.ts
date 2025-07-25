import { defineField, defineType } from "sanity";
import { TextIcon } from "@sanity/icons";

export const heroType = defineType({
  name: "hero",
  type: "object",
  fields: [
    defineField({
      name: "person",
      type: "string",
    }),
    defineField({
      name: "title",
      type: "string",
    }),

    defineField({
      name: "text",
      type: "richTextContent",
    }),
    defineField({
      name: "image",
      type: "image",
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
    prepare({ title, media }) {
      return {
        title,
        subtitle: "Hero",
        media: media ?? TextIcon,
      };
    },
  },
});
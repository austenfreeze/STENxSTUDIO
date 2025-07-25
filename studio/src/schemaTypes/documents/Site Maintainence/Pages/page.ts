import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const page = defineType({
  name: "page",
  title: "Page",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "title",
      },
    }),
    defineField({
      name: "content",
      type: "pageBuilder",
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: {
        hotspot: true,
      },
    }),    
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "slug.current",
    },
  },
});
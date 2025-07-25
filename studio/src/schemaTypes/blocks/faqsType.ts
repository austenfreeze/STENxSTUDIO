import { defineField, defineType } from "sanity";
import { HelpCircleIcon } from "@sanity/icons";

export const faqsType = defineType({
  name: "faqsType",
  title: "FAQs",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
    }),
    defineField({
      name: "faqs",
      title: "FAQs",
      type: "array",
      of: [{ type: "reference", to: [{ type: "faq" }] }],
    }),
  ],
 preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title,
        subtitle: "FAQs",
      };
    },
  },
});

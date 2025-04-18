export default {
  name: "callout",
  title: "Callout",
  type: "object",
  fields: [
    {
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Info", value: "info" },
          { title: "Warning", value: "warning" },
          { title: "Success", value: "success" },
          { title: "Error", value: "error" },
        ],
        layout: "radio",
      },
      initialValue: "info",
    },
    {
      name: "heading",
      title: "Heading",
      type: "string",
    },
    {
      name: "text",
      title: "Text",
      type: "array",
      of: [{ type: "block", styles: [], lists: [] }],
    },
  ],
  preview: {
    select: {
      heading: "heading",
      type: "type",
    },
    prepare({ heading, type }) {
      return {
        title: heading || "Callout",
        subtitle: `${type.charAt(0).toUpperCase() + type.slice(1)} callout`,
      }
    },
  },
}

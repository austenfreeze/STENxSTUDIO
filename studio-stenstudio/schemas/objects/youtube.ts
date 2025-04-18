export default {
  name: "youtube",
  title: "YouTube Embed",
  type: "object",
  fields: [
    {
      name: "url",
      title: "YouTube URL",
      type: "url",
      description: "The URL of the YouTube video you want to embed",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "caption",
      title: "Caption",
      type: "string",
    },
  ],
  preview: {
    select: {
      url: "url",
    },
    prepare({ url }) {
      return {
        title: "YouTube Embed",
        subtitle: url,
      }
    },
  },
}

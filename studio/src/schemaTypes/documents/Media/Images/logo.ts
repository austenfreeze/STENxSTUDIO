// logo.ts
import {defineField, defineType} from 'sanity'
import {BsCardImage} from 'react-icons/bs'
// TagIcon is no longer strictly necessary if not using categories in preview fallback

export const logo = defineType({
  name: 'logo',
  title: 'Brand Logo',
  type: 'document',
  icon: BsCardImage,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'A descriptive name for this logo (e.g., "Google Logo - Color").',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'A concise description of the logo for accessibility.',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      altText: 'image.alt', // <-- Re-added this
      media: 'image',
    },
    prepare({title, altText, media}) { // <-- Added altText here
      const subtitleText = altText || 'No alt text provided'; // Fallback if alt is empty

      return {
        title: title || 'Untitled Logo', // Fallback for title
        subtitle: `Alt: ${subtitleText}`, // Prepend "Alt:" for clarity
        media: media || BsCardImage, // Fallback icon if no image
      }
    },
  },
})
// customImage.ts
import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'

export const customImage = defineType({
  name: 'customImage',
  title: 'Image',
  type: 'object',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      title: 'Image File',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'title',
          title: 'Image Title',
          type: 'string',
          description: 'A title for the image. This will be used as the alternative text (alt).',
        }),
        // If you want a separate alt text field:
        // defineField({
        //   name: 'altText',
        //   title: 'Alternative Text (Alt)',
        //   type: 'string',
        //   description: 'Important for SEO and accessibility.',
        //   validation: (Rule) => Rule.required(),
        // }),
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
  ],
  preview: {
    select: {
      title: 'image.title',
      // alt: 'image.alt', // Removed as 'alt' isn't directly a defined field here
      fileName: 'image.asset.originalFilename',
      media: 'image',
    },
    prepare({title, fileName, media}) { // Removed 'alt' from prepare params
      const formatFileName = (name) => {
        if (!name) return ''
        const noExtension = name.replace(/\.[^/.]+$/, '')
        const withSpaces = noExtension.replace(/[-_]/g, ' ')
        return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1)
      }

      // The preview shows the manually entered title or suggests one from the filename.
      const displayTitle = title || formatFileName(fileName) || 'Untitled Image'

      return {
        title: displayTitle,
        // Subtitle now correctly references the 'title' field as the alt source.
        subtitle: `Alt: ${displayTitle}`, // Corrected: Using displayTitle as the alt text indication
        media: media,
      }
    },
  },
})
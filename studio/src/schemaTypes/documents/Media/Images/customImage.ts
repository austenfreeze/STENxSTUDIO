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
          description: 'A title for the image. This will be used to auto-generate the alt text.',
        }),
      ],
    }),
defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'relatedContent',
      title: 'Related Content',
      type: 'relatedContent'
    })
  ],
  preview: {
    select: {
      title: 'image.title',
      alt: 'image.alt',
      fileName: 'image.asset.originalFilename',
      media: 'image',
    },
    prepare({title, alt, fileName, media}) {
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
        // The subtitle shows the alt text, which should match the title.
        subtitle: `Alt: ${alt || '(auto-generated from title)'}`,
        media: media,
      }
    },
  },
})
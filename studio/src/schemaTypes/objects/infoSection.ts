import {defineField, defineType} from 'sanity'
import {TextIcon} from '@sanity/icons'

export const infoSection = defineType({
  name: 'infoSection',
  title: 'Info Section',
  type: 'object',
  icon: TextIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'richTextContent',
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Untitled Info Section',
        subtitle: subtitle || '',
      }
    },
  },
})

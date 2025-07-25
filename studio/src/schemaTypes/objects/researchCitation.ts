import {defineField, defineType} from 'sanity'
import {InfoOutlineIcon} from '@sanity/icons'

export const researchCitation = defineType({
  name: 'researchCitation',
  title: 'Research Citation',
  type: 'object',
  icon: InfoOutlineIcon,
  fields: [
    defineField({
      name: 'element',
      title: 'Research Element',
      type: 'reference',
      to: [{type: 'researchElement'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'comment',
      title: 'Editorial Comment',
      type: 'text',
      rows: 3,
      description: 'Private note on why this citation is relevant here.',
    }),
  ],
  preview: {
    select: {
      title: 'element.title',
      subtitle: 'element.source.name',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'No title',
        subtitle: `Source: ${subtitle || 'N/A'}`,
        media: InfoOutlineIcon,
      }
    },
  },
})
import {defineType, defineField} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const sublink = defineType({
  name: 'sublink',
  title: 'Sublink',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Sublink Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Sublink URL',
      type: 'url',
      validation: Rule => Rule.required().uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'parentResource',
      title: 'Parent Resource',
      type: 'reference',
      to: [{type: 'resource'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url',
    },
    prepare({title, subtitle}) {
      return {
        title,
        subtitle: subtitle?.replace(/^https?:\/\//, '') || '',
      }
    },
  },
})

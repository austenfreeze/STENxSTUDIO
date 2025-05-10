import {defineType, defineField} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const resource = defineType({
  name: 'resource',
  title: 'Resource',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Resource Name',
      type: 'string',
      validation: Rule => Rule.required().min(3),
    }),
    defineField({
      name: 'title',
      title: 'Display Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'hostUrl',
      title: 'Main Host URL',
      type: 'url',
      validation: Rule => Rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'sublinks',
      title: 'Sublinks',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'sublink'}],
        },
      ],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Tool', value: 'tool'},
          {title: 'Platform', value: 'platform'},
          {title: 'Documentation', value: 'docs'},
          {title: 'API', value: 'api'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'logo',
      title: 'Resource Icon or Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'hostUrl',
      media: 'logo',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Untitled Resource',
        subtitle: subtitle?.replace(/^https?:\/\//, '') || '',
        media,
      }
    },
  },
})

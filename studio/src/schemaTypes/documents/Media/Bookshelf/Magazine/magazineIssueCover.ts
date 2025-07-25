// schemas/magazineIssueCover.ts
import {defineField, defineType} from 'sanity'
import {ImageIcon, DocumentTextIcon} from '@sanity/icons'

export const magazineIssueCover = defineType({
  name: 'magazineIssueCover',
  title: 'Magazine Issue Cover',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'issue',
      title: 'Associated Issue',
      type: 'reference',
      to: [{type: 'magazineIssue'}],
      description: 'The specific magazine issue this cover belongs to.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'A concise description of the cover for accessibility.',
          validation: (rule) => rule.required(),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
defineField({
  name: 'headlines',
  title: 'Headlines',
  type: 'array',
  description: 'Text featured on the cover.',
  of: [{ type: 'string' }],
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
      issueTitle: 'issue.title',
      magazineTitle: 'issue.magazine.title',
      media: 'coverImage',
    },
    prepare({issueTitle, magazineTitle, media}) {
      const title = `${magazineTitle || 'Magazine'}: ${issueTitle || 'Issue'} Cover`
      return {
        title: title,
        subtitle: 'Magazine Issue Cover',
        media: media || ImageIcon,
      }
    },
  },
})
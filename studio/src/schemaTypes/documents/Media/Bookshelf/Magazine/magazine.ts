// schemas/magazine.ts
import {defineField, defineType} from 'sanity'
import {BookIcon} from '@sanity/icons'

export const magazine = defineType({
  name: 'magazine',
  title: 'Magazine',
  type: 'document',
  icon: BookIcon,
  fieldsets: [{name: 'publicationDetails', title: 'Publication Details'}],
  fields: [
    defineField({
      name: 'title',
      title: 'Magazine Title',
      type: 'string',
      description: 'The official name of the magazine (e.g., "TIME Magazine").',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publisher',
      title: 'Publisher',
      type: 'reference',
      to: [{type: 'publisher'}],
      description: 'The company that publishes this magazine.',
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'logo',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'stillInPrint',
      title: 'Still in Print?',
      type: 'boolean',
      initialValue: true,
      fieldset: 'publicationDetails',
    }),
    defineField({
      name: 'firstIssueDate',
      title: 'First Issue Date',
      type: 'date',
      fieldset: 'publicationDetails',
    }),
    defineField({
      name: 'lastIssueDate',
      title: 'Last Issue Date',
      type: 'date',
      fieldset: 'publicationDetails',
      hidden: ({parent}) => parent?.stillInPrint,
    }),
    defineField({
      name: 'issues',
      title: 'Issues',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'magazineIssue'}]}],
      description: 'A list of all issues for this magazine.',
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
      title: 'title',
      firstDate: 'firstIssueDate',
      lastDate: 'lastIssueDate',
      inPrint: 'stillInPrint',
      media: 'logo.image',
    },
    prepare({title, firstDate, lastDate, inPrint, media}) {
      const firstYear = firstDate ? new Date(firstDate).getFullYear() : ''
      const lastYear = lastDate ? new Date(lastDate).getFullYear() : ''
      const publicationRun = firstYear
        ? `${firstYear} - ${inPrint ? 'Present' : lastYear || 'N/A'}`
        : 'No dates set'

      return {
        title: title,
        subtitle: publicationRun,
        media: media || BookIcon,
      }
    },
  },
})
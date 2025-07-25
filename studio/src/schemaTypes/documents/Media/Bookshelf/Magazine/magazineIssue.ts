// schemas/magazineIssue.ts
import {defineField, defineType} from 'sanity'
import {DocumentsIcon} from '@sanity/icons'
import SeriesNavigationInput from '../../../../components/SeriesNavigationInput' // Adjust path based on your structure


export const magazineIssue = defineType({
  name: 'magazineIssue',
  title: 'Magazine Issue',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'magazine',
      title: 'Magazine',
      type: 'reference',
      to: [{type: 'magazine'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'issueNumber',
      title: 'Issue Number', // Changed for consistency
      type: 'string',
      description: 'e.g., "Vol. 001, Iss. 333, or "No. 696"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Issue Title',
      type: 'string',

      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Issue Subtitle',
      type: 'string',
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
      name: 'publicationDate',
      title: 'Publication Date',
      type: 'date',
      options: {
        dateFormat: 'MMMM YYYY',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'cover',
      title: 'Issue Cover',
      type: 'reference',
      to: [{type: 'magazineIssueCover'}],
      description: 'Reference to the cover art for this issue.',
    }),
    defineField({
      name: 'articles',
      title: 'Articles',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'magazineArticle'}]}],
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
      issueTitle: 'title',
      magazineTitle: 'magazine.title',
      publicationDate: 'publicationDate',
      articleCount: 'articles.length',
      // Assuming 'pages' is a typo and should be 'articles.length' or another field you define
      // If 'pages' refers to something else, you'll need to add a 'pages' field to your schema
      media: 'cover.coverImage',
    },
    prepare({issueTitle, magazineTitle, publicationDate, articleCount, media}) {
      const date = publicationDate
        ? new Date(publicationDate).toLocaleDateString('en-US', {year: 'numeric', month: 'long'})
        : ''
      const articles = articleCount > 0 ? `${articleCount} Articles` : 'No articles'
      // Removed 'pages' from subtitle as it's not defined in select and caused issues
      const subtitle = [magazineTitle, date, articles].filter(Boolean).join(' | ')
      return {
        title: issueTitle,
        subtitle: subtitle,
        media: media || DocumentsIcon,
      }
    },
  },
})
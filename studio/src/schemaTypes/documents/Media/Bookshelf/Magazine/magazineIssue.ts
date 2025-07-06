// schemas/magazineIssue.ts
import {defineField, defineType} from 'sanity'
import {DocumentsIcon} from '@sanity/icons'

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
      name: 'title',
      title: 'Issue Title or Number',
      type: 'string',
      description: 'e.g., "Vol. 42, No. 3" or "The Future of AI Issue".',
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
      pageCount: 'pages.length',
      media: 'cover.coverImage',
    },
    prepare({issueTitle, magazineTitle, publicationDate, articleCount, pageCount, media}) {
      const date = publicationDate
        ? new Date(publicationDate).toLocaleDateString('en-US', {year: 'numeric', month: 'long'})
        : ''
      const articles = articleCount > 0 ? `${articleCount} Articles` : 'No articles'
      const pages = pageCount > 0 ? `${pageCount} Pages` : 'No pages'
      const subtitle = [magazineTitle, date, articles, pages].filter(Boolean).join(' | ')
      return {
        title: issueTitle,
        subtitle: subtitle,
        media: media || DocumentsIcon,
      }
    },
  },
})
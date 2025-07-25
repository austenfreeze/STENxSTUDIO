import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const magazineArticle = defineType({
  name: 'magazineArticle',
  title: 'Magazine Article',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'issue',
      title: 'Magazine Issue',
      type: 'reference',
      to: [{type: 'magazineIssue'}],
      description: 'The issue this article was published in.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'articleCover',
      title: 'Article Cover',
      type: 'customImage',
      description: 'The primary image or cover art for this article.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'e.g., "ALIENS, AMPHETAMINES, AND ARTIFICIAL INSANITY:',
    }),
    defineField({
      name: 'subtitle',
      title: 'Article Subtitle',
      description: 'e.g., "AUSTEN\'S ANTICIPATED ARTICLE"',
      type: 'string',
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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'person'}],
    }),
    defineField({
      name: 'pageNumber',
      title: 'Starting Page Number',
      type: 'number',
    }),
    defineField({
      name: 'pages',
      title: 'Pages',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'magazinePage'}]}],
      description: 'Reference the scanned pages this article appears on.',
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}, {type: 'customImage'}],
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
    }),
    defineField({
      name: 'researchDocument',
      title: 'Research Document',
      type: 'reference', 
to: [{type: 'researchDocument', }],
    })
  ],
  // --- ENHANCED PREVIEW ---
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      authorFirstName: 'author.firstName',
      authorLastName: 'author.lastName',
      issueTitle: 'issue.title',
      magazineTitle: 'issue.magazine.title',
      pageNumber: 'pageNumber',
      // Get the image from the new 'articleCover' field
      media: 'articleCover.image',
    },
    prepare({title, subtitle, authorFirstName, authorLastName, issueTitle, magazineTitle, pageNumber, media}) {
      const author = [authorFirstName, authorLastName].filter(Boolean).join(' ')
      const page = pageNumber ? `p. ${pageNumber}` : ''

      // If the article has its own subtitle, use it.
      // Otherwise, construct a rich, descriptive subtitle from related data.
      const displaySubtitle =
        subtitle || [author, magazineTitle, issueTitle, page].filter(Boolean).join(' | ')

      return {
        title: title,
        subtitle: displaySubtitle,
        media: media || DocumentTextIcon,
      }
    },
  },
});
// schemas/commonFields.ts
import {defineField} from 'sanity'

export const commonCategorizationFields = [
  defineField({
    name: 'categories',
    title: 'Categories',
    type: 'array',
    of: [{type: 'reference', to: {type: 'category'}}],
  }),
defineField({
      name: 'referencedPeople',
      title: 'Referenced People',
      type: 'referencedPeople',
    }),
  defineField({
    name: 'relatedContent',
    title: 'Related Content',
    type: 'relatedContent' // Assuming 'relatedContent' is another custom schema type
  }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Articles',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'newspaperArticle'}]}],
      description: 'Links to other relevant articles.',
    }),
defineField({
      name: 'referencedPeople',
      title: 'Referenced People',
      type: 'referencedPeople',
    }),
defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        // Ensure uniqueness across all articles
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
      description: 'A unique identifier for the article in URLs.',
    }),
 defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'link'}]}],
      description: 'External Copy Of The Article.',
    }),
    defineField({
      name: 'Digital Version',
      title: 'Digital Version',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'customFile'}]}],
      description: 'External Copy Of The Article.',
    }),
 defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'Title for search engines (max 60 characters).',
          validation: (rule) => rule.max(60),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          description: 'Description for search engines (max 160 characters).',
          validation: (rule) => rule.max(160),
        }),
        defineField({
          name: 'ogImage',
          title: 'Open Graph Image',
          type: 'customImage',
          description: 'Image for social media sharing.',
        }),
      ],
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
];

// You could also define common preview selects/prepares if they are identical
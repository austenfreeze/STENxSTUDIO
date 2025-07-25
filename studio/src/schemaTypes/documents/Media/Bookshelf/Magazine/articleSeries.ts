// schemas/articleSeries.ts
import {defineField, defineType} from 'sanity'
import {BulbOutlineIcon} from '@sanity/icons' // Example icon

export const articleSeries = defineType({
  name: 'articleSeries',
  title: 'Article Series',
  type: 'document',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Series Title',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'e.g., "The History of AI in Pop Culture"',
    }),
    defineField({
      name: 'description',
      title: 'Series Description',
      type: 'text',
      rows: 3,
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
      name: 'articles',
      title: 'Articles in Series',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'seriesArticle',
          title: 'Series Article',
          fields: [
            defineField({
              name: 'article',
              title: 'Article',
              type: 'reference',
              to: [{type: 'magazineArticle'}],
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'partNumber',
              title: 'Part Number',
              type: 'number',
              description: 'e.g., 1 for Part One, 2 for Part Two.',
              validation: (rule) => rule.required().integer().min(1),
            }),
          ],
          preview: {
            select: {
              title: 'article.title',
              partNumber: 'partNumber',
              issueTitle: 'article.issue.title', // Assuming article links to issue
            },
            prepare({title, partNumber, issueTitle}) {
              return {
                title: `${title || 'Untitled Article'} (Part ${partNumber || '?'})`,
                subtitle: `Published in: ${issueTitle || 'N/A'}`,
              };
            },
          },
        },
      ],
      // This allows ordering the articles within the series
      options: {
        sortable: true,
      },
      description: 'Add articles in the order they appear in the series.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      articleCount: 'articles.length',
    },
    prepare({title, articleCount}) {
      return {
        title: title,
        subtitle: `${articleCount || 0} articles`,
        media: BulbOutlineIcon,
      };
    },
  },
});
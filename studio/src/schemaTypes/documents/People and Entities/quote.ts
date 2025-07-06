// quote.ts

import {BlockquoteIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const quote = defineType({
  name: 'quote',
  title: 'Quote',
  type: 'document',
  icon: BlockquoteIcon,
  fieldsets: [{name: 'attribution', title: 'Attribution & Source'}],
  fields: [
    defineField({
      name: 'text',
      title: 'Quote Text',
      type: 'text',
      description: 'The full content of the quote.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'These notes are for internal use and will not be published.',
      rows: 3,
    }),
    defineField({
      name: 'attribution',
      title: 'Attributed To',
      type: 'reference',
      to: [{type: 'person'}],
      fieldset: 'attribution',
    }),
    defineField({
      name: 'originalSource',
      title: 'Original Source',
      type: 'reference',
      to: [{type: 'book'}, {type: 'film'}, {type: 'documentary'}, {type: 'tvShowEpisode'}],
      description: 'The primary source where the quote originated.',
      fieldset: 'attribution',
    }),
    defineField({
      name: 'referencedSources',
      title: 'Referencing Sources',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'book'}, {type: 'film'}]}],
      description: 'Additional media which references this quote.',
      fieldset: 'attribution',
    }),
    defineField({
      name: 'relatedContent',
      title: 'Related Content',
      type: 'array',
      of: [{type: 'relatedContent',}],
}),
defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),

    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      description: 'A direct link to the source article, video, or page.',
      fieldset: 'attribution',
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      text: 'text',
      authorFirstName: 'attribution.firstName',
      authorLastName: 'attribution.lastName',
      sourceTitle: 'originalSource.title' || 'originalSource.bookTitle',
      media: 'media',
    },
    prepare({text, authorFirstName, authorLastName, sourceTitle, media}) {
      const title = text ? `"${text.substring(0, 80)}..."` : 'New Quote';
      
      const authorName = [authorFirstName, authorLastName].filter(Boolean).join(' ');
      
      // NEW: Format the source title with parentheses if it exists
      const sourceText = sourceTitle ? `(${sourceTitle})` : '';
      
      const subtitleParts = [authorName, sourceText].filter(Boolean);
      const subtitle = subtitleParts.length > 0 ? subtitleParts.join(' | ') : 'No attribution or source';

      return {
        title: title,
        subtitle: subtitle,
        media: media || BlockquoteIcon,
      }
    },
  },
})
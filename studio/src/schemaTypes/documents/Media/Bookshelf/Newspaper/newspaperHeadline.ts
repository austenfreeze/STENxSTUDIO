import {defineField, defineType} from 'sanity'
import {ComposeIcon} from '@sanity/icons'

export const newspaperHeadline = defineType({
  name: 'newspaperHeadline',
  title: 'Newspaper Headline',
  type: 'document',
  icon: ComposeIcon, // Added an icon for better UI

  fields: [
    defineField({
      name: 'headlineText',
      title: 'Headline Text',
      type: 'string',
      validation: (rule) => rule.required().max(250), // Added max length for typical headline
      description: 'The main text of the newspaper headline.',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'headlineText',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
      description: 'A unique identifier for the headline in URLs.',
    }),
    defineField({
      name: 'kicker',
      title: 'Kicker (Overline)',
      type: 'string',
      description: 'A short phrase above the main headline, often for context or to grab attention.',
    }),
    defineField({
      name: 'deck',
      title: 'Deck (Underline/Sub-headline)',
      type: 'string',
      description: 'A smaller headline below the main one, providing more detail.',
    }),
    defineField({
      name: 'associatedArticle',
      title: 'Associated Article',
      type: 'reference',
      to: [{type: 'newspaperArticle'}],
      description: 'The full article this headline refers to (if applicable).',
    }),
    defineField({
      name: 'publicationDate',
      title: 'Publication Date',
      type: 'date',
      description: 'The date this headline was published (should align with the issue date).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'isLeadHeadline',
      title: 'Is Lead Headline?',
      type: 'boolean',
      initialValue: false,
      description: 'Check if this is one of the primary headlines on the front page or section.',
    }),
    defineField({
      name: 'pageNumber',
      title: 'Page Number',
      type: 'number',
      description: 'The page on which this headline appeared.',
      validation: (rule) => rule.min(1).integer(),
    }),
  ],
  preview: {
    select: {
      title: 'headlineText',
      subtitle: 'kicker',
      media: 'isLeadHeadline', // Use a subtle indicator for lead headlines
      publicationDate: 'publicationDate',
      pageNumber: 'pageNumber',
    },
    prepare({title, subtitle, media, publicationDate, pageNumber}) {
      const date = publicationDate ? new Date(publicationDate).toLocaleDateString() : '';
      const page = pageNumber ? `p. ${pageNumber}` : '';
      const indicator = media ? '✨ Lead Headline' : '';

      return {
        title: title,
        subtitle: [subtitle, date, page, indicator].filter(Boolean).join(' | '),
        media: media ? ComposeIcon : undefined, // Display icon if it's a lead headline
      };
    },
  },
});
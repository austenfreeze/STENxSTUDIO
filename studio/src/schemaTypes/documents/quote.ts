import {BlockquoteIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const quote = defineType({
  name: 'quote',
  title: 'Quote',
  type: 'document',
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      description: 'The content of the quote.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'quoteType',
      title: 'Quote Type',
      type: 'string',
      options: {
        list: [
          {title: 'Book Excerpt', value: 'bookExcerpt'},
          {title: 'Spoken Quote', value: 'spokenQuote'},
          {title: 'Song Lyric', value: 'songLyric'},
          {title: 'Movie/Show Quote', value: 'movieQuote'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'radio',
      },
      initialValue: 'bookExcerpt',
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution / Source',
      description: 'Link this quote to its source (e.g., a person, a book, a film).',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'person'},
            {type: 'book'},
            // Added the 'film' type as a valid reference
            {type: 'film'},
            // {type: 'song'}, // You can uncomment this when you create a 'song' schema
          ],
        },
      ],
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'text',
      author: 'attribution.0.name', // Grabs the name of the first attributed person
      book: 'attribution.0.bookTitle', // Grabs the title of the first attributed book
      film: 'attribution.0.title', // Grabs the title of the first attributed film
    },
    prepare({title, author, book, film}) {
      const subtitle = author
        ? `— ${author}`
        : book
          ? `— ${book}`
          : film
            ? `— ${film}`
            : 'No attribution'
      return {
        // Truncate long quotes for a cleaner preview
        title: title ? `${title.substring(0, 50)}...` : 'No text',
        subtitle: subtitle,
      }
    },
  },
})
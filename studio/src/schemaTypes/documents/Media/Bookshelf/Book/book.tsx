// book.ts

import {defineField, defineType} from 'sanity'
import {GiBookCover} from 'react-icons/gi'

export const book = defineType({
  name: 'book',
  title: 'Book',
  type: 'document',
  icon: GiBookCover,
  fieldsets: [
    {name: 'publicationInformation', title: 'Publication Information', options: {columns: 2}},
  ],
  fields: [
    // ... (all your other fields like bookTitle, author, etc. are fine)
    defineField({
      name: 'covers',
      title: 'Book Covers',
      type: 'reference',
      to: [{type: 'bookCover'}],
      description: 'Reference the set of front and back covers for this book.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bookTitle',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'bookSubtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'bookTitle',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'person'}],
      fieldset: 'publicationInformation',
    }),
    defineField({
      name: 'publisher',
      title: 'Publisher',
      type: 'reference',
      to: [{type: 'publisher'}, {type: 'company'}],
      fieldset: 'publicationInformation',
    }),
    defineField({
      name: 'publicationDate',
      title: 'Publication Date',
      type: 'date',
      fieldset: 'publicationInformation',
    }),
    defineField({
      name: 'quotes',
      title: 'Quotes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'quote'}]}],
    }),

    // CORRECTED 'digitalCopies' FIELD
    defineField({
      name: 'digitalCopies',
      title: 'Digital Copies',
      // Change type to 'array'
      type: 'array',
      // Specify that this is an array 'of' your customFile type
      of: [{type: 'customFile'}],
      // REMOVE the fields array from here
    }),
defineField({
  name: 'externalLinks',
  title: 'External Links',
  type: 'array',
  // Because 'link' is a named 'object' type, you can just add it directly.
  // No 'reference' needed.
  of: [{type: 'link'}],
}),

defineField({
  name: 'mediaGalleries',
  title: 'Media Galleries',
  type: 'array',
  of: [{type: 'mediaGallery'}],
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
      title: 'bookTitle',
      authorFirstName: 'author.firstName',
      authorLastName: 'author.lastName',
      publicationDate: 'publicationDate',
      media: 'covers.frontBookCover',
    },
    prepare({title, authorFirstName, authorLastName, publicationDate, media}) {
      const authorName = [authorFirstName, authorLastName].filter(Boolean).join(' ')
      const year = publicationDate ? new Date(publicationDate.replace(/-/g, '/')).getFullYear() : ''
      const subtitle = [authorName, year].filter(Boolean).join(' | ')

      return {
        title,
        subtitle,
        media: media || GiBookCover,
      }
    },
  },
})
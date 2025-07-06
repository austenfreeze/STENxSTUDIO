import {defineField, defineType} from 'sanity'
import {GiBookCover} from 'react-icons/gi'

export const bookCover = defineType({
  name: 'bookCover',
  title: 'Book Covers',
  type: 'document',
  icon: GiBookCover,
  fieldsets: [{name: 'covers', title: 'Book Covers', options: {columns: 2}}],
  fields: [
    defineField({
      name: 'book',
      title: 'Associated Book',
      type: 'reference',
      to: [{type: 'book'}],
    }),
    defineField({
      name: 'frontBookCover',
      title: 'Front Book Cover',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'covers',
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for SEO and accessibility.',
        }),
      ],
    }),
    defineField({
      name: 'backBookCover',
      title: 'Back Book Cover',
      type: 'image',
      options: {hotspot: true},
      fieldset: 'covers',
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for SEO and accessibility.',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      bookTitle: 'book.bookTitle',
      bookSubtitle: 'book.bookSubtitle',
      authorFirstName: 'book.author.firstName',
      authorLastName: 'book.author.lastName',
      media: 'frontBookCover',
    },
    prepare({bookTitle, bookSubtitle, authorFirstName, authorLastName, media}) {
      const title = bookTitle ? `${bookTitle} Covers` : 'New Book Covers';
      
      const authorName = [authorFirstName, authorLastName].filter(Boolean).join(' ');
      
      const subtitle = [bookSubtitle, authorName].filter(Boolean).join(bookSubtitle && authorName ? ' by ' : '');

      return {
        title,
        subtitle,
        media: media || GiBookCover,
      }
    },
  },
})
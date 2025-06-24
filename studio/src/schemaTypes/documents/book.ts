// schemas/documents/book.ts
import {DocumentTextIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const book = defineType({
  name: 'book',
  title: 'Book',
  type: 'document',
  icon: DocumentTextIcon,

  fieldsets: [
    {name: 'dates', title: 'Dates', options: {columns: 3}},
    {name: 'title', title: 'Title', options: {columns: 2}},
  ],

  fields: [
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'coverImage',
    }),
    defineField({
      name: 'bookTitle',
      title: 'Book Title',
      type: 'string',
    }),
    defineField({
      name: 'bookSubtitle',
      title: 'Book Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'bookDescription',
      title: 'Book Description',
      type: 'text',
    }),
    defineField({
      name: 'bookPublicationDate',
      title: 'Book Publication Date',
      type: 'date',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'person'}],
    }),
    defineField({
      name: 'mediaArray',
      title: 'Media Array',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'mediaItem',
          title: 'Media Item',
          fields: [
            {
              name: 'image',
              title: 'Image',
              type: 'image',
              options: {hotspot: true},
            },
            {
              name: 'imageTitle',
              title: 'Image Title',
              type: 'string',
            },
            {
              name: 'pageNumber',
              title: 'Page Number',
              type: 'number',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
            },
          ],
          preview: {
            select: {
              title: 'imageTitle',
              media: 'image',
              subtitle: 'pageNumber',
            },
            prepare({title, media, subtitle}) {
              return {
                title: title || 'Untitled Image',
                subtitle: subtitle ? `Page ${subtitle}` : '',
                media,
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'excerpts',
      title: 'Excerpts',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'quote'}],
        },
      ],
    }),
    defineField({
      name: 'digitalCopies',
      title: 'Digital Copies',
      type: 'array',
      of: [{type: 'link'}, {type: 'file'}],
    }),
  ],

  preview: {
    select: {
      title: 'bookTitle',
      subtitle: 'bookSubtitle',
      media: 'coverImage.image',
    },
    prepare(selection) {
      const {title, subtitle, media} = selection
      return {
        title: title || 'Untitled Book',
        subtitle: subtitle || '',
        media,
      }
    },
  },
})

import {DocumentTextIcon} from '@sanity/icons'
import {format, parseISO} from 'date-fns'
import {defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  icon: DocumentTextIcon,
  type: 'document',

  fields: [
    // A dedicated title field is better for SEO and usability
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A slug is required for the post to show up in the preview',
      options: {
        // Source the slug from the new title field
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'admin'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'blockContent', // Assuming you have a 'blockContent' object type defined
    }),
    defineField({
        name: 'excerpt',
        title: 'Excerpt',
        description: 'A short summary of the post used for social media and search results.',
        type: 'text',
        rows: 3,
    })
  ],

  orderings: [
    {
      title: 'Publish date, newest',
      name: 'publishDateDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
  ],

  preview: {
    select: {
      title: 'title', // Use the new title field
      authorName: 'author.firstName', // Fetch from admin.firstName
      date: 'publishedAt',
    },
    prepare({title, authorName, date}) {
      const subtitles = [
        authorName && `by ${authorName}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return {
        title: title || 'Untitled Post',
        subtitle: subtitles.join(' — '),
      }
    },
  },
})

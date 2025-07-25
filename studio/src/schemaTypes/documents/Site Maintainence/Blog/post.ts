import {DocumentTextIcon} from '@sanity/icons'
import {format, parseISO} from 'date-fns'
import {defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  icon: DocumentTextIcon,
  type: 'document',

fieldsets: [
{name: 'main', title: 'Main',},
{name: 'content', title: 'Content',},
],

  fields: [
    // A dedicated title field is better for SEO and usability
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      fieldset: 'main',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      fieldset: 'main',
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
      fieldset: 'main',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      fieldset: 'main',
      to: [{type: 'admin'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
   type: 'richTextContent',
      fieldset: 'content',
    }),
    defineField({
      name: 'thread',
      title: 'Thread',
      type: 'array',
	of: [{type: 'post',}],
      fieldset: 'content',
    }),
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

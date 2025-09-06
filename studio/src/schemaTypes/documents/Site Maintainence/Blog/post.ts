import {defineField, defineType, defineArrayMember} from 'sanity'
import {SparklesIcon} from '@sanity/icons'
import { VscMegaphone, VscImage, VscGallery } from 'react-icons/vsc';

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required().max(600),
    }),
    defineField({
      name: 'context',
      title: 'Context History',
      type: 'array',
      of: [defineArrayMember({type: 'contextInput'})],
      validation: (Rule) => Rule.max(5),
      description: 'Add contextual layers to evolve this post.',
    }),
    defineField({
      name: 'attachedMedia',
      title: 'Attached Media',
      type: 'array',
      description: 'Attach various types of media to this document.',
      validation: (Rule) => Rule.min(1).unique().error('Please attach at least one unique media item.'),
      of: [
        {
          type: 'reference',
          to: [
            { type: 'customImage' },
            { type: 'mediaGallery' },
            { type: 'voiceRecording' },
          ],
        },
      ],
      options: {
        collapsible: true,
        collapsed: false,
        sortable: true,
      },
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'A slug is required for the post to show up in the preview',
      options: {
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
      name: 'thread',
      title: 'Thread',
      type: 'array',
      of: [
        {
          type: 'reference', // Change the field type to 'reference'
          to: [{type: 'post'}], // Reference other 'post' documents
        },
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'admin'}],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
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
      title: 'title',
      authorName: 'author.firstName',
      date: 'publishedAt',
    },
    prepare({title, authorName, date}) {
      const subtitles = [
        authorName && `by ${authorName}`,
        date && `on ${date}`, // You'll need to import date-fns for proper formatting
      ].filter(Boolean)
      return {
        title: title || 'Untitled Post',
        subtitle: subtitles.join(' — '),
      }
    },
  },
})
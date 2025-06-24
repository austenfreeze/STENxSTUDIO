import {DocumentTextIcon} from '@sanity/icons'
import {format, parseISO} from 'date-fns'
import {defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  icon: DocumentTextIcon,
  type: 'document',

  fieldsets: [
    {name: 'dates', title: 'Dates', options: {columns: 3}},
    {name: 'title', title: 'Title',},
  ],

  fields: [

    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'coverImage',
      }),

    defineField({
      name: 'postTitle',
      title: 'Post Title',
      type: 'string',
      validation: (rule) => rule.required(),
      fieldset: 'title',
    }),

    defineField({
      name: 'postSubtitle',
      title: 'Post Subtitle',
      type: 'string',
      validation: (rule) => rule.required(),
      fieldset: 'title',
    }),


    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      fieldset: 'dates',
    }),

    defineField({
      name: 'updatedAt',
      title: 'Updated At',
      type: 'datetime',
      fieldset: 'dates',
    }),


    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'Published', value: 'published'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'draft',
      fieldset: 'dates',
    }),

    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'person'}],
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
      name: 'content',
      title: 'Content',
      type: 'blockContent',
    }),

    defineField({
      name: 'excerpts',
      title: 'Excerpts',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'excerptBlock',
          title: 'Excerpt',
          fields: [
            {
              name: 'label',
              type: 'string',
              title: 'Label',
              description: 'E.g., SEO, Summary, Quote, etc.',
            },
            {
              name: 'text',
              type: 'text',
              title: 'Text',
            },
          ],
        }),
      ],
    }),

    defineField({
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      of: [{type: 'reference', to: {type: 'post'}}],
      options: {
        sortable: true,
      },
      validation: (rule) => rule.max(5),
    }),
  ],

  orderings: [
    {
      title: 'Publish date, newest',
      name: 'publishDateDesc',
      by: [{field: 'publishedAt', direction: 'desc'}],
    },
    {
      title: 'Publish date, oldest',
      name: 'publishDateAsc',
      by: [{field: 'publishedAt', direction: 'asc'}],
    },
  ],

  preview: {
    select: {
      title: 'title',
      authorFirstName: 'author.firstName',
      authorLastName: 'author.lastName',
      date: 'publishedAt',
      media: 'coverImage',
    },
    prepare({title, media, authorFirstName, authorLastName, date}) {
      const subtitles = [
        authorFirstName && authorLastName && `by ${authorFirstName} ${authorLastName}`,
        date && `on ${format(parseISO(date), 'LLL d, yyyy')}`,
      ].filter(Boolean)

      return {
        title,
        media,
        subtitle: subtitles.join(' — ')
      }
    },
  },
})

import {defineField, defineType, defineArrayMember} from 'sanity'
import {ThListIcon} from '@sanity/icons'

/**
 * Defines the 'postThread' document type.
 * A thread is a collection of 'zings' organized around a single topic or date,
 * allowing for contextual notes and streamlined logging.
 */
export const postThread = defineType({
  name: 'postThread',
  title: 'Post Thread',
  type: 'document',
  icon: ThListIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Thread Title',
      type: 'string',
      description: 'A clear and concise title for the thread (e.g., "Feedback for Gemini - July 3rd").',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'threadDate',
      title: 'Thread Date',
      type: 'date',
      description: 'A universal date for the entire thread, separate from individual zing timestamps.',
      initialValue: () => new Date().toISOString().split('T')[0],
    }),
    defineField({
      name: 'threadItems',
      title: 'Thread Items',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'threadedZing',
          title: 'Threaded Zing',
          type: 'object',
          fields: [
            defineField({
              name: 'post',
              title: 'Post',
              type: 'reference',
              to: [{type: 'post'}],
              // UPDATED: Enable inline creation and editing for a seamless workflow.
              options: {
                disableNew: false,
              },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'context',
              title: 'Contextual Note',
              type: 'text',
              rows: 2,
              description: 'Expand on this zing or add context for why it belongs in this thread.',
            }),
          ],
          preview: {
            select: {
              title: 'post.content',
              subtitle: 'context',
              status: 'post.status',
            },
            prepare({title, subtitle, status}) {
              return {
                title: title || 'No content',
                subtitle: `${subtitle || 'No context'} [${status || 'No Status'}]`,
              }
            },
          },
        }),
      ],
    }),
  ],
})

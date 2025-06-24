// schemas/documents/Timeline/timeline.ts
import {defineType, defineField} from 'sanity'

export const timeline =  defineType({
  name: 'timeline',
  title: 'Timeline',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The name of this timeline (e.g., "W.O.W. Project Timeline").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'timelineType',
      title: 'Timeline Type',
      type: 'string',
      description: 'The category of this timeline.',
      options: {
        list: [
          {title: 'Project', value: 'project'},
          {title: 'Historical', value: 'historical'},
          {title: 'Thematic', value: 'thematic'},
          {title: 'Personal', value: 'personal'},
        ],
        layout: 'radio',
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief summary of what this timeline covers.',
    }),
    defineField({
      name: 'events',
      title: 'Timeline Events',
      type: 'array',
      description: 'Add, create, and reorder events for this specific timeline.',
      of: [
        {
          title: 'Timeline Event',
          type: 'reference',
          to: [{type: 'timelineEvent'}],
        },
      ],
      options: {
        sortable: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'timelineType',
    },
    prepare({title, subtitle}) {
      return {
        title: title,
        subtitle: subtitle ? `Type: ${subtitle.charAt(0).toUpperCase() + subtitle.slice(1)}` : 'No type specified',
      }
    },
  },
})
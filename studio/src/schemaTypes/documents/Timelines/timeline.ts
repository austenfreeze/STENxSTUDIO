// schemas/timeline.ts

import {defineField, defineType} from 'sanity'

export const timeline = defineType({
  name: 'timeline',
  title: 'Timeline',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Timeline Title',
      type: 'string',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Brief overview of this timeline and its purpose.',
    }),
    defineField({
      name: 'events',
      title: 'Events',
      type: 'array',
      of: [{type: 'timelineEventNode'}],
      description: 'Add and order the events in this timeline.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      description: 'description',
      eventCount: 'events.length',
    },
    prepare(selection) {
      const {title, description, eventCount} = selection;
      const eventCountText = eventCount === 1 ? '1 event' : `${eventCount || 0} events`;

      return {
        title: title,
        subtitle: description,
        description: `Contains ${eventCountText}`,
      };
    },
  },
})
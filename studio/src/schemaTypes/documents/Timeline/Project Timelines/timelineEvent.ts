// schemas/documents/Timeline/Project Timelines/timelineEvent.ts
import {defineType, defineField} from 'sanity'

export const timelineEvent = defineType({
  name: 'timelineEvent',
  title: 'Timeline Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main heading for the event.',
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
      name: 'eventDate',
      title: 'Event Date',
      type: 'object',
      fields: [
        {name: 'displayValue', title: 'Display Value', type: 'string', validation: (Rule) => Rule.required()},
        {name: 'year', title: 'Year', type: 'number'},
        {name: 'month', title: 'Month', type: 'number'},
        {name: 'day', title: 'Day', type: 'number'},
      ],
    }),
    // UPDATED to allow multiple selections
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Milestone', value: 'milestone'},
          {title: 'Context', value: 'context'},
          {title: 'Media Publication', value: 'mediaPublication'},
          {title: 'Series', value: 'series'},
          {title: 'Research Hub', value: 'researchHub'},
        ],
        layout: 'grid', // Renders as checkboxes
      },
    }),
    defineField({
      name: 'partOfTimelines',
      title: 'Part of Timelines',
      type: 'array',
      description: 'Assign this event to one or more timelines.',
      of: [{type: 'reference', to: [{type: 'timeline'}]}],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block', styles: [{title: 'Normal', value: 'normal'}], lists: []}],
      description: 'The detailed narrative for this event.',
    }),
    // UPDATED to add a proper preview configuration
    defineField({
      name: 'relatedEvents',
      title: 'Related Events',
      type: 'array',
      description: 'Link to other events to show connectivity.',
      of: [
        {
          title: 'Event Relation',
          type: 'object',
          fields: [
            {
              name: 'relationshipType',
              title: 'Relationship Type',
              type: 'string',
              description: 'Describe the connection (e.g., "Provides context for", "Was a replacement for").',
            },
            {
              name: 'event',
              title: 'Event',
              type: 'reference',
              to: [{type: 'timelineEvent'}],
            },
          ],
          preview: {
            select: {
              title: 'event.title',
              relationship: 'relationshipType',
            },
            prepare({title, relationship}) {
              return {
                title: title || 'No event selected',
                subtitle: relationship || 'No relationship type defined',
              }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'relatedMedia',
      title: 'Related Media',
      type: 'array',
      description: 'Add relevant images, videos, or documents.',
      of: [{type: 'image', options: {hotspot: true}}, {type: 'file'}],
    }),
    defineField({
      name: 'relatedEntities',
      title: 'Related Entities',
      type: 'array',
      description: 'Link to people, books, films, or concepts related to this event.',
      of: [{type: 'reference', to: [{type: 'person'}, {type: 'book'}, {type: 'film'}]}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'eventDate.displayValue',
      type: 'eventType',
    },
    prepare(selection) {
      const {title, date, type} = selection
      const typeDisplay = type ? type.charAt(0).toUpperCase() + type.slice(1) : 'No Type'
      return {
        title: title,
        subtitle: `${date || 'No Date'} — ${typeDisplay}`,
      }
    },
  },
})
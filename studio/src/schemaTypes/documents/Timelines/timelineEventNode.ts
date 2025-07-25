// schemas/timelineEventNode.ts

import {defineField, defineType} from 'sanity'

export const timelineEventNode = defineType({
  name: 'timelineEventNode',
  title: 'Timeline Event',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      description: 'A brief, descriptive title for this event.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date of Event',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Event Description',
      type: 'text',
      description: 'A brief summary of the event or its significance.',
      rows: 3,
    }),
    defineField({
      name: 'sourceReference',
      title: 'Source Document',
      type: 'reference',
      to: [
        {type: 'podcastEpisode'}, 
        {type: 'magazineArticle'},
        {type: 'project'},
        {type: 'book'},
        {type: 'film'},
        // Add more schema types here as needed to link events
      ],
      description: 'Link this event to its original document for context.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      sourceTitle: 'sourceReference.title',
      // We will need to check other document types' title fields in prepare
      sourceBookTitle: 'sourceReference.bookTitle',
    },
    prepare(selection) {
      const {title, date, sourceTitle, sourceBookTitle} = selection;
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'No date';
      const finalSourceTitle = sourceTitle || sourceBookTitle;

      const subtitleParts = [
        formattedDate,
        finalSourceTitle ? `Source: ${finalSourceTitle}` : null
      ].filter(Boolean);

      return {
        title: title,
        subtitle: subtitleParts.join(' | '),
      };
    },
  },
})
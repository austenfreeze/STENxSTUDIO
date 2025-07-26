// /schemas/eventType.js
import {defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fieldsets: [{name: 'datetime', title: 'Date/Time'}], // FIX: Added a comma here
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'customImage',
    }),
    defineField({
      name: 'name',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'eventType',
      type: 'string',
      options: {
        list: [
          {title: 'Concert', value: 'concert'},
          {title: 'Festival', value: 'festival'},
          {title: 'Workshop', value: 'workshop'},
          {title: 'Conference', value: 'conference'},
        ],
      },
    }),
    defineField({
      name: 'timeDate',
      title: 'Date/Time',
      type: 'timeDate',
      fieldset: 'datetime', // Associate this field with the 'datetime' fieldset
    }),
defineField({
  name: 'details',
  title: 'Details',
  type: 'richTextContent', // FIX: Reference the type directly
}),
  ],
  // Add a preview block for a better studio experience
  preview: {
    select: {
      title: 'name',
      date: 'timeDate.date',
      time: 'timeDate.time',
    },
    prepare(selection) {
      const { title, date, time } = selection;
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'No Date';
      const formattedTime = time || 'No Time';
      return {
        title: title || 'Untitled Event',
        subtitle: `${formattedDate} at ${formattedTime}`,
      };
    },
  },
});
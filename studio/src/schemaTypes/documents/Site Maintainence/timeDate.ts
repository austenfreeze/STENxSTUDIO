// /schemas/timeDate.js
import { format } from 'date-fns';
import {defineType, defineField} from 'sanity'
import {ClockIcon} from '@sanity/icons'

export const timeDate = defineType({
  name: 'timeDate',
  title: 'Date and Time',
  type: 'object',
  icon: ClockIcon, // <-- FIX: Added a comma here
  description: 'A combined field for selecting a specific date and time.',
  fields: [
    defineField({ // Changed to use defineField for consistency and type-safety
      name: 'date',
      title: 'Date',
      type: 'date',
      options: {
        dateFormat: 'MM-DD-YYYY',
      },
      validation: (Rule) => Rule.required(),
      codegen: { required: true },
    }),
    defineField({ // Changed to use defineField
      name: 'time',
      title: 'Time (HH:MM)',
      type: 'string',
      description: 'Enter time in 24-hour format (e.g., 14:30 for 2:30 PM).',
      validation: (Rule) =>
        Rule.required().regex(
          /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
          {
            name: 'time format',
            invert: false,
          }
        ).error('Time must be in HH:MM format (e.g., 14:30)'),
      codegen: { required: true },
    }),
  ],
  options: {
    columns: 2,
  },
  preview: {
    select: {
      date: 'date',
      time: 'time',
    },
    prepare(selection) {
      const { date, time } = selection;
      if (!date || !time) {
        return {
          title: 'Select a Date and Time',
          subtitle: 'Fields not yet filled',
        };
      }
      try {
        const formattedDate = format(new Date(date), 'MM/dd/yyyy');
        return {
          title: `${formattedDate} | ${time}`,
        };
      } catch (error) {
        // Fallback in case of invalid date string
        return {
          title: 'Invalid Date or Time',
          subtitle: 'Please check the entered values',
        };
      }
    },
  },
});
import {defineType, defineField} from 'sanity'
import {CheckmarkCircleIcon} from '@sanity/icons'

export const completedTask = defineType({
  name: 'completedTask',
  title: 'Completed Task',
  type: 'document',
  icon: CheckmarkCircleIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Task Title',
      type: 'string',
      validation: Rule => Rule.required().min(3),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Detailed Description',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'completedAt',
      title: 'Completion Date',
      type: 'datetime',
      validation: Rule => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Bug Fix', value: 'bugfix'},
          {title: 'Feature', value: 'feature'},
          {title: 'Refactor', value: 'refactor'},
          {title: 'Research', value: 'research'},
          {title: 'Maintenance', value: 'maintenance'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'dropdown',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'linkedGoal',
      title: 'Associated Goal',
      type: 'reference',
      to: [{type: 'goal'}], // or 'integrations' if still using that
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'icon',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Untitled Task',
        subtitle: `Category: ${subtitle || 'Uncategorized'}`,
      }
    },
  },
})

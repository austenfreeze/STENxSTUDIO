import {defineType, defineField} from 'sanity'

export const goal = defineType({
  name: 'goal',
  title: 'Project Goal',
  type: 'document',
  __experimental_actions: ['update', 'publish'], // prevents create & delete in Studio UI
  fields: [
    defineField({
      name: 'title',
      title: 'Goal Title',
      type: 'string',
      validation: Rule => Rule.required().min(5),
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
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required().min(10),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Planned', value: 'planned'},
          {title: 'In Progress', value: 'inProgress'},
          {title: 'Completed', value: 'completed'},
          {title: 'Blocked', value: 'blocked'},
        ],
        layout: 'dropdown',
      },
      initialValue: 'planned',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'datetime',
    }),
    defineField({
      name: 'targetDate',
      title: 'Target Completion Date',
      type: 'datetime',
    }),
    defineField({
      name: 'progress',
      title: 'Progress (%)',
      type: 'number',
      validation: Rule => Rule.min(0).max(100),
    }),
defineField({
  name: 'completedTasks',
  title: 'Completed Tasks',
  type: 'array',
  of: [
    {
      type: 'reference',
      to: [{type: 'completedTask'}],
    },
  ],
}),
    defineField({
      name: 'notes',
      title: 'Additional Notes',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      progress: 'progress',
    },
    prepare({title, status, progress}) {
      const statusLabel = status ? ` (${status})` : ''
      const progressLabel = progress !== undefined ? ` – ${progress}%` : ''
      return {
        title: title || 'Untitled Goal',
        subtitle: `Goal${statusLabel}${progressLabel}`,
      }
    },
  },
})

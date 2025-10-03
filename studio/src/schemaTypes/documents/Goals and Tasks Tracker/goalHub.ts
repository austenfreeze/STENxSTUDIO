// schemas/documents/Goals and Tasks Tracker/goalHub.ts
import { defineType, defineField } from 'sanity'
import { TargetIcon } from '@sanity/icons'

export default defineType({
  name: 'goalHub',
  title: 'Goal Hub',
  type: 'document',
  icon: TargetIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Core Concept / Hub Title',
      type: 'string',
      description: 'The main theme or concept for this group of goals/tasks.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief overview of this goal hub.',
    }),
    defineField({
      name: 'items',
      title: 'Goals & Tasks',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'goal' }, { type: 'task' }] }],
      options: {
        layout: 'grid',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      itemCount: 'items.length',
    },
    prepare({ title, itemCount }) {
      return {
        title: title || 'New Goal Hub',
        subtitle: itemCount ? `${itemCount} item(s)` : 'No items yet',
      }
    },
  },
})
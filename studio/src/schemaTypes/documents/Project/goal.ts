import {defineType, defineField} from 'sanity'


export const goal = defineType({
  name: 'goal',
  type: 'document',
  fields: [
    // ... existing fields
    {
      name: 'priority',
      type: 'string',
      options: {
        list: [
          { title: 'Critical', value: 'critical' },
          { title: 'High', value: 'high' },
          { title: 'Medium', value: 'medium' },
          { title: 'Low', value: 'low' }
        ]
      }
    },
    {
      name: 'estimatedHours',
      type: 'number',
      validation: Rule => Rule.min(0)
    },
    {
      name: 'actualHours',
      type: 'number',
      validation: Rule => Rule.min(0)
    }
  ],
  preview: {
    select: {
      title: 'title',
      status: 'status',
      progress: 'progress'
    },
    prepare({ title, status, progress }) {
      return {
        title,
        subtitle: `${status} - ${progress || 0}% complete`
      }
    }
  }
})
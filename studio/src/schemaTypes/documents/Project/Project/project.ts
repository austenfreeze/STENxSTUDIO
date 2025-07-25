// schemas/project.ts
import {defineField, defineType} from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
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
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Planning', value: 'planning'},
          {title: 'In Progress', value: 'inProgress'},
          {title: 'On Hold', value: 'onHold'},
          {title: 'Completed', value: 'completed'},
        ],
        layout: 'radio',
      },
      initialValue: 'planning',
    }),
    defineField({
      name: 'description',
      title: 'Project Description',
      type: 'text',
      description: 'High-level overview of what this project is about.',
    }),
defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'relatedContent',
      title: 'Related Content',
      type: 'relatedContent'
    }),
defineField({
  name: 'timeline',
  title: 'Related Timeline',
  type: 'reference',
  to: [{type: 'timeline'}],
  description: 'The primary timeline for this project, such as "Skunkworks".',
}),
  ],
})
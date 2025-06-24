// schemas/logEntry.ts
import {defineField, defineType} from 'sanity'

export const logEntry = defineType({
  name: 'logEntry',
  title: 'Log Entry',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title / Session Date',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sessionDate',
      title: 'Session Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary & Key Points',
      type: 'array',
      of: [{type: 'block'}],
    }),
    defineField({
      name: 'relatedProject',
      title: 'Related Project',
      type: 'reference',
      to: [{type: 'project'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'sessionDate',
    },
  },
})
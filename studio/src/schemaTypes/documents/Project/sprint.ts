import {defineType, defineField} from 'sanity'



export const sprint = defineType({
  name: 'sprint',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'startDate',
      type: 'date'
    },
    {
      name: 'endDate',
      type: 'date'
    },
    {
      name: 'goals',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'goal' }] }]
    }
  ]
})
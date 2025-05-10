import {defineType, defineField} from 'sanity'

export const taskTag = defineType({
  name: 'taskTag',
  title: 'Task Tag',
  type: 'document',
  fields: [
    defineField({
      name: 'label',
      title: 'Tag Label',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
})

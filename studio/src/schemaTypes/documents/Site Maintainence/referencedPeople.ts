import {defineField, defineType} from 'sanity'

export const referencedPeople = defineType({
 name: 'referencedPeople',
  title: 'Referenced People',
  type: 'object',
  fields: [
    defineField({
      name: 'references',
      title: 'Content References',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            {type: 'person'},

 ],
        },
      ],
    }),
  ],
})

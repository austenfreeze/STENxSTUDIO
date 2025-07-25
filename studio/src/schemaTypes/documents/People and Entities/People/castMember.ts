import {defineField, defineType} from 'sanity'
import {BsFillPersonFill} from 'react-icons/bs'

export const castMember = defineType({
  name: 'castMember',
  title: 'Cast Member',
  type: 'object',
  icon: BsFillPersonFill,
  fields: [
    defineField({
      name: 'person',
      title: 'Person',
      type: 'reference',
      to: [{type: 'person'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'roles',
      title: 'Role(s)',
      type: 'array',
      of: [{type: 'string'}],
      description: 'e.g., "Host", "Narrator", "Interviewee"',
      options: {
        layout: 'tags',
      },
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
  ],
  preview: {
    select: {
      // Use 'person->' to fetch the entire resolved person document
      person: 'person->',
      roles: 'roles',
    },
    prepare({person, roles}) {
      // Now, access the properties of the resolved person object
      const name = person?.name || 'No person selected'
      const media = person?.image

      return {
        title: name,
        subtitle: roles ? roles.join(', ') : 'No roles specified',
        media: media || BsFillPersonFill,
      }
    },
  },
})
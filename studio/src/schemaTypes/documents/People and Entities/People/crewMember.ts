import {defineField, defineType} from 'sanity'
import {BsFillPersonBadgeFill} from 'react-icons/bs' // A fallback icon

export const crewMember = defineType({
  name: 'crewMember',
  title: 'Crew Member',
  type: 'object',
  icon: BsFillPersonBadgeFill,
  fields: [
    // ...fields are the same
    defineField({
      name: 'person',
      title: 'Person',
      type: 'reference',
      to: [{type: 'person'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          {title: 'Director', value: 'director'},
          {title: 'Producer', value: 'producer'},
          {title: 'Executive Producer', value: 'executive producer'},
          {title: 'Creator', value: 'creator'},
          {title: 'Writer', value: 'writer'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
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
      // Use the '->' operator here as well
      name: 'person->name',
      media: 'person->image',
      role: 'role',
    },
    prepare({name, media, role}) {
      const formattedRole = role ? role.charAt(0).toUpperCase() + role.slice(1) : ''
      return {
        title: name || 'No person selected',
        subtitle: formattedRole,
        // The 'media' is the person's image, with a fallback
        media: media || BsFillPersonBadgeFill,
      }
    },
  },
})
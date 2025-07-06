import {defineField, defineType, defineArrayMember} from 'sanity'
import {SparklesIcon} from '@sanity/icons'

/**
 * Defines the 'zing' document type.
 * A zing is the smallest, most versatile unit of content: a quick thought, a note, a task, or a piece of data.
 * It's designed to be created quickly and referenced or embedded anywhere.
 */
export const zing = defineType({
  name: 'zing',
  title: 'Zing',
  type: 'document',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'text',
      rows: 3,
      description: 'The core content of the zing. Keep it brief and to the point.',
      validation: (Rule) => Rule.required().max(300),
    }),
    // The context is now a limited array of the new, richer contextInput object.
    defineField({
      name: 'context',
      title: 'Context History',
      type: 'array',
      of: [defineArrayMember({type: 'contextInput'})],
      validation: (Rule) => Rule.max(5), // Limit the array to 5 items for focused evolution
      description: 'Add contextual layers to evolve this zing.',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Active', value: 'active'},
          {title: 'Archived', value: 'archived'},
          {title: 'Private', value: 'private'},
        ],
        layout: 'radio',
        collapsible: true,
      },
      initialValue: 'active',
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'admin'}],
      readOnly: true,
      initialValue: async (params, {currentUser}) => {
        if (currentUser) {
          return {_type: 'reference', _ref: currentUser.id}
        }
        return undefined
      },
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'category'}]}],
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'content',
      author: 'author.firstName',
      media: 'author.picture',
      status: 'status',
    },
    prepare({title, author, media, status}) {
      return {
        title: title || 'Untitled Zing',
        subtitle: `by ${author || 'Unknown'} [${status || 'No Status'}]`,
        media,
      }
    },
  },
})
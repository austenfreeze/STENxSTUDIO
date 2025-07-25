// schemas/documents/film.ts
import {PlayIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const film = defineType({
  name: 'film',
  title: 'Film',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'releaseYear',
      title: 'Release Year',
      type: 'number',
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
    })
  ],
})

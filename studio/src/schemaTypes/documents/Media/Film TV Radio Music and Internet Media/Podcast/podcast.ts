import {defineField, defineType} from 'sanity'

// Assumes 'richTextContent' is a separate schema for portable text
// Assumes 'youtubeChannel', 'category', and 'person' are separate schemas

export const podcast = defineType({
  name: 'podcast',
  title: 'Podcast',
  type: 'document',
  fieldsets: [{name: 'runDates', title: 'Run Dates:', options: {columns: 2}}],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'poster',
      title: 'Poster Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for SEO and accessibility.',
          validation: (Rule) => Rule.required(),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hostChannel',
      title: 'Hosting Channel',
      type: 'reference',
      to: [{type: 'youtubeChannel'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startYear',
      title: 'Start Year',
      type: 'number',
      fieldset: 'runDates',
      validation: (Rule) => Rule.required().min(1900).max(new Date().getFullYear() + 1),
    }),
    defineField({
      name: 'endYear',
      title: 'End Year',
      description: 'Leave empty if the show is still on air.',
      type: 'number',
      fieldset: 'runDates',
      validation: (Rule) => Rule.min(1900).max(new Date().getFullYear() + 1),
    }),
    defineField({
      name: 'genres',
      title: 'Genres',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'richTextContent',
    }),
defineField({
name: 'host',
title: 'Host(s)',
type: 'array',
of: [{type: 'reference',
to: [{type: 'person',}],
}],
}),
defineField({
name: 'epsiodes',
title: 'Episodes',
type: 'array',
of: [{type: 'reference',
to: [{type: 'podcastEpisode',}],
}],
}),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'hostChannel.title',
      media: 'poster',
      start: 'startYear',
      end: 'endYear',
    },
    prepare(selection) {
      const {title, subtitle, media, start, end} = selection
      const years = start && end ? `${start}–${end}` : start ? `${start}–Present` : 'Unknown'
      return {
        title,
        subtitle: subtitle ? `Host: ${subtitle} (${years})` : years,
        media,
      }
    },
  },
})
import {defineField, defineType} from 'sanity'
import {MdLiveTv} from 'react-icons/md'

export const tvShow = defineType({
  name: 'tvShow',
  title: 'Television Show',
  type: 'document',
  icon: MdLiveTv,
  fieldsets: [{name: 'runDates', title: 'Run Dates:', options: {columns: 2}}],
  fields: [
    // ... all your existing fields like title, slug, hostNetwork, etc.
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
      name: 'hostNetwork',
      title: 'Hosting Network',
      type: 'reference',
      to: [{type: 'televisionNetwork'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'poster',
      title: 'Poster Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'Important for SEO and accessibility.',
        }),
      ],
    }),
    defineField({
      name: 'startYear',
      title: 'Start Year',
      type: 'number',
      fieldset: 'runDates',
    }),
    defineField({
      name: 'endYear',
      title: 'End Year',
      description: 'Leave empty if the show is still on air.',
      type: 'number',
      fieldset: 'runDates',
    }),
    defineField({
      name: 'genres',
      title: 'Genres',
      type: 'array',
      // Assumes you have a 'category' schema for genres
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      // Assumes you have a 'blockContent' schema for rich text
   type: 'richTextContent',
    }),

    // --- NEW FIELD ADDED HERE ---
    defineField({
      name: 'seasons',
      title: 'Seasons',
      description: 'Add and define the seasons for this show.',
      type: 'array',
      // This uses the 'season' object schema created above
      of: [{type: 'season'}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      networkName: 'hostNetwork.networkName',
      startYear: 'startYear',
      endYear: 'endYear',
      media: 'poster',
    },
    prepare({title, networkName, startYear, endYear, media}) {
      const years = endYear ? `${startYear}–${endYear}` : `${startYear}–Present`
      const subtitle = [networkName, years].filter(Boolean).join(' | ')

      return {
        title: title || 'No title',
        subtitle: subtitle,
        media: media || MdLiveTv,
      }
    },
  },
})
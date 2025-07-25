import {defineField, defineType} from 'sanity'

export const podcastEpisode = defineType({
  name: 'podcastEpisode',
  title: 'Podcast Episode',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Episode Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parentShow',
      title: 'Parent Podcast',
      type: 'reference',
      to: [{type: 'podcast'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'episodeNumber',
      title: 'Episode Number',
      type: 'number',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'airDate',
      title: 'Original Air Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'richTextContent',
    }),
    defineField({
      name: 'quotes',
      title: 'Noteworthy Quotes',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'quote'}]}],
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: 'guestCast',
      title: 'Guest Cast & Appearances',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'person'}]}],
      validation: (Rule) => Rule.unique(),
    }),
  ],
  preview: {
    select: {
      episodeTitle: 'title',
      parentTitle: 'parentShow.title',
      episodeNumber: 'episodeNumber',
      airDate: 'airDate',
      media: 'parentShow.poster',
    },
    prepare(selection) {
      const {episodeTitle, parentTitle, episodeNumber, airDate, media} = selection
      
      const formattedDate = airDate
        ? new Date(airDate).toLocaleDateString()
        : 'No air date'

      return {
        title: `"${episodeTitle}"`,
        subtitle: `${parentTitle}, Episode #${episodeNumber}, ${formattedDate}`,
        media,
      }
    },
  },
})
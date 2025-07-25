import {defineField, defineType} from 'sanity'
import {RiNodeTree} from 'react-icons/ri'

export const tvShowEpisode = defineType({
  name: 'tvShowEpisode',
  title: 'TV Show Episode',
  type: 'document',
  icon: RiNodeTree,
  fields: [
    defineField({
      name: 'title',
      title: 'Episode Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'parentShow',
      title: 'Parent Show',
      type: 'reference',
      to: [{type: 'tvShow'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seasonNumber',
      title: 'Season Number',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'episodeNumber',
      title: 'Episode Number in Season',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'airDate',
      title: 'Original Air Date',
      type: 'date',
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
   type: 'richTextContent',
    }),
    defineField({
      name: 'guestCast',
      title: 'Guest Cast & Appearances',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'person'}]}],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      season: 'seasonNumber',
      episode: 'episodeNumber',
      showTitle: 'parentShow.title',
    },
    prepare({title, season, episode, showTitle}) {
      const episodeString = `S${String(season).padStart(2, '0')}E${String(episode).padStart(2, '0')}`
      return {
        title: title || 'Untitled Episode',
        subtitle: `${showTitle} | ${episodeString}`,
      }
    },
  },
  // Order episodes by season and episode number by default
  orderings: [
    {
      title: 'Season/Episode',
      name: 'seasonEpisodeAsc',
      by: [
        {field: 'seasonNumber', direction: 'asc'},
        {field: 'episodeNumber', direction: 'asc'},
      ],
    },
  ],
})
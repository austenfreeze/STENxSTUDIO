import {defineField, defineType} from 'sanity'
import {FaFilm} from 'react-icons/fa'

export const documentary = defineType({
  name: 'documentary',
  title: 'Documentary',
  type: 'document',
  icon: FaFilm,
fieldsets: [
    {name: 'broadcastInfo', title: 'TV Broadcast Information'},
    {name: 'youtubeInfo', title: 'YouTube Information'},
    {name: 'productionInfo', title: 'Production Information'},
    {name: 'mediaAssets', title: 'Media & Assets'},
  ],
  fields: [
    // --- Core Information ---
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
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'docCover',
      title: 'Documentary Cover/Poster',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      description: 'Select the format of this documentary. This will show different fields below.',
      options: {
        list: [
          {title: 'Standalone Film', value: 'film'},
          {title: 'TV Episode', value: 'tv-episode'},
          {title: 'YouTube Video', value: 'youtube-video'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      initialValue: 'film',
    }),

    // --- Conditional TV Broadcast Fields ---
    defineField({
      name: 'hostProgram',
      title: 'Host Program / TV Series',
      type: 'reference',
      to: [{type: 'tvShow'}],
      fieldset: 'broadcastInfo',
      hidden: ({parent}) => parent?.mediaType !== 'tv-episode',
    }),
    defineField({
      name: 'seasonNumber',
      title: 'Season Number',
      type: 'number',
      fieldset: 'broadcastInfo',
      hidden: ({parent}) => parent?.mediaType !== 'tv-episode',
    }),
    defineField({
      name: 'episodeNumber',
      title: 'Episode Number',
      type: 'number',
      fieldset: 'broadcastInfo',
      hidden: ({parent}) => parent?.mediaType !== 'tv-episode',
    }),
    defineField({
      name: 'airDate',
      title: 'Broadcast Air Date',
      type: 'date',
      fieldset: 'broadcastInfo',
      hidden: ({parent}) => parent?.mediaType !== 'tv-episode',
    }),

    // --- Conditional YouTube Fields ---
    defineField({
      name: 'youtubeVideoId',
      title: 'YouTube Video ID',
      description: 'The unique ID from the YouTube URL.',
      type: 'string',
      fieldset: 'youtubeInfo',
      hidden: ({parent}) => parent?.mediaType !== 'youtube-video',
    }),

    // --- Production & Content Details ---
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'richTextContent',
    }),
    defineField({
      name: 'crew',
      title: 'Crew',
      description: 'Directors, producers, writers, etc.',
      type: 'array',
      fieldset: 'productionInfo',
      of: [{type: 'crewMember'}], // Assumes 'crewMember' object schema exists
    }),
    defineField({
      name: 'cast',
      title: 'Cast & Appearances',
      description: 'Interviewees, narrators, and other key figures.',
      type: 'array',
      fieldset: 'productionInfo',
      of: [{type: 'castMember'}], // Assumes 'castMember' object schema exists
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
   type: 'richTextContent',
    }),
 defineField({
      name: 'excerpts',
      title: 'Excerpts',
      description: 'Reference any quotes or excerpts from this book.',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'quote'}]}],
    }),
defineField({
  name: 'contentArray',
  title: 'Content Array',
  type: 'array',
  of: [{type: 'customImage'}], // Use your custom wrapper object
  fieldset: 'mediaAssets',
  description: 'Collection of relevant/interesting captures from the digital copy of the book.',
}),
 defineField({
      name: 'videoFile',
      title: 'Video File',
      description: 'Upload the documentary file. See note on video hosting best practices.',
      type: 'file',
      fieldset: 'mediaAssets',
      options: {
        accept: 'video/*', // Only accept video file types
      },
    }),
    defineField({
      name: 'externalLinks',
      title: 'External Links',
      description: 'Add relevant links (e.g., official website, Wikipedia, IMDb).',
      type: 'array',
      fieldset: 'mediaAssets',
      // Assumes you have a 'link' object schema with 'title' and 'url' fields
      of: [{type: 'link'}],
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

  // --- Preview ---
  preview: {
    select: {
      title: 'title',
      mediaType: 'mediaType',
      hostProgram: 'hostProgram.title',
      releaseDate: 'releaseDate',
      media: 'docCover',
    },
    prepare({title, mediaType, hostProgram, releaseDate, media}) {
      // Create a dynamic subtitle based on the media type
      let subtitle = 'Documentary'
      const year = releaseDate ? new Date(releaseDate).getFullYear() : ''

      if (mediaType === 'film') {
        subtitle = `Standalone Film ${year ? `| ${year}` : ''}`
      } else if (mediaType === 'tv-episode') {
        subtitle = `TV Episode ${hostProgram ? `| ${hostProgram}` : ''}`
      } else if (mediaType === 'youtube-video') {
        subtitle = 'YouTube Video'
      }

      return {
        title: title || 'Untitled Documentary',
        subtitle: subtitle,
        media: media || FaFilm,
      }
    },
  },
})
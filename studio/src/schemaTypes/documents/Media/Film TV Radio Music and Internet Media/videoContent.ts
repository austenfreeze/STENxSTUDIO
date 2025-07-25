// videoContent.ts
import {defineField, defineType} from 'sanity'
import {MdVideocam} from 'react-icons/md'

export const videoContent = defineType({
  name: 'videoContent',
  title: 'Video Content',
  type: 'document',
  icon: MdVideocam,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'An internal title for this video (e.g., "Homepage Hero Video").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'videoType',
      title: 'Video Source',
      type: 'string',
      options: {
        list: [
          {title: 'YouTube', value: 'youtube'},
          {title: 'Vimeo', value: 'vimeo'},
          {title: 'File Upload', value: 'file'},
        ],
        layout: 'radio',
      },
      initialValue: 'youtube',
    }),

    // --- CONDITIONAL FIELDS ---

    // YouTube Field
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'Paste the full URL of the YouTube video.',
      hidden: ({parent}) => parent?.videoType !== 'youtube',
    }),

    // Vimeo Field
    defineField({
      name: 'vimeoUrl',
      title: 'Vimeo URL',
      type: 'url',
      description: 'Paste the full URL of the Vimeo video.',
      hidden: ({parent}) => parent?.videoType !== 'vimeo',
    }),

    // File Upload Field (Use with caution)
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      description: 'Not recommended for large video files.',
      options: {
        accept: 'video/*',
      },
      hidden: ({parent}) => parent?.videoType !== 'file',
    }),

    // --- COMMON METADATA ---
    defineField({
      name: 'thumbnailImage', // <--- RENAMED from posterImage
      title: 'Thumbnail Image', // <--- RENAMED title
      type: 'image',
      description: 'A custom thumbnail for the video preview.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
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
  preview: {
    select: {
      title: 'title',
      videoType: 'videoType',
      media: 'thumbnailImage', // <--- Use the new field name here
    },
    prepare({title, videoType, media}) {
      const type = videoType ? videoType.charAt(0).toUpperCase() + videoType.slice(1) : ''
      return {
        title: title || 'Video Content',
        subtitle: `Source: ${type}`,
        media: media || MdVideocam,
      }
    },
  },
})
import {defineField, defineType} from 'sanity'
import {FaYoutube} from 'react-icons/fa'

export const youtubeChannel = defineType({
  name: 'youtubeChannel',
  title: 'YouTube Channel',
  type: 'document',
  icon: FaYoutube,
  fieldsets: [
    {name: 'branding', title: 'Branding'},
    {name: 'links', title: 'Links & IDs'},
  ],
  fields: [
    defineField({
      name: 'channelName',
      title: 'Channel Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'channelName', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
defineField({
  name: 'creators',
  title: 'Creator(s)',
  description: 'The person or people behind the channel.',
  type: 'array',
  of: [{
    type: 'reference',
    to: [
      {type: 'person'},
      {type: 'newsOrganization'},
      {type: 'televisionNetwork'},
    ],
  }],
}),
    defineField({
      name: 'description',
      title: 'Description',
      description: "The channel's 'About' section.",
   type: 'richTextContent',
    }),
    defineField({
      name: 'channelLogo',
      title: 'Channel Logo',
      type: 'image',
      fieldset: 'branding',
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
      name: 'handle',
      title: 'YouTube Handle',
      description: 'The unique @handle for the channel (e.g., @MKBHD).',
      type: 'string',
      fieldset: 'links',
    }),
    defineField({
      name: 'channelUrl',
      title: 'Channel URL',
      type: 'url',
      fieldset: 'links',
    }),
    defineField({
      name: 'channelId',
      title: 'Channel ID',
      description: 'The permanent, unique ID from YouTube (e.g., UCBJycsmduvYEL83R_U4JriQ).',
      type: 'string',
      fieldset: 'links',
    }),
  ],
  preview: {
    select: {
      title: 'channelName',
      subtitle: 'handle',
      // CORRECTED: Point directly to the image asset
      media: 'channelLogo.asset',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'No channel name',
        subtitle: subtitle || 'No handle',
        media: media || FaYoutube,
      }
    },
  },
})
// schemas/documents/entities/source.ts
import {defineField, defineType} from 'sanity'
import {DocumentsIcon} from '@sanity/icons'
// Corrected the import path to navigate correctly from the /documents folder.


export const source = defineType({
  name: 'source',
  title: 'Source / Resource',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description: 'The official name of the source or resource (e.g., "Project Gutenberg", "Vercel").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'A brief description of what this source or resource is.',
    }),
    defineField({
      name: 'sourceType',
      title: 'Type / Category',
      type: 'string',
      options: {
        list: [
          {title: 'Digital Archive', value: 'archive'},
          {title: 'News Organization', value: 'news'},
          {title: 'Journalist / Author', value: 'person'},
          {title: 'Government Agency', value: 'government'},
          {title: 'Social Media', value: 'social'},
          {title: 'Tool', value: 'tool'},
          {title: 'Platform', value: 'platform'},
          {title: 'Documentation', value: 'docs'},
          {title: 'API', value: 'api'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'url',
      title: 'Main URL',
      type: 'url',
      description: 'The main homepage, profile, or documentation URL.',
      validation: (Rule) => Rule.uri({scheme: ['http', 'https']}),
    }),
    defineField({
      name: 'logo',
      title: 'Logo or Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'sublinks',
      title: 'Additional Links',
      type: 'array',
      description: 'Add any relevant secondary links, like "About Us" or "API Status" pages.',
      of: [
        {
          name: 'sublink',
          title: 'Sublink',
          type: 'object',
          fields: [
            {name: 'title', type: 'string', title: 'Link Title'},
            {name: 'url', type: 'url', title: 'URL'},
          ],
        },
      ],
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      rows: 5,
      description: 'Private notes for your reference. These will not be displayed publicly.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'url',
      media: 'logo',
      sourceType: 'sourceType',
    },
    prepare({title, subtitle, media, sourceType}) {
      const typeLabel = sourceType
        ? `Type: ${sourceType.charAt(0).toUpperCase() + sourceType.slice(1)}`
        : ''
      return {
        title: title || 'Untitled Source/Resource',
        subtitle: [subtitle?.replace(/^https?:\/\//, ''), typeLabel].filter(Boolean).join(' | '),
        media: media || DocumentsIcon,
      }
    },
  },
})
// schemas/researchFile.ts

import {defineField, defineType} from 'sanity'
import {DocumentTextIcon, SearchIcon} from '@sanity/icons'

export const researchDocument = defineType({
  name: 'researchDocument',
  title: 'Research Document',
  type: 'document',
  icon: SearchIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Research File Title',
      type: 'string',
      description: 'A clear title for this research document.',
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
      name: 'relatedTo',
      title: 'Related To',
      type: 'array',
of: [{type: 'reference',
      to: [
        {type: 'project'},
        {type: 'magazineArticle'},
        {type: 'podcastEpisode'},
        {type: 'film'},
        {type: 'tvShow'},
        {type: 'documentary'},
        {type: 'book'},
        {type: 'youtubeChannel'},
        {type: 'company'},
        {type: 'person'},
        {type: 'newspaperArticle'},

      ], }],
      description: 'Link this research file to the primary content it supports.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'Draft', value: 'draft'},
          {title: 'In Progress', value: 'inProgress'},
          {title: 'Review', value: 'review'},
          {title: 'Completed', value: 'completed'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'radio',
      },
      initialValue: 'inProgress',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'A brief overview of the research file\'s content or purpose.',
      rows: 3,
    }),
    defineField({
      name: 'researchContent',
      title: 'Research Content',
      type: 'array',
      description: 'Add various types of content to organize your research.',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Numbered', value: 'number'}],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'URL',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        {type: 'image', options: {hotspot: true}},
        {type: 'file', title: 'Attached File'},
        {
          name: 'externalLink',
          title: 'External Link',
          type: 'object',
          fields: [
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              description: 'A brief description of the link.',
            }),
          ],
          preview: {
            select: {
              title: 'description',
              subtitle: 'url',
            },
            prepare(selection) {
              const {title, subtitle} = selection;
              return {
                title: title || 'External Link',
                subtitle: subtitle,
                media: DocumentTextIcon,
              };
            },
          },
        },
        // --- Each reference now has a unique 'name' to resolve the warning ---
        {name: 'referencedQuote', type: 'reference', to: [{type: 'quote'}], title: 'Referenced Quote'},
        {name: 'referencedPerson', type: 'reference', to: [{type: 'person'}], title: 'Referenced Person'},
        {name: 'referencedSource', type: 'reference', to: [{type: 'source'}], title: 'Referenced Source'},
        {name: 'referencedCompany', type: 'reference', to: [{type: 'company'}], title: 'Referenced Company'},
        {name: 'embeddedTimeline', type: 'reference', to: [{type: 'timeline'}], title: 'Embedded Timeline'},
        {name: 'referencedResearchElement', type: 'reference', to: [{type: 'researchElement'}], title: 'Research Element'},
        {name: 'referencedVideo', type: 'reference', to: [{type: 'videoContent'}], title: 'Referenced Video'},
        {name: 'referencedVoiceRecording', type: 'reference', to: [{type: 'voiceRecording'}], title: 'Referenced Voice Recording'},
        {name: 'referencedCustomImage', type: 'reference', to: [{type: 'customImage'}], title: 'Referenced Custom Image'},
      ],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
      description: 'Categorize this research file.',
    }),
    defineField({
      name: 'authors',
      title: 'Authors/Contributors',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'person'}]}],
      description: 'People who contributed to this research file.',
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'timeline'}]}],
      description: 'People who contributed to this research file.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      relatedToTitle: 'relatedTo.title',
      relatedToType: 'relatedTo._type',
      status: 'status',
      contentCount: 'researchContent.length',
    },
    prepare(selection) {
      const {title, relatedToTitle, relatedToType, status, contentCount} = selection;
      const statusText = status ? `[${status.charAt(0).toUpperCase() + status.slice(1)}]` : '';
      const relatedToText = relatedToTitle ? ` for ${relatedToTitle} (${relatedToType})` : '';
      const contentCountText = contentCount === 1 ? '1 item' : `${contentCount || 0} items`;

      return {
        title: `${title} ${statusText}`,
        subtitle: `Related to: ${relatedToTitle || 'N/A'} | ${contentCountText}`,
        description: `Type: ${relatedToType || 'N/A'}`,
      };
    },
  },
})
import {BlockquoteIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const quote = defineType({
  name: 'quote',
  title: 'Quote',
  type: 'document',
  icon: BlockquoteIcon,
  fieldsets: [
    {name: 'quoteContent', title: 'Quote Content'},
    {name: 'attribution', title: 'Attribution & Source'},
  ],
  fields: [
    // The main toggle field for the quote type
    defineField({
      name: 'quoteType',
      title: 'Quote Type',
      type: 'string',
      options: {
        list: [
          {title: 'Single Quote', value: 'singular'},
          {title: 'Dialogue', value: 'dialogue'},
        ],
        layout: 'radio',
      },
      initialValue: 'singular',
      validation: (Rule) => Rule.required(),
    }),

    // --- Singular Quote Fields (conditional) ---
    defineField({
      name: 'text',
      title: 'Quote Text',
      type: 'text',
      description: 'The full content of the quote from a single speaker.',
      fieldset: 'quoteContent',
      rows: 3,
      hidden: ({parent}) => parent?.quoteType !== 'singular',
      validation: (Rule) => Rule.custom((text, {parent}) => {
        if (parent?.quoteType === 'singular' && !text) {
          return 'Quote text is required for a single quote.'
        }
        return true
      }),
    }),
    defineField({
      name: 'attribution',
      title: 'Attributed To',
      type: 'reference',
      to: [{type: 'person'}],
      fieldset: 'attribution',
      hidden: ({parent}) => parent?.quoteType !== 'singular',
    }),
    
    // --- Dialogue Fields (conditional) ---
    defineField({
      name: 'dialogue',
      title: 'Dialogue',
      type: 'array',
      description: 'The back-and-forth conversation between speakers.',
      of: [
        {
          type: 'object',
          title: 'Line of Dialogue',
          fields: [
            defineField({
              name: 'speaker',
              title: 'Speaker',
              type: 'reference',
              to: [{type: 'person'}],
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'line',
              title: 'Line',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              speakerName: 'speaker.name',
              line: 'line',
            },
            prepare(selection) {
              const {speakerName, line} = selection;
              return {
                title: speakerName ? `${speakerName}:` : 'Unknown Speaker:',
                subtitle: line,
              };
            },
          },
        },
      ],
      fieldset: 'quoteContent',
      hidden: ({parent}) => parent?.quoteType !== 'dialogue',
      validation: (Rule) => Rule.custom((dialogue, {parent}) => {
        if (parent?.quoteType === 'dialogue' && (!dialogue || dialogue.length === 0)) {
          return 'Dialogue requires at least one line.'
        }
        return true
      }),
    }),

    // --- Common Fields ---
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'These notes are for internal use and will not be published.',
      rows: 3,
    }),
    defineField({
      name: 'originalSource',
      title: 'Original Source',
      type: 'reference',
      to: [{type: 'book'}, {type: 'film'}, {type: 'documentary'}, {type: 'tvShowEpisode'}, {type: 'podcastEpisode'}],
      description: 'The primary source where the quote originated.',
      fieldset: 'attribution',
    }),
    defineField({
      name: 'sourceTimestamp',
      title: 'Source Timestamp',
      type: 'number',
      fieldset: 'attribution',
    }),
    defineField({
      name: 'referencedSources',
      title: 'Referencing Sources',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'book'}, {type: 'film'}]}],
      description: 'Additional media which references this quote.',
      fieldset: 'attribution',
    }),
    defineField({
      name: 'relatedContent',
      title: 'Related Content',
      type: 'array',
      of: [{type: 'relatedContent',}],
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      description: 'A direct link to the source article, video, or page.',
      fieldset: 'attribution',
    }),
    defineField({
      name: 'media',
      title: 'Media',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      quoteType: 'quoteType',
      text: 'text',
      authorName: 'attribution.name',
      dialogueLines: 'dialogue',
      firstSpeaker: 'dialogue.0.speaker.name',
      firstLine: 'dialogue.0.line',
      podcastTitle: 'originalSource.parentShow.title',
      episodeNumber: 'originalSource.episodeNumber',
      airDate: 'originalSource.airDate',
      media: 'media',
    },
    prepare(selection) {
      const {
        quoteType,
        text,
        authorName,
        dialogueLines,
        firstSpeaker,
        firstLine,
        podcastTitle,
        episodeNumber,
        airDate,
        media,
      } = selection;
      
      const formattedDate = airDate
        ? new Date(airDate).toLocaleDateString()
        : 'No date';

      let title;
      let subtitle;

      if (quoteType === 'dialogue' && dialogueLines && dialogueLines.length > 0) {
        title = firstSpeaker ? `${firstSpeaker}: "${firstLine}"` : `Dialogue (${dialogueLines.length} lines)`;
        subtitle = `Conversation`;
      } else {
        // Singular quote preview
        title = `"${text}"`;
        const subtitleParts = [authorName];
        if (podcastTitle && episodeNumber) {
          subtitleParts.push(`${podcastTitle} #${episodeNumber}`);
          subtitleParts.push(formattedDate);
        }
        subtitle = subtitleParts.filter(Boolean).join(' | ');
      }

      return {
        title: title,
        subtitle: subtitle || 'No attribution or source',
        media: media || BlockquoteIcon,
      };
    },
  },
})
import {defineField, defineType} from 'sanity'
import {ComposeIcon} from '@sanity/icons'

/**
 * Defines the 'contextInput' object.
 * This is a self-contained block that adds a layer of context to a root zing.
 * It's built around its own zing and enriched with metadata.
 */
export const contextInput = defineType({
  name: 'contextInput',
  title: 'Context Input',
  type: 'object',
  icon: ComposeIcon,
  fields: [
    defineField({
      name: 'zing',
      title: 'Context Zing',
      type: 'reference',
      to: [{type: 'zing'}],
      description: 'The core thought or data point for this context block.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'addedOn',
      title: 'Added On',
      type: 'datetime',
      readOnly: true,
      initialValue: () => new Date().toISOString(),
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
      },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      description: 'Optional: Categorize this specific context.',
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
      description: 'Optional: A link to an external source for this context.',
    }),
  ],
  preview: {
    select: {
      title: 'zing.content',
      subtitle: 'zing.author.firstName',
      media: 'zing.author.picture',
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'No content',
        subtitle: `by ${subtitle || 'Unknown'}`,
        media,
      }
    },
  },
})
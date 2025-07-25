import {defineField, defineType} from 'sanity'
import {BlockquoteIcon} from '@sanity/icons'

export const pullQuote = defineType({
  name: 'pullQuote',
  title: 'Pull Quote',
  type: 'object',
  icon: BlockquoteIcon,
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'reference',
      to: [{type: 'quote'}],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'quote.text',
      subtitle: 'quote.source.name',
    },
    prepare({title, subtitle}) {
      const quoteText = title?.[0]?.children?.[0]?.text // Safely access nested text
      return {
        title: quoteText ? `"${quoteText.substring(0, 50)}..."` : 'No quote text',
        subtitle: `Source: ${subtitle || 'N/A'}`,
        media: BlockquoteIcon,
      }
    },
  },
})

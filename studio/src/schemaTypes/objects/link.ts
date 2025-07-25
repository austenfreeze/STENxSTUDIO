// schemas/objects/link.js
import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title', // <-- Name of the field is 'title'
      title: 'Display Text', // <-- Title of the field is 'Display Text'
      type: 'string',
      description: 'The text that will be displayed for the link (optional).',
    }),
    defineField({
      name: 'url',
      title: 'External URL',
      type: 'url',
      description: 'Link to a web page outside of your own site.',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          if (!value && !(context.parent as any)?.internalLink) {
            return 'You must provide either an External URL or an Internal Link.'
          }
          return true
        }),

    }),
    defineField({
      name: 'internalLink',
      title: 'Internal Link',
      type: 'reference',
      description: 'Link to a document within your Sanity project.',
      to: [
        {type: 'person'},
        {type: 'book'},
        // {type: 'page'},
        // {type: 'post'},
      ],
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',    // <-- CORRECTED: Use 'title' to select the Display Text
      subtitle: 'url',   // Selects the URL
    },
    prepare({title, subtitle}) {
      return {
        title: title || subtitle || 'Untitled Link', // Fallback for title
        subtitle: subtitle,
      };
    },
  },
});
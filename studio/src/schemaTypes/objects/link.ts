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
      name: 'title',
      title: 'Display Text',
      type: 'string',
      description: 'The text that will be displayed for the link (optional).',
    }),
    defineField({
      name: 'href',
      title: 'External URL',
      type: 'url',
      description: 'Link to a web page outside of your own site.',
      // Make URL validation conditional based on whether an internal link is present
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
        // Add all document types you might want to link to internally
        {type: 'person'},
        {type: 'book'},
        // Remember to add 'page' and 'post' if you have those schemas
        // {type: 'page'},
        // {type: 'post'},
      ],
    }),
    defineField({
      name: 'source',
      title: 'Source',
      type: 'reference',
      to: [{type: 'source'}],
      description: 'Tag the origin of this link (e.g., Internet Archive).',
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
      title: 'title',
      href: 'href',
      internalLink: 'internalLink.title',
      source: 'source.name',
    },
    prepare({title, href, internalLink, source}) {
      // Use the explicitly set title, or the title of the internal link, or the URL itself.
      const displayTitle = title || internalLink || href || 'No link specified'
      // Show where the link points to.
      const subtitle = href
        ? `External: ${href}`
        : internalLink
          ? `Internal: ${internalLink}`
          : 'No destination'

      // Add the source to the subtitle if it exists.
      const subtitleWithSource = source ? `${subtitle} (Source: ${source})` : subtitle

      return {
        title: displayTitle,
        subtitle: subtitleWithSource,
      }
    },
  },
})
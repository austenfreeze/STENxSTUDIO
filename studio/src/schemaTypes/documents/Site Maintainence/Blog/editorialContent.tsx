import {defineArrayMember, defineType, defineField} from 'sanity'
import {
  HighlightIcon,
  CommentIcon,
  LinkIcon,
  LaunchIcon,
  InfoOutlineIcon,
  BlockquoteIcon,
} from '@sanity/icons'
import React from 'react' // Import React when using JSX

// --- CORRECTED IMPORT PATHS ---
// The path needs to go up three levels from the 'Blog' directory to reach the 'schemaTypes' root.
import CustomRichTextEditor from '../../../components/CustomRichTextEditor'
import InternalLinkRenderer from '../../../components/InternalLinkRenderer'
import ExternalLinkRenderer from '../../../components/ExternalLinkRenderer'
import {TitleStyle, HighlightDecorator} from '../../../components/BlockDecorators'

/**
 * This is the new, "supercharged" rich text editor schema.
 * It's the core of the new editorial suite, designed for maximum flexibility and interconnectivity.
 */
export const editorialContent = defineType({
  title: 'Editorial Content',
  name: 'editorialContent',
  type: 'array',
  // We continue to use your custom editor component
  components: {
    input: CustomRichTextEditor,
  },
  of: [
    // The standard text block, with enhanced styles, decorators, and annotations
    defineArrayMember({
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'Quote', value: 'blockquote'},
        {title: 'Title', value: 'title', component: TitleStyle},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
      // --- CORRECTED MARKS OBJECT ---
      marks: {
        decorators: [
          {title: 'Strong', value: 'strong'},
          {title: 'Emphasis', value: 'em'},
          {title: 'Code', value: 'code'},
          {
            title: 'Highlight',
            value: 'highlight',
            icon: HighlightIcon,
            component: HighlightDecorator,
          },
          {
            title: 'Inline Comment',
            value: 'inlineComment',
            icon: CommentIcon,
            component: ({children}) => <span style={{backgroundColor: 'yellow'}}>{children}</span>,
          },
        ],
        annotations: [
          // UPDATED: Internal links can now point to your new content types
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal Link',
            icon: LinkIcon,
            fields: [
              defineField({
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [
                  {type: 'post'},
                  {type: 'page'},
                  {type: 'multimediaArticle'},
                  {type: 'editorialThread'},
                  {type: 'researchElement'},
                  {type: 'quote'},
                ],
              }),
            ],
            components: {
              annotation: InternalLinkRenderer,
            },
          },
          // Your existing external link setup
          {
            name: 'externalLink',
            type: 'object',
            title: 'External Link',
            icon: LaunchIcon,
            fields: [
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: false,
                    scheme: ['http', 'https'],
                  })
                    .required()
                    .warning('External links should start with https://'),
              }),
              defineField({
                name: 'openInNewTab',
                title: 'Open in new tab',
                type: 'boolean',
                initialValue: true,
              }),
            ],
            components: {
              annotation: ExternalLinkRenderer,
            },
          },
        ],
      },
    }),
    // Your existing custom image and code blocks remain
    defineArrayMember({
      type: 'image',
      name: 'customImage',
      options: {hotspot: true},
      // ... your existing image fields
    }),
    defineArrayMember({
      type: 'code',
      name: 'codeBlock',
      // ... your existing code block options
    }),
    // --- NEW INLINE BLOCKS ---
    // NEW: A block for embedding a 'researchElement'
    defineArrayMember({
      name: 'researchCitation',
      title: 'Research Citation',
      type: 'object',
      icon: InfoOutlineIcon,
      fields: [
        defineField({
          name: 'element',
          title: 'Research Element',
          type: 'reference',
          to: [{type: 'researchElement'}],
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'comment',
          title: 'Editorial Comment',
          type: 'text',
          rows: 3,
          description: 'Private note on why this citation is relevant here.',
        }),
      ],
      preview: {
        select: {
          title: 'element.title',
          subtitle: 'element.source.name',
        },
        prepare({title, subtitle}) {
          return {
            title: title || 'No title',
            subtitle: `Source: ${subtitle || 'N/A'}`,
            media: InfoOutlineIcon,
          }
        },
      },
    }),
    // NEW: A block for embedding a 'quote'
    defineArrayMember({
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
    }),
  ],
})
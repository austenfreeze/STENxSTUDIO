// studio/src/schemaTypes/objects/richTextContent.ts
import {defineArrayMember, defineType, defineField} from 'sanity'
import {
  HighlightIcon,
  CommentIcon,
  LinkIcon,
  LaunchIcon,
  InfoOutlineIcon,
  BlockquoteIcon,
  CodeBlockIcon
} from '@sanity/icons'
import React from 'react'

// Corrected paths based on your file structure
import CustomRichTextEditor from '../components/CustomRichTextEditor'
import InternalLinkRenderer from '../components/InternalLinkRenderer'
import ExternalLinkRenderer from '../components/ExternalLinkRenderer'
import {TitleStyle, HighlightDecorator} from '../components/BlockDecorators'
import InlineCommentComponent from '../components/InlineCommentComponent'

export const richTextContent = defineType({
  title: 'Rich Text Content',
  name: 'richTextContent',
  type: 'array',
  components: {
    input: CustomRichTextEditor,
  },
  of: [
    defineArrayMember({
      type: 'block',
      name: 'contentBlock', // Giving the block a name for more specific queries
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'H4', value: 'h4'},
        {title: 'H5', value: 'h5'},
        {title: 'H6', value: 'h6'},
        {title: 'Quote', value: 'blockquote'},
        {title: 'Title', value: 'title', component: TitleStyle},
      ],
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
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
            component: InlineCommentComponent,
          },
        ],
        annotations: [
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
                  {type: 'magazineArticle'},
                  {type: 'magazineIssue'},
                  {type: 'book'},
                  {type: 'film'},
                ],
              }),
            ],
            components: {
              annotation: InternalLinkRenderer,
            },
          },
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
                  }).required().warning('External links should start with https://'),
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
    defineArrayMember({
      name: 'customImage',
      title: 'Custom Image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Used for SEO and accessibility.'
        }),
        defineField({
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Caption displayed below the image.'
        }),
        defineField({
          name: 'alignment',
          title: 'Alignment',
          type: 'string',
          options: {
            list: [
              { title: 'Left', value: 'left' },
              { title: 'Center', value: 'center' },
              { title: 'Right', value: 'right' }
            ],
            layout: 'radio'
          },
          initialValue: 'center'
        }),
        defineField({
          name: 'size',
          title: 'Size',
          type: 'string',
          options: {
            list: [
              { title: 'Small', value: 'small' },
              { title: 'Medium', value: 'medium' },
              { title: 'Large', value: 'large' },
              { title: 'Full Width', value: 'full' }
            ],
            layout: 'radio'
          },
          initialValue: 'full'
        })
      ],
      preview: {
        select: {
          title: 'caption',
          subtitle: 'alignment',
          media: 'asset',
        },
        prepare({ title, subtitle, media }) {
          return {
            title: title || 'No caption',
            subtitle: `Align: ${subtitle}`,
            media,
          }
        },
      },
    }),
    defineArrayMember({
      type: 'code',
      name: 'codeBlock',
      title: 'Code Block',
      icon: CodeBlockIcon,
      options: {
        language: 'javascript',
        languageAlternatives: [
          { title: 'Javascript', value: 'javascript' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'Python', value: 'python' },
          { title: 'JSON', value: 'json' },
        ],
        withFilename: true,
      },
    }),
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
          const quoteText = title?.[0]?.children?.[0]?.text
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
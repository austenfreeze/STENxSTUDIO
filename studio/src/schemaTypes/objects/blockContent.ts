import { defineArrayMember, defineType, defineField } from "sanity"
import CustomRichTextEditor from "../components/CustomRichTextEditor"
import InternalLinkRenderer from "../components/InternalLinkRenderer"
import ExternalLinkRenderer from "../components/ExternalLinkRenderer"
import { TitleStyle, HighlightDecorator } from "../components/BlockDecorators"

export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  components: {
    input: CustomRichTextEditor,
  },
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'H1', value: 'h1' },
        { title: 'H2', value: 'h2' },
        { title: 'H3', value: 'h3' },
        { title: 'H4', value: 'h4' },
        { title: 'H5', value: 'h5' },
        { title: 'H6', value: 'h6' },
        { title: 'Quote', value: 'blockquote' },
        { title: 'Title', value: 'title', component: TitleStyle },
      ],
      lists: [
        { title: 'Bullet', value: 'bullet' },
        { title: 'Numbered', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Strong', value: 'strong' },
          { title: 'Emphasis', value: 'em' },
          { title: 'Code', value: 'code' },
          {
            title: 'Highlight',
            value: 'highlight',
            icon: () => 'H',
            component: HighlightDecorator,
          },
        ],
        annotations: [
          {
            name: 'internalLink',
            type: 'object',
            title: 'Internal Link',
            fields: [
              defineField({
                name: 'reference',
                type: 'reference',
                title: 'Reference',
                to: [{ type: 'post' }, { type: 'page' }],
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
            fields: [
              defineField({
                name: 'href',
                title: 'URL',
                type: 'url',
                validation: (Rule) =>
                  Rule.uri({
                    allowRelative: false,
                    scheme: ['http', 'https' ],
                  }).required().warning('External links should start with https://'),
              }),
              defineField({
                name: 'openInNewTab',
                title: 'Open in new tab',
                type: 'boolean',
                initialValue: false,
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
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Used for SEO and accessibility.'
        },
        {
          name: 'caption',
          type: 'string',
          title: 'Caption',
          description: 'Caption displayed below the image.'
        },
        {
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
        },
        {
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
        }
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
      name: 'code',
      title: 'Code with all options',
      options: {
        language: 'javascript',
        languageAlternatives: [
          { title: 'Javascript', value: 'javascript' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
        ],
        withFilename: true,
      },
    }),
  ],
})
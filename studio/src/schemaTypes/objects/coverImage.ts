import {defineField, defineType} from 'sanity'

export const coverImage = defineType({
  name: 'coverImage',
  title: 'Cover Image',
  type: 'object',
  fieldsets: [
    {
      name: 'details',
      title: 'Image Details',
      options: { collapsible: true, collapsed: true }, // 👈 hidden dropdown
    },
  ],
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Image Title/Caption',
      type: 'string',
      description: 'Optional display title or label',
    }),
    defineField({
      name: 'alt',
      title: 'Alt Text',
      type: 'string',
      description: 'Important for accessibility and SEO',
      validation: (rule) => rule.required(),
      fieldset: 'details',
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution',
      type: 'string',
      description: 'Creator or owner of the image',
      fieldset: 'details',
    }),
    defineField({
      name: 'license',
      title: 'License/Usage Info',
      type: 'string',
      description: 'E.g., Creative Commons, editorial-only, etc.',
      fieldset: 'details',
    }),
  ],
  preview: {
    select: {
      media: 'image',
      title: 'title',
      subtitle: 'attribution',
    },
  },
})

// person.ts

// All import statements must be at the top of the file
import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const person = defineType({
  name: 'person',
  title: 'Person',
  icon: UserIcon,
  type: 'document',
  fieldsets: [
    {
      name: 'fullName',
      title: 'Full Name',
      options: {columns: 3},
    },
  ],
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (rule) => rule.required(),
      fieldset: 'fullName',
    }),
    defineField({
      name: 'middleName',
      title: 'Middle Name',
      type: 'string',
      fieldset: 'fullName',
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (rule) => rule.required(),
      fieldset: 'fullName',
    }),
    defineField({
      name: 'picture',
      title: 'Picture',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) =>
            rule.custom((alt, context) => {
              if ((context.document?.picture as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            }),
        }),
      ],
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.firstName ?? ''}-${doc.lastName ?? ''}`,
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
   
   
defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'relatedContent',
      title: 'Related Content',
      type: 'relatedContent'
    }),
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      media: 'picture',
      // This line is correctly commented out to prevent errors from broken references.
      // categories: 'categories[]->{title}',
    },
    prepare(selection) {
      const {firstName, lastName, media, categories} = selection
      const title = `${firstName || ''} ${lastName || ''}`.trim()

      // This logic safely handles categories being undefined.
      const subtitle = (categories || []).map((category) => category.title).join(', ')

      return {
        title: title || 'Untitled Person',
        subtitle: subtitle || 'Person', // Fallback subtitle
        media: media || UserIcon,
      }
    },
  },
})
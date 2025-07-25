// person.ts
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
    // If you want categories for a person, ADD THIS FIELD:
    // defineField({
    //   name: 'categories',
    //   title: 'Categories',
    //   type: 'array',
    //   of: [{type: 'reference', to: [{type: 'category'}]}],
    // }),
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
      // categories: 'categories[]->title', // REMOVED: This field does not exist in the schema.
    },
    prepare(selection) {
      const {firstName, lastName, media} = selection // REMOVED 'categories' from destructuring
      const title = `${firstName || ''} ${lastName || ''}`.trim()

      // Subtitle now defaults to 'Person' or could be adjusted to something else if needed.
      const subtitle = 'Person'; // Fixed: No longer trying to display non-existent categories.

      return {
        title: title || 'Untitled Person',
        subtitle: subtitle,
        media: media || UserIcon,
      }
    },
  },
})
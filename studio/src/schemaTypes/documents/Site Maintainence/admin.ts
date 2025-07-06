import {UsersIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

/**
 * Defines the 'admin' document type for users of the Sanity Studio.
 * This schema distinguishes internal authors from the public-facing 'person' documents.
 */
export const admin = defineType({
  name: 'admin',
  title: 'Studio User',
  icon: UsersIcon,
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
  ],

  // --- CORRECTED PREVIEW ---
  preview: {
    select: {
      firstName: 'firstName',
      middleName: 'middleName',
      lastName: 'lastName',
      media: 'picture', // Use the 'picture' field for the media
    },
    prepare({firstName, middleName, lastName, media}) {
      // Construct the full name for the title
      const title = [firstName, middleName, lastName].filter(Boolean).join(' ')
      
      return {
        title: title || 'Untitled User',
        media,
      }
    },
  },
})
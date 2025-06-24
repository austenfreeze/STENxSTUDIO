import { UserIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export const person = defineType({
  name: 'person',
  title: 'Person',
  icon: UserIcon,
  type: 'document',
  fieldsets: [
    {
      name: 'fullName',
      title: 'Full Name',
      options: { columns: 3 },
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
      of: [
        {
          type: 'reference',
          to: [{ type: 'category' }],
        },
      ],
      description: 'Select or create categories like author, anchor, influencer, politician, etc.',
    }),
    defineField({
      name: 'relatedWorks',
      title: 'Related Works',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'book' },
            { type: 'post' },
          ],
        },
      ],
      description: 'Works associated with this person',
    }),
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      picture: 'picture',
      categories: 'categories',
    },
    prepare(selection) {
      const { firstName, lastName, picture, categories } = selection

      const categoryTitles =
        Array.isArray(categories) && categories.length > 0
          ? categories.map((cat) => (typeof cat === 'string' ? cat : cat.title)).join(', ')
          : 'No categories'

      return {
        title: `${firstName ?? ''} ${lastName ?? ''}`.trim(),
        subtitle: categoryTitles,
        media: picture,
      }
    },
  },
})

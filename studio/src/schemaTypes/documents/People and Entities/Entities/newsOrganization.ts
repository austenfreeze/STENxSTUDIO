import {defineField, defineType} from 'sanity'
import {BsNewspaper} from 'react-icons/bs'

export const newsOrganization = defineType({
  name: 'newsOrganization',
  title: 'News Organization',
  type: 'document',
  icon: BsNewspaper,
  fields: [
    defineField({
      name: 'name',
      title: 'Organization Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
  name: 'logo',
  title: 'Logo',
  type: 'reference',
  to: [{type: 'logo'}], // References the central 'logo' document type
}),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
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
    title: 'name',
    // Fetches the logo's image asset through the reference
    media: 'logo.image',
  },
  prepare({title, media}) {
    return {
      title: title,
      // The fallback icon is preserved from your original schema
      media: media || BsNewspaper,
    }
  },
},
})
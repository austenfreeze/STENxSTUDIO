import {defineField, defineType} from 'sanity'
import {BsGlobe} from 'react-icons/bs'

export const company = defineType({
  name: 'company',
  title: 'Company',
  type: 'document',
  icon: BsGlobe,
  fields: [
    defineField({
      name: 'name',
      title: 'Company Name',
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
    name: 'relatedContent',
title: 'Related Content',
type: 'relatedContent',
}),
defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
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
      media: media || BsGlobe,
    }
  },
},
})
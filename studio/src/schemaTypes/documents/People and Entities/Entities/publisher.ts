import {defineField, defineType} from 'sanity'
import {BsBuilding} from 'react-icons/bs'

export const publisher = defineType({
  name: 'publisher',
  title: 'Publisher',
  type: 'document',
  icon: BsBuilding,
  fieldsets: [{name: 'contact', title: 'Contact Information'}],
  fields: [
    defineField({
      name: 'name',
      title: 'Publisher Name',
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
      // This assumes you have a separate schema named 'logo' that contains an 'image' field.
      type: 'reference',
      to: [{type: 'logo'}],
      description: 'The official logo of the publisher.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief overview of the publisher.',
      rows: 4,
    }),
    defineField({
      name: 'website',
      title: 'Website',
      type: 'url',
      fieldset: 'contact',
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      fieldset: 'contact',
      rows: 3,
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
      website: 'website',
      // Assumes the referenced 'logo' document has a field named 'image' of type 'image'.
      media: 'logo.image',
    },
    prepare({title, website, media}) {
      return {
        title: title,
        subtitle: website || 'No website provided',
        media: media || BsBuilding,
      }
    },
  },
})
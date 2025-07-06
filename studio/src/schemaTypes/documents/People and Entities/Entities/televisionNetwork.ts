import {defineField, defineType} from 'sanity'
import {MdTv} from 'react-icons/md'

export const televisionNetwork = defineType({
  name: 'televisionNetwork',
  title: 'Television Network',
  type: 'document',
  icon: MdTv, // Icon for the document type
  fields: [
    defineField({
      name: 'networkName',
      title: 'Network Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'networkLogo',
      title: 'Network Logo',
      type: 'reference',
      // Corrected 'to' syntax
      to: [{type: 'logo'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'hostCountry',
      title: 'Host Country',
      type: 'string',
      options: {
        list: [
          {title: 'Canada', value: 'canada'},
          {title: 'China', value: 'china'},
          {title: 'France', value: 'france'},
          {title: 'Germany', value: 'germany'},
          {title: 'India', value: 'india'},
          {title: 'Japan', value: 'japan'},
          {title: 'Qatar', value: 'qatar'},
          {title: 'Russia', value: 'russia'},
          {title: 'United Kingdom', value: 'united kingdom'},
          {title: 'United States', value: 'united states'},
        ],
        layout: 'dropdown',
      },
    }),
    defineField({
      name: 'launchDate',
      title: 'Launch Date',
      type: 'date',
      options: {
        dateFormat: 'MMMM Do, YYYY',
      },
    }),
    defineField({
      name: 'formerNames',
      title: 'Former Names', // Corrected title
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'website',
      title: 'Website', // Corrected title
      // Assumes you have a custom 'link' object schema
      type: 'link',
    }),
    defineField({
      name: 'relevantPrograms',
      title: 'Relevant Programs', // Corrected title
      type: 'array',
      description: 'List any notable TV shows from this network.',
      // Corrected syntax for an array of references
      of: [
        {
          type: 'reference',
          to: [{type: 'tvShow'}],
        },
      ],
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

  // --- PREVIEW ---
  // Provides a richer view in the Sanity Studio document lists
  preview: {
    select: {
      // Fields to use in the prepare function
      title: 'networkName',
      country: 'hostCountry',
      // Query through the reference to get the logo image asset
      // Note: This path assumes your 'logo' schema has a field named 'logo' of type 'image'.
      // Adjust 'networkLogo.logo.asset' if your schema is different.
      media: 'networkLogo.logo.asset',
    },
    prepare({title, country, media}) {
      // Capitalize the first letter of the country for display
      const formattedCountry = country ? country.charAt(0).toUpperCase() + country.slice(1) : ''

      return {
        title: title || 'No network name',
        subtitle: formattedCountry || '',
        media: media || MdTv, // Use the logo image or fallback to the TV icon
      }
    },
  },
})
// company.ts
import {defineField, defineType} from 'sanity'
import {BsGlobe} from 'react-icons/bs'
// TagIcon is no longer needed as categories field is removed from company

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
    // NEW FIELD: Business Description
    defineField({
      name: 'businessDescription',
      title: 'Business Description',
      type: 'text',
      description: 'A brief description of what the company does.',
    }),
    // NEW FIELD: Business Description
    defineField({
      name: 'extensionsDivisions',
      title: 'Extensions/Divisions:',
      type: 'array',
      of: [{type: 'reference',
	to: [{type: 'company'}], }],
    }),
  ],
  preview: {
    select: {
      title: 'name',                  // Company name for the title
      subtitle: 'businessDescription', // New field for the subtitle
      media: 'logo.image',            // Logo image for the media
    },
    prepare({title, subtitle, media}) {
      return {
        title: title || 'Untitled Company',       // Fallback for title
        subtitle: subtitle || 'No description',   // Fallback for subtitle
        media: media || BsGlobe,                   // Fallback for media
      }
    },
  },
})
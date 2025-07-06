import {defineField, defineType} from 'sanity'
import {BsCardImage} from 'react-icons/bs'

export const logo = defineType({
  name: 'logo',
  title: 'Brand Logo',
  type: 'document',
  icon: BsCardImage,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'A descriptive name for this logo (e.g., "Google Logo - Color").',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alternative Text',
          type: 'string',
          description: 'A concise description of the logo for accessibility.',
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'entity',
      title: 'Associated Entity',
      type: 'reference',
      description: 'The company, publisher, or organization this logo belongs to.',
      to: [
        {type: 'publisher'},
        {type: 'company'},
        {type: 'newsOrganization'},
        {type: 'televisionNetwork'},
	{type: 'magazine'},

      ],
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
      title: 'title',
      // The following queries attempt to get the name from the referenced entity.
      // It checks for 'name' (common in company/publisher) and 'networkName' (from your tvNetwork schema).
      entityName: 'entity.name',
      networkName: 'entity.networkName',
      media: 'image',
    },
    prepare({title, entityName, networkName, media}) {
      // Use whichever name is available as the subtitle
      const subtitle = entityName || networkName || 'No associated entity'
      return {
        title: title,
        subtitle: `For: ${subtitle}`,
        media: media,
      }
    },
  },
})
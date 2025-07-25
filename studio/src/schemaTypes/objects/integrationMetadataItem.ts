// /schemas/objects/integrationMetadataItem.ts
import {defineField, defineType} from 'sanity'

export const integrationMetadataItem = defineType({
  name: 'integrationMetadataItem',
  title: 'Metadata Item',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
    }),
    defineField({
      name: 'notes',
      title: 'Notes or Context',
      type: 'blockContent',
    }),
    defineField({
      name: 'parentIntegration',
      title: 'Parent Integration',
      type: 'reference',
      to: [{type: 'siteIntegrationSettings'}],
    }),
  ],
  preview: {
    select: {
      title: 'label',
      subtitle: 'value',
      media: 'parentIntegration.logo', // Reference the logo field from parent
    },
  },
})

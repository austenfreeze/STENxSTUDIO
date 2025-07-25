// studio/src/schemaTypes/objects/seriesNavigation.ts
import {defineField, defineType} from 'sanity'

export const seriesNavigation = defineType({
  name: 'seriesNavigation',
  title: 'Series Navigation',
  type: 'object',
  fields: [
    defineField({
      name: 'previousIssue',
      title: 'Previous Issue',
      type: 'reference',
      to: [{type: 'magazineIssue'}],
      description: 'The issue that comes before this one in the series.',
    }),
    defineField({
      name: 'nextIssue',
      title: 'Next Issue',
      type: 'reference',
      to: [{type: 'magazineIssue'}],
      description: 'The issue that comes after this one in the series.',
    }),
  ],
  // No preview needed as the custom input component will handle the display
});
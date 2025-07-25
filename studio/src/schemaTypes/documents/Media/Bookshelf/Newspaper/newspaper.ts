import {defineField, defineType} from 'sanity'
import {BookIcon} from '@sanity/icons'

export const newspaper = defineType({
  name: 'newspaper', // <-- CORRECTED: Typo fixed here
  title: 'Newspaper Publication', // More descriptive title
  type: 'document',
  icon: BookIcon, // Added an icon for better UI

  fieldsets: [{name: 'publicationDetails', title: 'Publication Details', options: {collapsible: true, collapsed: false}}], // Made collapsible
  fields: [
    defineField({
      name: 'title',
      title: 'Newspaper Name', // Changed title for clarity
      type: 'string',
      description: 'The official name of the newspaper (e.g., "The New York Times").',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
      description: 'A unique identifier for the newspaper in URLs.',
    }),
    defineField({
      name: 'logo',
      title: 'Newspaper Logo', // More descriptive title
      type: 'customImage', // Assuming 'customImage' is a defined type
      options: {
        hotspot: true,
      },
      description: 'The main logo of the newspaper.',
    }),
    defineField({
      name: 'website',
      title: 'Official Website',
      type: 'url',
      description: 'The official website URL for the newspaper (if applicable).',
    }),
    defineField({
      name: 'foundingDate', // Renamed for clarity
      title: 'Founding Date',
      type: 'date',
      fieldset: 'publicationDetails',
      description: 'The date the newspaper was first established.',
    }),
    defineField({
      name: 'status',
      title: 'Publication Status',
      type: 'string',
      options: {
        list: [
          {title: 'Still in Print', value: 'inPrint'},
          {title: 'Digital Only', value: 'digitalOnly'},
          {title: 'Defunct', value: 'defunct'},
        ],
        layout: 'radio',
      },
      initialValue: 'inPrint',
      fieldset: 'publicationDetails',
      validation: (rule) => rule.required(),
      description: 'Current status of the newspaper\'s publication.',
    }),
    defineField({
      name: 'lastPrintDate', // Renamed for clarity
      title: 'Last Print Issue Date',
      type: 'date',
      fieldset: 'publicationDetails',
      hidden: ({parent}) => parent.status !== 'defunct', // Only show if status is 'defunct'
      description: 'The date of the last physical print issue.',
    }),
    defineField({
      name: 'issues', // Changed name from newspaperHeadlines for better semantic meaning
      title: 'Published Issues', // Changed title
      type: 'array',
      of: [{type: 'reference', to: [{type: 'newspaperIssue'}]}], // Reference a new 'newspaperIssue' type
      description: 'A list of all published issues for this newspaper.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      foundingDate: 'foundingDate',
      status: 'status',
      lastPrintDate: 'lastPrintDate',
      media: 'logo.image',
    },
    prepare({title, foundingDate, status, lastPrintDate, media}) {
      const foundingYear = foundingDate ? new Date(foundingDate).getFullYear() : '';
      let publicationStatusText = '';

      if (status === 'inPrint') {
        publicationStatusText = `${foundingYear} - Present (In Print)`;
      } else if (status === 'digitalOnly') {
        publicationStatusText = `${foundingYear} - Present (Digital Only)`;
      } else if (status === 'defunct') {
        const lastYear = lastPrintDate ? new Date(lastPrintDate).getFullYear() : 'N/A';
        publicationStatusText = `${foundingYear} - ${lastYear} (Defunct)`;
      } else {
        publicationStatusText = 'Status Unknown';
      }

      return {
        title: title,
        subtitle: publicationStatusText,
        media: media || BookIcon,
      };
    },
  },
});
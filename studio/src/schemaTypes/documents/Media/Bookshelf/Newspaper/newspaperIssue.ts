import {defineField, defineType} from 'sanity'
import {CalendarIcon} from '@sanity/icons'

export const newspaperIssue = defineType({
  name: 'newspaperIssue',
  title: 'Newspaper Issue',
  type: 'document',
  icon: CalendarIcon, // Added an icon for better UI

  fields: [
    defineField({
      name: 'newspaper',
      title: 'Published By Newspaper',
      type: 'reference',
      to: [{type: 'newspaper'}],
      description: 'The newspaper that published this issue.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'issueDate',
      title: 'Issue Date',
      type: 'date',
      description: 'The specific date of this newspaper issue.',
      validation: (rule) => rule.required(),
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
    defineField({
      name: 'issueNumber',
      title: 'Issue Number',
      type: 'number',
      description: 'The sequential issue number (if applicable).',
      validation: (rule) => rule.integer().min(1),
    }),
    defineField({
      name: 'volumeNumber',
      title: 'Volume Number',
      type: 'number',
      description: 'The volume number (if applicable).',
      validation: (rule) => rule.integer().min(1),
    }),
    defineField({
      name: 'frontPageImage',
      title: 'Front Page Image',
      type: 'customImage', // Assuming 'customImage' is a defined type
      description: 'An image of the newspaper\'s front page for this issue.',
    }),
    defineField({
      name: 'newspaperHeadlines', // This will contain the headlines for THIS specific issue
      title: 'Headlines for this Issue',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'newspaperHeadline'}]}], // References the new 'newspaperHeadline' schema
      description: 'The main headlines featured in this specific issue.',
    }),
    defineField({
      name: 'articles',
      title: 'Articles in this Issue',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'newspaperArticle'}]}],
      description: 'All articles published within this newspaper issue.',
    }),
  ],
  preview: {
    select: {
      newspaperTitle: 'newspaper.title',
      issueDate: 'issueDate',
      issueNumber: 'issueNumber',
      volumeNumber: 'volumeNumber',
      media: 'frontPageImage.image',
    },
    prepare({newspaperTitle, issueDate, issueNumber, volumeNumber, media}) {
      const date = issueDate ? new Date(issueDate).toLocaleDateString() : '';
      const subtitleParts = [];
      if (issueNumber) subtitleParts.push(`Issue #${issueNumber}`);
      if (volumeNumber) subtitleParts.push(`Vol. ${volumeNumber}`);
      subtitleParts.push(date);

      return {
        title: `${newspaperTitle ? `${newspaperTitle} - ` : ''}Issue ${date}`,
        subtitle: subtitleParts.filter(Boolean).join(' | '),
        media: media || CalendarIcon,
      };
    },
  },
});
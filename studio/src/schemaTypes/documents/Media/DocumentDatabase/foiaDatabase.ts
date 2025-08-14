import { defineField, defineType } from 'sanity';
import { FolderIcon } from '@sanity/icons';

// This schema is now a singleton, meaning only one instance of it will exist.
export default defineType({
  name: 'foiaDatabase',
  title: 'FOIA Reading Room',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Database Name',
      type: 'string',
      initialValue: 'Main FOIA Database',
      readOnly: true, // Making this readOnly to enforce it as a singleton.
      description: 'The name of this single, centralized document database.',
      // We don't need a unique validator on a singleton.
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'A brief summary of the purpose and contents of the entire FOIA Reading Room.',
    }),
    defineField({
      name: 'documents',
      title: 'Documents in this Database',
      description: 'All FOIA documents that belong to this centralized database.',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'foiaDocument' }],
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      description: 'Keywords to help categorize the entire database.',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'dateCreated',
      title: 'Date Created',
      description: 'The date this database was officially created.',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        calendarTodayLabel: 'Today',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'dateCreated',
      documents: 'documents.length',
    },
    prepare({ title, subtitle, documents }) {
      return {
        title,
        subtitle: subtitle ? `Created: ${new Date(subtitle).toLocaleDateString()} | Documents: ${documents || 0}` : `Documents: ${documents || 0}`,
      };
    },
  },
});
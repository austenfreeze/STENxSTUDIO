import {defineType, defineField} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const customFile = defineType({
  name: 'customFile',
  title: 'File',
  type: 'object',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Display Title',
      type: 'string',
      description: 'A user-friendly title for the file (e.g., "Chapter 1 PDF").',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        // --- THIS IS THE FIX ---
        // Use a function to specify the source path relative to the current object.
        source: (doc, {parent}) => parent && parent.title,
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'localFilePath',
      title: 'Local File Path',
      type: 'string',
    }),
    defineField({
      name: 'file',
      title: 'File Upload',
      type: 'file',
      description: 'Upload the actual file here (e.g., a PDF, EPUB, or ZIP).',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      fileName: 'file.asset.originalFilename',
    },
    prepare({title, fileName}) {
      return {
        title: title || 'Untitled File',
        subtitle: fileName,
      }
    },
  },
})
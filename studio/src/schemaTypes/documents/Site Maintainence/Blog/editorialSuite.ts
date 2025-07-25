import {defineField, defineType} from 'sanity'
import {
  ComposeIcon,
  BookIcon,
  ClipboardIcon,
  DocumentsIcon,
  ThLargeIcon,
} from '@sanity/icons'
import {richTextContent} from '../objects/richTextContent'; // Import richTextContent

// --- 1. Multimedia Article ---
// The primary format for rich, long-form content.
export const multimediaArticle = defineType({
  name: 'multimediaArticle',
  title: 'Multimedia Article',
  type: 'document',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'admin'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
    }),
    // It uses our new, supercharged rich text editor
    defineField({
      name: 'content',
      title: 'Content',
      type: 'richTextContent', // Changed from 'editorialContent'
    }),
  ],
})

// --- 2. Editorial Thread ---
// For "string-of-thought" style content.
export const editorialThread = defineType({
  name: 'editorialThread',
  title: 'Editorial Thread',
  type: 'document',
  icon: ThLargeIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title / Topic',
      type: 'string',
      description: 'A title for organizing the thread in the studio.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{type: 'admin'}],
    }),
    // A thread is an array of smaller content blocks
    defineField({
      name: 'threadItems',
      title: 'Thread Items',
      type: 'array',
      of: [
        {type: 'block'}, // Simple text
        {type: 'customImage'}, // An image
        {type: 'pullQuote'}, // A quote
        {type: 'researchCitation'}, // A piece of research
        // You might consider adding other richTextContent members here if needed
      ],
    }),
  ],
})

// --- 3. Research Element ---
// The atomic unit of your knowledge graph.
export const researchElement = defineType({
  name: 'researchElement',
  title: 'Research Element',
  type: 'document',
  icon: ClipboardIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'A concise summary of the research point (e.g., "Global Smartphone Shipments Q2 2025").',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'source',
      title: 'Original Source',
      type: 'reference',
      // A source can be a person, a book, a news org, etc.
      to: [{type: 'source'}, {type: 'person'}, {type: 'book'}, {type: 'newsOrganization'}],
    }),
    defineField({
      name: 'sourceUrl',
      title: 'Source URL',
      type: 'url',
    }),
    defineField({
      name: 'summary',
      title: 'Summary / Key Finding',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
  ],
})

// --- 4. Notebook Entry ---
// Your private, versatile workspace.
export const notebookEntry = defineType({
  name: 'notebookEntry',
  title: 'Notebook Entry',
  type: 'document',
  icon: BookIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    // Use a 'type' field to categorize entries
    defineField({
      name: 'entryType',
      title: 'Entry Type',
      type: 'string',
      options: {
        list: [
          {title: 'Private Musing', value: 'musing'},
          {title: 'Task List', value: 'task'},
          {title: 'Draft', value: 'draft'},
          {title: 'Documentation', value: 'docs'},
        ],
        layout: 'radio',
      },
      initialValue: 'musing',
    }),
    // The content can be our rich editor for drafts, or simple text for notes
    defineField({
      name: 'body',
      title: 'Body',
      type: 'richTextContent', // Changed from 'editorialContent'
    }),
    // Link to a project for task tracking
    defineField({
      name: 'relatedProject',
      title: 'Related Project',
      type: 'reference',
      to: [{type: 'project'}],
      hidden: ({document}) => document?.entryType !== 'task',
    }),
  ],
})

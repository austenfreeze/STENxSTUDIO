// schemas/magazinePage.ts
import {defineField, defineType} from 'sanity'
import {DocumentIcon} from '@sanity/icons'
// Assuming commonCategorizationFields is defined and imported correctly
import {commonCategorizationFields} from './commonFields' // Ensure this path is correct

// Import the new consolidated richTextContent schema
import {richTextContent} from '../objects/richTextContent' // Adjust this path based on where richTextContent.ts is located

export const magazinePage = defineType({
  name: 'magazinePage',
  title: 'Magazine Page',
  type: 'document',
  icon: DocumentIcon,
  // Refined fieldset for better organization
  fieldsets: [{name: 'parent', title: 'Content & Hierarchy'}],
  fields: [
    defineField({
      name: 'issue',
      title: 'Magazine Issue',
      type: 'reference',
      to: [{type: 'magazineIssue'}],
      validation: (rule) => rule.required(),
      description: 'The specific issue this page belongs to.',
      fieldset: 'parent',
    }),
    defineField({
      name: 'articlesOnPage',
      title: 'Articles on This Page',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'magazineArticle'}]}],
      description: 'Tag any articles that appear on this page.',
      fieldset: 'parent',
    }),
    defineField({
      name: 'pageNumbers',
      title: 'Page Numbers',
      type: 'array',
      of: [
        {
          type: 'number',
          validation: (rule) => rule.required().integer().positive(),
        },
      ],
      description: 'Add one or more page numbers that this entry represents.',
      validation: (rule) => rule.unique().min(1),
    }),
    defineField({
      name: 'pageImage',
      title: 'Page Image',
      type: 'customImage', // Assuming 'customImage' is a defined object type
      description: 'A high-resolution scan of the entire page.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'textBlock',
      title: 'Text Blocks',
      type: 'richTextContent', // <--- Changed to use the consolidated richTextContent schema
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
    defineField({
      name: 'pageBuilder',
      title: 'Page builder',
      type: 'array',
      of: [{type: 'callToAction'}, {type: 'infoSection'}],
    }),
  ],
  // --- ENHANCED PREVIEW ---
  preview: {
    select: {
      // Fetch the title from within the pageImage object
      pageTitle: 'pageImage.image.title',
      pageNumbers: 'pageNumbers',
      // Fetch the publication date and magazine title from the referenced issue
      publicationDate: 'issue.publicationDate',
      magazineTitle: 'issue.magazine.title',
      media: 'pageImage.image',
    },
    prepare({pageTitle, pageNumbers, publicationDate, magazineTitle, media}) {
      // --- DYNAMIC PAGE RANGE LOGIC ---
      let pageRange = ''
      if (pageNumbers && pageNumbers.length > 0) {
        // Sort numbers to ensure min/max are correct
        const sortedPages = [...pageNumbers].sort((a, b) => a - b)
        if (sortedPages.length === 1) {
          pageRange = `Page ${sortedPages[0]}`
        } else {
          const first = sortedPages[0]
          const last = sortedPages[sortedPages.length - 1]
          pageRange = `Pages ${first}-${last}`
        }
      }

      // --- DYNAMIC TITLE LOGIC ---
      // Combine the image title and the page range, e.g., "Soft Ions | Pages 96-98"
      const title = [pageTitle, pageRange].filter(Boolean).join(' | ') || 'New Page'

      // --- DYNAMIC SUBTITLE LOGIC ---
      // Format the date like "Oct 1981"
      const formattedDate = publicationDate
        ? new Date(publicationDate.replace(/-/g, '/')).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
          })
        : ''

      // Combine the formatted date and the magazine title, e.g., "(Oct 1981 | OMNI Magazine)"
      const subtitleText = [formattedDate, magazineTitle].filter(Boolean).join(' | ')
      const subtitle = subtitleText ? `(${subtitleText})` : 'No issue specified'

      return {
        title: title,
        subtitle: subtitle,
        media: media || DocumentIcon,
      }
    },
  },
});
// newspaperArticle.ts
import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const newspaperArticle = defineType({
  name: 'newspaperArticle',
  title: 'Newspaper Article',
  type: 'document',
  icon: DocumentTextIcon, // Added an icon for better UI
  fields: [
    defineField({
      name: 'title',
      title: 'Article Title',
      type: 'string',
      validation: (rule) => rule.required(),
      description: 'The main title of the article (e.g., "GLOWING AURAS AND BLACK MONEY")',
    }),
    defineField({
      name: 'subtitle',
      title: 'Article Subtitle',
      type: 'string',
      description: 'A secondary title or brief descriptive phrase (e.g., "THE PENTAGONS SECRET UFO PROGRAM")',
    }),
    defineField({
      name: 'newspaper',
      title: 'Publishing Newspaper',
      type: 'reference',
      to: [{type: 'newspaper'}],
      description: 'The newspaper in which this article was published.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publicationDate',
      title: 'Publication Date',
      type: 'date',
      description: 'The specific date the article was published.',
      validation: (rule) => rule.required(),
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
    defineField({
      name: 'author',
      title: 'Author(s)',
      type: 'array', // Changed to array for multiple authors
      of: [{type: 'reference', to: [{type: 'person'}]}],
      description: 'The author(s) of the article.',
    }),
    defineField({
      name: 'articleCover',
      title: 'Article Cover Image',
      type: 'customImage', // Assuming 'customImage' is a defined type
      description: 'The primary image associated with the article, often displayed as a lead image.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Article Content',
      type: 'array',
      of: [
        {type: 'block'},
        {type: 'customImage'}, // Assuming 'customImage' is a defined type
        {type: 'code', title: 'Code Block'}, // Example of adding more block types
        // Add more custom block types here as needed (e.g., 'embed', 'blockquote')
      ],
      description: 'The main body content of the article.',
    }),
    defineField({
      name: 'mediaGallery',
      title: 'Media Galleries',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'mediaGallery'}]}],
      description: 'Media Content Contained Within The Article.',
    }),

    defineField({
      name: 'referencedPeople',
      title: 'Referenced People',
      type: 'referencedPeople', // This is correct, references the object type
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title', // Correctly sources from 'title'
        maxLength: 96,
        // Ensure uniqueness across all articles
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
      description: 'A unique identifier for the article in URLs.',
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'link', // This is correctly referencing your custom 'link' object type
      description: 'External Copy Of The Article.',
      // The preview for 'link' will handle how it looks. No direct fix needed here for [object Object] as it is standard behavior for an object type.
      // Users will click on it to edit its internal fields (title, url).
      // If you want it to display the URL or title *directly* in the form, you'd need a custom input component.
      // For now, the existing 'link' preview (title: displayTitle, subtitle: url) will show correctly when referenced.
    }),
    defineField({
      name: 'digitalVersion',
      title: 'Digital Version',
      type: 'array',
      of: [{type: 'customFile'}], // Assuming 'customFile' is a custom type
      description: 'Digital version of the article document.',
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Articles',
      type: 'array',
      of: [{type: 'reference', to: [{type: 'newspaperArticle'}]}],
      description: 'Links to other relevant articles.',
    }),
  ],
  // This is the correct preview for newspaperArticle
  preview: {
    select: {
      title: 'title', // Correctly selects the article's title
      subtitle: 'subtitle', // Correctly selects the article's subtitle
      authorFirstName: 'author.0.firstName',
      authorLastName: 'author.0.lastName',
      newspaperTitle: 'newspaper.title',
      publicationDate: 'publicationDate',
      media: 'articleCover.image',
    },
    prepare({title, subtitle, authorFirstName, authorLastName, newspaperTitle, publicationDate, media}) {
      const author = [authorFirstName, authorLastName].filter(Boolean).join(' ');
      const date = publicationDate ? new Date(publicationDate).toLocaleDateString() : '';

      const displaySubtitle = subtitle || [author, newspaperTitle, date].filter(Boolean).join(' | ');

      return {
        title: title || 'Untitled Article', // Fallback for title
        subtitle: displaySubtitle,
        media: media || DocumentTextIcon,
      };
    },
  },
});
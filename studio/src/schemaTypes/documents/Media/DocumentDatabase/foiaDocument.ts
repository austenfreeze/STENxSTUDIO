import { defineField, defineType } from 'sanity';
import { DocumentIcon } from '@sanity/icons';

export default defineType({
  name: 'foiaDocument',
  title: 'Document',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      // Removed the custom validation for uniqueness
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        // Removed the isUnique property
      },
      validation: (Rule) => Rule.required(),
    }),
defineField({
  name: 'author',
  title: 'Author',
  type: 'reference',
  to: [
    { type: 'admin' },
    { type: 'youtubeChannel' },
  ],
}),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'array',
      of: [{ type: 'block' }],
    }),
 defineField({
      name: 'quotes',
      title: 'Quotes',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'quote' }],
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      },
    }),

    defineField({
      name: 'localDocument',
      title: 'Local Document',
      type: 'file',
    }),
    // The old datePublished field has been replaced with this new object type
    defineField({
      name: 'publicationDate',
      title: 'Publication Date',
      description: 'The date this document was created or published. This is a complex field to handle varying data accuracy.',
      type: 'object',
      fields: [
        defineField({
          name: 'date',
          title: 'Precise Date',
          type: 'date',
          description: 'Use this field if you have a known, precise date.'
        }),
        defineField({
          name: 'estimatedDate',
          title: 'Estimated Date',
          type: 'string',
          description: 'Use this field for estimated dates (e.g., "2005", "May 2005").'
        }),
        defineField({
          name: 'isEstimated',
          title: 'This date is an estimate',
          type: 'boolean',
          initialValue: false,
          description: 'Check this box if the date provided is an estimate.'
        }),
        defineField({
          name: 'notes',
          title: 'Notes',
   	  type: 'array',
	of: [{type: 'text',}],
          description: 'Add a description of how this date was recovered or why it is an estimate.'
        }),
      ],
    }),
    // The attachedMedia field is now configured for direct drag-and-drop.
    defineField({
      name: 'attachedMedia',
      title: 'Attached Media',
      type: 'array',
      description: 'Drag and drop images here. You can add a caption to each one.',
      of: [
        {
          type: 'customImage', // Direct image type allows for drag-and-drop and a "Create" button.
          },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'publicationDate',
      media: 'documentFile',
    },
    prepare({ title, subtitle, media }) {
      let sub;
      if (subtitle?.date) {
        sub = `Published: ${new Date(subtitle.date).toLocaleDateString()}`;
      } else if (subtitle?.estimatedDate) {
        sub = `Published (approx.): ${subtitle.estimatedDate}`;
      } else {
        sub = 'Publication date unknown';
      }
      return {
        title,
        subtitle: sub,
        media,
      };
    },
  },
});

// person.ts
import {UserIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const person = defineType({
  name: 'person',
  title: 'Person',
  icon: UserIcon,
  type: 'document',
  fieldsets: [
    {
      name: 'fullName',
      title: 'Full Name',
      options: {columns: 3},
    },
  ],
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (rule) => rule.required(),
      fieldset: 'fullName',
    }),
    defineField({
      name: 'middleName',
      title: 'Middle Name',
      type: 'string',
      fieldset: 'fullName',
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (rule) => rule.required(),
      fieldset: 'fullName',
    }),
    defineField({
      name: 'professionalTitles',
      title: 'Professional Titles',
      type: 'array',
      of: [{type: 'string'}],
      description: 'List of professional titles (e.g., "Congresswoman", "Author").',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'picture',
      title: 'Profile Picture',
      type: 'image',
      description: 'Upload a primary image for this person.',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) =>
            rule.custom((alt, context) => {
              if ((context.document?.picture as any)?.asset?._ref && !alt) {
                return 'Required'
              }
              return true
            }),
        }),
      ],
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
    }),
    defineField({
      name: 'mediaGalleryReference',
      title: 'Related Media Gallery',
      type: 'reference',
      description: 'Select a media gallery to display on this person\'s page. The first image from this gallery can be used as a fallback if no profile picture is set.',
      to: [{type: 'mediaGallery'}],
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: (doc) => `${doc.firstName ?? ''}-${doc.lastName ?? ''}`,
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'relatedContent',
      title: 'Related Content',
      type: 'array',
      description: 'Select other documents to link to.',
      of: [
        {
          type: 'reference',
          to: [{type: 'mediaGallery'}, {type: 'post'}],
        },
      ],
    }),
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      professionalTitles: 'professionalTitles',
      media: 'picture',
      mediaGalleryImage: 'mediaGalleryReference.images[0].image.asset', // Select the asset of the first image from the referenced gallery
      mediaGalleryVideo: 'mediaGalleryReference.images[0].thumbnailImage.asset', // Select the thumbnail asset of the first video from the referenced gallery
    },
    prepare(selection) {
      const {firstName, lastName, professionalTitles, media, mediaGalleryImage, mediaGalleryVideo} = selection;
      const title = `${firstName || ''} ${lastName || ''}`.trim();
      
      let subtitle = 'Person';
      if (professionalTitles && professionalTitles.length > 0) {
        subtitle = professionalTitles.join(', ');
      }

      // Prioritize the direct profile picture, then the image from the gallery, then the video thumbnail, and finally the default icon.
      const mediaToDisplay = media || mediaGalleryImage || mediaGalleryVideo || UserIcon;

      return {
        title: title || 'Untitled Person',
        subtitle: subtitle,
        media: mediaToDisplay,
      };
    },
  },
})
// mediaGallery.ts
import {defineField, defineType} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export const mediaGallery = defineType({
  name: 'mediaGallery',
  title: 'Media Gallery',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'galleryTitle',
      title: 'Title',
      type: 'string',
      description: 'A descriptive title for the gallery (e.g., "Chapter 5 Illustrations").',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Optional: A brief description of what this gallery contains.',
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'customImage'}, {type: 'videoContent'}],
      options: {
        layout: 'grid',
      },
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
      type: 'relatedContent',
    }),
  ],
  preview: {
    select: {
      title: 'galleryTitle',
      description: 'description',
      // CORRECTED: Select the actual image/thumbnail asset directly from the first item
      // This is the key change to make images show up.
      mediaCustomImage: 'images[0].image.asset', // For customImage type
      mediaVideoContent: 'images[0].thumbnailImage.asset', // For videoContent type
      imagesArray: 'images', // Keep this to get the total count
    },
    prepare({title, description, mediaCustomImage, mediaVideoContent, imagesArray}) {
      const imageCount = imagesArray ? imagesArray.length : 0;
      const countText = imageCount === 1 ? '1 Item' : `${imageCount} Items`;
      const subtitle = [description, countText].filter(Boolean).join(' | ');

      // Prioritize customImage media, then videoContent media, then default icon
      let mediaToDisplay = mediaCustomImage || mediaVideoContent || ImagesIcon;

      return {
        title: title || 'Untitled Gallery',
        subtitle: subtitle,
        media: mediaToDisplay,
      };
    },
  },
});
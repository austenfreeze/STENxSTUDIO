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
      // FIX 1: Removed the trailing comma after the array definition
      of: [{type: 'customImage'}, {type:'videoContent'}],
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
      type: 'relatedContent'
    }), 
  ], 
  preview: {
    select: {
      // You are selecting the 'galleryTitle' field and giving it the name 'title'
      title: 'galleryTitle',
      description: 'description',
      images: 'images',
    },
    // The argument here must match the name from 'select' ('title'), not the original field name.
    prepare({title, description, images}) {
      const imageCount = images ? images.length : 0
      const countText = imageCount === 1 ? '1 Image' : `${imageCount} Images`
      const subtitle = [description, countText].filter(Boolean).join(' | ')
      // The media logic here seems to assume customImage has an 'image' field, which is fine.
      const media = images && images.length > 0 ? images[0] : ImagesIcon

      return {
        // This line now works correctly because 'title' is defined.
        title: title || 'Untitled Gallery',
        subtitle: subtitle,
        media: media,
      }
    },
  },
})
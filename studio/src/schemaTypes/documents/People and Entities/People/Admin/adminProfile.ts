// sanity-studio/src/schemaTypes/documents/Site Maintainence/adminProfile.ts
import { UsersIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

export const adminProfile = defineType({
  name: 'adminProfile', // Keep this as 'admin'
  title: 'Studio Admin Profile',
  type: 'document',

  fields: [

    defineField({
      name: 'admin',
      title: 'Admin Profile',
      type: 'reference',
	to: [{type: 'admin'}],
      validation: (rule) => rule.required(),
    }),

defineField({
  name: 'userImageGallery',
  title: 'User Image Gallery',
  type: 'array',
  of: [
    { type: 'customImage' },
    { type: 'mediaGallery' }, // Added mediaGallery as an option
  ],
}),
],
})
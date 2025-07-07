// sanity-studio/src/schemaTypes/documents/Site Maintainence/admin.ts
import { UsersIcon } from '@sanity/icons'; // Assuming UsersIcon is imported
import { defineField, defineType } from 'sanity';

/*
 * This schema distinguishes internal authors from the public-facing 'person' documents.
 */
export const admin = defineType({
  name: 'admin', // Keep this as 'admin'
  title: 'Studio User',
  icon: UsersIcon,
  type: 'document',

  fieldsets: [
    {
      name: 'fullName',
      title: 'Full Name',
      options: { columns: 3 },
    },
    // No explicit fieldset for NextAuth fields; they can be top-level
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
      name: 'picture',
      title: 'Picture',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) =>
            rule.custom((alt, context) => {
              if ((context.document?.picture as any)?.asset?._ref && !alt) {
                return 'Required';
              }
              return true;
            }),
        }),
      ],
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      validation: (rule) => rule.required(),
    }),
    // --- START: FIELDS REQUIRED BY NEXTAUTH.JS ---
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(), // Ensure email format
      // Unique constraint to prevent duplicate emails from providers
      // Note: You might need a custom validation rule if you allow multiple logins per email.
      // For NextAuth.js, it usually ensures this uniquely by `email`.
      // Also consider if you want to allow changing this email.
    }),
    defineField({
      name: 'emailVerified',
      title: 'Email Verified',
      type: 'datetime',
      description: 'Timestamp for email verification (used by NextAuth for email providers).',
    }),
    defineField({
      name: 'image', // NextAuth uses 'image' for profile picture URL
      title: 'Profile Image URL', // A more descriptive title
      type: 'url',
      description: 'URL to the user\'s profile picture (e.g., from OAuth provider).',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
      options: {
        list: [
          { title: 'Admin', value: 'admin' },
          { title: 'Editor', value: 'editor' },
          { title: 'Contributor', value: 'contributor' },
          { title: 'Public User', value: 'user' }, // A role for potential public users
        ],
        layout: 'dropdown',
      },
      initialValue: 'user', // Default role for new users signing up via OAuth
      validation: (Rule) => Rule.required(),
    }),
    // --- END: FIELDS REQUIRED BY NEXTAUTH.JS ---
  ],

  preview: {
    select: {
      firstName: 'firstName',
      middleName: 'middleName',
      lastName: 'lastName',
      email: 'email', // Add email to preview
      media: 'picture', // Use the 'picture' field for the media
    },
    prepare({ firstName, middleName, lastName, email, media }) {
      const title = [firstName, middleName, lastName].filter(Boolean).join(' ');
      return {
        title: title || 'Untitled User',
        subtitle: email, // Display email as subtitle
        media,
      };
    },
  },
});
// sanity-studio/src/schemaTypes/documents/Site Maintainence/account.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'account',
  title: 'Account',
  type: 'document',
  fields: [
    defineField({
      name: 'providerType',
      title: 'Provider Type',
      type: 'string',
    }),
    defineField({
      name: 'providerId',
      title: 'Provider ID',
      type: 'string',
    }),
    defineField({
      name: 'providerAccountId',
      title: 'Provider Account ID',
      type: 'string',
    }),
    defineField({
      name: 'refreshToken',
      title: 'Refresh Token',
      type: 'string',
    }),
    defineField({
      name: 'accessToken',
      title: 'Access Token',
      type: 'string',
    }),
    defineField({
      name: 'accessTokenExpires',
      title: 'Access Token Expires',
      type: 'datetime',
    }),
    defineField({
      name: 'admin', // <-- CHANGED from 'user' to 'admin'
      title: 'Admin', // <-- CHANGED from 'User' to 'Admin'
      type: 'reference',
      to: { type: 'admin' }, // <-- CHANGED from 'user' to 'admin'
      weak: true, // Optional: Makes this a weak reference, so deleting the referenced user doesn't delete the account.
    }),
  ],
  preview: {
    select: {
      title: 'providerId',
      subtitle: 'providerAccountId',
      adminName: 'admin.name', // Assuming 'admin' will have a 'name' field in its preview
    },
    prepare({ title, subtitle, adminName }) {
      return {
        title: title || 'Unnamed Account',
        subtitle: `${subtitle}${adminName ? ` (${adminName})` : ''}`,
      };
    },
  },
});
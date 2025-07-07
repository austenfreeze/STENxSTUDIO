// sanity-studio/src/schemaTypes/documents/Site Maintainence/session.ts
import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'session',
  title: 'Session',
  type: 'document',
  fields: [
    defineField({
      name: 'sessionToken',
      title: 'Session Token',
      type: 'string',
    }),
    defineField({
      name: 'expires',
      title: 'Expires',
      type: 'datetime',
    }),
    defineField({
      name: 'admin', // <-- CHANGED from 'user' to 'admin'
      title: 'Admin', // <-- CHANGED from 'User' to 'Admin'
      type: 'reference',
      to: { type: 'admin' }, // <-- CHANGED from 'user' to 'admin'
      weak: true, // Optional: Makes this a weak reference
    }),
  ],
  preview: {
    select: {
      title: 'sessionToken',
      subtitle: 'admin.name', // Assuming 'admin' will have a 'name' field in its preview
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Unnamed Session',
        subtitle: subtitle ? `User: ${subtitle}` : 'No User',
      };
    },
  },
});
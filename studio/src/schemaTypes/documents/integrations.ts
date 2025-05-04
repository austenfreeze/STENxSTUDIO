import {defineType, defineField} from 'sanity'
import {CogIcon} from '@sanity/icons'

export const integrations = defineType({
  name: 'integrations',
  title: 'Site Integrations',
  type: 'document',
  __experimental_actions: ['update', 'publish'], // disable "create" & "delete"
  icon: CogIcon,
  fieldsets: [
    {
      name: 'overview',
      title: 'Project Overview',
      options: {collapsible: true, collapsed: false},
    },
    {
      name: 'integrations',
      title: 'Platform Integrations',
      options: {collapsible: true, collapsed: false},
    },
  ],
  fields: [
    // Overview Section
    defineField({
      name: 'projectName',
      title: 'Project Name',
      type: 'string',
      fieldset: 'overview',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'projectSlug',
      title: 'Project Slug',
      type: 'slug',
      options: {source: 'projectName', maxLength: 96},
      fieldset: 'overview',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'primaryDomain',
      title: 'Primary Domain',
      type: 'url',
      description: 'Public domain for the deployed frontend (e.g., https://xsten.co)',
      fieldset: 'overview',
      validation: Rule => Rule.required().uri({scheme: ['https']}),
    }),
    defineField({
      name: 'projectLead',
      title: 'Project Lead or Maintainer',
      type: 'string',
      fieldset: 'overview',
    }),
    defineField({
      name: 'internalNotes',
      title: 'Internal Notes',
      type: 'blockContent',
      fieldset: 'overview',
    }),

    // Integration Refs
    defineField({
      name: 'sanity',
      title: 'Sanity',
      type: 'reference',
      to: [{type: 'sanityIntegration'}],
      fieldset: 'integrations',
      weak: true,
    }),
    defineField({
      name: 'vercel',
      title: 'Vercel',
      type: 'reference',
      to: [{type: 'vercelIntegration'}],
      fieldset: 'integrations',
      weak: true,
    }),
defineField({
  name: 'Github', // <-- Keep this capitalized to match existing documents
  title: 'GitHub',
  type: 'reference',
  to: [{type: 'githubIntegration'}],
  fieldset: 'integrations',
  weak: true,
}),

  ],
  preview: {
    select: {
      title: 'projectName',
      subtitle: 'primaryDomain',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Unnamed Project',
        subtitle: subtitle || 'No domain set',
        media: CogIcon,
      }
    },
  },
})

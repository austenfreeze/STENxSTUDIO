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
      name: 'studioDomain',
      title: 'Studio Domain',
      type: 'url',
      description: 'Personal domain for the deployed Sanity Studio',
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
      name: 'projectOutline',
      title: 'Project Outline',
      type: 'blockContent',
      fieldset: 'overview',
    }),

    defineField({
      name: 'projectGoals',
      title: 'Project Goals',
      type: 'array',
         of: [{type: 'goal', }],
      fieldset: 'overview',
    }),

    defineField({
      name: 'completedTask',
      title: 'Completed Tasks',
      type: 'array',
         of: [{type: 'completedTask', }],
      fieldset: 'overview',
    }),


    // Integration Refs
    defineField({
      name: 'sanity',
      title: 'Sanity.io Integration',
      type: 'reference',
      to: [{type: 'sanityIntegration'}],
      fieldset: 'integrations',
      weak: true,
    }),
    defineField({
      name: 'vercel',
      title: 'Vercel Integration',
      type: 'reference',
      to: [{type: 'vercelIntegration'}],
      fieldset: 'integrations',
      weak: true,
    }),
defineField({
  name: 'Github',
  title: 'GitHub Integration',
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

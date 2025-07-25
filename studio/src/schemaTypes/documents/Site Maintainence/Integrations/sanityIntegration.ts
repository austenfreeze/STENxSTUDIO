import {defineType, defineField} from 'sanity'
import {RobotIcon} from '@sanity/icons'

export const sanityIntegration = defineType({
  name: 'sanityIntegration',
  title: 'Sanity Integration',
  type: 'document',
  icon: RobotIcon,
  fieldsets: [
    {name: 'core', title: 'Core Info', options: {collapsible: true, collapsed: false}},
    {name: 'environment', title: 'Environment / API Access', options: {collapsible: true, collapsed: false}},
    {name: 'versioning', title: 'Studio Versioning & Deployment', options: {collapsible: true, collapsed: true}},
  ],
  fields: [
    defineField({
      name: 'projectId',
      title: 'Sanity Project ID',
      type: 'string',
      description: 'Matches SANITY_STUDIO_PROJECT_ID / NEXT_PUBLIC_SANITY_PROJECT_ID',
      validation: Rule => Rule.required().min(8).max(32),
      fieldset: 'core',
    }),
    defineField({
      name: 'dataset',
      title: 'Dataset Name',
      type: 'string',
      description: 'Matches SANITY_STUDIO_DATASET / NEXT_PUBLIC_SANITY_DATASET',
      validation: Rule => Rule.required().min(2).max(32),
      fieldset: 'core',
    }),
    defineField({
      name: 'studioHostname',
      title: 'Studio Hostname',
      type: 'string',
      description: 'Subdomain only (e.g., `stenxstudio`). Used in https://<host>.sanity.studio',
      validation: Rule => Rule.required().min(3),
      fieldset: 'environment',
    }),
    defineField({
      name: 'studioUrl',
      title: 'Deployed Studio URL',
      type: 'url',
      description: 'e.g., https://stenxstudio.sanity.studio',
      validation: Rule => Rule.required().uri({scheme: ['https']}),
      fieldset: 'environment',
    }),
    defineField({
      name: 'previewUrl',
      title: 'Preview Origin URL',
      type: 'url',
      description: 'e.g., http://localhost:3000 (dev) or https://your-site.vercel.app (prod)',
      validation: Rule => Rule.required().uri({scheme: ['http', 'https']}),
      fieldset: 'environment',
    }),
    defineField({
      name: 'dashboardUrl',
      title: 'Sanity Studio Dashboard',
      type: 'url',
      description: "URL Link to the 'Sanity Studio Dashboard'; introduced in the Sanity Spring 2025 Update.",
      validation: Rule => Rule.required().uri({scheme: ['http', 'https']}),
      fieldset: 'environment',
    }),
    defineField({
      name: 'readToken',
      title: 'API Read Token (Redacted)',
      type: 'string',
      description: 'Store only a safe or truncated version (e.g., first or last 6 characters)',
      validation: Rule => Rule.required().max(80),
      fieldset: 'environment',
    }),
    defineField({
      name: 'studioVersion',
      title: 'Sanity Studio Version',
      type: 'string',
      description: 'Matches "sanity" in studio/package.json, e.g., 3.77.0',
      validation: Rule => Rule.regex(/^\d+\.\d+\.\d+$/).warning('Use format: x.y.z'),
      fieldset: 'versioning',
    }),
    defineField({
      name: 'clientVersion',
      title: 'Sanity Client Version',
      type: 'string',
      description: 'Matches "@sanity/client" in frontend package.json (if used)',
      validation: Rule => Rule.optional().regex(/^\d+\.\d+\.\d+$/).warning('Use format: x.y.z'),
      fieldset: 'versioning',
    }),
defineField({
  name: 'deploymentLog',
  title: 'Deployment Log',
  description: 'Track studio deployments with timestamps and change summaries.',
  type: 'array',
  fieldset: 'versioning',
  of: [
    {
      type: 'object',
      name: 'deploymentEntry',
      fields: [
        defineField({
          name: 'deployedAt',
          title: 'Deployment Date',
          type: 'datetime',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'summary',
          title: 'Changes',
          type: 'text',
          rows: 3,
          validation: Rule => Rule.required().max(300).warning('Keep summaries brief.'),
        }),
      ],
      preview: {
        select: {
          title: 'summary',
          subtitle: 'deployedAt',
        },
        prepare({title, subtitle}) {
          return {
            title: title || 'No summary',
            subtitle: subtitle ? new Date(subtitle).toLocaleString() : 'No date',
          }
        },
      },
    },
  ],
}),
    defineField({
      name: 'notes',
      title: 'Notes / Internal Context',
   type: 'richTextContent',
      description: 'Optional notes about usage, team responsibilities, or updates',
    })
  ],
  preview: {
    select: {
      title: 'projectId',
      subtitle: 'dataset',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Sanity Project',
        subtitle: `Dataset: ${subtitle || 'N/A'}`,
        media: RobotIcon,
      }
    },
  },
})

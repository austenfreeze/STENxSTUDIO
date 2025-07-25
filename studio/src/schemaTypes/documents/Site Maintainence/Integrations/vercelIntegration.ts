import {defineType, defineField} from 'sanity'

export const vercelIntegration = defineType({
  name: 'vercelIntegration',
  title: 'Vercel Integration',
  type: 'document',
  fieldsets: [
    {name: 'core', title: 'Core Info', options: {collapsible: true, collapsed: false}},
    {name: 'deployment', title: 'URLs & Domains', options: {collapsible: true, collapsed: false}},
    {name: 'meta', title: 'Metadata & History', options: {collapsible: true, collapsed: true}},
  ],
  fields: [
    defineField({
      name: 'projectName',
      title: 'Project Name',
      type: 'string',
      description: 'Matches the project name used in the Vercel dashboard.',
      validation: Rule => Rule.required().min(2).max(64),
      fieldset: 'core',
    }),
    defineField({
      name: 'team',
      title: 'Team Name',
      type: 'string',
      description: 'Vercel team or organization owning this project.',
      validation: Rule => Rule.optional().min(2).max(64),
      fieldset: 'core',
    }),
    defineField({
      name: 'deploymentUrl',
      title: 'Production Deployment URL',
      type: 'url',
      description: 'e.g., https://stenxstudio.vercel.app',
      validation: Rule => Rule.required().uri({scheme: ['https']}),
      fieldset: 'deployment',
    }),
    defineField({
      name: 'dashboardUrl',
      title: 'Vercel Project Dashboard URL',
      type: 'url',
      description: 'e.g., https://vercel.com/your-team/your-project',
      validation: Rule => Rule.required().uri({scheme: ['https']}),
      fieldset: 'deployment',
    }),
    defineField({
      name: 'domains',
      title: 'Custom Domains',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Domain(s) mapped to the Vercel project (e.g., stenxstudio.com)',
      validation: Rule => Rule.unique(),
      fieldset: 'deployment',
    }),
    defineField({
      name: 'lastCommit',
      title: 'Last Deploy Commit SHA',
      type: 'string',
      description: 'Git SHA of the most recent production deployment',
      validation: Rule => Rule.length(40).warning('SHA should be exactly 40 characters'),
      fieldset: 'meta',
    }),
    defineField({
      name: 'notes',
      title: 'Notes / Deployment Context',
   type: 'richTextContent',
      description: 'Optional notes about Vercel integration, environment configs, or deployments',
    }),
  ],
  preview: {
    select: {
      title: 'projectName',
      subtitle: 'deploymentUrl',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'Vercel Project',
        subtitle: subtitle || 'No URL assigned',
      }
    },
  },
})

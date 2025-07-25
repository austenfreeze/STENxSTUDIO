import {defineType, defineField} from 'sanity'
import {CodeIcon} from '@sanity/icons'

export const githubIntegration = defineType({
  name: 'githubIntegration',
  title: 'GitHub Integration',
  type: 'document',
  icon: CodeIcon,
  fieldsets: [
    {name: 'core', title: 'Core Repository Info', options: {collapsible: true, collapsed: false}},
    {name: 'deployment', title: 'Deployment Tracking', options: {collapsible: true, collapsed: true}},
    {name: 'settings', title: 'Settings & Metadata', options: {collapsible: true, collapsed: true}},
  ],
  fields: [
    defineField({
      name: 'repositoryUrl',
      title: 'Repository URL',
      type: 'url',
      description: 'Full GitHub repository link (e.g., https://github.com/user/repo)',
      validation: Rule => Rule.required().uri({scheme: ['https']}),
      fieldset: 'core',
    }),
    defineField({
      name: 'owner',
      title: 'Repository Owner',
      type: 'string',
      description: 'GitHub username or organization (e.g., austenfreeze)',
      validation: Rule => Rule.required(),
      fieldset: 'core',
    }),
    defineField({
      name: 'repoName',
      title: 'Repository Name',
      type: 'string',
      description: 'Short repo name (e.g., stenxstudio)',
      validation: Rule => Rule.required(),
      fieldset: 'core',
    }),
    defineField({
      name: 'defaultBranch',
      title: 'Default Branch',
      type: 'string',
      description: 'Usually `main` or `master`',
      validation: Rule => Rule.required(),
      fieldset: 'settings',
    }),
    defineField({
      name: 'lastDeployedCommit',
      title: 'Last Deploy Commit SHA',
      type: 'string',
      description: '40-character Git SHA used in last deployment',
      validation: Rule => Rule.length(40).warning('SHA should be exactly 40 characters'),
      fieldset: 'deployment',
    }),
    defineField({
      name: 'lastDeployedAt',
      title: 'Last Deployment Timestamp',
      type: 'datetime',
      description: 'Time the last commit was deployed to production',
      fieldset: 'deployment',
    }),
    defineField({
      name: 'webhookUrl',
      title: 'Webhook Endpoint (Optional)',
      type: 'url',
      description: 'Used for syncing deployments or Git events (if configured)',
      validation: Rule => Rule.uri({scheme: ['https']}).optional(),
      fieldset: 'settings',
    }),
    defineField({
      name: 'issuesEnabled',
      title: 'Are Issues Enabled?',
      type: 'boolean',
      initialValue: true,
      fieldset: 'settings',
    }),
    defineField({
      name: 'notes',
      title: 'Notes / Repo Context',
      type: 'richTextContent',
      description: 'Optional notes about branching strategy, team roles, or issues',
    }),
  ],
  preview: {
    select: {
      title: 'repoName',
      subtitle: 'repositoryUrl',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'GitHub Repo',
        subtitle: subtitle || 'No URL',
        media: CodeIcon,
      }
    },
  },
})

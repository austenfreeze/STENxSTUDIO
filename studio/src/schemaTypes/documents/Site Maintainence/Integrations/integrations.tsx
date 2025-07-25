// schemas/documents/integrations.ts

import { defineType, defineField } from 'sanity'
import { CogIcon } from '@sanity/icons'
// --- ADDED: Imports for UI components used in the custom preview ---
import { Card, Stack, Text, Flex, Badge } from '@sanity/ui'
import React from 'react'

// --- MOVED: The component should be defined outside the schema definition ---
// This is a custom React component to render a preview in the Sanity Studio
export const IntegrationPreview = (props: {
  projectName?: string
  sanity?: boolean
  vercel?: boolean
  github?: boolean
}) => {
  const { projectName, sanity, vercel, github } = props

  return (
    <Card padding={3}>
      <Stack space={3}>
        <Text weight="semibold">{projectName || 'Unnamed Project'}</Text>
        <Flex gap={2}>
          {sanity && <Badge tone="positive">Sanity</Badge>}
          {vercel && <Badge tone="primary">Vercel</Badge>}
          {github && <Badge tone="default">GitHub</Badge>}
        </Flex>
      </Stack>
    </Card>
  )
}

export const integrations = defineType({
  name: 'integrations',
  title: 'Site Integrations',
  type: 'document',
  icon: CogIcon,
  fieldsets: [
    {
      name: 'overview',
      title: 'Project Overview',
      options: { collapsible: true, collapsed: false },
    },
    {
      name: 'integrations',
      title: 'Platform Integrations',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    // Overview Section
    defineField({
      name: 'projectName',
      title: 'Project Name',
      type: 'string',
      fieldset: 'overview',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'projectSlug',
      title: 'Project Slug',
      type: 'slug',
      options: { source: 'projectName', maxLength: 96 },
      fieldset: 'overview',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'primaryDomain',
      title: 'Primary Domain',
      type: 'url',
      description: 'Public domain for the deployed frontend (e.g., https://xsten.co)',
      fieldset: 'overview',
      validation: (Rule) => Rule.required().uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'studioDomain',
      title: 'Studio Domain',
      type: 'url',
      description: 'Personal domain for the deployed Sanity Studio',
      fieldset: 'overview',
      validation: (Rule) => Rule.required().uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'projectLead',
      title: 'Project Lead or Maintainer',
      type: 'string',
      fieldset: 'overview',
    }),
    defineField({
      name: 'projectGoals',
      title: 'Project Goals',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'goal' }] }],
      fieldset: 'overview',
    }),
    defineField({
      name: 'completedTasks',
      title: 'Completed Tasks',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'completedTask' }] }],
      fieldset: 'overview',
    }),

    // Integration Refs
    defineField({
      name: 'sanity',
      title: 'Sanity.io Integration',
      type: 'reference',
      to: [{ type: 'sanityIntegration' }],
      fieldset: 'integrations',
      weak: true,
    }),
    defineField({
      name: 'vercel',
      title: 'Vercel Integration',
      type: 'reference',
      to: [{ type: 'vercelIntegration' }],
      fieldset: 'integrations',
      weak: true,
    }),
    defineField({
      name: 'github',
      title: 'GitHub Integration',
      type: 'reference',
      to: [{ type: 'githubIntegration' }],
      fieldset: 'integrations',
      weak: true,
    }),
  ],
  // --- CORRECTED: Use the 'components' property to specify a custom preview ---
  components: {
    preview: IntegrationPreview,
  },
  preview: {
    // --- CORRECTED: Select the fields needed by the custom preview component ---
    select: {
      projectName: 'projectName',
      sanity: 'sanity',
      vercel: 'vercel',
      github: 'github',
    },
    // The 'prepare' function is no longer needed as the custom component
    // receives the selected fields directly as props.
  },
})
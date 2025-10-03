// schemas/documents/Project/goal.ts
import { defineType, defineField } from 'sanity'
import { TargetIcon } from '@sanity/icons'
import React from 'react'

export default defineType({
  name: 'goal',
  title: 'Goal',
  type: 'document',
  icon: TargetIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Goal Title',
      type: 'string',
      description: 'A clear and concise title for your goal.',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'goalType',
      title: 'Goal Complexity',
      type: 'string',
      options: {
        list: [
          { title: 'Simple', value: 'simple' },
          { title: 'Advanced', value: 'advanced' },
        ],
        layout: 'radio',
      },
      initialValue: 'simple',
      description: 'Choose "Simple" for a quick goal or "Advanced" for detailed tracking.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'expandedDetails',
      title: 'Expanded Details',
      type: 'richTextContent',
      description: 'A more detailed description for the goal (optional).',
    }),
    defineField({
      name: 'targetDate',
      title: 'Target Completion Date',
      type: 'date',
      hidden: ({ document }) => document?.goalType === 'simple',
    }),
    defineField({
      name: 'tracking',
      title: 'Tracking and Progress',
      type: 'object',
      hidden: ({ document }) => document?.goalType === 'simple',
      fields: [
        defineField({
          name: 'progress',
          title: 'Current Progress',
          type: 'number',
          description: 'A number from 0 to 100 representing your progress.',
          validation: (Rule) => Rule.min(0).max(100),
        }),
        defineField({
          name: 'updates',
          title: 'Progress Updates',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'date',
                  title: 'Date',
                  type: 'datetime',
                  initialValue: () => (new Date()).toISOString(),
                  readOnly: true,
                },
                {
                  name: 'updateText',
                  title: 'Update Notes',
                  type: 'text',
                },
              ],
              preview: {
                select: {
                  title: 'updateText',
                  subtitle: 'date',
                },
              },
            },
          ],
        }),
      ],
    }),
    defineField({
      name: 'documentation',
      title: 'Documentation and Resources',
      type: 'array',
      of: [
        { type: 'file' },
        { type: 'image' },
        { type: 'link' },
      ],
      description: 'Upload files or link to external resources related to this goal.',
      hidden: ({ document }) => document?.goalType === 'simple',
    }),
    defineField({
      name: 'topics',
      title: 'Topics',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
      description: 'Add relevant topics or tags (e.g., "fitness", "coding", "personal finance").',
    }),
    defineField({
      name: 'relatedContent',
      title: 'Related Content',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [
            { type: 'project' },
            { type: 'researchDocument' },
            { type: 'post' },
            { type: 'timeline' },
            { type: 'person' },
            { type: 'company' },
            { type: 'film' },
            { type: 'tvShow' },
            { type: 'book' },
            { type: 'magazine' },
            { type: 'newspaper' },
            { type: 'podcast' },
          ],
        },
      ],
      description: 'Link this goal to other related projects, research, or content.',
      hidden: ({ document }) => document?.goalType === 'simple', // Hiding for 'simple' goals for a clean interface
    }),
    defineField({
      name: 'isCompleted',
      title: 'Goal Completed',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      targetDate: 'targetDate',
      expandedDetails: 'expandedDetails',
      isCompleted: 'isCompleted',
    },
    prepare({ title, targetDate, expandedDetails, isCompleted }) {
      let subtitle = ''

      if (expandedDetails && expandedDetails.length > 0) {
        // Extract the plain text from the first block of the richTextContent
        const firstBlock = expandedDetails[0]
        if (firstBlock.children && firstBlock.children.length > 0) {
          subtitle = firstBlock.children
            .filter(span => span._type === 'span')
            .map(span => span.text)
            .join('')
            .substring(0, 100) + '...' // Truncate the text for a clean preview
        }
      } else if (targetDate) {
        subtitle = `Due: ${new Date(targetDate).toLocaleDateString()}`
      }

      return {
        title: title || 'New Goal',
        subtitle: subtitle,
        media: React.createElement('span', null, isCompleted ? '✅' : '⏳'),
      }
    },
  },
})
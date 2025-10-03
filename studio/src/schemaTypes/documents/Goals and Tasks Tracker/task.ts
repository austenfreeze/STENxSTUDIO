// schemas/documents/Goals and Tasks Tracker/task.ts
import { defineType, defineField } from 'sanity'
import { CheckmarkCircleIcon, TaskIcon } from '@sanity/icons'
import React from 'react'

export default defineType({
  name: 'task',
  title: 'Task',
  type: 'document',
  icon: TaskIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Task Title',
      type: 'string',
      validation: Rule => Rule.required().min(3),
    }),
    defineField({
      name: 'taskType',
      title: 'Task Complexity',
      type: 'string',
      options: {
        list: [
          { title: 'Simple', value: 'simple' },
          { title: 'Advanced', value: 'advanced' },
        ],
        layout: 'radio',
      },
      initialValue: 'simple',
      description: 'Choose "Simple" for a quick task or "Advanced" for more details.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'expandedDetails',
      title: 'Expanded Details',
      type: 'richTextContent',
      description: 'A more detailed description for the task (optional).',
      hidden: ({ document }) => document?.taskType === 'simple',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active', value: 'active' },
          { title: 'Completed', value: 'completed' },
        ],
        layout: 'radio',
      },
      initialValue: 'active',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Bug Fix', value: 'bugfix'},
          {title: 'Feature', value: 'feature'},
          {title: 'Refactor', value: 'refactor'},
          {title: 'Research', value: 'research'},
          {title: 'Maintenance', value: 'maintenance'},
          {title: 'Other', value: 'other'},
        ],
        layout: 'dropdown',
      },
      hidden: ({ document }) => document?.taskType === 'simple',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'completionDate',
      title: 'Completion Date',
      type: 'datetime',
      hidden: ({ document }) => document?.status !== 'completed',
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
          ],
        },
      ],
      description: 'Link this task to other related projects, research, or content.',
      hidden: ({ document }) => document?.taskType === 'simple',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      status: 'status',
      expandedDetails: 'expandedDetails',
    },
    prepare({title, category, status, expandedDetails}) {
      let subtitle = ''
      if (expandedDetails && expandedDetails.length > 0) {
        const firstBlock = expandedDetails[0]
        if (firstBlock.children && firstBlock.children.length > 0) {
          subtitle = firstBlock.children
            .filter(span => span._type === 'span')
            .map(span => span.text)
            .join('')
            .substring(0, 100) + '...'
        }
      } else if (category) {
        subtitle = `Category: ${category}`
      }
      
      const media = status === 'completed' 
        ? React.createElement(CheckmarkCircleIcon, { style: { color: 'green' } }) 
        : React.createElement(TaskIcon, { style: { color: 'orange' } });

      return {
        title: title || 'New Task',
        subtitle: subtitle,
        media: media,
      }
    },
  },
})
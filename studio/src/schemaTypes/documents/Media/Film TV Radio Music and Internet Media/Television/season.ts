import {defineField, defineType} from 'sanity'
import {BiListOl} from 'react-icons/bi' // You may need to run: npm install react-icons

export const season = defineType({
  name: 'season',
  title: 'Season',
  type: 'object',
  icon: BiListOl,
  fieldsets: [{name: 'runDates', title: 'Run Dates:', options: {columns: 2}}],
  fields: [
    defineField({
      name: 'seasonNumber',
      title: 'Season Number',
      type: 'number',
      description: 'The number of the season (e.g., 1, 2, 3).',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: 'numberOfEpisodes',
      title: 'Number of Episodes',
      description: 'How many episodes are in this season.',
      type: 'number',
      validation: (Rule) => Rule.integer().positive(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      fieldset: 'runDates',
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      description: 'Leave empty if the show is still on air.',
      type: 'date',
      fieldset: 'runDates',
    }),
    defineField({
      name: 'relevantEpisodes',
      title: 'Relevant Episodes',
      description: 'Reference any specific episodes from this season that are particularly important.',
      type: 'array',
      of: [
        {
          type: 'reference',
          // This assumes you have a 'tvShowEpisode' schema
          to: [{type: 'tvShowEpisode'}],
        },
      ],
    }),
  ],
  preview: {
    // 1. Select the start and end dates in addition to the other fields
    select: {
      seasonNumber: 'seasonNumber',
      episodes: 'numberOfEpisodes',
      startDate: 'startDate',
      endDate: 'endDate',
    },
    // 2. Adjust the prepare function to use the new date fields
    prepare({seasonNumber, episodes, startDate, endDate}) {
      // Format the start and end years
      const startYear = startDate ? new Date(startDate).getFullYear() : ''
      const endYear = endDate ? new Date(endDate).getFullYear() : ''
      
      // Create a date range string, handling different cases
      let dateRange = ''
      if (startYear && endYear) {
        dateRange = startYear === endYear ? `${startYear}` : `${startYear}–${endYear}`
      } else if (startYear) {
        dateRange = startYear
      }

      // Format the episode count
      const episodeCount = episodes ? `${episodes} episodes` : ''

      // Join the parts into a clean subtitle
      const subtitle = [dateRange, episodeCount].filter(Boolean).join(' | ')

      return {
        title: `Season ${seasonNumber}`,
        subtitle: subtitle,
      }
    },
  },
})
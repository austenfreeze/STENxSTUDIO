// schemas/objects/relatedContent.ts
import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const relatedContent = defineType({
  name: 'relatedContent',
  title: 'Related Content',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'references',
      title: 'Content References',
      type: 'array',
      of: [
        {
          type: 'reference',
          // This is the key to making it universal. Add any document type
          // you might want to link to here.
          to: [
            {type: 'magazineArticle'},
  	    {type: 'magazine'},
            {type: 'book'},
            {type: 'film'},
            {type: 'tvShowEpisode'},
            {type: 'post'},
            {type: 'person'},
            {type: 'quote'},
            {type: 'mediaGallery'},
  	    {type: 'videoContent'},
  	    {type: 'voiceRecording'},
	    {type: 'newspaperArticle'},
		{type: 'newspaper'},
            {type: 'podcast'},
	{type: 'podcastEpisode'},
          ],
        },
      ],
    }),
  ],
})

// schemas/documents/voiceRecording.ts
import {defineType, defineField} from 'sanity'
import {PlayIcon} from '@sanity/icons'
// CORRECT
import AudioAnnotationTool from "../../../components/AudioAnnotationTool";

export const voiceRecording = defineType({
  name: 'voiceRecording',
  title: 'Voice Recording',
  type: 'document',
  icon: PlayIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'technical', title: 'Technical Details'},
    {name: 'context', title: 'Context & Organization'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'A clear, descriptive title for the recording (e.g., "Chapter 1 Narration - Final Take").',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'recordingType',
      title: 'Recording Type',
      type: 'string',
      group: 'content',
      options: {
        list: [
          {title: 'Script Reading', value: 'script'},
          {title: 'Narration / Voiceover', value: 'narration'},
          {title: 'Interview', value: 'interview'},
          {title: 'Stream-of-Thought', value: 'streamOfThought'},
          {title: 'Statement / Declaration', value: 'statement'},
          {title: 'Podcast Segment', value: 'podcast'},
        ],
        layout: 'radio',
      },
      description: 'Select the primary style or purpose of this recording.',
      initialValue: 'narration',
    }),
    defineField({
      name: 'audioFile',
      title: 'Audio File',
      type: 'file', // Using our custom, enhanced audio type
      description: 'Upload the primary audio file (e.g., WAV, MP3, M4A).',
      group: 'content',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'transcript',
      title: 'Transcript',
      type: 'text',
      group: 'content',
      rows: 10,
      description: 'A full text transcript of the recording. Can be auto-generated.',
    }),
    defineField({
      name: 'scriptText',
      title: 'Original Script',
      type: 'text',
      group: 'content',
      rows: 10,
      description: 'The original script that was read, if applicable.',
      hidden: ({document}) => document?.recordingType !== 'script',
    }),
    defineField({
      name: 'performanceNotes',
      title: 'Performance & Delivery Notes',
      type: 'text',
      group: 'content',
      description: 'Notes on tone, pacing, and delivery (e.g., "Read this section with more urgency").',
      hidden: ({document}) => !['script', 'narration'].includes(document?.recordingType as string),
    }),
defineField({
  name: 'speakers',
  title: 'Speakers',
  type: 'array',
  group: 'context',
  // CORRECTED LINE:
  of: [{type: 'reference', to: [{type: 'admin'}, {type: 'person'}]}],
}),
    defineField({
      name: 'project',
      title: 'Project',
      type: 'reference',
      group: 'context',
      to: [{type: 'project'}],
      description: 'Associate this recording with a larger project (e.g., a specific podcast series or audiobook).',
    }),
    defineField({
      name: 'recordingDate',
      title: 'Recording Date',
      type: 'datetime',
      group: 'technical',
      initialValue: () => new Date().toISOString(),
    }),
    // FIX 2: Replaced 'relatedContent' with a more robust and correct implementation
    defineField({
      name: 'relatedContent',
      title: 'Related Content',
      type: 'relatedContent',
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'category'}}],
    }),
    defineField({
      name: 'technicalMetadata',
      title: 'Technical Metadata',
      type: 'object',
      group: 'technical',
      fields: [
        {name: 'equipment', title: 'Equipment Used', type: 'string', description: 'e.g., "Shure SM7B, Focusrite Scarlett 2i2"'},
        {name: 'software', title: 'Recording Software', type: 'string', description: 'e.g., "Adobe Audition, Audacity"'},
        {name: 'soundEngineer', title: 'Sound Engineer', type: 'string'},
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      type: 'recordingType',
      speaker: 'speakers.0.name',
      artwork: 'project.artwork',
      duration: 'audioFile.duration',
    },
    prepare({title, type, speaker, artwork, duration}) {
      const subtitles = [
        speaker,
        type ? `${type.charAt(0).toUpperCase() + type.slice(1)}` : '',
        duration ? `Duration: ${duration}` : '',
      ].filter(Boolean).join(' | ');

      return {
        title: title,
        subtitle: subtitles,
        media: artwork || PlayIcon,
      }
    }
  }
})
import {
  CogIcon,
  DocumentIcon,
  UsersIcon,
  PlayIcon,
  BookIcon,
  TagIcon,
  ComposeIcon,
  ClipboardIcon,
  FolderIcon,
  ControlsIcon,
  ProjectsIcon,
  SparklesIcon,
  ThListIcon,
  ImageIcon,
  VideoIcon,
  ArchiveIcon,
  EyeOpenIcon,
  LockIcon,
  CalendarIcon,
  DocumentTextIcon,
  SearchIcon, // Imported SearchIcon for Research Files
} from '@sanity/icons'
import type {StructureBuilder} from 'sanity/desk'

/**
 * A comprehensive Set of all document types that are handled manually in the structure below.
 * This is CRITICAL to prevent them from appearing at the root of the studio and creating duplicates.
 * Make sure every document type you add to the structure is also added to this Set.
 */
const MANUALLY_HANDLED_TYPES = new Set([
  // Singletons & Config
  'settings',
  'integrations',
  'sanityIntegration',
  'vercelIntegration',
  'githubIntegration',

  // Editorial Suite
  'multimediaArticle',
  'editorialThread',
  'post',
  'researchElement',
  'quote',
  'category',

  // Zing System
  'zing',
  'zingThread',

  // Private Notebook
  'notebookEntry',

  // Project Management
  'project',
  'goal',
  'completedTask',

  // Knowledge Graph
  'admin',
  'person',
  'crewMember',
  'castMember',
  'source',
  'company',
  'publisher',
  'newsOrganization',
  'televisionNetwork',

  // Media Library
  'film',
  'tvShow',
  'season',
  'tvShowEpisode',
  'documentary',
  'book',
  'bookCover',
  'mediaGallery',
  'logo',
  'youtubeChannel',
  'videoContent',
  'customImage',
  'voiceRecording',
  'magazine',
  'magazineIssue',
  'magazineIssueCover',
  'magazineArticle',
  'magazinePage',
  'newspaper',
  'newspaperIssue',
  'newspaperArticle',
  'newspaperHeadline',
  'podcast', // Added new schema
  'podcastEpisode', // Added new schema

  // New Schemas
  'researchDocument',
  'timeline',
  'timelineEventNode',
  'foiaDatabase', // Added foiaDatabase to the manually handled types
  'foiaDocument', // Added foiaDocument to the manually handled types

  'page',
])

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('STENxSTUDIO')
    .items([
      S.listItem()
        .title('Site Configuration')
        .icon(ControlsIcon)
        .child(
          S.list()
            .title('Configuration')
            .items([
              S.listItem()
                .title('Global Settings')
                .icon(CogIcon)
                .child(S.document().schemaType('settings').documentId('settings')),
              S.divider(),
              S.listItem()
                .title('Site Integrations')
                .icon(FolderIcon)
                .child(
                  S.list()
                    .title('Integrations')
                    .items([
                      S.documentTypeListItem('sanityIntegration').title('Sanity'),
                      S.documentTypeListItem('vercelIntegration').title('Vercel'),
                      S.documentTypeListItem('githubIntegration').title('GitHub'),
                    ])
                ),
              S.divider(),
            ])
        ),
      S.divider(),

      S.listItem()
        .title('Editorial Suite')
        .icon(ComposeIcon)
        .child(
          S.list()
            .title('Editorial Suite')
            .items([
              S.documentTypeListItem('multimediaArticle').title('Multimedia Articles'),
              S.divider(),
              S.documentTypeListItem('editorialThread').title('Editorial Threads'),
              S.divider(),
              S.documentTypeListItem('post').title('Standard Posts'),
              S.divider(),
              S.documentTypeListItem('researchElement').title('Research Elements'),
              S.divider(),
              S.documentTypeListItem('quote').title('Quotes'),
              S.divider(),
              S.documentTypeListItem('category').title('Categories'),
              S.divider(),
            ])
        ),
      S.divider(),

      S.listItem()
        .title('Zing System')
        .icon(SparklesIcon)
        .child(
          S.list()
            .title('Zing System')
            .items([
              S.documentTypeListItem('zingThread').title('Zing Threads').icon(ThListIcon),
              S.divider(),
              S.listItem()
                .title('Active Zings')
                .icon(EyeOpenIcon)
                .child(S.documentList().title('Active Zings').filter('_type == "zing" && status == "active"').apiVersion('v2024-10-28')),
              S.divider(),
              S.listItem()
                .title('Private Zings')
                .icon(LockIcon)
                .child(S.documentList().title('Private Zings').filter('_type == "zing" && status == "private"').apiVersion('v2024-10-28')),
              S.divider(),
              S.listItem()
                .title('Archived Zings')
                .icon(ArchiveIcon)
                .child(
                  S.documentList().title('Archived Zings').filter('_type == "zing" && status == "archived"').apiVersion('v2024-10-28')
                ),
              S.divider(),
              S.documentTypeListItem('zing').title('All Zings').icon(SparklesIcon),
              S.divider(),
            ])
        ),
      S.divider(),

      // --- PRIVATE NOTEBOOK ---
      S.listItem()
        .title('Private Notebook')
        .icon(BookIcon)
        .child(S.documentList().title('Notebook Entries').filter('_type == "notebookEntry"').apiVersion('v2024-10-28')),

      S.divider(),

      // --- PROJECT MANAGEMENT ---
      S.listItem()
        .title('Project Management')
        .icon(ProjectsIcon)
        .child(
          S.list()
            .title('Projects')
            .items([
              S.documentTypeListItem('project').title('Projects'),
              S.divider(),
              S.documentTypeListItem('goal').title('Goals'),
              S.divider(),
              S.documentTypeListItem('completedTask').title('Completed Tasks'),
              S.divider(),
            ])
        ),
      S.divider(),

      // --- NEW: RESEARCH & TIMELINES ---
      S.listItem()
        .title('Research & Timelines')
        .icon(SearchIcon)
        .child(
          S.list()
            .title('Research & Timelines')
            .items([
              S.documentTypeListItem('researchDocument').title('Research Document').icon(SearchIcon),
              S.divider(),
              S.documentTypeListItem('timeline').title('Timelines').icon(CalendarIcon),
              S.divider(),
            ])
        ),
      S.divider(),

      // --- NEW: DOCUMENT DATABASE ---
      S.listItem()
        .title('Document Database')
        .icon(DocumentIcon)
        .child(
          S.list()
            .title('FOIA Reading Room')
            .items([
              S.listItem()
                .title('FOIA Database')
                .icon(FolderIcon)
                .child(S.document().schemaType('foiaDatabase').documentId('foiaDatabase')),
              S.divider(),
              S.documentTypeListItem('foiaDocument').title('Documents').icon(DocumentTextIcon),
              S.divider(),
            ])
        ),
      S.divider(),

      // --- KNOWLEDGE GRAPH ---
      S.listItem()
        .title('Knowledge Graph')
        .icon(UsersIcon)
        .child(
          S.list()
            .title('People & Entities')
            .items([
              S.documentTypeListItem('person').title('People'),
              S.divider(),
              S.documentTypeListItem('admin').title('Studio Users'),
              S.divider(),
              S.documentTypeListItem('crewMember').title('Crew Members'),
              S.divider(),
              S.documentTypeListItem('castMember').title('Cast Members'),
              S.divider(),
              S.documentTypeListItem('source').title('Sources'),
              S.divider(),
              S.documentTypeListItem('company').title('Companies'),
              S.divider(),
              S.documentTypeListItem('publisher').title('Publishers'),
              S.divider(),
              S.documentTypeListItem('newsOrganization').title('News Organizations'),
              S.divider(),
            ])
        ),
      S.divider(),

      // --- MEDIA LIBRARY ---
      S.listItem()
        .title('Media Library')
        .icon(PlayIcon) // Changed top-level icon to be more generic for media
        .child(
          S.list()
            .title('Media Library')
            .items([
              S.listItem()
                .title('Film & TV')
                .child(
                  S.list()
                    .title('Film & TV')
                    .items([
                      S.documentTypeListItem('tvShow').title('TV Shows'),
                      S.divider(),
                      S.documentTypeListItem('season').title('Seasons'),
                      S.divider(),
                      S.documentTypeListItem('tvShowEpisode').title('TV Episodes'),
                      S.divider(),
                      S.documentTypeListItem('film').title('Films'),
                      S.divider(),
                      S.documentTypeListItem('documentary').title('Documentaries'),
                      S.divider(),
                      S.documentTypeListItem('televisionNetwork').title('TV Networks'),
                      S.divider(),
                    ])
                ),
              S.divider(),
              S.listItem()
                .title('Internet Content')
                .child(
                  S.list()
                    .title('Internet Content')
                    .items([
                      S.documentTypeListItem('youtubeChannel').title('Youtube Channels'),
                      S.divider(),
                      // --- PODCASTS SECTION ---
                      S.listItem()
                        .title('Podcasts')
                        .icon(PlayIcon)
                        .child(
                          S.list()
                            .title('Podcasts')
                            .items([
                              S.documentTypeListItem('podcast').title('Podcast Series'),
                              S.divider(),
                              S.documentTypeListItem('podcastEpisode').title('Podcast Episodes'),
                              S.divider(),
                            ])
                        ),
                      S.divider(),
                    ])
                ),
              S.divider(),

              S.listItem()
                .title('Bookshelf')
                .child(
                  S.list()
                    .title('Bookshelf')
                    .items([
                      S.documentTypeListItem('book').title('Books'),
                      S.divider(),
                      S.documentTypeListItem('bookCover').title('Book Covers'),
                      S.divider(),
                      // --- MAGAZINE SECTION ---
                      S.listItem()
                        .title('Magazines')
                        .icon(BookIcon)
                        .child(
                          S.list()
                            .title('Magazines')
                            .items([
                              S.documentTypeListItem('magazine').title('Magazines'),
                              S.divider(),
                              S.documentTypeListItem('magazineIssue').title('Issues'),
                              S.divider(),
                              S.documentTypeListItem('magazineArticle').title('Articles'),
                              S.divider(),
                              S.documentTypeListItem('magazinePage').title('Pages'),
                              S.divider(),
                              S.documentTypeListItem('magazineIssueCover').title('Covers'),
                              S.divider(),
                            ])
                        ),
                      S.divider(),

                      S.listItem()
                        .title('Newspapers')
                        .icon(ClipboardIcon) // Using ClipboardIcon for newspapers
                        .child(
                          S.list()
                            .title('Newspapers')
                            .items([
                              S.documentTypeListItem('newspaper').title('Newspaper Publications'),
                              S.divider(),
                              S.documentTypeListItem('newspaperIssue').title('Newspaper Issues'),
                              S.divider(),
                              S.documentTypeListItem('newspaperArticle').title('Newspaper Articles'),
                              S.divider(),
                              S.documentTypeListItem('newspaperHeadline').title('Newspaper Headlines'),
                              S.divider(),
                            ])
                        ),
                      S.divider(),
                    ])
                ),
              S.divider(),
              S.listItem()
                .title('Brand & Media Assets')
                .child(
                  S.list()
                    .title('Assets')
                    .items([
                      S.documentTypeListItem('logo').title('Logos'),
                      S.divider(),
                      S.documentTypeListItem('mediaGallery').title('Media Galleries'),
                      S.divider(),
                      S.documentTypeListItem('videoContent').title('Video Content').icon(VideoIcon),
                      S.divider(),
                      S.documentTypeListItem('voiceRecording').title('Voice Recordings').icon(PlayIcon),
                      S.divider(),
                      S.documentTypeListItem('customImage').title('Custom Images').icon(ImageIcon),
                      S.divider(),
                    ])
                ),
              S.divider(),
            ])
        ),
      S.divider(),

      // --- CORE PAGES ---
      S.documentTypeListItem('page').title('Pages').icon(DocumentIcon),

      // --- Filter out all manually handled types from the root ---
      ...S.documentTypeListItems().filter(
        (listItem) => !MANUALLY_HANDLED_TYPES.has(listItem.getId() || '')
      ),
    ])

// Your existing getDefaultDocumentNode function can remain as is.
export const getDefaultDocumentNode = (S: StructureBuilder, {schemaType}: {schemaType: string}) => {
  return S.document().views([S.view.form()])
}
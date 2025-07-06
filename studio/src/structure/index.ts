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
  // --- ADDED VOICE RECORDING SCHEMA ---
  'voiceRecording',
  // --- ADDED MAGAZINE SCHEMAS ---
  'magazine',
  'magazineIssue',
  'magazineIssueCover',
  'magazineArticle',
  'magazinePage',

  // Core Pages
  'page',
])

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('Content Studio')
    .items([
      // --- CONFIGURATION ---
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
            ])
        ),
      S.divider(),

      // --- EDITORIAL SUITE ---
      S.listItem()
        .title('Editorial Suite')
        .icon(ComposeIcon)
        .child(
          S.list()
            .title('Editorial Suite')
            .items([
              S.documentTypeListItem('multimediaArticle').title('Multimedia Articles'),
              S.documentTypeListItem('editorialThread').title('Editorial Threads'),
              S.documentTypeListItem('post').title('Standard Posts'),
              S.divider(),
              S.documentTypeListItem('researchElement').title('Research Elements'),
              S.documentTypeListItem('quote').title('Quotes'),
              S.divider(),
              S.documentTypeListItem('category').title('Categories'),
            ])
        ),

      // --- ZING SYSTEM (UPDATED) ---
      S.listItem()
        .title('Zing System')
        .icon(SparklesIcon)
        .child(
          S.list()
            .title('Zing System')
            .items([
              S.documentTypeListItem('zingThread').title('Zing Threads').icon(ThListIcon),
              S.divider(),
              // This is now the "clean" feed of active zings.
              S.listItem()
                .title('Active Zings')
                .icon(EyeOpenIcon)
                .child(S.documentList().title('Active Zings').filter('_type == "zing" && status == "active"')),
              // A view for your private notes and drafts.
              S.listItem()
                .title('Private Zings')
                .icon(LockIcon)
                .child(S.documentList().title('Private Zings').filter('_type == "zing" && status == "private"')),
              // A view for completed or archived items.
              S.listItem()
                .title('Archived Zings')
                .icon(ArchiveIcon)
                .child(
                  S.documentList().title('Archived Zings').filter('_type == "zing" && status == "archived"')
                ),
              S.divider(),
              // A master list to see everything.
              S.documentTypeListItem('zing').title('All Zings').icon(SparklesIcon),
            ])
        ),

      // --- PRIVATE NOTEBOOK ---
      S.listItem()
        .title('Private Notebook')
        .icon(BookIcon)
        .child(S.documentList().title('Notebook Entries').filter('_type == "notebookEntry"')),

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
              S.documentTypeListItem('goal').title('Goals'),
              S.documentTypeListItem('completedTask').title('Completed Tasks'),
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
              S.documentTypeListItem('admin').title('Studio Users'),
              S.documentTypeListItem('crewMember').title('Crew Members'),
              S.documentTypeListItem('castMember').title('Cast Members'),
              S.divider(),
              S.documentTypeListItem('source').title('Sources'),
              S.documentTypeListItem('company').title('Companies'),
              S.documentTypeListItem('publisher').title('Publishers'),
              S.documentTypeListItem('newsOrganization').title('News Organizations'),
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
                      S.documentTypeListItem('season').title('Seasons'),
                      S.documentTypeListItem('tvShowEpisode').title('TV Episodes'),
                      S.documentTypeListItem('film').title('Films'),
                      S.documentTypeListItem('documentary').title('Documentaries'),
                      S.documentTypeListItem('televisionNetwork').title('TV Networks'),
                    ])
                ),
              S.listItem()
                .title('Bookshelf')
                .child(
                  S.list()
                    .title('Bookshelf')
                    .items([
                      S.documentTypeListItem('book').title('Books'),
                      S.documentTypeListItem('bookCover').title('Book Covers'),
                      S.divider(),
                      // --- ADDED MAGAZINE SECTION ---
                      S.listItem()
                        .title('Magazines')
                        .icon(BookIcon)
                        .child(
                          S.list()
                            .title('Magazines')
                            .items([
                              S.documentTypeListItem('magazine').title('Magazines'),
                              S.documentTypeListItem('magazineIssue').title('Issues'),
                              S.documentTypeListItem('magazineArticle').title('Articles'),
                              S.divider(),
                              S.documentTypeListItem('magazinePage').title('Pages'),
                              S.documentTypeListItem('magazineIssueCover').title('Covers'),
                            ])
                        ),
                    ])
                ),
              S.listItem()
                .title('Brand & Media Assets')
                .child(
                  S.list()
                    .title('Assets')
                    .items([
                      S.documentTypeListItem('logo').title('Logos'),
                      S.documentTypeListItem('mediaGallery').title('Media Galleries'),
                      S.documentTypeListItem('youtubeChannel').title('YouTube Channels'),
                      S.documentTypeListItem('videoContent').title('Video Content').icon(VideoIcon),
                      // --- VOICE RECORDING ADDED HERE ---
                      S.documentTypeListItem('voiceRecording').title('Voice Recordings').icon(PlayIcon),
                      S.documentTypeListItem('customImage').title('Custom Images').icon(ImageIcon),
                    ])
                ),
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
// It's good practice to keep it for handling previews.
export const getDefaultDocumentNode = (S: StructureBuilder, {schemaType}: {schemaType: string}) => {
  // Add custom views as needed
  return S.document().views([S.view.form()])
}
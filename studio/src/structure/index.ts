// structure.ts or deskStructure.ts

import type {
  StructureResolver,
  DefaultDocumentNodeResolver,
} from 'sanity/structure';

// Import all icons from Sanity
import {
  CogIcon,
  DocumentIcon,
  UsersIcon,
  PlayIcon,
  BookIcon,
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
  SearchIcon,
  DocumentTextIcon,
} from '@sanity/icons';

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
  'podcast',
  'podcastEpisode',

  // Research
  'researchDocument',
  'timeline',
  'timelineEventNode',

  // Core Pages
  'page',
]);

/**
 * Defines the custom desk structure for the Sanity Studio.
 * This function returns a list of items for the main navigation pane.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('STENxSTUDIO')
    .items([
      // --- SITE CONFIGURATION ---
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
                      S.divider(),
                    ])
                ),
              S.divider(),
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

      // --- ZING SYSTEM ---
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
                .child(S.documentList().title('Active Zings').filter('_type == "zing" && status == "active"')),
              S.divider(),
              S.listItem()
                .title('Private Zings')
                .icon(LockIcon)
                .child(S.documentList().title('Private Zings').filter('_type == "zing" && status == "private"')),
              S.divider(),
              S.listItem()
                .title('Archived Zings')
                .icon(ArchiveIcon)
                .child(S.documentList().title('Archived Zings').filter('_type == "zing" && status == "archived"')),
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
              S.divider(),
              S.documentTypeListItem('goal').title('Goals'),
              S.divider(),
              S.documentTypeListItem('completedTask').title('Completed Tasks'),
              S.divider(),
            ])
        ),
      S.divider(),

      // --- RESEARCH & TIMELINES ---
      S.listItem()
        .title('Research & Timelines')
        .icon(SearchIcon)
        .child(
          S.list()
            .title('Research & Timelines')
            .items([
              S.documentTypeListItem('researchDocument').title('Research Documents').icon(DocumentTextIcon),
              S.divider(),
              S.documentTypeListItem('timeline').title('Timelines').icon(CalendarIcon),
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
        .icon(PlayIcon)
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
                        .icon(ClipboardIcon)
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
                      S.documentTypeListItem('voiceRecording').title('Voice Recordings').icon(DocumentTextIcon),
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
      S.divider(),

      // --- FILTERED OUT LIST OF OTHER TYPES ---
      // Filter out all manually handled types to prevent duplicates in the root menu.
      ...S.documentTypeListItems().filter(
        (listItem) => !MANUALLY_HANDLED_TYPES.has(listItem.getId() || '')
      ),
      S.divider(), // A final divider at the end of the root list.
    ]);

/**
 * Defines the default document node for all document types.
 * This is used for all documents unless a custom view is defined in the structure.
 */
export const getDefaultDocumentNode: DefaultDocumentNodeResolver = (S, { schemaType }) => {
  return S.document().views([S.view.form()]);
};
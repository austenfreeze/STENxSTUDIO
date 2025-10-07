// studio/src/structure/index.ts

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
  SearchIcon,
  TargetIcon,
  CheckmarkCircleIcon,
  TaskIcon,
} from '@sanity/icons'
import type {StructureBuilder} from 'sanity/desk'

// Corrected import paths for schema types
import {person} from '../schemaTypes/documents/People and Entities/People/person';
import {publisher} from '../schemaTypes/documents/People and Entities/Entities/publisher';
import {company} from '../schemaTypes/documents/People and Entities/Entities/company';
import {newsOrganization} from '../schemaTypes/documents/People and Entities/Entities/newsOrganization';
import {source} from '../schemaTypes/documents/People and Entities/source';
import {quote} from '../schemaTypes/documents/People and Entities/quote';
import {crewMember} from '../schemaTypes/documents/People and Entities/People/crewMember';
import {castMember} from '../schemaTypes/documents/People and Entities/People/castMember';
import {youtubeChannel} from '../schemaTypes/documents/People and Entities/youtubeChannel';
import {mediaGallery} from '../schemaTypes/documents/Media/Images/mediaGallery';
import {customImage} from '../schemaTypes/documents/Media/Images/customImage';
import {voiceRecording} from '../schemaTypes/documents/Media/Audio/voiceRecording';
import {film} from '../schemaTypes/documents/Media/Film TV Radio Music and Internet Media/film';
import {book} from '../schemaTypes/documents/Media/Bookshelf/book/book';
import {bookCover} from '../schemaTypes/documents/Media/Bookshelf/Book/bookCoversFrontandBack';
import {magazine} from '../schemaTypes/documents/Media/Bookshelf/Magazine/magazine';
import {magazineArticle} from '../schemaTypes/documents/Media/Bookshelf/Magazine/magazineArticle';
import {magazineIssue} from '../schemaTypes/documents/Media/Bookshelf/Magazine/magazineIssue';
import {magazineIssueCover} from '../schemaTypes/documents/Media/Bookshelf/Magazine/magazineIssueCover';
import {magazinePage} from '../schemaTypes/documents/Media/Bookshelf/Magazine/magazinePage';
import foiaDocument from '../schemaTypes/documents/Media/DocumentDatabase/foiaDocument';
import foiaDatabase from '../schemaTypes/documents/Media/DocumentDatabase/foiaDatabase';
import {podcast} from '../schemaTypes/documents/Media/Film TV Radio Music and Internet Media/Podcast/podcast';
import {podcastEpisode} from '../schemaTypes/documents/Media/Film TV Radio Music and Internet Media/Podcast/podcastEpisode';
import {newspaper} from '../schemaTypes/documents/Media/Bookshelf/Newspaper/newspaper';
import {newspaperArticle} from '../schemaTypes/documents/Media/Bookshelf/Newspaper/newspaperArticle';
import {newspaperIssue} from '../schemaTypes/documents/Media/Bookshelf/Newspaper/newspaperIssue';
import {newspaperHeadline} from '../schemaTypes/documents/Media/Bookshelf/Newspaper/newspaperHeadline';
import {logo} from '../schemaTypes/documents/Media/Images/logo';
import {season} from '../schemaTypes/documents/Media/Film TV Radio Music and Internet Media/Television/season';
import {tvShowEpisode} from '../schemaTypes/documents/Media/Film TV Radio Music and Internet Media/Television/televisionEpisode';
import {documentary} from '../schemaTypes/documents/Media/Film TV Radio Music and Internet Media/documentary';
import {tvShow} from '../schemaTypes/documents/Media/Film TV Radio Music and Internet Media/Television/tvShow';
import {televisionNetwork} from '../schemaTypes/documents/People and Entities/Entities/televisionNetwork';
import {videoContent} from '../schemaTypes/documents/Media/Film TV Radio Music and Internet Media/videoContent';
import {integrations} from '../schemaTypes/documents/Site Maintainence/Integrations/integrations';
import {sanityIntegration} from '../schemaTypes/documents/Site Maintainence/Integrations/sanityIntegration';
import {vercelIntegration} from '../schemaTypes/documents/Site Maintainence/Integrations/vercelIntegration';
import {githubIntegration} from '../schemaTypes/documents/Site Maintainence/Integrations/githubIntegration';
import {customFile} from '../schemaTypes/documents/Site Maintainence/customFile';
import {relatedContent} from '../schemaTypes/documents/Site Maintainence/relatedContent';
import {admin} from '../schemaTypes/documents/People and Entities/People/Admin/admin';
import {adminProfile} from '../schemaTypes/documents/People and Entities/People/Admin/adminProfile';
import {articleSeries} from '../schemaTypes/documents/Media/Bookshelf/Magazine/articleSeries';
import {referencedPeople} from '../schemaTypes/documents/Site Maintainence/referencedPeople';
import {postThread} from '../schemaTypes/documents/Site Maintainence/blog/postThread';
import {seriesNavigation} from '../schemaTypes/objects/seriesNavigation';
import {pageBuilderType} from '../schemaTypes/blocks/pageBuilderType';
import {featuresType} from '../schemaTypes/blocks/featuresType';
import {heroType} from '../schemaTypes/blocks/heroType';
import {splitImageType} from '../schemaTypes/blocks/splitImageType';
import {
  multimediaArticle,
  editorialThread,
  researchElement,
  notebookEntry,
} from '../schemaTypes/documents/Site Maintainence/Blog/editorialSuite';
import {page} from '../schemaTypes/documents/Site Maintainence/Pages/page';
import {post} from '../schemaTypes/documents/Site Maintainence/Blog/post';
import goal from '../schemaTypes/documents/Goals and Tasks Tracker/goal';
import goalHub from '../schemaTypes/documents/Goals and Tasks Tracker/goalHub';
import task from '../schemaTypes/documents/Goals and Tasks Tracker/task';
import { sprint } from '../schemaTypes/documents/Project/sprint';
import { completedTask } from '../schemaTypes/documents/Project/completedTask';
import { category } from '../schemaTypes/documents/Site Maintainence/category';
import { project } from '../schemaTypes/documents/Project/Project/project';
import { researchDocument } from '../schemaTypes/documents/Project/Project/researchDocument';
import { timeline } from '../schemaTypes/documents/Timelines/timeline';
import { timelineEventNode } from '../schemaTypes/documents/Timelines/timelineEventNode';
import { settings } from '../schemaTypes/singletons/settings';
import { callToAction } from '../schemaTypes/objects/callToAction';
import { infoSection } from '../schemaTypes/objects/infoSection';
import { pullQuote } from '../schemaTypes/objects/pullQuote';
import { researchCitation } from '../schemaTypes/objects/researchCitation';
import { contextInput } from '../schemaTypes/objects/contextInput';
import { richTextContent } from '../schemaTypes/objects/richTextContent';
import { link } from '../schemaTypes/objects/link';


const MANUALLY_HANDLED_TYPES = new Set([
  'settings',
  'integrations',
  'sanityIntegration',
  'vercelIntegration',
  'githubIntegration',
  'multimediaArticle',
  'editorialThread',
  'post',
  'researchElement',
  'quote',
  'category',
  'postThread',
  'notebookEntry',
  'project',
  'goal',
  'goalHub',
  'task',
  'sprint',
  'completedTask',
  'admin',
  'person',
  'crewMember',
  'castMember',
  'source',
  'company',
  'publisher',
  'newsOrganization',
  'televisionNetwork',
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
  'researchDocument',
  'timeline',
  'timelineEventNode',
  'foiaDatabase',
  'foiaDocument',
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
              S.documentTypeListItem('articleSeries').title('Article Series'),
              S.divider(),
            ])
        ),
      S.divider(),

      S.listItem()
        .title('Posting System')
        .icon(SparklesIcon)
        .child(
          S.list()
            .title('Posting System')
            .items([
              S.documentTypeListItem('postThread').title('Post Threads').icon(ThListIcon),
              S.divider(),
              S.listItem()
                .title('Active Posts')
                .icon(EyeOpenIcon)
                .child(S.documentList().title('Active post').filter('_type == "post" && status == "active"').apiVersion('v2024-10-28')),
              S.divider(),
              S.listItem()
                .title('Private Posts')
                .icon(LockIcon)
                .child(S.documentList().title('Private Posts').filter('_type == "post" && status == "private"').apiVersion('v2024-10-28')),
              S.divider(),
              S.listItem()
                .title('Archived Posts')
                .icon(ArchiveIcon)
                .child(
                  S.documentList().title('Archived Posts').filter('_type == "post" && status == "archived"').apiVersion('v2024-10-28')
                ),
              S.divider(),
              S.documentTypeListItem('post').title('All Posts').icon(SparklesIcon),
              S.divider(),
            ])
        ),
      S.divider(),

      S.listItem()
        .title('Goals & Tasks')
        .icon(TargetIcon)
        .child(
          S.list()
            .title('Goals & Tasks')
            .items([
              S.documentTypeListItem('goalHub').title('Goal Hubs').icon(TargetIcon),
              S.divider(),
              S.listItem()
                .title('All Goals')
                .icon(TargetIcon)
                .child(S.documentList().title('All Goals').filter('_type == "goal"')),
              S.divider(),
              S.listItem()
                .title('All Tasks')
                .icon(TaskIcon)
                .child(S.documentList().title('All Tasks').filter('_type == "task"')),
              S.divider(),
              S.listItem()
                .title('Completed Tasks')
                .icon(CheckmarkCircleIcon)
                .child(S.documentList().title('Completed Tasks').filter('_type == "task" && status == "completed"')),
              S.divider(),
              S.documentTypeListItem('completedTask').title('Old Completed Tasks'),
            ])
        ),
      S.divider(),

      S.listItem()
        .title('Project Management')
        .icon(ProjectsIcon)
        .child(
          S.list()
            .title('Projects')
            .items([
              S.documentTypeListItem('project').title('Projects'),
              S.divider(),
              S.documentTypeListItem('sprint').title('Sprints'),
            ])
        ),
      S.divider(),

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

      S.documentTypeListItem('page').title('Pages').icon(DocumentIcon),

      ...S.documentTypeListItems().filter(
        (listItem) => !MANUALLY_HANDLED_TYPES.has(listItem.getId() || '')
      ),
    ])

export const getDefaultDocumentNode = (S: StructureBuilder, {schemaType}: {schemaType: string}) => {
  return S.document().views([S.view.form()])
}
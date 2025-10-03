// schemas/index.ts

import { person } from './documents/People and Entities/People/person';
import { publisher } from './documents/People and Entities/Entities/publisher';
import { company } from './documents/People and Entities/Entities/company';
import { newsOrganization } from './documents/People and Entities/Entities/newsOrganization';
import { source } from './documents/People and Entities/source';
import { quote } from './documents/People and Entities/quote';
import { crewMember } from './documents/People and Entities/People/crewMember';
import { castMember } from './documents/People and Entities/People/castMember';
import { youtubeChannel } from './documents/People and Entities/youtubeChannel';
import { mediaGallery } from './documents/Media/Images/mediaGallery';
import { customImage } from './documents/Media/Images/customImage';
import { voiceRecording } from './documents/Media/Audio/voiceRecording';
import { film } from './documents/Media/Film TV Radio Music and Internet Media/film';
import { book } from './documents/Media/Bookshelf/book/book';
import { bookCover } from './documents/Media/Bookshelf/Book/bookCoversFrontandBack';
import { magazine } from './documents/Media/Bookshelf/Magazine/magazine';
import { magazineArticle } from './documents/Media/Bookshelf/Magazine/magazineArticle';
import { magazineIssue } from './documents/Media/Bookshelf/Magazine/magazineIssue';
import { magazineIssueCover } from './documents/Media/Bookshelf/Magazine/magazineIssueCover';
import { magazinePage } from './documents/Media/Bookshelf/Magazine/magazinePage';
import foiaDocument from './documents/Media/DocumentDatabase/foiaDocument';
import foiaDatabase from './documents/Media/DocumentDatabase/foiaDatabase';
import { podcast } from './documents/Media/Film TV Radio Music and Internet Media/Podcast/podcast';
import { podcastEpisode } from './documents/Media/Film TV Radio Music and Internet Media/Podcast/podcastEpisode';
import { newspaper } from './documents/Media/Bookshelf/Newspaper/newspaper';
import { newspaperArticle } from './documents/Media/Bookshelf/Newspaper/newspaperArticle';
import { newspaperIssue } from './documents/Media/Bookshelf/Newspaper/newspaperIssue';
import { newspaperHeadline } from './documents/Media/Bookshelf/Newspaper/newspaperHeadline';
import { logo } from './documents/Media/Images/logo';
import { season } from './documents/Media/Film TV Radio Music and Internet Media/Television/season';
import { tvShowEpisode } from './documents/Media/Film TV Radio Music and Internet Media/Television/televisionEpisode';
import { documentary } from './documents/Media/Film TV Radio Music and Internet Media/documentary';
import { tvShow } from './documents/Media/Film TV Radio Music and Internet Media/Television/tvShow';
import { televisionNetwork } from './documents/People and Entities/Entities/televisionNetwork';
import { videoContent } from './documents/Media/Film TV Radio Music and Internet Media/videoContent';
import { integrations } from './documents/Site Maintainence/Integrations/integrations';
import { sanityIntegration } from './documents/Site Maintainence/Integrations/sanityIntegration';
import { vercelIntegration } from './documents/Site Maintainence/Integrations/vercelIntegration';
import { githubIntegration } from './documents/Site Maintainence/Integrations/githubIntegration';
import { customFile } from './documents/Site Maintainence/customFile';
import { relatedContent } from './documents/Site Maintainence/relatedContent';
import { admin } from './documents/People and Entities/People/Admin/admin';
import { adminProfile } from './documents/People and Entities/People/Admin/adminProfile';
import { articleSeries } from './documents/Media/Bookshelf/Magazine/articleSeries';
import { referencedPeople } from './documents/Site Maintainence/referencedPeople';
import { postThread } from './documents/Site Maintainence/blog/postThread';
import { seriesNavigation } from './objects/seriesNavigation';
import { pageBuilderType } from './blocks/pageBuilderType';
import { featuresType } from './blocks/featuresType';
import { heroType } from './blocks/heroType';
import { splitImageType } from './blocks/splitImageType';
import {
  multimediaArticle,
  editorialThread,
  researchElement,
  notebookEntry,
} from './documents/Site Maintainence/Blog/editorialSuite';
import { page } from './documents/Site Maintainence/Pages/page';
import { post } from './documents/Site Maintainence/Blog/post';
import goal from './documents/Goals and Tasks Tracker/goal';
import goalHub from './documents/Goals and Tasks Tracker/goalHub';
import task from './documents/Goals and Tasks Tracker/task';
import { sprint } from './documents/Project/sprint';
import { completedTask } from './documents/Goals and Tasks Tracker/completedTask';
import { category } from './documents/Site Maintainence/category';
import { project } from './documents/Project/Project/project';
import { researchDocument } from './documents/Project/Project/researchDocument';
import { timeline } from './documents/Timelines/timeline';
import { timelineEventNode } from './documents/Timelines/timelineEventNode';
import { settings } from './singletons/settings';
import { callToAction } from './objects/callToAction';
import { infoSection } from './objects/infoSection';
import { pullQuote } from './objects/pullQuote';
import { researchCitation } from './objects/researchCitation';
import { contextInput } from './objects/contextInput';
import { richTextContent } from './objects/richTextContent';
import { link } from './objects/link';

export const schemaTypes = [
  person,
  publisher,
  company,
  newsOrganization,
  source,
  film,
  book,
  logo,
  quote,
  integrations,
  sanityIntegration,
  vercelIntegration,
  githubIntegration,
  page,
  post,
  category,
  project,
  goal,
  goalHub,
  task,
  postThread,
  completedTask,
  referencedPeople,
  sprint,
  season,
  tvShowEpisode,
  documentary,
  tvShow,
  televisionNetwork,
  articleSeries,
  bookCover,
  crewMember,
  castMember,
  adminProfile,
  videoContent,
  researchDocument,
  youtubeChannel,
  mediaGallery,
  customImage,
  admin,
  multimediaArticle,
  editorialThread,
  researchElement,
  notebookEntry,
  contextInput,
  customFile,
  magazine,
  magazineArticle,
  magazineIssue,
  magazineIssueCover,
  magazinePage,
  relatedContent,
  voiceRecording,
  newspaper,
  newspaperArticle,
  newspaperIssue,
  newspaperHeadline,
  podcast,
  podcastEpisode,
  timeline,
  timelineEventNode,
  pageBuilderType,
  featuresType,
  heroType,
  splitImageType,
  foiaDatabase,
  foiaDocument,
  settings,
  richTextContent,
  callToAction,
  infoSection,
  link,
  pullQuote,
  researchCitation,
  seriesNavigation,
];
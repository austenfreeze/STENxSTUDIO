// studio/src/schemaTypes/index.ts

/**
 * ---------------------------------------------------------------------------------
 * Imports
 * ---------------------------------------------------------------------------------
 */

// Documents - People & Entities
import { admin } from './documents/People and Entities/People/Admin/admin';
import { adminProfile } from './documents/People and Entities/People/Admin/adminProfile';
import { castMember } from './documents/People and Entities/People/castMember';
import { crewMember } from './documents/People and Entities/People/crewMember';
import { person } from './documents/People and Entities/People/person';
import { company } from './documents/People and Entities/Entities/company';
import { newsOrganization } from './documents/People and Entities/Entities/newsOrganization';
import { publisher } from './documents/People and Entities/Entities/publisher';
import { televisionNetwork } from './documents/People and Entities/Entities/televisionNetwork';
import { quote } from './documents/People and Entities/quote';
import { source } from './documents/People and Entities/source';
import { youtubeChannel } from './documents/People and Entities/youtubeChannel';

// Documents - Media
import { customImage } from './documents/Media/Images/customImage';
import { logo } from './documents/Media/Images/logo';
import { mediaGallery } from './documents/Media/Images/mediaGallery';
import { voiceRecording } from './documents/Media/Audio/voiceRecording';
import { book } from './documents/Media/Bookshelf/Book/book';
import { bookCover } from './documents/Media/Bookshelf/Book/bookCoversFrontandBack';
import { articleSeries } from './documents/Media/Bookshelf/Magazine/articleSeries';
import { magazine } from './documents/Media/Bookshelf/Magazine/magazine';
import { magazineArticle } from './documents/Media/Bookshelf/Magazine/magazineArticle';
import { magazineIssue } from './documents/Media/Bookshelf/Magazine/magazineIssue';
import { magazineIssueCover } from './documents/Media/Bookshelf/Magazine/magazineIssueCover';
import { magazinePage } from './documents/Media/Bookshelf/Magazine/magazinePage';
import { newspaper } from './documents/Media/Bookshelf/Newspaper/newspaper';
import { newspaperArticle } from './documents/Media/Bookshelf/Newspaper/newspaperArticle';
import { newspaperHeadline } from './documents/Media/Bookshelf/Newspaper/newspaperHeadline';
import { newspaperIssue } from './documents/Media/Bookshelf/Newspaper/newspaperIssue';
import { documentary } from './documents/Media/Film TV Radio Music and Internet Media/documentary';
import { film } from './documents/Media/Film TV Radio Music and Internet Media/film';
import { podcast } from './documents/Media/Film TV Radio Music and Internet Media/Podcast/podcast';
import { podcastEpisode } from './documents/Media/Film TV Radio Music and Internet Media/Podcast/podcastEpisode';
import { season } from './documents/Media/Film TV Radio Music and Internet Media/Television/season';
import { tvShow } from './documents/Media/Film TV Radio Music and Internet Media/Television/tvShow';
import { tvShowEpisode } from './documents/Media/Film TV Radio Music and Internet Media/Television/televisionEpisode';
import { videoContent } from './documents/Media/Film TV Radio Music and Internet Media/videoContent';

// Documents - Project & Timelines
import { completedTask } from './documents/Project/completedTask';
import { goal } from './documents/Project/goal';
import { project } from './documents/Project/Project/project';
import { researchDocument } from './documents/Project/Project/researchDocument';
import { sprint } from './documents/Project/sprint';
import { event } from './documents/Timelines/event';
import { timeline } from './documents/Timelines/timeline';
import { timelineEventNode } from './documents/Timelines/timelineEventNode';

// Documents - Site Maintenance & Core Content
import { category } from './documents/Site Maintainence/category';
import { customFile } from './documents/Site Maintainence/customFile';
import { integrations } from './documents/Site Maintainence/Integrations/integrations';
import { githubIntegration } from './documents/Site Maintainence/Integrations/githubIntegration';
import { sanityIntegration } from './documents/Site Maintainence/Integrations/sanityIntegration';
import { vercelIntegration } from './documents/Site Maintainence/Integrations/vercelIntegration';
import { page } from './documents/Site Maintainence/Pages/page';
import { post } from './documents/Site Maintainence/Blog/post';
import { zing } from './documents/Site Maintainence/Blog/zing';
import { zingThread } from './documents/Site Maintainence/Blog/zingThread';
import { multimediaArticle, editorialThread, researchElement, notebookEntry } from './documents/Site Maintainence/Blog/editorialSuite';
import { relatedContent } from './documents/Site Maintainence/relatedContent';
import { referencedPeople } from './documents/Site Maintainence/referencedPeople';
import { timeDate } from './documents/Site Maintainence/timeDate'; // Corrected typo here

// Singletons
import { settings } from './singletons/settings';

// Objects
import { callToAction } from './objects/callToAction';
import { contextInput } from './objects/contextInput';
import { infoSection } from './objects/infoSection';
import { link } from './objects/link';
import { pullQuote } from './objects/pullQuote';
import { researchCitation } from './objects/researchCitation';
import { richTextContent } from './objects/richTextContent';
import { seriesNavigation } from './objects/seriesNavigation';

// Blocks
import { faqType } from './blocks/faqType';
import { featuresType } from './blocks/featuresType';
import { heroType } from './blocks/heroType';
import { pageBuilderType } from "./blocks/pageBuilderType";
import { splitImageType } from './blocks/splitImageType';

/**
 * ---------------------------------------------------------------------------------
 * Schema Export
 * ---------------------------------------------------------------------------------
 */
export const schemaTypes = [
  // Documents - People & Entities
  admin,
  adminProfile,
  castMember,
  crewMember,
  person,
  company,
  newsOrganization,
  publisher,
  televisionNetwork,
  quote,
  source,
  youtubeChannel,

  // Documents - Media
  customImage,
  logo,
  mediaGallery,
  voiceRecording,
  book,
  bookCover,
  articleSeries,
  magazine,
  magazineArticle,
  magazineIssue,
  magazineIssueCover,
  magazinePage,
  newspaper,
  newspaperArticle,
  newspaperHeadline,
  newspaperIssue,
  documentary,
  film,
  podcast,
  podcastEpisode,
  season,
  tvShow,
  tvShowEpisode,
  videoContent,

  // Documents - Project & Timelines
  completedTask,
  goal,
  project,
  researchDocument,
  sprint,
  event,
  timeline,
  timelineEventNode,

  // Documents - Site Maintenance & Core Content
  category,
  customFile,
  integrations,
  githubIntegration,
  sanityIntegration,
  vercelIntegration,
  page,
  post,
  zing,
  zingThread,
  multimediaArticle,
  editorialThread,
  researchElement,
  notebookEntry,
  relatedContent,
  referencedPeople,
  timeDate, // This is now correctly placed and comma-separated

  // Singletons
  settings,

  // Objects
  callToAction,
  contextInput,
  infoSection,
  link,
  pullQuote,
  researchCitation,
  richTextContent,
  seriesNavigation,

  // Blocks
  faqType,
  featuresType,
  heroType,
  pageBuilderType,
  splitImageType,
];
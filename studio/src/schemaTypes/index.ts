// studio/src/schemaTypes/index.ts

/**
 * ---------------------------------------------------------------------------------
 * Documents
 * ---------------------------------------------------------------------------------
 */

// People & Entities
import {person} from './documents/People and Entities/People/person'
import {publisher} from './documents/People and Entities/Entities/publisher'
import {company} from './documents/People and Entities/Entities/company'
import {newsOrganization} from './documents/People and Entities/Entities/newsOrganization'
import {source} from './documents/People and Entities/source'
import {quote} from './documents/People and Entities/quote'
import {crewMember} from './documents/People and Entities/People/crewMember'
import {castMember} from './documents/People and Entities/People/castMember'
import {youtubeChannel} from './documents/People and Entities/youtubeChannel'
import {mediaGallery} from './documents/Media/Images/mediaGallery'
import {customImage} from './documents/Media/Images/customImage'
import {voiceRecording} from './documents/Media/Audio/voiceRecording'
// Media
import {film} from './documents/Media/Film TV Radio Music and Internet Media/film'
import {book} from './documents/Media/Bookshelf/book/book'
import {bookCover} from './documents/Media/Bookshelf/Book/bookCoversFrontandBack'
import {magazine} from './documents/Media/Bookshelf/Magazine/magazine'
import {magazineArticle} from './documents/Media/Bookshelf/Magazine/magazineArticle'
import {magazineIssue} from './documents/Media/Bookshelf/Magazine/magazineIssue'
import {magazineIssueCover} from './documents/Media/Bookshelf/Magazine/magazineIssueCover'
import {magazinePage} from './documents/Media/Bookshelf/Magazine/magazinePage'

import {podcast} from './documents/Media/Film TV Radio Music and Internet Media/Podcast/podcast'
import {podcastEpisode} from './documents/Media/Film TV Radio Music and Internet Media/Podcast/podcastEpisode'


import {newspaper} from './documents/Media/Bookshelf/Newspaper/newspaper'
import {newspaperArticle} from './documents/Media/Bookshelf/Newspaper/newspaperArticle'
import {newspaperIssue} from './documents/Media/Bookshelf/Newspaper/newspaperIssue'
import {newspaperHeadline} from './documents/Media/Bookshelf/Newspaper/newspaperHeadline'

import {logo} from './documents/Media/Images/logo'
import {season} from './documents/Media/Film TV Radio Music and Internet Media/Television/season'
import {tvShowEpisode} from './documents/Media/Film TV Radio Music and Internet Media/Television/televisionEpisode'
import {documentary} from './documents/Media/Film TV Radio Music and Internet Media/documentary'
import {tvShow} from './documents/Media/Film TV Radio Music and Internet Media/Television/tvShow'
import {televisionNetwork} from './documents/People and Entities/Entities/televisionNetwork'

import {videoContent} from './documents/Media/Film TV Radio Music and Internet Media/videoContent'

// Integrations
import {integrations} from './documents/Site Maintainence/Integrations/integrations'
import {sanityIntegration} from './documents/Site Maintainence/Integrations/sanityIntegration'
import {vercelIntegration} from './documents/Site Maintainence/Integrations/vercelIntegration'
import {githubIntegration} from './documents/Site Maintainence/Integrations/githubIntegration'
import {customFile} from './documents/Site Maintainence/customFile'
import {relatedContent} from './documents/Site Maintainence/relatedContent'
import {admin} from './documents/People and Entities/People/Admin/admin';
import {adminProfile} from './documents/People and Entities/People/Admin/adminProfile';
import {articleSeries} from './documents/Media/Bookshelf/Magazine/articleSeries';
import {referencedPeople} from './documents/Site Maintainence/referencedPeople';
import { zing } from './documents/Site Maintainence/blog/zing';
import { zingThread } from './documents/Site Maintainence/blog/zingThread';
// import {commonCategorizationFields} from './documents/Site Maintainence/commonFields';
import {seriesNavigation} from './objects/seriesNavigation'; // Corrected import path for seriesNavigation


import { pageBuilderType } from "./blocks/pageBuilderType";
import { featuresType } from "./blocks/featuresType";
import { heroType } from "./blocks/heroType";
import { splitImageType } from "./blocks/splitImageType";

// Editorial Suite
import {
  multimediaArticle,
  editorialThread,
  researchElement,
  notebookEntry,
} from './documents/Site Maintainence/Blog/editorialSuite'


// Core Content
import {page} from './documents/Site Maintainence/Pages/page'
import {post} from './documents/Site Maintainence/Blog/post'
import {goal} from './documents/Project/goal'
import {sprint} from './documents/Project/sprint'
import {completedTask} from './documents/Project/completedTask'
import {category} from './documents/Site Maintainence/category' // Corrected path/import if category is in Project
import {project} from './documents/Project/Project/project'
import {researchDocument} from './documents/Project/Project/researchDocument'

import {timeline} from './documents/Timelines/timeline'
import {timelineEventNode} from './documents/Timelines/timelineEventNode'



/**
 * ---------------------------------------------------------------------------------
 * Singletons
 * ---------------------------------------------------------------------------------
 */

// Site Configuration
import {settings} from './singletons/settings'

/**
 * ---------------------------------------------------------------------------------
 * Objects
 * ---------------------------------------------------------------------------------
 */

// Portable Text & Content Blocks
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {pullQuote} from './objects/pullQuote'
import {researchCitation} from './objects/researchCitation'
import {contextInput} from './objects/contextInput'
import {richTextContent} from './objects/richTextContent'; // Import the new consolidated richTextContent

// General
import {link} from './objects/link'

/**
 * ---------------------------------------------------------------------------------
 * Schema Export
 * ---------------------------------------------------------------------------------
 *
 * All schemas defined above are exported here to be used by Sanity Studio.
 *
 */
export const schemaTypes = [
  // Documents
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
  category, // Ensure category is here if it's a document type
  project,
  goal,
  zing,
  zingThread,
  completedTask,
referencedPeople,
  sprint, // Assuming sprint should be here if it's a document type
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
  // Removed commonCategorizationFields from here as it's an array of fields, not a schema type
  admin, // Included
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

  // Singletons
  settings,

  // Objects
  richTextContent, // ADDED NEW CONSOLIDATED TYPE HERE
  callToAction,
  infoSection,
  link,
  pullQuote,
  researchCitation,
  seriesNavigation, // Correctly placed here as it's an object type
];

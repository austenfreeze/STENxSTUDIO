// schemas/index.ts

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
import {admin} from './documents/Site Maintainence/admin'
import {customFile} from './documents/Site Maintainence/customFile'
import {relatedContent} from './documents/Site Maintainence/relatedContent'

// Editorial Suite
import {editorialContent} from './documents/Site Maintainence/Blog/editorialContent'
import {
  multimediaArticle,
  editorialThread,
  researchElement,
  notebookEntry,
} from './documents/Site Maintainence/Blog/editorialSuite'

// Zing System
import {zing} from './documents/Site Maintainence/Blog/zing'
import {zingThread} from './documents/Site Maintainence/Blog/zingThread'

// Core Content
import {page} from './documents/Site Maintainence/Pages/page'
import {post} from './documents/Site Maintainence/Blog/post'
import {goal} from './documents/Project/goal'
import {completedTask} from './documents/Project/completedTask'
import {category} from './documents/Site Maintainence/category'
import {project} from './documents/Project/Project/project'

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
import {blockContent} from './objects/blockContent'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {pullQuote} from './objects/pullQuote'
import {researchCitation} from './objects/researchCitation'
import {contextInput} from './objects/contextInput'

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
  category,
  project,
  goal,
  completedTask,
  season,
  tvShowEpisode,
  documentary,
  tvShow,
  televisionNetwork,
  bookCover,
  crewMember,
  castMember,
  videoContent,
  youtubeChannel,
  mediaGallery,
  customImage,
  admin,
  editorialContent,
  multimediaArticle,
  editorialThread,
  researchElement,
  notebookEntry,
  zing,
  zingThread,
  contextInput, 
customFile,
magazine,
magazineArticle,
magazineIssue,
magazineIssueCover,
magazinePage,
relatedContent,
voiceRecording,


  // Singletons
  settings,

  // Objects
  blockContent,
  callToAction,
  infoSection,
  link,
  pullQuote,
  researchCitation,
]

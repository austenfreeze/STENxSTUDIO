// schemas/index.ts
import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {callToAction} from './objects/callToAction'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import {integrations} from './documents/integrations'
import {sanityIntegration} from './documents/sanityIntegration'
import {vercelIntegration} from './documents/vercelIntegration'
import {githubIntegration} from './documents/githubIntegration'
import {goal} from './documents/goal'
import {source} from './documents/source'
import {sublink} from './documents/sublink'
import {completedTask} from './documents/completedTask'
import {taskTag} from './documents/taskTag'
import {coverImage} from './objects/coverImage'
import {book} from './documents/book'
import {category} from './documents/category'
import {project} from './project'
import {logEntry} from './logEntry'
import {node} from './node'
import {timelineEvent} from './documents/Timeline/Project Timelines/timelineEvent'
import {timeline} from './documents/Timeline/timeline'
import {quote} from './documents/quote';
import {film} from './documents/film'

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  person,
  integrations,
  sanityIntegration,
  vercelIntegration,
  githubIntegration,
  goal,
  source,
  sublink,
  completedTask,
  taskTag,
  book,
  category,
  project,
  logEntry,
  node,
  timelineEvent,
  timeline,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  link,
  coverImage,
  quote,
  film,
]
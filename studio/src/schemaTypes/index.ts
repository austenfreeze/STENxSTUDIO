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
import {resource} from './documents/resource'
import {sublink} from './documents/sublink'
import {completedTask} from './documents/completedTask'
import {taskTag} from './documents/taskTag'
// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  person,
  // Objects
  blockContent,
  infoSection,
  callToAction,
  link,
  integrations,
sanityIntegration,
vercelIntegration,
githubIntegration,
goal,
resource,
sublink,
completedTask,
taskTag
]

import post from "./post"
import author from "./author"
import category from "./category"
import homepage from "./homepage"
import youtube from "./objects/youtube"
import callout from "./objects/callout"
import comment from "./comment"
import pageSection from "./objects/page-section"

export const schemaTypes = [
  // Documents
  post,
  author,
  category,
  homepage,
  comment,

  // Objects
  youtube,
  callout,
  pageSection,
]

import { groq } from 'next-sanity'

// --- Settings Query ---
export const settingsQuery = groq`
  *[_type == "settings"][0]{
    ...,
    "defaultAuthor": defaultAuthor->{
      firstName
    }
  }
`

// --- Post Queries ---

export const postsQuery = groq`
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    excerpt,
    content,
    "author": author->{
      firstName,
      lastName,
      picture
    }
  }
`

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;


// --- Page Queries ---

// Fetches a single page by its slug. This query is already correct.
export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0]
`

// Fetches all page slugs for generating static pages. This query is already correct.
export const pageSlugsQuery = groq`
  *[_type == "page" && defined(slug.current)]{"slug": slug.current}
`




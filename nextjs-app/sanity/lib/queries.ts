// sanity/lib/queries.ts
import {groq} from 'next-sanity'

// Used in: app/[slug]/page.tsx
export const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0]
`
export const pagesSlugsQuery = groq`
  *[_type == "page" && defined(slug.current)][].slug.current
`

// Used in: app/posts/[slug]/page.tsx
export const postQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    ...,
    "author": author->
  }
`
export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`

// Used in: app/sitemap.ts
export const sitemapQuery = groq`
  *[_type in ["page", "post"] && defined(slug.current)] {
    _type,
    "slug": slug.current,
    _updatedAt
  }
`

// Used in: app/layout.tsx
export const settingsQuery = groq`
  *[_type == "settings"][0]
`

// Used in: app/dashboard/integrations/page.tsx
export const integrationsQuery = groq`
  *[_type == "integration"]
`

import { defineQuery } from 'next-sanity'

// -----------------------------
// Block Content Fields
// -----------------------------
const blockContentFields = `
  ...,
  markDefs[]{
    ...,
    _type == "internalLink" => {
      "href": "/" + @.reference->slug.current
    },
    _type == "externalLink" => {
      "href": @.href,
      "openInNewTab": @.openInNewTab
    }
  },
  _type == "image" => {
    ...,
    "alt": alt
  },
  _type == "code" => {
    ...,
    language,
    code
  }
`

// -----------------------------
// Post Fields
// -----------------------------
const postFields = `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
  "categories": coalesce(
    categories[]->{
      _id,
      slug,
      title
    },
    []
  ),
  relatedPosts[]{
    _key,
    ...@->{_id, title, slug}
  }
`

// -----------------------------
// Singleton: Site Integration Overview
// -----------------------------
export const integrationsQuery = defineQuery(`
  *[_type == "integrations" && _id == "singleton-integrations"][0]{
    projectName,
    projectSlug,
    primaryDomain,
    projectLead,
    internalNotes,
    sanity->{
      projectId,
      dataset,
      studioUrl,
      previewUrl,
      studioVersion,
      clientVersion,
      lastDeployed
    },
    vercel->{
      projectName,
      deploymentUrl,
      dashboardUrl,
      team,
      domains,
      lastCommit
    },
    github->{
      repoUrl,
      org,
      defaultBranch,
      lastCommitSha,
      webhookUrl
    }
  }
`)

// -----------------------------
// General Site Settings
// -----------------------------
export const settingsQuery = defineQuery(`
  *[_type == "settings"][0]{
    title,
    description,
    ogImage {
      asset->{
        url
      },
      metadataBase
    }
  }
`)

// -----------------------------
// Slugs
// -----------------------------
export const pagesSlugsQuery = defineQuery(`
  *[_type == "page" && defined(slug.current)]{
    "slug": slug.current
  }
`)

export const postsSlugsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)]{
    "slug": slug.current
  }
`)

// -----------------------------
// Page Queries
// -----------------------------
export const pageQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    description,
    "slug": slug.current,
    pageBuilder[]{
      ...,
      _type == "callToAction" => {
        link {
          ...,
          "page": page->slug.current,
          "post": post->slug.current
        }
      },
      _type == "infoSection" => {
        content[]{
          ${blockContentFields}
        }
      },
      _type == "blockContent" => {
        ${blockContentFields}
      }
    }
  }
`)

// -----------------------------
// Post Queries
// -----------------------------
export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    ${postFields},
    content[]{
      ${blockContentFields}
    }
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc)[0...$limit] {
    ${postFields}
  }
`)

// -----------------------------
// Sitemap Data
// -----------------------------
export const sitemapQuery = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt
  }
`)

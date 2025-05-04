import { defineQuery } from "next-sanity"

// Singleton: Site Integration Overview
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

// General Site Settings
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

// Individual Page Queries
export const getPageQuery = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
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
          ...,
          markDefs[]{
            ...,
            _type == "link" => {
              "page": page->slug.current,
              "post": post->slug.current
            }
          }
        }
      }
    }
  }
`)

// Slugs
export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]{
    "slug": slug.current
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]{
    "slug": slug.current
  }
`)

// Posts
const postFields = `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture}
`

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    ${postFields},
    content[]{
      ...,
      markDefs[]{
        ...,
        _type == "link" => {
          "page": page->slug.current,
          "post": post->slug.current
        }
      }
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

// Sitemap
export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt
  }
`)

import { createClient } from "next-sanity"
import { groq } from "next-sanity"

// Create a regular client
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-08-31",
  useCdn: process.env.NODE_ENV === "production",
})

// Create a preview client
export const previewClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2023-08-31",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  perspective: "previewDrafts",
})

// Function to get homepage data
export async function getHomepage(preview = false) {
  try {
    console.log("Fetching homepage data, preview mode:", preview)

    // Select the appropriate client
    const currentClient = preview ? previewClient : client

    // Use a query that includes sections
    const query = groq`*[_type == "homepage"][0]{
      _id,
      title,
      heroHeading,
      heroSubheading,
      heroImage,
      sections,
      "featuredPosts": featuredPosts[]->{ 
        _id, 
        title, 
        "slug": slug.current,
        mainImage,
        excerpt
      }
    }`

    // Fetch the data
    const data = await currentClient.fetch(query)

    console.log("Homepage data fetched:", data ? "success" : "null")

    // Return the data with fallbacks
    return {
      _id: data?._id || "homepage",
      title: data?.title || "Welcome to STEN-STUDIO",
      heroHeading: data?.heroHeading || "Modern Content Platform",
      heroSubheading: data?.heroSubheading || "A high-performance website built with Next.js and Sanity CMS.",
      heroImage: data?.heroImage || null,
      sections: data?.sections || [],
      featuredPosts: data?.featuredPosts || [],
    }
  } catch (error) {
    console.error("Error fetching homepage data:", error)

    // Return default data in case of error
    return {
      _id: "homepage",
      title: "Welcome to STEN-STUDIO",
      heroHeading: "Modern Content Platform",
      heroSubheading: "A high-performance website built with Next.js and Sanity CMS.",
      heroImage: null,
      sections: [],
      featuredPosts: [],
    }
  }
}

// Function to get a post by slug
export async function getPostBySlug(slug: string, preview = false) {
  try {
    const currentClient = preview ? previewClient : client
    return await currentClient.fetch(
      groq`*[_type == "post" && slug.current == $slug][0]{
        _id,
        title,
        "slug": slug.current,
        mainImage,
        body,
        publishedAt,
        "author": author->{name, image},
        categories[]->{_id, title}
      }`,
      { slug },
    )
  } catch (error) {
    console.error("Error fetching post by slug:", error)
    return null
  }
}

// Function to get all posts
export async function getAllPosts(preview = false) {
  try {
    const currentClient = preview ? previewClient : client
    return await currentClient.fetch(
      groq`*[_type == "post"] | order(publishedAt desc){
        _id,
        title,
        "slug": slug.current,
        mainImage,
        excerpt,
        publishedAt,
        "author": author->{name, image},
        categories[]->{_id, title}
      }`,
    )
  } catch (error) {
    console.error("Error fetching all posts:", error)
    return []
  }
}

// Function to search content
export async function searchContent(query: string, preview = false) {
  try {
    const currentClient = preview ? previewClient : client
    return await currentClient.fetch(
      groq`{
        "posts": *[_type == "post" && (title match $query || excerpt match $query)][0...10]{
          _id, title, "slug": slug.current, excerpt, mainImage
        }
      }`,
      { query: `*${query}*` },
    )
  } catch (error) {
    console.error("Error searching content:", error)
    return { posts: [] }
  }
}

// Add this function to get a document by ID
export async function getDocumentById(id: string, preview = false) {
  try {
    const currentClient = preview ? previewClient : client
    return await currentClient.fetch(groq`*[_id == $id][0]`, { id })
  } catch (error) {
    console.error("Error fetching document by ID:", error)
    return null
  }
}

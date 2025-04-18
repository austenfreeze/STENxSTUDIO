import { client } from "@/lib/sanity.client"
import { groq } from "next-sanity"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://your-website.com"

export default async function sitemap() {
  const posts = await client.fetch(
    groq`*[_type == "post"] {
      "slug": slug.current,
      _updatedAt
    }`,
  )

  const categories = await client.fetch(
    groq`*[_type == "category"] {
      title,
      _updatedAt
    }`,
  )

  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug}`,
    lastModified: new Date(post._updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.title.toLowerCase()}`,
    lastModified: new Date(category._updatedAt),
    changeFrequency: "monthly",
    priority: 0.5,
  }))

  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/posts`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ]

  return [...staticUrls, ...postUrls, ...categoryUrls]
}

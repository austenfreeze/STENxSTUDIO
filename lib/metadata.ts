import { client } from "./sanity.client"
import { groq } from "next-sanity"
import { urlForImage } from "./sanity.image"

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://your-website.com"

export async function generateMetadata({ params, type = "page", preview = false }) {
  let data

  try {
    if (type === "homepage") {
      data = await client.fetch(
        groq`*[_type == "homepage"][0]{
          title,
          seo {
            metaTitle,
            metaDescription,
            shareImage
          }
        }`,
      )
    } else if (type === "post" && params?.slug) {
      data = await client.fetch(
        groq`*[_type == "post" && slug.current == $slug][0]{
          title,
          excerpt,
          mainImage,
          seo {
            metaTitle,
            metaDescription,
            shareImage
          }
        }`,
        { slug: params.slug },
      )
    }

    if (!data) return null

    const metaTitle = data.seo?.metaTitle || data.title || "STEN-STUDIO"
    const metaDescription = data.seo?.metaDescription || data.excerpt || "A modern content platform"
    const shareImage = data.seo?.shareImage || data.mainImage

    const metadata = {
      title: metaTitle,
      description: metaDescription,
      openGraph: {
        title: metaTitle,
        description: metaDescription,
        url: `${baseUrl}${type === "post" ? `/posts/${params.slug}` : ""}`,
        images: shareImage
          ? [
              {
                url: urlForImage(shareImage)?.width(1200).height(630).url() || "",
                width: 1200,
                height: 630,
                alt: metaTitle,
              },
            ]
          : [],
        type: type === "post" ? "article" : "website",
      },
      twitter: {
        card: "summary_large_image",
        title: metaTitle,
        description: metaDescription,
        images: shareImage ? [urlForImage(shareImage)?.width(1200).height(630).url() || ""] : [],
      },
    }

    return metadata
  } catch (error) {
    console.error("Error generating metadata:", error)

    // Return default metadata
    return {
      title: "STEN-STUDIO",
      description: "A modern content platform",
    }
  }
}

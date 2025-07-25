import createImageUrlBuilder from '@sanity/image-url'
import type { Image } from 'sanity'
import type { Metadata } from 'next'

import { dataset, projectId } from '@/sanity/lib/api'
import type { Link } from '@/sanity.types'

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
})

export const urlForImage = (source: Image) => {
  // Ensure that source image has a valid asset ref
  if (!source?.asset?._ref) {
    return undefined
  }
  return imageBuilder?.image(source).auto('format').fit('max')
}

export function resolveOpenGraphImage(image: any, width = 1200, height = 627) {
  if (!image) return
  const url = urlForImage(image)?.width(width).height(height).fit('crop').url()
  if (!url) return
  return { url, alt: image?.alt as string, width, height }
}

// Helper function to generate metadata
export function defineMetadata({
  title,
  description,
  image,
}: {
  title?: string
  description?: string
  image?: Image
}): Metadata {
  const openGraphImage = resolveOpenGraphImage(image)

  return {
    title: title || 'STENxSTUDIO',
    description: description || 'A Next.js and Sanity project.',
    openGraph: {
      title: title || 'STENxSTUDIO',
      description: description || 'A Next.js and Sanity project.',
      ...(openGraphImage && { images: [openGraphImage] }),
    },
  }
}

// Helper function to resolve links
export function linkResolver(link: Link | undefined): string | null {
  if (!link) return null

  if (!link.linkType && link.href) {
    link.linkType = 'href'
  }

  switch (link.linkType) {
    case 'href':
      return link.href || null
    case 'page':
      // Assumes the referenced page document has a 'slug' field with a 'current' property
      if (link?.page && typeof link.page === 'object' && 'slug' in link.page) {
        return `/${(link.page as any).slug.current}`
      }
      return null
    case 'post':
      // Assumes the referenced post document has a 'slug' field with a 'current' property
      if (link?.post && typeof link.post === 'object' && 'slug' in link.post) {
        return `/posts/${(link.post as any).slug.current}`
      }
      return null
    default:
      return null
  }
}
import { client } from "./client"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url/lib/types"

const builder = imageUrlBuilder(client)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

// Add this export that your CustomPortableText is looking for
export function urlForImage(source: SanityImageSource) {
  return builder.image(source)
}

// Alternative: you could also export urlFor as urlForImage
// export { urlFor as urlForImage }

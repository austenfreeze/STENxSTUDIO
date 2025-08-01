import { client } from "./client"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url"

const builder = imageUrlBuilder(client)

// Renamed export to 'urlFor' to match common usage and your import
export const urlFor = (source: SanityImageSource) => {
  return builder.image(source)
}
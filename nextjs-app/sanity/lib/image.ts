import { client } from "./client"
import imageUrlBuilder from "@sanity/image-url"
import type { SanityImageSource } from "@sanity/image-url"

const builder = imageUrlBuilder(client)

export const urlForImage = (source: SanityImageSource) => {
  return builder.image(source)
}

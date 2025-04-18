import createImageUrlBuilder from "@sanity/image-url"

const imageBuilder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
})

export const urlForImage = (source) => {
  if (!source) {
    console.warn("Source is missing in urlForImage")
    return null
  }

  if (!source.asset) {
    console.warn("Asset is missing in urlForImage source")
    return null
  }

  try {
    return imageBuilder.image(source)
  } catch (error) {
    console.error("Error creating image URL:", error)
    return null
  }
}

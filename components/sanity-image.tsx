"use client"

import Image from "next/image"
import { useState } from "react"

interface SanityImageProps {
  image: any
  alt: string
  width?: number
  height?: number
  priority?: boolean
  className?: string
  sizes?: string
}

export default function SanityImage({
  image,
  alt,
  width = 800,
  height = 600,
  priority = false,
  className = "",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: SanityImageProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  // Handle case where image is null or undefined
  if (!image) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width: `${width}px`, height: `${height}px`, maxWidth: "100%" }}
      >
        <span className="text-gray-400">No image</span>
      </div>
    )
  }

  // Handle case where image.asset is missing
  if (!image.asset) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width: `${width}px`, height: `${height}px`, maxWidth: "100%" }}
      >
        <span className="text-gray-400">Invalid image</span>
      </div>
    )
  }

  // Construct the image URL manually
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ""
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production"

  // Extract the image ID from the reference
  let imageId = ""
  let imageFormat = "jpg" // Default format

  if (typeof image.asset._ref === "string") {
    // Handle reference format: image-abc123-3000x2000-jpg
    const parts = image.asset._ref.split("-")
    if (parts.length >= 2) {
      imageId = parts[1]
      // Check if there's a format specified
      if (parts.length >= 4) {
        imageFormat = parts[parts.length - 1]
      }
    }
  } else if (typeof image.asset._id === "string") {
    // Handle ID format: image-abc123
    const parts = image.asset._id.split("-")
    if (parts.length >= 2) {
      imageId = parts[1]
    }
  }

  if (!imageId) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width: `${width}px`, height: `${height}px`, maxWidth: "100%" }}
      >
        <span className="text-gray-400">Invalid image ID</span>
      </div>
    )
  }

  // Construct the URL with width and height parameters for resizing
  const imageUrl = `https://cdn.sanity.io/images/${projectId}/${dataset}/${imageId}.${imageFormat}?w=${width}&h=${height}&fit=crop&auto=format`

  return (
    <div className={`overflow-hidden ${isLoading ? "bg-gray-100 animate-pulse" : ""}`}>
      {!hasError ? (
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={alt || "Image"}
          width={width}
          height={height}
          priority={priority}
          className={`transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"} ${className}`}
          sizes={sizes}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            console.error("Image failed to load:", imageUrl)
            setHasError(true)
            setIsLoading(false)
          }}
        />
      ) : (
        <div
          className={`bg-gray-200 flex items-center justify-center ${className}`}
          style={{ width: `${width}px`, height: `${height}px`, maxWidth: "100%" }}
        >
          <span className="text-gray-400">Failed to load image</span>
        </div>
      )}
    </div>
  )
}

import { createClient } from "next-sanity"

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01"

// Validate configuration
if (!projectId || !dataset) {
  console.warn("Sanity configuration is incomplete. Check your environment variables.")
}

// Create client with error handling
export const client = createClient({
  projectId: projectId || "",
  dataset: dataset || "production",
  apiVersion,
  useCdn: process.env.NODE_ENV === "production",
  // Add a timeout to prevent hanging requests
  requestTimeout: 10000,
})

// For authenticated requests (like mutations)
export const writableClient = createClient({
  projectId: projectId || "",
  dataset: dataset || "production",
  apiVersion,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false, // We need to use uncached data for mutations
})

// Helper function to check if Sanity is configured properly
export function isSanityConfigured() {
  return Boolean(projectId && dataset)
}

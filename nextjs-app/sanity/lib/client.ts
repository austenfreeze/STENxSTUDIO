import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId, studioUrl } from "@/sanity/lib/api";

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
  // REMOVE OR COMMENT OUT THIS LINE FOR PUBLIC CLIENT:
  // token: process.env.SANITY_VIEWER_TOKEN, // THIS TOKEN IS FOR PREVIEW/DRAFT MODE
  stega: {
    // Only configure stega if draft mode is enabled and you're using it for preview
    // If this client is strictly for published content, you might not need stega here.
    // However, if sanityFetch handles stega internally based on isDraftMode, keeping it is fine.
    studioUrl,
  },
});

// IMPORTANT: If you have another client for DRAFT mode or authenticated writes,
// that client should have the token configured, e.g.:
/*
export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false, // Don't use CDN for draft content
  perspective: "previewDrafts",
  token: process.env.SANITY_VIEWER_TOKEN, // Use the token here for drafts
  stega: {
    studioUrl,
  },
});
*/
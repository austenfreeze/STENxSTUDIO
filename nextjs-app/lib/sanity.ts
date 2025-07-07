// lib/sanity.ts
import { createClient, SanityClient } from 'next-sanity'; // Import SanityClient type

// For server-side operations (write access, or specific reads)
export const sanityClient: SanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2023-05-03',
  useCdn: false, // Don't use CDN for authenticated writes
  token: process.env.SANITY_API_WRITE_TOKEN!, // Use your write token here (SERVER-SIDE ONLY!)
});

// For public-facing client-side reads (no token needed, or a read-only token)
export const publicSanityClient: SanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2023-05-03',
  useCdn: true, // Use CDN for public reads
});
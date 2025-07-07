// lib/sanity.ts
import { createClient } from 'next-sanity';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Your Sanity Project ID
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,     // Your Sanity Dataset
  apiVersion: '2023-05-03', // Use a recent date
  useCdn: false, // Must be false for write operations
  token: process.env.SANITY_API_WRITE_TOKEN, // Your write token
});
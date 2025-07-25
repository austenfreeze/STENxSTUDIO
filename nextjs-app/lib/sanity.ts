// C:\Users\Administrator\Desktop\STENxSTUDIO\nextjs-app\lib\sanity.ts
import { createClient } from 'next-sanity';

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2023-05-03', // Or your specific API version for write operations
  useCdn: false, // Must be false for write operations
  token: process.env.SANITY_API_WRITE_TOKEN, // Your write token
});
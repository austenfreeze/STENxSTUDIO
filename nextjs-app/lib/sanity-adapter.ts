// lib/sanity-adapter.ts
import { SanityAdapter as createSanityAdapter } from 'next-auth-sanity';
import { sanityClient } from './sanity'; // Import your configured Sanity client

// If using next-auth-sanity, it typically provides the adapter function
// that takes a SanityClient instance.
// Ensure your Sanity Studio has 'user', 'account', and 'session' schemas defined
// as per next-auth-sanity's requirements.
export function SanityAdapter(options = {}) {
  return createSanityAdapter(sanityClient, options);
}
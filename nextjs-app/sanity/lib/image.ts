// sanity/lib/image.ts
import createImageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { client } from './client'; // Assumes you have a client.ts file

// Get a pre-configured url-builder from your Sanity client
const imageBuilder = createImageUrlBuilder(client);

// Helper function to get the image URL
export const urlFor = (source: SanityImageSource) => {
  return imageBuilder.image(source);
};
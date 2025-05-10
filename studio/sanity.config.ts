// Optimized Sanity Studio Configuration for STENxSTUDIO
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/schemaTypes';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';
import { assist } from '@sanity/assist';

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'vzgvkxtx';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

export default defineConfig({
  name: 'stenxstudio',
  title: 'STENxSTUDIO',
  projectId,
  dataset,
  plugins: [
    structureTool(),
    visionTool(),
    unsplashImageAsset(),
    assist(),
  ],
  schema: { types: schemaTypes },
  security: { cors: { allowCredentials: true, origins: ['https://stenxstudio.sanity.studio'] } }
});

// studio/sanity.config.tsx

import { defineConfig, isDev } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/schemaTypes'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { assist } from '@sanity/assist'
import { codeInput } from '@sanity/code-input'
import { myTheme } from './src/theme'
import { presentationTool } from 'sanity/presentation'
import { resolve } from '../nextjs-app/sanity/presentation/resolve'
import { structure } from './src/structure'
import { media } from 'sanity-plugin-media'
import { colorInput } from '@sanity/color-input'
import { imageHotspotArrayPlugin } from "sanity-plugin-hotspot-array";
import { defaultDocumentNode } from './src/structure/defaultDocumentNode'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'vzgvkxtx'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// IMPORTANT: Get the viewer token from environment variables.
// This token is crucial for authenticating preview requests.
const viewerToken = process.env.SANITY_VIEWER_TOKEN;

// Determine the base preview URL dynamically based on the environment.
const basePreviewUrl = isDev
  ? 'http://localhost:3000'
  : process.env.SANITY_STUDIO_PREVIEW_ORIGIN || 'https://stenxstudio.vercel.app';

export default defineConfig({
  name: 'stenxstudio',
  title: 'STENxSTUDIO',
  projectId,
  dataset,
  theme: myTheme,
  plugins: [
    structureTool({ structure, defaultDocumentNode }),
    visionTool(),
    media(),
    unsplashImageAsset(),
    assist(),
    colorInput(),
    codeInput(),
    imageHotspotArrayPlugin(),
    presentationTool({
      resolve,
      previewUrl: {
        origin: basePreviewUrl,
        preview: '/',
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
        // THIS IS THE CRUCIAL ADDITION: Pass the viewer token here.
        // This tells the Presentation tool to include this token in requests
        // to your frontend for previewing draft content.
        token: viewerToken,
      },
      allowOrigins: [
        'http://localhost:3000',
        'http://localhost:3333',
        'https://stenxstudio.vercel.app',
        'https://stenxstudio-stenxstudio.vercel.app',
        'https://xsten.co',
        'https://*.vercel.app',
      ],
      unstable_enableLiveEdit: true,
    }),
  ],
  schema: { types: schemaTypes },
})
// /studio/sanity.config.tsx

import { defineConfig } from 'sanity'
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
import { defaultDocumentNode } from './src/structure/defaultDocumentNode'
import { media } from 'sanity-plugin-media'
import {colorInput} from '@sanity/color-input'
import { imageHotspotArrayPlugin } from "sanity-plugin-hotspot-array";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'vzgvkxtx'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

export default defineConfig({
  name: 'stenxstudio',
  title: 'STENxSTUDIO',
  projectId,
  dataset,
  theme: myTheme,
  plugins: [
    structureTool({
      structure,
      defaultDocumentNode,
    }),
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
    origin: process.env.SANITY_STUDIO_PREVIEW_ORIGIN,
    preview: '/',
    previewMode: {
      enable: '/api/draft-mode/enable',
      disable: '/api/draft-mode/disable',
    },
  },
  // Add live editing capabilities
  unstable_enableLiveEdit: true,
  // Enhanced preview locations
  locate: (params, context) => {
    // Custom location resolver for your content types
  }
}),
  ],
  schema: { types: schemaTypes },
})

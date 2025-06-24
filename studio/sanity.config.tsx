import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/schemaTypes'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'
import { assist } from '@sanity/assist'
import { codeInput } from '@sanity/code-input'
import { Stack, Text, Card } from '@sanity/ui'
import type { FormFieldProps } from 'sanity'
import { myTheme } from './src/theme' // 👈 Import the local theme!
import { presentationTool } from 'sanity/presentation'
import { resolve } from '../nextjs-app/sanity/presentation/resolve'
import { structure, getDefaultDocumentNode } from './src/structure' // 👈 Correct import!

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'vzgvkxtx'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

// rest of your config...
export default defineConfig({
  name: 'stenxstudio',
  title: 'STENxSTUDIO',
  projectId,
  dataset,
  theme: myTheme,
  plugins: [
    structureTool({
      structure,
      defaultDocumentNode: getDefaultDocumentNode, // 👈 Correct key & value
    }),
    visionTool(),
    unsplashImageAsset(),
    assist(),
    codeInput(),
    presentationTool({
      resolve,
      previewUrl: {
        origin: process.env.SANITY_STUDIO_PREVIEW_ORIGIN,
        preview: "/",
        previewMode: {
          enable: '/api/draft-mode/enable',
          disable: '/api/draft-mode/disable',
        },
      },
    }),
  ],
  schema: { types: schemaTypes },
  form: {
    components: {
      // your custom field components
    },
  },
})

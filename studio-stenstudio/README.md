# Sanity Studio for STEN-STUDIO

This is the Sanity Studio for managing content for the STEN-STUDIO website.

## Getting Started

1. Run `npm install` to install dependencies
2. Run `npm run dev` to start the development server
3. Open [http://localhost:3333](http://localhost:3333) to view the Studio

## Deployment

Run `npm run deploy` to deploy the Studio to Sanity's hosted service.
\`\`\`

## Step 2: Create the Sanity configuration files

```js file="studio-stenstudio/sanity.config.ts"
import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemas"
import { myTheme } from "./theme"
import { deskStructure } from "./deskStructure"
import { media } from "sanity-plugin-media"
import { colorInput } from "@sanity/color-input"
import { codeInput } from "@sanity/code-input"

export default defineConfig({
  name: "default",
  title: "STEN-STUDIO",

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "mlqat5p5",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",

  plugins: [
    deskTool({
      structure: deskStructure,
    }),
    visionTool(),
    media(),
    colorInput(),
    codeInput(),
  ],

  schema: {
    types: schemaTypes,
  },

  theme: myTheme,
})

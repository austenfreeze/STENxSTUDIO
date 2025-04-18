import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import { visionTool } from "@sanity/vision"
import { schemaTypes } from "./schemas"
import { myTheme } from "./theme"
import { deskStructure } from "./deskStructure"
import { media } from "sanity-plugin-media"
import { colorInput } from "@sanity/color-input"
import { codeInput } from "@sanity/code-input"
import { visualEditing } from "./plugins/visual-editing"
import { StudioNavbar } from "./components/studio-navbar"

const config = defineConfig({
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
    visualEditing({
      previewUrl: process.env.NEXT_PUBLIC_BASE_URL,
    }),
  ],

  schema: {
    types: schemaTypes,
  },

  studio: {
    components: {
      navbar: StudioNavbar,
    },
  },

  theme: myTheme,
})

export default config

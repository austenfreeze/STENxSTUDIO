import {defineCliConfig} from 'sanity/cli'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'vzgvkxtx'
const dataset = process.env.SANITY_STUDIO_DATASET || 'production'
const studioHost = process.env.SANITY_STUDIO_HOSTNAME || 'stenxstudio'

export default defineCliConfig({
  api: {
    projectId,
    dataset,
  },
 mediaLibrary: {
    // set the path relative to the location of sanity.cli.ts.
    aspectsPath: 'aspects',
  },
  studioHost,
  autoUpdates: true,
})

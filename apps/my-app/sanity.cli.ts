import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
server: {
port: 3336,
},
  app: {
    organizationId: 'orGeNlWxv',
    entry: './src/App.tsx',
  },
})

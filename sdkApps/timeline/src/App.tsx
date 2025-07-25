// src/App.tsx
import { SanityApp } from '@sanity/sdk-react'
import './App.css'
import { DocumentList } from './components/DocumentList'

export default function App() {
  return (
    <div className="app-container">
      <SanityApp
        config={{
          projectId: process.env.SANITY_PROJECT_ID || "vzgvkxtx",
          dataset: process.env.SANITY_DATASET || "production",
          apiVersion: process.env.SANITY_API_VERSION || "2024-10-28",
        }}
        fallback={<div>Loading...</div>}
      >
        <h1>Welcome to your Sanity SDK App!</h1>
        <DocumentList type="integrations" />
      </SanityApp>
    </div>
  )
}

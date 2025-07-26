// src/App.tsx
import {type SanityConfig} from '@sanity/sdk'
import {SanityApp} from '@sanity/sdk-react'
import {Flex, Spinner} from '@sanity/ui' // Keep Sanity UI imports
import { DashboardLayout } from './DashboardLayout' // Correctly import the new DashboardLayout
import { SanityUI } from './SanityUI' // Keep the SanityUI wrapper

// In a real Next.js application, this token would be securely passed
// from your server-side (e.g., getServerSideProps) as a prop to the
// component rendering this SDK App. For local development of the SDK App,
// you might temporarily hardcode it or use an environment variable.
// NEVER expose your Sanity API token directly in client-side code in a production build.
const SANITY_API_TOKEN_FOR_LOCAL_DEV = 'skZDhiXq6B3jQli1WJlvdukA7jOH8g15YWPLsFy20eSOJKkdgm3o2Mupc9LUCOCyUMWLsEcvzpKlgude6NTCpxYhDrbApUohrbcWrBBX1AQ5CBh7w85hXulwVTXSJEwSOliVRGoFkeCheQiExtnVLo4S9mTM1uusctKmUGsRCfgB2ootBUzA'; // Replace with a token for local testing

function App() {
  const config: SanityConfig[] = [
    {
      projectId: 'vzgvkxtx', // Your provided project ID
      dataset: 'production', // Your provided dataset
      token: SANITY_API_TOKEN_FOR_LOCAL_DEV, // Use the token for authentication
    }
  ]

  function Loading() {
    return (
      <Flex justify="center" align="center" width="100vw" height="fill">
        <Spinner />
      </Flex>
    )
  }

  return (
    <SanityUI> {/* Keep the SanityUI wrapper */}
      <SanityApp config={config} fallback={<Loading />}> {/* Keep the custom Loading fallback */}
        <DashboardLayout /> {/* Render your new DashboardLayout component */}
      </SanityApp>
    </SanityUI>
  )
}

export default App

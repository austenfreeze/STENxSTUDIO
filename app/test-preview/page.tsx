import { draftMode } from "next/headers"
import Link from "next/link"

export default async function TestPreviewPage() {
  // Handle draftMode as an async function
  let isPreviewMode = false

  try {
    // In Next.js 15, draftMode is an async function
    const draftModeData = await draftMode()
    isPreviewMode = draftModeData?.isEnabled || false
  } catch (error) {
    console.error("Error getting draft mode:", error)

    // Fallback for older Next.js versions
    try {
      const syncDraftMode = draftMode()
      isPreviewMode = syncDraftMode?.isEnabled || false
    } catch (syncError) {
      console.error("Error getting sync draft mode:", syncError)
    }
  }

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Preview Mode Test Page</h1>

        <div className="p-4 mb-6 rounded-md bg-gray-100">
          <p className="font-medium">Preview Mode Status:</p>
          <p className={`text-lg ${isPreviewMode ? "text-green-600" : "text-red-600"}`}>
            {isPreviewMode ? "ENABLED" : "DISABLED"}
          </p>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold mb-2">Enable Preview Mode</h2>
            <Link
              href={`/api/preview?secret=${process.env.SANITY_PREVIEW_SECRET}`}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              Enable Preview
            </Link>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Disable Preview Mode</h2>
            <Link
              href="/api/disable-preview?redirect=/test-preview"
              className="inline-block bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Disable Preview
            </Link>
          </div>

          <div className="pt-4 border-t">
            <Link href="/" className="text-blue-600 hover:underline">
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

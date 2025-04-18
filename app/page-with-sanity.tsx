import { getHomepage } from "@/lib/sanity.query"
import Link from "next/link"
import SanityImage from "@/components/sanity-image"
import { draftMode } from "next/headers"

export const revalidate = 60 // Revalidate pages every 60 seconds

export default async function HomeWithSanity() {
  try {
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

    // Fetch homepage data
    const homepage = await getHomepage(isPreviewMode)

    return (
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <div className="container mx-auto px-4 py-20">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl font-bold mb-6">{homepage.heroHeading || "Welcome to STEN-STUDIO"}</h1>
                <p className="text-xl opacity-90 mb-8">{homepage.heroSubheading || "A modern content platform"}</p>
                <div className="flex gap-4">
                  <Link
                    href="/posts"
                    className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                  >
                    Explore Posts
                  </Link>
                  {isPreviewMode && (
                    <Link
                      href="/api/disable-preview?redirect=/"
                      className="inline-block bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors"
                    >
                      Exit Preview
                    </Link>
                  )}
                </div>
              </div>
              {homepage.heroImage && (
                <div className="relative h-[300px] rounded-lg overflow-hidden shadow-xl">
                  <SanityImage
                    image={homepage.heroImage}
                    alt={homepage.heroHeading || "Hero image"}
                    width={800}
                    height={600}
                    priority
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Preview Mode Indicator */}
        {isPreviewMode && (
          <div className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg">
            <p className="text-sm font-medium">Preview Mode Enabled</p>
          </div>
        )}
      </main>
    )
  } catch (error) {
    console.error("Error in Home component:", error)

    return (
      <main className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to STEN-STUDIO</h1>
          <p className="text-xl mb-8 text-red-600">An error occurred while rendering this page.</p>
          <pre className="bg-gray-100 p-4 rounded-md text-left overflow-auto max-w-2xl mx-auto mb-8">
            {error instanceof Error ? error.message : "Unknown error"}
          </pre>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Refresh
            </Link>
          </div>
        </div>
      </main>
    )
  }
}

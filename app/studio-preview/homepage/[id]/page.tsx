import { getDraftMode } from "@/lib/draft-mode"
import { getDocumentById } from "@/lib/sanity.query"
import { PreviewWrapper } from "@/components/shared/preview-wrapper"
import { InlineEditor } from "@/components/shared/inline-editor"
import SanityImage from "@/components/sanity-image"
import { SectionRenderer } from "@/components/section-renderer"
import { notFound } from "next/navigation"
import Link from "next/link"

export default async function HomepagePreviewPage({ params }: { params: { id: string } }) {
  try {
    // Get draft mode status
    const { isEnabled: isPreviewMode } = await getDraftMode()

    if (!isPreviewMode) {
      notFound()
    }

    // Fetch homepage data by ID
    const homepage = await getDocumentById(params.id, true)

    if (!homepage || homepage._type !== "homepage") {
      notFound()
    }

    return (
      <PreviewWrapper preview={isPreviewMode} documentId={params.id} documentType="homepage">
        <main>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <div className="container mx-auto px-4 py-20">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <InlineEditor
                    value={homepage.heroHeading || "Welcome to STEN-STUDIO"}
                    documentId={params.id}
                    field="heroHeading"
                    documentType="homepage"
                    preview={isPreviewMode}
                    className="text-4xl font-bold mb-6"
                    as="h1"
                  />

                  <InlineEditor
                    value={homepage.heroSubheading || "A modern content platform"}
                    documentId={params.id}
                    field="heroSubheading"
                    documentType="homepage"
                    preview={isPreviewMode}
                    className="text-xl opacity-90 mb-8"
                    as="p"
                  />

                  <div className="flex gap-4">
                    <Link
                      href="/posts"
                      className="inline-block bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-blue-50 transition-colors"
                    >
                      Explore Posts
                    </Link>
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

          {/* Dynamic Sections */}
          {homepage.sections && homepage.sections.length > 0 && (
            <div>
              {homepage.sections.map((section, index) => (
                <SectionRenderer key={section._key || index} section={section} preview={isPreviewMode} />
              ))}
            </div>
          )}
        </main>
      </PreviewWrapper>
    )
  } catch (error) {
    console.error("Error in Homepage preview page:", error)

    return (
      <main className="container mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Error Loading Homepage Preview</h1>
          <p className="text-xl mb-8 text-red-600">
            We couldn't load this homepage preview. There might be an error with the document ID or preview mode.
          </p>
          <pre className="bg-gray-100 p-4 rounded-md text-left overflow-auto max-w-2xl mx-auto mb-8">
            {error instanceof Error ? error.message : "Unknown error"}
          </pre>
          <div className="mt-8">
            <Link
              href="/studio"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Back to Studio
            </Link>
          </div>
        </div>
      </main>
    )
  }
}

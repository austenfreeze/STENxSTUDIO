import Link from "next/link"
import { getDraftMode } from "@/lib/draft-mode"
import { getHomepage } from "@/lib/sanity.query"
import SanityImage from "@/components/sanity-image"
import { PreviewWrapper } from "@/components/shared/preview-wrapper"
import { SectionRenderer } from "@/components/section-renderer"
import { InlineEditor } from "@/components/shared/inline-editor"

export const revalidate = 60 // Revalidate pages every 60 seconds

export default async function Home() {
  try {
    // Get draft mode status using our utility function
    const { isEnabled: isPreviewMode } = await getDraftMode()

    // Fetch homepage data with preview flag
    const homepage = await getHomepage(isPreviewMode)

    return (
      <PreviewWrapper preview={isPreviewMode} documentType="homepage" documentId="homepage">
        <main>
          {/* Hero Section */}
          <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <div className="container mx-auto px-4 py-20">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  {isPreviewMode ? (
                    <InlineEditor
                      value={homepage.heroHeading}
                      documentId={homepage._id}
                      field="heroHeading"
                      documentType="homepage"
                      preview={isPreviewMode}
                      className="text-4xl font-bold mb-6"
                      as="h1"
                    />
                  ) : (
                    <h1 className="text-4xl font-bold mb-6">{homepage.heroHeading || "Welcome to STEN-STUDIO"}</h1>
                  )}

                  {isPreviewMode ? (
                    <InlineEditor
                      value={homepage.heroSubheading}
                      documentId={homepage._id}
                      field="heroSubheading"
                      documentType="homepage"
                      preview={isPreviewMode}
                      className="text-xl opacity-90 mb-8"
                      as="p"
                    />
                  ) : (
                    <p className="text-xl opacity-90 mb-8">{homepage.heroSubheading || "A modern content platform"}</p>
                  )}

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

          {/* Featured Posts Section */}
          {homepage.featuredPosts && homepage.featuredPosts.length > 0 && (
            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">Featured Posts</h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {homepage.featuredPosts.map((post) => (
                    <article
                      key={post._id}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                    >
                      {post.mainImage && (
                        <Link href={`/posts/${post.slug || "#"}`} className="block aspect-video relative">
                          <SanityImage
                            image={post.mainImage}
                            alt={post.title || "Featured post"}
                            width={600}
                            height={400}
                            className="object-cover w-full h-full"
                          />
                        </Link>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-3">
                          <Link href={`/posts/${post.slug || "#"}`} className="hover:text-blue-600 transition-colors">
                            {post.title || "Untitled Post"}
                          </Link>
                        </h3>
                        {post.excerpt && <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>}
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          )}

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
    console.error("Error in Home component:", error)

    // Return a fallback UI
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

import { getDraftMode } from "@/lib/draft-mode"
import { getDocumentById } from "@/lib/sanity.query"
import { PreviewWrapper } from "@/components/shared/preview-wrapper"
import { InlineEditor } from "@/components/shared/inline-editor"
import SanityImage from "@/components/sanity-image"
import { PortableText } from "@/components/portable-text"
import { notFound } from "next/navigation"
import Link from "next/link"

export default async function PostPreviewPage({ params }: { params: { id: string } }) {
  try {
    // Get draft mode status
    const { isEnabled: isPreviewMode } = await getDraftMode()

    if (!isPreviewMode) {
      notFound()
    }

    // Fetch post data by ID
    const post = await getDocumentById(params.id, true)

    if (!post || post._type !== "post") {
      notFound()
    }

    return (
      <PreviewWrapper preview={isPreviewMode} documentId={params.id} documentType="post">
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <article>
            <InlineEditor
              value={post.title || "Untitled Post"}
              documentId={params.id}
              field="title"
              documentType="post"
              preview={isPreviewMode}
              className="text-4xl font-bold mb-4"
              as="h1"
            />

            <div className="flex items-center gap-4 mb-8 text-gray-600">
              {post.author && (
                <div className="flex items-center gap-2">
                  {post.author.image && (
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <SanityImage
                        image={post.author.image}
                        alt={post.author.name}
                        width={32}
                        height={32}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <span>By {post.author.name}</span>
                </div>
              )}
              <span>•</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt || Date.now()).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {post.categories && post.categories.length > 0 && (
                <>
                  <span>•</span>
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((category) => (
                      <span key={category._id} className="bg-gray-100 px-2 py-1 rounded text-sm">
                        {category.title}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {post.mainImage && (
              <div className="mb-8">
                <SanityImage
                  image={post.mainImage}
                  alt={post.title || "Post image"}
                  width={1200}
                  height={675}
                  priority
                  className="rounded-lg"
                />
              </div>
            )}

            <div className="prose prose-lg max-w-none">
              <PortableText value={post.body} />
            </div>
          </article>
        </main>
      </PreviewWrapper>
    )
  } catch (error) {
    console.error("Error in Post preview page:", error)

    return (
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Error Loading Post Preview</h1>
          <p className="text-xl mb-8 text-red-600">
            We couldn't load this post preview. There might be an error with the document ID or preview mode.
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

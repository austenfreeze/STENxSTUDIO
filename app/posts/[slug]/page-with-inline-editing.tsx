import { getPostBySlug } from "@/lib/sanity.query"
import SanityImage from "@/components/sanity-image"
import { PortableText } from "@/components/portable-text"
import { notFound } from "next/navigation"
import { generateMetadata as generateSanityMetadata } from "@/lib/metadata"
import { PreviewWrapper } from "@/components/shared/preview-wrapper"
import { InlineEditor } from "@/components/shared/inline-editor"
import { getDraftMode } from "@/lib/draft-mode"
import Link from "next/link"

export const revalidate = 60 // Revalidate pages every 60 seconds

export async function generateMetadata({ params }) {
  return generateSanityMetadata({ params, type: "post" })
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  try {
    // Get draft mode status
    const { isEnabled: isPreviewMode } = await getDraftMode()

    // Fetch post data with preview flag
    const post = await getPostBySlug(params.slug, isPreviewMode)

    if (!post) {
      notFound()
    }

    return (
      <PreviewWrapper preview={isPreviewMode} documentId={post._id} documentType="post">
        <main className="container mx-auto px-4 py-8 max-w-4xl">
          <article>
            {isPreviewMode ? (
              <InlineEditor
                value={post.title}
                documentId={post._id}
                field="title"
                documentType="post"
                preview={isPreviewMode}
                className="text-4xl font-bold mb-4"
                as="h1"
              />
            ) : (
              <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            )}

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
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
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
                  alt={post.title}
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
    console.error("Error in Post page:", error)

    return (
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Error Loading Post</h1>
          <p className="text-xl mb-8 text-red-600">
            We couldn't load this post. It may have been removed or there was an error.
          </p>
          <pre className="bg-gray-100 p-4 rounded-md text-left overflow-auto max-w-2xl mx-auto mb-8">
            {error instanceof Error ? error.message : "Unknown error"}
          </pre>
          <div className="mt-8">
            <Link
              href="/posts"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Back to Posts
            </Link>
          </div>
        </div>
      </main>
    )
  }
}

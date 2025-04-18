import { getAllPosts } from "@/lib/sanity.query"
import Link from "next/link"
import SanityImage from "@/components/sanity-image"
import { getDraftMode } from "@/lib/draft-mode"
import { PreviewWrapper } from "@/components/shared/preview-wrapper"

export const revalidate = 60 // Revalidate pages every 60 seconds

export default async function PostsPage() {
  try {
    // Get draft mode status
    const { isEnabled: isPreviewMode } = await getDraftMode()

    // Fetch all posts with preview flag
    const posts = await getAllPosts(isPreviewMode)

    return (
      <PreviewWrapper preview={isPreviewMode} documentType="post">
        <main className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>

          {posts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
                >
                  {post.mainImage && (
                    <Link href={`/posts/${post.slug}`} className="block aspect-video relative">
                      <SanityImage
                        image={post.mainImage}
                        alt={post.title}
                        width={600}
                        height={400}
                        className="object-cover w-full h-full"
                      />
                    </Link>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-3">
                      <Link href={`/posts/${post.slug}`} className="hover:text-blue-600 transition-colors">
                        {post.title}
                      </Link>
                    </h2>
                    {post.excerpt && <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>}
                    <div className="flex justify-between items-center">
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
                          <span className="text-sm text-gray-500">{post.author.name}</span>
                        </div>
                      )}
                      {post.publishedAt && (
                        <span className="text-sm text-gray-500">{new Date(post.publishedAt).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No posts found. Create your first post in Sanity Studio.</p>
              <div className="mt-8">
                <Link
                  href="/studio"
                  className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Go to Sanity Studio
                </Link>
              </div>
            </div>
          )}
        </main>
      </PreviewWrapper>
    )
  } catch (error) {
    console.error("Error in Posts page:", error)

    return (
      <main className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-6">Error Loading Posts</h1>
          <p className="text-xl mb-8 text-red-600">We couldn't load the posts. Please try again later.</p>
          <pre className="bg-gray-100 p-4 rounded-md text-left overflow-auto max-w-2xl mx-auto mb-8">
            {error instanceof Error ? error.message : "Unknown error"}
          </pre>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    )
  }
}

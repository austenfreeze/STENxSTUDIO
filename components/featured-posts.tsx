import SanityImage from "./sanity-image"
import Link from "next/link"

export function FeaturedPosts({ posts = [] }) {
  if (!posts || posts.length === 0) return null

  return (
    <div className="grid md:grid-cols-3 gap-8">
      {posts.map((post) => (
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
              {post.categories && post.categories.length > 0 && post.categories[0] && (
                <span className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {post.categories[0].title}
                </span>
              )}
            </Link>
          )}
          <div className="p-6">
            <h3 className="text-xl font-bold mb-3">
              <Link href={`/posts/${post.slug || "#"}`} className="hover:text-blue-600 transition-colors">
                {post.title || "Untitled Post"}
              </Link>
            </h3>
            {post.excerpt && <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>}
            <div className="flex justify-between items-center">
              {post.author && (
                <div className="flex items-center gap-2">
                  {post.author.image && (
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <SanityImage
                        image={post.author.image}
                        alt={post.author.name || "Author"}
                        width={32}
                        height={32}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}
                  <span className="text-sm text-gray-500">{post.author.name || "Unknown Author"}</span>
                </div>
              )}
              <span className="text-sm text-gray-500">
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : "No date"}
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}

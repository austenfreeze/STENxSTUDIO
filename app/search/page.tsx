import { searchContent } from "@/lib/sanity.query"
import Link from "next/link"
import SanityImage from "@/components/sanity-image"

export const dynamic = "force-dynamic"

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q || ""

  if (!query) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Search</h1>
        <p>Please enter a search term to find posts.</p>
      </div>
    )
  }

  const results = await searchContent(query)

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-2">Search Results</h1>
      <p className="text-gray-600 mb-8">
        {results.posts.length} results found for "{query}"
      </p>

      {results.posts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.posts.map((post) => (
            <article
              key={post._id}
              className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
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
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  <Link href={`/posts/${post.slug}`} className="hover:text-blue-600 transition-colors">
                    {post.title}
                  </Link>
                </h3>
                {post.excerpt && <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <p>No results found for "{query}". Try a different search term.</p>
      )}
    </div>
  )
}

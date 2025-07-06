import Link from 'next/link'
import { sanityFetch } from '@/sanity/lib/live'
import { postsQuery } from '@/sanity/lib/queries'
import type { Post } from '@/sanity.types'

export default async function PostsIndexPage() {
  // The key fix is to destructure the 'data' property from the fetch result
  const { data: posts } = await sanityFetch<{ data: Post[] }>({
    query: postsQuery,
    perspective: 'published',
  })

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-extrabold tracking-tight mb-8">All Posts</h1>
      {/* Now, we correctly check the length of the 'posts' array */}
      {posts && posts.length > 0 ? (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post._id}>
              <Link href={`/posts/${post.slug}`}>
                <span className="text-2xl font-bold hover:underline">{post.title}</span>
              </Link>
              {post.excerpt && <p className="text-gray-400 mt-2">{post.excerpt}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  )
}

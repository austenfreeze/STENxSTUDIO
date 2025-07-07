// nextjs-app/components/CreatePostForm.tsx
"use client";

import React, { useState } from 'react';
import { useSession } from 'next-auth/react'; // To get session data (e.g., user ID for author)
import { useRouter } from 'next/navigation'; // For programmatic navigation/refresh
import { Toaster, toast } from 'sonner'; // Assuming you have sonner setup for notifications

export default function CreatePostForm() {
  const { data: session } = useSession(); // Access the user session
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState(''); // For a short summary/description
  const [content, setContent] = useState(''); // For the main post body (Portable Text)
  const [status, setStatus] = useState<'idle' | 'submitting'>('idle');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setError(null);

    // Basic validation
    if (!title.trim() || !content.trim()) {
      setError('Title and content cannot be empty.');
      toast.error('Title and content are required!');
      setStatus('idle');
      return;
    }

    try {
      const response = await fetch('/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          excerpt,
          content,
          // You might pass author ID from session here, or handle on server
          // authorId: session?.user?.id, // If you map session.user.id to Sanity admin._id
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to publish post.');
      }

      const responseData = await response.json();
      toast.success(responseData.message || 'Post published successfully!');

      // Clear form
      setTitle('');
      setExcerpt('');
      setContent('');
      setStatus('idle');

      // Optional: Revalidate the /posts page to show new content immediately (if using ISR)
      // fetch('/api/revalidate?path=/posts', { method: 'GET' }); // If you set up a revalidation endpoint
      router.refresh(); // Triggers a soft navigation to refetch data for the current route
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
      setStatus('idle');
    }
  };

  return (
    <div className="bg-zinc-800 p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-bold mb-4 text-white">Create New Post</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-zinc-300 text-sm font-bold mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline bg-zinc-700 border-zinc-600"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={status === 'submitting'}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="excerpt" className="block text-zinc-300 text-sm font-bold mb-2">
            Excerpt (Optional)
          </label>
          <textarea
            id="excerpt"
            rows={2}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline bg-zinc-700 border-zinc-600"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            disabled={status === 'submitting'}
          ></textarea>
        </div>

        <div className="mb-6">
          <label htmlFor="content" className="block text-zinc-300 text-sm font-bold mb-2">
            Content
          </label>
          <textarea
            id="content"
            rows={10}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-zinc-700 leading-tight focus:outline-none focus:shadow-outline bg-zinc-700 border-zinc-600"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={status === 'submitting'}
            required
          ></textarea>
          <p className="text-zinc-500 text-xs italic mt-1">
            Currently plain text. Will be converted to basic Portable Text blocks.
          </p>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:opacity-50"
            disabled={status === 'submitting'}
          >
            {status === 'submitting' ? 'Publishing...' : 'Publish Post'}
          </button>
        </div>
      </form>
    </div>
  );
}
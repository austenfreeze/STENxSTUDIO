import Link from 'next/link';
import React from 'react'; // Explicitly import React for JSX

export default function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-extrabold mb-8 text-white">Welcome to STENxSTUDIO</h1>
      <p className="text-xl text-zinc-300 mb-12 max-w-2xl">
        Your portal for creative expression and curated content.
      </p>

      <div className="flex flex-col sm:flex-row gap-6">
        <Link href="/posts" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200">
          Explore Public Content
        </Link>
        <Link href="/auth/UserTypeSelection" className="px-8 py-4 bg-zinc-700 hover:bg-zinc-600 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200">
          Access Studio (Private)
        </Link>
      </div>
    </div>
  );
}
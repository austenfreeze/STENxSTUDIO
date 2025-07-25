// app/page.tsx
import Link from 'next/link';
import React from 'react'; // Explicitly import React for JSX

export default function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center text-center">
      <h1 className="text-5xl font-extrabold mb-8 text-zinc-600">Welcome to STENxSTUDIO</h1> {/* Darker text */}
      <p className="text-xl text-zinc-700 mb-12 max-w-2xl"> {/* Muted text */}
        Your portal for creative expression and curated content.
      </p>

      <div className="flex flex-col sm:flex-row gap-6">
         <Link href="/events" className="px-8 py-4 bg-zinc-100 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"> {/* Slightly lighter blue, subtle shadow */}
          Timeline
        </Link>

        <Link href="/posts" className="px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-colors duration-200"> {/* Slightly lighter blue, subtle shadow */}
          Explore Public Content
        </Link>


        <Link href="/auth/UserTypeSelection" className="px-8 py-4 bg-zinc-200 hover:bg-zinc-300 text-zinc-800 font-semibold rounded-lg shadow-sm transition-colors duration-200"> {/* Light background, darker text, very subtle shadow */}
          Access Studio (Private)
        </Link>
      </div>
    </div>
  );
}
// C:\Users\Administrator\Desktop\STENxSTUDIO\nextjs-app\app\page.tsx
import Link from 'next/link'; // Import Link
import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center text-center bg-obsidian-tomb-950 text-all-the-smoke-50">
      <h1 className="text-5xl font-extrabold mb-4 text-golden-staff">Welcome to STENxSTUDIO</h1>
      <p className="text-xl text-aestroidz-dust-400 mb-12 max-w-2xl">
        Your portal for creative expression and curated content.
      </p>

      <div className="flex flex-col sm:flex-row gap-6">
        <Link href="/posts" className="px-8 py-4 bg-cosmic-wave-500 hover:bg-cosmic-wave-600 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200">
          Explore Public Content
        </Link>
      </div>
    </div> // This is the correct final closing div for the return statement
  );
}
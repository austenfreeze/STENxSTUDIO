// nextjs-app/app/auth/UserTypeSelection/page.tsx
"use client"; // This will be a Client Component

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function UserTypeSelectionPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center text-center">
        <p className="text-zinc-400">Loading authentication status...</p>
      </div>
    );
  }

  // If not authenticated, show the selection options
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold mb-8 text-white">Choose Your Path</h1>
      <p className="text-lg text-zinc-300 mb-12 max-w-xl">
        Access the private studio for content creation, or explore the public site.
      </p>

      <div className="flex flex-col sm:flex-row gap-6">
        <Link href="/auth/signin" className="px-8 py-4 bg-purple-700 hover:bg-purple-800 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200">
          Go to Private Studio Login
        </Link>
        <Link href="/posts" className="px-8 py-4 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200">
          Continue to Public Site
        </Link>
      </div>
    </div>
  );
}
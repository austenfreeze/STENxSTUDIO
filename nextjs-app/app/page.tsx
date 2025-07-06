import React from 'react'

/**
 * Homepage
 * A clean, server-rendered starting point for the application.
 */
export default function HomePage() {
  return (
    <div className="py-12">
      <div className="max-w-3xl">
        <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
          Welcome to Your Studio
        </h1>
        <p className="mt-6 text-lg lg:text-xl text-zinc-400">
          This is a fresh starting point for your Next.js and Sanity application.
          You can now begin building your custom components and fetching live data.
        </p>
      </div>
    </div>
  )
}

import Link from 'next/link';

export default function Page() {
  return (
    <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center text-center bg-zinc-900 text-white">
      <h1 className="text-5xl font-extrabold mb-4">Welcome to STENxSTUDIO</h1>
      <p className="text-xl text-zinc-300 mb-12 max-w-2xl">
        Your portal for creative expression and curated content.
      </p>

      <div className="flex flex-col sm:flex-row gap-6">
        <Link href="/posts" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition-colors duration-200">
          Explore Public Content
        </Link>
      </div>
    </div>
  );
}
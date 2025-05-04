import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <div className="bg-gradient-to-b from-[#fafafa] via-white to-white relative border-b border-gray-200">
        <div className="container mx-auto max-w-2xl lg:max-w-4xl px-4 py-24 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-gray-900">
            STEN<span className="text-red-500">x</span>STUDIO
          </h1>
          <p className="mt-4 text-gray-600 text-lg sm:text-xl max-w-xl mx-auto">
            Internal developer portal for reviewing and managing platform integrations.
          </p>

          <div className="mt-10">
            <Link
              href="/dashboard/integrations"
              className="inline-block bg-black text-white text-sm font-medium px-6 py-3 rounded-md hover:bg-gray-800 transition"
            >
              View Integrations Dashboard
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

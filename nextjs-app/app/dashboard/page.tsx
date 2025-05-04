import Link from "next/link"

export default function DashboardIndex() {
  return (
    <div className="max-w-xl mx-auto px-6 py-24 text-center space-y-4">
      <h1 className="text-3xl font-bold">STENxSTUDIO Dashboard</h1>
      <p className="text-muted-foreground text-sm">
        Choose a section below to begin.
      </p>
      <Link
        href="/dashboard/integrations"
        className="inline-block mt-4 px-4 py-2 rounded bg-black text-white text-sm font-medium hover:bg-gray-900 transition"
      >
        Go to Integrations
      </Link>
    </div>
  )
}

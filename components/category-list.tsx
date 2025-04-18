import Link from "next/link"

export function CategoryList({ categories = [] }) {
  if (!categories || categories.length === 0) return null

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <ul className="space-y-3">
        {categories.map((category) => (
          <li key={category._id}>
            <Link
              href={`/categories/${category.title?.toLowerCase() || "uncategorized"}`}
              className="flex justify-between items-center group"
            >
              <span className="group-hover:text-blue-600 transition-colors">{category.title || "Uncategorized"}</span>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">{category.count || 0}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

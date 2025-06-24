type PublishedAtProps = {
  publishedAt: string
}

export function PublishedAt({ publishedAt }: PublishedAtProps) {
  if (!publishedAt) return null

  const date = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })

  return <span className="text-gray-500 text-sm">Published: {date}</span>
}

// src/components/DocumentList.tsx
import { useQuery } from '@sanity/sdk-react'

export function DocumentList({ type }: { type: string }) {
  const { data, loading, error } = useQuery({
    query: `*[_type == "${type}"]{projectName, primaryDomain, _id}`
  })

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  console.log("Fetched data:", data) // Debugging

  return (
    <div>
      <h2>{type} Documents</h2>
      <ul>
        {data?.map((doc) => (
          <li key={doc._id}>
            <strong>{doc.projectName}</strong>
            <br />
            Domain: {doc.primaryDomain}
          </li>
        ))}
      </ul>
    </div>
  )
}

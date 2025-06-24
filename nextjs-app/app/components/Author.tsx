import Avatar from "@/components/Avatar"

type AuthorProps = {
  author: {
    firstName: string | null
    lastName: string | null
    picture?: any
  }
  publishedAt: string
}

export function Author({ author, publishedAt }: AuthorProps) {
  if (!author) return null

  return (
    <div className="flex items-center">
      <Avatar person={author} date={publishedAt} />
    </div>
  )
}

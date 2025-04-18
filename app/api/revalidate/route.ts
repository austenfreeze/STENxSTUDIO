import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get("secret")

  if (secret !== process.env.REVALIDATION_SECRET) {
    return new Response("Invalid token", { status: 401 })
  }

  try {
    const body = await request.json()
    const { _type, slug } = body

    if (_type === "post") {
      revalidatePath(`/posts/${slug.current}`)
      revalidatePath("/")
    } else if (_type === "homepage") {
      revalidatePath("/")
    } else if (_type === "author" || _type === "category") {
      // Revalidate all pages since these could affect multiple pages
      revalidatePath("/", "layout")
    }

    return new Response("Revalidation successful", { status: 200 })
  } catch (err) {
    console.error("Error revalidating:", err)
    return new Response("Error revalidating", { status: 500 })
  }
}

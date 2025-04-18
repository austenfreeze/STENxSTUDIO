import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Log the request path for debugging
  console.log("Middleware processing path:", request.nextUrl.pathname)

  // Continue with the request
  return NextResponse.next()
}

// Only run the middleware on specific paths
export const config = {
  matcher: ["/", "/posts/:path*", "/api/preview", "/api/disable-preview"],
}

// nextjs-app/middleware.ts
// import { auth } from "./lib/auth"; // Temporarily commented out
import { NextResponse } from "next/server";

// Temporarily disable the authentication middleware
export default function middleware(req: Request) {
  // For now, allow all requests to pass through
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Your original matcher, which will now apply to the passthrough middleware
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
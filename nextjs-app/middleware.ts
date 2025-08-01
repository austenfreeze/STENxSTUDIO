// nextjs-app/middleware.ts (for next-auth v5)
import { auth } from "./lib/auth" // Assuming you create a lib/auth.ts for Auth.js handler
import { NextResponse } from "next/server"

export default auth((req) => {
  // Your logic for protecting routes goes here.
  // This is a simplified example based on your previous logic.

  const { nextUrl } = req;
  const isLoggedIn = !!req.auth; // req.auth will be present if authenticated

  // Define public paths that anyone can access (mirroring your previous logic)
  const publicPaths = [
    "/",
    "/posts",
    /^\/posts\/[^/]+$/, // Individual post slugs
    "/auth/signin",
    "/auth/UserTypeSelection",
  ];

  const isPublicPath = publicPaths.some(path => {
    if (typeof path === 'string') {
      return nextUrl.pathname === path || nextUrl.pathname.startsWith(`${path}/`);
    }
    return path.test(nextUrl.pathname);
  });

  // If it's a public path or the user is logged in, allow access
  if (isPublicPath || isLoggedIn) {
    return NextResponse.next();
  }

  // If not logged in and not a public path, redirect to sign-in
  return NextResponse.redirect(new URL("/auth/signin", nextUrl));
});

// The matcher configuration remains similar for Next.js middleware
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
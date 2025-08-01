// nextjs-app/middleware.ts
import { auth } from "./lib/auth"; // Correct import for NextAuth.js v5 (Auth.js)
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth; // `req.auth` contains session data if authenticated in Auth.js v5

  // Public paths that do not require authentication
  const publicPaths = [
    "/",
    "/posts",
    /^\/posts\/[^/]+$/,
    "/auth/signin",
    "/auth/UserTypeSelection",
  ];

  const isPublicPath = publicPaths.some(path => {
    if (typeof path === 'string') {
      return nextUrl.pathname === path || nextUrl.pathname.startsWith(`${path}/`);
    }
    return path.test(nextUrl.pathname);
  });

  // Allow if it's a public path OR if the user is logged in
  if (isPublicPath || isLoggedIn) {
    return NextResponse.next();
  }

  // If not logged in and not a public path, redirect to sign-in
  // Ensure the redirect URL is correct
  return NextResponse.redirect(new URL("/auth/signin", nextUrl));
});

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
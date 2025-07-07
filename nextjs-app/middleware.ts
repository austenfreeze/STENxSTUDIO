// nextjs-app/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server"; // Import NextResponse

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized: async ({ token, req }: { token: any; req: NextRequest }) => {
      // Define public paths that anyone can access
      const publicPaths = [
        "/", // Landing page
        "/posts", // All posts listing
        /^\/posts\/[^/]+$/, // Individual post slugs like /posts/my-post-slug
        "/auth/signin", // Sign-in page itself
        "/api/auth", // NextAuth.js API routes (excluding the ones that perform user actions)
        // Add any other public routes like /about, /contact etc.
      ];

      // Check if the requested path starts with any public path (using regex for flexibility)
      const isPublicPath = publicPaths.some(path => {
        if (typeof path === 'string') {
          return req.nextUrl.pathname === path || req.nextUrl.pathname.startsWith(`${path}/`);
        }
        return path.test(req.nextUrl.pathname);
      });

      // If it's a public path, always allow access
      if (isPublicPath) {
        return true;
      }

      // For all other paths (which are considered private), check for a valid token (authenticated)
      return !!token; // If token exists, user is authorized; otherwise, false (will redirect to signIn page)
    },
  },
});

// Configure the paths where the middleware should run.
// This should cover all paths, as we're explicitly allowing public ones above.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Any files in /public folder that might be directly accessed
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
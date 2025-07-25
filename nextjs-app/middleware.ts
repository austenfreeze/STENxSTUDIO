// nextjs-app/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized: async ({ token, req }: { token: any; req: NextRequest }) => {
      // IMPORTANT: Allow all NextAuth.js API routes to bypass custom authorization
      // NextAuth.js handles the authentication for these paths internally.
      // This check is a fallback, but the primary fix is in the `matcher` config below.
      if (req.nextUrl.pathname.startsWith('/api/auth')) {
        return true; // Allow NextAuth.js API routes
      }

      // Define public paths that anyone can access
      const publicPaths = [
        "/", // Landing page
        "/posts", // All posts listing
        /^\/posts\/[^/]+$/, // Individual post slugs like /posts/my-post-slug
        "/auth/signin", // Sign-in page itself
        "/auth/UserTypeSelection", // Your user type selection page
        // Add any other truly public routes like /about, /contact etc.
      ];

      // Check if the requested path is explicitly public
      const isPublicPath = publicPaths.some(path => {
        if (typeof path === 'string') {
          // Ensure exact match or startWith for string paths
          return req.nextUrl.pathname === path || req.nextUrl.pathname.startsWith(`${path}/`);
        }
        // For regex paths
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

// The matcher configuration should include all paths you want middleware to process.
// Ensure it explicitly excludes /api/auth to prevent 403 errors for NextAuth.js internal routes.
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api/auth (NextAuth.js API routes) - NEWLY ADDED EXCLUSION
     * - Any files in /public folder that might be directly accessed
     */
    '/((?!_next/static|_next/image|favicon.ico|api/auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
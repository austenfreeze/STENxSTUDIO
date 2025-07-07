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
      if (req.nextUrl.pathname.startsWith('/api/auth')) {
        return true; // Allow NextAuth.js API routes
      }

      // Define public paths that anyone can access
      const publicPaths = [
        "/", // Landing page
        "/posts", // All posts listing
        /^\/posts\/[^/]+$/, // Individual post slugs like /posts/my-post-slug
        "/auth/signin", // Sign-in page itself
        // '/api/auth', // This line is now handled by the check above, you can remove it if it was here
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
// Ensure it doesn't exclude /api/auth directly.
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
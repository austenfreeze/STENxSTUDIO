// nextjs-app/middleware.ts
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import { withVisualEditing } from "next-sanity/visual-editing/middleware";

const withAuthMiddleware = withAuth({
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized: async ({ token, req }: { token: any; req: NextRequest }) => {
      // Allow all NextAuth.js API routes
      if (req.nextUrl.pathname.startsWith('/api/auth')) {
        return true;
      }

      // Define public paths that anyone can access
      const publicPaths = [
        "/",
        "/posts",
        /^\/posts\/[^/]+$/,
        "/auth/signin",
        "/auth/UserTypeSelection",
      ];

      const isPublicPath = publicPaths.some(path => {
        if (typeof path === 'string') {
          return req.nextUrl.pathname === path || req.nextUrl.pathname.startsWith(`${path}/`);
        }
        return path.test(req.nextUrl.pathname);
      });

      if (isPublicPath) {
        return true;
      }

      // For all other paths, check for a valid token
      return !!token;
    },
  },
});

// `withVisualEditing` is a helper that wraps your middleware.
// It detects requests from Sanity Studio and sets the correct headers to allow embedding.
export default withVisualEditing(withAuthMiddleware);

export const config = {
  matcher: [
    // Include all pages in your app, but exclude Next.js internals, public files, and NextAuth.js API routes.
    // The visual editing middleware needs to run on all pages that will be previewed.
    // Make sure to add any other routes that should be handled by the middleware.
    '/((?!_next/static|_next/image|favicon.ico|api/auth|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextRequest } from "next/server"; // Import NextRequest for type hinting

export default withAuth({
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized: async ({ token, req }: { token: any; req: NextRequest }) => { // Type token as any initially, can be JWT from next-auth/jwt
      if (!token) {
        return false;
      }

      const protectedPaths = ["/dashboard", "/settings", "/create-post", "/api/posts"];
      const isProtectedPath = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path));

      if (!isProtectedPath) {
        return true;
      }

      // Check the user's role based on the augmented JWT type
      // token.role is now type-safe if types/next-auth.d.ts is configured correctly
      if (token.role === "admin" || token.role === "editor") {
        return true;
      }

      return false;
    },
  },
});

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/settings/:path*",
    "/create-post",
    "/api/posts/:path*",
  ],
};
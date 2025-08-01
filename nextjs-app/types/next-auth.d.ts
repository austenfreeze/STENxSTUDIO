// types/next-auth.d.ts
import NextAuth from "next-auth";

// Extend the NextAuth.js types to include custom properties
// This ensures TypeScript knows about 'role' on session.user and token
declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string; // Ensure ID is part of the user object
      role?: string; // Add role property
    } & DefaultSession["user"];
  }

  interface User {
    id: string; // Add id to user type
    role?: string; // Add role to user type
  }
}

declare module "next-auth/jwt" {
  /**
   * Returned by the `jwt` callback and `getToken`, when using JWT sessions
   */
  interface JWT {
    id: string; // Add id to JWT token
    role?: string; // Add role property
  }
}
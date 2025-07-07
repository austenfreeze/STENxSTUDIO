// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;
      role?: "admin" | "editor" | "contributor"; // Add your custom roles here
    } & DefaultSession["user"];
  }

  /**
   * The user object used by NextAuth.js
   */
  interface User extends DefaultUser {
    id: string; // Ensure id is always a string, especially if using a custom adapter
    role?: "admin" | "editor" | "contributor"; // Add your custom roles here
  }
}

declare module "next-auth/jwt" {
  /**
   * Returned by the `jwt` callback and `getToken`, when using JWT sessions
   */
  interface JWT {
    id: string;
    role?: "admin" | "editor" | "contributor"; // Add your custom roles here
  }
}
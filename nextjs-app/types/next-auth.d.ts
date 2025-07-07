// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    admin: { // Renamed from 'user' to 'admin'
      id: string;
      role?: "admin" | "editor" | "contributor" | "user";
    } & DefaultSession["user"]; // Keep DefaultSession's user properties
  }

  interface User extends DefaultUser {
    id: string;
    role?: "admin" | "editor" | "contributor" | "user";
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role?: "admin" | "editor" | "contributor" | "user";
  }
}
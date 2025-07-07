// nextjs-app/lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { SanityAdapter } from "./sanity-adapter";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // IMPORTANT: In a real app, fetch admin from Sanity and securely verify password.
        // The returned object MUST have an 'id' property.
if (credentials.email === "austentaylorfreeze@gmail.com" && credentials.password === "0719") {
  return { id: "mock_admin_id_123", name: "Austen Freeze", email: "admin@example.com", role: "admin" };
} else {
  return null;
}
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        // Map Google profile fields to your 'admin' schema fields
        return {
          id: profile.sub, // Google's unique user ID (will be stored in _id field if new, or matched)
          name: profile.name, // Will be mapped to firstName, lastName if you want
          email: profile.email,
          image: profile.picture, // Will be mapped to 'image' URL
          role: "editor", // Default role for Google users signing up
        };
      },
    }),
  ],
  // Pass the schema names to the adapter
  adapter: SanityAdapter({
    schemas: {
      user: "admin", // Tell the adapter to use 'admin' schema for 'user' type
      account: "account",
      session: "session",
    },
  }),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role; // Type assertion as 'user' might not explicitly have 'role' without custom types
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  debug: process.env.NODE_ENV === "development",
};

export function getAuthOptions(): NextAuthOptions {
  return authOptions;
}
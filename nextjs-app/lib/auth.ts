// nextjs-app/lib/auth.ts
import { NextAuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { SanityAdapter } from "./sanity-adapter";
import { sanityClient } from "./sanity"; // Import your Sanity client to query users

// Extend the Session user type to include 'id' and 'role'
declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      role?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

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

        // IMPORTANT: In a real app, securely verify password against a hashed password.
        // For this example, we'll keep the mock password check but fetch the actual Sanity user.

        // Mock password check (replace with secure verification in production)
        if (credentials.email === "austentaylorfreeze@gmail.com" && credentials.password === "0719") {
          // Query Sanity to find the 'admin' document by email
          const adminUser = await sanityClient.fetch(`*[_type == "admin" && email == $email][0]{
            _id,
            name,
            email,
            role
          }`, { email: credentials.email });

          if (adminUser) {
            // Return the actual _id from Sanity as the user.id
            return {
              id: adminUser._id,
              name: adminUser.name,
              email: adminUser.email,
              role: adminUser.role || "admin", // Default role if not set in Sanity
            };
          } else {
            console.warn(`Credentials login: No 'admin' document found for email: ${credentials.email}`);
            return null; // User found in credentials, but no corresponding Sanity document
          }
        } else {
          return null; // Invalid credentials
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        // Map Google profile fields to your 'admin' schema fields
        // The next-auth-sanity adapter should handle creating/matching the 'admin' document
        // based on the 'id' (profile.sub) and 'email'.
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
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      else if (url.startsWith("/")) return new URL(url, baseUrl).toString();
      return baseUrl;
    },
    async session({ session, token }) {
      // Ensure session.user exists before assigning properties
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
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
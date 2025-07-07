// lib/auth.ts
import { NextAuthOptions } from "next-auth"; // Import NextAuthOptions type
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { SanityAdapter } from "./sanity-adapter"; // Your Sanity adapter
// import { sanityClient } from "./sanity"; // Your Sanity client (used by SanityAdapter)

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // IMPORTANT: This runs on the server!
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Placeholder for demonstration:
        if (credentials.email === "admin@example.com" && credentials.password === "password123") {
          // In a real app, securely fetch user from Sanity and verify password.
          // Example:
          // const userDoc = await sanityClient.fetch(`*[_type == "user" && email == $email][0]`, { email: credentials.email });
          // if (!userDoc || !await bcrypt.compare(credentials.password, userDoc.hashedPassword)) {
          //   return null;
          // }
          return { id: "user123", name: "Admin User", email: "admin@example.com", role: "admin" };
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!, // Use ! for non-null assertion as these are required
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: "editor", // Assign a default role, or fetch from Sanity if user already exists
        };
      },
    }),
  ],
  adapter: SanityAdapter(),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role; // Now type-safe due to module augmentation
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role; // Now type-safe
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

// Helper to get authOptions, useful for getServerSession
export function getAuthOptions(): NextAuthOptions {
  return authOptions;
}
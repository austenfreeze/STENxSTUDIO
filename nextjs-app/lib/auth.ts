import NextAuth from "@auth/nextjs"; // This is the v5 (Auth.js) import for Next.js apps
import Credentials from "next-auth/providers/credentials";


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    Credentials({
      // ...
      async authorize(credentials) {
        // **IMPORTANT**: Replace this with your actual user validation logic
        if (credentials.email === "austentaylorfreeze@gmail.com" && credentials.password === "0719") {
          return { id: "ACF", name: "head", email: "austentaylorfreeze@gmai.com", role: "admin" }; // <-- ADD ROLE HERE
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        (token as any).role = (user as any).role; // <-- Cast token to any to add role, or define Jwt type
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        (session.user as any).role = (token as any).role; // <-- Cast session.user to any to add role, or define Session type
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
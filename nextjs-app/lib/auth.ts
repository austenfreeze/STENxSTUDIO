// nextjs-app/lib/auth.ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials"; // Example: assuming you use credentials

// You can add other providers here (e.g., Google, GitHub)
// import GoogleProvider from "next-auth/providers/google";

export const {
  handlers: { GET, POST }, // Destructure GET and POST from handlers
  auth, // The 'auth' function for server-side session checks
  signIn,
  signOut,
} = NextAuth({
  // Configure your authentication providers
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // **IMPORTANT**: Replace this with your actual user validation logic
        // e.g., fetch user from your Sanity backend or a database
        if (credentials.email === "test@example.com" && credentials.password === "password") {
          return { id: "user123", name: "Test User", email: "test@example.com" };
        }
        return null; // Return null if authentication fails
      },
    }),
    // Add other providers if needed:
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_CLIENT_ID!,
    //   clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    // }),
  ],
  // Define custom pages (like your sign-in page)
  pages: {
    signIn: "/auth/signin", // Your custom sign-in page
  },
  // Callbacks for session and JWT management
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string; // Add user ID to session
      }
      return session;
    },
  },
  // Optional: Add a secret for JWT encryption
  secret: process.env.NEXTAUTH_SECRET,
});
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
// Import the authOptions from your centralized configuration file
import { authOptions } from "../../../../lib/auth"; 

// Create the NextAuth handler using the imported authOptions
const handler = NextAuth(authOptions);

// Export the handler for GET and POST requests
export { handler as GET, handler as POST };

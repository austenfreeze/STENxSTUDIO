// app/api/auth/[...nextauth]/route.ts
// Import handlers directly from your Auth.js configuration file
import { handlers } from "../../../../lib/auth"; // Adjust path if lib/auth.ts is elsewhere

// Export the GET and POST handlers
export const { GET, POST } = handlers;
// nextjs-app/components/SignOutButton.tsx
"use client"; // MUST be the first line

import { signOut } from "next-auth/react";
import React from "react";

export default function SignOutButton() {
  return (
    <button onClick={() => signOut()} /* ... styles ... */>
      Sign out
    </button>
  );
}
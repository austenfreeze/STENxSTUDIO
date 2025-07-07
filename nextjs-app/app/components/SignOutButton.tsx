// nextjs-app/components/SignOutButton.tsx
"use client"; // This MUST be the first line of this file!

import { signOut } from "next-auth/react";
import React from "react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      style={{ padding: "10px 15px", backgroundColor: "red", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}
    >
      Sign out
    </button>
  );
}
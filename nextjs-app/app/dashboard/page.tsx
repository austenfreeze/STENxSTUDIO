// app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/auth"; // Import authOptions
import { Session } from "next-auth"; // Import Session type

export default async function DashboardPage() {
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  if (session.user.role !== "admin" && session.user.role !== "editor") {
    return <p>Access Denied. You do not have the required role.</p>;
  }

  return (
    <div>
      <h1>Welcome to your Enhanced Studio, {session.user.name || session.user.email}!</h1>
      <p>Your role: {session.user.role}</p>
      <SignOutButton />
    </div>
  );
}

// components/SignOutButton.tsx (Client Component)
"use client";
import { signOut } from "next-auth/react";
import React from "react";

export default function SignOutButton() {
  return (
    <button onClick={() => signOut()} style={{ padding: "10px 15px", backgroundColor: "red", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
      Sign out
    </button>
  );
}
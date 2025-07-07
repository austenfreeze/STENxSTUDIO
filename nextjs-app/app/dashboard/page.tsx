// nextjs-app/app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/auth"; // Assuming this path is now correct
import { Session } from "next-auth";
import SignOutButton from "@/components/SignOutButton"; // <-- Import it here

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
      <SignOutButton /> {/* Use it like a regular component */}
    </div>
  );
}
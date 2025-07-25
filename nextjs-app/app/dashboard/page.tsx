// nextjs-app/app/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/auth";
import { Session } from "next-auth";
import SignOutButton from "@/components/SignOutButton";
import CreatePostForm from '@/components/CreatePostsForm';

export default async function DashboardPage() {
  const session: Session | null = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  if (session.user.role !== "admin" && session.user.role !== "editor") {
    return <p>Access Denied. You do not have the required role.</p>;
  }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-6 text-white">Welcome to your Enhanced Studio, {session.user.name || session.user.email}!</h1>
      <p className="text-zinc-400 mb-8">Your role: {session.user.role}</p>

      {/* Post Creation Form */}
      <CreatePostForm />

      {/* Other Dashboard Content will go here */}
      <div className="mt-8">
        <SignOutButton />
      </div>
    </div>
  );
}
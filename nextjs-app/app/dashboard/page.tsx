// nextjs-app/app/dashboard/page.tsx
// import { getServerSession } from "next-auth"; // Comment out
// import { redirect } from "next/navigation"; // Comment out
// import { authOptions } from "../../lib/auth"; // Comment out
// import { Session } from "next-auth"; // Comment out
// import SignOutButton from "@/components/SignOutButton"; // Comment out
// import CreatePostForm from '@/components/CreatePostsForm'; // Comment out

export default async function DashboardPage() {
//   const session: Session | null = await getServerSession(authOptions);

//   if (!session) {
//     redirect("/auth/signin");
//   }

//   if (session.user.role !== "admin" && session.user.role !== "editor") {
//     return <p>Access Denied. You do not have the required role.</p>;
//   }

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-4xl font-bold mb-6 text-white">Dashboard (Auth Disabled)</h1>
      <p className="text-zinc-400 mb-8">Authentication is currently disabled. This is a placeholder dashboard.</p>
      {/* <CreatePostForm /> */}
      {/* <div className="mt-8"> <SignOutButton /> </div> */}
    </div>
  );
}
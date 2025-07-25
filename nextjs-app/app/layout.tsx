import { SanityLive } from "@/sanity/lib/live";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-bg-stone-950 dark:bg-stone-950 min-h-screen">
        {children}
        <SanityLive />
      </body>
    </html>
  );
}
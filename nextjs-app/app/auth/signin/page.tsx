// app/auth/signin/page.tsx
"use client";

import { getProviders, signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, Suspense } from "react";

function SignInFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loadedProviders, setLoadedProviders] = useState<Record<any, any> | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const allProviders = await getProviders(); // This is the key line
      setLoadedProviders(allProviders);
    };
    fetchProviders();
  }, []);
  
  const handleCredentialsSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl,
    });

    if (result?.error) {
      setError(result.error);
    } else {
      if (result?.url) {
        router.push(result.url);
      } else {
        router.push(callbackUrl);
      }
    }
  };

  if (!loadedProviders) {
    return <p>Loading providers...</p>;
  }

  return ( // <-- ADD THIS RETURN STATEMENT
    <div style={{ padding: "20px", maxWidth: "400px", margin: "50px auto", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h1>Sign In to Enhanced Studio</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleCredentialsSignIn}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", padding: "8px", margin: "5px 0" }}
          />
        </div>
        <button type="submit" style={{ padding: "10px 15px", backgroundColor: "#007bff", color: "white", border: "none", borderRadius: "4px", cursor: "pointer" }}>
          Sign In
        </button>
      </form>

      {/* Social Providers */}
      {loadedProviders &&
        Object.values(loadedProviders).map((provider) => {
          if (provider.id === "credentials") return null;
          return (
            <div key={provider.id} style={{ marginTop: "10px" }}>
              <button onClick={() => signIn(provider.id, { callbackUrl: "/dashboard" })} style={{ padding: "10px 15px", backgroundColor: "#eee", border: "1px solid #ccc", borderRadius: "4px", cursor: "pointer" }}>
                Sign in with {provider.name}
              </button>
            </div>
          );
        })}
    </div>
  ); // <-- CLOSE THE RETURN STATEMENT
}
export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading sign-in form...</div>}>
      <SignInFormContent />
    </Suspense>
  );
}
// Minimal Google OAuth login page.

"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function LoginPage() {
  const supabase = createSupabaseBrowserClient();
  
  const handleGoogleLogin = async () => {
    console.log("Starting Google OAuth flow...");
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        // URL where Supabase sends the user after Google OAuth.
        redirectTo: `${location.origin}/auth/callback`,
        // Final internal route after session is created
        queryParams: { next: "/clients" },
      },
    });
  };

  return (
    <main className="container bg-background min-h-screen flex flex-col justify-center">
      <div className="">
        <div className="flex-cotal justify-between">
          <h1>Login</h1>

          <button
            className="text-muted items-center rounded-md border border-white/15 px-4 py-2 text-sm hover:text-accent pointer"
            type="button"
            onClick={handleGoogleLogin}
          >
            Login with Google
          </button>
        </div>
      </div>
    </main>
  );
}

// Minimal Google OAuth login page.

"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";

export default function LoginPage() {
  const supabase = createSupabaseBrowserClient();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
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

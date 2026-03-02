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
    <main className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">

      {/* Subtle background glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 50% 55%, oklch(0.58 0.22 288 / 12%) 0%, transparent 70%)",
        }}
      />

      {/* Login card */}
      <div className="relative z-10 w-full max-w-sm mx-4 rounded-2xl border border-border bg-card p-8 shadow-2xl shadow-black/40">

        {/* Icon + brand */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/15 border border-accent/30">
            <svg
              aria-hidden
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="oklch(0.58 0.22 288)"
              strokeWidth={1.8}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="7" width="20" height="14" rx="2" />
              <path d="M16 7V5a2 2 0 0 0-4 0v2" />
              <line x1="12" y1="12" x2="12" y2="16" />
            </svg>
          </div>
          <h1 className="text-xl font-semibold text-foreground tracking-tight">
            Welcome to MiniCRM
          </h1>
          <p className="text-sm text-muted-foreground text-center">
            Sign in to access your client list
          </p>
        </div>

        {/* Google OAuth button */}
        <button
          id="google-login-btn"
          className="w-full flex items-center justify-center gap-3 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground shadow-md shadow-accent/20 transition-all hover:brightness-110 hover:shadow-accent/35 hover:-translate-y-0.5 cursor-pointer"
          type="button"
          onClick={handleGoogleLogin}
        >
          {/* Google icon */}
          <svg aria-hidden className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Continue with Google
        </button>
      </div>
    </main>
  );
}

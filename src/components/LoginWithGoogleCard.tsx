"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/browser";
import { BriefcaseIcon, GoogleIcon } from "@/components/icons";

export default function LoginWithGoogleCard() {
  const supabase = createSupabaseBrowserClient();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        queryParams: { next: "/clients" },
      },
    });
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center bg-background overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 45% at 50% 55%, oklch(0.58 0.22 288 / 12%) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 w-full max-w-sm mx-4 rounded-2xl border border-border bg-card p-8 shadow-2xl shadow-black/40">
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-accent/15 border border-accent/30">
            <BriefcaseIcon className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-semibold text-foreground tracking-tight">
            Welcome to MiniCRM
          </h1>
          <p className="text-sm text-muted-foreground text-center">
            Sign in to access your client list
          </p>
        </div>

        <button
          id="google-login-btn"
          className="w-full flex items-center justify-center gap-3 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground shadow-md shadow-accent/20 transition-all hover:brightness-110 hover:shadow-accent/35 hover:-translate-y-0.5 cursor-pointer"
          type="button"
          onClick={handleGoogleLogin}
        >
          <GoogleIcon />
          Continue with Google
        </button>
      </div>
    </main>
  );
}

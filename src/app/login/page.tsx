// Minimal Google OAuth login page.

'use client';

import { createSupabaseBrowserClient } from '@/lib/supabase/browser';

export default function LoginPage() {
  const supabase = createSupabaseBrowserClient();

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <main>
      <h1>Login</h1>
      <button type="button" onClick={handleGoogleLogin}>
        Login with Google
      </button>
    </main>
  );
}

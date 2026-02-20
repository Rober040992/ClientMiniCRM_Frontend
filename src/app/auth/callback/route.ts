// This file runs on the server.
// It handles the redirect coming back from Google after login.

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  console.log("Callback hit");
  const url = new URL(request.url);
  // Supabase returns a temporary OAuth code that must be exchanged for a session.
  const code = url.searchParams.get("code");
  // Optional redirect target (fallback to private area)
  const next = url.searchParams.get("next") ?? "/clients";
  console.log("Code received:", code);
  // No code → nothing to exchange → back to login.
  if (!code) {
    return NextResponse.redirect(new URL("/login", url.origin));
  }

  // We redirect after attaching session cookies to the response.
  const response = NextResponse.redirect(new URL(next, url.origin));

  // In your Next version, cookies() is async.
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    },
  );

  // Exchange OAuth code for session (this will write auth cookies through setAll)
  const { error } = await supabase.auth.exchangeCodeForSession(code);
  console.log("Session created");

  // If exchange fails, redirect to login
  if (error) {
    return NextResponse.redirect(new URL("/login", url.origin));
  }

  return response;
}

// Creates a Supabase server client using request cookies (App Router, 2026).
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createSupabaseServerClient() {
  // Get request cookies (async in Server Components)
  const cookieStore = await cookies();

  // Create Supabase server client bound to current request cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          // Cookie writes are only allowed in Server Actions / Route Handlers.
          // During Server Component renders this throws, so we swallow it —
          // the session refresh will be persisted by the middleware instead.
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Intentional no-op from Server Component context.
          }
        },
      },
    },
  );

  return supabase;
}

import type { NextRequest } from "next/server";
import { refreshAuthSession } from "@/lib/supabase/auth-session-middleware";

// In this project, `proxy.ts` is the active request entrypoint used to refresh
// the Supabase session before protected routes read auth server-side.
export async function proxy(request: NextRequest) {
  return refreshAuthSession(request);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};

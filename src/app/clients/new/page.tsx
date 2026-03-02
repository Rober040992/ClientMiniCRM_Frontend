import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import CreateClientForm from "./_form";

export default async function NewClientPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Guard — same pattern as /clients
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-background">

      {/* Header bar — same style as /clients */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-accent/15 border border-accent/30">
            <svg
              aria-hidden
              className="w-4 h-4"
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
          <span className="text-lg font-semibold text-foreground tracking-tight">
            Mini<span className="text-accent">CRM</span>
          </span>
        </div>

        {/* Back link */}
        <Link
          href="/clients"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <svg aria-hidden className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Clients
        </Link>
      </header>

      {/* Page content */}
      <main className="container mx-auto max-w-lg px-6 py-8">
        <h2 className="text-2xl font-semibold text-foreground mb-6">New client</h2>

        {/* Form card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xl shadow-black/30">
          <CreateClientForm />
        </div>
      </main>
    </div>
  );
}

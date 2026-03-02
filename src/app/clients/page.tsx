import { Card } from "@/components/ui/card";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";


export default async function ClientsPage() {
  console.log("Checking session on /clients");
  const supabase = await createSupabaseServerClient();
  // Get authenticated user
  const { data: { user } } = await supabase.auth.getUser();

  // Redirect if not authenticated
  if (!user) {
    console.log("user not authenticated => REDIRECTED to /login");
    redirect("/login");
  }
  const clientsFetch = `${process.env.API_BASE_URL}/clients`;
  const clientsList = await fetch(clientsFetch);

  if (!clientsList.ok) { throw new Error("Failed to fetch clients") }

  const result = await clientsList.json();

  type Client = { id: number; name: string; email: string };

  return (
    <div className="min-h-screen bg-background">

      {/* Top header bar */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card/80 backdrop-blur-sm px-6 py-4">
        <div className="flex items-center gap-3">
          {/* Logo mark */}
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
          <h1 className="text-lg font-semibold text-foreground tracking-tight">
            Mini<span className="text-accent">CRM</span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-sm text-muted-foreground">
            {user.email}
          </span>
          <LogoutButton />
        </div>
      </header>

      {/* Page content */}
      <main className="container mx-auto max-w-3xl px-6 py-8">
        {/* Heading + action row */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Clients</h2>
          <Link
            href="/clients/new"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-md shadow-accent/20 transition-all hover:brightness-110 hover:shadow-accent/35 hover:-translate-y-0.5"
          >
            <svg aria-hidden className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            New client
          </Link>
        </div>

        <ul className="flex flex-col gap-3">
          {result.map(({ id, name, email }: Client) => (
            <Card
              key={id}
              className="flex flex-wrap items-center gap-x-8 gap-y-1 px-6 py-4 border border-border bg-card hover:border-accent/40 hover:ring-1 hover:ring-accent/20 transition-all"
            >
              {/* Client name */}
              <span className="text-sm font-medium text-foreground min-w-[140px]">
                {name}
              </span>
              {/* Email */}
              <span className="text-sm text-muted-foreground flex-1">
                {email}
              </span>
              {/* ID badge */}
              <span className="text-xs text-muted-foreground/60 font-mono">
                #{id}
              </span>
            </Card>
          ))}
        </ul>
      </main>
    </div>
  );
}


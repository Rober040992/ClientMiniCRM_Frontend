import { Card } from "@/components/ui/card";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";
import DashboardHeader from "@/components/DashboardHeader";
import { PlusIcon } from "@/components/icons";

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

      <DashboardHeader
        right={
          <>
            <span className="hidden sm:block text-sm text-muted-foreground">
              {user.email}
            </span>
            <LogoutButton />
          </>
        }
      />

      {/* Page content */}
      <main className="container mx-auto max-w-3xl px-6 py-8">
        {/* Heading + action row */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-foreground">Clients</h2>
          <Link
            href="/clients/new"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-accent-foreground shadow-md shadow-accent/20 transition-all hover:brightness-110 hover:shadow-accent/35 hover:-translate-y-0.5"
          >
            <PlusIcon />
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


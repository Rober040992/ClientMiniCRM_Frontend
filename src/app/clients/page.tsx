import { Card } from "@/components/ui/card";
import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";
import DashboardHeader from "@/components/DashboardHeader";
import { PlusIcon } from "@/components/icons";
import DeleteClientButton from "./_delete-client-button";

type Client = { id: number; name: string; email: string };

// Runtime type guard for client records returned by the external API
function isClient(value: unknown): value is Client {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  // value as object with string key , unknown key values
  const record = value as Record<string, unknown>;

  return (
    typeof record.id === "number" &&
    typeof record.name === "string" &&
    typeof record.email === "string"
  );
}

export default async function ClientsPage() {
  console.log("Checking session on /clients");
  const supabase = await createSupabaseServerClient();
  // Get authenticated user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect if not authenticated
  if (!user) {
    console.log("user not authenticated => REDIRECTED to /login");
    redirect("/login");
  }
  const clientsFetch = `${process.env.API_BASE_URL}/clients`;
  const clientsList = await fetch(clientsFetch);

  if (!clientsList.ok) {
    throw new Error("Failed to fetch clients");
  }

  // Treat API data as unknown until we validate its shape.
  const result: unknown = await clientsList.json();

  if (!Array.isArray(result) || !result.every(isClient)) {
    throw new Error("Invalid clients response");
  }

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
            <li key={id}>
              <DeleteClientButton clientId={id} size="xs" className="flex justify-end mb-1 mt-2"/>
              <Card className="flex flex-wrap items-center gap-3 border border-border bg-card px-6 py-4 transition-all hover:border-accent/40 hover:ring-1 hover:ring-accent/20">
                <Link
                  href={`/clients/${id}`}
                  className="flex min-w-0 flex-1 flex-wrap items-center gap-x-8 gap-y-1"
                >
                  <span className="min-w-35 text-sm font-medium text-foreground">
                    {name}
                  </span>
                  <span className="flex-1 text-sm text-muted-foreground">
                    {email}
                  </span>
                  <span className="text-xs font-mono text-muted-foreground/60">
                    #{id}
                  </span>
                </Link>
              </Card>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

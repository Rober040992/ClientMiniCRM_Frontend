import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import DashboardHeader from "@/components/DashboardHeader";
import { ArrowLeftIcon } from "@/components/icons";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Client = {
  id: number;
  name: string;
  email: string;
};

type ClientDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

function isClient(value: unknown): value is Client {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const record = value as Record<string, unknown>;

  return (
    typeof record.id === "number" &&
    typeof record.name === "string" &&
    typeof record.email === "string"
  );
}

export default async function ClientDetailPage({
  params,
}: ClientDetailPageProps) {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { id } = await params;
  const clientId = Number(id);

  if (!Number.isInteger(clientId) || clientId <= 0) {
    notFound();
  }

  const clientResponse = await fetch(
    `${process.env.API_BASE_URL}/clients/${clientId}`
  );

  if (clientResponse.status === 404) {
    notFound();
  }

  if (!clientResponse.ok) {
    throw new Error("Failed to fetch client");
  }

  const clientData: unknown = await clientResponse.json();

  if (!isClient(clientData)) {
    throw new Error("Invalid client response");
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader
        right={
          <Link
            href="/clients"
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon />
            Clients
          </Link>
        }
      />

      <main className="container mx-auto max-w-3xl px-6 py-8">
        <div className="mb-6">
          <p className="text-sm text-muted-foreground">Client detail</p>
          <h2 className="text-2xl font-semibold text-foreground">
            {clientData.name}
          </h2>
        </div>

        <section className="rounded-2xl border border-border bg-card p-6 shadow-xl shadow-black/30">
          <dl className="grid gap-5 sm:grid-cols-2">
            <div className="flex flex-col gap-1">
              <dt className="text-sm text-muted-foreground">Name</dt>
              <dd className="text-sm font-medium text-foreground">
                {clientData.name}
              </dd>
            </div>

            <div className="flex flex-col gap-1">
              <dt className="text-sm text-muted-foreground">Email</dt>
              <dd className="text-sm text-foreground">{clientData.email}</dd>
            </div>

            <div className="flex flex-col gap-1">
              <dt className="text-sm text-muted-foreground">Client ID</dt>
              <dd className="text-sm font-mono text-foreground">
                #{clientData.id}
              </dd>
            </div>
          </dl>
        </section>
      </main>
    </div>
  );
}

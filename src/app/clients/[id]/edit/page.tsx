import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import DashboardHeader from "@/components/DashboardHeader";
import { ArrowLeftIcon } from "@/components/icons";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import EditClientForm from "./_form";

type Client = {
  id: number;
  name: string;
  email: string;
};

type EditClientPageProps = {
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

export default async function EditClientPage({ params }: EditClientPageProps) {
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
            href={`/clients/${clientId}`}
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeftIcon />
            Client detail
          </Link>
        }
      />

      <main className="container mx-auto max-w-lg px-6 py-8">
        <h2 className="mb-6 text-2xl font-semibold text-foreground">Edit client data</h2>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-xl shadow-black/30">
          <EditClientForm
            clientId={clientData.id}
            initialName={clientData.name}
            initialEmail={clientData.email}
          />
        </div>
      </main>
    </div>
  );
}

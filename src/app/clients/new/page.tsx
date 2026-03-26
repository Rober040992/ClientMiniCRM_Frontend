import { redirect } from "next/navigation";
import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import CreateClientForm from "./_form";
import DashboardHeader from "@/components/DashboardHeader";
import { ArrowLeftIcon } from "@/components/icons";

export default async function NewClientPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Guard — same pattern as /clients
  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-background">

      <DashboardHeader
        right={
          <Link
            href="/clients"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeftIcon />
            Clients
          </Link>
        }
      />

      {/* Page content */}
      <main className="container max-w-lg py-8">
        <h2 className="text-2xl font-semibold text-foreground mb-6">New client</h2>

        {/* Form card */}
        <div className="rounded-2xl border border-border bg-card p-6 shadow-xl shadow-black/30">
          <CreateClientForm />
        </div>
      </main>
    </div>
  );
}

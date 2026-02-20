import { Card } from "@/components/ui/card";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import  LogoutButton  from "@/components/LogoutButton";

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

  const result = await clientsList.json();

  type Client = { id: number; name: string; email: string };

  return (
    <>
      <h1 className="container text-primary  py-4 text-2xl">Client list</h1>
        <div className="container flex justify-end py-4">
          <LogoutButton />
        </div>
      <div>
        <ul className="container flex flex-col gap-4">
          {result.map(({ id, name, email }: Client) => (
            <Card key={id} className="flex gap-8">
              <h4 className="ml-4">Name: {name}</h4>
              <h4 className="ml-4">Email: {email}</h4>
              <h4 className="ml-4">Id: {id}</h4>
            </Card>
          ))}
        </ul>
      </div>
    </>
  );
}

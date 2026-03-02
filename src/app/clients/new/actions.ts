"use server";

import { redirect } from "next/navigation";

type ActionState = { error: string } | null;

// Server Action — POST new client to the API, then redirect to the list.
export async function createClient(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;

  const response = await fetch(`${process.env.API_BASE_URL}/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });

  if (!response.ok) {
    return { error: "Failed to create client. Please try again." };
  }

  // redirect() throws internally — must be outside try/catch
  redirect("/clients");
}

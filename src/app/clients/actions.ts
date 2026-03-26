"use server";

import { redirect } from "next/navigation";

export async function deleteClient(clientId: number): Promise<void> {
  const response = await fetch(`${process.env.API_BASE_URL}/clients/${clientId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete client");
  }

  redirect("/clients");
}

"use server";

import { redirect } from "next/navigation";

type ActionState = { error: string } | null;

function getFieldValue(formData: FormData, key: string): string | null {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return null;
  }

  const trimmedValue = value.trim();

  return trimmedValue.length > 0 ? trimmedValue : null;
}

export async function updateClient(
  clientId: number,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = getFieldValue(formData, "name");
  const email = getFieldValue(formData, "email");

  if (!name || !email) {
    return { error: "Name and email are required." };
  }

  const response = await fetch(`${process.env.API_BASE_URL}/clients/${clientId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email }),
  });

  if (!response.ok) {
    return { error: "Failed to update client. Please try again." };
  }

  redirect("/clients");
}

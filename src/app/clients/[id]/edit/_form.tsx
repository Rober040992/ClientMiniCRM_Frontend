"use client";

import { useActionState } from "react";
import { updateClient } from "./actions";

type ActionState = { error: string } | null;

type EditClientFormProps = {
  clientId: number;
  initialName: string;
  initialEmail: string;
};

export default function EditClientForm({
  clientId,
  initialName,
  initialEmail,
}: EditClientFormProps) {
  const updateClientWithId = updateClient.bind(null, clientId);
  const [state, action, isPending] = useActionState<ActionState, FormData>(
    updateClientWithId,
    null
  );

  return (
    <form action={action} className="flex flex-col gap-5">
      {state?.error && (
        <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-4 py-2 text-sm text-destructive">
          {state.error}
        </p>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="client-name" className="text-sm font-medium text-foreground">
          Name
        </label>
        <input
          id="client-name"
          name="name"
          type="text"
          required
          defaultValue={initialName}
          placeholder="Client name"
          className="rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent/60"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="client-email" className="text-sm font-medium text-foreground">
          Email
        </label>
        <input
          id="client-email"
          name="email"
          type="email"
          required
          defaultValue={initialEmail}
          placeholder="client@example.com"
          className="rounded-lg border border-border bg-secondary px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-accent/60"
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="mt-1 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-accent-foreground shadow-md shadow-accent/20 transition-all hover:-translate-y-0.5 hover:brightness-110 hover:shadow-accent/35 disabled:cursor-not-allowed disabled:translate-y-0 disabled:opacity-60"
      >
        {isPending ? "Saving..." : "Save changes"}
      </button>
    </form>
  );
}

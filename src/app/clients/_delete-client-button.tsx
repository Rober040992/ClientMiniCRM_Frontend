"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { deleteClient } from "./actions";

type DeleteClientButtonProps = {
  clientId: number;
  size?: "default" | "sm" | "xs";
} & React.ComponentProps<"form">;

function SubmitButton({
  size = "default",
}: {
  size?: DeleteClientButtonProps["size"];
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant="destructive" size={size} disabled={pending}>
      {pending ? "Deleting..." : "Delete"}
    </Button>
  );
}

export default function DeleteClientButton({
  clientId,
  size = "default",
  ...props
}: DeleteClientButtonProps) {
  const deleteClientById = deleteClient.bind(null, clientId);

  return (
    <form action={deleteClientById} {...props}>
      <SubmitButton size={size} />
    </form>
  );
}

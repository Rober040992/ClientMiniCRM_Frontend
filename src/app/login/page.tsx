import { redirect } from "next/navigation";
import LoginWithGoogleCard from "@/components/LoginWithGoogleCard";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function LoginPage() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/clients");
  }

  return <LoginWithGoogleCard />;
}

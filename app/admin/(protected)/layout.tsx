import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Sidebar from "@/components/admin/Sidebar";

// Defense in depth: `proxy.ts` already redirects unauthenticated requests
// away from `/admin/*` before this ever renders, but a Server Component
// checking the session itself means this section is never one config change
// away from being unprotected.
export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  return (
    <div className="flex">
      <Sidebar adminEmail={user.email ?? "Admin"} />
      <main className="min-w-0 flex-1 p-4 pt-6 lg:p-8">{children}</main>
    </div>
  );
}

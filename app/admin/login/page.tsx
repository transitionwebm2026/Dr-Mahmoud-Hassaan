import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = { title: "Sign In" };

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-radial-glow" />
      <LoginForm next={next ?? "/admin"} />
    </div>
  );
}

import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import NavbarFooterForm from "@/components/admin/navbar-footer/NavbarFooterForm";

export const dynamic = "force-dynamic";

export default async function NavbarFooterSettingsPage() {
  const supabase = await createClient();
  const { data: settings } = await supabase.from("clinic_settings").select("*").limit(1).maybeSingle();

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">Navbar & Footer</h1>
        <p className="mt-1 text-sm text-ink/60">
          Control every part of the header and footer shown on every page of the site.
        </p>
      </div>

      <p className="glass-card p-5 text-sm text-ink/60">
        Address, phone numbers, email, and social media links are edited from the{" "}
        <Link href="/admin/pages/contact" className="font-bold text-brand-700 hover:underline">
          Contact page
        </Link>
        . They&apos;re shared everywhere those details appear — the footer, the navbar&apos;s mobile menu, and the
        contact panel in every page&apos;s Hero section all show the exact same phone number and social links.
        Everything else in the header and footer — logo, name, links, buttons, column titles, copyright — is
        controlled from this page.
      </p>

      {settings ? (
        <NavbarFooterForm settings={settings} />
      ) : (
        <p className="glass-card p-5 text-sm text-rose-600">
          No clinic settings row found yet — set up the Contact page&apos;s clinic info first.
        </p>
      )}
    </div>
  );
}

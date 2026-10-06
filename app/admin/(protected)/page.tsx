import Link from "next/link";
import {
  Stethoscope,
  Star,
  Video,
  Newspaper,
  CircleHelp,
  Inbox,
  ArrowUpRight,
  Clock,
  Phone,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function getOverviewData() {
  const supabase = await createClient();

  const [surgeries, treatments, reviews, videos, articles, faqs, appointments, newAppointments, recentAppointments] =
    await Promise.all([
      supabase.from("surgeries_services").select("id", { count: "exact", head: true }),
      supabase.from("treatments").select("id", { count: "exact", head: true }),
      supabase.from("reviews").select("id", { count: "exact", head: true }),
      supabase.from("videos").select("id", { count: "exact", head: true }),
      supabase.from("articles").select("id", { count: "exact", head: true }),
      supabase.from("faqs").select("id", { count: "exact", head: true }),
      supabase.from("contact_appointments").select("id", { count: "exact", head: true }),
      supabase
        .from("contact_appointments")
        .select("id", { count: "exact", head: true })
        .eq("status", "new"),
      supabase
        .from("contact_appointments")
        .select("id, name, phone, specialty, status, created_at")
        .order("created_at", { ascending: false })
        .limit(6),
    ]);

  return {
    counts: {
      surgeries: surgeries.count ?? 0,
      treatments: treatments.count ?? 0,
      reviews: reviews.count ?? 0,
      videos: videos.count ?? 0,
      articles: articles.count ?? 0,
      faqs: faqs.count ?? 0,
      appointments: appointments.count ?? 0,
      newAppointments: newAppointments.count ?? 0,
    },
    recentAppointments: recentAppointments.data ?? [],
  };
}

function formatReceived(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

const STATUS_STYLES: Record<string, string> = {
  new: "bg-amber-100 text-amber-700",
  contacted: "bg-blue-100 text-blue-700",
  completed: "bg-emerald-100 text-emerald-700",
};

export default async function AdminOverviewPage() {
  const { counts, recentAppointments } = await getOverviewData();

  const cards = [
    { label: "Surgeries & Services", value: counts.surgeries, href: "/admin/pages/services", icon: Stethoscope },
    { label: "Treatments", value: counts.treatments, href: "/admin/pages/services", icon: Stethoscope },
    { label: "Patient Reviews", value: counts.reviews, href: "/admin/pages/reviews", icon: Star },
    { label: "Videos", value: counts.videos, href: "/admin/pages/videos", icon: Video },
    { label: "Articles", value: counts.articles, href: "/admin/pages/articles", icon: Newspaper },
    { label: "FAQs", value: counts.faqs, href: "/admin/pages/home", icon: CircleHelp },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-ink/60">Quick snapshot of your site content and incoming requests.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Link href="/admin/pages/contact" className="glass-card col-span-2 p-4 sm:p-5 lg:col-span-1">
          <div className="flex items-center justify-between">
            <span className="icon-chip !h-11 !w-11">
              <Inbox className="h-5 w-5" />
            </span>
            {counts.newAppointments > 0 && (
              <span className="rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-700">
                {counts.newAppointments} new
              </span>
            )}
          </div>
          <p className="mt-4 text-2xl font-extrabold text-ink sm:text-3xl">{counts.appointments}</p>
          <p className="text-sm font-medium text-ink/60">Consultation Requests</p>
        </Link>

        {cards.map((card) => (
          <Link key={card.label} href={card.href} className="glass-card p-4 sm:p-5">
            <span className="icon-chip !h-10 !w-10 sm:!h-11 sm:!w-11">
              <card.icon className="h-5 w-5" />
            </span>
            <p className="mt-3 text-2xl font-extrabold text-ink sm:mt-4 sm:text-3xl">{card.value}</p>
            <p className="text-xs font-medium leading-snug text-ink/60 sm:text-sm">{card.label}</p>
          </Link>
        ))}
      </div>

      <div className="glass-panel p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-base font-extrabold text-ink sm:text-lg">Recent Consultation Requests</h2>
          <Link
            href="/admin/pages/contact"
            className="flex shrink-0 items-center gap-1 text-sm font-semibold text-brand hover:underline"
          >
            View all <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {recentAppointments.length === 0 ? (
          <p className="py-8 text-center text-sm text-ink/50">No consultation requests yet.</p>
        ) : (
          <>
          {/* Phones: one card per request, phone number tap-to-call. */}
          <ul className="space-y-2.5 md:hidden">
            {recentAppointments.map((row) => (
              <li key={row.id} className="rounded-2xl border border-white/50 bg-white/60 p-3.5">
                <div className="flex items-start justify-between gap-2">
                  <p className="min-w-0 truncate font-bold text-ink">{row.name}</p>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-bold capitalize ${
                      STATUS_STYLES[row.status] ?? "bg-ink/10 text-ink/60"
                    }`}
                  >
                    {row.status}
                  </span>
                </div>
                {row.specialty && <p className="mt-0.5 text-sm text-ink/60">{row.specialty}</p>}
                <div className="mt-2 flex items-center justify-between gap-2 text-sm">
                  <a href={`tel:${row.phone}`} className="flex min-h-10 items-center gap-1.5 font-semibold text-brand-700">
                    <Phone className="h-4 w-4" />
                    {row.phone}
                  </a>
                  <span className="flex items-center gap-1.5 text-xs text-ink/50">
                    <Clock className="h-3.5 w-3.5" />
                    {formatReceived(row.created_at)}
                  </span>
                </div>
              </li>
            ))}
          </ul>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink/10 text-left text-xs font-semibold uppercase tracking-wide text-ink/45">
                  <th className="py-2 pe-4">Name</th>
                  <th className="py-2 pe-4">Phone</th>
                  <th className="py-2 pe-4">Specialty</th>
                  <th className="py-2 pe-4">Status</th>
                  <th className="py-2 pe-4">Received</th>
                </tr>
              </thead>
              <tbody>
                {recentAppointments.map((row) => (
                  <tr key={row.id} className="border-b border-ink/5 last:border-0">
                    <td className="py-3 pe-4 font-semibold text-ink">{row.name}</td>
                    <td className="py-3 pe-4 text-ink/70">
                      <a href={`tel:${row.phone}`} className="flex items-center gap-1.5 hover:text-brand-700">
                        <Phone className="h-3.5 w-3.5 text-ink/40" />
                        {row.phone}
                      </a>
                    </td>
                    <td className="py-3 pe-4 text-ink/70">{row.specialty || "—"}</td>
                    <td className="py-3 pe-4">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${
                          STATUS_STYLES[row.status] ?? "bg-ink/10 text-ink/60"
                        }`}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="py-3 pe-4 text-ink/50">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {formatReceived(row.created_at)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          </>
        )}
      </div>
    </div>
  );
}

import type { LucideIcon } from "lucide-react";
import { LayoutDashboard, FileStack, PanelTop } from "lucide-react";

export interface AdminNavLink {
  href: string;
  label: string;
  icon: LucideIcon;
}

export interface AdminNavGroup {
  label: string;
  icon: LucideIcon;
  children: AdminNavLink[];
}

export type AdminNavEntry = AdminNavLink | AdminNavGroup;

export function isNavGroup(entry: AdminNavEntry): entry is AdminNavGroup {
  return "children" in entry;
}

export const PAGE_SECTIONS: { slug: string; label: string }[] = [
  { slug: "home", label: "Home" },
  { slug: "about", label: "About" },
  { slug: "services", label: "Services" },
  { slug: "videos", label: "Videos" },
  { slug: "articles", label: "Articles" },
  { slug: "reviews", label: "Reviews" },
  { slug: "contact", label: "Contact" },
];

// The sidebar is intentionally minimal: every piece of editable content
// lives inside the page it actually appears on (see app/admin/(protected)/
// pages/[slug]/page.tsx). Navbar & Footer are the one exception — they
// render on every page rather than belonging to any single one, so they get
// their own top-level entry instead of living under "Pages".
export const ADMIN_NAV_ITEMS: AdminNavEntry[] = [
  { href: "/admin", label: "Dashboard Overview", icon: LayoutDashboard },
  {
    label: "Pages",
    icon: FileStack,
    children: PAGE_SECTIONS.map((page) => ({
      href: `/admin/pages/${page.slug}`,
      label: page.label,
      icon: FileStack,
    })),
  },
  { href: "/admin/navbar-footer", label: "Navbar & Footer", icon: PanelTop },
];

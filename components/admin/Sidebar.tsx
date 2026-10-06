"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronsLeft,
  ChevronsRight,
  ChevronDown,
  ExternalLink,
  LogOut,
  Loader2,
  Menu,
  ShieldCheck,
  X,
} from "lucide-react";
import { ADMIN_NAV_ITEMS, getAdminScreenTitle, getLiveSitePath, isNavGroup } from "@/lib/admin/nav";
import { logout } from "@/app/admin/actions";

function Brand() {
  return (
    <div className="flex items-center gap-2">
      <span className="icon-chip !h-9 !w-9">
        <ShieldCheck className="h-4.5 w-4.5" />
      </span>
      <div className="leading-tight">
        <p className="text-sm font-extrabold text-ink">Admin CMS</p>
        <p className="text-[11px] text-ink/50">Dr. Mahmoud Hassan</p>
      </div>
    </div>
  );
}

/**
 * The nav links themselves, shared by the desktop sidebar and the mobile
 * drawer. `roomy` gives the drawer larger, thumb-friendly tap targets.
 */
function NavLinks({ collapsed = false, roomy = false }: { collapsed?: boolean; roomy?: boolean }) {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>("Pages");
  const rowPadding = roomy ? "py-3" : "py-2.5";

  return (
    <>
      {ADMIN_NAV_ITEMS.map((item) => {
        if (isNavGroup(item)) {
          const isGroupActive = item.children.some((child) => pathname.startsWith(child.href));
          const isOpen = collapsed ? isGroupActive : openGroup === item.label || isGroupActive;
          const GroupIcon = item.icon;

          return (
            <div key={item.label}>
              <button
                type="button"
                onClick={() => setOpenGroup((cur) => (cur === item.label ? null : item.label))}
                title={collapsed ? item.label : undefined}
                className={`flex w-full items-center gap-3 rounded-xl px-3 ${rowPadding} text-sm font-semibold transition ${
                  isGroupActive ? "text-brand-700" : "text-ink/70 hover:bg-white/50 hover:text-brand-700"
                }`}
              >
                <GroupIcon className="h-4.5 w-4.5 shrink-0" />
                {!collapsed && (
                  <>
                    <span className="flex-1 truncate text-start">{item.label}</span>
                    <ChevronDown className={`h-3.5 w-3.5 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </>
                )}
              </button>

              {!collapsed && isOpen && (
                <div className="ms-4 mt-1 flex flex-col gap-0.5 border-s border-brand/15 ps-3">
                  {item.children.map((child) => {
                    const active = pathname === child.href;
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={`rounded-lg px-3 ${roomy ? "py-2.5" : "py-2"} text-sm font-medium transition ${
                          active
                            ? "bg-brand-gradient text-white shadow-glow-brand"
                            : "text-ink/60 hover:bg-white/50 hover:text-brand-700"
                        }`}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        }

        const active = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            title={collapsed ? item.label : undefined}
            className={`flex items-center gap-3 rounded-xl px-3 ${rowPadding} text-sm font-semibold transition ${
              active ? "bg-brand-gradient text-white shadow-glow-brand" : "text-ink/70 hover:bg-white/50 hover:text-brand-700"
            }`}
          >
            <Icon className="h-4.5 w-4.5 shrink-0" />
            {!collapsed && <span className="truncate">{item.label}</span>}
          </Link>
        );
      })}
    </>
  );
}

function LogoutButton({ collapsed = false }: { collapsed?: boolean }) {
  const [isLoggingOut, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={isLoggingOut}
      onClick={() => startTransition(() => logout())}
      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 disabled:opacity-60"
    >
      {isLoggingOut ? <Loader2 className="h-4.5 w-4.5 animate-spin" /> : <LogOut className="h-4.5 w-4.5" />}
      {!collapsed && <span>Logout</span>}
    </button>
  );
}

/**
 * Phones & tablets (below `lg`): a sticky top bar with the current screen's
 * title, plus a slide-in drawer holding the full navigation — the desktop
 * sidebar would otherwise eat most of a phone's width.
 */
function MobileNav({ adminEmail }: { adminEmail: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the drawer whenever navigation lands on a new screen.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-white/40 bg-white/80 px-2 backdrop-blur-xl">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-ink/70 transition hover:bg-white hover:text-brand-700"
          aria-label="Open menu"
          aria-expanded={open}
        >
          <Menu className="h-5 w-5" />
        </button>
        <p className="min-w-0 flex-1 truncate text-base font-extrabold text-ink">{getAdminScreenTitle(pathname)}</p>
        <Link
          href={getLiveSitePath(pathname)}
          target="_blank"
          className="flex h-11 w-11 items-center justify-center rounded-xl text-ink/70 transition hover:bg-white hover:text-brand-700"
          aria-label="View on website"
        >
          <ExternalLink className="h-5 w-5" />
        </Link>
      </header>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Admin menu">
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-y-0 start-0 flex w-[86%] max-w-[320px] flex-col bg-white shadow-glass-lg"
            >
              <div className="flex items-center justify-between border-b border-ink/10 px-4 py-4">
                <Brand />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-ink/60 transition hover:bg-mist hover:text-ink"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Also closes on taps of the current screen's own link, which doesn't change the pathname. */}
              <nav
                onClick={(e) => (e.target as HTMLElement).closest("a") && setOpen(false)}
                className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-3"
              >
                <NavLinks roomy />
              </nav>

              <div className="space-y-1 border-t border-ink/10 p-3">
                <Link
                  href="/"
                  target="_blank"
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-ink/70 transition hover:bg-mist hover:text-brand-700"
                >
                  <ExternalLink className="h-4.5 w-4.5" />
                  Open Website
                </Link>
                <p className="truncate px-3 pt-1 text-xs font-medium text-ink/50" title={adminEmail}>
                  {adminEmail}
                </p>
                <LogoutButton />
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Sidebar({ adminEmail }: { adminEmail: string }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <MobileNav adminEmail={adminEmail} />

      <aside
        className={`glass-panel sticky top-4 z-20 m-4 hidden h-[calc(100vh-2rem)] shrink-0 flex-col justify-between transition-all duration-300 lg:flex ${
          collapsed ? "w-[76px]" : "w-[272px]"
        }`}
      >
        <div className="min-h-0 flex-1 overflow-hidden">
          <div className="flex items-center justify-between gap-2 border-b border-white/30 px-4 py-5">
            {!collapsed && <Brand />}
            <button
              type="button"
              onClick={() => setCollapsed((v) => !v)}
              className="ms-auto flex h-8 w-8 items-center justify-center rounded-lg text-ink/60 transition hover:bg-white/50 hover:text-brand"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
            </button>
          </div>

          <nav className="flex h-full flex-col gap-1 overflow-y-auto p-3">
            <NavLinks collapsed={collapsed} />
          </nav>
        </div>

        <div className="border-t border-white/30 p-3">
          {!collapsed && (
            <p className="mb-2 truncate px-2 text-xs font-medium text-ink/50" title={adminEmail}>
              {adminEmail}
            </p>
          )}
          <LogoutButton collapsed={collapsed} />
        </div>
      </aside>
    </>
  );
}

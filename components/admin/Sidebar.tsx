"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronsLeft, ChevronsRight, ChevronDown, LogOut, Loader2, ShieldCheck } from "lucide-react";
import { ADMIN_NAV_ITEMS, isNavGroup } from "@/lib/admin/nav";
import { logout } from "@/app/admin/actions";

export default function Sidebar({ adminEmail }: { adminEmail: string }) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>("Pages");
  const [isLoggingOut, startTransition] = useTransition();

  return (
    <aside
      className={`glass-panel sticky top-4 z-20 m-4 flex h-[calc(100vh-2rem)] flex-col justify-between transition-all duration-300 ${
        collapsed ? "w-[76px]" : "w-[272px]"
      }`}
    >
      <div className="min-h-0 flex-1 overflow-hidden">
        <div className="flex items-center justify-between gap-2 border-b border-white/30 px-4 py-5">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <span className="icon-chip !h-9 !w-9">
                <ShieldCheck className="h-4.5 w-4.5" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-extrabold text-ink">Admin CMS</p>
                <p className="text-[11px] text-ink/50">Dr. Mahmoud Hassan</p>
              </div>
            </div>
          )}
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
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
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
                            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
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
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "bg-brand-gradient text-white shadow-glow-brand"
                    : "text-ink/70 hover:bg-white/50 hover:text-brand-700"
                }`}
              >
                <Icon className="h-4.5 w-4.5 shrink-0" />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-white/30 p-3">
        {!collapsed && (
          <p className="mb-2 truncate px-2 text-xs font-medium text-ink/50" title={adminEmail}>
            {adminEmail}
          </p>
        )}
        <button
          type="button"
          disabled={isLoggingOut}
          onClick={() => startTransition(() => logout())}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-rose-600 transition hover:bg-rose-50 disabled:opacity-60"
        >
          {isLoggingOut ? (
            <Loader2 className="h-4.5 w-4.5 animate-spin" />
          ) : (
            <LogOut className="h-4.5 w-4.5" />
          )}
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

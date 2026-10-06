"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { PAGE_SECTIONS } from "@/lib/admin/nav";

/**
 * Phones/tablets only: a swipeable row of every site page, so switching
 * pages doesn't need a trip through the menu drawer. (The desktop sidebar
 * already lists them.)
 */
export default function PageSwitcher({ current }: { current: string }) {
  const activeRef = useRef<HTMLAnchorElement>(null);

  // Bring the current page's pill into view when it's off the edge of the row.
  useEffect(() => {
    activeRef.current?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [current]);

  return (
    <nav aria-label="Site pages" className="-mx-4 lg:hidden">
      <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 pb-1">
        {PAGE_SECTIONS.map((page) => {
          const active = page.slug === current;
          return (
            <Link
              key={page.slug}
              ref={active ? activeRef : undefined}
              href={`/admin/pages/${page.slug}`}
              aria-current={active ? "page" : undefined}
              className={`flex min-h-10 shrink-0 items-center rounded-full px-4 text-sm font-bold transition ${
                active
                  ? "bg-brand-gradient text-white shadow-glow-brand"
                  : "border border-white/60 bg-white/60 text-ink/65 hover:text-brand-700"
              }`}
            >
              {page.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

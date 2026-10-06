"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ListTree } from "lucide-react";
import { sectionAnchorId } from "@/lib/admin/nav";

/**
 * Sticky "Jump to section" picker for the long page editors. A native
 * <select> so phones open their own wheel/list picker. It also follows the
 * scroll position, so it doubles as a "you are here" label.
 */
export default function SectionJumpNav({ titles }: { titles: string[] }) {
  const [active, setActive] = useState(titles[0] ?? "");

  useEffect(() => {
    const elements = titles
      .map((title) => document.getElementById(sectionAnchorId(title)))
      .filter((el): el is HTMLElement => el !== null);

    // A section counts as "current" once it crosses a line ~35% down the screen.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const title = titles.find((t) => sectionAnchorId(t) === entry.target.id);
            if (title) setActive(title);
          }
        }
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [titles]);

  if (titles.length < 2) return null;

  function jumpTo(title: string) {
    setActive(title);
    document.getElementById(sectionAnchorId(title))?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="sticky top-16 z-20 lg:top-4">
      <label className="relative flex items-center rounded-2xl border border-white/50 bg-white/85 shadow-glass backdrop-blur-xl">
        <span className="sr-only">Jump to section</span>
        <ListTree className="pointer-events-none absolute start-3.5 h-4 w-4 text-brand-700" />
        <select
          value={active}
          onChange={(e) => jumpTo(e.target.value)}
          className="min-h-12 w-full cursor-pointer appearance-none truncate rounded-2xl bg-transparent py-3 pe-10 ps-10 text-base font-bold text-ink outline-none focus:ring-2 focus:ring-brand/25 sm:text-sm"
        >
          {titles.map((title, i) => (
            <option key={title} value={title}>
              {i + 1}. {title}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute end-3.5 h-4 w-4 text-ink/40" />
      </label>
    </div>
  );
}

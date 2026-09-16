"use client";

import { useEffect, useState } from "react";

/**
 * Tracks whether the viewport is below Tailwind's `lg` breakpoint (1024px by
 * default) — the same breakpoint the two-column "split" sections use to
 * stack into a single column. Used to switch a section's entrance animation
 * from a horizontal slide (safe once there's a second column to slide past)
 * to a vertical one on narrow screens, where a sideways offset on a
 * full-width block can clip against the viewport edge instead.
 *
 * Defaults to `false` (desktop) so the server-rendered markup and the first
 * client render agree — the real value is only read after mount, then kept
 * in sync on resize, to avoid a hydration mismatch.
 */
export function useIsMobile(breakpointPx = 1024): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia(`(max-width: ${breakpointPx - 1}px)`);
    const update = () => setIsMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [breakpointPx]);

  return isMobile;
}

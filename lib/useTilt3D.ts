"use client";

import { useRef, type MouseEvent } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Shared "liquid glass" 3D tilt interaction: the element leans gently toward
 * the cursor and springs back flat on mouse leave. Skip it on any card that
 * overlays an interactive iframe (e.g. an embedded map) — mouse events don't
 * fire while the cursor is over iframe content, which would leave the tilt
 * stuck mid-rotation instead of resetting.
 */
export function useTilt3D() {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), {
    stiffness: 320,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), {
    stiffness: 320,
    damping: 28,
  });

  function onMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
}

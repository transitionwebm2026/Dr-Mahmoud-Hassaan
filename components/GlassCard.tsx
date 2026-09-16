"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface GlassCardProps {
  media?: ReactNode;
  badge?: ReactNode;
  title: string;
  description: string;
  footer?: ReactNode;
  index?: number;
  className?: string;
  onClick?: () => void;
}

export default function GlassCard({
  media,
  badge,
  title,
  description,
  footer,
  index = 0,
  className = "",
  onClick,
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), {
    stiffness: 320,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), {
    stiffness: 320,
    damping: 28,
  });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ y: -10 }}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={`glass-card group ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {media && (
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-3xl">
          {media}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          {badge && <div className="absolute -bottom-6 start-6 z-10">{badge}</div>}
        </div>
      )}
      <div className={`relative p-6 ${badge ? "pt-10" : "pt-6"}`}>
        <h3 className="mb-2 text-lg font-extrabold text-ink">{title}</h3>
        <p className="text-sm leading-relaxed text-ink/65">{description}</p>
        {footer && <div className="mt-4">{footer}</div>}
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/40 transition-colors duration-500 group-hover:ring-brand/40" />
    </motion.div>
  );
}

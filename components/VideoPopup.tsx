"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";

interface VideoPopupProps {
  src: string;
  poster?: string | null;
  title: string;
  description?: string;
  onClose: () => void;
}

/** Shared video popup for every clickable video on the site (video library,
 * featured videos, the doctor intro video) — always a landscape stage
 * (object-contain on a black backdrop) regardless of the source clip's own
 * orientation, playing the real file instead of a static poster. */
export default function VideoPopup({ src, poster, title, description, onClose }: VideoPopupProps) {
  const { lang } = useLanguage();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-deep-950/80 p-4 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card relative w-full max-w-3xl overflow-hidden !rounded-4xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={pick(lang, { ar: "إغلاق", en: "Close" })}
          className="absolute top-3 end-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition hover:bg-white/30"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative aspect-video w-full bg-black">
          <video
            src={src}
            poster={poster ?? undefined}
            controls
            autoPlay
            playsInline
            className="h-full w-full object-contain"
          />
        </div>

        {(title || description) && (
          <div className="p-6">
            <h3 className="text-lg font-extrabold text-ink">{title}</h3>
            {description && <p className="mt-2 text-sm leading-relaxed text-ink/65">{description}</p>}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

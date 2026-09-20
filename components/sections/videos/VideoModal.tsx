"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Pause, Play, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import type { Video } from "@/lib/supabase/types";

interface VideoModalProps {
  video: Video;
  onClose: () => void;
}

export default function VideoModal({ video, onClose }: VideoModalProps) {
  const { lang } = useLanguage();
  const [playing, setPlaying] = useState(false);

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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-deep-950/80 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={pick(lang, { ar: video.title_ar, en: video.title_en })}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 24 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card relative w-full max-w-sm overflow-hidden !rounded-4xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={pick(lang, { ar: "إغلاق", en: "Close" })}
          className="absolute top-3 end-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-md transition hover:bg-white/30"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative aspect-[9/16] w-full">
          {video.thumbnail_url && (
            <Image
              src={video.thumbnail_url}
              alt={pick(lang, { ar: video.title_ar, en: video.title_en })}
              fill
              sizes="400px"
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-deep-950/30" />
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause video" : "Play video"}
            className="group absolute inset-0 flex items-center justify-center transition-colors hover:bg-deep-950/20"
          >
            <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-lg shadow-glow-brand transition-transform duration-300 group-hover:scale-110">
              {playing ? (
                <Pause className="h-8 w-8 text-white" fill="white" />
              ) : (
                <Play className="ms-1 h-8 w-8 text-white" fill="white" />
              )}
            </span>
          </button>
          <span className="absolute bottom-3 end-3 rounded-full bg-black/50 px-2.5 py-1 font-english text-[11px] font-bold text-white backdrop-blur-sm">
            {video.duration}
          </span>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-extrabold text-ink">{pick(lang, { ar: video.title_ar, en: video.title_en })}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink/65">
            {pick(lang, { ar: video.description_ar, en: video.description_en })}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

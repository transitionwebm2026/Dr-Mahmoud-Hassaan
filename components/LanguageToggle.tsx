"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface LanguageToggleProps {
  /** Pass false when the toggle sits over a dark backdrop (e.g. an unscrolled hero) to flip label contrast. */
  scrolled?: boolean;
}

export default function LanguageToggle({ scrolled = true }: LanguageToggleProps) {
  const { lang, toggleLang } = useLanguage();
  const isAr = lang === "ar";

  return (
    <button
      type="button"
      onClick={toggleLang}
      dir="ltr"
      aria-label="Toggle site language / تبديل لغة الموقع"
      className={`relative flex h-11 w-24 shrink-0 items-center rounded-full border p-1 shadow-inner-glass backdrop-blur-md transition-colors duration-300 hover:border-brand/50 ${
        scrolled ? "border-white/40 bg-white/25" : "border-white/25 bg-white/10"
      }`}
    >
      <motion.span
        className="absolute top-1 bottom-1 z-10 flex w-[42px] items-center justify-center rounded-full bg-brand-gradient text-[11px] font-extrabold text-white shadow-glow-brand"
        animate={{ x: isAr ? 2 : 46 }}
        transition={{ type: "spring", stiffness: 420, damping: 32 }}
      >
        {isAr ? "AR" : "EN"}
      </motion.span>
      <span
        className={`relative z-0 flex-1 text-center text-[11px] font-bold transition-colors duration-300 ${
          scrolled ? "text-ink/45" : "text-white/60"
        }`}
      >
        AR
      </span>
      <span
        className={`relative z-0 flex-1 text-center text-[11px] font-bold transition-colors duration-300 ${
          scrolled ? "text-ink/45" : "text-white/60"
        }`}
      >
        EN
      </span>
    </button>
  );
}

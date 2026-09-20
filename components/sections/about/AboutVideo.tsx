"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { Play, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import { DOCTOR } from "@/lib/constants";
import FallbackImage from "@/components/ui/FallbackImage";

// Only needed once the poster is clicked, so it's split into its own chunk
// instead of shipping in the initial page bundle for every visitor.
const VideoPopup = dynamic(() => import("@/components/VideoPopup"), { ssr: false });

export interface AboutVideoProps {
  videoUrl?: string | null;
}

export default function AboutVideo({ videoUrl }: AboutVideoProps) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <section id="doctor-intro" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="section-eyebrow">
            <Sparkles className="h-4 w-4" />
            {pick(lang, { ar: "فيديو تعريفي", en: "Introductory Video" })}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
            {pick(lang, { ar: "قصة الدكتور محمود حسان", en: "Dr. Mahmoud Hassan's Story" })}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">
            {pick(lang, {
              ar: "شاهد الفيديو للتعرف أكثر على رؤيته الطبية ونهجه في التعامل مع مرضى الأورام.",
              en: "Watch to learn more about his medical vision and approach to caring for oncology patients.",
            })}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card relative mt-12 !rounded-4xl overflow-hidden"
        >
          <div className="relative aspect-video w-full">
            <FallbackImage
              src="/images/video-poster.jpg"
              alt={pick(lang, { ar: "الفيديو التعريفي", en: "Introductory Video" })}
              placeholderIcon={Play}
              placeholderVariant="deep"
              placeholderLabel={pick(lang, DOCTOR.name)}
            />
            <div className="absolute inset-0 bg-deep-950/30" />
            {videoUrl && (
              <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={pick(lang, { ar: "تشغيل الفيديو", en: "Play video" })}
                className="group absolute inset-0 flex items-center justify-center transition-colors hover:bg-deep-950/20"
              >
                <span className="flex h-24 w-24 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-lg shadow-glow-brand transition-transform duration-300 group-hover:scale-110">
                  <Play className="ms-1.5 h-9 w-9 text-white" fill="white" />
                </span>
              </button>
            )}
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {open && videoUrl && (
          <VideoPopup
            src={videoUrl}
            poster="/images/video-poster.jpg"
            title={pick(lang, { ar: "قصة الدكتور محمود حسان", en: "Dr. Mahmoud Hassan's Story" })}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

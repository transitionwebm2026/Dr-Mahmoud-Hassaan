"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { Play, ShieldCheck, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import { DOCTOR } from "@/lib/constants";

// Only needed once the poster is clicked, so it's split into its own chunk
// instead of shipping in the initial page bundle for every visitor.
const VideoPopup = dynamic(() => import("@/components/VideoPopup"), { ssr: false });

const DEFAULT_HIGHLIGHTS_AR = [
  "أكثر من 15 عامًا من الخبرة في جراحة الأورام",
  "أحدث تقنيات الجراحة بالمنظار والروبوت",
  "رعاية متكاملة من التشخيص وحتى التعافي",
];

const DEFAULT_HIGHLIGHTS_EN = [
  "15+ years of experience in surgical oncology",
  "Latest laparoscopic & robotic-assisted techniques",
  "Integrated care from diagnosis through recovery",
];

export interface DoctorIntroVideoProps {
  highlightsAr?: string[];
  highlightsEn?: string[];
  videoUrl?: string | null;
}

export default function DoctorIntroVideo({
  highlightsAr = DEFAULT_HIGHLIGHTS_AR,
  highlightsEn = DEFAULT_HIGHLIGHTS_EN,
  videoUrl,
}: DoctorIntroVideoProps) {
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const highlights = (highlightsAr.length === highlightsEn.length ? highlightsAr : DEFAULT_HIGHLIGHTS_AR).map(
    (ar, i) => ({ ar, en: (highlightsEn.length === highlightsAr.length ? highlightsEn : DEFAULT_HIGHLIGHTS_EN)[i] })
  );

  return (
    <section id="doctor-intro" className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.35fr]">
        {/* Text summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center lg:text-start"
        >
          <span className="section-eyebrow">
            <Sparkles className="h-4 w-4" />
            {pick(lang, { ar: "تعرف على طبيبك", en: "Meet Your Doctor" })}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
            {pick(lang, { ar: "رسالة تعريفية من ", en: "An introduction from " })}
            <span className="text-gradient-brand">{pick(lang, DOCTOR.name)}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink/65 sm:text-base lg:mx-0">
            {pick(lang, {
              ar: "في هذا الفيديو، يشارككم د. محمود حسان نهجه في التعامل مع مرضى الأورام، وأهمية التشخيص المبكر، ودور الجراحة الدقيقة في رحلة الشفاء.",
              en: "In this short video, Dr. Mahmoud Hassan shares his approach to treating oncology patients, the importance of early diagnosis, and the role of precise surgery in the recovery journey.",
            })}
          </p>

          <ul className="mx-auto mt-6 max-w-md space-y-3 lg:mx-0">
            {highlights.map((item) => (
              <li key={item.en} className="flex items-center justify-center gap-3 text-sm font-semibold text-ink/75 lg:justify-start">
                <span className="icon-chip !h-8 !w-8 shrink-0">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                {pick(lang, item)}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Video player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="glass-card !rounded-4xl overflow-hidden">
            <div className="relative aspect-video w-full">
              <Image
                src="/images/video-poster.jpg"
                alt={pick(lang, { ar: "الفيديو التعريفي", en: "Intro Video" })}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
                priority
              />
              {videoUrl && (
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-label={pick(lang, { ar: "تشغيل الفيديو", en: "Play video" })}
                  className="group absolute inset-0 flex items-center justify-center bg-deep-950/35 transition-colors hover:bg-deep-950/45"
                >
                  <span className="flex h-20 w-20 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-lg shadow-glow-brand transition-transform duration-300 group-hover:scale-110">
                    <Play className="ms-1 h-8 w-8 text-white" fill="white" />
                  </span>
                </button>
              )}
            </div>
          </div>
          <div className="pointer-events-none absolute -bottom-6 -start-6 -z-10 h-32 w-32 rounded-full bg-brand/20 blur-2xl" />
          <div className="pointer-events-none absolute -top-6 -end-6 -z-10 h-32 w-32 rounded-full bg-deep/20 blur-2xl" />
        </motion.div>
      </div>

      <AnimatePresence>
        {open && videoUrl && (
          <VideoPopup
            src={videoUrl}
            poster="/images/video-poster.jpg"
            title={pick(lang, {
              ar: `رسالة تعريفية من ${DOCTOR.name.ar}`,
              en: `An introduction from ${DOCTOR.name.en}`,
            })}
            onClose={() => setOpen(false)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

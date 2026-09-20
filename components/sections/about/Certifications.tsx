"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { BadgeCheck, CheckCircle2, RotateCw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import { DynamicIcon } from "@/lib/icon-registry";
import type { Certification } from "@/lib/supabase/types";

function CertificationCard({
  cert,
  index,
}: {
  cert: Certification;
  index: number;
}) {
  const { lang } = useLanguage();
  // Click/tap "pins" the card flipped (independent, persists after the
  // pointer leaves — this is what makes it work on touch). Hovering
  // overrides to flipped for as long as the pointer stays, via
  // whileHover, without fighting the pinned state below it — Framer
  // Motion gives gesture props like whileHover priority over animate.
  const [pinned, setPinned] = useState(false);
  const offset = index % 3 === 1 ? "sm:mt-6" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 34, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={offset}
    >
      <button
        type="button"
        onClick={() => setPinned((p) => !p)}
        aria-label={`${pick(lang, { ar: cert.title_ar, en: cert.title_en })} — ${pick(lang, { ar: "اضغط لمزيد من التفاصيل", en: "tap for more detail" })}`}
        className="group h-64 w-full cursor-pointer text-start [perspective:1200px]"
      >
        <motion.div
          animate={{ rotateY: pinned ? 180 : 0 }}
          whileHover={{ rotateY: 180 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full w-full [transform-style:preserve-3d]"
        >
          {/* Front */}
          <div className="glass-card absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center [backface-visibility:hidden]">
            <span className="icon-chip !h-14 !w-14">
              <DynamicIcon tag={cert.icon_tag} className="h-6 w-6" strokeWidth={1.7} />
            </span>
            <h3 className="font-extrabold text-ink">{pick(lang, { ar: cert.title_ar, en: cert.title_en })}</h3>
            <p className="text-sm text-ink/55">{pick(lang, { ar: cert.issuer_ar, en: cert.issuer_en })}</p>
            <span className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <RotateCw className="h-3 w-3" />
              {pick(lang, { ar: "اقلب للتفاصيل", en: "Flip for detail" })}
            </span>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl bg-brand-gradient p-6 text-center text-white shadow-glass-lg [backface-visibility:hidden]"
            style={{ transform: "rotateY(180deg)" }}
          >
            <div className="pointer-events-none absolute inset-0 bg-mesh-medical opacity-30" />
            <CheckCircle2 className="relative h-7 w-7 text-white/90" strokeWidth={1.7} />
            <p className="relative text-sm leading-relaxed text-white/90">{pick(lang, { ar: cert.detail_ar, en: cert.detail_en })}</p>
            <span className="relative mt-1 text-[11px] font-bold text-white/70">{pick(lang, { ar: cert.issuer_ar, en: cert.issuer_en })}</span>
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
}

export interface CertificationsProps {
  certifications: Certification[];
}

export default function Certifications({ certifications }: CertificationsProps) {
  const { lang } = useLanguage();

  return (
    <section className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="section-eyebrow">
            <BadgeCheck className="h-4 w-4" />
            {pick(lang, { ar: "الشهادات والإنجازات", en: "Certificates & Accreditations" })}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
            {pick(lang, { ar: "اعتمادات موثوقة عالميًا", en: "Globally Trusted Credentials" })}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">
            {pick(lang, { ar: "مرر المؤشر أو اضغط على البطاقة لمعرفة المزيد.", en: "Hover or tap a card to reveal more detail." })}
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.id} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

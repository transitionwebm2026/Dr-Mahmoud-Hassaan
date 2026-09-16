"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Award, HeartHandshake, ShieldCheck, Sparkles, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick, type Bilingual } from "@/lib/i18n";
import { DOCTOR } from "@/lib/constants";
import { useIsMobile } from "@/lib/useIsMobile";

const AUTO_ADVANCE_MS = 4500;

const reasons: { icon: LucideIcon; title: Bilingual; description: Bilingual }[] = [
  {
    icon: Award,
    title: { ar: "خبرة أكاديمية وعملية متميزة", en: "Distinguished Academic & Clinical Expertise" },
    description: {
      ar: "مدرس واستشاري جراحة الأورام بالمعهد القومي للأورام - جامعة القاهرة، بخبرة تمتد لأكثر من 15 عامًا.",
      en: "Lecturer & Consultant of Surgical Oncology at the National Cancer Institute, Cairo University, with 15+ years of experience.",
    },
  },
  {
    icon: Sparkles,
    title: { ar: "أحدث تقنيات الجراحة", en: "Latest Surgical Technology" },
    description: {
      ar: "استخدام تقنيات الجراحة بالمنظار والحد الأدنى من التدخل لتقليل الألم وتسريع التعافي.",
      en: "Laparoscopic and minimally invasive techniques that reduce pain and accelerate recovery.",
    },
  },
  {
    icon: HeartHandshake,
    title: { ar: "رعاية إنسانية شخصية", en: "Personalized, Compassionate Care" },
    description: {
      ar: "متابعة شخصية لكل مريض وشرح تفصيلي لكل خطوة في رحلة العلاج.",
      en: "Personal follow-up with every patient and clear guidance through each step of care.",
    },
  },
  {
    icon: ShieldCheck,
    title: { ar: "نتائج وأمان مثبت", en: "Proven Outcomes & Safety" },
    description: {
      ar: "سجل حافل من العمليات الناجحة وفق أعلى معايير السلامة العالمية.",
      en: "A strong track record of successful surgeries under the highest global safety standards.",
    },
  },
];

export default function WhyChooseDoctor() {
  const { lang, dir } = useLanguage();
  const [active, setActive] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % reasons.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [active]);

  // The list renders first (reading "start" side: right in RTL, left in LTR)
  // and the photo second (the "end" side) — each slides in from its own edge
  // so the two converge toward the center, in either language. Below the
  // `lg` breakpoint the two columns stack into one full-width column, so a
  // sideways offset has nowhere to go but off the edge of a narrow viewport
  // — swap to a plain bottom-to-top rise there instead.
  const listEnter = isMobile ? { opacity: 0, y: 32 } : { opacity: 0, x: dir === "rtl" ? 70 : -70 };
  const photoEnter = isMobile ? { opacity: 0, y: 32 } : { opacity: 0, x: dir === "rtl" ? -70 : 70 };
  const settled = isMobile ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 };

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
            <ShieldCheck className="h-4 w-4" />
            {pick(lang, { ar: "لماذا نحن", en: "Why Choose Us" })}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
            {pick(lang, { ar: "لماذا تختار ", en: "Why Choose " })}
            <span className="text-gradient-brand">{pick(lang, DOCTOR.name)}</span>
            {pick(lang, { ar: "؟", en: "?" })}
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-stretch lg:gap-14">
          {/* Numbered interactive list — slides in from the start side (desktop)
              or rises from below (mobile) */}
          <motion.div
            // Framer Motion only reads `initial` at mount, so `isMobile`
            // flipping from its false default to its real value shortly
            // after mount wouldn't retroactively reposition this element —
            // keying on it forces a fresh mount with the correct offset.
            key={isMobile ? "list-mobile" : "list-desktop"}
            initial={listEnter}
            whileInView={settled}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-3"
          >
            {reasons.map((reason, i) => {
              const isActive = i === active;
              const ReasonIcon = reason.icon;
              return (
                <button
                  key={reason.title.en}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`relative block w-full overflow-hidden rounded-3xl border p-5 text-start transition-all duration-500 ${
                    isActive
                      ? "border-brand/40 bg-white/70 shadow-glass-lg backdrop-blur-lg"
                      : "border-white/30 bg-white/30 hover:bg-white/50"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-500 ${
                        isActive
                          ? "bg-brand-gradient text-white shadow-glow-brand"
                          : "bg-brand/10 text-brand-700"
                      }`}
                    >
                      <motion.span
                        animate={{ opacity: isActive ? 0 : 1, scale: isActive ? 0.6 : 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute font-english text-base font-extrabold"
                      >
                        0{i + 1}
                      </motion.span>
                      <motion.span
                        animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 0.6 }}
                        transition={{ duration: 0.3 }}
                        className="absolute"
                      >
                        <ReasonIcon className="h-5 w-5" />
                      </motion.span>
                    </span>
                    <div className="flex-1 pt-1.5">
                      <h3 className="font-extrabold text-ink">{pick(lang, reason.title)}</h3>
                      {isActive && (
                        <motion.p
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="mt-2 text-sm leading-relaxed text-ink/60"
                        >
                          {pick(lang, reason.description)}
                        </motion.p>
                      )}
                    </div>
                  </div>
                  {isActive && (
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-brand/10">
                      <motion.div
                        key={active}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                        className="h-full w-full origin-left rtl:origin-right bg-brand-gradient"
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* Doctor's own portrait — slides in from the end side (desktop) or
              rises from below (mobile), with a floating credentials badge
              and ambient glow for depth. */}
          <motion.div
            key={isMobile ? "photo-mobile" : "photo-desktop"}
            initial={photoEnter}
            whileInView={settled}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative lg:h-full"
          >
            <div className="pointer-events-none absolute -top-10 end-6 -z-10 h-48 w-48 animate-float-slow rounded-full bg-brand/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 start-6 -z-10 h-40 w-40 animate-float rounded-full bg-deep-500/10 blur-3xl" />

            {/* Fixed aspect ratio on mobile (stacked, no sibling to match); on
                large screens it stretches to exactly the list's own height
                instead, via items-stretch on the parent grid, so the two
                columns stay proportionate regardless of how many list items
                are expanded. */}
            <div className="glass-card relative h-full overflow-hidden">
              <div className="relative aspect-[4/5] w-full lg:aspect-auto lg:h-full">
                <Image
                  src="/images/hero-doctor.jpg"
                  alt={pick(lang, DOCTOR.name)}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-950/70 via-deep-950/10 to-transparent" />

                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-5 bottom-5 flex items-center gap-3 rounded-2xl border border-white/25 bg-white/10 p-4 backdrop-blur-lg"
                >
                  <span className="icon-chip !h-12 !w-12 shrink-0">
                    <Award className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-english text-xl font-extrabold text-white">15+</p>
                    <p className="text-xs font-semibold text-white/85">
                      {pick(lang, { ar: "سنة خبرة في جراحة الأورام", en: "Years in Surgical Oncology" })}
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

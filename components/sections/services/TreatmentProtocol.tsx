"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ClipboardCheck,
  Layers,
  ScanSearch,
  UsersRound,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick, type Bilingual } from "@/lib/i18n";

const steps: { icon: LucideIcon; title: Bilingual; description: Bilingual }[] = [
  {
    icon: ScanSearch,
    title: { ar: "التشخيص الدقيق", en: "Accurate Diagnosis" },
    description: {
      ar: "فحص إكلينيكي شامل وأحدث وسائل التصوير والتحاليل لتحديد طبيعة الحالة بدقة.",
      en: "A thorough clinical exam plus the latest imaging and labs to precisely define the case.",
    },
  },
  {
    icon: Layers,
    title: { ar: "تحديد مرحلة الورم", en: "Staging" },
    description: {
      ar: "تحديد حجم الورم ومدى انتشاره لاختيار المسار العلاجي الأنسب.",
      en: "Determining the tumor's size and spread to select the most suitable treatment path.",
    },
  },
  {
    icon: UsersRound,
    title: { ar: "القرار متعدد التخصصات", en: "Multidisciplinary Decision" },
    description: {
      ar: "مناقشة الحالة مع فريق متكامل من أطباء الأورام الطبية والإشعاعية.",
      en: "The case is reviewed with a full team of medical and radiation oncologists.",
    },
  },
  {
    icon: ClipboardCheck,
    title: { ar: "خطة العلاج المخصصة", en: "Personalized Treatment Plan" },
    description: {
      ar: "وضع وتنفيذ خطة علاجية (جراحة أو علاج) مصممة خصيصًا لحالة المريض.",
      en: "Designing and executing a treatment plan (surgery or therapy) built around the patient.",
    },
  },
];

const AUTO_ADVANCE_MS = 4500;

export default function TreatmentProtocol() {
  const { lang } = useLanguage();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % steps.length);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [active, paused]);

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-mesh-medical opacity-20" />
      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="section-eyebrow">
            <Workflow className="h-4 w-4" />
            {pick(lang, { ar: "إيجاد خطة العلاج المناسبة", en: "Finding the Right Treatment Plan" })}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
            {pick(lang, { ar: "بروتوكول واضح لكل حالة", en: "A Clear Protocol for Every Case" })}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">
            {pick(lang, {
              ar: "خطوات مبنية على أفضل الممارسات العالمية — اضغط على أي خطوة لاستكشافها.",
              en: "Steps built on global best practices — click any step to explore it.",
            })}
          </p>
        </motion.div>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="mt-14 flex flex-col gap-3 lg:flex-row lg:items-stretch"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === active;
            return (
              <motion.button
                key={step.title.en}
                type="button"
                layout
                onClick={() => setActive(index)}
                transition={{ type: "spring", stiffness: 260, damping: 28 }}
                className={`glass-card relative overflow-hidden p-5 text-start transition-colors duration-500 ${
                  isActive ? "border-brand/30 shadow-glass-lg lg:flex-[2.6]" : "lg:flex-1 hover:bg-white/70"
                }`}
              >
                <motion.div layout="position" className="flex items-center gap-4">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors duration-500 ${
                      isActive ? "bg-brand-gradient text-white shadow-glow-brand" : "bg-brand/10 text-brand-700"
                    }`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <span className="font-english text-[11px] font-extrabold tracking-wide text-brand-600">
                      0{index + 1}
                    </span>
                    <h3 className="truncate font-extrabold text-ink">{pick(lang, step.title)}</h3>
                  </div>
                </motion.div>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-sm leading-relaxed text-ink/60">
                        {pick(lang, step.description)}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {isActive && (
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-brand/10">
                    <motion.div
                      key={active}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: paused ? 0 : 1 }}
                      transition={{ duration: paused ? 0 : AUTO_ADVANCE_MS / 1000, ease: "linear" }}
                      className="h-full w-full origin-left rtl:origin-right bg-brand-gradient"
                    />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

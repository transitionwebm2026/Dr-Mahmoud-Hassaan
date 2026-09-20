"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Map } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import { DynamicIcon } from "@/lib/icon-registry";
import type { PatientJourneyStep } from "@/lib/supabase/types";

export interface PatientJourneyProps {
  steps: PatientJourneyStep[];
}

export default function PatientJourney({ steps }: PatientJourneyProps) {
  const { lang } = useLanguage();
  const [active, setActive] = useState(0);

  if (steps.length === 0) return null;

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
            <Map className="h-4 w-4" />
            {pick(lang, { ar: "رحلة المريض", en: "Patient Journey" })}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
            {pick(lang, { ar: "خطوتك نحو الشفاء", en: "Your Roadmap to Recovery" })}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">
            {pick(lang, {
              ar: "خارطة طريق واضحة من التشخيص وحتى التعافي الكامل بعد الجراحة.",
              en: "A clear, step-by-step roadmap from diagnosis to full post-op recovery.",
            })}
          </p>
        </motion.div>

        {/* Roadmap */}
        <div className="relative mt-16">
          <div className="absolute inset-x-0 top-7 hidden h-0.5 bg-brand/15 lg:block" />
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: lang === "ar" ? "right" : "left" }}
            className="absolute inset-x-0 top-7 hidden h-0.5 bg-brand-gradient lg:block"
          />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-4">
            {steps.map((step, i) => {
              const isActive = i === active;
              return (
                <motion.button
                  key={step.id}
                  type="button"
                  onClick={() => setActive(i)}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4 }}
                  className="relative flex flex-col items-center gap-3 text-center"
                >
                  <span
                    className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl border-2 transition-all duration-500 ${
                      isActive
                        ? "border-brand bg-brand-gradient text-white shadow-glow-brand"
                        : "border-brand/20 bg-white/70 text-brand-600 backdrop-blur-md"
                    }`}
                  >
                    <DynamicIcon tag={step.icon_url} className="h-6 w-6" strokeWidth={1.8} />
                    <span
                      className={`absolute -top-2 -end-2 flex h-6 w-6 items-center justify-center rounded-full font-english text-[11px] font-extrabold ${
                        isActive ? "bg-deep-800 text-white" : "bg-brand/10 text-brand-700"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </span>
                  <p className={`text-sm font-bold transition-colors ${isActive ? "text-brand-700" : "text-ink/60"}`}>
                    {pick(lang, { ar: step.title_ar, en: step.title_en })}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Active step detail */}
        <div className="relative mt-10 min-h-[120px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="glass-panel mx-auto max-w-2xl !border-brand/20 !bg-white/60 p-6 text-center"
            >
              <h3 className="font-extrabold text-ink">
                {pick(lang, { ar: steps[active].title_ar, en: steps[active].title_en })}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                {pick(lang, { ar: steps[active].description_ar, en: steps[active].description_en })}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

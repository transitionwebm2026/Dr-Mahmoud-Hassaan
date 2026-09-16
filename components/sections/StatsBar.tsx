"use client";

import { motion } from "framer-motion";
import { Activity, HeartPulse, Stethoscope } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import AnimatedCounter from "../ui/AnimatedCounter";

const stats = [
  {
    icon: HeartPulse,
    value: 3000,
    suffix: "+",
    label: { ar: "مريض تم علاجه", en: "Patients Cured" },
  },
  {
    icon: Activity,
    value: 5000,
    suffix: "+",
    label: { ar: "عملية جراحية ناجحة", en: "Successful Surgeries" },
  },
  {
    icon: Stethoscope,
    value: 15,
    suffix: "+",
    label: { ar: "سنة خبرة", en: "Years of Experience" },
  },
];

export default function StatsBar() {
  const { lang } = useLanguage();

  return (
    <section className="relative px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-4xl bg-brand-gradient p-8 shadow-glass-lg sm:p-10"
        >
          <div className="pointer-events-none absolute inset-0 bg-mesh-medical opacity-30" />
          <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-10 h-56 w-56 rounded-full bg-deep-900/20 blur-3xl" />

          <div className="relative grid grid-cols-1 divide-y divide-white/15 sm:grid-cols-3 sm:divide-x sm:divide-y-0 rtl:sm:divide-x-reverse">
            {stats.map(({ icon: Icon, value, suffix, label }, i) => (
              <motion.div
                key={label.en}
                initial={{ opacity: 0, scale: 0.92, y: 16 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center gap-3 px-4 py-6 text-center first:pt-0 last:pb-0 sm:py-0"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/30 bg-white/15 backdrop-blur-md">
                  <Icon className="h-7 w-7 text-white" strokeWidth={1.7} />
                </span>
                <AnimatedCounter
                  value={value}
                  suffix={suffix}
                  className="text-3xl font-extrabold text-white sm:text-4xl"
                />
                <p className="text-sm font-semibold text-white/80">{pick(lang, label)}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Quote, UserRound } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import { DOCTOR } from "@/lib/constants";
import FallbackImage from "@/components/ui/FallbackImage";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";

export interface DoctorMessageProps {
  paragraphsAr: string[];
  paragraphsEn: string[];
  imageSrc?: string | null;
}

export default function DoctorMessage({ paragraphsAr, paragraphsEn, imageSrc }: DoctorMessageProps) {
  const { lang } = useLanguage();
  const messageParagraphs =
    paragraphsAr.length === paragraphsEn.length && paragraphsAr.length > 0
      ? paragraphsAr.map((ar, i) => ({ ar, en: paragraphsEn[i] }))
      : [];

  return (
    <section className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Doctor photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-sm lg:max-w-none"
        >
          <div className="glass-card relative aspect-[4/5] w-full overflow-hidden !rounded-4xl">
            {imageSrc ? (
              <FallbackImage
                src={imageSrc}
                alt={pick(lang, DOCTOR.name)}
                placeholderIcon={UserRound}
                placeholderVariant="deep"
                placeholderSize="lg"
                placeholderLabel={pick(lang, DOCTOR.name)}
              />
            ) : (
              <ImagePlaceholder icon={UserRound} variant="deep" size="lg" label={pick(lang, DOCTOR.name)} />
            )}
          </div>
          <div className="pointer-events-none absolute -bottom-6 -start-6 -z-10 h-32 w-32 rounded-full bg-brand/20 blur-2xl" />
          <div className="pointer-events-none absolute -top-6 -end-6 -z-10 h-32 w-32 rounded-full bg-deep/20 blur-2xl" />
        </motion.div>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center lg:text-start"
        >
          <span className="section-eyebrow">
            <Quote className="h-4 w-4" />
            {pick(lang, { ar: "كلمة من الدكتور", en: "A Message From the Doctor" })}
          </span>

          <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
            {pick(lang, {
              ar: "رحلتي معكم تبدأ من هنا",
              en: "My journey with you starts here",
            })}
          </h2>

          <div className="mx-auto mt-6 max-w-xl space-y-4 lg:mx-0">
            {messageParagraphs.map((p) => (
              <p key={p.en} className="text-sm leading-relaxed text-ink/65 sm:text-base">
                {pick(lang, p)}
              </p>
            ))}
          </div>

          <div className="mx-auto mt-8 max-w-xl border-t border-brand/10 pt-6 lg:mx-0">
            <p className="font-arabic text-lg font-extrabold text-gradient-brand">
              {pick(lang, DOCTOR.name)}
            </p>
            <p className="mt-1 text-sm font-semibold text-ink/50">
              {pick(lang, DOCTOR.shortTitle)}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

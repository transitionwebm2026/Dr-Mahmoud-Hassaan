"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Quote, Sparkles, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import type { Review } from "@/lib/supabase/types";

export interface PatientReviewsGridProps {
  reviews: Review[];
}

/** Large-screen vertical stagger by column position — a lightweight, order-preserving stand-in for true masonry. */
const COLUMN_OFFSET = ["lg:mt-0", "lg:mt-10", "lg:mt-4"];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-amber-300/50 bg-white/55 px-3 py-1.5 shadow-[0_0_18px_rgba(251,191,36,0.3)] backdrop-blur-md">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < rating
              ? "h-3.5 w-3.5 fill-amber-400 text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.7)]"
              : "h-3.5 w-3.5 fill-transparent text-brand/20"
          }
        />
      ))}
    </div>
  );
}

export default function PatientReviewsGrid({ reviews }: PatientReviewsGridProps) {
  const { lang } = useLanguage();

  if (reviews.length === 0) return null;

  return (
    <section className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh-medical opacity-20" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="section-eyebrow">
            <Sparkles className="h-4 w-4" />
            {pick(lang, { ar: "قصص حقيقية من مرضانا", en: "Real Stories From Our Patients" })}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
            {pick(lang, { ar: "تجارب موثّقة برحلة التعافي الكاملة", en: "Verified Experiences Across the Full Recovery Journey" })}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">
            {pick(lang, {
              ar: "كل تقييم هنا من مريض حقيقي خضع للعلاج على يد الدكتور محمود حسان وفريقه الطبي.",
              en: "Every review here comes from a real patient treated by Dr. Mahmoud Hassan and his medical team.",
            })}
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.article
              key={review.id}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10 }}
              className={`glass-card group relative flex flex-col overflow-hidden p-6 transition-shadow duration-500 hover:shadow-glow-brand sm:p-7 ${COLUMN_OFFSET[index % 3]}`}
            >
              {/* ambient hover glow */}
              <div className="pointer-events-none absolute -end-10 -top-10 h-36 w-36 rounded-full bg-brand/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/40 transition-all duration-500 group-hover:ring-brand/30" />

              {/* Top: rating + avatar */}
              <div className="relative flex items-start justify-between gap-3">
                <StarRating rating={review.rating} />
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-gradient font-english text-base font-extrabold text-white shadow-glow-brand">
                  {review.patient_name.charAt(0)}
                </span>
              </div>

              {/* Middle: title + testimonial */}
              <div className="relative mt-5 flex-1">
                <Quote className="h-7 w-7 text-brand/25" />
                {(review.title_ar || review.title_en) && (
                  <h3 className="mt-2 text-base font-extrabold leading-snug text-ink sm:text-lg">
                    {pick(lang, { ar: review.title_ar, en: review.title_en })}
                  </h3>
                )}
                <p className="mt-2.5 text-sm leading-relaxed text-ink/65">
                  {pick(lang, { ar: review.review_text_ar, en: review.review_text_en })}
                </p>
              </div>

              {/* Bottom: patient name + verified badge */}
              <div className="relative mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-brand/10 pt-4">
                <p className="text-sm font-extrabold text-ink">{review.patient_name}</p>
                {review.is_verified && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[11px] font-bold text-brand-700">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    {pick(lang, { ar: "مريض موثّق", en: "Verified Patient" })}
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

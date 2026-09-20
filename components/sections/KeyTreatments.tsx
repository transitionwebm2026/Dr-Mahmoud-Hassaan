"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Stethoscope } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import type { Treatment } from "@/lib/supabase/types";
import GlassCard from "../GlassCard";

export interface KeyTreatmentsProps {
  items: Treatment[];
}

export default function KeyTreatments({ items }: KeyTreatmentsProps) {
  const { lang } = useLanguage();
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;

  if (items.length === 0) return null;

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
            <Stethoscope className="h-4 w-4" />
            {pick(lang, { ar: "أبرز العلاجات", en: "Key Treatments" })}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
            {pick(lang, { ar: "رعاية متكاملة في كل خطوة", en: "Integrated Care at Every Step" })}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">
            {pick(lang, {
              ar: "من التشخيص الدقيق إلى التعافي الكامل، نرافق مرضانا بخطة علاجية واضحة ومخصصة.",
              en: "From accurate diagnosis to full recovery, patients are guided with a clear, personalized plan.",
            })}
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <GlassCard
              key={item.id}
              index={index}
              title={pick(lang, { ar: item.disease_name_ar, en: item.disease_name_en })}
              description={pick(lang, { ar: item.treatment_overview_ar, en: item.treatment_overview_en })}
              media={
                item.image_url && (
                  <Image
                    src={item.image_url}
                    alt={pick(lang, { ar: item.disease_name_ar, en: item.disease_name_en })}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                )
              }
              badge={
                <span className="icon-chip">
                  <Stethoscope className="h-5 w-5" />
                </span>
              }
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/services" className="btn-outline-glass">
            {pick(lang, { ar: "عرض كل العلاجات", en: "View All Treatments" })}
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

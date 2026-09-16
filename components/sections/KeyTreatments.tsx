"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ClipboardCheck, ScanSearch, Stethoscope, UsersRound } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import GlassCard from "../GlassCard";

const treatments = [
  {
    icon: ScanSearch,
    image: "/images/treatment-diagnosis.jpg",
    title: { ar: "التقييم والتشخيص المبكر", en: "Early Diagnosis & Staging" },
    description: {
      ar: "تقييم شامل للحالة باستخدام أحدث وسائل التصوير والتحاليل لتحديد الخطة الأنسب.",
      en: "A comprehensive workup using the latest imaging and diagnostics to define the right plan.",
    },
  },
  {
    icon: UsersRound,
    image: "/images/treatment-team.jpg",
    title: { ar: "خطط علاج متعددة التخصصات", en: "Multidisciplinary Treatment Plans" },
    description: {
      ar: "تنسيق كامل مع فرق الأورام الطبية والإشعاعية لتقديم رعاية متكاملة.",
      en: "Full coordination with medical and radiation oncology teams for integrated care.",
    },
  },
  {
    icon: ClipboardCheck,
    image: "/images/treatment-followup.jpg",
    title: { ar: "متابعة ما بعد الجراحة", en: "Post-Surgical Follow-up" },
    description: {
      ar: "برنامج متابعة دقيق يضمن التعافي الآمن والسريع بعد التدخل الجراحي.",
      en: "A structured follow-up program that ensures a safe, swift recovery after surgery.",
    },
  },
];

export default function KeyTreatments() {
  const { lang } = useLanguage();
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;

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
          {treatments.map((item, index) => (
            <GlassCard
              key={item.title.en}
              index={index}
              title={pick(lang, item.title)}
              description={pick(lang, item.description)}
              media={
                <Image
                  src={item.image}
                  alt={pick(lang, item.title)}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              }
              badge={
                <span className="icon-chip">
                  <item.icon className="h-5 w-5" />
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

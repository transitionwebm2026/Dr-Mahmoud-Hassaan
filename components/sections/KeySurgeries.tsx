"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, HeartPulse, Microscope, Scissors } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import GlassCard from "../GlassCard";

const surgeries = [
  {
    icon: HeartPulse,
    image: "/images/surgery-breast.jpg",
    title: { ar: "جراحة أورام الثدي", en: "Breast Cancer Surgery" },
    description: {
      ar: "استئصال الأورام مع الحفاظ على الشكل التجميلي، باستخدام أحدث بروتوكولات الجراحة الآمنة.",
      en: "Tumor removal with cosmetic preservation, using the latest safe surgical protocols.",
    },
  },
  {
    icon: Scissors,
    image: "/images/surgery-gi.jpg",
    title: { ar: "جراحة أورام الجهاز الهضمي", en: "GI Oncology Surgery" },
    description: {
      ar: "علاج جراحي دقيق لأورام المعدة والقولون والكبد بمعايير عالمية للسلامة.",
      en: "Precise surgical treatment of stomach, colon & liver tumors to global safety standards.",
    },
  },
  {
    icon: Microscope,
    image: "/images/surgery-laparoscopic.jpg",
    title: { ar: "الجراحة بالمنظار للأورام", en: "Laparoscopic Oncology Surgery" },
    description: {
      ar: "تدخل جراحي أقل ألمًا وفترة تعافٍ أسرع باستخدام تقنيات المنظار المتقدمة.",
      en: "Less painful intervention and faster recovery using advanced laparoscopic techniques.",
    },
  },
];

export default function KeySurgeries() {
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
            <Scissors className="h-4 w-4" />
            {pick(lang, { ar: "أبرز الجراحات", en: "Key Surgeries" })}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
            {pick(lang, { ar: "تخصصات جراحية دقيقة", en: "Precision Surgical Specialties" })}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">
            {pick(lang, {
              ar: "نقدم رعاية جراحية متكاملة لمختلف أنواع الأورام بأحدث التقنيات وأعلى معايير السلامة.",
              en: "Comprehensive surgical care for a wide range of tumors using the latest techniques and the highest safety standards.",
            })}
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {surgeries.map((item, index) => (
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
            {pick(lang, { ar: "عرض كل الجراحات", en: "View All Surgeries" })}
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

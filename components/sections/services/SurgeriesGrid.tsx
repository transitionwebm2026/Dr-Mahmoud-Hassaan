"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { HeartPulse, Microscope, Scissors, Stethoscope } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import GlassCard from "@/components/GlassCard";

const specialties = [
  {
    icon: HeartPulse,
    image: "/images/surgery-breast.jpg",
    title: { ar: "جراحات أورام الثدي", en: "Breast Cancer Surgery" },
    description: {
      ar: "استئصال دقيق للأورام مع خيارات الحفاظ على الشكل التجميلي وإعادة البناء عند الحاجة.",
      en: "Precise tumor removal with breast-conserving and reconstructive options when appropriate.",
    },
  },
  {
    icon: Scissors,
    image: "/images/surgery-gi.jpg",
    title: { ar: "جراحات أورام الجهاز الهضمي", en: "GI Oncology Surgery" },
    description: {
      ar: "علاج جراحي شامل لأورام المعدة والقولون والكبد والبنكرياس بمعايير عالمية.",
      en: "Comprehensive surgical care for stomach, colon, liver & pancreatic tumors to global standards.",
    },
  },
  {
    icon: Stethoscope,
    image: "/images/surgery-headneck.jpg",
    title: { ar: "جراحات أورام الغدد والرقبة", en: "Head & Neck / Thyroid Surgery" },
    description: {
      ar: "تدخلات دقيقة لأورام الغدة الدرقية والغدد اللعابية وأورام الرأس والرقبة.",
      en: "Precise interventions for thyroid, salivary gland, and head & neck tumors.",
    },
  },
  {
    icon: Microscope,
    image: "/images/surgery-laparoscopic.jpg",
    title: { ar: "جراحات الأورام بالمناظير", en: "Laparoscopic Oncology Surgery" },
    description: {
      ar: "تقنيات الحد الأدنى من التدخل لتقليل الألم وتسريع العودة للحياة الطبيعية.",
      en: "Minimally invasive techniques that reduce pain and speed the return to normal life.",
    },
  },
];

export default function SurgeriesGrid() {
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
            <Scissors className="h-4 w-4" />
            {pick(lang, { ar: "التخصصات الطبية والجراحية", en: "Medical & Surgical Specialties" })}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
            {pick(lang, { ar: "خدمات جراحية دقيقة ومتكاملة", en: "Precise, Integrated Surgical Care" })}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">
            {pick(lang, {
              ar: "تخصصات جراحية دقيقة تغطي أكثر أنواع أورام الجهاز الهضمي والثدي والرأس والرقبة شيوعًا.",
              en: "Focused surgical specialties covering the most common breast, GI, and head & neck tumor types.",
            })}
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {specialties.map((item, index) => (
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
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
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
      </div>
    </section>
  );
}

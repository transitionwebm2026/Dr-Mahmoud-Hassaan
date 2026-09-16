"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  HeartPulse,
  ListTree,
  Microscope,
  Scissors,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick, type Bilingual } from "@/lib/i18n";
import GlassCard from "@/components/GlassCard";

const categories: {
  icon: LucideIcon;
  title: Bilingual;
  image: string;
  procedures: { title: Bilingual; description: Bilingual }[];
}[] = [
  {
    icon: HeartPulse,
    title: { ar: "أورام الثدي", en: "Breast Tumors" },
    image: "/images/surgery-breast.jpg",
    procedures: [
      {
        title: { ar: "سرطان الثدي الغازي", en: "Invasive Breast Cancer" },
        description: {
          ar: "استئصال دقيق للورم مع الحفاظ قدر الإمكان على الشكل التجميلي للثدي.",
          en: "Precise tumor removal while preserving the breast's shape wherever possible.",
        },
      },
      {
        title: { ar: "جراحات الحفاظ على الثدي", en: "Breast-Conserving Surgery" },
        description: {
          ar: "إزالة الورم فقط مع الحفاظ على أكبر قدر ممكن من أنسجة الثدي السليمة.",
          en: "Removing only the tumor while preserving as much healthy breast tissue as possible.",
        },
      },
      {
        title: { ar: "إعادة بناء الثدي", en: "Breast Reconstruction" },
        description: {
          ar: "إعادة بناء شكل الثدي بعد الاستئصال بالتنسيق مع جراحي التجميل.",
          en: "Restoring the breast's shape after mastectomy, coordinated with plastic surgeons.",
        },
      },
    ],
  },
  {
    icon: Scissors,
    title: { ar: "أورام الجهاز الهضمي", en: "GI Tumors" },
    image: "/images/surgery-gi.jpg",
    procedures: [
      {
        title: { ar: "سرطان المعدة", en: "Stomach Cancer" },
        description: {
          ar: "استئصال جراحي دقيق لأورام المعدة مع الحفاظ على وظائف الجهاز الهضمي.",
          en: "Precise surgical removal of stomach tumors while preserving digestive function.",
        },
      },
      {
        title: { ar: "سرطان القولون والمستقيم", en: "Colorectal Cancer" },
        description: {
          ar: "علاج جراحي شامل لأورام القولون والمستقيم بأحدث البروتوكولات.",
          en: "Comprehensive surgical treatment of colon and rectal tumors using the latest protocols.",
        },
      },
      {
        title: { ar: "سرطان الكبد والبنكرياس", en: "Liver & Pancreatic Cancer" },
        description: {
          ar: "تدخلات جراحية دقيقة لأورام الكبد والبنكرياس المعقدة.",
          en: "Precise surgical interventions for complex liver and pancreatic tumors.",
        },
      },
    ],
  },
  {
    icon: Stethoscope,
    title: { ar: "أورام الغدد والرقبة", en: "Head & Neck Tumors" },
    image: "/images/surgery-headneck.jpg",
    procedures: [
      {
        title: { ar: "سرطان الغدة الدرقية", en: "Thyroid Cancer" },
        description: {
          ar: "استئصال دقيق للغدة الدرقية مع الحفاظ على الأعصاب المحيطة.",
          en: "Precise thyroid removal with careful preservation of the surrounding nerves.",
        },
      },
      {
        title: { ar: "أورام الغدد اللعابية", en: "Salivary Gland Tumors" },
        description: {
          ar: "علاج جراحي دقيق لأورام الغدد اللعابية الحميدة والخبيثة.",
          en: "Precise surgical treatment of benign and malignant salivary gland tumors.",
        },
      },
      {
        title: { ar: "أورام الرأس والرقبة", en: "Head & Neck Tumors" },
        description: {
          ar: "تدخلات جراحية متخصصة لأورام منطقة الرأس والرقبة المعقدة.",
          en: "Specialized surgical interventions for complex head and neck tumors.",
        },
      },
    ],
  },
  {
    icon: Microscope,
    title: { ar: "الجراحة بالمناظير", en: "Laparoscopic Procedures" },
    image: "/images/surgery-laparoscopic.jpg",
    procedures: [
      {
        title: { ar: "استئصال أورام القولون بالمنظار", en: "Laparoscopic Colon Resection" },
        description: {
          ar: "استئصال أورام القولون من خلال جروح صغيرة وتعافٍ أسرع.",
          en: "Removing colon tumors through small incisions for a faster recovery.",
        },
      },
      {
        title: { ar: "استئصال المرارة بالمنظار", en: "Laparoscopic Gallbladder Removal" },
        description: {
          ar: "إزالة المرارة والأورام الصفراوية بأقل تدخل جراحي ممكن.",
          en: "Removing the gallbladder and biliary tumors with minimal surgical intervention.",
        },
      },
      {
        title: { ar: "الجراحة بمساعدة الروبوت", en: "Robotic-Assisted Surgery" },
        description: {
          ar: "دقة إضافية في التدخلات الجراحية المعقدة باستخدام تقنية الروبوت.",
          en: "Added precision in complex procedures using robotic-assisted technology.",
        },
      },
    ],
  },
];

export default function ProceduresBreakdown() {
  const { lang } = useLanguage();
  const [active, setActive] = useState(0);

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
            <ListTree className="h-4 w-4" />
            {pick(lang, { ar: "تفاصيل الجراحات والأمراض", en: "Procedures & Conditions" })}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
            {pick(lang, { ar: "تعرف على تفاصيل كل تخصص", en: "Explore Each Specialty in Detail" })}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">
            {pick(lang, {
              ar: "اختر تخصصًا لعرض الحالات والإجراءات التي يتم التعامل معها ضمنه.",
              en: "Select a specialty to see the specific conditions and procedures treated under it.",
            })}
          </p>
        </motion.div>

        {/* Category filter */}
        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-2">
          {categories.map((category, index) => {
            const isActive = index === active;
            const Icon = category.icon;
            return (
              <button
                key={category.title.en}
                type="button"
                onClick={() => setActive(index)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "border-transparent bg-brand-gradient text-white shadow-glow-brand"
                    : "border-brand/20 bg-white/50 text-ink/70 hover:bg-white/80"
                }`}
              >
                <Icon className="h-4 w-4" />
                {pick(lang, category.title)}
              </button>
            );
          })}
        </div>

        {/* Procedure cards */}
        <div className="relative mt-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {categories[active].procedures.map((procedure, index) => (
                <GlassCard
                  key={procedure.title.en}
                  index={index}
                  title={pick(lang, procedure.title)}
                  description={pick(lang, procedure.description)}
                  media={
                    <Image
                      src={categories[active].image}
                      alt={pick(lang, procedure.title)}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover"
                    />
                  }
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

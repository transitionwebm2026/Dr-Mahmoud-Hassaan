"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, HeartPulse, Microscope, ScanSearch, Scissors } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import GlassCard from "@/components/GlassCard";

const expertise = [
  {
    icon: HeartPulse,
    image: "/images/surgery-breast.jpg",
    title: { ar: "جراحة أورام الثدي", en: "Breast Oncology Surgery" },
    description: {
      ar: "خبرة واسعة في استئصال أورام الثدي مع الحفاظ على الشكل التجميلي للمريضة.",
      en: "Extensive experience in breast tumor removal with cosmetic preservation.",
    },
  },
  {
    icon: Scissors,
    image: "/images/surgery-gi.jpg",
    title: { ar: "جراحة أورام الجهاز الهضمي", en: "GI Oncology Surgery" },
    description: {
      ar: "علاج جراحي دقيق لأورام المعدة والقولون والكبد بمعايير عالمية.",
      en: "Precise surgical treatment of stomach, colon & liver tumors to global standards.",
    },
  },
  {
    icon: Microscope,
    image: "/images/surgery-laparoscopic.jpg",
    title: { ar: "الجراحة بالمنظار المتقدمة", en: "Advanced Laparoscopic Surgery" },
    description: {
      ar: "تدخلات جراحية دقيقة بالحد الأدنى من التدخل وفترة تعافٍ أسرع.",
      en: "Precise, minimally invasive interventions with faster recovery.",
    },
  },
];

export default function ExpertiseGrid() {
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
            <ScanSearch className="h-4 w-4" />
            {pick(lang, { ar: "مجالات الخبرة والتخصص", en: "Areas of Expertise" })}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
            {pick(lang, { ar: "تخصص دقيق في كل حالة", en: "Precision Focus in Every Case" })}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">
            {pick(lang, {
              ar: "سنوات من الممارسة المتخصصة في أكثر مجالات جراحة الأورام دقة وحساسية.",
              en: "Years of focused practice in some of the most precise and delicate fields of surgical oncology.",
            })}
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {expertise.map((item, index) => (
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
            {pick(lang, { ar: "عرض كل الخدمات", en: "View All Services" })}
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

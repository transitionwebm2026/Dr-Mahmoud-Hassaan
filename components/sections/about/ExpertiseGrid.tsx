"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ScanSearch } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import type { SurgeryService } from "@/lib/supabase/types";
import GlassCard from "@/components/GlassCard";
import SectionHeading from "@/components/ui/SectionHeading";
import type { SectionHeadingContent } from "@/lib/section-headings";

export interface ExpertiseGridProps {
  heading: SectionHeadingContent;
  items: SurgeryService[];
}

export default function ExpertiseGrid({ items, heading }: ExpertiseGridProps) {
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
          <SectionHeading heading={heading} icon={ScanSearch} />
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <GlassCard
              key={item.id}
              index={index}
              title={pick(lang, { ar: item.title_ar, en: item.title_en })}
              description={pick(lang, { ar: item.short_description_ar, en: item.short_description_en })}
              media={
                item.image_url && (
                  <Image
                    src={item.image_url}
                    alt={pick(lang, { ar: item.title_ar, en: item.title_en })}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                )
              }
              badge={
                <span className="icon-chip">
                  <ScanSearch className="h-5 w-5" />
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

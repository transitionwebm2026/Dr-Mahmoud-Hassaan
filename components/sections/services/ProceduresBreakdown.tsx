"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ListTree } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import { DynamicIcon } from "@/lib/icon-registry";
import type { ProcedureCategory, ProcedureItem } from "@/lib/supabase/types";
import GlassCard from "@/components/GlassCard";

export interface ProceduresBreakdownProps {
  categories: ProcedureCategory[];
  items: ProcedureItem[];
}

export default function ProceduresBreakdown({ categories, items }: ProceduresBreakdownProps) {
  const { lang } = useLanguage();
  const [active, setActive] = useState(0);

  if (categories.length === 0) return null;

  const activeCategory = categories[active];
  const activeItems = items.filter((item) => item.category_id === activeCategory.id);

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
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setActive(index)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition-all duration-300 ${
                  isActive
                    ? "border-transparent bg-brand-gradient text-white shadow-glow-brand"
                    : "border-brand/20 bg-white/50 text-ink/70 hover:bg-white/80"
                }`}
              >
                <DynamicIcon tag={category.icon_tag} className="h-4 w-4" />
                {pick(lang, { ar: category.title_ar, en: category.title_en })}
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
              {activeItems.map((procedure, index) => (
                <GlassCard
                  key={procedure.id}
                  index={index}
                  title={pick(lang, { ar: procedure.title_ar, en: procedure.title_en })}
                  description={pick(lang, { ar: procedure.description_ar, en: procedure.description_en })}
                  media={
                    activeCategory.image_url && (
                      <Image
                        src={activeCategory.image_url}
                        alt={pick(lang, { ar: procedure.title_ar, en: procedure.title_en })}
                        fill
                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    )
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

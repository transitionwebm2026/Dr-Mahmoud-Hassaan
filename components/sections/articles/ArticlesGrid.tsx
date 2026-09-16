"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock, Newspaper } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import GlassCard from "@/components/GlassCard";
import type { Article } from "./articlesData";

interface ArticlesGridProps {
  articles: Article[];
  onOpen: (id: string) => void;
}

export default function ArticlesGrid({ articles, onOpen }: ArticlesGridProps) {
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
          className="mx-auto mb-12 max-w-2xl text-center"
        >
          <span className="section-eyebrow">
            <Newspaper className="h-4 w-4" />
            {pick(lang, { ar: "أحدث المقالات", en: "Latest Articles" })}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
            {pick(lang, { ar: "مقالات تستحق وقتك", en: "Articles Worth Your Time" })}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article, index) => (
            <GlassCard
              key={article.id}
              index={index}
              title={pick(lang, article.title)}
              description={pick(lang, article.excerpt)}
              media={
                <>
                  <Image
                    src={article.image}
                    alt={pick(lang, article.title)}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                  <span className="absolute top-3 start-3 rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-extrabold text-white shadow-glow-brand">
                    {pick(lang, article.category)}
                  </span>
                </>
              }
              footer={
                <>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold text-ink/45">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-brand-600" />
                      {pick(lang, article.date)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-brand-600" />
                      {pick(lang, article.readTime)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => onOpen(article.id)}
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 transition-all duration-300 hover:gap-2.5 hover:text-brand-700"
                  >
                    {pick(lang, { ar: "اقرأ المقال كامل", en: "Read Full Article" })}
                    <ArrowIcon className="h-4 w-4" />
                  </button>
                </>
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

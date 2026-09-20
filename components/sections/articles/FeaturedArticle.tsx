"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import { formatArticleDate, formatReadingTime } from "@/lib/supabase/content";
import type { Article } from "@/lib/supabase/types";

interface FeaturedArticleProps {
  article: Article;
}

export default function FeaturedArticle({ article }: FeaturedArticleProps) {
  const { lang } = useLanguage();
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;

  return (
    <section className="relative px-4 pt-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-2xl text-center"
        >
          <span className="section-eyebrow">
            <Sparkles className="h-4 w-4" />
            {pick(lang, { ar: "مقال مميز", en: "Featured Article" })}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
            {pick(lang, { ar: "المقالات والمحتوى الطبي", en: "Articles & Medical Insights" })}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass-card grid grid-cols-1 overflow-hidden lg:grid-cols-2"
        >
          <div className="relative aspect-video w-full lg:aspect-auto">
            {article.featured_image_url && (
              <Image
                src={article.featured_image_url}
                alt={pick(lang, { ar: article.title_ar, en: article.title_en })}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
                className="object-cover"
              />
            )}
            <span className="absolute top-4 start-4 rounded-full bg-brand-gradient px-4 py-1.5 text-xs font-extrabold text-white shadow-glow-brand">
              {pick(lang, { ar: article.category_ar, en: article.category_en })}
            </span>
          </div>

          <div className="flex flex-col justify-center p-8 sm:p-10">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-semibold text-ink/50">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-brand-600" />
                {formatArticleDate(lang, article.published_at)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-brand-600" />
                {formatReadingTime(lang, article.reading_time_minutes)}
              </span>
            </div>

            <h3 className="mt-4 text-xl font-extrabold leading-snug text-ink sm:text-2xl">
              {pick(lang, { ar: article.title_ar, en: article.title_en })}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-ink/60 sm:text-base">
              {pick(lang, { ar: article.excerpt_ar, en: article.excerpt_en })}
            </p>

            <Link href={`/articles/${article.slug}`} className="btn-primary mt-6 w-fit">
              {pick(lang, { ar: "اقرأ المقال كامل", en: "Read Full Article" })}
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

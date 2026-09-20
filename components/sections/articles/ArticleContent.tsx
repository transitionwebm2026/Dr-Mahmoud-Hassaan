"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Clock, Phone, User } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import { CONTACT, DOCTOR } from "@/lib/constants";
import { formatArticleDate, formatReadingTime, splitParagraphs } from "@/lib/supabase/content";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import type { Article } from "@/lib/supabase/types";

/** Full article body — the client-rendered, language-aware counterpart to
 * app/(site)/articles/[slug]/page.tsx, which fetches the article server-side
 * (for metadata/JSON-LD/notFound) and hands it here for display. */
export default function ArticleContent({ article }: { article: Article }) {
  const { lang } = useLanguage();
  const BackIcon = lang === "ar" ? ArrowRight : ArrowLeft;

  return (
    <article className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/articles"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 transition-all hover:gap-2.5 hover:text-brand-700"
        >
          <BackIcon className="h-4 w-4" />
          {pick(lang, { ar: "العودة للمقالات", en: "Back to Articles" })}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass-card relative mt-6 flex flex-col overflow-hidden !rounded-4xl border-white/40"
        >
          {article.featured_image_url && (
            <div className="relative aspect-video w-full shrink-0">
              <Image
                src={article.featured_image_url}
                alt={pick(lang, { ar: article.title_ar, en: article.title_en })}
                fill
                priority
                sizes="768px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-950/70 via-deep-950/10 to-transparent" />
              <span className="absolute top-4 start-4 rounded-full bg-brand-gradient px-4 py-1.5 text-xs font-extrabold text-white shadow-glow-brand">
                {pick(lang, { ar: article.category_ar, en: article.category_en })}
              </span>
            </div>
          )}

          <div className="p-6 sm:p-10">
            <h1 className="text-xl font-extrabold leading-snug text-ink sm:text-2xl lg:text-3xl">
              {pick(lang, { ar: article.title_ar, en: article.title_en })}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-brand/10 pb-6 text-sm text-ink/55">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-brand-600" />
                {pick(lang, DOCTOR.name)}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-brand-600" />
                {formatArticleDate(lang, article.published_at)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-brand-600" />
                {formatReadingTime(lang, article.reading_time_minutes)}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {splitParagraphs(lang === "ar" ? article.content_ar : article.content_en).map((paragraph, i) => (
                <p key={i} className="text-sm leading-relaxed text-ink/70 sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl border border-brand/15 bg-brand/5 p-6 text-center sm:flex-row sm:justify-between sm:text-start">
              <div>
                <p className="font-extrabold text-ink">
                  {pick(lang, { ar: "هل لديك استفسار طبي؟", en: "Have a medical question?" })}
                </p>
                <p className="mt-1 text-sm text-ink/55">
                  {pick(lang, {
                    ar: `تواصل مع فريق ${pick(lang, DOCTOR.name)} للحصول على استشارة.`,
                    en: `Reach out to ${pick(lang, DOCTOR.name)}'s team for a consultation.`,
                  })}
                </p>
              </div>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <a href={CONTACT.phoneHref} className="btn-primary w-full sm:w-auto">
                  <Phone className="h-4 w-4" />
                  {pick(lang, { ar: "حجز استشارة", en: "Book a Consultation" })}
                </a>
                <a
                  href={CONTACT.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline-glass w-full sm:w-auto"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  {pick(lang, { ar: "واتساب", en: "WhatsApp" })}
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </article>
  );
}

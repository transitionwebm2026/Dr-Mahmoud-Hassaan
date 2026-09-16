"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Calendar, Clock, Phone, User, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import { CONTACT, DOCTOR } from "@/lib/constants";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import type { Article } from "./articlesData";

interface ArticleModalProps {
  article: Article;
  onClose: () => void;
}

export default function ArticleModal({ article, onClose }: ArticleModalProps) {
  const { lang } = useLanguage();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-md sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={pick(lang, article.title)}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card relative flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden !rounded-4xl border-white/40"
      >
        {/* Sticky close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label={pick(lang, { ar: "إغلاق", en: "Close" })}
          className="absolute top-4 end-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-white/70 text-ink backdrop-blur-md transition hover:bg-white"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Scrollable content — custom slim scrollbar */}
        <div className="modal-scroll overflow-y-auto">
          <div className="relative aspect-video w-full shrink-0">
            <Image
              src={article.image}
              alt={pick(lang, article.title)}
              fill
              sizes="768px"
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-950/70 via-deep-950/10 to-transparent" />
            <span className="absolute top-4 start-4 rounded-full bg-brand-gradient px-4 py-1.5 text-xs font-extrabold text-white shadow-glow-brand">
              {pick(lang, article.category)}
            </span>
          </div>

          <div className="p-6 sm:p-10">
            <h2 className="text-xl font-extrabold leading-snug text-ink sm:text-2xl lg:text-3xl">
              {pick(lang, article.title)}
            </h2>

            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-b border-brand/10 pb-6 text-sm text-ink/55">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-brand-600" />
                {pick(lang, DOCTOR.name)}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-brand-600" />
                {pick(lang, article.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-brand-600" />
                {pick(lang, article.readTime)}
              </span>
            </div>

            <div className="mt-6 space-y-4">
              {pick(lang, article.body).map((paragraph, i) => (
                <p key={i} className="text-sm leading-relaxed text-ink/70 sm:text-base">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Quick CTA */}
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
        </div>
      </motion.div>
    </motion.div>
  );
}

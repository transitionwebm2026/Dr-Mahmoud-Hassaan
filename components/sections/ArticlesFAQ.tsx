"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  FileText,
  HelpCircle,
  Newspaper,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick, type Bilingual } from "@/lib/i18n";
import GlassCard from "../GlassCard";

const articles: { title: Bilingual; excerpt: Bilingual; date: Bilingual; image: string }[] = [
  {
    title: { ar: "5 علامات مبكرة لأورام الجهاز الهضمي", en: "5 Early Signs of GI Tumors" },
    excerpt: {
      ar: "تعرف على العلامات التي تستدعي زيارة الطبيب مبكرًا.",
      en: "Learn the warning signs that call for an early doctor visit.",
    },
    date: { ar: "٣ دقائق قراءة", en: "3 min read" },
    image: "/images/article-gi-health.jpg",
  },
  {
    title: { ar: "التغذية السليمة أثناء العلاج", en: "Proper Nutrition During Treatment" },
    excerpt: {
      ar: "دليل عملي لدعم جسمك أثناء رحلة العلاج.",
      en: "A practical guide to supporting your body through treatment.",
    },
    date: { ar: "٤ دقائق قراءة", en: "4 min read" },
    image: "/images/article-nutrition.jpg",
  },
  {
    title: { ar: "أسئلة شائعة قبل الجراحة", en: "Common Questions Before Surgery" },
    excerpt: {
      ar: "إجابات واضحة تساعدك على الاستعداد النفسي والجسدي.",
      en: "Clear answers to help you prepare, mentally and physically.",
    },
    date: { ar: "٥ دقائق قراءة", en: "5 min read" },
    image: "/images/article-presurgery.jpg",
  },
];

const faqs: { question: Bilingual; answer: Bilingual }[] = [
  {
    question: {
      ar: "ما هي أعراض أورام الثدي التي يجب الانتباه لها؟",
      en: "What breast cancer symptoms should I watch for?",
    },
    answer: {
      ar: "وجود كتلة غير مؤلمة، تغير في شكل الثدي أو الجلد، أو إفرازات غير طبيعية من الحلمة تستدعي استشارة الطبيب فورًا.",
      en: "A painless lump, changes in breast shape or skin, or unusual nipple discharge should prompt an immediate consultation.",
    },
  },
  {
    question: {
      ar: "هل الجراحة بالمنظار آمنة لجميع الحالات؟",
      en: "Is laparoscopic surgery safe for all cases?",
    },
    answer: {
      ar: "تُناسب الجراحة بالمنظار عددًا كبيرًا من الحالات وتُحدَّد ملاءمتها بعد التقييم الدقيق لكل مريض.",
      en: "Laparoscopic surgery suits a wide range of cases; suitability is confirmed after a thorough case-by-case assessment.",
    },
  },
  {
    question: {
      ar: "كم تستغرق فترة التعافي بعد الجراحة؟",
      en: "How long does recovery take after surgery?",
    },
    answer: {
      ar: "تختلف المدة حسب نوع الجراحة وحالة المريض، وعادة ما تتراوح بين أسبوعين وستة أسابيع.",
      en: "Recovery time varies by procedure and patient condition, typically ranging from two to six weeks.",
    },
  },
  {
    question: {
      ar: "هل يلزم علاج كيميائي بعد الجراحة؟",
      en: "Is chemotherapy needed after surgery?",
    },
    answer: {
      ar: "يُحدَّد ذلك بالتنسيق مع فريق الأورام الطبي بناءً على نوع الورم ومرحلته بعد الجراحة.",
      en: "This is decided together with the medical oncology team based on tumor type and stage post-surgery.",
    },
  },
];

export default function ArticlesFAQ() {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
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
            <Newspaper className="h-4 w-4" />
            {pick(lang, { ar: "مقالات وأسئلة شائعة", en: "Articles & FAQ" })}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
            {pick(lang, { ar: "معلومات تهمك", en: "Information That Matters" })}
          </h2>
        </motion.div>

        {/* Articles */}
        <div className="mt-12">
          <h3 className="mb-6 flex items-center justify-center gap-2 text-lg font-extrabold text-ink lg:justify-start">
            <FileText className="h-5 w-5 text-brand-600" />
            {pick(lang, { ar: "أحدث المقالات", en: "Latest Articles" })}
          </h3>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article, index) => (
              <GlassCard
                key={article.title.en}
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
                    <span className="absolute top-3 end-3 rounded-full bg-white/85 px-3 py-1 text-[11px] font-bold text-brand-700 backdrop-blur-sm">
                      {pick(lang, article.date)}
                    </span>
                  </>
                }
                footer={
                  <Link
                    href="/articles"
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 transition-all duration-300 hover:gap-2.5 hover:text-brand-700"
                  >
                    {pick(lang, { ar: "قراءة المقال كاملاً", en: "Read Full Article" })}
                    <ArrowIcon className="h-4 w-4" />
                  </Link>
                }
              />
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/articles" className="btn-outline-glass">
              {pick(lang, { ar: "عرض كل المقالات", en: "View All Articles" })}
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20">
          <h3 className="mb-6 flex items-center justify-center gap-2 text-lg font-extrabold text-ink">
            <HelpCircle className="h-5 w-5 text-brand-600" />
            {pick(lang, { ar: "الأسئلة الشائعة", en: "Frequently Asked Questions" })}
          </h3>
          {/* items-start: prevents CSS Grid's default row-stretching, where
              opening one card would otherwise grow its still-closed
              neighbor to match row height. */}
          <div className="mx-auto grid max-w-5xl grid-cols-1 items-start gap-4 lg:grid-cols-2">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={faq.question.en}
                  initial={{ opacity: 0, scale: 0.95, y: 16 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: (index % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-card overflow-hidden !rounded-2xl"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="flex w-full items-center justify-between gap-4 p-4 text-start"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-bold text-ink">{pick(lang, faq.question)}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="icon-chip !h-8 !w-8 shrink-0"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-4 pb-4 text-sm leading-relaxed text-ink/65">
                          {pick(lang, faq.answer)}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

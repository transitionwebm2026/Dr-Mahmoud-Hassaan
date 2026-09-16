"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick, type Bilingual } from "@/lib/i18n";

const faqs: { question: Bilingual; answer: Bilingual }[] = [
  {
    question: { ar: "كم من الوقت أحتاج للاستعداد قبل الجراحة؟", en: "How much time do I need to prepare before surgery?" },
    answer: {
      ar: "تختلف فترة التحضير حسب نوع الجراحة، وعادة ما تشمل أسبوعًا إلى أسبوعين لإجراء الفحوصات اللازمة وتقييم الحالة الصحية العامة.",
      en: "Preparation time varies by procedure, typically one to two weeks for the required tests and a general health assessment.",
    },
  },
  {
    question: { ar: "ما هي الفحوصات المطلوبة قبل العملية؟", en: "What tests are required before the operation?" },
    answer: {
      ar: "تشمل عادة تحاليل دم شاملة، أشعة تصويرية (مثل الأشعة المقطعية أو الرنين المغناطيسي)، وتقييم القلب والتخدير حسب الحالة.",
      en: "Typically comprehensive blood work, imaging (CT or MRI as needed), and a cardiac/anesthesia assessment based on the case.",
    },
  },
  {
    question: { ar: "كم تستغرق مدة الإقامة بالمستشفى بعد الجراحة؟", en: "How long is the hospital stay after surgery?" },
    answer: {
      ar: "تتراوح غالبًا بين يومين وخمسة أيام حسب نوع الجراحة وسرعة التعافي، وسيتم إبلاغك بالمدة المتوقعة في خطة العلاج.",
      en: "Usually between two and five days depending on the procedure and recovery pace — the expected duration is shared in your treatment plan.",
    },
  },
  {
    question: { ar: "هل الجراحة بالمنظار مناسبة لحالتي؟", en: "Is laparoscopic surgery suitable for my case?" },
    answer: {
      ar: "تُناسب الجراحة بالمنظار عددًا كبيرًا من الحالات، وتُحدَّد ملاءمتها بعد التقييم الدقيق لموقع وحجم الورم.",
      en: "Laparoscopic surgery suits a wide range of cases; suitability is confirmed after a precise review of the tumor's location and size.",
    },
  },
  {
    question: { ar: "متى يمكنني العودة لممارسة حياتي الطبيعية؟", en: "When can I return to normal life?" },
    answer: {
      ar: "تختلف فترة التعافي الكامل من أسبوعين إلى ستة أسابيع، مع إمكانية استئناف الأنشطة الخفيفة في وقت أبكر تحت إشراف طبي.",
      en: "Full recovery ranges from two to six weeks, with light activity often possible sooner under medical guidance.",
    },
  },
  {
    question: { ar: "هل يلزم التوقف عن أدوية معينة قبل الجراحة؟", en: "Do I need to stop certain medications before surgery?" },
    answer: {
      ar: "قد يُطلب إيقاف بعض أدوية سيولة الدم أو المكملات قبل الجراحة بفترة محددة — سيتم مراجعة أدويتك بالتفصيل قبل الموعد.",
      en: "Some blood thinners or supplements may need to be paused beforehand — your medications will be reviewed in detail ahead of the date.",
    },
  },
  {
    question: { ar: "كيف يتم التعامل مع الألم بعد العملية؟", en: "How is pain managed after the operation?" },
    answer: {
      ar: "يتم وضع خطة متكاملة لإدارة الألم تشمل أدوية مناسبة ومتابعة يومية لضمان راحة المريض خلال فترة التعافي.",
      en: "A complete pain-management plan is put in place, with appropriate medication and daily follow-up for comfort during recovery.",
    },
  },
  {
    question: { ar: "هل تشمل الخدمة متابعة ما بعد الجراحة؟", en: "Does the service include post-surgical follow-up?" },
    answer: {
      ar: "نعم، تشمل رعايتنا برنامج متابعة دوري بعد الجراحة لضمان التعافي الآمن ورصد أي تطورات مبكرًا.",
      en: "Yes — our care includes a regular post-surgical follow-up program to ensure safe recovery and catch any changes early.",
    },
  },
];

export default function ServicesFAQ() {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="section-eyebrow">
            <HelpCircle className="h-4 w-4" />
            {pick(lang, { ar: "الأسئلة الشائعة", en: "Frequently Asked Questions" })}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
            {pick(lang, { ar: "كل ما تريد معرفته عن الجراحة", en: "Everything You Need to Know About Surgery" })}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">
            {pick(lang, {
              ar: "إجابات تفصيلية حول التحضير للجراحة والتعافي والإقامة بالمستشفى.",
              en: "Detailed answers on surgical prep, recovery, and hospital stays.",
            })}
          </p>
        </motion.div>

        {/* items-start: without it, CSS Grid stretches every card in a row
            to match its tallest sibling by default — so opening one card's
            answer would visually grow the closed card next to it too, even
            though it never actually expands. */}
        <div className="mt-12 grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
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
                  className="flex w-full items-center justify-between gap-4 p-5 text-start"
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
                      <p className="px-5 pb-5 text-sm leading-relaxed text-ink/65">
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
    </section>
  );
}

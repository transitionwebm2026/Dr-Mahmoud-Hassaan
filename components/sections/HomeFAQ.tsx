"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick, type Bilingual } from "@/lib/i18n";

const faqs: { question: Bilingual; answer: Bilingual }[] = [
  {
    question: {
      ar: "ما هي التخصصات الجراحية التي يقدمها الدكتور محمود حسان؟",
      en: "What surgical specialties does Dr. Mahmoud Hassan offer?",
    },
    answer: {
      ar: "جراحات أورام الثدي والجهاز الهضمي والغدد والرقبة، بما في ذلك الجراحة بالمنظار والحد الأدنى من التدخل.",
      en: "Breast, GI, and head & neck / thyroid oncology surgery, including laparoscopic and minimally invasive techniques.",
    },
  },
  {
    question: {
      ar: "هل يمكنني الحصول على استشارة قبل تحديد موعد الجراحة؟",
      en: "Can I get a consultation before scheduling surgery?",
    },
    answer: {
      ar: "بالتأكيد، تبدأ كل حالة باستشارة تفصيلية لمناقشة التشخيص والخيارات العلاجية المتاحة قبل اتخاذ أي قرار.",
      en: "Absolutely — every case starts with a detailed consultation to discuss the diagnosis and available treatment options before any decision is made.",
    },
  },
  {
    question: {
      ar: "هل تقدمون رأيًا ثانيًا لحالات تم تشخيصها من قبل أطباء آخرين؟",
      en: "Do you offer a second opinion for cases diagnosed elsewhere?",
    },
    answer: {
      ar: "نعم، نراجع التقارير والأشعة السابقة ونقدم رأيًا طبيًا مستقلًا حول التشخيص وأنسب خطة علاجية.",
      en: "Yes — previous reports and imaging are reviewed to provide an independent medical opinion on the diagnosis and the most suitable treatment plan.",
    },
  },
  {
    question: {
      ar: "كم تستغرق فترة التعافي بعد الجراحة عادةً؟",
      en: "How long does recovery typically take after surgery?",
    },
    answer: {
      ar: "تختلف حسب نوع الجراحة وحالة المريض، وتتراوح غالبًا بين أسبوعين وستة أسابيع للتعافي الكامل.",
      en: "It varies by procedure and patient condition, typically ranging from two to six weeks for full recovery.",
    },
  },
  {
    question: {
      ar: "كيف يمكنني حجز أول موعد لي؟",
      en: "How can I book my first appointment?",
    },
    answer: {
      ar: "يمكنك الحجز مباشرة عبر واتساب أو الاتصال بالعيادة، وسيقوم فريقنا بتحديد أقرب موعد مناسب لحالتك.",
      en: "You can book directly via WhatsApp or by calling the clinic, and our team will arrange the nearest suitable appointment.",
    },
  },
  {
    question: {
      ar: "هل تتوفر متابعة عن بُعد بعد انتهاء العلاج؟",
      en: "Is remote follow-up available after treatment ends?",
    },
    answer: {
      ar: "نعم، نوفر متابعة دورية عبر استشارات الفيديو لمتابعة التعافي دون الحاجة لزيارة العيادة في كل مرة.",
      en: "Yes — we offer regular video-consultation follow-ups to track recovery without needing an in-person visit every time.",
    },
  },
];

export default function HomeFAQ() {
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
            {pick(lang, { ar: "إجابات سريعة على أهم استفساراتك", en: "Quick Answers to Your Top Questions" })}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">
            {pick(lang, {
              ar: "نظرة عامة على التخصصات والاستشارات والحجز والمتابعة بعد العلاج.",
              en: "An overview of specialties, consultations, booking, and post-treatment follow-up.",
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

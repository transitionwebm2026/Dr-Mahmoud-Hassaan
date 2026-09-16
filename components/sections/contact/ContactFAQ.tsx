"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick, type Bilingual } from "@/lib/i18n";

const faqs: { question: Bilingual; answer: Bilingual }[] = [
  {
    question: { ar: "كيف يمكنني حجز موعد أو استشارة؟", en: "How can I book an appointment or consultation?" },
    answer: {
      ar: "يمكنك تعبئة فورم الحجز أعلاه وسيتم تجهيز رسالة جاهزة على واتساب، أو التواصل مباشرة عبر الهاتف خلال مواعيد العمل.",
      en: "Fill in the booking form above to send a ready-made WhatsApp message, or reach us directly by phone during working hours.",
    },
  },
  {
    question: { ar: "ما هي طرق الدفع المتاحة؟", en: "What payment methods are available?" },
    answer: {
      ar: "نقبل الدفع النقدي، البطاقات الائتمانية (فيزا وماستركارد)، بالإضافة إلى إمكانية التقسيط لبعض الإجراءات الجراحية.",
      en: "We accept cash, credit/debit cards (Visa & Mastercard), and installment plans are available for certain surgical procedures.",
    },
  },
  {
    question: { ar: "هل يمكن استخدام التأمين الصحي؟", en: "Can I use my health insurance?" },
    answer: {
      ar: "يعتمد ذلك على شركة التأمين وبوليصتك؛ تواصل معنا بأرقام العيادة لمعرفة الشركات المتعاقد معها وتفاصيل التغطية.",
      en: "This depends on your insurer and policy — contact the clinic with your provider's name and we'll confirm coverage details.",
    },
  },
  {
    question: { ar: "خلال كم مدة يتم الرد على استفساراتي؟", en: "How quickly do you respond to inquiries?" },
    answer: {
      ar: "يتم الرد على رسائل واتساب والمكالمات خلال ساعات العمل في نفس اليوم غالبًا، وفي أقرب وقت ممكن خارج هذه المواعيد.",
      en: "WhatsApp messages and calls are usually answered the same day during working hours, and as soon as possible outside them.",
    },
  },
  {
    question: { ar: "هل يمكنني تأجيل أو إلغاء موعدي؟", en: "Can I reschedule or cancel my appointment?" },
    answer: {
      ar: "نعم، يُرجى التواصل معنا عبر الهاتف أو واتساب قبل الموعد بـ 24 ساعة على الأقل لإعادة الجدولة دون أي مشكلة.",
      en: "Yes — just contact us by phone or WhatsApp at least 24 hours in advance and we'll happily reschedule.",
    },
  },
  {
    question: { ar: "هل تتوفر استشارة عن بُعد عبر الفيديو؟", en: "Is a remote video consultation available?" },
    answer: {
      ar: "نعم، متاحة لمتابعة الحالات القائمة والاستشارات الأولية، على أن تُحدَّد الحاجة للفحص الحضوري بعدها.",
      en: "Yes — available for existing-patient follow-ups and initial consultations, with an in-person visit arranged afterward if needed.",
    },
  },
  {
    question: { ar: "ماذا أحضر معي في أول زيارة؟", en: "What should I bring to my first visit?" },
    answer: {
      ar: "أحضر بطاقة الرقم القومي، أي تقارير أو أشعة أو تحاليل سابقة، وبطاقة التأمين الصحي إن وجدت.",
      en: "Please bring your national ID, any previous reports, scans or lab results, and your insurance card if applicable.",
    },
  },
  {
    question: { ar: "هل يوجد خط للحالات العاجلة خارج مواعيد العمل؟", en: "Is there a hotline for urgent cases after hours?" },
    answer: {
      ar: "نعم، خط الطوارئ والحجز الموضح في بيانات العيادة متاح للتواصل في الحالات العاجلة خارج ساعات العمل الرسمية.",
      en: "Yes — the emergency & booking hotline listed in the clinic info section is available for urgent cases outside regular hours.",
    },
  },
];

export default function ContactFAQ() {
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
            {pick(lang, { ar: "أسئلة شائعة عن التواصل والحجز", en: "FAQ About Contact & Booking" })}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
            {pick(lang, { ar: "كل ما يخص الحجز والتواصل والدفع", en: "Everything About Booking, Contact & Payment" })}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">
            {pick(lang, {
              ar: "إجابات سريعة عن طرق التواصل، الحجز، الدفع، والتأمين الصحي.",
              en: "Quick answers on how to reach us, book, pay, and use your health insurance.",
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

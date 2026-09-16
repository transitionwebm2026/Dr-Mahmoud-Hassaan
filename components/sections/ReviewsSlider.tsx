"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, MessageSquareQuote, Quote, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick, type Bilingual } from "@/lib/i18n";

const reviews: { name: Bilingual; procedure: Bilingual; quote: Bilingual; rating: number }[] = [
  {
    name: { ar: "أم أحمد", en: "Um Ahmed" },
    procedure: { ar: "جراحة أورام الثدي", en: "Breast Cancer Surgery" },
    quote: {
      ar: "الدكتور محمود حسان غيّر حياتي، تعامل إنساني ودقة جراحية عالية من أول لحظة.",
      en: "Dr. Mahmoud Hassan changed my life — a compassionate approach and outstanding surgical precision from day one.",
    },
    rating: 5,
  },
  {
    name: { ar: "كريم السيد", en: "Kareem El-Sayed" },
    procedure: { ar: "جراحة أورام القولون", en: "Colon Oncology Surgery" },
    quote: {
      ar: "متابعة مستمرة وشرح واضح لكل خطوة في رحلة العلاج، شكرًا دكتور.",
      en: "Continuous follow-up and clear explanations at every step of my treatment journey. Thank you, Doctor.",
    },
    rating: 5,
  },
  {
    name: { ar: "منى عبد الله", en: "Mona Abdallah" },
    procedure: { ar: "جراحة بالمنظار", en: "Laparoscopic Surgery" },
    quote: {
      ar: "فريق طبي محترف وجراحة ناجحة بفضل الله وجهد الدكتور محمود وفريقه.",
      en: "A professional medical team and a successful surgery, thanks to Dr. Mahmoud and his team's dedication.",
    },
    rating: 5,
  },
  {
    name: { ar: "أحمد فتحي", en: "Ahmed Fathy" },
    procedure: { ar: "استشارة وتخطيط جراحي", en: "Consultation & Surgical Planning" },
    quote: {
      ar: "أنصح بشدة بالدكتور محمود حسان لخبرته الكبيرة وحرصه الدائم على راحة المريض.",
      en: "I highly recommend Dr. Mahmoud Hassan for his deep expertise and genuine care for patient comfort.",
    },
    rating: 5,
  },
  {
    name: { ar: "سارة يوسف", en: "Sara Youssef" },
    procedure: { ar: "متابعة ما بعد الجراحة", en: "Post-Surgical Follow-up" },
    quote: {
      ar: "تجربة علاجية مطمئنة تمامًا من أول استشارة وحتى التعافي الكامل.",
      en: "A completely reassuring treatment experience, from the first consultation to full recovery.",
    },
    rating: 5,
  },
];

const AUTO_SCROLL_MS = 3800;

export default function ReviewsSlider() {
  const { lang } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const PrevIcon = lang === "ar" ? ArrowRight : ArrowLeft;
  const NextIcon = lang === "ar" ? ArrowLeft : ArrowRight;

  const scrollByCard = useCallback(
    (direction: 1 | -1) => {
      const track = trackRef.current;
      if (!track) return;
      const card = track.querySelector<HTMLElement>("[data-review-card]");
      const step = card ? card.offsetWidth + 24 : track.clientWidth * 0.85;
      const sign = lang === "ar" ? -direction : direction;

      const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      const atStart = track.scrollLeft <= 4;

      if (direction === 1 && atEnd) {
        track.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }
      if (direction === -1 && atStart) {
        track.scrollTo({ left: track.scrollWidth, behavior: "smooth" });
        return;
      }
      track.scrollBy({ left: sign * step, behavior: "smooth" });
    },
    [lang]
  );

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => scrollByCard(1), AUTO_SCROLL_MS);
    return () => clearInterval(timer);
  }, [isPaused, scrollByCard]);

  return (
    <section className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto flex max-w-2xl flex-col items-center text-center"
        >
          <span className="section-eyebrow">
            <MessageSquareQuote className="h-4 w-4" />
            {pick(lang, { ar: "آراء المرضى", en: "Patient Reviews" })}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
            {pick(lang, { ar: "ماذا يقول مرضانا؟", en: "What Our Patients Say" })}
          </h2>
        </motion.div>

        <div
          className="relative mt-12"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            ref={trackRef}
            className="no-scrollbar mask-fade-edges flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4"
          >
            {reviews.map((review, i) => (
              <motion.div
                key={review.name.en}
                data-review-card
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass-card w-[85%] shrink-0 snap-center p-6 sm:w-[46%] lg:w-[31%]"
              >
                <Quote className="h-8 w-8 text-brand/30" />
                <p className="mt-3 min-h-[80px] text-sm leading-relaxed text-ink/75">
                  {pick(lang, review.quote)}
                </p>
                <div className="mt-4 flex items-center gap-1">
                  {Array.from({ length: review.rating }).map((_, starIdx) => (
                    <Star key={starIdx} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-3 border-t border-brand/10 pt-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-gradient font-english text-sm font-extrabold text-white">
                    {pick(lang, review.name).charAt(0)}
                  </span>
                  <div>
                    <p className="text-sm font-extrabold text-ink">{pick(lang, review.name)}</p>
                    <p className="text-xs text-ink/50">{pick(lang, review.procedure)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous review"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-brand/20 bg-white/60 text-brand-700 backdrop-blur-md transition hover:bg-white"
            >
              <PrevIcon className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next review"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-brand/20 bg-white/60 text-brand-700 backdrop-blur-md transition hover:bg-white"
            >
              <NextIcon className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link href="/reviews" className="btn-outline-glass">
            {pick(lang, { ar: "عرض كل الآراء", en: "View All Reviews" })}
          </Link>
        </div>
      </div>
    </section>
  );
}

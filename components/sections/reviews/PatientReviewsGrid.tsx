"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Quote, Sparkles, Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick, type Bilingual } from "@/lib/i18n";

interface PatientReview {
  name: Bilingual;
  title: Bilingual;
  quote: Bilingual;
  procedure: Bilingual;
  rating: 4 | 5;
  verified: boolean;
}

const reviews: PatientReview[] = [
  {
    name: { ar: "أم أحمد", en: "Um Ahmed" },
    title: { ar: "أعاد لي هذا الفريق الأمل والحياة", en: "This Team Gave Me Back Hope and Life" },
    quote: {
      ar: "بعد التشخيص كنت خائفة جدًا، لكن الدكتور محمود حسان شرح لي كل خطوة بصبر واطمئنان. الجراحة نجحت والتعافي كان أسرع مما توقعت بفضل المتابعة الدقيقة.",
      en: "After my diagnosis I was terrified, but Dr. Mahmoud Hassan walked me through every step with patience and reassurance. The surgery succeeded and my recovery was faster than I expected, thanks to the meticulous follow-up.",
    },
    procedure: { ar: "جراحة أورام الثدي", en: "Breast Cancer Surgery" },
    rating: 5,
    verified: true,
  },
  {
    name: { ar: "كريم السيد", en: "Kareem El-Sayed" },
    title: { ar: "دقة جراحية ورعاية إنسانية حقيقية", en: "Surgical Precision with Genuine Human Care" },
    quote: {
      ar: "ما يميز الدكتور محمود ليس فقط مهارته الجراحية العالية، بل تعامله الإنساني معي ومع أسرتي طوال فترة العلاج. أنصح به بثقة تامة.",
      en: "What sets Dr. Mahmoud apart isn't only his exceptional surgical skill — it's how humanely he treated me and my family throughout the entire journey. I recommend him with complete confidence.",
    },
    procedure: { ar: "جراحة أورام القولون", en: "Colon Oncology Surgery" },
    rating: 5,
    verified: true,
  },
  {
    name: { ar: "منى عبد الله", en: "Mona Abdallah" },
    title: { ar: "تعافيت في وقت قياسي بفضل المنظار", en: "Back on My Feet in Record Time" },
    quote: {
      ar: "الجراحة بالمنظار وفّرت عليّ ألمًا كبيرًا وفترة نقاهة طويلة. خرجت من المستشفى خلال يومين فقط وعدت لعملي خلال أسبوعين.",
      en: "The laparoscopic approach spared me a lot of pain and a long recovery. I left the hospital within two days and was back at work in two weeks.",
    },
    procedure: { ar: "جراحة بالمنظار", en: "Laparoscopic Surgery" },
    rating: 5,
    verified: true,
  },
  {
    name: { ar: "أحمد فتحي", en: "Ahmed Fathy" },
    title: { ar: "استشارة صادقة غيّرت قراري للأفضل", en: "An Honest Consultation That Changed My Decision" },
    quote: {
      ar: "قبل أن أقرر الجراحة، أخذت وقتًا كافيًا مع الدكتور لمناقشة كل الخيارات المتاحة بصراحة تامة. شعرت أن قراري مبني على معلومة كاملة وليس على خوف.",
      en: "Before committing to surgery, I had ample time with the doctor to discuss every option with complete honesty. My decision felt informed, not driven by fear.",
    },
    procedure: { ar: "استشارة وتخطيط جراحي", en: "Surgical Consultation & Planning" },
    rating: 4,
    verified: true,
  },
  {
    name: { ar: "سارة يوسف", en: "Sara Youssef" },
    title: { ar: "متابعة ما بعد الجراحة أشعرتني بالأمان", en: "Post-Op Follow-up That Made Me Feel Safe" },
    quote: {
      ar: "الفريق الطبي كان متاحًا للرد على كل استفساراتي بعد العملية مباشرة. هذا الاهتمام المستمر جعل رحلة تعافيي مطمئنة تمامًا.",
      en: "The medical team was available to answer every question right after my operation. That continuous attention made my recovery journey completely reassuring.",
    },
    procedure: { ar: "متابعة ما بعد الجراحة", en: "Post-Surgical Follow-up" },
    rating: 5,
    verified: true,
  },
  {
    name: { ar: "نورهان عادل", en: "Nourhan Adel" },
    title: { ar: "ندبة شبه غير مرئية ونتيجة تفوق توقعاتي", en: "An Almost Invisible Scar and Results Beyond Expectations" },
    quote: {
      ar: "كنت قلقة جدًا بشأن الشكل الجمالي بعد جراحة الغدة الدرقية، لكن النتيجة فاقت كل توقعاتي بفضل دقة الدكتور محمود ومهارته.",
      en: "I was very anxious about the cosmetic outcome of my thyroid surgery, but the result exceeded every expectation thanks to Dr. Mahmoud's precision and skill.",
    },
    procedure: { ar: "جراحة الغدة الدرقية", en: "Thyroid Surgery" },
    rating: 5,
    verified: true,
  },
  {
    name: { ar: "مصطفى كمال", en: "Mostafa Kamal" },
    title: { ar: "فريق متعدد التخصصات لم يترك شيئًا للصدفة", en: "A Multidisciplinary Team That Left Nothing to Chance" },
    quote: {
      ar: "من التشخيص وحتى تخطيط العلاج، شعرت أن فريقًا كاملًا من المتخصصين يقف خلف حالتي، وليس طبيبًا واحدًا فقط. هذا فرق كبير.",
      en: "From diagnosis through treatment planning, I felt an entire team of specialists stood behind my case, not just one doctor. That made all the difference.",
    },
    procedure: { ar: "جراحة أورام المعدة", en: "Gastric Tumor Surgery" },
    rating: 5,
    verified: true,
  },
  {
    name: { ar: "هبة رفعت", en: "Heba Refaat" },
    title: { ar: "حافظت على شكلي التجميلي واستأصلت الورم بأمان", en: "My Shape Preserved, My Tumor Safely Removed" },
    quote: {
      ar: "اختيار الجراحة الحافظة لشكل الثدي كان قرارًا صعبًا، لكن الدكتور محمود طمأنني بخبرته وأثبتت النتيجة أنه القرار الصحيح.",
      en: "Choosing breast-conserving surgery was a difficult decision, but Dr. Mahmoud's expertise reassured me — and the result proved it was the right choice.",
    },
    procedure: { ar: "جراحة حافظة لشكل الثدي", en: "Breast-Conserving Surgery" },
    rating: 5,
    verified: true,
  },
  {
    name: { ar: "يوسف أنور", en: "Youssef Anwar" },
    title: { ar: "جراحة دقيقة لحالة معقدة في البنكرياس", en: "A Precise Surgery for a Complex Pancreatic Case" },
    quote: {
      ar: "حالتي كانت معقدة وسمعت آراء متضاربة من أكثر من طبيب، لكن دقة التشخيص والخطة الجراحية عند الدكتور محمود كانت الفارق الحقيقي في نجاح عمليتي.",
      en: "My case was complex and I had heard conflicting opinions from multiple doctors, but Dr. Mahmoud's diagnostic precision and surgical plan truly made the difference in my successful surgery.",
    },
    procedure: { ar: "جراحة أورام البنكرياس", en: "Pancreatic Tumor Surgery" },
    rating: 4,
    verified: true,
  },
];

/** Large-screen vertical stagger by column position — a lightweight, order-preserving stand-in for true masonry. */
const COLUMN_OFFSET = ["lg:mt-0", "lg:mt-10", "lg:mt-4"];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1 rounded-full border border-amber-300/50 bg-white/55 px-3 py-1.5 shadow-[0_0_18px_rgba(251,191,36,0.3)] backdrop-blur-md">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < rating
              ? "h-3.5 w-3.5 fill-amber-400 text-amber-400 drop-shadow-[0_0_5px_rgba(251,191,36,0.7)]"
              : "h-3.5 w-3.5 fill-transparent text-brand/20"
          }
        />
      ))}
    </div>
  );
}

export default function PatientReviewsGrid() {
  const { lang } = useLanguage();

  return (
    <section className="relative px-4 py-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-mesh-medical opacity-20" />

      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="section-eyebrow">
            <Sparkles className="h-4 w-4" />
            {pick(lang, { ar: "قصص حقيقية من مرضانا", en: "Real Stories From Our Patients" })}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
            {pick(lang, { ar: "تجارب موثّقة برحلة التعافي الكاملة", en: "Verified Experiences Across the Full Recovery Journey" })}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">
            {pick(lang, {
              ar: "كل تقييم هنا من مريض حقيقي خضع للعلاج على يد الدكتور محمود حسان وفريقه الطبي.",
              en: "Every review here comes from a real patient treated by Dr. Mahmoud Hassan and his medical team.",
            })}
          </p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.article
              key={review.name.en}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10 }}
              className={`glass-card group relative flex flex-col overflow-hidden p-6 transition-shadow duration-500 hover:shadow-glow-brand sm:p-7 ${COLUMN_OFFSET[index % 3]}`}
            >
              {/* ambient hover glow */}
              <div className="pointer-events-none absolute -end-10 -top-10 h-36 w-36 rounded-full bg-brand/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/40 transition-all duration-500 group-hover:ring-brand/30" />

              {/* Top: rating + avatar */}
              <div className="relative flex items-start justify-between gap-3">
                <StarRating rating={review.rating} />
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-gradient font-english text-base font-extrabold text-white shadow-glow-brand">
                  {pick(lang, review.name).charAt(0)}
                </span>
              </div>

              {/* Middle: title + testimonial */}
              <div className="relative mt-5 flex-1">
                <Quote className="h-7 w-7 text-brand/25" />
                <h3 className="mt-2 text-base font-extrabold leading-snug text-ink sm:text-lg">
                  {pick(lang, review.title)}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink/65">{pick(lang, review.quote)}</p>
              </div>

              {/* Bottom: patient name + verified badge */}
              <div className="relative mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-brand/10 pt-4">
                <p className="text-sm font-extrabold text-ink">{pick(lang, review.name)}</p>
                {review.verified && (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/30 bg-brand/10 px-3 py-1 text-[11px] font-bold text-brand-700">
                    <BadgeCheck className="h-3.5 w-3.5" />
                    {pick(lang, { ar: "مريض موثّق", en: "Verified Patient" })}
                  </span>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

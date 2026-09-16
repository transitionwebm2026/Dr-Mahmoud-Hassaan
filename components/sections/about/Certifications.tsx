"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Award,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  GraduationCap,
  Globe2,
  RotateCw,
  ShieldCheck,
  UsersRound,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick, type Bilingual } from "@/lib/i18n";

const certifications: { icon: LucideIcon; title: Bilingual; issuer: Bilingual; detail: Bilingual }[] = [
  {
    icon: GraduationCap,
    title: { ar: "بكالوريوس ودكتوراه الطب", en: "MBBCh & MD in Surgery" },
    issuer: { ar: "جامعة القاهرة", en: "Cairo University" },
    detail: {
      ar: "تأهيل أكاديمي كامل في الطب والجراحة العامة، بتقدير امتياز مع مرتبة الشرف.",
      en: "Full academic qualification in medicine and general surgery, graduated with honors.",
    },
  },
  {
    icon: Award,
    title: { ar: "زمالة جراحة الأورام", en: "Fellowship in Surgical Oncology" },
    issuer: { ar: "المعهد القومي للأورام", en: "National Cancer Institute" },
    detail: {
      ar: "تدريب متخصص مكثف على أحدث تقنيات جراحة الأورام تحت إشراف نخبة من الأساتذة.",
      en: "Intensive specialized training in the latest surgical oncology techniques under leading professors.",
    },
  },
  {
    icon: ShieldCheck,
    title: { ar: "عضوية الجمعية المصرية لجراحة الأورام", en: "Egyptian Society of Surgical Oncology" },
    issuer: { ar: "عضو فعال", en: "Active Member" },
    detail: {
      ar: "مشاركة فعالة في المؤتمرات العلمية وتطوير معايير الممارسة الجراحية محليًا.",
      en: "Active participation in scientific conferences and advancing local surgical practice standards.",
    },
  },
  {
    icon: Globe2,
    title: { ar: "عضوية دولية في جراحة الأورام", en: "International Surgical Oncology Society" },
    issuer: { ar: "عضو دولي", en: "International Member" },
    detail: {
      ar: "تواصل مستمر مع أحدث الأبحاث والبروتوكولات العلاجية العالمية.",
      en: "Ongoing engagement with the latest global research and treatment protocols.",
    },
  },
  {
    icon: BookOpen,
    title: { ar: "أبحاث ومنشورات علمية دولية", en: "Internationally Published Research" },
    issuer: { ar: "دوريات طبية محكّمة", en: "Peer-Reviewed Journals" },
    detail: {
      ar: "مساهمات بحثية منشورة في دوريات طبية محكّمة في مجال جراحة الأورام.",
      en: "Research contributions published in peer-reviewed surgical oncology journals.",
    },
  },
  {
    icon: UsersRound,
    title: { ar: "تدريب وإشراف أطباء مقيمين", en: "Resident Physician Training" },
    issuer: { ar: "المعهد القومي للأورام", en: "National Cancer Institute" },
    detail: {
      ar: "إشراف أكاديمي وعملي على أطباء مقيمين لصقل مهاراتهم الجراحية.",
      en: "Academic and hands-on supervision of resident physicians to sharpen their surgical skills.",
    },
  },
];

function CertificationCard({
  cert,
  index,
}: {
  cert: (typeof certifications)[number];
  index: number;
}) {
  const { lang } = useLanguage();
  // Click/tap "pins" the card flipped (independent, persists after the
  // pointer leaves — this is what makes it work on touch). Hovering
  // overrides to flipped for as long as the pointer stays, via
  // whileHover, without fighting the pinned state below it — Framer
  // Motion gives gesture props like whileHover priority over animate.
  const [pinned, setPinned] = useState(false);
  const Icon = cert.icon;
  const offset = index % 3 === 1 ? "sm:mt-6" : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 34, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className={offset}
    >
      <button
        type="button"
        onClick={() => setPinned((p) => !p)}
        aria-label={`${pick(lang, cert.title)} — ${pick(lang, { ar: "اضغط لمزيد من التفاصيل", en: "tap for more detail" })}`}
        className="group h-64 w-full cursor-pointer text-start [perspective:1200px]"
      >
        <motion.div
          animate={{ rotateY: pinned ? 180 : 0 }}
          whileHover={{ rotateY: 180 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full w-full [transform-style:preserve-3d]"
        >
          {/* Front */}
          <div className="glass-card absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center [backface-visibility:hidden]">
            <span className="icon-chip !h-14 !w-14">
              <Icon className="h-6 w-6" strokeWidth={1.7} />
            </span>
            <h3 className="font-extrabold text-ink">{pick(lang, cert.title)}</h3>
            <p className="text-sm text-ink/55">{pick(lang, cert.issuer)}</p>
            <span className="mt-1 inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <RotateCw className="h-3 w-3" />
              {pick(lang, { ar: "اقلب للتفاصيل", en: "Flip for detail" })}
            </span>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3 overflow-hidden rounded-3xl bg-brand-gradient p-6 text-center text-white shadow-glass-lg [backface-visibility:hidden]"
            style={{ transform: "rotateY(180deg)" }}
          >
            <div className="pointer-events-none absolute inset-0 bg-mesh-medical opacity-30" />
            <CheckCircle2 className="relative h-7 w-7 text-white/90" strokeWidth={1.7} />
            <p className="relative text-sm leading-relaxed text-white/90">{pick(lang, cert.detail)}</p>
            <span className="relative mt-1 text-[11px] font-bold text-white/70">{pick(lang, cert.issuer)}</span>
          </div>
        </motion.div>
      </button>
    </motion.div>
  );
}

export default function Certifications() {
  const { lang } = useLanguage();

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
            <BadgeCheck className="h-4 w-4" />
            {pick(lang, { ar: "الشهادات والإنجازات", en: "Certificates & Accreditations" })}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
            {pick(lang, { ar: "اعتمادات موثوقة عالميًا", en: "Globally Trusted Credentials" })}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">
            {pick(lang, { ar: "مرر المؤشر أو اضغط على البطاقة لمعرفة المزيد.", en: "Hover or tap a card to reveal more detail." })}
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.title.en} cert={cert} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

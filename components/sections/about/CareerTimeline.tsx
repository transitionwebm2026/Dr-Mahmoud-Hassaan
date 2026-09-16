"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import {
  Award,
  GraduationCap,
  Milestone,
  ShieldCheck,
  Stethoscope,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick, type Bilingual } from "@/lib/i18n";

const milestones: { year: string; icon: LucideIcon; title: Bilingual; description: Bilingual }[] = [
  {
    year: "2008",
    icon: GraduationCap,
    title: { ar: "بكالوريوس الطب والجراحة", en: "MBBCh, Faculty of Medicine" },
    description: {
      ar: "تخرج بتقدير امتياز من كلية طب جامعة القاهرة.",
      en: "Graduated with honors from the Faculty of Medicine, Cairo University.",
    },
  },
  {
    year: "2012",
    icon: Stethoscope,
    title: { ar: "الماجستير في الجراحة العامة", en: "Master's Degree in General Surgery" },
    description: {
      ar: "حصل على درجة الماجستير في الجراحة العامة من جامعة القاهرة.",
      en: "Earned a Master's degree in General Surgery from Cairo University.",
    },
  },
  {
    year: "2015",
    icon: Award,
    title: { ar: "زمالة جراحة الأورام", en: "Fellowship in Surgical Oncology" },
    description: {
      ar: "أتم برنامج الزمالة في جراحة الأورام بالمعهد القومي للأورام.",
      en: "Completed a fellowship in surgical oncology at the National Cancer Institute.",
    },
  },
  {
    year: "2018",
    icon: GraduationCap,
    title: { ar: "الدكتوراه في جراحة الأورام", en: "MD in Surgical Oncology" },
    description: {
      ar: "حصل على درجة الدكتوراه في جراحة الأورام من جامعة القاهرة.",
      en: "Earned an MD in Surgical Oncology from Cairo University.",
    },
  },
  {
    year: "2020",
    icon: ShieldCheck,
    title: { ar: "استشاري جراحة الأورام", en: "Consultant of Surgical Oncology" },
    description: {
      ar: "تم تعيينه استشاريًا لجراحة الأورام بالمعهد القومي للأورام - جامعة القاهرة.",
      en: "Appointed Consultant of Surgical Oncology at the National Cancer Institute, Cairo University.",
    },
  },
  {
    year: "2023",
    icon: Trophy,
    title: { ar: "عضو الجمعية المصرية لجراحة الأورام", en: "Member, Egyptian Society of Surgical Oncology" },
    description: {
      ar: "انضم إلى عضوية الجمعية المصرية لجراحة الأورام تقديرًا لإسهاماته العلمية.",
      en: "Joined the Egyptian Society of Surgical Oncology in recognition of his scientific contributions.",
    },
  },
];

function TimelineNode({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[number];
  index: number;
}) {
  const { lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  // A thin band around the viewport's vertical center — whichever node is
  // inside it right now is treated as the "current" one on the journey.
  const isActive = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const Icon = milestone.icon;
  const stagger = index % 2 === 0 ? "sm:ms-0" : "sm:ms-10";

  return (
    <div ref={ref} className={`relative ps-16 ${stagger}`}>
      <motion.span
        animate={
          isActive
            ? { scale: 1.15, boxShadow: "0 0 0 8px rgba(22,142,159,0.18)" }
            : { scale: 1, boxShadow: "0 0 0 0px rgba(22,142,159,0)" }
        }
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`absolute start-0 top-0 z-10 flex h-10 w-10 items-center justify-center rounded-full text-white transition-colors duration-500 ${
          isActive ? "bg-brand-gradient shadow-glow-brand" : "bg-ink/20"
        }`}
      >
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </motion.span>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.92, filter: "blur(6px)" }}
        whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ x: lang === "ar" ? -6 : 6 }}
        className={`glass-card p-5 transition-[border-color,box-shadow] duration-500 ${
          isActive ? "border-brand/30 shadow-glass-lg" : ""
        }`}
      >
        <span className="font-english text-xs font-extrabold tracking-wide text-brand-600">
          {milestone.year}
        </span>
        <h3 className="mt-1 font-extrabold text-ink">{pick(lang, milestone.title)}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-ink/60">
          {pick(lang, milestone.description)}
        </p>
      </motion.div>
    </div>
  );
}

export default function CareerTimeline() {
  const { lang } = useLanguage();
  const trackRef = useRef<HTMLDivElement>(null);

  // Scroll-scrubbed progress: the line fill and the glowing marker are tied
  // directly to how far the user has scrolled through the track, instead of
  // a one-shot reveal — so the journey visibly advances as you read.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 0.75", "end 0.4"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const markerTop = useTransform(progress, [0, 1], ["0%", "100%"]);
  const markerOpacity = useTransform(progress, [0, 0.02, 0.98, 1], [0, 1, 1, 0]);

  return (
    <section className="relative overflow-hidden px-4 py-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-mesh-medical opacity-20" />
      <div className="relative mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="section-eyebrow">
            <Milestone className="h-4 w-4" />
            {pick(lang, { ar: "المسيرة العملية", en: "Career Journey" })}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
            {pick(lang, { ar: "محطات في مسيرة التميز", en: "Milestones of a Distinguished Career" })}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">
            {pick(lang, {
              ar: "من مقاعد الدراسة إلى غرف العمليات، رحلة علمية وعملية مبنية على التعلم المستمر.",
              en: "From the classroom to the operating room — a journey built on continuous learning.",
            })}
          </p>
        </motion.div>

        <div ref={trackRef} className="relative mt-16">
          {/* Base line */}
          <div className="absolute start-5 top-2 bottom-2 w-0.5 bg-brand/12" />
          {/* Scroll-scrubbed fill */}
          <motion.div
            style={{ scaleY: progress, transformOrigin: "top" }}
            className="absolute start-5 top-2 bottom-2 w-0.5 bg-brand-gradient"
          />
          {/* Traveling glow marker */}
          <motion.span
            style={{ top: markerTop, opacity: markerOpacity }}
            className="absolute start-5 z-20 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2 rounded-full bg-white shadow-[0_0_0_4px_rgba(22,142,159,0.35),0_0_18px_4px_rgba(22,142,159,0.55)]"
          />

          <div className="space-y-10">
            {milestones.map((milestone, index) => (
              <TimelineNode key={milestone.year} milestone={milestone} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

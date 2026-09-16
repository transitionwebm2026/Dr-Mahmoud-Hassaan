"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Clapperboard, Play } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import VideoModal, { type VideoEntry } from "./VideoModal";

const THUMBS = ["/images/video-thumb-1.jpg", "/images/video-thumb-2.jpg", "/images/video-thumb-3.jpg"];

const videos: VideoEntry[] = [
  {
    title: { ar: "كيف تكتشف أورام الثدي مبكرًا؟", en: "How to Detect Breast Cancer Early" },
    description: {
      ar: "علامات مبكرة يجب الانتباه لها وأهمية الفحص الدوري.",
      en: "Early warning signs to watch for and why regular screening matters.",
    },
    duration: "02:14",
    thumbnail: THUMBS[0],
  },
  {
    title: { ar: "ماذا تتوقع في يوم العملية؟", en: "What to Expect on Surgery Day" },
    description: {
      ar: "خطوة بخطوة من الوصول إلى المستشفى وحتى غرفة العمليات.",
      en: "A step-by-step walkthrough from hospital arrival to the operating room.",
    },
    duration: "03:05",
    thumbnail: THUMBS[1],
  },
  {
    title: { ar: "نصائح للتعافي بعد الجراحة", en: "Recovery Tips After Surgery" },
    description: {
      ar: "عادات يومية تسرّع التعافي وتقلل من المضاعفات.",
      en: "Daily habits that speed up recovery and reduce complications.",
    },
    duration: "01:48",
    thumbnail: THUMBS[2],
  },
  {
    title: { ar: "الفحص الذاتي للثدي خطوة بخطوة", en: "Breast Self-Exam Step by Step" },
    description: {
      ar: "طريقة صحيحة وبسيطة لإجراء الفحص الذاتي في المنزل.",
      en: "A simple, correct technique for performing a self-exam at home.",
    },
    duration: "02:40",
    thumbnail: THUMBS[0],
  },
  {
    title: { ar: "التغذية السليمة أثناء العلاج", en: "Proper Nutrition During Treatment" },
    description: {
      ar: "نصائح غذائية لدعم الجسم خلال رحلة العلاج.",
      en: "Nutrition guidance to support the body throughout treatment.",
    },
    duration: "03:22",
    thumbnail: THUMBS[1],
  },
  {
    title: { ar: "الجراحة بالمنظار: ماذا تعني لك؟", en: "Laparoscopic Surgery: What It Means for You" },
    description: {
      ar: "الفرق بين الجراحة التقليدية والجراحة بالمنظار وفوائدها.",
      en: "How laparoscopic surgery differs from open surgery, and its benefits.",
    },
    duration: "02:57",
    thumbnail: THUMBS[2],
  },
  {
    title: { ar: "أسئلة شائعة قبل الجراحة", en: "Common Questions Before Surgery" },
    description: {
      ar: "إجابات سريعة عن أكثر الأسئلة التي يطرحها المرضى.",
      en: "Quick answers to the questions patients ask most often.",
    },
    duration: "02:05",
    thumbnail: THUMBS[0],
  },
  {
    title: { ar: "دور الفريق الطبي متعدد التخصصات", en: "The Role of the Multidisciplinary Team" },
    description: {
      ar: "كيف يتعاون فريق الأورام لوضع أفضل خطة علاجية.",
      en: "How the oncology team collaborates to build the best treatment plan.",
    },
    duration: "03:11",
    thumbnail: THUMBS[1],
  },
  {
    title: { ar: "الحياة بعد التعافي الكامل", en: "Life After Full Recovery" },
    description: {
      ar: "قصص أمل ونصائح للعودة إلى الحياة الطبيعية بثقة.",
      en: "Stories of hope and guidance for confidently returning to normal life.",
    },
    duration: "02:29",
    thumbnail: THUMBS[2],
  },
];

export default function VideoLibraryGrid() {
  const { lang } = useLanguage();
  const [selected, setSelected] = useState<number | null>(null);

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
            <Clapperboard className="h-4 w-4" />
            {pick(lang, { ar: "مكتبة الفيديوهات الطبية", en: "Medical Video Library" })}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
            {pick(lang, { ar: "محتوى توعوي يستحق المشاهدة", en: "Educational Content Worth Watching" })}
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">
            {pick(lang, {
              ar: "شروحات جراحية ونصائح للمرضى في فيديوهات قصيرة وواضحة.",
              en: "Surgical explanations and patient advice in short, clear videos.",
            })}
          </p>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((video, index) => (
            <motion.button
              key={`${video.title.en}-${index}`}
              type="button"
              onClick={() => setSelected(index)}
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="glass-card group cursor-pointer overflow-hidden text-start"
            >
              <div className="relative aspect-[9/16] w-full">
                <Image
                  src={video.thumbnail}
                  alt={pick(lang, video.title)}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-deep-950/20 transition-colors duration-300 group-hover:bg-deep-950/35" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-lg shadow-glow-brand transition-transform duration-300 group-hover:scale-110">
                    <Play className="ms-1 h-6 w-6 text-white" fill="white" />
                  </span>
                </div>
                <span className="absolute bottom-3 end-3 rounded-full bg-black/50 px-2.5 py-1 font-english text-[11px] font-bold text-white backdrop-blur-sm">
                  {video.duration}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-extrabold text-ink">{pick(lang, video.title)}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/60">
                  {pick(lang, video.description)}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <VideoModal video={videos[selected]} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

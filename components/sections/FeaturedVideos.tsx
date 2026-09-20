"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Clapperboard, Play } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import type { Video } from "@/lib/supabase/types";

export interface FeaturedVideosProps {
  videos: Video[];
}

export default function FeaturedVideos({ videos }: FeaturedVideosProps) {
  const { lang } = useLanguage();
  const ArrowIcon = lang === "ar" ? ArrowLeft : ArrowRight;

  if (videos.length === 0) return null;

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
            {pick(lang, { ar: "فيديوهات مختارة", en: "Featured Videos" })}
          </span>
          <h2 className="mt-5 text-2xl font-extrabold text-ink sm:text-3xl lg:text-4xl">
            {pick(lang, { ar: "محتوى توعوي مرئي", en: "Educational Video Content" })}
          </h2>
        </motion.div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="glass-card group cursor-pointer overflow-hidden"
            >
              <div className="relative aspect-[4/5] w-full">
                {video.thumbnail_url && (
                  <Image
                    src={video.thumbnail_url}
                    alt={pick(lang, { ar: video.title_ar, en: video.title_en })}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-deep-950/25 transition-colors group-hover:bg-deep-950/40">
                  <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-lg shadow-glow-brand transition-transform duration-300 group-hover:scale-110">
                    <Play className="ms-0.5 h-5 w-5 text-white" fill="white" />
                  </span>
                </div>
                <span className="absolute bottom-3 end-3 rounded-full bg-black/50 px-2.5 py-1 font-english text-[11px] font-bold text-white backdrop-blur-sm">
                  {video.duration}
                </span>
              </div>
              <div className="p-4">
                <p className="text-sm font-bold text-ink">{pick(lang, { ar: video.title_ar, en: video.title_en })}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/videos" className="btn-outline-glass">
            {pick(lang, { ar: "مشاهدة كل الفيديوهات", en: "Watch All Videos" })}
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { Clapperboard, Play } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { pick } from "@/lib/i18n";
import type { Video } from "@/lib/supabase/types";

// Only needed once a card is clicked, so it's split into its own chunk
// instead of shipping in the initial page bundle for every visitor.
const VideoPopup = dynamic(() => import("@/components/VideoPopup"), { ssr: false });

export interface VideoLibraryGridProps {
  videos: Video[];
}

export default function VideoLibraryGrid({ videos }: VideoLibraryGridProps) {
  const { lang } = useLanguage();
  const [selected, setSelected] = useState<number | null>(null);

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
              key={video.id}
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
                {video.thumbnail_url && (
                  <Image
                    src={video.thumbnail_url}
                    alt={pick(lang, { ar: video.title_ar, en: video.title_en })}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                )}
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
                <h3 className="font-extrabold text-ink">{pick(lang, { ar: video.title_ar, en: video.title_en })}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink/60">
                  {pick(lang, { ar: video.description_ar, en: video.description_en })}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected !== null && (
          <VideoPopup
            src={videos[selected].video_url}
            poster={videos[selected].thumbnail_url}
            title={pick(lang, { ar: videos[selected].title_ar, en: videos[selected].title_en })}
            description={pick(lang, { ar: videos[selected].description_ar, en: videos[selected].description_en })}
            onClose={() => setSelected(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

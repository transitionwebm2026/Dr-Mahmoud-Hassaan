"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Pencil, PlayCircle } from "lucide-react";
import { DeleteButton } from "@/components/admin/ui/DeleteButton";
import { deleteVideo } from "@/app/admin/(protected)/videos/actions";
import type { Video } from "@/lib/supabase/types";
import VideoForm from "./VideoForm";

export default function VideoManager({ videos }: { videos: Video[] }) {
  const [panel, setPanel] = useState<"closed" | "new" | Video>("closed");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink/60">{videos.length} videos.</p>
        {panel === "closed" && (
          <button type="button" onClick={() => setPanel("new")} className="btn-outline-glass !py-2 !px-4 text-xs">
            <Plus className="h-3.5 w-3.5" />
            Add Video
          </button>
        )}
      </div>

      {panel === "new" && <VideoForm onDone={() => setPanel("closed")} />}
      {panel !== "closed" && panel !== "new" && <VideoForm video={panel} onDone={() => setPanel("closed")} />}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.length === 0 && (
          <p className="glass-card col-span-full p-8 text-center text-sm text-ink/50">
            No videos yet. Add your first one above.
          </p>
        )}
        {videos.map((video) => (
          <div key={video.id} className="glass-card overflow-hidden">
            <div className="relative flex aspect-video items-center justify-center bg-ink/10">
              {video.thumbnail_url ? (
                <Image
                  src={video.thumbnail_url}
                  alt={video.title_en}
                  fill
                  sizes="360px"
                  className="object-cover"
                  unoptimized
                />
              ) : (
                <PlayCircle className="h-10 w-10 text-ink/30" />
              )}
              {!video.is_published && (
                <span className="absolute end-2 top-2 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-bold text-white">
                  Draft
                </span>
              )}
            </div>
            <div className="p-4">
              <p className="mb-0.5 text-xs font-bold uppercase tracking-wide text-brand">{video.category_en}</p>
              <p className="truncate font-bold text-ink">{video.title_en}</p>
              <p dir="rtl" className="truncate text-sm text-ink/60">
                {video.title_ar}
              </p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPanel(video)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-brand/30 bg-brand/5 px-3 py-1.5 text-xs font-semibold text-brand-700 transition hover:bg-brand/10"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </button>
                <DeleteButton action={() => deleteVideo(video.id)} confirmMessage={`Delete "${video.title_en}"?`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

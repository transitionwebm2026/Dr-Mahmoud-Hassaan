"use client";

import { useActionState, useState } from "react";
import { X } from "lucide-react";
import { FieldLabel, TextArea, TextInput, ToggleSwitch, SubmitButton } from "@/components/admin/ui/FormControls";
import { MediaUploadField } from "@/components/admin/ui/MediaUploadField";
import { useActionFeedback } from "@/components/admin/ui/useActionFeedback";
import { createVideo, updateVideo, type VideoActionState } from "@/app/admin/(protected)/videos/actions";
import type { Video } from "@/lib/supabase/types";

export default function VideoForm({ video, onDone }: { video?: Video; onDone: () => void }) {
  const action = video ? updateVideo.bind(null, video.id) : createVideo;
  const [state, formAction, isPending] = useActionState<VideoActionState, FormData>(action, undefined);
  const [isPublished, setIsPublished] = useState(video?.is_published ?? true);

  useActionFeedback(state, isPending, video ? "Video updated." : "Video added.", onDone);

  return (
    <form action={formAction} className="glass-card space-y-5 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-extrabold text-ink">{video ? "Edit Video" : "Add New Video"}</h3>
        <button type="button" onClick={onDone} className="text-ink/40 hover:text-ink">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="title_ar" required>
            Title (Arabic)
          </FieldLabel>
          <TextInput id="title_ar" name="title_ar" dir="rtl" defaultValue={video?.title_ar} required />
        </div>
        <div>
          <FieldLabel htmlFor="title_en" required>
            Title (English)
          </FieldLabel>
          <TextInput id="title_en" name="title_en" defaultValue={video?.title_en} required />
        </div>
        <div>
          <FieldLabel htmlFor="description_ar">Description (Arabic)</FieldLabel>
          <TextArea id="description_ar" name="description_ar" dir="rtl" defaultValue={video?.description_ar} />
        </div>
        <div>
          <FieldLabel htmlFor="description_en">Description (English)</FieldLabel>
          <TextArea id="description_en" name="description_en" defaultValue={video?.description_en} />
        </div>
        <div>
          <FieldLabel htmlFor="category_ar">Category (Arabic)</FieldLabel>
          <TextInput id="category_ar" name="category_ar" dir="rtl" defaultValue={video?.category_ar} />
        </div>
        <div>
          <FieldLabel htmlFor="category_en">Category (English)</FieldLabel>
          <TextInput id="category_en" name="category_en" defaultValue={video?.category_en} />
        </div>
        <div>
          <MediaUploadField name="thumbnail_url" label="Thumbnail Image" kind="image" defaultValue={video?.thumbnail_url} />
        </div>
        <div>
          <MediaUploadField name="video_url" label="Video File" kind="video" defaultValue={video?.video_url} required />
        </div>
        <div>
          <FieldLabel htmlFor="duration">Duration Badge</FieldLabel>
          <TextInput id="duration" name="duration" placeholder="e.g. 02:14" defaultValue={video?.duration} />
        </div>
        <div>
          <FieldLabel htmlFor="order_index">Display Order</FieldLabel>
          <TextInput id="order_index" name="order_index" type="number" defaultValue={video?.order_index ?? 0} />
        </div>
        <div className="flex items-end pb-1">
          <ToggleSwitch checked={isPublished} onChange={setIsPublished} label="Published" name="is_published" />
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-ink/10 pt-4">
        <button type="button" onClick={onDone} className="btn-outline-glass !py-2.5 !px-6 text-sm">
          Cancel
        </button>
        <SubmitButton>{video ? "Save Changes" : "Add Video"}</SubmitButton>
      </div>
    </form>
  );
}

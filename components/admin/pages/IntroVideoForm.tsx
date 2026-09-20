"use client";

import { useActionState } from "react";
import { FieldLabel, TextArea, SubmitButton } from "@/components/admin/ui/FormControls";
import { MediaUploadField } from "@/components/admin/ui/MediaUploadField";
import { useActionFeedback } from "@/components/admin/ui/useActionFeedback";
import { saveHomeIntroVideo, type CrudActionState } from "@/app/admin/(protected)/pages/actions";
import type { DoctorProfile } from "@/lib/supabase/types";

export default function IntroVideoForm({ profile }: { profile: DoctorProfile }) {
  const action = saveHomeIntroVideo.bind(null, profile.id);
  const [state, formAction, isPending] = useActionState<CrudActionState, FormData>(action, undefined);
  useActionFeedback(state, isPending, "Intro video saved.");

  return (
    <form action={formAction} className="glass-card space-y-4 p-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <MediaUploadField name="intro_video_url" label="Intro Video" kind="video" defaultValue={profile.intro_video_url} />
        </div>
        <div>
          <FieldLabel htmlFor="intro_highlights_ar">Highlights (Arabic) — one per line</FieldLabel>
          <TextArea id="intro_highlights_ar" name="intro_highlights_ar" dir="rtl" rows={4} defaultValue={profile.intro_highlights_ar} />
        </div>
        <div>
          <FieldLabel htmlFor="intro_highlights_en">Highlights (English) — one per line</FieldLabel>
          <TextArea id="intro_highlights_en" name="intro_highlights_en" rows={4} defaultValue={profile.intro_highlights_en} />
        </div>
      </div>
      <div className="flex justify-end border-t border-ink/10 pt-3">
        <SubmitButton className="!py-2 !px-5 text-xs">Save</SubmitButton>
      </div>
    </form>
  );
}

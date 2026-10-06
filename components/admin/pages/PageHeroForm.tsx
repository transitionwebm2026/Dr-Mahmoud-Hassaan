"use client";

import { useActionState } from "react";
import { FieldLabel, TextArea, TextInput, SubmitButton, FormActions } from "@/components/admin/ui/FormControls";
import { MediaUploadField } from "@/components/admin/ui/MediaUploadField";
import { useActionFeedback } from "@/components/admin/ui/useActionFeedback";
import { updatePageHero, type CrudActionState } from "@/app/admin/(protected)/pages/actions";
import type { PageHero } from "@/lib/supabase/types";

export default function PageHeroForm({ hero }: { hero: PageHero }) {
  const action = updatePageHero.bind(null, hero.id, hero.page_slug);
  const [state, formAction, isPending] = useActionState<CrudActionState, FormData>(action, undefined);

  useActionFeedback(state, isPending, "Hero section saved.");

  return (
    <form key={hero.id} action={formAction} className="glass-card space-y-5 p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="title_ar">Title (Arabic)</FieldLabel>
          <TextInput id="title_ar" name="title_ar" dir="rtl" defaultValue={hero.title_ar} />
        </div>
        <div>
          <FieldLabel htmlFor="title_en">Title (English)</FieldLabel>
          <TextInput id="title_en" name="title_en" defaultValue={hero.title_en} />
        </div>
        <div>
          <FieldLabel htmlFor="subtitle_ar">Subtitle (Arabic)</FieldLabel>
          <TextInput id="subtitle_ar" name="subtitle_ar" dir="rtl" defaultValue={hero.subtitle_ar} />
        </div>
        <div>
          <FieldLabel htmlFor="subtitle_en">Subtitle (English)</FieldLabel>
          <TextInput id="subtitle_en" name="subtitle_en" defaultValue={hero.subtitle_en} />
        </div>
        <div>
          <FieldLabel htmlFor="description_ar">Description (Arabic)</FieldLabel>
          <TextArea id="description_ar" name="description_ar" dir="rtl" rows={2} defaultValue={hero.description_ar} />
        </div>
        <div>
          <FieldLabel htmlFor="description_en">Description (English)</FieldLabel>
          <TextArea id="description_en" name="description_en" rows={2} defaultValue={hero.description_en} />
        </div>
        <div className="sm:col-span-2">
          <MediaUploadField name="background_image_url" label="Background Image" kind="image" defaultValue={hero.background_image_url} />
        </div>
        <div>
          <FieldLabel htmlFor="cta_primary_text_ar">Primary CTA Text (Arabic)</FieldLabel>
          <TextInput id="cta_primary_text_ar" name="cta_primary_text_ar" dir="rtl" defaultValue={hero.cta_primary_text_ar ?? ""} />
        </div>
        <div>
          <FieldLabel htmlFor="cta_primary_text_en">Primary CTA Text (English)</FieldLabel>
          <TextInput id="cta_primary_text_en" name="cta_primary_text_en" defaultValue={hero.cta_primary_text_en ?? ""} />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel htmlFor="cta_primary_link">Primary CTA Link</FieldLabel>
          <TextInput id="cta_primary_link" name="cta_primary_link" defaultValue={hero.cta_primary_link ?? ""} />
        </div>
        <div>
          <FieldLabel htmlFor="cta_secondary_text_ar">Secondary CTA Text (Arabic)</FieldLabel>
          <TextInput id="cta_secondary_text_ar" name="cta_secondary_text_ar" dir="rtl" defaultValue={hero.cta_secondary_text_ar ?? ""} />
        </div>
        <div>
          <FieldLabel htmlFor="cta_secondary_text_en">Secondary CTA Text (English)</FieldLabel>
          <TextInput id="cta_secondary_text_en" name="cta_secondary_text_en" defaultValue={hero.cta_secondary_text_en ?? ""} />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel htmlFor="cta_secondary_link">Secondary CTA Link</FieldLabel>
          <TextInput id="cta_secondary_link" name="cta_secondary_link" defaultValue={hero.cta_secondary_link ?? ""} />
        </div>
      </div>

      <FormActions>
        <SubmitButton>Save Hero Section</SubmitButton>
      </FormActions>
    </form>
  );
}

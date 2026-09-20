"use client";

import { useActionState } from "react";
import { FieldLabel, TextArea, TextInput, SubmitButton } from "@/components/admin/ui/FormControls";
import { MediaUploadField } from "@/components/admin/ui/MediaUploadField";
import { useActionFeedback } from "@/components/admin/ui/useActionFeedback";
import { saveDoctorProfile, type DoctorProfileActionState } from "@/app/admin/(protected)/doctor-profile/actions";
import type { DoctorProfile } from "@/lib/supabase/types";

export default function DoctorProfileForm({ profile }: { profile: DoctorProfile | null }) {
  const action = saveDoctorProfile.bind(null, profile?.id);
  const [state, formAction, isPending] = useActionState<DoctorProfileActionState, FormData>(action, undefined);

  useActionFeedback(state, isPending, "Doctor profile saved.");

  return (
    <form action={formAction} className="glass-card space-y-5 p-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="name_ar" required>
            Name (Arabic)
          </FieldLabel>
          <TextInput id="name_ar" name="name_ar" dir="rtl" defaultValue={profile?.name_ar} required />
        </div>
        <div>
          <FieldLabel htmlFor="name_en" required>
            Name (English)
          </FieldLabel>
          <TextInput id="name_en" name="name_en" defaultValue={profile?.name_en} required />
        </div>

        <div>
          <FieldLabel htmlFor="short_title_ar">Short Title (Arabic)</FieldLabel>
          <TextInput id="short_title_ar" name="short_title_ar" dir="rtl" defaultValue={profile?.short_title_ar} />
        </div>
        <div>
          <FieldLabel htmlFor="short_title_en">Short Title (English)</FieldLabel>
          <TextInput id="short_title_en" name="short_title_en" defaultValue={profile?.short_title_en} />
        </div>

        <div className="sm:col-span-2">
          <FieldLabel htmlFor="title_ar">Full Title / Credentials (Arabic)</FieldLabel>
          <TextArea id="title_ar" name="title_ar" dir="rtl" rows={2} defaultValue={profile?.title_ar} />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel htmlFor="title_en">Full Title / Credentials (English)</FieldLabel>
          <TextArea id="title_en" name="title_en" rows={2} defaultValue={profile?.title_en} />
        </div>

        <div className="sm:col-span-2">
          <FieldLabel htmlFor="bio_ar">Biography (Arabic)</FieldLabel>
          <TextArea id="bio_ar" name="bio_ar" dir="rtl" rows={6} defaultValue={profile?.bio_ar} />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel htmlFor="bio_en">Biography (English)</FieldLabel>
          <TextArea id="bio_en" name="bio_en" rows={6} defaultValue={profile?.bio_en} />
        </div>

        <div className="sm:col-span-2">
          <FieldLabel htmlFor="message_ar">About Page — Message From the Doctor (Arabic)</FieldLabel>
          <TextArea
            id="message_ar"
            name="message_ar"
            dir="rtl"
            rows={6}
            placeholder="Separate paragraphs with a blank line"
            defaultValue={profile?.message_ar}
          />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel htmlFor="message_en">About Page — Message From the Doctor (English)</FieldLabel>
          <TextArea
            id="message_en"
            name="message_en"
            rows={6}
            placeholder="Separate paragraphs with a blank line"
            defaultValue={profile?.message_en}
          />
        </div>

        <div>
          <FieldLabel htmlFor="years_experience">Years of Experience</FieldLabel>
          <TextInput id="years_experience" name="years_experience" type="number" defaultValue={profile?.years_experience ?? 0} />
        </div>
        <div>
          <FieldLabel htmlFor="successful_operations">Successful Operations</FieldLabel>
          <TextInput
            id="successful_operations"
            name="successful_operations"
            type="number"
            defaultValue={profile?.successful_operations ?? 0}
          />
        </div>
        <div>
          <FieldLabel htmlFor="cured_patients">Cured Patients</FieldLabel>
          <TextInput id="cured_patients" name="cured_patients" type="number" defaultValue={profile?.cured_patients ?? 0} />
        </div>

        <div className="sm:col-span-2">
          <MediaUploadField name="main_image_url" label="Main Photo" kind="image" defaultValue={profile?.main_image_url} />
        </div>
      </div>

      <div className="flex justify-end border-t border-ink/10 pt-4">
        <SubmitButton>Save Profile</SubmitButton>
      </div>
    </form>
  );
}

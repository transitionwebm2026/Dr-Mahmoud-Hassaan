"use client";

import { useActionState } from "react";
import { FieldLabel, TextArea, TextInput, SubmitButton } from "@/components/admin/ui/FormControls";
import { useActionFeedback } from "@/components/admin/ui/useActionFeedback";
import { saveClinicSettings, type ClinicSettingsActionState } from "@/app/admin/(protected)/settings/actions";
import type { ClinicSettings } from "@/lib/supabase/types";

export default function ClinicSettingsForm({ settings }: { settings: ClinicSettings | null }) {
  const action = saveClinicSettings.bind(null, settings?.id);
  const [state, formAction, isPending] = useActionState<ClinicSettingsActionState, FormData>(action, undefined);

  useActionFeedback(state, isPending, "Clinic settings saved.");

  return (
    <form action={formAction} className="space-y-6">
      <div className="glass-card space-y-4 p-6">
        <h3 className="text-base font-extrabold text-ink">Location & Hours</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="address_ar">Address (Arabic)</FieldLabel>
            <TextArea id="address_ar" name="address_ar" dir="rtl" rows={2} defaultValue={settings?.address_ar} />
          </div>
          <div>
            <FieldLabel htmlFor="address_en">Address (English)</FieldLabel>
            <TextArea id="address_en" name="address_en" rows={2} defaultValue={settings?.address_en} />
          </div>
          <div>
            <FieldLabel htmlFor="working_hours_ar">Working Hours (Arabic)</FieldLabel>
            <TextArea
              id="working_hours_ar"
              name="working_hours_ar"
              dir="rtl"
              rows={2}
              placeholder={"السبت – الخميس: 5 م – 9 م\nالجمعة: مغلق"}
              defaultValue={settings?.working_hours_ar ?? ""}
            />
          </div>
          <div>
            <FieldLabel htmlFor="working_hours_en">Working Hours (English)</FieldLabel>
            <TextArea
              id="working_hours_en"
              name="working_hours_en"
              rows={2}
              placeholder={"Saturday – Thursday: 5 PM – 9 PM\nFriday: Closed"}
              defaultValue={settings?.working_hours_en ?? ""}
            />
          </div>
          <div className="sm:col-span-2">
            <FieldLabel htmlFor="map_embed_url">Google Maps Embed URL</FieldLabel>
            <TextInput id="map_embed_url" name="map_embed_url" type="url" defaultValue={settings?.map_embed_url ?? ""} />
          </div>
        </div>
      </div>

      <div className="glass-card space-y-4 p-6">
        <h3 className="text-base font-extrabold text-ink">Email</h3>
        <div>
          <FieldLabel htmlFor="email">Contact Email</FieldLabel>
          <TextInput id="email" name="email" type="email" defaultValue={settings?.email ?? ""} />
        </div>
      </div>

      <div className="glass-card space-y-4 p-6">
        <h3 className="text-base font-extrabold text-ink">Social & Messaging Links</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="whatsapp_number">WhatsApp Number</FieldLabel>
            <TextInput id="whatsapp_number" name="whatsapp_number" placeholder="201001234567" defaultValue={settings?.whatsapp_number ?? ""} />
          </div>
          <div>
            <FieldLabel htmlFor="facebook_url">Facebook URL</FieldLabel>
            <TextInput id="facebook_url" name="facebook_url" type="url" defaultValue={settings?.facebook_url ?? ""} />
          </div>
          <div>
            <FieldLabel htmlFor="instagram_url">Instagram URL</FieldLabel>
            <TextInput id="instagram_url" name="instagram_url" type="url" defaultValue={settings?.instagram_url ?? ""} />
          </div>
          <div>
            <FieldLabel htmlFor="tiktok_url">TikTok URL</FieldLabel>
            <TextInput id="tiktok_url" name="tiktok_url" type="url" defaultValue={settings?.tiktok_url ?? ""} />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <SubmitButton>Save Settings</SubmitButton>
      </div>
    </form>
  );
}

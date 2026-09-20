"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ClinicSettingsActionState = { error?: string } | undefined;

export async function saveClinicSettings(
  id: string | undefined,
  _prevState: ClinicSettingsActionState,
  formData: FormData
): Promise<ClinicSettingsActionState> {
  const field = (name: string) => String(formData.get(name) ?? "").trim() || null;

  const payload = {
    address_ar: String(formData.get("address_ar") ?? "").trim(),
    address_en: String(formData.get("address_en") ?? "").trim(),
    phone_primary: field("phone_primary"),
    phone_secondary: field("phone_secondary"),
    emergency_line: field("emergency_line"),
    working_hours_ar: field("working_hours_ar"),
    working_hours_en: field("working_hours_en"),
    map_embed_url: field("map_embed_url"),
    facebook_url: field("facebook_url"),
    instagram_url: field("instagram_url"),
    tiktok_url: field("tiktok_url"),
    whatsapp_number: field("whatsapp_number"),
  };

  const supabase = await createClient();
  const { error } = id
    ? await supabase.from("clinic_settings").update(payload).eq("id", id)
    : await supabase.from("clinic_settings").insert(payload);

  if (error) return { error: error.message };

  revalidatePath("/admin/pages/contact");
  revalidatePath("/");
  revalidatePath("/contact");
  return undefined;
}

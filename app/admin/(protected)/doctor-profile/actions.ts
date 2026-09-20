"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type DoctorProfileActionState = { error?: string } | undefined;

export async function saveDoctorProfile(
  id: string | undefined,
  _prevState: DoctorProfileActionState,
  formData: FormData
): Promise<DoctorProfileActionState> {
  const payload = {
    name_ar: String(formData.get("name_ar") ?? "").trim(),
    name_en: String(formData.get("name_en") ?? "").trim(),
    title_ar: String(formData.get("title_ar") ?? "").trim(),
    title_en: String(formData.get("title_en") ?? "").trim(),
    short_title_ar: String(formData.get("short_title_ar") ?? "").trim(),
    short_title_en: String(formData.get("short_title_en") ?? "").trim(),
    bio_ar: String(formData.get("bio_ar") ?? "").trim(),
    bio_en: String(formData.get("bio_en") ?? "").trim(),
    message_ar: String(formData.get("message_ar") ?? "").trim(),
    message_en: String(formData.get("message_en") ?? "").trim(),
    message_image_url: String(formData.get("message_image_url") ?? "").trim() || null,
    years_experience: Number(formData.get("years_experience") ?? 0),
    successful_operations: Number(formData.get("successful_operations") ?? 0),
    cured_patients: Number(formData.get("cured_patients") ?? 0),
    main_image_url: String(formData.get("main_image_url") ?? "").trim() || null,
  };

  if (!payload.name_ar || !payload.name_en) {
    return { error: "Name (Arabic and English) is required." };
  }

  const supabase = await createClient();
  const { error } = id
    ? await supabase.from("doctor_profile").update(payload).eq("id", id)
    : await supabase.from("doctor_profile").insert(payload);

  if (error) return { error: error.message };

  revalidatePath("/admin/pages/home");
  revalidatePath("/admin/pages/about");
  revalidatePath("/");
  revalidatePath("/about");
  return undefined;
}

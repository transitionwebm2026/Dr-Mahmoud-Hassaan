"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type CrudActionState = { error?: string } | undefined;

function revalidateServicePaths() {
  revalidatePath("/admin/pages/home");
  revalidatePath("/admin/pages/about");
  revalidatePath("/admin/pages/services");
  revalidatePath("/services");
  revalidatePath("/");
}

// ---------------------------------------------------------------------------
// Surgeries & Services
// ---------------------------------------------------------------------------
function readSurgeryInput(formData: FormData) {
  const title_ar = String(formData.get("title_ar") ?? "").trim();
  const title_en = String(formData.get("title_en") ?? "").trim();
  const specialty_category_ar = String(formData.get("specialty_category_ar") ?? "").trim();
  const specialty_category_en = String(formData.get("specialty_category_en") ?? "").trim();
  const short_description_ar = String(formData.get("short_description_ar") ?? "").trim();
  const short_description_en = String(formData.get("short_description_en") ?? "").trim();
  const detailed_breakdown_ar = String(formData.get("detailed_breakdown_ar") ?? "").trim();
  const detailed_breakdown_en = String(formData.get("detailed_breakdown_en") ?? "").trim();
  const image_url = String(formData.get("image_url") ?? "").trim() || null;
  const order_index = Number(formData.get("order_index") ?? 0);
  const is_published = formData.get("is_published") === "on";

  if (!title_ar || !title_en) return { error: "Title (AR/EN) is required." } as const;

  return {
    data: {
      title_ar,
      title_en,
      specialty_category_ar,
      specialty_category_en,
      short_description_ar,
      short_description_en,
      detailed_breakdown_ar,
      detailed_breakdown_en,
      image_url,
      order_index,
      is_published,
    },
  } as const;
}

export async function createSurgery(_prevState: CrudActionState, formData: FormData): Promise<CrudActionState> {
  const parsed = readSurgeryInput(formData);
  if ("error" in parsed) return { error: parsed.error };
  const supabase = await createClient();
  const { error } = await supabase.from("surgeries_services").insert(parsed.data);
  if (error) return { error: error.message };
  revalidateServicePaths();
  return undefined;
}

export async function updateSurgery(
  id: string,
  _prevState: CrudActionState,
  formData: FormData
): Promise<CrudActionState> {
  const parsed = readSurgeryInput(formData);
  if ("error" in parsed) return { error: parsed.error };
  const supabase = await createClient();
  const { error } = await supabase.from("surgeries_services").update(parsed.data).eq("id", id);
  if (error) return { error: error.message };
  revalidateServicePaths();
  return undefined;
}

export async function deleteSurgery(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("surgeries_services").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidateServicePaths();
  return {};
}

// ---------------------------------------------------------------------------
// Treatments
// ---------------------------------------------------------------------------
function readTreatmentInput(formData: FormData) {
  const disease_name_ar = String(formData.get("disease_name_ar") ?? "").trim();
  const disease_name_en = String(formData.get("disease_name_en") ?? "").trim();
  const treatment_overview_ar = String(formData.get("treatment_overview_ar") ?? "").trim();
  const treatment_overview_en = String(formData.get("treatment_overview_en") ?? "").trim();
  const details_ar = String(formData.get("details_ar") ?? "").trim();
  const details_en = String(formData.get("details_en") ?? "").trim();
  const image_url = String(formData.get("image_url") ?? "").trim() || null;
  const order_index = Number(formData.get("order_index") ?? 0);
  const is_published = formData.get("is_published") === "on";

  if (!disease_name_ar || !disease_name_en) return { error: "Disease name (AR/EN) is required." } as const;

  return {
    data: {
      disease_name_ar,
      disease_name_en,
      treatment_overview_ar,
      treatment_overview_en,
      details_ar,
      details_en,
      image_url,
      order_index,
      is_published,
    },
  } as const;
}

export async function createTreatment(_prevState: CrudActionState, formData: FormData): Promise<CrudActionState> {
  const parsed = readTreatmentInput(formData);
  if ("error" in parsed) return { error: parsed.error };
  const supabase = await createClient();
  const { error } = await supabase.from("treatments").insert(parsed.data);
  if (error) return { error: error.message };
  revalidateServicePaths();
  return undefined;
}

export async function updateTreatment(
  id: string,
  _prevState: CrudActionState,
  formData: FormData
): Promise<CrudActionState> {
  const parsed = readTreatmentInput(formData);
  if ("error" in parsed) return { error: parsed.error };
  const supabase = await createClient();
  const { error } = await supabase.from("treatments").update(parsed.data).eq("id", id);
  if (error) return { error: error.message };
  revalidateServicePaths();
  return undefined;
}

export async function deleteTreatment(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("treatments").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidateServicePaths();
  return {};
}

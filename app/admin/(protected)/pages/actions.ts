"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type CrudActionState = { error?: string } | undefined;

function revalidatePagePaths(slug?: string) {
  revalidatePath("/");
  if (slug) {
    revalidatePath(`/admin/pages/${slug}`);
    if (slug !== "home") revalidatePath(`/${slug}`);
  }
}

// ---------------------------------------------------------------------------
// Page Hero sections
// ---------------------------------------------------------------------------
export async function updatePageHero(
  id: string,
  slug: string,
  _prevState: CrudActionState,
  formData: FormData
): Promise<CrudActionState> {
  const payload = {
    title_ar: String(formData.get("title_ar") ?? "").trim(),
    title_en: String(formData.get("title_en") ?? "").trim(),
    subtitle_ar: String(formData.get("subtitle_ar") ?? "").trim(),
    subtitle_en: String(formData.get("subtitle_en") ?? "").trim(),
    description_ar: String(formData.get("description_ar") ?? "").trim(),
    description_en: String(formData.get("description_en") ?? "").trim(),
    background_image_url: String(formData.get("background_image_url") ?? "").trim() || null,
    cta_primary_text_ar: String(formData.get("cta_primary_text_ar") ?? "").trim() || null,
    cta_primary_text_en: String(formData.get("cta_primary_text_en") ?? "").trim() || null,
    cta_primary_link: String(formData.get("cta_primary_link") ?? "").trim() || null,
    cta_secondary_text_ar: String(formData.get("cta_secondary_text_ar") ?? "").trim() || null,
    cta_secondary_text_en: String(formData.get("cta_secondary_text_en") ?? "").trim() || null,
    cta_secondary_link: String(formData.get("cta_secondary_link") ?? "").trim() || null,
    footer_cta_title_ar: String(formData.get("footer_cta_title_ar") ?? "").trim() || null,
    footer_cta_title_en: String(formData.get("footer_cta_title_en") ?? "").trim() || null,
    footer_cta_subtitle_ar: String(formData.get("footer_cta_subtitle_ar") ?? "").trim() || null,
    footer_cta_subtitle_en: String(formData.get("footer_cta_subtitle_en") ?? "").trim() || null,
  };

  const supabase = await createClient();
  const { error } = await supabase.from("pages_hero").update(payload).eq("id", id);
  if (error) return { error: error.message };

  revalidatePagePaths(slug);
  return undefined;
}

// ---------------------------------------------------------------------------
// Home — Doctor Intro Video & highlights (doctor_profile columns only —
// scoped so saving this small form never touches the rest of the profile).
// ---------------------------------------------------------------------------
export async function saveHomeIntroVideo(
  profileId: string,
  _prevState: CrudActionState,
  formData: FormData
): Promise<CrudActionState> {
  const payload = {
    intro_video_url: String(formData.get("intro_video_url") ?? "").trim() || null,
    intro_highlights_ar: String(formData.get("intro_highlights_ar") ?? "").trim(),
    intro_highlights_en: String(formData.get("intro_highlights_en") ?? "").trim(),
  };

  const supabase = await createClient();
  const { error } = await supabase.from("doctor_profile").update(payload).eq("id", profileId);
  if (error) return { error: error.message };

  revalidatePagePaths("home");
  revalidatePagePaths("about");
  return undefined;
}

// ---------------------------------------------------------------------------
// About — Message From the Doctor (doctor_profile columns only).
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// Why Choose The Doctor — feature points
// ---------------------------------------------------------------------------
function readWhyDoctorInput(formData: FormData) {
  const title_ar = String(formData.get("title_ar") ?? "").trim();
  const title_en = String(formData.get("title_en") ?? "").trim();
  const description_ar = String(formData.get("description_ar") ?? "").trim();
  const description_en = String(formData.get("description_en") ?? "").trim();
  const icon_tag = String(formData.get("icon_tag") ?? "").trim();
  const order_index = Number(formData.get("order_index") ?? 0);

  if (!title_ar || !title_en) return { error: "Title (AR/EN) is required." } as const;

  return { data: { title_ar, title_en, description_ar, description_en, icon_tag, order_index } } as const;
}

export async function createWhyDoctorPoint(_prevState: CrudActionState, formData: FormData): Promise<CrudActionState> {
  const parsed = readWhyDoctorInput(formData);
  if ("error" in parsed) return { error: parsed.error };
  const supabase = await createClient();
  const { error } = await supabase.from("why_doctor").insert(parsed.data);
  if (error) return { error: error.message };
  revalidatePagePaths("home");
  return undefined;
}

export async function updateWhyDoctorPoint(
  id: string,
  _prevState: CrudActionState,
  formData: FormData
): Promise<CrudActionState> {
  const parsed = readWhyDoctorInput(formData);
  if ("error" in parsed) return { error: parsed.error };
  const supabase = await createClient();
  const { error } = await supabase.from("why_doctor").update(parsed.data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePagePaths("home");
  return undefined;
}

export async function deleteWhyDoctorPoint(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("why_doctor").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePagePaths("home");
  return {};
}

// ---------------------------------------------------------------------------
// Patient Journey — numbered steps
// ---------------------------------------------------------------------------
function readPatientJourneyInput(formData: FormData) {
  const step_number = Number(formData.get("step_number") ?? 1);
  const title_ar = String(formData.get("title_ar") ?? "").trim();
  const title_en = String(formData.get("title_en") ?? "").trim();
  const description_ar = String(formData.get("description_ar") ?? "").trim();
  const description_en = String(formData.get("description_en") ?? "").trim();
  const icon_url = String(formData.get("icon_url") ?? "").trim() || null;
  const order_index = Number(formData.get("order_index") ?? 0);

  if (!title_ar || !title_en) return { error: "Title (AR/EN) is required." } as const;

  return {
    data: { step_number, title_ar, title_en, description_ar, description_en, icon_url, order_index },
  } as const;
}

export async function createPatientJourneyStep(
  _prevState: CrudActionState,
  formData: FormData
): Promise<CrudActionState> {
  const parsed = readPatientJourneyInput(formData);
  if ("error" in parsed) return { error: parsed.error };
  const supabase = await createClient();
  const { error } = await supabase.from("patient_journey").insert(parsed.data);
  if (error) return { error: error.message };
  revalidatePagePaths("home");
  return undefined;
}

export async function updatePatientJourneyStep(
  id: string,
  _prevState: CrudActionState,
  formData: FormData
): Promise<CrudActionState> {
  const parsed = readPatientJourneyInput(formData);
  if ("error" in parsed) return { error: parsed.error };
  const supabase = await createClient();
  const { error } = await supabase.from("patient_journey").update(parsed.data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePagePaths("home");
  return undefined;
}

export async function deletePatientJourneyStep(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("patient_journey").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePagePaths("home");
  return {};
}

// ---------------------------------------------------------------------------
// Career Milestones — About page
// ---------------------------------------------------------------------------
function readCareerMilestoneInput(formData: FormData) {
  const year = String(formData.get("year") ?? "").trim();
  const title_ar = String(formData.get("title_ar") ?? "").trim();
  const title_en = String(formData.get("title_en") ?? "").trim();
  const description_ar = String(formData.get("description_ar") ?? "").trim();
  const description_en = String(formData.get("description_en") ?? "").trim();
  const icon_tag = String(formData.get("icon_tag") ?? "").trim();
  const order_index = Number(formData.get("order_index") ?? 0);

  if (!year || !title_ar || !title_en) return { error: "Year and title (AR/EN) are required." } as const;

  return { data: { year, title_ar, title_en, description_ar, description_en, icon_tag, order_index } } as const;
}

export async function createCareerMilestone(_prevState: CrudActionState, formData: FormData): Promise<CrudActionState> {
  const parsed = readCareerMilestoneInput(formData);
  if ("error" in parsed) return { error: parsed.error };
  const supabase = await createClient();
  const { error } = await supabase.from("career_milestones").insert(parsed.data);
  if (error) return { error: error.message };
  revalidatePagePaths("about");
  return undefined;
}

export async function updateCareerMilestone(
  id: string,
  _prevState: CrudActionState,
  formData: FormData
): Promise<CrudActionState> {
  const parsed = readCareerMilestoneInput(formData);
  if ("error" in parsed) return { error: parsed.error };
  const supabase = await createClient();
  const { error } = await supabase.from("career_milestones").update(parsed.data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePagePaths("about");
  return undefined;
}

export async function deleteCareerMilestone(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("career_milestones").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePagePaths("about");
  return {};
}

// ---------------------------------------------------------------------------
// Certifications — About page
// ---------------------------------------------------------------------------
function readCertificationInput(formData: FormData) {
  const title_ar = String(formData.get("title_ar") ?? "").trim();
  const title_en = String(formData.get("title_en") ?? "").trim();
  const issuer_ar = String(formData.get("issuer_ar") ?? "").trim();
  const issuer_en = String(formData.get("issuer_en") ?? "").trim();
  const detail_ar = String(formData.get("detail_ar") ?? "").trim();
  const detail_en = String(formData.get("detail_en") ?? "").trim();
  const icon_tag = String(formData.get("icon_tag") ?? "").trim();
  const order_index = Number(formData.get("order_index") ?? 0);

  if (!title_ar || !title_en) return { error: "Title (AR/EN) is required." } as const;

  return { data: { title_ar, title_en, issuer_ar, issuer_en, detail_ar, detail_en, icon_tag, order_index } } as const;
}

export async function createCertification(_prevState: CrudActionState, formData: FormData): Promise<CrudActionState> {
  const parsed = readCertificationInput(formData);
  if ("error" in parsed) return { error: parsed.error };
  const supabase = await createClient();
  const { error } = await supabase.from("certifications").insert(parsed.data);
  if (error) return { error: error.message };
  revalidatePagePaths("about");
  return undefined;
}

export async function updateCertification(
  id: string,
  _prevState: CrudActionState,
  formData: FormData
): Promise<CrudActionState> {
  const parsed = readCertificationInput(formData);
  if ("error" in parsed) return { error: parsed.error };
  const supabase = await createClient();
  const { error } = await supabase.from("certifications").update(parsed.data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePagePaths("about");
  return undefined;
}

export async function deleteCertification(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("certifications").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePagePaths("about");
  return {};
}

// ---------------------------------------------------------------------------
// Treatment Protocol Steps — Services page
// ---------------------------------------------------------------------------
function readProtocolStepInput(formData: FormData) {
  const title_ar = String(formData.get("title_ar") ?? "").trim();
  const title_en = String(formData.get("title_en") ?? "").trim();
  const description_ar = String(formData.get("description_ar") ?? "").trim();
  const description_en = String(formData.get("description_en") ?? "").trim();
  const icon_tag = String(formData.get("icon_tag") ?? "").trim();
  const order_index = Number(formData.get("order_index") ?? 0);

  if (!title_ar || !title_en) return { error: "Title (AR/EN) is required." } as const;

  return { data: { title_ar, title_en, description_ar, description_en, icon_tag, order_index } } as const;
}

export async function createProtocolStep(_prevState: CrudActionState, formData: FormData): Promise<CrudActionState> {
  const parsed = readProtocolStepInput(formData);
  if ("error" in parsed) return { error: parsed.error };
  const supabase = await createClient();
  const { error } = await supabase.from("treatment_protocol_steps").insert(parsed.data);
  if (error) return { error: error.message };
  revalidatePagePaths("services");
  return undefined;
}

export async function updateProtocolStep(
  id: string,
  _prevState: CrudActionState,
  formData: FormData
): Promise<CrudActionState> {
  const parsed = readProtocolStepInput(formData);
  if ("error" in parsed) return { error: parsed.error };
  const supabase = await createClient();
  const { error } = await supabase.from("treatment_protocol_steps").update(parsed.data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePagePaths("services");
  return undefined;
}

export async function deleteProtocolStep(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("treatment_protocol_steps").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePagePaths("services");
  return {};
}

// ---------------------------------------------------------------------------
// Procedure Categories & Items — Services page "Procedures & Conditions"
// ---------------------------------------------------------------------------
function readProcedureCategoryInput(formData: FormData) {
  const title_ar = String(formData.get("title_ar") ?? "").trim();
  const title_en = String(formData.get("title_en") ?? "").trim();
  const icon_tag = String(formData.get("icon_tag") ?? "").trim();
  const image_url = String(formData.get("image_url") ?? "").trim() || null;
  const order_index = Number(formData.get("order_index") ?? 0);

  if (!title_ar || !title_en) return { error: "Title (AR/EN) is required." } as const;

  return { data: { title_ar, title_en, icon_tag, image_url, order_index } } as const;
}

export async function createProcedureCategory(_prevState: CrudActionState, formData: FormData): Promise<CrudActionState> {
  const parsed = readProcedureCategoryInput(formData);
  if ("error" in parsed) return { error: parsed.error };
  const supabase = await createClient();
  const { error } = await supabase.from("procedure_categories").insert(parsed.data);
  if (error) return { error: error.message };
  revalidatePagePaths("services");
  return undefined;
}

export async function updateProcedureCategory(
  id: string,
  _prevState: CrudActionState,
  formData: FormData
): Promise<CrudActionState> {
  const parsed = readProcedureCategoryInput(formData);
  if ("error" in parsed) return { error: parsed.error };
  const supabase = await createClient();
  const { error } = await supabase.from("procedure_categories").update(parsed.data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePagePaths("services");
  return undefined;
}

export async function deleteProcedureCategory(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("procedure_categories").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePagePaths("services");
  return {};
}

function readProcedureItemInput(formData: FormData) {
  const category_id = String(formData.get("category_id") ?? "").trim();
  const title_ar = String(formData.get("title_ar") ?? "").trim();
  const title_en = String(formData.get("title_en") ?? "").trim();
  const description_ar = String(formData.get("description_ar") ?? "").trim();
  const description_en = String(formData.get("description_en") ?? "").trim();
  const order_index = Number(formData.get("order_index") ?? 0);

  if (!category_id || !title_ar || !title_en) {
    return { error: "Category, and title (AR/EN) are required." } as const;
  }

  return { data: { category_id, title_ar, title_en, description_ar, description_en, order_index } } as const;
}

export async function createProcedureItem(_prevState: CrudActionState, formData: FormData): Promise<CrudActionState> {
  const parsed = readProcedureItemInput(formData);
  if ("error" in parsed) return { error: parsed.error };
  const supabase = await createClient();
  const { error } = await supabase.from("procedure_items").insert(parsed.data);
  if (error) return { error: error.message };
  revalidatePagePaths("services");
  return undefined;
}

export async function updateProcedureItem(
  id: string,
  _prevState: CrudActionState,
  formData: FormData
): Promise<CrudActionState> {
  const parsed = readProcedureItemInput(formData);
  if ("error" in parsed) return { error: parsed.error };
  const supabase = await createClient();
  const { error } = await supabase.from("procedure_items").update(parsed.data).eq("id", id);
  if (error) return { error: error.message };
  revalidatePagePaths("services");
  return undefined;
}

export async function deleteProcedureItem(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("procedure_items").delete().eq("id", id);
  if (error) return { error: error.message };
  revalidatePagePaths("services");
  return {};
}

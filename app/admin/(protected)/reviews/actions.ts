"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ReviewActionState = { error?: string } | undefined;

function readReviewInput(formData: FormData) {
  const patient_name = String(formData.get("patient_name") ?? "").trim();
  const title_ar = String(formData.get("title_ar") ?? "").trim();
  const title_en = String(formData.get("title_en") ?? "").trim();
  const surgical_procedure_ar = String(formData.get("surgical_procedure_ar") ?? "").trim();
  const surgical_procedure_en = String(formData.get("surgical_procedure_en") ?? "").trim();
  const rating = Number(formData.get("rating") ?? 5);
  const review_text_ar = String(formData.get("review_text_ar") ?? "").trim();
  const review_text_en = String(formData.get("review_text_en") ?? "").trim();
  const review_date = String(formData.get("review_date") ?? "").trim();
  const is_verified = formData.get("is_verified") === "on";
  const is_published = formData.get("is_published") === "on";
  const video_url = String(formData.get("video_url") ?? "").trim() || null;

  if (!patient_name || !review_text_ar || !review_text_en || !review_date) {
    return { error: "Patient name, review text (AR/EN), and date are required." } as const;
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return { error: "Rating must be between 1 and 5." } as const;
  }

  return {
    data: {
      patient_name,
      title_ar,
      title_en,
      surgical_procedure_ar,
      surgical_procedure_en,
      rating,
      review_text_ar,
      review_text_en,
      review_date,
      is_verified,
      is_published,
      video_url,
    },
  } as const;
}

function revalidateReviewPaths() {
  revalidatePath("/admin/pages/home");
  revalidatePath("/admin/pages/reviews");
  revalidatePath("/reviews");
  revalidatePath("/");
}

export async function createReview(_prevState: ReviewActionState, formData: FormData): Promise<ReviewActionState> {
  const parsed = readReviewInput(formData);
  if ("error" in parsed) return { error: parsed.error };

  const supabase = await createClient();
  const { error } = await supabase.from("reviews").insert(parsed.data);
  if (error) return { error: error.message };

  revalidateReviewPaths();
  return undefined;
}

export async function updateReview(
  id: string,
  _prevState: ReviewActionState,
  formData: FormData
): Promise<ReviewActionState> {
  const parsed = readReviewInput(formData);
  if ("error" in parsed) return { error: parsed.error };

  const supabase = await createClient();
  const { error } = await supabase.from("reviews").update(parsed.data).eq("id", id);
  if (error) return { error: error.message };

  revalidateReviewPaths();
  return undefined;
}

export async function deleteReview(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("reviews").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidateReviewPaths();
  return {};
}

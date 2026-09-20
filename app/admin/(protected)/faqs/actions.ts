"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ReviewsCategory } from "@/lib/supabase/types";

export type FaqActionState = { error?: string } | undefined;

function readFaqInput(formData: FormData) {
  const question_ar = String(formData.get("question_ar") ?? "").trim();
  const question_en = String(formData.get("question_en") ?? "").trim();
  const answer_ar = String(formData.get("answer_ar") ?? "").trim();
  const answer_en = String(formData.get("answer_en") ?? "").trim();
  const category = String(formData.get("category") ?? "general") as ReviewsCategory;
  const order_index = Number(formData.get("order_index") ?? 0);

  if (!question_ar || !question_en || !answer_ar || !answer_en) {
    return { error: "Fill in the question and answer in both languages." } as const;
  }
  if (!["home", "services", "general"].includes(category)) {
    return { error: "Invalid category." } as const;
  }

  return {
    data: { question_ar, question_en, answer_ar, answer_en, category, order_index },
  } as const;
}

function revalidateFaqPaths() {
  revalidatePath("/admin/pages/home");
  revalidatePath("/admin/pages/services");
  revalidatePath("/");
  revalidatePath("/services");
}

export async function createFaq(_prevState: FaqActionState, formData: FormData): Promise<FaqActionState> {
  const parsed = readFaqInput(formData);
  if ("error" in parsed) return { error: parsed.error };

  const supabase = await createClient();
  const { error } = await supabase.from("faqs").insert(parsed.data);
  if (error) return { error: error.message };

  revalidateFaqPaths();
  return undefined;
}

export async function updateFaq(
  id: string,
  _prevState: FaqActionState,
  formData: FormData
): Promise<FaqActionState> {
  const parsed = readFaqInput(formData);
  if ("error" in parsed) return { error: parsed.error };

  const supabase = await createClient();
  const { error } = await supabase.from("faqs").update(parsed.data).eq("id", id);
  if (error) return { error: error.message };

  revalidateFaqPaths();
  return undefined;
}

export async function deleteFaq(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("faqs").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidateFaqPaths();
  return {};
}

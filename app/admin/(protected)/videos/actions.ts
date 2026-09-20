"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type VideoActionState = { error?: string } | undefined;

function readVideoInput(formData: FormData) {
  const title_ar = String(formData.get("title_ar") ?? "").trim();
  const title_en = String(formData.get("title_en") ?? "").trim();
  const description_ar = String(formData.get("description_ar") ?? "").trim();
  const description_en = String(formData.get("description_en") ?? "").trim();
  const category_ar = String(formData.get("category_ar") ?? "").trim();
  const category_en = String(formData.get("category_en") ?? "").trim();
  const thumbnail_url = String(formData.get("thumbnail_url") ?? "").trim() || null;
  const video_url = String(formData.get("video_url") ?? "").trim();
  const duration = String(formData.get("duration") ?? "").trim();
  const order_index = Number(formData.get("order_index") ?? 0);
  const is_published = formData.get("is_published") === "on";

  if (!title_ar || !title_en || !video_url) {
    return { error: "Title (AR/EN) and the video URL are required." } as const;
  }

  return {
    data: {
      title_ar,
      title_en,
      description_ar,
      description_en,
      category_ar,
      category_en,
      thumbnail_url,
      video_url,
      duration,
      order_index,
      is_published,
    },
  } as const;
}

function revalidateVideoPaths() {
  revalidatePath("/admin/pages/home");
  revalidatePath("/admin/pages/videos");
  revalidatePath("/videos");
  revalidatePath("/");
}

export async function createVideo(_prevState: VideoActionState, formData: FormData): Promise<VideoActionState> {
  const parsed = readVideoInput(formData);
  if ("error" in parsed) return { error: parsed.error };

  const supabase = await createClient();
  const { error } = await supabase.from("videos").insert(parsed.data);
  if (error) return { error: error.message };

  revalidateVideoPaths();
  return undefined;
}

export async function updateVideo(
  id: string,
  _prevState: VideoActionState,
  formData: FormData
): Promise<VideoActionState> {
  const parsed = readVideoInput(formData);
  if ("error" in parsed) return { error: parsed.error };

  const supabase = await createClient();
  const { error } = await supabase.from("videos").update(parsed.data).eq("id", id);
  if (error) return { error: error.message };

  revalidateVideoPaths();
  return undefined;
}

export async function deleteVideo(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("videos").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidateVideoPaths();
  return {};
}

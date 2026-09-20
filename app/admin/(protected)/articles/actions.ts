"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type ArticleActionState = { error?: string } | undefined;

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

function readArticleInput(formData: FormData) {
  const title_ar = String(formData.get("title_ar") ?? "").trim();
  const title_en = String(formData.get("title_en") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const category_ar = String(formData.get("category_ar") ?? "").trim();
  const category_en = String(formData.get("category_en") ?? "").trim();
  const published_at = String(formData.get("published_at") ?? "").trim();
  const reading_time_minutes = Number(formData.get("reading_time_minutes") ?? 5);
  const featured_image_url = String(formData.get("featured_image_url") ?? "").trim() || null;
  const excerpt_ar = String(formData.get("excerpt_ar") ?? "").trim();
  const excerpt_en = String(formData.get("excerpt_en") ?? "").trim();
  const content_ar = String(formData.get("content_ar") ?? "").trim();
  const content_en = String(formData.get("content_en") ?? "").trim();
  const is_hero_featured = formData.get("is_hero_featured") === "on";
  const is_published = formData.get("is_published") === "on";

  if (!title_ar || !title_en || !excerpt_ar || !excerpt_en || !content_ar || !content_en) {
    return { error: "Title, excerpt, and content are required in both languages." } as const;
  }

  const slug = slugify(slugInput || title_en);
  if (!slug) {
    return { error: "Could not derive a URL slug — set one manually." } as const;
  }

  return {
    data: {
      title_ar,
      title_en,
      slug,
      category_ar,
      category_en,
      published_at: published_at ? new Date(published_at).toISOString() : new Date().toISOString(),
      reading_time_minutes: Number.isFinite(reading_time_minutes) ? reading_time_minutes : 5,
      featured_image_url,
      excerpt_ar,
      excerpt_en,
      content_ar,
      content_en,
      is_hero_featured,
      is_published,
    },
  } as const;
}

function revalidateArticlePaths(slug?: string) {
  revalidatePath("/admin/pages/articles");
  revalidatePath("/articles");
  revalidatePath("/");
  if (slug) revalidatePath(`/articles/${slug}`);
}

function friendlyError(message: string) {
  if (message.includes("articles_slug_key") || message.includes("duplicate key")) {
    return "That URL slug is already used by another article. Choose a different one.";
  }
  return message;
}

export async function createArticle(
  _prevState: ArticleActionState,
  formData: FormData
): Promise<ArticleActionState> {
  const parsed = readArticleInput(formData);
  if ("error" in parsed) return { error: parsed.error };

  const supabase = await createClient();
  const { error } = await supabase.from("articles").insert(parsed.data);
  if (error) return { error: friendlyError(error.message) };

  revalidateArticlePaths(parsed.data.slug);
  return undefined;
}

export async function updateArticle(
  id: string,
  _prevState: ArticleActionState,
  formData: FormData
): Promise<ArticleActionState> {
  const parsed = readArticleInput(formData);
  if ("error" in parsed) return { error: parsed.error };

  const supabase = await createClient();
  const { error } = await supabase.from("articles").update(parsed.data).eq("id", id);
  if (error) return { error: friendlyError(error.message) };

  revalidateArticlePaths(parsed.data.slug);
  return undefined;
}

export async function deleteArticle(id: string): Promise<{ error?: string }> {
  const supabase = await createClient();
  const { error } = await supabase.from("articles").delete().eq("id", id);
  if (error) return { error: error.message };

  revalidateArticlePaths();
  return {};
}

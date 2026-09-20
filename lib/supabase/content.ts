import type { Bilingual, Lang } from "@/lib/i18n";

/**
 * Turns a pair of admin-editable AR/EN columns into a `Bilingual` prop, or
 * `undefined` when both are still blank — so components fall back to their
 * own built-in default copy instead of rendering an empty string.
 */
export function toBilingual(ar: string | null | undefined, en: string | null | undefined): Bilingual | undefined {
  if (!ar?.trim() && !en?.trim()) return undefined;
  return { ar: ar ?? "", en: en ?? "" };
}

/** Splits a "one item per line" admin text field into a clean string array. */
export function splitLines(value: string | null | undefined): string[] {
  return (value ?? "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
}

/** Splits a "blank line between paragraphs" admin text field into paragraphs. */
export function splitParagraphs(value: string | null | undefined): string[] {
  return (value ?? "")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
}

/** Formats an article's `published_at` timestamp for display, per language. */
export function formatArticleDate(lang: Lang, iso: string): string {
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

/** Formats an article's reading time (e.g. "5 دقائق قراءة" / "5 min read"). */
export function formatReadingTime(lang: Lang, minutes: number): string {
  return lang === "ar" ? `${minutes} دقائق قراءة` : `${minutes} min read`;
}

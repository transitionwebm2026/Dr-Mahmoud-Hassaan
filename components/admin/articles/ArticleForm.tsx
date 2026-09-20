"use client";

import { useActionState, useState } from "react";
import { X } from "lucide-react";
import { FieldLabel, TextArea, TextInput, ToggleSwitch, SubmitButton } from "@/components/admin/ui/FormControls";
import { MediaUploadField } from "@/components/admin/ui/MediaUploadField";
import { useActionFeedback } from "@/components/admin/ui/useActionFeedback";
import { createArticle, updateArticle, type ArticleActionState } from "@/app/admin/(protected)/articles/actions";
import type { Article } from "@/lib/supabase/types";

export default function ArticleForm({ article, onDone }: { article?: Article; onDone: () => void }) {
  const action = article ? updateArticle.bind(null, article.id) : createArticle;
  const [state, formAction, isPending] = useActionState<ArticleActionState, FormData>(action, undefined);
  const [isHeroFeatured, setIsHeroFeatured] = useState(article?.is_hero_featured ?? false);
  const [isPublished, setIsPublished] = useState(article?.is_published ?? true);

  useActionFeedback(state, isPending, article ? "Article updated." : "Article published.", onDone);

  return (
    <form action={formAction} className="glass-card space-y-5 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-extrabold text-ink">{article ? "Edit Article" : "New Article"}</h3>
        <button type="button" onClick={onDone} className="text-ink/40 hover:text-ink">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="title_ar" required>
            Title (Arabic)
          </FieldLabel>
          <TextInput id="title_ar" name="title_ar" dir="rtl" defaultValue={article?.title_ar} required />
        </div>
        <div>
          <FieldLabel htmlFor="title_en" required>
            Title (English)
          </FieldLabel>
          <TextInput id="title_en" name="title_en" defaultValue={article?.title_en} required />
        </div>

        <div>
          <FieldLabel htmlFor="slug">URL Slug</FieldLabel>
          <TextInput
            id="slug"
            name="slug"
            placeholder="auto-generated from English title if left blank"
            defaultValue={article?.slug}
          />
        </div>
        <div>
          <FieldLabel htmlFor="published_at">Publish Date</FieldLabel>
          <TextInput
            id="published_at"
            name="published_at"
            type="date"
            defaultValue={(article?.published_at ?? new Date().toISOString()).slice(0, 10)}
          />
        </div>

        <div>
          <FieldLabel htmlFor="category_ar">Category (Arabic)</FieldLabel>
          <TextInput id="category_ar" name="category_ar" dir="rtl" defaultValue={article?.category_ar} />
        </div>
        <div>
          <FieldLabel htmlFor="category_en">Category (English)</FieldLabel>
          <TextInput id="category_en" name="category_en" defaultValue={article?.category_en} />
        </div>

        <div>
          <MediaUploadField
            name="featured_image_url"
            label="Featured Image"
            kind="image"
            defaultValue={article?.featured_image_url}
          />
        </div>
        <div>
          <FieldLabel htmlFor="reading_time_minutes">Reading Time (minutes)</FieldLabel>
          <TextInput
            id="reading_time_minutes"
            name="reading_time_minutes"
            type="number"
            min={1}
            defaultValue={article?.reading_time_minutes ?? 5}
          />
        </div>

        <div className="sm:col-span-2">
          <FieldLabel htmlFor="excerpt_ar" required>
            Excerpt (Arabic)
          </FieldLabel>
          <TextArea id="excerpt_ar" name="excerpt_ar" dir="rtl" rows={2} defaultValue={article?.excerpt_ar} required />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel htmlFor="excerpt_en" required>
            Excerpt (English)
          </FieldLabel>
          <TextArea id="excerpt_en" name="excerpt_en" rows={2} defaultValue={article?.excerpt_en} required />
        </div>

        <div className="sm:col-span-2">
          <FieldLabel htmlFor="content_ar" required>
            Full Content — Markdown (Arabic)
          </FieldLabel>
          <TextArea id="content_ar" name="content_ar" dir="rtl" rows={10} defaultValue={article?.content_ar} required />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel htmlFor="content_en" required>
            Full Content — Markdown (English)
          </FieldLabel>
          <TextArea id="content_en" name="content_en" rows={10} defaultValue={article?.content_en} required />
        </div>

        <div className="flex items-end gap-6 pb-1 sm:col-span-2">
          <ToggleSwitch checked={isHeroFeatured} onChange={setIsHeroFeatured} label="Hero Featured" name="is_hero_featured" />
          <ToggleSwitch checked={isPublished} onChange={setIsPublished} label="Published" name="is_published" />
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-ink/10 pt-4">
        <button type="button" onClick={onDone} className="btn-outline-glass !py-2.5 !px-6 text-sm">
          Cancel
        </button>
        <SubmitButton>{article ? "Save Changes" : "Publish Article"}</SubmitButton>
      </div>
    </form>
  );
}

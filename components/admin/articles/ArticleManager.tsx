"use client";

import { useState } from "react";
import { Plus, Pencil, Sparkles, Clock } from "lucide-react";
import { DeleteButton } from "@/components/admin/ui/DeleteButton";
import { deleteArticle } from "@/app/admin/(protected)/articles/actions";
import type { Article } from "@/lib/supabase/types";
import ArticleForm from "./ArticleForm";

export default function ArticleManager({ articles }: { articles: Article[] }) {
  const [panel, setPanel] = useState<"closed" | "new" | Article>("closed");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink/60">{articles.length} articles.</p>
        {panel === "closed" && (
          <button type="button" onClick={() => setPanel("new")} className="btn-outline-glass !py-2 !px-4 text-xs">
            <Plus className="h-3.5 w-3.5" />
            New Article
          </button>
        )}
      </div>

      {panel === "new" && <ArticleForm onDone={() => setPanel("closed")} />}
      {panel !== "closed" && panel !== "new" && <ArticleForm article={panel} onDone={() => setPanel("closed")} />}

      <div className="space-y-3">
        {articles.length === 0 && (
          <p className="glass-card p-8 text-center text-sm text-ink/50">No articles yet. Write your first one above.</p>
        )}
        {articles.map((article) => (
          <div key={article.id} className="glass-card flex items-start justify-between gap-4 p-5">
            <div className="min-w-0">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                {article.is_hero_featured && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-bold text-amber-700">
                    <Sparkles className="h-3 w-3" />
                    Featured
                  </span>
                )}
                {!article.is_published && (
                  <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[11px] font-bold text-ink/50">Draft</span>
                )}
                <span className="text-xs font-semibold text-brand-700">{article.category_en}</span>
              </div>
              <p className="font-bold text-ink">{article.title_en}</p>
              <p dir="rtl" className="truncate text-sm text-ink/60">
                {article.title_ar}
              </p>
              <p className="mt-1 flex items-center gap-3 text-xs text-ink/45">
                <span>/{article.slug}</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {article.reading_time_minutes} min read
                </span>
                <span>{new Date(article.published_at).toLocaleDateString("en-GB")}</span>
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setPanel(article)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-brand/30 bg-brand/5 px-3 py-1.5 text-xs font-semibold text-brand-700 transition hover:bg-brand/10"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </button>
              <DeleteButton action={() => deleteArticle(article.id)} confirmMessage={`Delete "${article.title_en}"?`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

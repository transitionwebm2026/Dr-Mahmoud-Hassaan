"use client";

import { useState } from "react";
import { Plus, Pencil, Star, BadgeCheck } from "lucide-react";
import { DeleteButton } from "@/components/admin/ui/DeleteButton";
import { deleteReview } from "@/app/admin/(protected)/reviews/actions";
import type { Review } from "@/lib/supabase/types";
import ReviewForm from "./ReviewForm";

export default function ReviewManager({ reviews }: { reviews: Review[] }) {
  const [panel, setPanel] = useState<"closed" | "new" | Review>("closed");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink/60">{reviews.length} reviews.</p>
        {panel === "closed" && (
          <button type="button" onClick={() => setPanel("new")} className="btn-outline-glass !py-2 !px-4 text-xs">
            <Plus className="h-3.5 w-3.5" />
            Add Review
          </button>
        )}
      </div>

      {panel === "new" && <ReviewForm onDone={() => setPanel("closed")} />}
      {panel !== "closed" && panel !== "new" && <ReviewForm review={panel} onDone={() => setPanel("closed")} />}

      <div className="space-y-3">
        {reviews.length === 0 && (
          <p className="glass-card p-8 text-center text-sm text-ink/50">No reviews yet. Add your first one above.</p>
        )}
        {reviews.map((review) => (
          <div key={review.id} className="glass-card flex items-start justify-between gap-4 p-5">
            <div className="min-w-0">
              <div className="mb-1 flex items-center gap-2">
                <p className="font-bold text-ink">{review.patient_name}</p>
                {review.is_verified && <BadgeCheck className="h-4 w-4 text-brand" />}
                {!review.is_published && (
                  <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[11px] font-bold text-ink/50">Draft</span>
                )}
              </div>
              <div className="mb-1 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < review.rating ? "fill-amber-400 text-amber-400" : "text-ink/15"
                    }`}
                  />
                ))}
                <span className="ms-2 text-xs text-ink/50">{review.surgical_procedure_en}</span>
              </div>
              <p className="line-clamp-2 text-sm text-ink/70">{review.review_text_en}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setPanel(review)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-brand/30 bg-brand/5 px-3 py-1.5 text-xs font-semibold text-brand-700 transition hover:bg-brand/10"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </button>
              <DeleteButton action={() => deleteReview(review.id)} confirmMessage={`Delete review from "${review.patient_name}"?`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

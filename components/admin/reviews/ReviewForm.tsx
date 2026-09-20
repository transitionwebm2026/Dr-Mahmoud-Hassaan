"use client";

import { useActionState, useState } from "react";
import { X, Star } from "lucide-react";
import { FieldLabel, TextArea, TextInput, ToggleSwitch, SubmitButton } from "@/components/admin/ui/FormControls";
import { MediaUploadField } from "@/components/admin/ui/MediaUploadField";
import { useActionFeedback } from "@/components/admin/ui/useActionFeedback";
import { createReview, updateReview, type ReviewActionState } from "@/app/admin/(protected)/reviews/actions";
import type { Review } from "@/lib/supabase/types";

export default function ReviewForm({ review, onDone }: { review?: Review; onDone: () => void }) {
  const action = review ? updateReview.bind(null, review.id) : createReview;
  const [state, formAction, isPending] = useActionState<ReviewActionState, FormData>(action, undefined);
  const [rating, setRating] = useState(review?.rating ?? 5);
  const [isVerified, setIsVerified] = useState(review?.is_verified ?? false);
  const [isPublished, setIsPublished] = useState(review?.is_published ?? true);

  useActionFeedback(state, isPending, review ? "Review updated." : "Review added.", onDone);

  return (
    <form action={formAction} className="glass-card space-y-5 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-extrabold text-ink">{review ? "Edit Review" : "Add New Review"}</h3>
        <button type="button" onClick={onDone} className="text-ink/40 hover:text-ink">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="patient_name" required>
            Patient Name
          </FieldLabel>
          <TextInput id="patient_name" name="patient_name" defaultValue={review?.patient_name} required />
        </div>
        <div />
        <div>
          <FieldLabel htmlFor="title_ar">Headline (Arabic)</FieldLabel>
          <TextInput id="title_ar" name="title_ar" dir="rtl" defaultValue={review?.title_ar} placeholder="Shown on the Reviews page grid" />
        </div>
        <div>
          <FieldLabel htmlFor="title_en">Headline (English)</FieldLabel>
          <TextInput id="title_en" name="title_en" defaultValue={review?.title_en} placeholder="Shown on the Reviews page grid" />
        </div>
        <div>
          <FieldLabel htmlFor="review_date" required>
            Review Date
          </FieldLabel>
          <TextInput
            id="review_date"
            name="review_date"
            type="date"
            defaultValue={review?.review_date ?? new Date().toISOString().slice(0, 10)}
            required
          />
        </div>
        <div>
          <FieldLabel htmlFor="surgical_procedure_ar">Surgical Procedure (Arabic)</FieldLabel>
          <TextInput
            id="surgical_procedure_ar"
            name="surgical_procedure_ar"
            dir="rtl"
            defaultValue={review?.surgical_procedure_ar}
          />
        </div>
        <div>
          <FieldLabel htmlFor="surgical_procedure_en">Surgical Procedure (English)</FieldLabel>
          <TextInput id="surgical_procedure_en" name="surgical_procedure_en" defaultValue={review?.surgical_procedure_en} />
        </div>
        <div>
          <FieldLabel htmlFor="review_text_ar" required>
            Review Text (Arabic)
          </FieldLabel>
          <TextArea id="review_text_ar" name="review_text_ar" dir="rtl" defaultValue={review?.review_text_ar} required />
        </div>
        <div>
          <FieldLabel htmlFor="review_text_en" required>
            Review Text (English)
          </FieldLabel>
          <TextArea id="review_text_en" name="review_text_en" defaultValue={review?.review_text_en} required />
        </div>
        <div>
          <MediaUploadField name="video_url" label="Patient Video (optional)" kind="video" defaultValue={review?.video_url} />
        </div>
        <div>
          <FieldLabel htmlFor="rating" required>
            Rating
          </FieldLabel>
          <input type="hidden" name="rating" value={rating} />
          <div className="flex items-center gap-1 pt-1.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} stars`}>
                <Star
                  className={`h-6 w-6 transition ${
                    n <= rating ? "fill-amber-400 text-amber-400" : "text-ink/20"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-end gap-6 pb-1 sm:col-span-2">
          <ToggleSwitch checked={isVerified} onChange={setIsVerified} label="Verified Patient" name="is_verified" />
          <ToggleSwitch checked={isPublished} onChange={setIsPublished} label="Published" name="is_published" />
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-ink/10 pt-4">
        <button type="button" onClick={onDone} className="btn-outline-glass !py-2.5 !px-6 text-sm">
          Cancel
        </button>
        <SubmitButton>{review ? "Save Changes" : "Add Review"}</SubmitButton>
      </div>
    </form>
  );
}

"use client";

import { useActionState } from "react";
import { X } from "lucide-react";
import { FieldLabel, TextArea, TextInput, SelectInput, SubmitButton } from "@/components/admin/ui/FormControls";
import { useActionFeedback } from "@/components/admin/ui/useActionFeedback";
import { createFaq, updateFaq, type FaqActionState } from "@/app/admin/(protected)/faqs/actions";
import type { Faq } from "@/lib/supabase/types";

export default function FaqForm({
  faq,
  defaultCategory = "general",
  onDone,
}: {
  faq?: Faq;
  defaultCategory?: Faq["category"];
  onDone: () => void;
}) {
  const action = faq ? updateFaq.bind(null, faq.id) : createFaq;
  const [state, formAction, isPending] = useActionState<FaqActionState, FormData>(action, undefined);

  useActionFeedback(state, isPending, faq ? "FAQ updated." : "FAQ created.", onDone);

  return (
    <form action={formAction} className="glass-card space-y-5 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-extrabold text-ink">{faq ? "Edit FAQ" : "Add New FAQ"}</h3>
        <button type="button" onClick={onDone} className="text-ink/40 hover:text-ink">
          <X className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="question_ar" required>
            Question (Arabic)
          </FieldLabel>
          <TextInput id="question_ar" name="question_ar" dir="rtl" defaultValue={faq?.question_ar} required />
        </div>
        <div>
          <FieldLabel htmlFor="question_en" required>
            Question (English)
          </FieldLabel>
          <TextInput id="question_en" name="question_en" defaultValue={faq?.question_en} required />
        </div>
        <div>
          <FieldLabel htmlFor="answer_ar" required>
            Answer (Arabic)
          </FieldLabel>
          <TextArea id="answer_ar" name="answer_ar" dir="rtl" defaultValue={faq?.answer_ar} required />
        </div>
        <div>
          <FieldLabel htmlFor="answer_en" required>
            Answer (English)
          </FieldLabel>
          <TextArea id="answer_en" name="answer_en" defaultValue={faq?.answer_en} required />
        </div>
        <div>
          <FieldLabel htmlFor="category" required>
            Category
          </FieldLabel>
          <SelectInput id="category" name="category" defaultValue={faq?.category ?? defaultCategory}>
            <option value="home">Home</option>
            <option value="services">Services</option>
            <option value="general">General</option>
          </SelectInput>
        </div>
        <div>
          <FieldLabel htmlFor="order_index">Display Order</FieldLabel>
          <TextInput id="order_index" name="order_index" type="number" defaultValue={faq?.order_index ?? 0} />
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t border-ink/10 pt-4">
        <button type="button" onClick={onDone} className="btn-outline-glass !py-2.5 !px-6 text-sm">
          Cancel
        </button>
        <SubmitButton>{faq ? "Save Changes" : "Create FAQ"}</SubmitButton>
      </div>
    </form>
  );
}

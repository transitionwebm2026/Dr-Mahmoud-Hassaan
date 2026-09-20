"use client";

import { useActionState, useState } from "react";
import { X } from "lucide-react";
import { FieldLabel, TextArea, TextInput, ToggleSwitch, SubmitButton } from "@/components/admin/ui/FormControls";
import { MediaUploadField } from "@/components/admin/ui/MediaUploadField";
import { useActionFeedback } from "@/components/admin/ui/useActionFeedback";
import { createTreatment, updateTreatment, type CrudActionState } from "@/app/admin/(protected)/surgeries-treatments/actions";
import type { Treatment } from "@/lib/supabase/types";

export default function TreatmentForm({ item, onDone }: { item?: Treatment; onDone: () => void }) {
  const action = item ? updateTreatment.bind(null, item.id) : createTreatment;
  const [state, formAction, isPending] = useActionState<CrudActionState, FormData>(action, undefined);
  const [isPublished, setIsPublished] = useState(item?.is_published ?? true);

  useActionFeedback(state, isPending, item ? "Treatment updated." : "Treatment added.", onDone);

  return (
    <form action={formAction} className="glass-card space-y-5 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-extrabold text-ink">{item ? "Edit Treatment" : "Add Treatment"}</h3>
        <button type="button" onClick={onDone} className="text-ink/40 hover:text-ink">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="disease_name_ar" required>Disease Name (Arabic)</FieldLabel>
          <TextInput id="disease_name_ar" name="disease_name_ar" dir="rtl" defaultValue={item?.disease_name_ar} required />
        </div>
        <div>
          <FieldLabel htmlFor="disease_name_en" required>Disease Name (English)</FieldLabel>
          <TextInput id="disease_name_en" name="disease_name_en" defaultValue={item?.disease_name_en} required />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel htmlFor="treatment_overview_ar">Treatment Overview (Arabic)</FieldLabel>
          <TextArea id="treatment_overview_ar" name="treatment_overview_ar" dir="rtl" rows={2} defaultValue={item?.treatment_overview_ar} />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel htmlFor="treatment_overview_en">Treatment Overview (English)</FieldLabel>
          <TextArea id="treatment_overview_en" name="treatment_overview_en" rows={2} defaultValue={item?.treatment_overview_en} />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel htmlFor="details_ar">Details (Arabic)</FieldLabel>
          <TextArea id="details_ar" name="details_ar" dir="rtl" rows={5} defaultValue={item?.details_ar} />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel htmlFor="details_en">Details (English)</FieldLabel>
          <TextArea id="details_en" name="details_en" rows={5} defaultValue={item?.details_en} />
        </div>
        <div>
          <MediaUploadField name="image_url" label="Image" kind="image" defaultValue={item?.image_url} />
        </div>
        <div>
          <FieldLabel htmlFor="order_index">Display Order</FieldLabel>
          <TextInput id="order_index" name="order_index" type="number" defaultValue={item?.order_index ?? 0} />
        </div>
        <div className="flex items-end pb-1">
          <ToggleSwitch checked={isPublished} onChange={setIsPublished} label="Published" name="is_published" />
        </div>
      </div>
      <div className="flex justify-end gap-3 border-t border-ink/10 pt-4">
        <button type="button" onClick={onDone} className="btn-outline-glass !py-2.5 !px-6 text-sm">Cancel</button>
        <SubmitButton>{item ? "Save Changes" : "Add Treatment"}</SubmitButton>
      </div>
    </form>
  );
}

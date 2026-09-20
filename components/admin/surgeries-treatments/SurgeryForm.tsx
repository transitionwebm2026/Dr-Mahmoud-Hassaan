"use client";

import { useActionState, useState } from "react";
import { X } from "lucide-react";
import { FieldLabel, TextArea, TextInput, ToggleSwitch, SubmitButton } from "@/components/admin/ui/FormControls";
import { MediaUploadField } from "@/components/admin/ui/MediaUploadField";
import { useActionFeedback } from "@/components/admin/ui/useActionFeedback";
import { createSurgery, updateSurgery, type CrudActionState } from "@/app/admin/(protected)/surgeries-treatments/actions";
import type { SurgeryService } from "@/lib/supabase/types";

export default function SurgeryForm({ item, onDone }: { item?: SurgeryService; onDone: () => void }) {
  const action = item ? updateSurgery.bind(null, item.id) : createSurgery;
  const [state, formAction, isPending] = useActionState<CrudActionState, FormData>(action, undefined);
  const [isPublished, setIsPublished] = useState(item?.is_published ?? true);

  useActionFeedback(state, isPending, item ? "Surgery updated." : "Surgery added.", onDone);

  return (
    <form action={formAction} className="glass-card space-y-5 p-6">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-extrabold text-ink">{item ? "Edit Surgery / Service" : "Add Surgery / Service"}</h3>
        <button type="button" onClick={onDone} className="text-ink/40 hover:text-ink">
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="title_ar" required>Title (Arabic)</FieldLabel>
          <TextInput id="title_ar" name="title_ar" dir="rtl" defaultValue={item?.title_ar} required />
        </div>
        <div>
          <FieldLabel htmlFor="title_en" required>Title (English)</FieldLabel>
          <TextInput id="title_en" name="title_en" defaultValue={item?.title_en} required />
        </div>
        <div>
          <FieldLabel htmlFor="specialty_category_ar">Specialty Category (Arabic)</FieldLabel>
          <TextInput id="specialty_category_ar" name="specialty_category_ar" dir="rtl" defaultValue={item?.specialty_category_ar} />
        </div>
        <div>
          <FieldLabel htmlFor="specialty_category_en">Specialty Category (English)</FieldLabel>
          <TextInput id="specialty_category_en" name="specialty_category_en" defaultValue={item?.specialty_category_en} />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel htmlFor="short_description_ar">Short Description (Arabic)</FieldLabel>
          <TextArea id="short_description_ar" name="short_description_ar" dir="rtl" rows={2} defaultValue={item?.short_description_ar} />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel htmlFor="short_description_en">Short Description (English)</FieldLabel>
          <TextArea id="short_description_en" name="short_description_en" rows={2} defaultValue={item?.short_description_en} />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel htmlFor="detailed_breakdown_ar">Detailed Breakdown (Arabic)</FieldLabel>
          <TextArea id="detailed_breakdown_ar" name="detailed_breakdown_ar" dir="rtl" rows={5} defaultValue={item?.detailed_breakdown_ar} />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel htmlFor="detailed_breakdown_en">Detailed Breakdown (English)</FieldLabel>
          <TextArea id="detailed_breakdown_en" name="detailed_breakdown_en" rows={5} defaultValue={item?.detailed_breakdown_en} />
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
        <SubmitButton>{item ? "Save Changes" : "Add Surgery"}</SubmitButton>
      </div>
    </form>
  );
}

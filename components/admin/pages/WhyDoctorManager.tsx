"use client";

import { useActionState, useState } from "react";
import { Plus, Pencil, X } from "lucide-react";
import { FieldLabel, TextArea, TextInput, SubmitButton } from "@/components/admin/ui/FormControls";
import { DeleteButton } from "@/components/admin/ui/DeleteButton";
import { useActionFeedback } from "@/components/admin/ui/useActionFeedback";
import {
  createWhyDoctorPoint,
  updateWhyDoctorPoint,
  deleteWhyDoctorPoint,
  type CrudActionState,
} from "@/app/admin/(protected)/pages/actions";
import type { WhyDoctorPoint } from "@/lib/supabase/types";

function WhyDoctorForm({ point, onDone }: { point?: WhyDoctorPoint; onDone: () => void }) {
  const action = point ? updateWhyDoctorPoint.bind(null, point.id) : createWhyDoctorPoint;
  const [state, formAction, isPending] = useActionState<CrudActionState, FormData>(action, undefined);
  useActionFeedback(state, isPending, point ? "Point updated." : "Point added.", onDone);

  return (
    <form action={formAction} className="glass-card space-y-4 p-5">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-extrabold text-ink">{point ? "Edit Point" : "Add Point"}</h4>
        <button type="button" onClick={onDone} className="text-ink/40 hover:text-ink">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="wd_title_ar" required>Title (Arabic)</FieldLabel>
          <TextInput id="wd_title_ar" name="title_ar" dir="rtl" defaultValue={point?.title_ar} required />
        </div>
        <div>
          <FieldLabel htmlFor="wd_title_en" required>Title (English)</FieldLabel>
          <TextInput id="wd_title_en" name="title_en" defaultValue={point?.title_en} required />
        </div>
        <div>
          <FieldLabel htmlFor="wd_description_ar">Description (Arabic)</FieldLabel>
          <TextArea id="wd_description_ar" name="description_ar" dir="rtl" rows={2} defaultValue={point?.description_ar} />
        </div>
        <div>
          <FieldLabel htmlFor="wd_description_en">Description (English)</FieldLabel>
          <TextArea id="wd_description_en" name="description_en" rows={2} defaultValue={point?.description_en} />
        </div>
        <div>
          <FieldLabel htmlFor="wd_icon_tag">Icon Tag (lucide name)</FieldLabel>
          <TextInput id="wd_icon_tag" name="icon_tag" placeholder="e.g. ShieldCheck" defaultValue={point?.icon_tag} />
        </div>
        <div>
          <FieldLabel htmlFor="wd_order_index">Display Order</FieldLabel>
          <TextInput id="wd_order_index" name="order_index" type="number" defaultValue={point?.order_index ?? 0} />
        </div>
      </div>
      <div className="flex justify-end gap-3 border-t border-ink/10 pt-3">
        <button type="button" onClick={onDone} className="btn-outline-glass !py-2 !px-5 text-xs">Cancel</button>
        <SubmitButton className="!py-2 !px-5 text-xs">{point ? "Save" : "Add"}</SubmitButton>
      </div>
    </form>
  );
}

export default function WhyDoctorManager({ points }: { points: WhyDoctorPoint[] }) {
  const [panel, setPanel] = useState<"closed" | "new" | WhyDoctorPoint>("closed");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-extrabold text-ink">Why Choose The Doctor</h3>
        {panel === "closed" && (
          <button type="button" onClick={() => setPanel("new")} className="btn-outline-glass !py-2 !px-4 text-xs">
            <Plus className="h-3.5 w-3.5" />
            Add Point
          </button>
        )}
      </div>

      {panel === "new" && <WhyDoctorForm onDone={() => setPanel("closed")} />}
      {panel !== "closed" && panel !== "new" && <WhyDoctorForm point={panel} onDone={() => setPanel("closed")} />}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {points.map((point) => (
          <div key={point.id} className="glass-card flex items-start justify-between gap-3 p-4">
            <div className="min-w-0">
              <p className="text-sm font-bold text-ink">{point.title_en}</p>
              <p dir="rtl" className="truncate text-xs text-ink/55">{point.title_ar}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <button type="button" onClick={() => setPanel(point)} className="rounded-lg border border-brand/30 bg-brand/5 p-1.5 text-brand-700 hover:bg-brand/10">
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <DeleteButton action={() => deleteWhyDoctorPoint(point.id)} label="" confirmMessage={`Delete "${point.title_en}"?`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

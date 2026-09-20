"use client";

import { useActionState, useState } from "react";
import { Plus, Pencil, X } from "lucide-react";
import { FieldLabel, TextArea, TextInput, SubmitButton } from "@/components/admin/ui/FormControls";
import { DeleteButton } from "@/components/admin/ui/DeleteButton";
import { useActionFeedback } from "@/components/admin/ui/useActionFeedback";
import {
  createCareerMilestone,
  updateCareerMilestone,
  deleteCareerMilestone,
  type CrudActionState,
} from "@/app/admin/(protected)/pages/actions";
import type { CareerMilestone } from "@/lib/supabase/types";

function MilestoneForm({ item, onDone }: { item?: CareerMilestone; onDone: () => void }) {
  const action = item ? updateCareerMilestone.bind(null, item.id) : createCareerMilestone;
  const [state, formAction, isPending] = useActionState<CrudActionState, FormData>(action, undefined);
  useActionFeedback(state, isPending, item ? "Milestone updated." : "Milestone added.", onDone);

  return (
    <form action={formAction} className="glass-card space-y-4 p-5">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-extrabold text-ink">{item ? "Edit Milestone" : "Add Milestone"}</h4>
        <button type="button" onClick={onDone} className="text-ink/40 hover:text-ink">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="cm_year" required>Year</FieldLabel>
          <TextInput id="cm_year" name="year" placeholder="2020" defaultValue={item?.year} required />
        </div>
        <div>
          <FieldLabel htmlFor="cm_order_index">Display Order</FieldLabel>
          <TextInput id="cm_order_index" name="order_index" type="number" defaultValue={item?.order_index ?? 0} />
        </div>
        <div>
          <FieldLabel htmlFor="cm_title_ar" required>Title (Arabic)</FieldLabel>
          <TextInput id="cm_title_ar" name="title_ar" dir="rtl" defaultValue={item?.title_ar} required />
        </div>
        <div>
          <FieldLabel htmlFor="cm_title_en" required>Title (English)</FieldLabel>
          <TextInput id="cm_title_en" name="title_en" defaultValue={item?.title_en} required />
        </div>
        <div>
          <FieldLabel htmlFor="cm_description_ar">Description (Arabic)</FieldLabel>
          <TextArea id="cm_description_ar" name="description_ar" dir="rtl" rows={2} defaultValue={item?.description_ar} />
        </div>
        <div>
          <FieldLabel htmlFor="cm_description_en">Description (English)</FieldLabel>
          <TextArea id="cm_description_en" name="description_en" rows={2} defaultValue={item?.description_en} />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel htmlFor="cm_icon_tag">Icon Tag (lucide name)</FieldLabel>
          <TextInput id="cm_icon_tag" name="icon_tag" placeholder="e.g. GraduationCap" defaultValue={item?.icon_tag} />
        </div>
      </div>
      <div className="flex justify-end gap-3 border-t border-ink/10 pt-3">
        <button type="button" onClick={onDone} className="btn-outline-glass !py-2 !px-5 text-xs">Cancel</button>
        <SubmitButton className="!py-2 !px-5 text-xs">{item ? "Save" : "Add"}</SubmitButton>
      </div>
    </form>
  );
}

export default function CareerMilestonesManager({ milestones }: { milestones: CareerMilestone[] }) {
  const [panel, setPanel] = useState<"closed" | "new" | CareerMilestone>("closed");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-extrabold text-ink">Career Timeline</h3>
        {panel === "closed" && (
          <button type="button" onClick={() => setPanel("new")} className="btn-outline-glass !py-2 !px-4 text-xs">
            <Plus className="h-3.5 w-3.5" />
            Add Milestone
          </button>
        )}
      </div>

      {panel === "new" && <MilestoneForm onDone={() => setPanel("closed")} />}
      {panel !== "closed" && panel !== "new" && <MilestoneForm item={panel} onDone={() => setPanel("closed")} />}

      <div className="space-y-2">
        {milestones.map((item) => (
          <div key={item.id} className="glass-card flex items-start justify-between gap-3 p-4">
            <div className="min-w-0">
              <p className="text-xs font-bold text-brand">{item.year}</p>
              <p className="text-sm font-bold text-ink">{item.title_en}</p>
              <p dir="rtl" className="truncate text-xs text-ink/55">{item.title_ar}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <button type="button" onClick={() => setPanel(item)} className="rounded-lg border border-brand/30 bg-brand/5 p-1.5 text-brand-700 hover:bg-brand/10">
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <DeleteButton action={() => deleteCareerMilestone(item.id)} label="" confirmMessage={`Delete "${item.title_en}"?`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

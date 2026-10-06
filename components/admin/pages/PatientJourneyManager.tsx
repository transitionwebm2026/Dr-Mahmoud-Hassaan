"use client";

import { useActionState, useState } from "react";
import { Plus, X } from "lucide-react";
import { FieldLabel, TextArea, TextInput, SubmitButton, FormActions } from "@/components/admin/ui/FormControls";
import { DeleteButton } from "@/components/admin/ui/DeleteButton";
import { EditButton } from "@/components/admin/ui/EditButton";
import { useActionFeedback } from "@/components/admin/ui/useActionFeedback";
import {
  createPatientJourneyStep,
  updatePatientJourneyStep,
  deletePatientJourneyStep,
  type CrudActionState,
} from "@/app/admin/(protected)/pages/actions";
import type { PatientJourneyStep } from "@/lib/supabase/types";

function PatientJourneyForm({ step, onDone }: { step?: PatientJourneyStep; onDone: () => void }) {
  const action = step ? updatePatientJourneyStep.bind(null, step.id) : createPatientJourneyStep;
  const [state, formAction, isPending] = useActionState<CrudActionState, FormData>(action, undefined);
  useActionFeedback(state, isPending, step ? "Step updated." : "Step added.", onDone);

  return (
    <form action={formAction} className="glass-card space-y-4 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h4 className="text-sm font-extrabold text-ink">{step ? "Edit Step" : "Add Step"}</h4>
        <button type="button" onClick={onDone} aria-label="Close" className="-m-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-ink/40 transition hover:bg-white/70 hover:text-ink">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="pj_step_number" required>Step Number</FieldLabel>
          <TextInput id="pj_step_number" name="step_number" type="number" min={1} defaultValue={step?.step_number ?? 1} required />
        </div>
        <div>
          <FieldLabel htmlFor="pj_order_index">Display Order</FieldLabel>
          <TextInput id="pj_order_index" name="order_index" type="number" defaultValue={step?.order_index ?? 0} />
        </div>
        <div>
          <FieldLabel htmlFor="pj_title_ar" required>Title (Arabic)</FieldLabel>
          <TextInput id="pj_title_ar" name="title_ar" dir="rtl" defaultValue={step?.title_ar} required />
        </div>
        <div>
          <FieldLabel htmlFor="pj_title_en" required>Title (English)</FieldLabel>
          <TextInput id="pj_title_en" name="title_en" defaultValue={step?.title_en} required />
        </div>
        <div>
          <FieldLabel htmlFor="pj_description_ar">Description (Arabic)</FieldLabel>
          <TextArea id="pj_description_ar" name="description_ar" dir="rtl" rows={2} defaultValue={step?.description_ar} />
        </div>
        <div>
          <FieldLabel htmlFor="pj_description_en">Description (English)</FieldLabel>
          <TextArea id="pj_description_en" name="description_en" rows={2} defaultValue={step?.description_en} />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel htmlFor="pj_icon_url">Icon Tag (lucide name)</FieldLabel>
          <TextInput id="pj_icon_url" name="icon_url" placeholder="e.g. ClipboardList" defaultValue={step?.icon_url ?? ""} />
        </div>
      </div>
      <FormActions>
        <button type="button" onClick={onDone} className="btn-outline-glass !py-2 !px-5 text-xs">Cancel</button>
        <SubmitButton className="!py-2 !px-5 text-xs">{step ? "Save" : "Add"}</SubmitButton>
      </FormActions>
    </form>
  );
}

export default function PatientJourneyManager({ steps }: { steps: PatientJourneyStep[] }) {
  const [panel, setPanel] = useState<"closed" | "new" | PatientJourneyStep>("closed");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-extrabold text-ink">Patient Journey Steps</h3>
        {panel === "closed" && (
          <button type="button" onClick={() => setPanel("new")} className="btn-outline-glass !py-2 !px-4 text-xs">
            <Plus className="h-3.5 w-3.5" />
            Add Step
          </button>
        )}
      </div>

      {panel === "new" && <PatientJourneyForm onDone={() => setPanel("closed")} />}
      {panel !== "closed" && panel !== "new" && <PatientJourneyForm step={panel} onDone={() => setPanel("closed")} />}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {steps.map((step) => (
          <div key={step.id} className="glass-card flex items-start justify-between gap-3 p-4">
            <div className="min-w-0">
              <p className="text-xs font-bold text-brand">Step {step.step_number}</p>
              <p className="text-sm font-bold text-ink">{step.title_en}</p>
              <p dir="rtl" className="truncate text-xs text-ink/55">{step.title_ar}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <EditButton onClick={() => setPanel(step)} iconOnly />
              <DeleteButton action={() => deletePatientJourneyStep(step.id)} label="" confirmMessage={`Delete "${step.title_en}"?`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

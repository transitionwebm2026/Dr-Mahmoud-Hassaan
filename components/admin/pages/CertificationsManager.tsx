"use client";

import { useActionState, useState } from "react";
import { Plus, Pencil, X } from "lucide-react";
import { FieldLabel, TextArea, TextInput, SubmitButton } from "@/components/admin/ui/FormControls";
import { DeleteButton } from "@/components/admin/ui/DeleteButton";
import { useActionFeedback } from "@/components/admin/ui/useActionFeedback";
import {
  createCertification,
  updateCertification,
  deleteCertification,
  type CrudActionState,
} from "@/app/admin/(protected)/pages/actions";
import type { Certification } from "@/lib/supabase/types";

function CertificationForm({ item, onDone }: { item?: Certification; onDone: () => void }) {
  const action = item ? updateCertification.bind(null, item.id) : createCertification;
  const [state, formAction, isPending] = useActionState<CrudActionState, FormData>(action, undefined);
  useActionFeedback(state, isPending, item ? "Certification updated." : "Certification added.", onDone);

  return (
    <form action={formAction} className="glass-card space-y-4 p-5">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-extrabold text-ink">{item ? "Edit Certification" : "Add Certification"}</h4>
        <button type="button" onClick={onDone} className="text-ink/40 hover:text-ink">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="cert_title_ar" required>Title (Arabic)</FieldLabel>
          <TextInput id="cert_title_ar" name="title_ar" dir="rtl" defaultValue={item?.title_ar} required />
        </div>
        <div>
          <FieldLabel htmlFor="cert_title_en" required>Title (English)</FieldLabel>
          <TextInput id="cert_title_en" name="title_en" defaultValue={item?.title_en} required />
        </div>
        <div>
          <FieldLabel htmlFor="cert_issuer_ar">Issuer (Arabic)</FieldLabel>
          <TextInput id="cert_issuer_ar" name="issuer_ar" dir="rtl" defaultValue={item?.issuer_ar} />
        </div>
        <div>
          <FieldLabel htmlFor="cert_issuer_en">Issuer (English)</FieldLabel>
          <TextInput id="cert_issuer_en" name="issuer_en" defaultValue={item?.issuer_en} />
        </div>
        <div>
          <FieldLabel htmlFor="cert_detail_ar">Detail (Arabic)</FieldLabel>
          <TextArea id="cert_detail_ar" name="detail_ar" dir="rtl" rows={2} defaultValue={item?.detail_ar} />
        </div>
        <div>
          <FieldLabel htmlFor="cert_detail_en">Detail (English)</FieldLabel>
          <TextArea id="cert_detail_en" name="detail_en" rows={2} defaultValue={item?.detail_en} />
        </div>
        <div>
          <FieldLabel htmlFor="cert_icon_tag">Icon Tag (lucide name)</FieldLabel>
          <TextInput id="cert_icon_tag" name="icon_tag" placeholder="e.g. Award" defaultValue={item?.icon_tag} />
        </div>
        <div>
          <FieldLabel htmlFor="cert_order_index">Display Order</FieldLabel>
          <TextInput id="cert_order_index" name="order_index" type="number" defaultValue={item?.order_index ?? 0} />
        </div>
      </div>
      <div className="flex justify-end gap-3 border-t border-ink/10 pt-3">
        <button type="button" onClick={onDone} className="btn-outline-glass !py-2 !px-5 text-xs">Cancel</button>
        <SubmitButton className="!py-2 !px-5 text-xs">{item ? "Save" : "Add"}</SubmitButton>
      </div>
    </form>
  );
}

export default function CertificationsManager({ certifications }: { certifications: Certification[] }) {
  const [panel, setPanel] = useState<"closed" | "new" | Certification>("closed");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-extrabold text-ink">Certificates & Accreditations</h3>
        {panel === "closed" && (
          <button type="button" onClick={() => setPanel("new")} className="btn-outline-glass !py-2 !px-4 text-xs">
            <Plus className="h-3.5 w-3.5" />
            Add Certification
          </button>
        )}
      </div>

      {panel === "new" && <CertificationForm onDone={() => setPanel("closed")} />}
      {panel !== "closed" && panel !== "new" && <CertificationForm item={panel} onDone={() => setPanel("closed")} />}

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {certifications.map((item) => (
          <div key={item.id} className="glass-card flex items-start justify-between gap-3 p-4">
            <div className="min-w-0">
              <p className="text-sm font-bold text-ink">{item.title_en}</p>
              <p className="truncate text-xs text-ink/55">{item.issuer_en}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1.5">
              <button type="button" onClick={() => setPanel(item)} className="rounded-lg border border-brand/30 bg-brand/5 p-1.5 text-brand-700 hover:bg-brand/10">
                <Pencil className="h-3.5 w-3.5" />
              </button>
              <DeleteButton action={() => deleteCertification(item.id)} label="" confirmMessage={`Delete "${item.title_en}"?`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

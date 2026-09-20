"use client";

import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import { DeleteButton } from "@/components/admin/ui/DeleteButton";
import { deleteSurgery, deleteTreatment } from "@/app/admin/(protected)/surgeries-treatments/actions";
import type { SurgeryService, Treatment } from "@/lib/supabase/types";
import SurgeryForm from "./SurgeryForm";
import TreatmentForm from "./TreatmentForm";

export default function SurgeriesTreatmentsManager({
  surgeries,
  treatments,
}: {
  surgeries: SurgeryService[];
  treatments: Treatment[];
}) {
  const [tab, setTab] = useState<"surgeries" | "treatments">("surgeries");
  const [surgeryPanel, setSurgeryPanel] = useState<"closed" | "new" | SurgeryService>("closed");
  const [treatmentPanel, setTreatmentPanel] = useState<"closed" | "new" | Treatment>("closed");

  return (
    <div className="space-y-4">
      <div className="inline-flex rounded-full bg-white/60 p-1 shadow-inner-glass">
        <button
          type="button"
          onClick={() => setTab("surgeries")}
          className={`rounded-full px-5 py-2 text-sm font-bold transition ${
            tab === "surgeries" ? "bg-brand-gradient text-white shadow-glow-brand" : "text-ink/60"
          }`}
        >
          Surgeries & Services ({surgeries.length})
        </button>
        <button
          type="button"
          onClick={() => setTab("treatments")}
          className={`rounded-full px-5 py-2 text-sm font-bold transition ${
            tab === "treatments" ? "bg-brand-gradient text-white shadow-glow-brand" : "text-ink/60"
          }`}
        >
          Treatments ({treatments.length})
        </button>
      </div>

      {tab === "surgeries" && (
        <div className="space-y-4">
          {surgeryPanel === "closed" && (
            <button type="button" onClick={() => setSurgeryPanel("new")} className="btn-primary !py-2.5 !px-5 text-sm">
              <Plus className="h-4 w-4" />
              Add Surgery / Service
            </button>
          )}
          {surgeryPanel === "new" && <SurgeryForm onDone={() => setSurgeryPanel("closed")} />}
          {surgeryPanel !== "closed" && surgeryPanel !== "new" && (
            <SurgeryForm item={surgeryPanel} onDone={() => setSurgeryPanel("closed")} />
          )}

          <div className="space-y-3">
            {surgeries.length === 0 && (
              <p className="glass-card p-8 text-center text-sm text-ink/50">No surgeries yet.</p>
            )}
            {surgeries.map((item) => (
              <div key={item.id} className="glass-card flex items-start justify-between gap-4 p-5">
                <div className="min-w-0">
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-xs font-semibold text-brand-700">{item.specialty_category_en}</span>
                    {!item.is_published && (
                      <span className="rounded-full bg-ink/10 px-2 py-0.5 text-[11px] font-bold text-ink/50">Draft</span>
                    )}
                  </div>
                  <p className="font-bold text-ink">{item.title_en}</p>
                  <p dir="rtl" className="truncate text-sm text-ink/60">{item.title_ar}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSurgeryPanel(item)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-brand/30 bg-brand/5 px-3 py-1.5 text-xs font-semibold text-brand-700 transition hover:bg-brand/10"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </button>
                  <DeleteButton action={() => deleteSurgery(item.id)} confirmMessage={`Delete "${item.title_en}"?`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "treatments" && (
        <div className="space-y-4">
          {treatmentPanel === "closed" && (
            <button type="button" onClick={() => setTreatmentPanel("new")} className="btn-primary !py-2.5 !px-5 text-sm">
              <Plus className="h-4 w-4" />
              Add Treatment
            </button>
          )}
          {treatmentPanel === "new" && <TreatmentForm onDone={() => setTreatmentPanel("closed")} />}
          {treatmentPanel !== "closed" && treatmentPanel !== "new" && (
            <TreatmentForm item={treatmentPanel} onDone={() => setTreatmentPanel("closed")} />
          )}

          <div className="space-y-3">
            {treatments.length === 0 && (
              <p className="glass-card p-8 text-center text-sm text-ink/50">No treatments yet.</p>
            )}
            {treatments.map((item) => (
              <div key={item.id} className="glass-card flex items-start justify-between gap-4 p-5">
                <div className="min-w-0">
                  {!item.is_published && (
                    <span className="mb-1 inline-block rounded-full bg-ink/10 px-2 py-0.5 text-[11px] font-bold text-ink/50">Draft</span>
                  )}
                  <p className="font-bold text-ink">{item.disease_name_en}</p>
                  <p dir="rtl" className="truncate text-sm text-ink/60">{item.disease_name_ar}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setTreatmentPanel(item)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-brand/30 bg-brand/5 px-3 py-1.5 text-xs font-semibold text-brand-700 transition hover:bg-brand/10"
                  >
                    <Pencil className="h-3.5 w-3.5" />
                    Edit
                  </button>
                  <DeleteButton action={() => deleteTreatment(item.id)} confirmMessage={`Delete "${item.disease_name_en}"?`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

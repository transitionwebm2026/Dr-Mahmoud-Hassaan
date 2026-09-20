"use client";

import { useState } from "react";
import { Plus, Pencil } from "lucide-react";
import { DeleteButton } from "@/components/admin/ui/DeleteButton";
import { deleteFaq } from "@/app/admin/(protected)/faqs/actions";
import type { Faq } from "@/lib/supabase/types";
import FaqForm from "./FaqForm";

const CATEGORY_LABEL: Record<string, string> = {
  home: "Home",
  services: "Services",
  general: "General",
};

export default function FaqManager({
  faqs,
  defaultCategory = "general",
}: {
  faqs: Faq[];
  defaultCategory?: Faq["category"];
}) {
  const [panel, setPanel] = useState<"closed" | "new" | Faq>("closed");

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-ink/60">{faqs.length} questions.</p>
        {panel === "closed" && (
          <button type="button" onClick={() => setPanel("new")} className="btn-outline-glass !py-2 !px-4 text-xs">
            <Plus className="h-3.5 w-3.5" />
            Add FAQ
          </button>
        )}
      </div>

      {panel === "new" && <FaqForm defaultCategory={defaultCategory} onDone={() => setPanel("closed")} />}
      {panel !== "closed" && panel !== "new" && <FaqForm faq={panel} onDone={() => setPanel("closed")} />}

      <div className="space-y-3">
        {faqs.length === 0 && (
          <p className="glass-card p-8 text-center text-sm text-ink/50">No FAQs yet. Add your first one above.</p>
        )}
        {faqs.map((faq) => (
          <div key={faq.id} className="glass-card flex items-start justify-between gap-4 p-5">
            <div className="min-w-0">
              <span className="mb-1.5 inline-block rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-bold text-brand-700">
                {CATEGORY_LABEL[faq.category] ?? faq.category}
              </span>
              <p className="font-bold text-ink">{faq.question_en}</p>
              <p dir="rtl" className="text-sm text-ink/60">
                {faq.question_ar}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setPanel(faq)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-brand/30 bg-brand/5 px-3 py-1.5 text-xs font-semibold text-brand-700 transition hover:bg-brand/10"
              >
                <Pencil className="h-3.5 w-3.5" />
                Edit
              </button>
              <DeleteButton
                action={() => deleteFaq(faq.id)}
                confirmMessage={`Delete "${faq.question_en}"?`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

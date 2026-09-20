"use client";

import { useActionState, useState } from "react";
import { Plus, Pencil, X, ChevronDown } from "lucide-react";
import { FieldLabel, TextArea, TextInput, SubmitButton } from "@/components/admin/ui/FormControls";
import { MediaUploadField } from "@/components/admin/ui/MediaUploadField";
import { DeleteButton } from "@/components/admin/ui/DeleteButton";
import { useActionFeedback } from "@/components/admin/ui/useActionFeedback";
import {
  createProcedureCategory,
  updateProcedureCategory,
  deleteProcedureCategory,
  createProcedureItem,
  updateProcedureItem,
  deleteProcedureItem,
  type CrudActionState,
} from "@/app/admin/(protected)/pages/actions";
import type { ProcedureCategory, ProcedureItem } from "@/lib/supabase/types";

function CategoryForm({ item, onDone }: { item?: ProcedureCategory; onDone: () => void }) {
  const action = item ? updateProcedureCategory.bind(null, item.id) : createProcedureCategory;
  const [state, formAction, isPending] = useActionState<CrudActionState, FormData>(action, undefined);
  useActionFeedback(state, isPending, item ? "Category updated." : "Category added.", onDone);

  return (
    <form action={formAction} className="glass-card space-y-4 p-5">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-extrabold text-ink">{item ? "Edit Category" : "Add Category"}</h4>
        <button type="button" onClick={onDone} className="text-ink/40 hover:text-ink">
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor="pc_title_ar" required>Title (Arabic)</FieldLabel>
          <TextInput id="pc_title_ar" name="title_ar" dir="rtl" defaultValue={item?.title_ar} required />
        </div>
        <div>
          <FieldLabel htmlFor="pc_title_en" required>Title (English)</FieldLabel>
          <TextInput id="pc_title_en" name="title_en" defaultValue={item?.title_en} required />
        </div>
        <div>
          <FieldLabel htmlFor="pc_icon_tag">Icon Tag (lucide name)</FieldLabel>
          <TextInput id="pc_icon_tag" name="icon_tag" placeholder="e.g. HeartPulse" defaultValue={item?.icon_tag} />
        </div>
        <div>
          <FieldLabel htmlFor="pc_order_index">Display Order</FieldLabel>
          <TextInput id="pc_order_index" name="order_index" type="number" defaultValue={item?.order_index ?? 0} />
        </div>
        <div className="sm:col-span-2">
          <MediaUploadField name="image_url" label="Image" kind="image" defaultValue={item?.image_url} />
        </div>
      </div>
      <div className="flex justify-end gap-3 border-t border-ink/10 pt-3">
        <button type="button" onClick={onDone} className="btn-outline-glass !py-2 !px-5 text-xs">Cancel</button>
        <SubmitButton className="!py-2 !px-5 text-xs">{item ? "Save" : "Add"}</SubmitButton>
      </div>
    </form>
  );
}

function ItemForm({
  categoryId,
  item,
  onDone,
}: {
  categoryId: string;
  item?: ProcedureItem;
  onDone: () => void;
}) {
  const action = item ? updateProcedureItem.bind(null, item.id) : createProcedureItem;
  const [state, formAction, isPending] = useActionState<CrudActionState, FormData>(action, undefined);
  useActionFeedback(state, isPending, item ? "Procedure updated." : "Procedure added.", onDone);

  return (
    <form action={formAction} className="space-y-3 rounded-2xl border border-brand/15 bg-white/50 p-4">
      <input type="hidden" name="category_id" value={categoryId} />
      <div className="flex items-center justify-between">
        <h5 className="text-xs font-extrabold text-ink">{item ? "Edit Procedure" : "Add Procedure"}</h5>
        <button type="button" onClick={onDone} className="text-ink/40 hover:text-ink">
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor={`pi_title_ar_${item?.id ?? "new"}`} required>Title (Arabic)</FieldLabel>
          <TextInput id={`pi_title_ar_${item?.id ?? "new"}`} name="title_ar" dir="rtl" defaultValue={item?.title_ar} required />
        </div>
        <div>
          <FieldLabel htmlFor={`pi_title_en_${item?.id ?? "new"}`} required>Title (English)</FieldLabel>
          <TextInput id={`pi_title_en_${item?.id ?? "new"}`} name="title_en" defaultValue={item?.title_en} required />
        </div>
        <div>
          <FieldLabel htmlFor={`pi_description_ar_${item?.id ?? "new"}`}>Description (Arabic)</FieldLabel>
          <TextArea id={`pi_description_ar_${item?.id ?? "new"}`} name="description_ar" dir="rtl" rows={2} defaultValue={item?.description_ar} />
        </div>
        <div>
          <FieldLabel htmlFor={`pi_description_en_${item?.id ?? "new"}`}>Description (English)</FieldLabel>
          <TextArea id={`pi_description_en_${item?.id ?? "new"}`} name="description_en" rows={2} defaultValue={item?.description_en} />
        </div>
        <div>
          <FieldLabel htmlFor={`pi_order_index_${item?.id ?? "new"}`}>Display Order</FieldLabel>
          <TextInput id={`pi_order_index_${item?.id ?? "new"}`} name="order_index" type="number" defaultValue={item?.order_index ?? 0} />
        </div>
      </div>
      <div className="flex justify-end gap-2 pt-1">
        <button type="button" onClick={onDone} className="btn-outline-glass !py-1.5 !px-4 text-[11px]">Cancel</button>
        <SubmitButton className="!py-1.5 !px-4 text-[11px]">{item ? "Save" : "Add"}</SubmitButton>
      </div>
    </form>
  );
}

function CategoryCard({
  category,
  items,
}: {
  category: ProcedureCategory;
  items: ProcedureItem[];
}) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [itemPanel, setItemPanel] = useState<"closed" | "new" | ProcedureItem>("closed");

  if (editing) {
    return <CategoryForm item={category} onDone={() => setEditing(false)} />;
  }

  return (
    <div className="glass-card overflow-hidden">
      <div className="flex items-center justify-between gap-3 p-4">
        <button type="button" onClick={() => setExpanded((v) => !v)} className="flex min-w-0 flex-1 items-center gap-2 text-start">
          <ChevronDown className={`h-4 w-4 shrink-0 text-ink/40 transition-transform ${expanded ? "rotate-180" : ""}`} />
          <div className="min-w-0">
            <p className="text-sm font-extrabold text-ink">{category.title_en}</p>
            <p dir="rtl" className="truncate text-xs text-ink/55">{category.title_ar}</p>
          </div>
        </button>
        <span className="shrink-0 rounded-full bg-brand/10 px-2.5 py-1 text-[11px] font-bold text-brand-700">
          {items.length} procedures
        </span>
        <div className="flex shrink-0 items-center gap-1.5">
          <button type="button" onClick={() => setEditing(true)} className="rounded-lg border border-brand/30 bg-brand/5 p-1.5 text-brand-700 hover:bg-brand/10">
            <Pencil className="h-3.5 w-3.5" />
          </button>
          <DeleteButton
            action={() => deleteProcedureCategory(category.id)}
            label=""
            confirmMessage={`Delete "${category.title_en}" and all its procedures?`}
          />
        </div>
      </div>

      {expanded && (
        <div className="space-y-3 border-t border-ink/10 bg-white/30 p-4">
          {items.map((procedureItem) =>
            itemPanel !== "closed" && itemPanel !== "new" && itemPanel.id === procedureItem.id ? (
              <ItemForm key={procedureItem.id} categoryId={category.id} item={procedureItem} onDone={() => setItemPanel("closed")} />
            ) : (
              <div key={procedureItem.id} className="flex items-start justify-between gap-3 rounded-2xl bg-white/60 p-3">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-ink">{procedureItem.title_en}</p>
                  <p dir="rtl" className="truncate text-xs text-ink/55">{procedureItem.title_ar}</p>
                </div>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button type="button" onClick={() => setItemPanel(procedureItem)} className="rounded-lg border border-brand/30 bg-brand/5 p-1.5 text-brand-700 hover:bg-brand/10">
                    <Pencil className="h-3 w-3" />
                  </button>
                  <DeleteButton
                    action={() => deleteProcedureItem(procedureItem.id)}
                    label=""
                    confirmMessage={`Delete "${procedureItem.title_en}"?`}
                  />
                </div>
              </div>
            )
          )}

          {itemPanel === "new" && <ItemForm categoryId={category.id} onDone={() => setItemPanel("closed")} />}
          {itemPanel === "closed" && (
            <button
              type="button"
              onClick={() => setItemPanel("new")}
              className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-dashed border-brand/30 py-2.5 text-xs font-bold text-brand-700 hover:bg-brand/5"
            >
              <Plus className="h-3.5 w-3.5" />
              Add Procedure
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function ProcedureBreakdownManager({
  categories,
  items,
}: {
  categories: ProcedureCategory[];
  items: ProcedureItem[];
}) {
  const [addingCategory, setAddingCategory] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-extrabold text-ink">Procedures & Conditions Breakdown</h3>
        {!addingCategory && (
          <button type="button" onClick={() => setAddingCategory(true)} className="btn-outline-glass !py-2 !px-4 text-xs">
            <Plus className="h-3.5 w-3.5" />
            Add Category
          </button>
        )}
      </div>

      {addingCategory && <CategoryForm onDone={() => setAddingCategory(false)} />}

      <div className="space-y-3">
        {categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            items={items.filter((i) => i.category_id === category.id)}
          />
        ))}
      </div>
    </div>
  );
}

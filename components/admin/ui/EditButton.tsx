"use client";

import { Pencil } from "lucide-react";

/** Pencil button for list rows — icon-only on phones (with a full-size touch target), "Edit" text from `sm` up. */
export function EditButton({ onClick, iconOnly = false }: { onClick: () => void; iconOnly?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Edit"
      title="Edit"
      className={`inline-flex h-10 min-w-10 items-center justify-center gap-1.5 rounded-xl border border-brand/30 bg-brand/5 text-xs font-semibold text-brand-700 transition hover:bg-brand/10 sm:h-auto sm:min-w-0 sm:rounded-lg ${
        iconOnly ? "sm:p-1.5" : "sm:px-3 sm:py-1.5"
      }`}
    >
      <Pencil className="h-4 w-4 sm:h-3.5 sm:w-3.5" />
      {!iconOnly && <span className="hidden sm:inline">Edit</span>}
    </button>
  );
}

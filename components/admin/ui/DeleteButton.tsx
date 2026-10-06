"use client";

import { useTransition } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function DeleteButton({
  action,
  confirmMessage = "Delete this item? This cannot be undone.",
  label,
}: {
  action: () => Promise<{ error?: string } | void>;
  confirmMessage?: string;
  /** Text next to the icon on larger screens; pass "" for icon-only. Phones always show the icon only. */
  label?: string;
}) {
  const [isPending, startTransition] = useTransition();
  const text = label ?? "Delete";

  function handleClick() {
    if (!window.confirm(confirmMessage)) return;
    startTransition(async () => {
      const result = await action();
      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Deleted successfully.");
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-label={text || "Delete"}
      title={text || "Delete"}
      className={`inline-flex h-10 min-w-10 items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 text-xs font-semibold text-rose-600 transition hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60 sm:h-auto sm:min-w-0 sm:rounded-lg ${
        text ? "sm:px-3 sm:py-1.5" : "sm:p-1.5"
      }`}
    >
      {isPending ? <Loader2 className="h-4 w-4 animate-spin sm:h-3.5 sm:w-3.5" /> : <Trash2 className="h-4 w-4 sm:h-3.5 sm:w-3.5" />}
      {text && <span className="hidden sm:inline">{text}</span>}
    </button>
  );
}

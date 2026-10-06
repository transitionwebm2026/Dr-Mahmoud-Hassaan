"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";
import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

export function FieldLabel({
  htmlFor,
  children,
  required,
}: {
  htmlFor: string;
  children: ReactNode;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-semibold text-ink/80">
      {children}
      {required && <span className="ms-1 text-rose-500">*</span>}
    </label>
  );
}

// text-base (16px) on phones: iOS Safari zooms the whole page in when a
// field under 16px is focused.
const fieldClasses =
  "w-full rounded-xl border border-ink/10 bg-white/80 px-3.5 py-2.5 text-base text-ink sm:text-sm shadow-inner-glass outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/25 disabled:cursor-not-allowed disabled:opacity-60";

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${fieldClasses} ${props.className ?? ""}`} />;
}

export function TextArea(
  props: TextareaHTMLAttributes<HTMLTextAreaElement> & { rows?: number }
) {
  return (
    <textarea
      {...props}
      rows={props.rows ?? 4}
      className={`${fieldClasses} resize-y ${props.className ?? ""}`}
    />
  );
}

export function SelectInput(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${fieldClasses} ${props.className ?? ""}`} />;
}

export function ToggleSwitch({
  checked,
  onChange,
  label,
  name,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  name?: string;
}) {
  return (
    <label className="flex min-h-11 cursor-pointer select-none items-center gap-3 sm:min-h-0">
      <span className="text-sm font-semibold text-ink/80">{label}</span>
      <span className="relative inline-flex h-6 w-11 items-center">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="peer sr-only"
        />
        <span className="absolute inset-0 rounded-full bg-ink/15 transition-colors peer-checked:bg-brand" />
        <span className="absolute start-0.5 h-5 w-5 translate-x-0 rounded-full bg-white shadow transition-transform peer-checked:translate-x-5 rtl:peer-checked:-translate-x-5" />
      </span>
    </label>
  );
}

export function SubmitButton({
  children,
  pendingLabel = "Saving...",
  className = "",
}: {
  children: ReactNode;
  pendingLabel?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className={`btn-primary flex-1 !py-2.5 !px-6 text-sm disabled:cursor-not-allowed disabled:opacity-70 sm:flex-none ${className}`}
    >
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}

/**
 * The Cancel/Save row at the end of a form. On phones it sticks to the bottom
 * of the screen while its form is in view, so Save stays one tap away on long
 * forms, and its buttons grow to full-size touch targets. Expects the form to
 * use `p-4` padding on phones (its negative margins bleed to the card edge).
 */
export function FormActions({ children }: { children: ReactNode }) {
  return (
    <div className="sticky bottom-0 z-10 -mx-4 -mb-4 flex items-center justify-end gap-3 border-t border-ink/10 bg-white/90 px-4 py-3 backdrop-blur-md [&_button]:min-h-11 sm:static sm:mx-0 sm:mb-0 sm:bg-transparent sm:px-0 sm:pb-0 sm:pt-4 sm:backdrop-blur-none sm:[&_button]:min-h-0">
      {children}
    </div>
  );
}

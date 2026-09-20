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

const fieldClasses =
  "w-full rounded-xl border border-ink/10 bg-white/80 px-3.5 py-2.5 text-sm text-ink shadow-inner-glass outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/25 disabled:cursor-not-allowed disabled:opacity-60";

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
    <label className="flex cursor-pointer select-none items-center gap-3">
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
      className={`btn-primary !py-2.5 !px-6 text-sm disabled:cursor-not-allowed disabled:opacity-70 ${className}`}
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

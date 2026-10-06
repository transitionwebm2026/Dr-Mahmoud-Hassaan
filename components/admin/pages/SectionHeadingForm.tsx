"use client";

import { useActionState } from "react";
import { Heading } from "lucide-react";
import { FieldLabel, TextArea, TextInput, SubmitButton, FormActions } from "@/components/admin/ui/FormControls";
import { useActionFeedback } from "@/components/admin/ui/useActionFeedback";
import { saveSectionHeading, type CrudActionState } from "@/app/admin/(protected)/pages/actions";
import type { SectionHeadingFields } from "@/lib/section-headings";

export default function SectionHeadingForm({
  pageSlug,
  sectionKey,
  label,
  heading,
}: {
  pageSlug: string;
  sectionKey: string;
  label: string;
  heading: SectionHeadingFields;
}) {
  const action = saveSectionHeading.bind(null, pageSlug, sectionKey);
  const [state, formAction, isPending] = useActionState<CrudActionState, FormData>(action, undefined);

  useActionFeedback(state, isPending, `"${label}" heading saved.`);

  // Several of these forms share one admin page, so field ids are scoped
  // per section to keep each label pointing at its own input.
  const id = (field: string) => `${sectionKey}-heading-${field}`;

  return (
    <form action={formAction} className="glass-card space-y-4 p-4 sm:p-6">
      <div>
        <h3 className="flex items-center gap-2 text-sm font-extrabold text-ink">
          <Heading className="h-4 w-4 text-brand-700" />
          Section Heading — {label}
        </h3>
        <p className="mt-1 text-xs text-ink/50">
          The small label, title and description shown at the top of this section. Wrap words in{" "}
          <code className="rounded bg-ink/5 px-1">*asterisks*</code> to color them with the brand gradient. Leave the
          small label or description empty to hide it.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor={id("eyebrow_ar")}>Small Label (Arabic)</FieldLabel>
          <TextInput id={id("eyebrow_ar")} name="eyebrow_ar" dir="rtl" defaultValue={heading.eyebrow_ar} />
        </div>
        <div>
          <FieldLabel htmlFor={id("eyebrow_en")}>Small Label (English)</FieldLabel>
          <TextInput id={id("eyebrow_en")} name="eyebrow_en" defaultValue={heading.eyebrow_en} />
        </div>
        <div>
          <FieldLabel htmlFor={id("title_ar")} required>
            Title (Arabic)
          </FieldLabel>
          <TextInput id={id("title_ar")} name="title_ar" dir="rtl" required defaultValue={heading.title_ar} />
        </div>
        <div>
          <FieldLabel htmlFor={id("title_en")} required>
            Title (English)
          </FieldLabel>
          <TextInput id={id("title_en")} name="title_en" required defaultValue={heading.title_en} />
        </div>
        <div>
          <FieldLabel htmlFor={id("description_ar")}>Description (Arabic)</FieldLabel>
          <TextArea id={id("description_ar")} name="description_ar" dir="rtl" rows={2} defaultValue={heading.description_ar} />
        </div>
        <div>
          <FieldLabel htmlFor={id("description_en")}>Description (English)</FieldLabel>
          <TextArea id={id("description_en")} name="description_en" rows={2} defaultValue={heading.description_en} />
        </div>
      </div>

      <FormActions>
        <SubmitButton>Save Heading</SubmitButton>
      </FormActions>
    </form>
  );
}

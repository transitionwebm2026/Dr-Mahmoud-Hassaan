"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import { TextInput } from "@/components/admin/ui/FormControls";
import type { SiteLinkItem } from "@/lib/supabase/types";

/**
 * Editable list of bilingual links (label AR/EN + href + visibility).
 * The whole list is serialized as JSON into a hidden input under `name`, so
 * the Server Action receives it as a single form field.
 */
export default function LinkListEditor({
  name,
  initialLinks,
  hrefPlaceholder = "/about",
}: {
  name: string;
  initialLinks: SiteLinkItem[];
  hrefPlaceholder?: string;
}) {
  const [links, setLinks] = useState<SiteLinkItem[]>(initialLinks);

  const update = (index: number, patch: Partial<SiteLinkItem>) =>
    setLinks((prev) => prev.map((link, i) => (i === index ? { ...link, ...patch } : link)));

  const move = (index: number, delta: number) =>
    setLinks((prev) => {
      const target = index + delta;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  const remove = (index: number) => setLinks((prev) => prev.filter((_, i) => i !== index));

  const add = () =>
    setLinks((prev) => [...prev, { label_ar: "", label_en: "", href: "", visible: true }]);

  const iconButton =
    "flex h-9 w-9 items-center justify-center rounded-lg border border-ink/10 bg-white/70 text-ink/60 transition hover:text-brand-700 disabled:opacity-30";

  return (
    <div className="space-y-3">
      <input type="hidden" name={name} value={JSON.stringify(links)} readOnly />

      {links.length === 0 && (
        <p className="rounded-xl border border-dashed border-ink/15 p-4 text-center text-sm text-ink/50">
          No links yet — add one below.
        </p>
      )}

      {links.map((link, index) => (
        <div
          key={index}
          className={`rounded-xl border border-ink/10 bg-white/50 p-3 transition ${link.visible ? "" : "opacity-50"}`}
        >
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <TextInput
              aria-label="Label (Arabic)"
              placeholder="الاسم بالعربي"
              dir="rtl"
              value={link.label_ar}
              onChange={(e) => update(index, { label_ar: e.target.value })}
            />
            <TextInput
              aria-label="Label (English)"
              placeholder="Label (English)"
              value={link.label_en}
              onChange={(e) => update(index, { label_en: e.target.value })}
            />
            <TextInput
              aria-label="Link"
              placeholder={hrefPlaceholder}
              dir="ltr"
              value={link.href}
              onChange={(e) => update(index, { href: e.target.value })}
            />
          </div>
          <div className="mt-2 flex items-center justify-end gap-1.5">
            <button type="button" className={iconButton} onClick={() => move(index, -1)} disabled={index === 0} aria-label="Move up">
              <ArrowUp className="h-4 w-4" />
            </button>
            <button
              type="button"
              className={iconButton}
              onClick={() => move(index, 1)}
              disabled={index === links.length - 1}
              aria-label="Move down"
            >
              <ArrowDown className="h-4 w-4" />
            </button>
            <button
              type="button"
              className={iconButton}
              onClick={() => update(index, { visible: !link.visible })}
              aria-label={link.visible ? "Hide" : "Show"}
              title={link.visible ? "Visible — click to hide" : "Hidden — click to show"}
            >
              {link.visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
            </button>
            <button
              type="button"
              className={`${iconButton} hover:!text-rose-600`}
              onClick={() => remove(index)}
              aria-label="Remove"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}

      <button type="button" onClick={add} className="btn-outline-glass inline-flex items-center gap-2 !px-4 !py-2 text-xs">
        <Plus className="h-3.5 w-3.5" />
        Add Link
      </button>
    </div>
  );
}

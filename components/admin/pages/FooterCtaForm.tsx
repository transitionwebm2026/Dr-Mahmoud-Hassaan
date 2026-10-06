"use client";

import { useActionState, useState } from "react";
import { FieldLabel, TextArea, TextInput, ToggleSwitch, SubmitButton, FormActions } from "@/components/admin/ui/FormControls";
import { MediaUploadField } from "@/components/admin/ui/MediaUploadField";
import { useActionFeedback } from "@/components/admin/ui/useActionFeedback";
import { updateFooterCta, type CrudActionState } from "@/app/admin/(protected)/pages/actions";
import { FOOTER_CTA_BUTTON_DEFAULTS, FOOTER_CTA_DEFAULTS } from "@/lib/footer-cta";
import type { PageHero } from "@/lib/supabase/types";

function ButtonFields({
  prefix,
  title,
  hint,
  visible,
  onVisibleChange,
  textAr,
  textEn,
  link,
  linkPlaceholder,
}: {
  prefix: "footer_cta_primary" | "footer_cta_secondary";
  title: string;
  hint: string;
  visible: boolean;
  onVisibleChange: (value: boolean) => void;
  textAr: string;
  textEn: string;
  link: string;
  linkPlaceholder: string;
}) {
  return (
    <div className="space-y-4 rounded-2xl border border-ink/10 bg-white/50 p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h4 className="text-sm font-extrabold text-ink">{title}</h4>
          <p className="text-xs text-ink/50">{hint}</p>
        </div>
        <ToggleSwitch name={`${prefix}_visible`} label="Show" checked={visible} onChange={onVisibleChange} />
      </div>
      <div className={`grid grid-cols-1 gap-4 sm:grid-cols-2 ${visible ? "" : "opacity-50"}`}>
        <div>
          <FieldLabel htmlFor={`${prefix}_text_ar`}>Button Text (Arabic)</FieldLabel>
          <TextInput id={`${prefix}_text_ar`} name={`${prefix}_text_ar`} dir="rtl" defaultValue={textAr} />
        </div>
        <div>
          <FieldLabel htmlFor={`${prefix}_text_en`}>Button Text (English)</FieldLabel>
          <TextInput id={`${prefix}_text_en`} name={`${prefix}_text_en`} defaultValue={textEn} />
        </div>
        <div className="sm:col-span-2">
          <FieldLabel htmlFor={`${prefix}_link`}>Button Link</FieldLabel>
          <TextInput id={`${prefix}_link`} name={`${prefix}_link`} dir="ltr" placeholder={linkPlaceholder} defaultValue={link} />
        </div>
      </div>
    </div>
  );
}

/**
 * Every part of a page's bottom call-to-action banner: visibility, title,
 * subtitle, background photo and both buttons. Starts from what the page
 * shows today (default copy fills any column that's still blank).
 */
export default function FooterCtaForm({ hero }: { hero: PageHero }) {
  const action = updateFooterCta.bind(null, hero.id, hero.page_slug);
  const [state, formAction, isPending] = useActionState<CrudActionState, FormData>(action, undefined);
  const [visible, setVisible] = useState(hero.footer_cta_visible !== false);
  const [primaryVisible, setPrimaryVisible] = useState(hero.footer_cta_primary_visible !== false);
  const [secondaryVisible, setSecondaryVisible] = useState(hero.footer_cta_secondary_visible !== false);

  useActionFeedback(state, isPending, "CTA banner saved.");

  const defaults = FOOTER_CTA_DEFAULTS[hero.page_slug] ?? FOOTER_CTA_DEFAULTS.home;

  return (
    <form action={formAction} className="glass-card space-y-5 p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-brand/5 p-4">
        <div>
          <p className="text-sm font-extrabold text-ink">Show this banner on the page</p>
          <p className="text-xs text-ink/50">
            The colored call-to-action box at the very bottom of the page, just above the footer.
            {hero.page_slug === "articles" && " Also shown at the end of every article."}
          </p>
        </div>
        <ToggleSwitch name="footer_cta_visible" label={visible ? "Shown" : "Hidden"} checked={visible} onChange={setVisible} />
      </div>

      <div className={`space-y-5 transition ${visible ? "" : "opacity-50"}`}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <FieldLabel htmlFor="footer_cta_title_ar" required>
              Title (Arabic)
            </FieldLabel>
            <TextInput
              id="footer_cta_title_ar"
              name="footer_cta_title_ar"
              dir="rtl"
              required
              defaultValue={hero.footer_cta_title_ar || defaults.title.ar}
            />
          </div>
          <div>
            <FieldLabel htmlFor="footer_cta_title_en" required>
              Title (English)
            </FieldLabel>
            <TextInput
              id="footer_cta_title_en"
              name="footer_cta_title_en"
              required
              defaultValue={hero.footer_cta_title_en || defaults.title.en}
            />
          </div>
          <div>
            <FieldLabel htmlFor="footer_cta_subtitle_ar">Subtitle (Arabic)</FieldLabel>
            <TextArea
              id="footer_cta_subtitle_ar"
              name="footer_cta_subtitle_ar"
              dir="rtl"
              rows={2}
              defaultValue={hero.footer_cta_subtitle_ar ?? defaults.subtitle.ar}
            />
          </div>
          <div>
            <FieldLabel htmlFor="footer_cta_subtitle_en">Subtitle (English)</FieldLabel>
            <TextArea
              id="footer_cta_subtitle_en"
              name="footer_cta_subtitle_en"
              rows={2}
              defaultValue={hero.footer_cta_subtitle_en ?? defaults.subtitle.en}
            />
          </div>
        </div>
        <p className="-mt-2 text-xs text-ink/40">Leave the subtitle empty to hide it.</p>

        <div>
          <MediaUploadField
            name="footer_cta_background_url"
            label="Background Photo (optional)"
            kind="image"
            folder="cta"
            defaultValue={hero.footer_cta_background_url}
          />
          <p className="mt-1.5 text-xs text-ink/40">Tinted with the brand color so the text stays readable. Empty = plain gradient.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ButtonFields
            prefix="footer_cta_primary"
            title="Button 1 — glass outline"
            hint="Empty link = calls the clinic phone."
            visible={primaryVisible}
            onVisibleChange={setPrimaryVisible}
            textAr={hero.footer_cta_primary_text_ar || FOOTER_CTA_BUTTON_DEFAULTS.primary.ar}
            textEn={hero.footer_cta_primary_text_en || FOOTER_CTA_BUTTON_DEFAULTS.primary.en}
            link={hero.footer_cta_primary_link ?? ""}
            linkPlaceholder="Clinic phone (from Contact page)"
          />
          <ButtonFields
            prefix="footer_cta_secondary"
            title="Button 2 — solid white"
            hint="Empty link = opens the clinic WhatsApp."
            visible={secondaryVisible}
            onVisibleChange={setSecondaryVisible}
            textAr={hero.footer_cta_secondary_text_ar || FOOTER_CTA_BUTTON_DEFAULTS.secondary.ar}
            textEn={hero.footer_cta_secondary_text_en || FOOTER_CTA_BUTTON_DEFAULTS.secondary.en}
            link={hero.footer_cta_secondary_link ?? ""}
            linkPlaceholder="Clinic WhatsApp (from Contact page)"
          />
        </div>
        <p className="-mt-2 text-xs text-ink/40">
          Links can be a page (<code>/contact</code>), a phone (<code>tel:+20…</code>), WhatsApp (
          <code>https://wa.me/20…</code>) or any web address. The button icon follows the link type.
        </p>
      </div>

      <FormActions>
        <SubmitButton>Save CTA Banner</SubmitButton>
      </FormActions>
    </form>
  );
}

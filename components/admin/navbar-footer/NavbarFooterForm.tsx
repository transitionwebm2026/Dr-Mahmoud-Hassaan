"use client";

import { useActionState, useState, type ReactNode } from "react";
import { FieldLabel, TextArea, TextInput, SubmitButton, ToggleSwitch } from "@/components/admin/ui/FormControls";
import { MediaUploadField } from "@/components/admin/ui/MediaUploadField";
import { useActionFeedback } from "@/components/admin/ui/useActionFeedback";
import LinkListEditor from "@/components/admin/navbar-footer/LinkListEditor";
import { saveNavbarFooterSettings, type NavbarFooterActionState } from "@/app/admin/(protected)/navbar-footer/actions";
import { DEFAULT_FOOTER_SERVICES, DEFAULT_NAV_LINKS, parseLinkList } from "@/lib/site-navigation";
import type { ClinicSettings } from "@/lib/supabase/types";

function Section({ title, description, children }: { title: string; description?: ReactNode; children: ReactNode }) {
  return (
    <div className="glass-card space-y-4 p-6">
      <div>
        <h3 className="text-base font-extrabold text-ink">{title}</h3>
        {description && <p className="text-sm text-ink/50">{description}</p>}
      </div>
      {children}
    </div>
  );
}

function BilingualField({
  name,
  label,
  settings,
  multiline,
  placeholder,
}: {
  name: string;
  label: string;
  settings: ClinicSettings;
  multiline?: boolean;
  placeholder?: { ar?: string; en?: string };
}) {
  const values = settings as unknown as Record<string, string | null | undefined>;
  const Field = multiline ? TextArea : TextInput;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <FieldLabel htmlFor={`${name}_ar`}>{label} (Arabic)</FieldLabel>
        <Field
          id={`${name}_ar`}
          name={`${name}_ar`}
          dir="rtl"
          rows={multiline ? 2 : undefined}
          placeholder={placeholder?.ar}
          defaultValue={values[`${name}_ar`] ?? ""}
        />
      </div>
      <div>
        <FieldLabel htmlFor={`${name}_en`}>{label} (English)</FieldLabel>
        <Field
          id={`${name}_en`}
          name={`${name}_en`}
          rows={multiline ? 2 : undefined}
          placeholder={placeholder?.en}
          defaultValue={values[`${name}_en`] ?? ""}
        />
      </div>
    </div>
  );
}

export default function NavbarFooterForm({ settings }: { settings: ClinicSettings }) {
  const action = saveNavbarFooterSettings.bind(null, settings.id);
  const [state, formAction, isPending] = useActionState<NavbarFooterActionState, FormData>(action, undefined);

  const [ctaVisible, setCtaVisible] = useState(settings.navbar_cta_visible !== false);
  const [showPhone, setShowPhone] = useState(settings.navbar_show_phone !== false);
  const [showSocial, setShowSocial] = useState(settings.footer_show_social !== false);

  const navLinks = parseLinkList(settings.navbar_links) ?? DEFAULT_NAV_LINKS;

  useActionFeedback(state, isPending, "Navbar & Footer settings saved.");

  return (
    <form action={formAction} className="space-y-6">
      <h2 className="pt-2 text-lg font-extrabold text-brand-700">Brand (Navbar & Footer)</h2>

      <Section title="Logo & Name" description="Shown at the start of the navbar and at the top of the footer.">
        <MediaUploadField name="logo_url" label="Logo" kind="image" folder="branding" defaultValue={settings.logo_url} />
        <p className="-mt-2 text-xs text-ink/40">Leave empty to use the default logo.</p>
        <BilingualField name="brand_name" label="Name" settings={settings} />
        <BilingualField name="brand_subtitle" label="Subtitle under the name (navbar)" settings={settings} />
      </Section>

      <h2 className="pt-2 text-lg font-extrabold text-brand-700">Navbar</h2>

      <Section
        title="Navbar Links"
        description="The page links in the top menu (also used on mobile). Reorder with the arrows, hide with the eye icon."
      >
        <LinkListEditor name="navbar_links" initialLinks={navLinks} />
      </Section>

      <Section title="Navbar Button" description='The primary button, e.g. "Book a Visit". Leave fields blank for the default copy linking to /contact.'>
        <ToggleSwitch name="navbar_cta_visible" label="Show button" checked={ctaVisible} onChange={setCtaVisible} />
        <BilingualField name="navbar_cta_text" label="Button Text" settings={settings} />
        <div>
          <FieldLabel htmlFor="navbar_cta_link">Button Link</FieldLabel>
          <TextInput id="navbar_cta_link" name="navbar_cta_link" dir="ltr" placeholder="/contact" defaultValue={settings.navbar_cta_link ?? ""} />
        </div>
      </Section>

      <Section title="Mobile Menu" description="The phone number comes from the Contact page's clinic info.">
        <ToggleSwitch name="navbar_show_phone" label="Show phone number in mobile menu" checked={showPhone} onChange={setShowPhone} />
      </Section>

      <h2 className="pt-2 text-lg font-extrabold text-brand-700">Footer</h2>

      <Section
        title="About Column"
        description="Tagline under the logo. Leave blank to fall back to the doctor's full title. Social links themselves are edited on the Contact page."
      >
        <BilingualField name="footer_tagline" label="Tagline" settings={settings} multiline />
        <ToggleSwitch name="footer_show_social" label="Show social media icons" checked={showSocial} onChange={setShowSocial} />
      </Section>

      <Section title="Quick Links Column">
        <BilingualField name="footer_quicklinks_title" label="Column Title" settings={settings} />
        <LinkListEditor
          name="footer_quicklinks"
          initialLinks={parseLinkList(settings.footer_quicklinks) ?? navLinks}
        />
      </Section>

      <Section title="Key Services Column">
        <BilingualField name="footer_services_title" label="Column Title" settings={settings} />
        <LinkListEditor
          name="footer_services"
          hrefPlaceholder="/services"
          initialLinks={parseLinkList(settings.footer_services) ?? DEFAULT_FOOTER_SERVICES}
        />
      </Section>

      <Section
        title="Contact Info Column"
        description="Address, phone and email are shared site-wide and edited on the Contact page. Only the column title is set here."
      >
        <BilingualField name="footer_contact_title" label="Column Title" settings={settings} />
      </Section>

      <Section title="Bottom Bar" description="The current year is added automatically before the copyright text.">
        <BilingualField
          name="footer_copyright"
          label="Copyright Text"
          settings={settings}
          placeholder={{ ar: "د. محمود حسان — جميع الحقوق محفوظة", en: "Dr. Mahmoud Hassan — All rights reserved" }}
        />
        <BilingualField name="footer_disclaimer" label="Disclaimer" settings={settings} multiline />
      </Section>

      <div className="sticky bottom-4 flex justify-end">
        <SubmitButton>Save Settings</SubmitButton>
      </div>
    </form>
  );
}

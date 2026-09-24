"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { parseLinkList } from "@/lib/site-navigation";

export type NavbarFooterActionState = { error?: string } | undefined;

// Scoped to just the navbar/footer columns on the clinic_settings singleton
// row, so saving this form never touches address/phone/social — those stay
// owned by the Contact page's "Clinic Info & Map" form.
export async function saveNavbarFooterSettings(
  id: string,
  _prevState: NavbarFooterActionState,
  formData: FormData
): Promise<NavbarFooterActionState> {
  const field = (name: string) => String(formData.get(name) ?? "").trim() || null;
  const checkbox = (name: string) => formData.get(name) === "on";
  const linkList = (name: string) => {
    try {
      return parseLinkList(JSON.parse(String(formData.get(name) ?? "null")));
    } catch {
      return null;
    }
  };

  const payload = {
    logo_url: field("logo_url"),
    brand_name_ar: field("brand_name_ar"),
    brand_name_en: field("brand_name_en"),
    brand_subtitle_ar: field("brand_subtitle_ar"),
    brand_subtitle_en: field("brand_subtitle_en"),
    navbar_links: linkList("navbar_links"),
    navbar_cta_visible: checkbox("navbar_cta_visible"),
    navbar_cta_text_ar: field("navbar_cta_text_ar"),
    navbar_cta_text_en: field("navbar_cta_text_en"),
    navbar_cta_link: field("navbar_cta_link"),
    navbar_show_phone: checkbox("navbar_show_phone"),
    footer_tagline_ar: field("footer_tagline_ar"),
    footer_tagline_en: field("footer_tagline_en"),
    footer_show_social: checkbox("footer_show_social"),
    footer_quicklinks_title_ar: field("footer_quicklinks_title_ar"),
    footer_quicklinks_title_en: field("footer_quicklinks_title_en"),
    footer_quicklinks: linkList("footer_quicklinks"),
    footer_services_title_ar: field("footer_services_title_ar"),
    footer_services_title_en: field("footer_services_title_en"),
    footer_services: linkList("footer_services"),
    footer_contact_title_ar: field("footer_contact_title_ar"),
    footer_contact_title_en: field("footer_contact_title_en"),
    footer_copyright_ar: field("footer_copyright_ar"),
    footer_copyright_en: field("footer_copyright_en"),
    footer_disclaimer_ar: field("footer_disclaimer_ar"),
    footer_disclaimer_en: field("footer_disclaimer_en"),
  };

  const supabase = await createClient();
  const { error } = await supabase.from("clinic_settings").update(payload).eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/admin/navbar-footer");
  revalidatePath("/", "layout");
  return undefined;
}

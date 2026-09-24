import { CONTACT, SOCIAL_LINKS } from "@/lib/constants";
import type { ClinicSettings } from "@/lib/supabase/types";

/**
 * Resolves the site's contact details (phone, email, address, social links)
 * from admin-editable `clinic_settings`, falling back to the placeholder
 * constants in lib/constants.ts wherever a field hasn't been set yet.
 *
 * Shared by Navbar, Footer, and Hero's contact panel so all three always
 * show the exact same phone number and social links instead of drifting
 * out of sync with their own independent hardcoded copies.
 */
export function getContactInfo(settings: ClinicSettings | null) {
  const phoneDisplay = settings?.emergency_line || settings?.phone_primary || CONTACT.phoneDisplay;
  const phoneHref = phoneDisplay === CONTACT.phoneDisplay ? CONTACT.phoneHref : `tel:${phoneDisplay.replace(/[^\d+]/g, "")}`;

  return {
    phoneDisplay,
    phoneHref,
    email: settings?.email || CONTACT.email,
    addressAr: settings?.address_ar || CONTACT.address.ar,
    addressEn: settings?.address_en || CONTACT.address.en,
    instagramUrl: settings?.instagram_url || SOCIAL_LINKS.instagram,
    facebookUrl: settings?.facebook_url || SOCIAL_LINKS.facebook,
    tiktokUrl: settings?.tiktok_url || SOCIAL_LINKS.tiktok,
  };
}

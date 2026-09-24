import { DOCTOR, NAV_LINKS } from "@/lib/constants";
import type { Lang } from "@/lib/i18n";
import type { ClinicSettings, SiteLinkItem } from "@/lib/supabase/types";

export const DEFAULT_LOGO_URL = "/images/logo-icon.png";

export const DEFAULT_NAV_LINKS: SiteLinkItem[] = NAV_LINKS.map((link) => ({
  label_ar: link.label.ar,
  label_en: link.label.en,
  href: link.href,
  visible: true,
}));

export const DEFAULT_FOOTER_SERVICES: SiteLinkItem[] = [
  { label_ar: "جراحة أورام الثدي", label_en: "Breast Cancer Surgery", href: "/services", visible: true },
  { label_ar: "جراحة أورام الجهاز الهضمي", label_en: "GI Oncology Surgery", href: "/services", visible: true },
  { label_ar: "جراحة الأورام بالمنظار", label_en: "Laparoscopic Oncology Surgery", href: "/services", visible: true },
  { label_ar: "استشارات ما بعد الجراحة", label_en: "Post-Op Consultations", href: "/services", visible: true },
];

/**
 * Coerces an untrusted value (a jsonb column, or JSON posted from the admin
 * form) into a clean link list. Returns null when it isn't an array at all,
 * so callers can fall back to their defaults.
 */
export function parseLinkList(value: unknown): SiteLinkItem[] | null {
  if (!Array.isArray(value)) return null;
  return value
    .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
    .map((item) => ({
      label_ar: String(item.label_ar ?? "").trim(),
      label_en: String(item.label_en ?? "").trim(),
      href: String(item.href ?? "").trim(),
      visible: item.visible !== false,
    }))
    .filter((item) => item.href && (item.label_ar || item.label_en));
}

const visibleOnly = (links: SiteLinkItem[]) => links.filter((link) => link.visible);

/**
 * Resolves everything the Navbar and Footer render from admin-editable
 * `clinic_settings`, falling back to the original hardcoded content for any
 * field that hasn't been set (or before migration 0010 has been applied).
 */
export function getSiteChrome(settings: ClinicSettings | null) {
  const navLinks = parseLinkList(settings?.navbar_links) ?? DEFAULT_NAV_LINKS;

  return {
    logoUrl: settings?.logo_url || DEFAULT_LOGO_URL,
    brandName: {
      ar: settings?.brand_name_ar || DOCTOR.name.ar,
      en: settings?.brand_name_en || DOCTOR.name.en,
    },
    brandSubtitle: {
      ar: settings?.brand_subtitle_ar || DOCTOR.shortTitle.ar,
      en: settings?.brand_subtitle_en || DOCTOR.shortTitle.en,
    },
    navLinks: visibleOnly(navLinks),
    showNavbarCta: settings?.navbar_cta_visible !== false,
    showNavbarPhone: settings?.navbar_show_phone !== false,
    footerQuickLinks: visibleOnly(parseLinkList(settings?.footer_quicklinks) ?? navLinks),
    footerServices: visibleOnly(parseLinkList(settings?.footer_services) ?? DEFAULT_FOOTER_SERVICES),
    showFooterSocial: settings?.footer_show_social !== false,
  };
}

/** Label of a SiteLinkItem in the given language, falling back to the other one. */
export function linkLabel(link: SiteLinkItem, lang: Lang) {
  return lang === "ar" ? link.label_ar || link.label_en : link.label_en || link.label_ar;
}

import type { Bilingual } from "@/lib/i18n";
import type { ClinicSettings, PageHero } from "@/lib/supabase/types";
import { toBilingual } from "@/lib/supabase/content";
import { getContactInfo } from "@/lib/site-contact";

/**
 * The bottom call-to-action banner shown on every page. Its content lives on
 * that page's `pages_hero` row (footer_cta_* columns, edited from the
 * "Bottom CTA Banner" block of the admin page editor); the copy below is
 * what each page shipped with and fills any column still left blank.
 */
export interface FooterCtaButton {
  label: Bilingual;
  href: string;
}

export interface FooterCtaContent {
  title: Bilingual;
  subtitle?: Bilingual;
  backgroundUrl?: string;
  primary?: FooterCtaButton;
  secondary?: FooterCtaButton;
}

const GENERIC_COPY = {
  title: { ar: "مستعد لبدء رحلة علاجك؟", en: "Ready to start your treatment journey?" },
  subtitle: {
    ar: "تواصل مع عيادة د. محمود حسان اليوم لحجز استشارتك والحصول على خطة علاجية مخصصة لحالتك.",
    en: "Reach out to Dr. Mahmoud Hassan's clinic today to book your consultation and get a treatment plan tailored to your case.",
  },
};

export const FOOTER_CTA_DEFAULTS: Record<string, { title: Bilingual; subtitle: Bilingual }> = {
  home: GENERIC_COPY,
  about: {
    title: { ar: "هل لديك سؤال للدكتور محمود حسان؟", en: "Have a question for Dr. Mahmoud Hassan?" },
    subtitle: {
      ar: "تواصل معنا اليوم وسيسعد فريقنا بالرد على استفساراتك وحجز موعدك.",
      en: "Reach out today — our team is happy to answer your questions and book your visit.",
    },
  },
  services: {
    title: { ar: "جاهز لبدء خطة علاجك؟", en: "Ready to start your treatment plan?" },
    subtitle: {
      ar: "تواصل معنا اليوم لحجز استشارتك ومناقشة أنسب خطة جراحية لحالتك.",
      en: "Reach out today to book your consultation and discuss the right surgical plan for your case.",
    },
  },
  videos: {
    title: { ar: "هل تريد استشارة شخصية؟", en: "Want a personal consultation?" },
    subtitle: {
      ar: "الفيديوهات نقطة بداية — تواصل معنا للحصول على إجابات تخص حالتك تحديدًا.",
      en: "These videos are a starting point — reach out for answers specific to your case.",
    },
  },
  articles: {
    title: { ar: "لديك سؤال بعد القراءة؟", en: "Have a question after reading?" },
    subtitle: {
      ar: "فريقنا جاهز للإجابة عن استفساراتك وحجز استشارتك.",
      en: "Our team is ready to answer your questions and book your consultation.",
    },
  },
  reviews: {
    title: { ar: "هل خضعت للعلاج معنا؟ شاركنا تجربتك", en: "Been treated with us? Share your experience" },
    subtitle: {
      ar: "رأيك يساعد مرضى آخرين على اتخاذ قرارهم بثقة، وتواصلنا معك مستمر بعد التعافي.",
      en: "Your feedback helps other patients decide with confidence — and our support continues well after recovery.",
    },
  },
  contact: {
    title: { ar: "لا تزال لديك أسئلة؟", en: "Still have questions?" },
    subtitle: {
      ar: "فريقنا على استعداد للرد فورًا — اختر الطريقة الأنسب لك للتواصل معنا.",
      en: "Our team is ready to respond right away — pick whichever way works best for you.",
    },
  },
};

export const FOOTER_CTA_BUTTON_DEFAULTS = {
  primary: { ar: "اتصل بنا", en: "Contact Us" },
  secondary: { ar: "واتساب", en: "WhatsApp" },
} satisfies Record<string, Bilingual>;

/**
 * The banner's content for one page, or `null` when the admin has hidden it.
 * Blank button links fall back to the clinic phone / WhatsApp number from the
 * Contact page's clinic info, so they follow that number when it changes.
 */
export function resolveFooterCta(
  slug: string,
  hero: PageHero | null | undefined,
  settings: ClinicSettings | null | undefined
): FooterCtaContent | null {
  if (hero?.footer_cta_visible === false) return null;

  const defaults = FOOTER_CTA_DEFAULTS[slug] ?? GENERIC_COPY;
  const contact = getContactInfo(settings ?? null);
  // A subtitle the admin cleared is stored as '' (hidden); null means "never set".
  const subtitleUnset = hero?.footer_cta_subtitle_ar == null && hero?.footer_cta_subtitle_en == null;

  return {
    title: toBilingual(hero?.footer_cta_title_ar, hero?.footer_cta_title_en) ?? defaults.title,
    subtitle: subtitleUnset ? defaults.subtitle : toBilingual(hero?.footer_cta_subtitle_ar, hero?.footer_cta_subtitle_en),
    backgroundUrl: hero?.footer_cta_background_url || undefined,
    primary:
      hero?.footer_cta_primary_visible === false
        ? undefined
        : {
            label:
              toBilingual(hero?.footer_cta_primary_text_ar, hero?.footer_cta_primary_text_en) ??
              FOOTER_CTA_BUTTON_DEFAULTS.primary,
            href: hero?.footer_cta_primary_link || contact.phoneHref,
          },
    secondary:
      hero?.footer_cta_secondary_visible === false
        ? undefined
        : {
            label:
              toBilingual(hero?.footer_cta_secondary_text_ar, hero?.footer_cta_secondary_text_en) ??
              FOOTER_CTA_BUTTON_DEFAULTS.secondary,
            href: hero?.footer_cta_secondary_link || contact.whatsappHref,
          },
  };
}

-- ============================================================================
-- Full admin control over each page's bottom CTA banner.
--
-- 0002 added only the banner's title and subtitle (footer_cta_title_* /
-- footer_cta_subtitle_*, backfilled per page in 0006). Everything else was
-- hardcoded in components/FooterCTA.tsx:
--   * whether the banner is shown at all
--   * both buttons' text, link and visibility — and the links pointed at the
--     placeholder phone/WhatsApp numbers in lib/constants.ts, not the clinic
--     numbers entered on the Contact page
--   * the background (always the plain brand gradient)
--
-- A blank button link means "use the clinic phone (button 1) / WhatsApp
-- (button 2) from clinic_settings", so the buttons follow that number when it
-- changes. A subtitle saved as '' is hidden; null falls back to the default.
-- ============================================================================

alter table public.pages_hero
  add column if not exists footer_cta_visible boolean not null default true,
  add column if not exists footer_cta_background_url text,
  add column if not exists footer_cta_primary_visible boolean not null default true,
  add column if not exists footer_cta_primary_text_ar text,
  add column if not exists footer_cta_primary_text_en text,
  add column if not exists footer_cta_primary_link text,
  add column if not exists footer_cta_secondary_visible boolean not null default true,
  add column if not exists footer_cta_secondary_text_ar text,
  add column if not exists footer_cta_secondary_text_en text,
  add column if not exists footer_cta_secondary_link text;

comment on column public.pages_hero.footer_cta_visible is 'Show the bottom CTA banner on this page.';
comment on column public.pages_hero.footer_cta_background_url is 'Optional photo behind the CTA banner (tinted with the brand gradient). Null = plain gradient.';
comment on column public.pages_hero.footer_cta_primary_link is 'CTA button 1 link. Null = clinic phone from clinic_settings.';
comment on column public.pages_hero.footer_cta_secondary_link is 'CTA button 2 link. Null = clinic WhatsApp from clinic_settings.';

-- Backfill the button text the site shows today, so the admin form starts
-- from the live copy instead of empty fields.
update public.pages_hero set
  footer_cta_primary_text_ar = coalesce(footer_cta_primary_text_ar, 'اتصل بنا'),
  footer_cta_primary_text_en = coalesce(footer_cta_primary_text_en, 'Contact Us'),
  footer_cta_secondary_text_ar = coalesce(footer_cta_secondary_text_ar, 'واتساب'),
  footer_cta_secondary_text_en = coalesce(footer_cta_secondary_text_en, 'WhatsApp');

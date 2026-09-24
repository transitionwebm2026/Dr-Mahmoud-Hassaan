-- ============================================================================
-- Navbar & Footer become admin-controllable.
--
-- Two problems this fixes:
--   1. Navbar.tsx and Footer.tsx (rendered on every page) never read
--      clinic_settings at all — they hardcode lib/constants.ts's CONTACT
--      and SOCIAL_LINKS placeholders, so editing address/phone/social links
--      in the admin's existing "Clinic Info & Map" form (Contact page) had
--      zero effect on the navbar or footer.
--   2. The footer's tagline and legal disclaimer text, the navbar's CTA
--      button label/link, and the footer's three column headings had no
--      backing column at all — purely hardcoded JSX with no admin field.
--   3. Hero.tsx's own contact panel (phone + social icons, shown on every
--      page) hardcoded a second, independent copy of the same placeholder
--      data instead of sharing the Footer/Navbar's source, so the two could
--      drift out of sync.
-- ============================================================================

alter table public.clinic_settings
  add column if not exists email text,
  add column if not exists navbar_cta_text_ar text,
  add column if not exists navbar_cta_text_en text,
  add column if not exists navbar_cta_link text,
  add column if not exists footer_tagline_ar text,
  add column if not exists footer_tagline_en text,
  add column if not exists footer_disclaimer_ar text,
  add column if not exists footer_disclaimer_en text,
  add column if not exists footer_quicklinks_title_ar text,
  add column if not exists footer_quicklinks_title_en text,
  add column if not exists footer_services_title_ar text,
  add column if not exists footer_services_title_en text,
  add column if not exists footer_contact_title_ar text,
  add column if not exists footer_contact_title_en text;

comment on column public.clinic_settings.email is 'Contact email shown in the footer (and anywhere else CONTACT.email previously was).';
comment on column public.clinic_settings.navbar_cta_text_ar is 'Navbar primary button label. Leave blank to use the default "Book a Visit" copy.';
comment on column public.clinic_settings.navbar_cta_link is 'Navbar primary button link. Leave blank to default to /contact.';
comment on column public.clinic_settings.footer_tagline_ar is 'Short line under the logo in the footer. Leave blank to fall back to the doctor''s title.';
comment on column public.clinic_settings.footer_disclaimer_ar is 'Small print at the bottom of the footer. Leave blank to use the default medical disclaimer copy.';
comment on column public.clinic_settings.footer_quicklinks_title_ar is 'Heading of the footer''s "Quick Links" column.';
comment on column public.clinic_settings.footer_services_title_ar is 'Heading of the footer''s "Key Services" column.';
comment on column public.clinic_settings.footer_contact_title_ar is 'Heading of the footer''s "Contact Info" column.';

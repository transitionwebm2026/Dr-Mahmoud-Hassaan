-- ============================================================================
-- Full admin control over the Navbar & Footer.
--
-- 0008 only covered the CTA button text, the footer tagline/disclaimer and
-- the column headings. Everything else in the header/footer was still
-- hardcoded in lib/constants.ts or the components themselves:
--   * the brand block (logo, doctor name, short subtitle) in both
--   * the navbar's link list (labels, order, which pages are shown)
--   * the footer's "Quick Links" and "Key Services" link lists
--   * the copyright line
--   * whether the CTA button / mobile-menu phone / social icons are shown
--
-- Link lists are stored as jsonb arrays of
--   { "label_ar": text, "label_en": text, "href": text, "visible": bool }
-- so the admin can add, remove, reorder and hide entries freely.
-- ============================================================================

alter table public.clinic_settings
  add column if not exists brand_name_ar text,
  add column if not exists brand_name_en text,
  add column if not exists brand_subtitle_ar text,
  add column if not exists brand_subtitle_en text,
  add column if not exists logo_url text,
  add column if not exists navbar_links jsonb,
  add column if not exists navbar_cta_visible boolean not null default true,
  add column if not exists navbar_show_phone boolean not null default true,
  add column if not exists footer_quicklinks jsonb,
  add column if not exists footer_services jsonb,
  add column if not exists footer_copyright_ar text,
  add column if not exists footer_copyright_en text,
  add column if not exists footer_show_social boolean not null default true;

comment on column public.clinic_settings.brand_name_ar is 'Name shown next to the logo in the navbar and footer (and in the copyright line).';
comment on column public.clinic_settings.brand_subtitle_ar is 'Short line under the name in the navbar.';
comment on column public.clinic_settings.logo_url is 'Logo image for navbar and footer. Blank = /images/logo-icon.png.';
comment on column public.clinic_settings.navbar_links is 'Navbar links: [{label_ar,label_en,href,visible}]. Null = default site pages.';
comment on column public.clinic_settings.footer_quicklinks is 'Footer "Quick Links" column: [{label_ar,label_en,href,visible}]. Null = same as default navbar links.';
comment on column public.clinic_settings.footer_services is 'Footer "Key Services" column: [{label_ar,label_en,href,visible}].';
comment on column public.clinic_settings.footer_copyright_ar is 'Text after "© {year}" in the footer bottom bar.';

-- Backfill with exactly what the site shows today, so the admin form starts
-- from the live content instead of empty fields.
update public.clinic_settings set
  brand_name_ar = coalesce(brand_name_ar, 'د. محمود حسان'),
  brand_name_en = coalesce(brand_name_en, 'Dr. Mahmoud Hassan'),
  brand_subtitle_ar = coalesce(brand_subtitle_ar, 'استشاري جراحة الأورام'),
  brand_subtitle_en = coalesce(brand_subtitle_en, 'Consultant Surgical Oncologist'),
  footer_copyright_ar = coalesce(footer_copyright_ar, 'د. محمود حسان — جميع الحقوق محفوظة'),
  footer_copyright_en = coalesce(footer_copyright_en, 'Dr. Mahmoud Hassan — All rights reserved'),
  navbar_links = coalesce(navbar_links, '[
    {"label_ar":"الرئيسية","label_en":"Home","href":"/","visible":true},
    {"label_ar":"عن الدكتور","label_en":"About","href":"/about","visible":true},
    {"label_ar":"الخدمات","label_en":"Services","href":"/services","visible":true},
    {"label_ar":"الفيديوهات","label_en":"Videos","href":"/videos","visible":true},
    {"label_ar":"المقالات","label_en":"Articles","href":"/articles","visible":true},
    {"label_ar":"آراء المرضى","label_en":"Reviews","href":"/reviews","visible":true},
    {"label_ar":"تواصل معنا","label_en":"Contact","href":"/contact","visible":true}
  ]'::jsonb),
  footer_quicklinks = coalesce(footer_quicklinks, '[
    {"label_ar":"الرئيسية","label_en":"Home","href":"/","visible":true},
    {"label_ar":"عن الدكتور","label_en":"About","href":"/about","visible":true},
    {"label_ar":"الخدمات","label_en":"Services","href":"/services","visible":true},
    {"label_ar":"الفيديوهات","label_en":"Videos","href":"/videos","visible":true},
    {"label_ar":"المقالات","label_en":"Articles","href":"/articles","visible":true},
    {"label_ar":"آراء المرضى","label_en":"Reviews","href":"/reviews","visible":true},
    {"label_ar":"تواصل معنا","label_en":"Contact","href":"/contact","visible":true}
  ]'::jsonb),
  footer_services = coalesce(footer_services, '[
    {"label_ar":"جراحة أورام الثدي","label_en":"Breast Cancer Surgery","href":"/services","visible":true},
    {"label_ar":"جراحة أورام الجهاز الهضمي","label_en":"GI Oncology Surgery","href":"/services","visible":true},
    {"label_ar":"جراحة الأورام بالمنظار","label_en":"Laparoscopic Oncology Surgery","href":"/services","visible":true},
    {"label_ar":"استشارات ما بعد الجراحة","label_en":"Post-Op Consultations","href":"/services","visible":true}
  ]'::jsonb);

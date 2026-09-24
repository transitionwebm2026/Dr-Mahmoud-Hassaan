-- ============================================================================
-- Backfill the Navbar & Footer text fields added in 0008 with the copy
-- that's already effectively live on the site via hardcoded fallbacks, so
-- the admin form isn't blank and editing it starts from real content
-- instead of nothing.
--
-- Deliberately NOT included here: phone_primary, email, whatsapp_number,
-- facebook_url, instagram_url, tiktok_url. Those still fall back to
-- lib/constants.ts's CONTACT/SOCIAL_LINKS placeholders, which the code
-- comments explicitly flag as fake development values — copying them into
-- the database would make them look like real saved settings instead of
-- values that still need to be replaced with the practice's actual details.
-- ============================================================================

update public.clinic_settings set
  navbar_cta_text_ar = 'حجز كشف',
  navbar_cta_text_en = 'Book a Visit',
  navbar_cta_link = '/contact',
  footer_tagline_ar = 'مدرس واستشاري جراحة الأورام بالمعهد القومي للأورام - جامعة القاهرة - عضو الجمعية المصرية لجراحة الأورام',
  footer_tagline_en = 'Lecturer & Consultant of Surgical Oncology — National Cancer Institute, Cairo University | Member of the Egyptian Society of Surgical Oncology',
  footer_quicklinks_title_ar = 'روابط سريعة',
  footer_quicklinks_title_en = 'Quick Links',
  footer_services_title_ar = 'أبرز الخدمات',
  footer_services_title_en = 'Key Services',
  footer_contact_title_ar = 'معلومات التواصل',
  footer_contact_title_en = 'Contact Info',
  footer_disclaimer_ar = 'المحتوى الطبي لأغراض تعريفية ولا يغني عن استشارة الطبيب',
  footer_disclaimer_en = 'Medical content is for informational purposes and does not replace professional consultation'
where navbar_cta_text_ar is null and navbar_cta_text_en is null;

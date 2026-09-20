-- ============================================================================
-- The About page's "Message From the Doctor" card has its own dedicated
-- photo slot in the layout, separate from the Hero section's background
-- photo (pages_hero.background_image_url / doctor_profile.main_image_url).
-- There was previously no column for it at all — the component just pointed
-- at a static file (/images/about-doctor.jpg) that was never supplied, so
-- the card always showed the placeholder icon no matter what image the
-- admin uploaded elsewhere.
-- ============================================================================

alter table public.doctor_profile
  add column if not exists message_image_url text;

comment on column public.doctor_profile.message_image_url is 'Photo shown in the About page "Message From the Doctor" card — distinct from main_image_url (used for the Hero background).';

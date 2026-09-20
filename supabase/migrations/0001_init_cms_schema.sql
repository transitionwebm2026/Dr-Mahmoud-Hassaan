-- ============================================================================
-- Dr. Mahmoud Hassan — CMS schema + Row Level Security
-- Run once against the project (Supabase SQL Editor, `supabase db push`,
-- or the Supabase MCP `apply_migration` tool).
--
-- Access model:
--   * Public (anon) role: read-only SELECT on published content.
--   * Authenticated role: any signed-in Supabase Auth user is treated as an
--     admin (this project has no public sign-up flow — admin accounts are
--     created by hand in the Supabase Dashboard / Auth API), and gets full
--     INSERT/UPDATE/DELETE + SELECT-of-drafts on every content table.
--   * contact_appointments is the one exception: it holds patient PII, so
--     the public may only INSERT (submit the form). Only admins may read,
--     update, or delete rows.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ----------------------------------------------------------------------------
-- Shared helper: keep `updated_at` current on every UPDATE.
-- ----------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ============================================================================
-- 1. doctor_profile — singleton row with the doctor's bio/credentials.
-- ============================================================================
create table public.doctor_profile (
  id uuid primary key default gen_random_uuid(),
  name_ar text not null default '',
  name_en text not null default '',
  title_ar text not null default '',
  title_en text not null default '',
  short_title_ar text not null default '',
  short_title_en text not null default '',
  bio_ar text not null default '',
  bio_en text not null default '',
  years_experience integer not null default 0,
  successful_operations integer not null default 0,
  cured_patients integer not null default 0,
  main_image_url text,
  intro_video_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.doctor_profile is 'Singleton row: doctor name, bio, credentials, stats, media.';

create trigger set_updated_at before update on public.doctor_profile
  for each row execute function public.set_updated_at();

alter table public.doctor_profile enable row level security;

create policy "doctor_profile_public_read"
  on public.doctor_profile for select
  to anon, authenticated
  using (true);

create policy "doctor_profile_admin_write"
  on public.doctor_profile for all
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- ============================================================================
-- 2. pages_hero — one hero section per page slug.
-- ============================================================================
create table public.pages_hero (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null unique,
  title_ar text not null default '',
  title_en text not null default '',
  subtitle_ar text not null default '',
  subtitle_en text not null default '',
  background_image_url text,
  cta_primary_text_ar text,
  cta_primary_text_en text,
  cta_primary_link text,
  cta_secondary_text_ar text,
  cta_secondary_text_en text,
  cta_secondary_link text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on column public.pages_hero.page_slug is 'e.g. home, about, services, videos, articles, reviews, contact';

create trigger set_updated_at before update on public.pages_hero
  for each row execute function public.set_updated_at();

alter table public.pages_hero enable row level security;

create policy "pages_hero_public_read"
  on public.pages_hero for select
  to anon, authenticated
  using (true);

create policy "pages_hero_admin_write"
  on public.pages_hero for all
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- ============================================================================
-- 3. surgeries_services
-- ============================================================================
create table public.surgeries_services (
  id uuid primary key default gen_random_uuid(),
  title_ar text not null default '',
  title_en text not null default '',
  specialty_category_ar text not null default '',
  specialty_category_en text not null default '',
  short_description_ar text not null default '',
  short_description_en text not null default '',
  detailed_breakdown_ar text not null default '',
  detailed_breakdown_en text not null default '',
  image_url text,
  order_index integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index surgeries_services_order_idx on public.surgeries_services (order_index);

create trigger set_updated_at before update on public.surgeries_services
  for each row execute function public.set_updated_at();

alter table public.surgeries_services enable row level security;

create policy "surgeries_services_public_read"
  on public.surgeries_services for select
  to anon, authenticated
  using (is_published = true or auth.uid() is not null);

create policy "surgeries_services_admin_write"
  on public.surgeries_services for all
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- ============================================================================
-- 4. treatments
-- ============================================================================
create table public.treatments (
  id uuid primary key default gen_random_uuid(),
  disease_name_ar text not null default '',
  disease_name_en text not null default '',
  treatment_overview_ar text not null default '',
  treatment_overview_en text not null default '',
  details_ar text not null default '',
  details_en text not null default '',
  image_url text,
  order_index integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index treatments_order_idx on public.treatments (order_index);

create trigger set_updated_at before update on public.treatments
  for each row execute function public.set_updated_at();

alter table public.treatments enable row level security;

create policy "treatments_public_read"
  on public.treatments for select
  to anon, authenticated
  using (is_published = true or auth.uid() is not null);

create policy "treatments_admin_write"
  on public.treatments for all
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- ============================================================================
-- 5. why_doctor — feature points
-- ============================================================================
create table public.why_doctor (
  id uuid primary key default gen_random_uuid(),
  title_ar text not null default '',
  title_en text not null default '',
  description_ar text not null default '',
  description_en text not null default '',
  icon_tag text not null default '',
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index why_doctor_order_idx on public.why_doctor (order_index);

create trigger set_updated_at before update on public.why_doctor
  for each row execute function public.set_updated_at();

alter table public.why_doctor enable row level security;

create policy "why_doctor_public_read"
  on public.why_doctor for select
  to anon, authenticated
  using (true);

create policy "why_doctor_admin_write"
  on public.why_doctor for all
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- ============================================================================
-- 6. patient_journey — numbered steps
-- ============================================================================
create table public.patient_journey (
  id uuid primary key default gen_random_uuid(),
  step_number integer not null,
  title_ar text not null default '',
  title_en text not null default '',
  description_ar text not null default '',
  description_en text not null default '',
  icon_url text,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index patient_journey_order_idx on public.patient_journey (order_index);

create trigger set_updated_at before update on public.patient_journey
  for each row execute function public.set_updated_at();

alter table public.patient_journey enable row level security;

create policy "patient_journey_public_read"
  on public.patient_journey for select
  to anon, authenticated
  using (true);

create policy "patient_journey_admin_write"
  on public.patient_journey for all
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- ============================================================================
-- 7. reviews
-- ============================================================================
create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  patient_name text not null default '',
  surgical_procedure_ar text not null default '',
  surgical_procedure_en text not null default '',
  rating smallint not null check (rating between 1 and 5),
  review_text_ar text not null default '',
  review_text_en text not null default '',
  review_date date not null default current_date,
  is_verified boolean not null default false,
  video_url text,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index reviews_date_idx on public.reviews (review_date desc);

create trigger set_updated_at before update on public.reviews
  for each row execute function public.set_updated_at();

alter table public.reviews enable row level security;

create policy "reviews_public_read"
  on public.reviews for select
  to anon, authenticated
  using (is_published = true or auth.uid() is not null);

create policy "reviews_admin_write"
  on public.reviews for all
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- ============================================================================
-- 8. videos
-- ============================================================================
create table public.videos (
  id uuid primary key default gen_random_uuid(),
  title_ar text not null default '',
  title_en text not null default '',
  description_ar text not null default '',
  description_en text not null default '',
  category_ar text not null default '',
  category_en text not null default '',
  thumbnail_url text,
  video_url text not null default '',
  order_index integer not null default 0,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index videos_order_idx on public.videos (order_index);

create trigger set_updated_at before update on public.videos
  for each row execute function public.set_updated_at();

alter table public.videos enable row level security;

create policy "videos_public_read"
  on public.videos for select
  to anon, authenticated
  using (is_published = true or auth.uid() is not null);

create policy "videos_admin_write"
  on public.videos for all
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- ============================================================================
-- 9. articles
-- ============================================================================
create table public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_ar text not null default '',
  title_en text not null default '',
  category_ar text not null default '',
  category_en text not null default '',
  published_at timestamptz not null default now(),
  reading_time_minutes integer not null default 5,
  featured_image_url text,
  excerpt_ar text not null default '',
  excerpt_en text not null default '',
  content_ar text not null default '',
  content_en text not null default '',
  is_hero_featured boolean not null default false,
  is_published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index articles_published_at_idx on public.articles (published_at desc);

create trigger set_updated_at before update on public.articles
  for each row execute function public.set_updated_at();

alter table public.articles enable row level security;

create policy "articles_public_read"
  on public.articles for select
  to anon, authenticated
  using (is_published = true or auth.uid() is not null);

create policy "articles_admin_write"
  on public.articles for all
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- ============================================================================
-- 10. faqs
-- ============================================================================
create table public.faqs (
  id uuid primary key default gen_random_uuid(),
  question_ar text not null default '',
  question_en text not null default '',
  answer_ar text not null default '',
  answer_en text not null default '',
  category text not null default 'general' check (category in ('home', 'services', 'general')),
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index faqs_category_order_idx on public.faqs (category, order_index);

create trigger set_updated_at before update on public.faqs
  for each row execute function public.set_updated_at();

alter table public.faqs enable row level security;

create policy "faqs_public_read"
  on public.faqs for select
  to anon, authenticated
  using (true);

create policy "faqs_admin_write"
  on public.faqs for all
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- ============================================================================
-- 11. contact_appointments — patient PII. Public may only INSERT.
-- ============================================================================
create table public.contact_appointments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  preferred_date date,
  specialty text,
  notes text,
  status text not null default 'new' check (status in ('new', 'contacted', 'completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index contact_appointments_status_idx on public.contact_appointments (status, created_at desc);

create trigger set_updated_at before update on public.contact_appointments
  for each row execute function public.set_updated_at();

alter table public.contact_appointments enable row level security;

create policy "contact_appointments_public_insert"
  on public.contact_appointments for insert
  to anon, authenticated
  with check (true);

create policy "contact_appointments_admin_read"
  on public.contact_appointments for select
  to authenticated
  using (auth.uid() is not null);

create policy "contact_appointments_admin_update"
  on public.contact_appointments for update
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

create policy "contact_appointments_admin_delete"
  on public.contact_appointments for delete
  to authenticated
  using (auth.uid() is not null);

-- ============================================================================
-- 12. clinic_settings — singleton row
-- ============================================================================
create table public.clinic_settings (
  id uuid primary key default gen_random_uuid(),
  address_ar text not null default '',
  address_en text not null default '',
  phone_primary text,
  phone_secondary text,
  emergency_line text,
  working_hours_ar text,
  working_hours_en text,
  map_embed_url text,
  facebook_url text,
  instagram_url text,
  tiktok_url text,
  whatsapp_number text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_updated_at before update on public.clinic_settings
  for each row execute function public.set_updated_at();

alter table public.clinic_settings enable row level security;

create policy "clinic_settings_public_read"
  on public.clinic_settings for select
  to anon, authenticated
  using (true);

create policy "clinic_settings_admin_write"
  on public.clinic_settings for all
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- ============================================================================
-- Seed rows so the site and admin dashboard have something to render/edit
-- immediately. Safe to run once; re-running will error on the unique/singleton
-- assumptions below (expected — these are seed rows, not idempotent upserts).
-- ============================================================================
insert into public.doctor_profile (name_ar, name_en, title_ar, title_en, short_title_ar, short_title_en)
values (
  'د. محمود حسان',
  'Dr. Mahmoud Hassan',
  'مدرس واستشاري جراحة الأورام بالمعهد القومي للأورام - جامعة القاهرة',
  'Lecturer & Consultant of Surgical Oncology — National Cancer Institute, Cairo University',
  'استشاري جراحة الأورام',
  'Consultant Surgical Oncologist'
);

insert into public.clinic_settings (address_ar, address_en)
values (
  'المعهد القومي للأورام، جامعة القاهرة، القاهرة، مصر',
  'National Cancer Institute, Cairo University, Cairo, Egypt'
);

insert into public.pages_hero (page_slug, title_ar, title_en) values
  ('home', '', ''),
  ('about', '', ''),
  ('services', '', ''),
  ('videos', '', ''),
  ('articles', '', ''),
  ('reviews', '', ''),
  ('contact', '', '');

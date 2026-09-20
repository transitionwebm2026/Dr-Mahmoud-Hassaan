-- ============================================================================
-- Page-section content that migration 0001 didn't yet cover, discovered by
-- reading every section component actually rendered on each page. Run this
-- after 0001 (same access model: public read, authenticated write).
-- ============================================================================

-- ----------------------------------------------------------------------------
-- doctor_profile: About page "message" + Home page intro-video highlights.
-- ----------------------------------------------------------------------------
alter table public.doctor_profile
  add column if not exists message_ar text not null default '',
  add column if not exists message_en text not null default '',
  add column if not exists intro_highlights_ar text not null default '',
  add column if not exists intro_highlights_en text not null default '';

comment on column public.doctor_profile.message_ar is 'About page "message from the doctor" — paragraphs separated by a blank line.';
comment on column public.doctor_profile.intro_highlights_ar is 'Home page intro-video highlight bullets — one per line.';

-- ----------------------------------------------------------------------------
-- pages_hero: bottom FooterCTA text is page-specific too — belongs on the
-- same row as the rest of that page's hero/meta content. Null means "use
-- the component's own default copy", matching current behavior on Home.
-- ----------------------------------------------------------------------------
alter table public.pages_hero
  add column if not exists description_ar text not null default '',
  add column if not exists description_en text not null default '',
  add column if not exists footer_cta_title_ar text,
  add column if not exists footer_cta_title_en text,
  add column if not exists footer_cta_subtitle_ar text,
  add column if not exists footer_cta_subtitle_en text;

comment on column public.pages_hero.subtitle_ar is 'Short line under the title (e.g. "About the Doctor").';
comment on column public.pages_hero.description_ar is 'Longer supporting paragraph shown under the subtitle.';

-- ----------------------------------------------------------------------------
-- reviews: PatientReviewsGrid (Reviews page) shows a headline per review
-- that ReviewsSlider (Home) doesn't use — nullable, optional.
-- ----------------------------------------------------------------------------
alter table public.reviews
  add column if not exists title_ar text not null default '',
  add column if not exists title_en text not null default '';

-- ----------------------------------------------------------------------------
-- videos: card/modal duration badge (e.g. "02:14").
-- ----------------------------------------------------------------------------
alter table public.videos
  add column if not exists duration text not null default '';

-- ============================================================================
-- career_milestones — About page career timeline.
-- ============================================================================
create table public.career_milestones (
  id uuid primary key default gen_random_uuid(),
  year text not null default '',
  title_ar text not null default '',
  title_en text not null default '',
  description_ar text not null default '',
  description_en text not null default '',
  icon_tag text not null default '',
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index career_milestones_order_idx on public.career_milestones (order_index);

create trigger set_updated_at before update on public.career_milestones
  for each row execute function public.set_updated_at();

alter table public.career_milestones enable row level security;

create policy "career_milestones_public_read"
  on public.career_milestones for select
  to anon, authenticated
  using (true);

create policy "career_milestones_admin_write"
  on public.career_milestones for all
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- ============================================================================
-- certifications — About page certificates & accreditations.
-- ============================================================================
create table public.certifications (
  id uuid primary key default gen_random_uuid(),
  title_ar text not null default '',
  title_en text not null default '',
  issuer_ar text not null default '',
  issuer_en text not null default '',
  detail_ar text not null default '',
  detail_en text not null default '',
  icon_tag text not null default '',
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index certifications_order_idx on public.certifications (order_index);

create trigger set_updated_at before update on public.certifications
  for each row execute function public.set_updated_at();

alter table public.certifications enable row level security;

create policy "certifications_public_read"
  on public.certifications for select
  to anon, authenticated
  using (true);

create policy "certifications_admin_write"
  on public.certifications for all
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- ============================================================================
-- treatment_protocol_steps — Services page "Finding the Right Treatment Plan".
-- ============================================================================
create table public.treatment_protocol_steps (
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

create index treatment_protocol_steps_order_idx on public.treatment_protocol_steps (order_index);

create trigger set_updated_at before update on public.treatment_protocol_steps
  for each row execute function public.set_updated_at();

alter table public.treatment_protocol_steps enable row level security;

create policy "treatment_protocol_steps_public_read"
  on public.treatment_protocol_steps for select
  to anon, authenticated
  using (true);

create policy "treatment_protocol_steps_admin_write"
  on public.treatment_protocol_steps for all
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- ============================================================================
-- procedure_categories / procedure_items — Services page "Procedures &
-- Conditions" breakdown (category tabs, each holding a few procedures).
-- ============================================================================
create table public.procedure_categories (
  id uuid primary key default gen_random_uuid(),
  title_ar text not null default '',
  title_en text not null default '',
  icon_tag text not null default '',
  image_url text,
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index procedure_categories_order_idx on public.procedure_categories (order_index);

create trigger set_updated_at before update on public.procedure_categories
  for each row execute function public.set_updated_at();

alter table public.procedure_categories enable row level security;

create policy "procedure_categories_public_read"
  on public.procedure_categories for select
  to anon, authenticated
  using (true);

create policy "procedure_categories_admin_write"
  on public.procedure_categories for all
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

create table public.procedure_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.procedure_categories (id) on delete cascade,
  title_ar text not null default '',
  title_en text not null default '',
  description_ar text not null default '',
  description_en text not null default '',
  order_index integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index procedure_items_category_idx on public.procedure_items (category_id, order_index);

create trigger set_updated_at before update on public.procedure_items
  for each row execute function public.set_updated_at();

alter table public.procedure_items enable row level security;

create policy "procedure_items_public_read"
  on public.procedure_items for select
  to anon, authenticated
  using (true);

create policy "procedure_items_admin_write"
  on public.procedure_items for all
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- ============================================================================
-- Seed rows — one starter row per new list table so the admin UI and the
-- live site aren't empty right after migrating. Feel free to edit/delete
-- these from the dashboard afterwards.
-- ============================================================================
insert into public.career_milestones (year, title_ar, title_en, description_ar, description_en, icon_tag, order_index) values
  ('2008', 'بكالوريوس الطب والجراحة', 'MBBCh, Faculty of Medicine', 'تخرج بتقدير امتياز من كلية طب جامعة القاهرة.', 'Graduated with honors from the Faculty of Medicine, Cairo University.', 'GraduationCap', 0),
  ('2015', 'زمالة جراحة الأورام', 'Fellowship in Surgical Oncology', 'أتم برنامج الزمالة في جراحة الأورام بالمعهد القومي للأورام.', 'Completed a fellowship in surgical oncology at the National Cancer Institute.', 'Award', 1),
  ('2020', 'استشاري جراحة الأورام', 'Consultant of Surgical Oncology', 'تم تعيينه استشاريًا لجراحة الأورام بالمعهد القومي للأورام - جامعة القاهرة.', 'Appointed Consultant of Surgical Oncology at the National Cancer Institute, Cairo University.', 'ShieldCheck', 2);

insert into public.certifications (title_ar, title_en, issuer_ar, issuer_en, detail_ar, detail_en, icon_tag, order_index) values
  ('بكالوريوس ودكتوراه الطب', 'MBBCh & MD in Surgery', 'جامعة القاهرة', 'Cairo University', 'تأهيل أكاديمي كامل في الطب والجراحة العامة، بتقدير امتياز مع مرتبة الشرف.', 'Full academic qualification in medicine and general surgery, graduated with honors.', 'GraduationCap', 0),
  ('زمالة جراحة الأورام', 'Fellowship in Surgical Oncology', 'المعهد القومي للأورام', 'National Cancer Institute', 'تدريب متخصص مكثف على أحدث تقنيات جراحة الأورام.', 'Intensive specialized training in the latest surgical oncology techniques.', 'Award', 1);

insert into public.treatment_protocol_steps (title_ar, title_en, description_ar, description_en, icon_tag, order_index) values
  ('التشخيص الدقيق', 'Accurate Diagnosis', 'فحص إكلينيكي شامل وأحدث وسائل التصوير والتحاليل.', 'A thorough clinical exam plus the latest imaging and labs.', 'ScanSearch', 0),
  ('تحديد مرحلة الورم', 'Staging', 'تحديد حجم الورم ومدى انتشاره لاختيار المسار العلاجي الأنسب.', 'Determining the tumor''s size and spread to select the right path.', 'Layers', 1),
  ('خطة العلاج المخصصة', 'Personalized Treatment Plan', 'وضع وتنفيذ خطة علاجية مصممة خصيصًا لحالة المريض.', 'Designing and executing a treatment plan built around the patient.', 'ClipboardCheck', 2);

with cat as (
  insert into public.procedure_categories (title_ar, title_en, icon_tag, image_url, order_index)
  values ('أورام الثدي', 'Breast Tumors', 'HeartPulse', '/images/surgery-breast.jpg', 0)
  returning id
)
insert into public.procedure_items (category_id, title_ar, title_en, description_ar, description_en, order_index)
select id, 'سرطان الثدي الغازي', 'Invasive Breast Cancer', 'استئصال دقيق للورم مع الحفاظ قدر الإمكان على الشكل التجميلي.', 'Precise tumor removal while preserving shape wherever possible.', 0
from cat;

-- ============================================================================
-- Admin-editable section headings.
--
-- Every content section on the site opens with the same three-part header:
-- a small label ("eyebrow" chip), the main <h2> title, and an optional
-- description line. Until now all of that copy was hardcoded inside each
-- component under components/sections/**, so the admin dashboard had no way
-- to change it — only the items listed under each heading were editable.
--
-- One row per (page_slug, section_key). The section keys match the registry
-- in lib/section-headings.ts, which also holds the same copy as a fallback
-- for when a row is missing.
--
--   * title is required; a blank eyebrow or description hides that line.
--   * Wrapping words in *asterisks* inside a title renders them with the
--     brand gradient (used for the doctor's name in two headings).
-- ============================================================================

create table public.section_headings (
  id uuid primary key default gen_random_uuid(),
  page_slug text not null,
  section_key text not null,
  eyebrow_ar text not null default '',
  eyebrow_en text not null default '',
  title_ar text not null default '',
  title_en text not null default '',
  description_ar text not null default '',
  description_en text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (page_slug, section_key)
);

comment on table public.section_headings is 'Small label, title and description shown at the top of each page section. Keys match lib/section-headings.ts.';
comment on column public.section_headings.title_ar is 'Wrap words in *asterisks* to color them with the brand gradient.';

create trigger set_updated_at before update on public.section_headings
  for each row execute function public.set_updated_at();

alter table public.section_headings enable row level security;

create policy "section_headings_public_read"
  on public.section_headings for select
  to anon, authenticated
  using (true);

create policy "section_headings_admin_write"
  on public.section_headings for all
  to authenticated
  using (auth.uid() is not null)
  with check (auth.uid() is not null);

-- ----------------------------------------------------------------------------
-- Seed with exactly what the site shows today, so the admin forms start from
-- the live copy instead of empty fields.
-- ----------------------------------------------------------------------------
insert into public.section_headings
  (page_slug, section_key, eyebrow_ar, eyebrow_en, title_ar, title_en, description_ar, description_en)
values
  -- Home ---------------------------------------------------------------------
  ('home', 'intro_video',
    'تعرف على طبيبك', 'Meet Your Doctor',
    'رسالة تعريفية من *د. محمود حسان*', 'An introduction from *Dr. Mahmoud Hassan*',
    'في هذا الفيديو، يشارككم د. محمود حسان نهجه في التعامل مع مرضى الأورام، وأهمية التشخيص المبكر، ودور الجراحة الدقيقة في رحلة الشفاء.',
    'In this short video, Dr. Mahmoud Hassan shares his approach to treating oncology patients, the importance of early diagnosis, and the role of precise surgery in the recovery journey.'),
  ('home', 'key_surgeries',
    'أبرز الجراحات', 'Key Surgeries',
    'تخصصات جراحية دقيقة', 'Precision Surgical Specialties',
    'نقدم رعاية جراحية متكاملة لمختلف أنواع الأورام بأحدث التقنيات وأعلى معايير السلامة.',
    'Comprehensive surgical care for a wide range of tumors using the latest techniques and the highest safety standards.'),
  ('home', 'key_treatments',
    'أبرز العلاجات', 'Key Treatments',
    'رعاية متكاملة في كل خطوة', 'Integrated Care at Every Step',
    'من التشخيص الدقيق إلى التعافي الكامل، نرافق مرضانا بخطة علاجية واضحة ومخصصة.',
    'From accurate diagnosis to full recovery, patients are guided with a clear, personalized plan.'),
  ('home', 'why_doctor',
    'لماذا نحن', 'Why Choose Us',
    'لماذا تختار *د. محمود حسان*؟', 'Why Choose *Dr. Mahmoud Hassan*?',
    '', ''),
  ('home', 'patient_journey',
    'رحلة المريض', 'Patient Journey',
    'خطوتك نحو الشفاء', 'Your Roadmap to Recovery',
    'خارطة طريق واضحة من التشخيص وحتى التعافي الكامل بعد الجراحة.',
    'A clear, step-by-step roadmap from diagnosis to full post-op recovery.'),
  ('home', 'reviews',
    'آراء المرضى', 'Patient Reviews',
    'ماذا يقول مرضانا؟', 'What Our Patients Say',
    '', ''),
  ('home', 'featured_videos',
    'فيديوهات مختارة', 'Featured Videos',
    'محتوى توعوي مرئي', 'Educational Video Content',
    '', ''),
  ('home', 'faq',
    'الأسئلة الشائعة', 'Frequently Asked Questions',
    'إجابات سريعة على أهم استفساراتك', 'Quick Answers to Your Top Questions',
    'نظرة عامة على التخصصات والاستشارات والحجز والمتابعة بعد العلاج.',
    'An overview of specialties, consultations, booking, and post-treatment follow-up.'),

  -- About --------------------------------------------------------------------
  ('about', 'doctor_message',
    'كلمة من الدكتور', 'A Message From the Doctor',
    'رحلتي معكم تبدأ من هنا', 'My journey with you starts here',
    '', ''),
  ('about', 'career_timeline',
    'المسيرة العملية', 'Career Journey',
    'محطات في مسيرة التميز', 'Milestones of a Distinguished Career',
    'من مقاعد الدراسة إلى غرف العمليات، رحلة علمية وعملية مبنية على التعلم المستمر.',
    'From the classroom to the operating room — a journey built on continuous learning.'),
  ('about', 'intro_video',
    'فيديو تعريفي', 'Introductory Video',
    'قصة الدكتور محمود حسان', 'Dr. Mahmoud Hassan''s Story',
    'شاهد الفيديو للتعرف أكثر على رؤيته الطبية ونهجه في التعامل مع مرضى الأورام.',
    'Watch to learn more about his medical vision and approach to caring for oncology patients.'),
  ('about', 'expertise',
    'مجالات الخبرة والتخصص', 'Areas of Expertise',
    'تخصص دقيق في كل حالة', 'Precision Focus in Every Case',
    'سنوات من الممارسة المتخصصة في أكثر مجالات جراحة الأورام دقة وحساسية.',
    'Years of focused practice in some of the most precise and delicate fields of surgical oncology.'),
  ('about', 'certifications',
    'الشهادات والإنجازات', 'Certificates & Accreditations',
    'اعتمادات موثوقة عالميًا', 'Globally Trusted Credentials',
    'مرر المؤشر أو اضغط على البطاقة لمعرفة المزيد.',
    'Hover or tap a card to reveal more detail.'),

  -- Services -----------------------------------------------------------------
  ('services', 'treatment_protocol',
    'إيجاد خطة العلاج المناسبة', 'Finding the Right Treatment Plan',
    'بروتوكول واضح لكل حالة', 'A Clear Protocol for Every Case',
    'خطوات مبنية على أفضل الممارسات العالمية — اضغط على أي خطوة لاستكشافها.',
    'Steps built on global best practices — click any step to explore it.'),
  ('services', 'surgeries_grid',
    'التخصصات الطبية والجراحية', 'Medical & Surgical Specialties',
    'خدمات جراحية دقيقة ومتكاملة', 'Precise, Integrated Surgical Care',
    'تخصصات جراحية دقيقة تغطي أكثر أنواع أورام الجهاز الهضمي والثدي والرأس والرقبة شيوعًا.',
    'Focused surgical specialties covering the most common breast, GI, and head & neck tumor types.'),
  ('services', 'procedures',
    'تفاصيل الجراحات والأمراض', 'Procedures & Conditions',
    'تعرف على تفاصيل كل تخصص', 'Explore Each Specialty in Detail',
    'اختر تخصصًا لعرض الحالات والإجراءات التي يتم التعامل معها ضمنه.',
    'Select a specialty to see the specific conditions and procedures treated under it.'),
  ('services', 'faq',
    'الأسئلة الشائعة', 'Frequently Asked Questions',
    'كل ما تريد معرفته عن الجراحة', 'Everything You Need to Know About Surgery',
    'إجابات تفصيلية حول التحضير للجراحة والتعافي والإقامة بالمستشفى.',
    'Detailed answers on surgical prep, recovery, and hospital stays.'),

  -- Videos -------------------------------------------------------------------
  ('videos', 'library',
    'مكتبة الفيديوهات الطبية', 'Medical Video Library',
    'محتوى توعوي يستحق المشاهدة', 'Educational Content Worth Watching',
    'شروحات جراحية ونصائح للمرضى في فيديوهات قصيرة وواضحة.',
    'Surgical explanations and patient advice in short, clear videos.'),

  -- Articles -----------------------------------------------------------------
  ('articles', 'featured',
    'مقال مميز', 'Featured Article',
    'المقالات والمحتوى الطبي', 'Articles & Medical Insights',
    '', ''),
  ('articles', 'grid',
    'أحدث المقالات', 'Latest Articles',
    'مقالات تستحق وقتك', 'Articles Worth Your Time',
    '', ''),

  -- Reviews ------------------------------------------------------------------
  ('reviews', 'grid',
    'قصص حقيقية من مرضانا', 'Real Stories From Our Patients',
    'تجارب موثّقة برحلة التعافي الكاملة', 'Verified Experiences Across the Full Recovery Journey',
    'كل تقييم هنا من مريض حقيقي خضع للعلاج على يد الدكتور محمود حسان وفريقه الطبي.',
    'Every review here comes from a real patient treated by Dr. Mahmoud Hassan and his medical team.'),

  -- Contact ------------------------------------------------------------------
  ('contact', 'booking',
    'الحجز والتواصل', 'Booking & Contact',
    'احجز استشارتك أو تواصل معنا مباشرة', 'Book Your Consultation or Reach Us Directly',
    'املأ الفورم لحجز استشارتك عبر واتساب، أو تعرف على موقع العيادة ومواعيد العمل وخط الطوارئ.',
    'Fill in the form to book your consultation via WhatsApp, or find the clinic''s location, hours, and emergency hotline.')
on conflict (page_slug, section_key) do nothing;

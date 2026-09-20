-- ============================================================================
-- Backfill pages_hero content.
--
-- 0001_init_cms_schema.sql seeded every pages_hero row with blank
-- title/subtitle/description (and left CTA fields untouched), so the admin
-- "Hero Section" form rendered completely empty for every page even though
-- the live site still showed copy — each app/(site)/**/page.tsx had its own
-- hardcoded fallback text baked into the JSX for whatever the (empty) DB
-- columns didn't cover.
--
-- This backfill copies those hardcoded fallbacks into the database so the
-- admin dashboard reflects what is actually live (and is finally editable),
-- with no visible change to the site. UPDATE (not INSERT), so it's safe to
-- re-run and only touches rows that are still blank.
-- ============================================================================

update public.pages_hero set
  title_ar = 'د. محمود حسان',
  title_en = 'Dr. Mahmoud Hassan',
  subtitle_ar = 'استشاري جراحة الأورام',
  subtitle_en = 'Consultant Surgical Oncologist',
  description_ar = 'مدرس واستشاري جراحة الأورام بالمعهد القومي للأورام - جامعة القاهرة - عضو الجمعية المصرية لجراحة الأورام',
  description_en = 'Lecturer & Consultant of Surgical Oncology — National Cancer Institute, Cairo University | Member of the Egyptian Society of Surgical Oncology',
  cta_primary_text_ar = 'احجز كشفك الآن',
  cta_primary_text_en = 'Book Your Visit',
  cta_primary_link = '/contact',
  cta_secondary_text_ar = 'استكشف خدماتنا',
  cta_secondary_text_en = 'Explore Our Services',
  cta_secondary_link = '/services',
  footer_cta_title_ar = 'مستعد لبدء رحلة علاجك؟',
  footer_cta_title_en = 'Ready to start your treatment journey?',
  footer_cta_subtitle_ar = 'تواصل مع عيادة د. محمود حسان اليوم لحجز استشارتك والحصول على خطة علاجية مخصصة لحالتك.',
  footer_cta_subtitle_en = 'Reach out to Dr. Mahmoud Hassan''s clinic today to book your consultation and get a treatment plan tailored to your case.'
where page_slug = 'home' and title_ar = '' and title_en = '';

update public.pages_hero set
  title_ar = 'د. محمود حسان',
  title_en = 'Dr. Mahmoud Hassan',
  subtitle_ar = 'نبذة عن الدكتور',
  subtitle_en = 'About the Doctor',
  description_ar = 'تعرف على مسيرة الدكتور محمود حسان المهنية، وخبرته الواسعة في جراحة الأورام، والشهادات التي حصل عليها على مدار مسيرته.',
  description_en = 'Learn about Dr. Mahmoud Hassan''s professional journey, his extensive experience in surgical oncology, and the credentials he has earned throughout his career.',
  cta_primary_text_ar = 'احجز كشفك الآن',
  cta_primary_text_en = 'Book Your Visit',
  cta_primary_link = '/contact',
  cta_secondary_text_ar = 'شاهد الفيديو التعريفي',
  cta_secondary_text_en = 'Watch Intro Video',
  cta_secondary_link = '#doctor-intro',
  footer_cta_title_ar = 'هل لديك سؤال للدكتور محمود حسان؟',
  footer_cta_title_en = 'Have a question for Dr. Mahmoud Hassan?',
  footer_cta_subtitle_ar = 'تواصل معنا اليوم وسيسعد فريقنا بالرد على استفساراتك وحجز موعدك.',
  footer_cta_subtitle_en = 'Reach out today — our team is happy to answer your questions and book your visit.'
where page_slug = 'about' and title_ar = '' and title_en = '';

update public.pages_hero set
  title_ar = 'د. محمود حسان',
  title_en = 'Dr. Mahmoud Hassan',
  subtitle_ar = 'الخدمات والجراحات',
  subtitle_en = 'Services & Surgeries',
  description_ar = 'تخصصات جراحية دقيقة لعلاج أورام الثدي والجهاز الهضمي والغدد والرقبة، بأحدث التقنيات وأعلى معايير السلامة.',
  description_en = 'Precise surgical specialties for breast, GI, and head & neck tumors, using the latest techniques and the highest safety standards.',
  cta_primary_text_ar = 'حجز موعد',
  cta_primary_text_en = 'Book Appointment',
  cta_primary_link = '/contact',
  cta_secondary_text_ar = 'اتصل بنا',
  cta_secondary_text_en = 'Contact Us',
  cta_secondary_link = 'tel:+201001234567',
  footer_cta_title_ar = 'جاهز لبدء خطة علاجك؟',
  footer_cta_title_en = 'Ready to start your treatment plan?',
  footer_cta_subtitle_ar = 'تواصل معنا اليوم لحجز استشارتك ومناقشة أنسب خطة جراحية لحالتك.',
  footer_cta_subtitle_en = 'Reach out today to book your consultation and discuss the right surgical plan for your case.'
where page_slug = 'services' and title_ar = '' and title_en = '';

update public.pages_hero set
  title_ar = 'د. محمود حسان',
  title_en = 'Dr. Mahmoud Hassan',
  subtitle_ar = 'مكتبة الفيديوهات',
  subtitle_en = 'Video Library',
  description_ar = 'فيديوهات توعوية قصيرة تشرح الإجراءات الجراحية وتقدم نصائح عملية للمرضى قبل الجراحة وبعدها.',
  description_en = 'Short educational videos explaining surgical procedures and offering practical advice for patients before and after surgery.',
  cta_primary_text_ar = 'حجز موعد',
  cta_primary_text_en = 'Book Appointment',
  cta_primary_link = '/contact',
  cta_secondary_text_ar = 'تواصل معنا',
  cta_secondary_text_en = 'Contact Us',
  cta_secondary_link = 'tel:+201001234567',
  footer_cta_title_ar = 'هل تريد استشارة شخصية؟',
  footer_cta_title_en = 'Want a personal consultation?',
  footer_cta_subtitle_ar = 'الفيديوهات نقطة بداية — تواصل معنا للحصول على إجابات تخص حالتك تحديدًا.',
  footer_cta_subtitle_en = 'These videos are a starting point — reach out for answers specific to your case.'
where page_slug = 'videos' and title_ar = '' and title_en = '';

update public.pages_hero set
  title_ar = 'د. محمود حسان',
  title_en = 'Dr. Mahmoud Hassan',
  subtitle_ar = 'المقالات الطبية',
  subtitle_en = 'Medical Articles',
  description_ar = 'مقالات موثوقة عن جراحة الأورام والتشخيص والتعافي، مكتوبة لتساعدك على فهم رحلتك العلاجية.',
  description_en = 'Trusted articles on surgical oncology, diagnosis, and recovery — written to help you understand your treatment journey.',
  cta_primary_text_ar = 'حجز موعد',
  cta_primary_text_en = 'Book Appointment',
  cta_primary_link = '/contact',
  cta_secondary_text_ar = 'تواصل معنا',
  cta_secondary_text_en = 'Contact Us',
  cta_secondary_link = 'tel:+201001234567',
  footer_cta_title_ar = 'لديك سؤال بعد القراءة؟',
  footer_cta_title_en = 'Have a question after reading?',
  footer_cta_subtitle_ar = 'فريقنا جاهز للإجابة عن استفساراتك وحجز استشارتك.',
  footer_cta_subtitle_en = 'Our team is ready to answer your questions and book your consultation.'
where page_slug = 'articles' and title_ar = '' and title_en = '';

update public.pages_hero set
  title_ar = 'د. محمود حسان',
  title_en = 'Dr. Mahmoud Hassan',
  subtitle_ar = 'آراء وتقييمات المرضى',
  subtitle_en = 'Patient Reviews & Testimonials',
  description_ar = 'قصص حقيقية من مرضى خاضوا رحلة العلاج والتعافي على يد الدكتور محمود حسان وفريقه الطبي المتكامل.',
  description_en = 'Real stories from patients who went through their treatment and recovery journey with Dr. Mahmoud Hassan and his integrated medical team.',
  cta_primary_text_ar = 'حجز موعد',
  cta_primary_text_en = 'Book Appointment',
  cta_primary_link = '/contact',
  cta_secondary_text_ar = 'تواصل معنا',
  cta_secondary_text_en = 'Contact Us',
  cta_secondary_link = 'tel:+201001234567',
  footer_cta_title_ar = 'هل خضعت للعلاج معنا؟ شاركنا تجربتك',
  footer_cta_title_en = 'Been treated with us? Share your experience',
  footer_cta_subtitle_ar = 'رأيك يساعد مرضى آخرين على اتخاذ قرارهم بثقة، وتواصلنا معك مستمر بعد التعافي.',
  footer_cta_subtitle_en = 'Your feedback helps other patients decide with confidence — and our support continues well after recovery.'
where page_slug = 'reviews' and title_ar = '' and title_en = '';

update public.pages_hero set
  title_ar = 'د. محمود حسان',
  title_en = 'Dr. Mahmoud Hassan',
  subtitle_ar = 'تواصل معنا',
  subtitle_en = 'Contact Us',
  description_ar = 'فريقنا الطبي جاهز للرد على استفساراتك ومساعدتك في حجز استشارتك مع الدكتور محمود حسان.',
  description_en = 'Our medical team is ready to answer your questions and help you book your consultation with Dr. Mahmoud Hassan.',
  cta_primary_text_ar = 'حجز استشارة',
  cta_primary_text_en = 'Book a Consultation',
  cta_primary_link = '#booking-form',
  cta_secondary_text_ar = 'تواصل مباشر',
  cta_secondary_text_en = 'Direct Contact',
  cta_secondary_link = 'tel:+201001234567',
  footer_cta_title_ar = 'لا تزال لديك أسئلة؟',
  footer_cta_title_en = 'Still have questions?',
  footer_cta_subtitle_ar = 'فريقنا على استعداد للرد فورًا — اختر الطريقة الأنسب لك للتواصل معنا.',
  footer_cta_subtitle_en = 'Our team is ready to respond right away — pick whichever way works best for you.'
where page_slug = 'contact' and title_ar = '' and title_en = '';

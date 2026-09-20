-- ============================================================================
-- doctor_profile — fill in the stats (from StatsBar.tsx), the About page
-- message (from DoctorMessage.tsx) and Home intro-video highlights (from
-- DoctorIntroVideo.tsx) on the singleton row migration 0001 seeded.
-- ============================================================================
update public.doctor_profile
set
  years_experience = 15,
  successful_operations = 5000,
  cured_patients = 3000,
  message_ar = $$أرحب بكم في هذه الصفحة لأشارككم جزءًا من رحلتي المهنية والإنسانية. منذ أن قررت دراسة الطب، كان هدفي دائمًا تقديم رعاية طبية تجمع بين الدقة العلمية والدفء الإنساني.

جراحة الأورام ليست مجرد تخصص طبي بالنسبة لي، بل رسالة أؤمن بها لمساعدة كل مريض على مواجهة رحلته العلاجية بثقة وأمل، بدءًا من التشخيص الدقيق وحتى التعافي الكامل.

أعدكم بأن أكون بجانبكم في كل خطوة، بشرح واضح لكل قرار طبي، ومتابعة شخصية لا تنتهي عند باب غرفة العمليات.$$,
  message_en = $$Welcome — I'd like to share part of my professional and personal journey with you. Since the day I decided to study medicine, my goal has always been to deliver care that combines scientific precision with genuine human warmth.

Surgical oncology isn't just a specialty to me — it's a mission I believe in: helping every patient face their treatment journey with confidence and hope, from an accurate diagnosis through full recovery.

I promise to stand beside you at every step — with a clear explanation behind every medical decision, and personal follow-up that doesn't end at the operating room door.$$,
  intro_highlights_ar = $$أكثر من 15 عامًا من الخبرة في جراحة الأورام
أحدث تقنيات الجراحة بالمنظار والروبوت
رعاية متكاملة من التشخيص وحتى التعافي$$,
  intro_highlights_en = $$15+ years of experience in surgical oncology
Latest laparoscopic & robotic-assisted techniques
Integrated care from diagnosis through recovery$$
where id = (select id from public.doctor_profile order by created_at asc limit 1);

-- ============================================================================
-- clinic_settings — fill in phone/WhatsApp/hours (from lib/constants.ts and
-- ClinicInfoMap.tsx) on the singleton row migration 0001 seeded.
-- ============================================================================
update public.clinic_settings
set
  phone_primary = '+20 100 123 4567',
  emergency_line = '+20 100 123 4567',
  whatsapp_number = '201001234567',
  working_hours_ar = $$السبت – الخميس: 5 م – 9 م
الجمعة: مغلق$$,
  working_hours_en = $$Saturday – Thursday: 5 PM – 9 PM
Friday: Closed$$
where id = (select id from public.clinic_settings order by created_at asc limit 1);

-- ============================================================================
-- Seeds the content tables with the site's existing hardcoded copy, so that
-- wiring the frontend to Supabase (see components/sections/*) doesn't blank
-- out the live site. Content transcribed verbatim from the components being
-- converted to read from these tables. Safe to run once.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- surgeries_services (from components/sections/services/SurgeriesGrid.tsx —
-- the fuller Services-page list; Home's "Key Surgeries" teaser now just
-- shows the first 3 of these by order_index).
-- ----------------------------------------------------------------------------
insert into public.surgeries_services
  (title_ar, title_en, specialty_category_ar, specialty_category_en, short_description_ar, short_description_en, image_url, order_index)
values
  ($$جراحات أورام الثدي$$, $$Breast Cancer Surgery$$, $$ثدي$$, $$Breast$$,
   $$استئصال دقيق للأورام مع خيارات الحفاظ على الشكل التجميلي وإعادة البناء عند الحاجة.$$,
   $$Precise tumor removal with breast-conserving and reconstructive options when appropriate.$$,
   '/images/surgery-breast.jpg', 0),
  ($$جراحات أورام الجهاز الهضمي$$, $$GI Oncology Surgery$$, $$جهاز هضمي$$, $$GI$$,
   $$علاج جراحي شامل لأورام المعدة والقولون والكبد والبنكرياس بمعايير عالمية.$$,
   $$Comprehensive surgical care for stomach, colon, liver & pancreatic tumors to global standards.$$,
   '/images/surgery-gi.jpg', 1),
  ($$جراحات أورام الغدد والرقبة$$, $$Head & Neck / Thyroid Surgery$$, $$غدد ورقبة$$, $$Head & Neck$$,
   $$تدخلات دقيقة لأورام الغدة الدرقية والغدد اللعابية وأورام الرأس والرقبة.$$,
   $$Precise interventions for thyroid, salivary gland, and head & neck tumors.$$,
   '/images/surgery-headneck.jpg', 2),
  ($$جراحات الأورام بالمناظير$$, $$Laparoscopic Oncology Surgery$$, $$بالمنظار$$, $$Laparoscopic$$,
   $$تقنيات الحد الأدنى من التدخل لتقليل الألم وتسريع العودة للحياة الطبيعية.$$,
   $$Minimally invasive techniques that reduce pain and speed the return to normal life.$$,
   '/images/surgery-laparoscopic.jpg', 3);

-- ----------------------------------------------------------------------------
-- treatments (from components/sections/KeyTreatments.tsx)
-- ----------------------------------------------------------------------------
insert into public.treatments
  (disease_name_ar, disease_name_en, treatment_overview_ar, treatment_overview_en, image_url, order_index)
values
  ($$التقييم والتشخيص المبكر$$, $$Early Diagnosis & Staging$$,
   $$تقييم شامل للحالة باستخدام أحدث وسائل التصوير والتحاليل لتحديد الخطة الأنسب.$$,
   $$A comprehensive workup using the latest imaging and diagnostics to define the right plan.$$,
   '/images/treatment-diagnosis.jpg', 0),
  ($$خطط علاج متعددة التخصصات$$, $$Multidisciplinary Treatment Plans$$,
   $$تنسيق كامل مع فرق الأورام الطبية والإشعاعية لتقديم رعاية متكاملة.$$,
   $$Full coordination with medical and radiation oncology teams for integrated care.$$,
   '/images/treatment-team.jpg', 1),
  ($$متابعة ما بعد الجراحة$$, $$Post-Surgical Follow-up$$,
   $$برنامج متابعة دقيق يضمن التعافي الآمن والسريع بعد التدخل الجراحي.$$,
   $$A structured follow-up program that ensures a safe, swift recovery after surgery.$$,
   '/images/treatment-followup.jpg', 2);

-- ----------------------------------------------------------------------------
-- why_doctor (from components/sections/WhyChooseDoctor.tsx)
-- ----------------------------------------------------------------------------
insert into public.why_doctor (title_ar, title_en, description_ar, description_en, icon_tag, order_index)
values
  ($$خبرة أكاديمية وعملية متميزة$$, $$Distinguished Academic & Clinical Expertise$$,
   $$مدرس واستشاري جراحة الأورام بالمعهد القومي للأورام - جامعة القاهرة، بخبرة تمتد لأكثر من 15 عامًا.$$,
   $$Lecturer & Consultant of Surgical Oncology at the National Cancer Institute, Cairo University, with 15+ years of experience.$$,
   'Award', 0),
  ($$أحدث تقنيات الجراحة$$, $$Latest Surgical Technology$$,
   $$استخدام تقنيات الجراحة بالمنظار والحد الأدنى من التدخل لتقليل الألم وتسريع التعافي.$$,
   $$Laparoscopic and minimally invasive techniques that reduce pain and accelerate recovery.$$,
   'Sparkles', 1),
  ($$رعاية إنسانية شخصية$$, $$Personalized, Compassionate Care$$,
   $$متابعة شخصية لكل مريض وشرح تفصيلي لكل خطوة في رحلة العلاج.$$,
   $$Personal follow-up with every patient and clear guidance through each step of care.$$,
   'HeartHandshake', 2),
  ($$نتائج وأمان مثبت$$, $$Proven Outcomes & Safety$$,
   $$سجل حافل من العمليات الناجحة وفق أعلى معايير السلامة العالمية.$$,
   $$A strong track record of successful surgeries under the highest global safety standards.$$,
   'ShieldCheck', 3);

-- ----------------------------------------------------------------------------
-- patient_journey (from components/sections/PatientJourney.tsx)
-- ----------------------------------------------------------------------------
insert into public.patient_journey (step_number, title_ar, title_en, description_ar, description_en, icon_url, order_index)
values
  (1, $$الاستشارة الأولى$$, $$Initial Consultation$$,
   $$جلسة تعارف شاملة لمناقشة الأعراض والتاريخ المرضي وتحديد الخطوات التالية.$$,
   $$A thorough first session to discuss symptoms, history, and outline next steps.$$, 'ClipboardList', 0),
  (2, $$التقييم والفحوصات$$, $$Assessment & Diagnostics$$,
   $$إجراء الفحوصات والتحاليل والأشعة اللازمة لتحديد طبيعة الحالة بدقة.$$,
   $$Running the imaging and lab work needed to precisely define the case.$$, 'ScanSearch', 1),
  (3, $$التخطيط الجراحي$$, $$Surgical Planning$$,
   $$وضع خطة علاجية مخصصة بالتنسيق مع فريق متعدد التخصصات.$$,
   $$Building a tailored treatment plan in coordination with a multidisciplinary team.$$, 'ListChecks', 2),
  (4, $$التدخل الجراحي$$, $$The Surgery$$,
   $$تنفيذ العملية بأحدث التقنيات وأعلى معايير السلامة داخل غرف عمليات مجهزة.$$,
   $$Performing the procedure with the latest techniques in fully equipped operating rooms.$$, 'Scissors', 3),
  (5, $$المتابعة والتعافي$$, $$Follow-up & Recovery$$,
   $$برنامج متابعة دوري لضمان تعافٍ آمن وسريع بعد الجراحة.$$,
   $$A regular follow-up program to ensure a safe, swift recovery after surgery.$$, 'HeartPulse', 4);

-- ----------------------------------------------------------------------------
-- reviews (from components/sections/reviews/PatientReviewsGrid.tsx — the
-- fuller set with headlines; Home's slider shows the first few by date).
-- ----------------------------------------------------------------------------
insert into public.reviews
  (patient_name, title_ar, title_en, surgical_procedure_ar, surgical_procedure_en, rating, review_text_ar, review_text_en, review_date, is_verified)
values
  ($$أم أحمد$$, $$أعاد لي هذا الفريق الأمل والحياة$$, $$This Team Gave Me Back Hope and Life$$,
   $$جراحة أورام الثدي$$, $$Breast Cancer Surgery$$, 5,
   $$بعد التشخيص كنت خائفة جدًا، لكن الدكتور محمود حسان شرح لي كل خطوة بصبر واطمئنان. الجراحة نجحت والتعافي كان أسرع مما توقعت بفضل المتابعة الدقيقة.$$,
   $$After my diagnosis I was terrified, but Dr. Mahmoud Hassan walked me through every step with patience and reassurance. The surgery succeeded and my recovery was faster than I expected, thanks to the meticulous follow-up.$$,
   '2026-09-01', true),
  ($$كريم السيد$$, $$دقة جراحية ورعاية إنسانية حقيقية$$, $$Surgical Precision with Genuine Human Care$$,
   $$جراحة أورام القولون$$, $$Colon Oncology Surgery$$, 5,
   $$ما يميز الدكتور محمود ليس فقط مهارته الجراحية العالية، بل تعامله الإنساني معي ومع أسرتي طوال فترة العلاج. أنصح به بثقة تامة.$$,
   $$What sets Dr. Mahmoud apart isn't only his exceptional surgical skill — it's how humanely he treated me and my family throughout the entire journey. I recommend him with complete confidence.$$,
   '2026-08-25', true),
  ($$منى عبد الله$$, $$تعافيت في وقت قياسي بفضل المنظار$$, $$Back on My Feet in Record Time$$,
   $$جراحة بالمنظار$$, $$Laparoscopic Surgery$$, 5,
   $$الجراحة بالمنظار وفّرت عليّ ألمًا كبيرًا وفترة نقاهة طويلة. خرجت من المستشفى خلال يومين فقط وعدت لعملي خلال أسبوعين.$$,
   $$The laparoscopic approach spared me a lot of pain and a long recovery. I left the hospital within two days and was back at work in two weeks.$$,
   '2026-08-18', true),
  ($$أحمد فتحي$$, $$استشارة صادقة غيّرت قراري للأفضل$$, $$An Honest Consultation That Changed My Decision$$,
   $$استشارة وتخطيط جراحي$$, $$Surgical Consultation & Planning$$, 4,
   $$قبل أن أقرر الجراحة، أخذت وقتًا كافيًا مع الدكتور لمناقشة كل الخيارات المتاحة بصراحة تامة. شعرت أن قراري مبني على معلومة كاملة وليس على خوف.$$,
   $$Before committing to surgery, I had ample time with the doctor to discuss every option with complete honesty. My decision felt informed, not driven by fear.$$,
   '2026-08-10', true),
  ($$سارة يوسف$$, $$متابعة ما بعد الجراحة أشعرتني بالأمان$$, $$Post-Op Follow-up That Made Me Feel Safe$$,
   $$متابعة ما بعد الجراحة$$, $$Post-Surgical Follow-up$$, 5,
   $$الفريق الطبي كان متاحًا للرد على كل استفساراتي بعد العملية مباشرة. هذا الاهتمام المستمر جعل رحلة تعافيي مطمئنة تمامًا.$$,
   $$The medical team was available to answer every question right after my operation. That continuous attention made my recovery journey completely reassuring.$$,
   '2026-08-02', true),
  ($$نورهان عادل$$, $$ندبة شبه غير مرئية ونتيجة تفوق توقعاتي$$, $$An Almost Invisible Scar and Results Beyond Expectations$$,
   $$جراحة الغدة الدرقية$$, $$Thyroid Surgery$$, 5,
   $$كنت قلقة جدًا بشأن الشكل الجمالي بعد جراحة الغدة الدرقية، لكن النتيجة فاقت كل توقعاتي بفضل دقة الدكتور محمود ومهارته.$$,
   $$I was very anxious about the cosmetic outcome of my thyroid surgery, but the result exceeded every expectation thanks to Dr. Mahmoud's precision and skill.$$,
   '2026-07-22', true),
  ($$مصطفى كمال$$, $$فريق متعدد التخصصات لم يترك شيئًا للصدفة$$, $$A Multidisciplinary Team That Left Nothing to Chance$$,
   $$جراحة أورام المعدة$$, $$Gastric Tumor Surgery$$, 5,
   $$من التشخيص وحتى تخطيط العلاج، شعرت أن فريقًا كاملًا من المتخصصين يقف خلف حالتي، وليس طبيبًا واحدًا فقط. هذا فرق كبير.$$,
   $$From diagnosis through treatment planning, I felt an entire team of specialists stood behind my case, not just one doctor. That made all the difference.$$,
   '2026-07-14', true),
  ($$هبة رفعت$$, $$حافظت على شكلي التجميلي واستأصلت الورم بأمان$$, $$My Shape Preserved, My Tumor Safely Removed$$,
   $$جراحة حافظة لشكل الثدي$$, $$Breast-Conserving Surgery$$, 5,
   $$اختيار الجراحة الحافظة لشكل الثدي كان قرارًا صعبًا، لكن الدكتور محمود طمأنني بخبرته وأثبتت النتيجة أنه القرار الصحيح.$$,
   $$Choosing breast-conserving surgery was a difficult decision, but Dr. Mahmoud's expertise reassured me — and the result proved it was the right choice.$$,
   '2026-07-05', true),
  ($$يوسف أنور$$, $$جراحة دقيقة لحالة معقدة في البنكرياس$$, $$A Precise Surgery for a Complex Pancreatic Case$$,
   $$جراحة أورام البنكرياس$$, $$Pancreatic Tumor Surgery$$, 4,
   $$حالتي كانت معقدة وسمعت آراء متضاربة من أكثر من طبيب، لكن دقة التشخيص والخطة الجراحية عند الدكتور محمود كانت الفارق الحقيقي في نجاح عمليتي.$$,
   $$My case was complex and I had heard conflicting opinions from multiple doctors, but Dr. Mahmoud's diagnostic precision and surgical plan truly made the difference in my successful surgery.$$,
   '2026-06-28', true);

-- ----------------------------------------------------------------------------
-- videos (from components/sections/videos/VideoLibraryGrid.tsx — the fuller
-- set; Home's "Featured Videos" now shows the first few by order_index).
-- ----------------------------------------------------------------------------
insert into public.videos (title_ar, title_en, description_ar, description_en, duration, thumbnail_url, video_url, order_index)
values
  ($$كيف تكتشف أورام الثدي مبكرًا؟$$, $$How to Detect Breast Cancer Early$$,
   $$علامات مبكرة يجب الانتباه لها وأهمية الفحص الدوري.$$, $$Early warning signs to watch for and why regular screening matters.$$,
   '02:14', '/images/video-thumb-1.jpg', '', 0),
  ($$ماذا تتوقع في يوم العملية؟$$, $$What to Expect on Surgery Day$$,
   $$خطوة بخطوة من الوصول إلى المستشفى وحتى غرفة العمليات.$$, $$A step-by-step walkthrough from hospital arrival to the operating room.$$,
   '03:05', '/images/video-thumb-2.jpg', '', 1),
  ($$نصائح للتعافي بعد الجراحة$$, $$Recovery Tips After Surgery$$,
   $$عادات يومية تسرّع التعافي وتقلل من المضاعفات.$$, $$Daily habits that speed up recovery and reduce complications.$$,
   '01:48', '/images/video-thumb-3.jpg', '', 2),
  ($$الفحص الذاتي للثدي خطوة بخطوة$$, $$Breast Self-Exam Step by Step$$,
   $$طريقة صحيحة وبسيطة لإجراء الفحص الذاتي في المنزل.$$, $$A simple, correct technique for performing a self-exam at home.$$,
   '02:40', '/images/video-thumb-1.jpg', '', 3),
  ($$التغذية السليمة أثناء العلاج$$, $$Proper Nutrition During Treatment$$,
   $$نصائح غذائية لدعم الجسم خلال رحلة العلاج.$$, $$Nutrition guidance to support the body throughout treatment.$$,
   '03:22', '/images/video-thumb-2.jpg', '', 4),
  ($$الجراحة بالمنظار: ماذا تعني لك؟$$, $$Laparoscopic Surgery: What It Means for You$$,
   $$الفرق بين الجراحة التقليدية والجراحة بالمنظار وفوائدها.$$, $$How laparoscopic surgery differs from open surgery, and its benefits.$$,
   '02:57', '/images/video-thumb-3.jpg', '', 5),
  ($$أسئلة شائعة قبل الجراحة$$, $$Common Questions Before Surgery$$,
   $$إجابات سريعة عن أكثر الأسئلة التي يطرحها المرضى.$$, $$Quick answers to the questions patients ask most often.$$,
   '02:05', '/images/video-thumb-1.jpg', '', 6),
  ($$دور الفريق الطبي متعدد التخصصات$$, $$The Role of the Multidisciplinary Team$$,
   $$كيف يتعاون فريق الأورام لوضع أفضل خطة علاجية.$$, $$How the oncology team collaborates to build the best treatment plan.$$,
   '03:11', '/images/video-thumb-2.jpg', '', 7),
  ($$الحياة بعد التعافي الكامل$$, $$Life After Full Recovery$$,
   $$قصص أمل ونصائح للعودة إلى الحياة الطبيعية بثقة.$$, $$Stories of hope and guidance for confidently returning to normal life.$$,
   '02:29', '/images/video-thumb-3.jpg', '', 8);

-- ----------------------------------------------------------------------------
-- faqs — Home (from HomeFAQ.tsx) + Services (from ServicesFAQ.tsx)
-- ----------------------------------------------------------------------------
insert into public.faqs (question_ar, question_en, answer_ar, answer_en, category, order_index)
values
  ($$ما هي التخصصات الجراحية التي يقدمها الدكتور محمود حسان؟$$, $$What surgical specialties does Dr. Mahmoud Hassan offer?$$,
   $$جراحات أورام الثدي والجهاز الهضمي والغدد والرقبة، بما في ذلك الجراحة بالمنظار والحد الأدنى من التدخل.$$,
   $$Breast, GI, and head & neck / thyroid oncology surgery, including laparoscopic and minimally invasive techniques.$$,
   'home', 0),
  ($$هل يمكنني الحصول على استشارة قبل تحديد موعد الجراحة؟$$, $$Can I get a consultation before scheduling surgery?$$,
   $$بالتأكيد، تبدأ كل حالة باستشارة تفصيلية لمناقشة التشخيص والخيارات العلاجية المتاحة قبل اتخاذ أي قرار.$$,
   $$Absolutely — every case starts with a detailed consultation to discuss the diagnosis and available treatment options before any decision is made.$$,
   'home', 1),
  ($$هل تقدمون رأيًا ثانيًا لحالات تم تشخيصها من قبل أطباء آخرين؟$$, $$Do you offer a second opinion for cases diagnosed elsewhere?$$,
   $$نعم، نراجع التقارير والأشعة السابقة ونقدم رأيًا طبيًا مستقلًا حول التشخيص وأنسب خطة علاجية.$$,
   $$Yes — previous reports and imaging are reviewed to provide an independent medical opinion on the diagnosis and the most suitable treatment plan.$$,
   'home', 2),
  ($$كم تستغرق فترة التعافي بعد الجراحة عادةً؟$$, $$How long does recovery typically take after surgery?$$,
   $$تختلف حسب نوع الجراحة وحالة المريض، وتتراوح غالبًا بين أسبوعين وستة أسابيع للتعافي الكامل.$$,
   $$It varies by procedure and patient condition, typically ranging from two to six weeks for full recovery.$$,
   'home', 3),
  ($$كيف يمكنني حجز أول موعد لي؟$$, $$How can I book my first appointment?$$,
   $$يمكنك الحجز مباشرة عبر واتساب أو الاتصال بالعيادة، وسيقوم فريقنا بتحديد أقرب موعد مناسب لحالتك.$$,
   $$You can book directly via WhatsApp or by calling the clinic, and our team will arrange the nearest suitable appointment.$$,
   'home', 4),
  ($$هل تتوفر متابعة عن بُعد بعد انتهاء العلاج؟$$, $$Is remote follow-up available after treatment ends?$$,
   $$نعم، نوفر متابعة دورية عبر استشارات الفيديو لمتابعة التعافي دون الحاجة لزيارة العيادة في كل مرة.$$,
   $$Yes — we offer regular video-consultation follow-ups to track recovery without needing an in-person visit every time.$$,
   'home', 5),
  ($$كم من الوقت أحتاج للاستعداد قبل الجراحة؟$$, $$How much time do I need to prepare before surgery?$$,
   $$تختلف فترة التحضير حسب نوع الجراحة، وعادة ما تشمل أسبوعًا إلى أسبوعين لإجراء الفحوصات اللازمة وتقييم الحالة الصحية العامة.$$,
   $$Preparation time varies by procedure, typically one to two weeks for the required tests and a general health assessment.$$,
   'services', 0),
  ($$ما هي الفحوصات المطلوبة قبل العملية؟$$, $$What tests are required before the operation?$$,
   $$تشمل عادة تحاليل دم شاملة، أشعة تصويرية (مثل الأشعة المقطعية أو الرنين المغناطيسي)، وتقييم القلب والتخدير حسب الحالة.$$,
   $$Typically comprehensive blood work, imaging (CT or MRI as needed), and a cardiac/anesthesia assessment based on the case.$$,
   'services', 1),
  ($$كم تستغرق مدة الإقامة بالمستشفى بعد الجراحة؟$$, $$How long is the hospital stay after surgery?$$,
   $$تتراوح غالبًا بين يومين وخمسة أيام حسب نوع الجراحة وسرعة التعافي، وسيتم إبلاغك بالمدة المتوقعة في خطة العلاج.$$,
   $$Usually between two and five days depending on the procedure and recovery pace — the expected duration is shared in your treatment plan.$$,
   'services', 2),
  ($$هل الجراحة بالمنظار مناسبة لحالتي؟$$, $$Is laparoscopic surgery suitable for my case?$$,
   $$تُناسب الجراحة بالمنظار عددًا كبيرًا من الحالات، وتُحدَّد ملاءمتها بعد التقييم الدقيق لموقع وحجم الورم.$$,
   $$Laparoscopic surgery suits a wide range of cases; suitability is confirmed after a precise review of the tumor's location and size.$$,
   'services', 3),
  ($$متى يمكنني العودة لممارسة حياتي الطبيعية؟$$, $$When can I return to normal life?$$,
   $$تختلف فترة التعافي الكامل من أسبوعين إلى ستة أسابيع، مع إمكانية استئناف الأنشطة الخفيفة في وقت أبكر تحت إشراف طبي.$$,
   $$Full recovery ranges from two to six weeks, with light activity often possible sooner under medical guidance.$$,
   'services', 4),
  ($$هل يلزم التوقف عن أدوية معينة قبل الجراحة؟$$, $$Do I need to stop certain medications before surgery?$$,
   $$قد يُطلب إيقاف بعض أدوية سيولة الدم أو المكملات قبل الجراحة بفترة محددة — سيتم مراجعة أدويتك بالتفصيل قبل الموعد.$$,
   $$Some blood thinners or supplements may need to be paused beforehand — your medications will be reviewed in detail ahead of the date.$$,
   'services', 5),
  ($$كيف يتم التعامل مع الألم بعد العملية؟$$, $$How is pain managed after the operation?$$,
   $$يتم وضع خطة متكاملة لإدارة الألم تشمل أدوية مناسبة ومتابعة يومية لضمان راحة المريض خلال فترة التعافي.$$,
   $$A complete pain-management plan is put in place, with appropriate medication and daily follow-up for comfort during recovery.$$,
   'services', 6),
  ($$هل تشمل الخدمة متابعة ما بعد الجراحة؟$$, $$Does the service include post-surgical follow-up?$$,
   $$نعم، تشمل رعايتنا برنامج متابعة دوري بعد الجراحة لضمان التعافي الآمن ورصد أي تطورات مبكرًا.$$,
   $$Yes — our care includes a regular post-surgical follow-up program to ensure safe recovery and catch any changes early.$$,
   'services', 7);

-- ----------------------------------------------------------------------------
-- articles (from components/sections/articles/articlesData.ts)
-- ----------------------------------------------------------------------------
insert into public.articles
  (slug, title_ar, title_en, category_ar, category_en, published_at, reading_time_minutes, featured_image_url, excerpt_ar, excerpt_en, content_ar, content_en, is_hero_featured)
values
  ('future-of-oncology-surgery', $$مستقبل جراحة الأورام: التطورات الحديثة$$, $$The Future of Oncology Surgery: Recent Advances$$,
   $$أبحاث وتطورات$$, $$Research & Advances$$, '2026-09-12', 6, '/images/treatment-team.jpg',
   $$كيف غيّرت تقنيات المنظار والروبوت من شكل التدخلات الجراحية للأورام.$$,
   $$How laparoscopic and robotic techniques have reshaped surgical oncology interventions.$$,
$$شهدت جراحة الأورام خلال العقد الأخير تطورًا ملحوظًا، بدءًا من دقة التشخيص وحتى أساليب التدخل الجراحي نفسها. لم يعد الهدف الوحيد هو استئصال الورم، بل أصبح الحفاظ على جودة حياة المريض جزءًا أساسيًا من أي خطة علاجية.

تقنيات الجراحة بالمنظار والجراحة بمساعدة الروبوت غيّرت الكثير من المفاهيم التقليدية؛ فبدلاً من الجروح الكبيرة وفترات التعافي الطويلة، أصبح بالإمكان إجراء تدخلات دقيقة للغاية من خلال فتحات صغيرة، مع نتائج تجميلية ووظيفية أفضل بكثير.

كما لعب التصوير التشخيصي المتقدم دورًا محوريًا في تحديد حدود الورم بدقة قبل الجراحة، مما يقلل من احتمالية استئصال أنسجة سليمة أو ترك أجزاء من الورم. هذا التكامل بين التشخيص الدقيق والتدخل الجراحي المتطور هو ما يميز الرعاية الحديثة لمرضى الأورام اليوم.

وفي النهاية، يبقى القرار السريري للجراح، المبني على خبرة عملية وتقييم شامل لكل حالة على حدة، هو العامل الأهم في اختيار الأسلوب الجراحي الأنسب — بغض النظر عن مدى تطور الأدوات المتاحة.$$,
$$Surgical oncology has advanced remarkably over the past decade, from diagnostic precision to the surgical interventions themselves. The goal is no longer just tumor removal — preserving the patient's quality of life has become a core part of every treatment plan.

Laparoscopic and robotic-assisted techniques have reshaped many traditional concepts. Instead of large incisions and long recovery periods, highly precise interventions are now possible through small openings, with far better cosmetic and functional outcomes.

Advanced diagnostic imaging has also played a pivotal role in accurately defining tumor margins before surgery, reducing the chance of removing healthy tissue or leaving tumor remnants behind. This integration of precise diagnostics with advanced surgical intervention is what defines modern oncology care today.

Ultimately, the surgeon's clinical judgment — built on hands-on experience and a thorough evaluation of each individual case — remains the most important factor in choosing the right surgical approach, regardless of how advanced the available tools become.$$,
   true),
  ('gi-early-signs', $$5 علامات مبكرة لأورام الجهاز الهضمي$$, $$5 Early Signs of GI Tumors$$,
   $$كشف مبكر$$, $$Early Detection$$, '2026-09-05', 3, '/images/article-gi-health.jpg',
   $$تعرف على العلامات التي تستدعي زيارة الطبيب مبكرًا.$$,
   $$Learn the warning signs that call for an early doctor visit.$$,
$$غالبًا ما تبدأ أورام الجهاز الهضمي بأعراض بسيطة يسهل تجاهلها أو ربطها بمشكلات هضمية شائعة، وهو ما يؤخر أحيانًا التشخيص المبكر. معرفة هذه العلامات والتعامل معها بجدية خطوة أساسية في رحلة العلاج.

من أبرز هذه العلامات: تغير مفاجئ وغير مبرر في عادات التبرز يستمر لأكثر من أسبوعين، فقدان وزن ملحوظ دون سبب واضح، الشعور المستمر بالتخمة أو الامتلاء حتى بعد تناول كميات قليلة من الطعام، وجود دم في البراز أو تغير لونه إلى الأسود الداكن.

العلامة الخامسة، وهي الألم المستمر في منطقة البطن الذي لا يزول مع الوقت أو يزداد سوءًا، تستحق اهتمامًا خاصًا خاصة إذا صاحبته أي من العلامات السابقة.

ظهور علامة واحدة أو أكثر من هذه العلامات لا يعني بالضرورة وجود ورم، لكنه يستدعي استشارة طبيب مختص لإجراء الفحوصات اللازمة والاطمئنان مبكرًا.$$,
$$GI tumors often begin with subtle symptoms that are easy to dismiss or attribute to common digestive issues, which can sometimes delay early diagnosis. Recognizing these signs and taking them seriously is a critical first step in the treatment journey.

Key warning signs include: a sudden, unexplained change in bowel habits lasting more than two weeks, noticeable weight loss without a clear cause, a persistent feeling of fullness even after eating small amounts, and blood in the stool or stool that turns dark black.

The fifth sign — persistent abdominal pain that doesn't go away or worsens over time — deserves particular attention, especially when accompanied by any of the signs above.

Having one or more of these signs doesn't necessarily mean a tumor is present, but it does warrant a visit to a specialist for the appropriate tests and early peace of mind.$$,
   false),
  ('nutrition-during-treatment', $$التغذية السليمة أثناء العلاج$$, $$Proper Nutrition During Treatment$$,
   $$تغذية$$, $$Nutrition$$, '2026-08-28', 4, '/images/article-nutrition.jpg',
   $$دليل عملي لدعم جسمك أثناء رحلة العلاج.$$,
   $$A practical guide to supporting your body through treatment.$$,
$$التغذية السليمة ليست تفصيلة ثانوية في رحلة علاج الأورام، بل عنصر أساسي يدعم قدرة الجسم على التعافي ومواجهة متطلبات العلاج، سواء كان جراحيًا أو كيميائيًا أو إشعاعيًا.

من المهم التركيز على البروتين عالي الجودة (كاللحوم والبيض والبقوليات) لدعم بناء الأنسجة وتعويض ما يفقده الجسم، بالإضافة إلى الخضروات والفواكه الطازجة الغنية بمضادات الأكسدة والفيتامينات.

قد يواجه بعض المرضى صعوبة في الأكل بسبب فقدان الشهية أو الغثيان؛ في هذه الحالات، يُفضّل تناول وجبات صغيرة ومتكررة بدلاً من ثلاث وجبات كبيرة، مع الحرص على شرب كميات كافية من السوائل على مدار اليوم.

يُنصح دائمًا بمناقشة النظام الغذائي مع الطبيب المعالج أو أخصائي تغذية متخصص، خاصة عند التفكير في أي مكملات غذائية، لضمان توافقها مع خطة العلاج ولتفادي أي تعارض غير مرغوب.$$,
$$Proper nutrition isn't a minor detail in the cancer treatment journey — it's a core element that supports the body's ability to recover and cope with the demands of treatment, whether surgical, chemotherapy, or radiation.

It's important to focus on high-quality protein (meat, eggs, legumes) to support tissue repair and replace what the body loses, along with fresh vegetables and fruits rich in antioxidants and vitamins.

Some patients may struggle to eat due to loss of appetite or nausea. In these cases, smaller, more frequent meals are preferable to three large ones, along with drinking enough fluids throughout the day.

It's always advisable to discuss your diet with your treating physician or a specialized nutritionist, especially before considering any supplements, to ensure they align with the treatment plan and avoid unwanted interactions.$$,
   false),
  ('questions-before-surgery', $$أسئلة شائعة قبل الجراحة$$, $$Common Questions Before Surgery$$,
   $$تحضير جراحي$$, $$Surgical Prep$$, '2026-08-20', 5, '/images/article-presurgery.jpg',
   $$إجابات واضحة تساعدك على الاستعداد النفسي والجسدي.$$,
   $$Clear answers to help you prepare, mentally and physically.$$,
$$من الطبيعي أن يشعر أي مريض بالقلق قبل الخضوع لجراحة، خاصة عند التعامل مع تشخيص ورم. لكن الفهم الواضح لما سيحدث قبل وأثناء وبعد العملية يقلل كثيرًا من هذا التوتر.

من أكثر الأسئلة شيوعًا: كم من الوقت سأحتاج للتعافي؟ وهل ستكون هناك ندبة واضحة؟ وهل سأحتاج لعلاج إضافي بعد الجراحة؟ الإجابات تختلف حسب نوع الورم ومرحلته وحالة المريض الصحية العامة، ولهذا فإن جلسة الاستشارة قبل الجراحة فرصة مهمة لطرح كل هذه التساؤلات بصراحة.

من المفيد أيضًا الاستفسار عن التحضيرات المطلوبة، مثل الفحوصات اللازمة، والأدوية التي يجب التوقف عنها مؤقتًا، وموعد آخر وجبة قبل التخدير، لضمان سير العملية دون أي تعقيدات غير متوقعة.

تذكّر دائمًا أن لا سؤال «بسيط جدًا» ليُطرح — التواصل المفتوح مع فريقك الطبي هو أساس الشعور بالثقة والاطمئنان قبل يوم الجراحة.$$,
$$It's completely natural to feel anxious before undergoing surgery, especially when dealing with a tumor diagnosis. A clear understanding of what will happen before, during, and after the procedure goes a long way toward easing that anxiety.

Among the most common questions: How long will recovery take? Will there be a visible scar? Will I need additional treatment after surgery? The answers vary depending on tumor type, stage, and the patient's overall health — which is why the pre-surgery consultation is an important opportunity to ask all of these questions openly.

It's also worth asking about required preparations, such as necessary tests, medications to temporarily stop, and the timing of your last meal before anesthesia, to ensure the procedure goes smoothly without unexpected complications.

Remember: no question is ever 'too simple' to ask. Open communication with your medical team is the foundation of feeling confident and at ease before surgery day.$$,
   false),
  ('self-exams-importance', $$الفحص الذاتي وأهمية الكشف المبكر$$, $$Self-Exams & the Importance of Early Detection$$,
   $$كشف مبكر$$, $$Early Detection$$, '2026-08-12', 4, '/images/surgery-breast.jpg',
   $$عادة بسيطة قد تُحدث فرقًا كبيرًا في نتائج العلاج.$$,
   $$A simple habit that can make a real difference in treatment outcomes.$$,
$$يُعد الكشف المبكر أحد أهم العوامل التي تحدد نجاح علاج الأورام؛ فكلما اكتُشف الورم في مرحلة مبكرة، زادت فرص الشفاء الكامل وقلّت الحاجة إلى تدخلات جراحية موسّعة.

الفحص الذاتي الدوري، خاصة لأورام الثدي، عادة بسيطة يمكن لأي شخص تعلمها وممارستها بانتظام في المنزل. الهدف ليس التشخيص الذاتي، بل التعرف على الشكل الطبيعي للجسم بحيث يسهل ملاحظة أي تغيير غير معتاد مبكرًا.

بجانب الفحص الذاتي، يبقى الفحص الدوري لدى طبيب متخصص والالتزام بمواعيد الأشعة التصويرية الموصى بها حسب العمر والتاريخ العائلي خط الدفاع الأهم، لأنه يكشف تغيرات قد لا تظهر أو تُلاحظ في الفحص الذاتي وحده.

لا تنتظر ظهور أعراض واضحة لتبدأ الاهتمام بالكشف المبكر — اجعله جزءًا من روتينك الصحي المنتظم.$$,
$$Early detection is one of the most important factors determining the success of cancer treatment; the earlier a tumor is found, the higher the chances of full recovery and the less need for extensive surgical intervention.

Regular self-exams, especially for breast tumors, are a simple habit anyone can learn and practice at home. The goal isn't self-diagnosis — it's becoming familiar with your body's normal state so any unusual change is noticed early.

Alongside self-exams, regular check-ups with a specialist and keeping up with recommended imaging screenings based on age and family history remain the most important line of defense, as they can catch changes that self-exams alone might miss.

Don't wait for obvious symptoms to start caring about early detection — make it part of your regular health routine.$$,
   false),
  ('understanding-pathology-report', $$فهم التقرير المرضي بعد الجراحة$$, $$Understanding Your Pathology Report$$,
   $$تشخيص$$, $$Diagnosis$$, '2026-08-03', 5, '/images/treatment-diagnosis.jpg',
   $$دليل مبسط لقراءة أهم بنود التقرير دون تعقيد.$$,
   $$A simplified guide to the key sections of your report, explained clearly.$$,
$$بعد أي جراحة لاستئصال ورم، تُرسل العينة إلى المختبر لتحليلها بدقة، وتظهر النتائج في تقرير يُعرف بـ«التقرير المرضي». قد تبدو لغة هذا التقرير معقدة للوهلة الأولى، لكن فهم بنوده الأساسية يساعد المريض على المشاركة الفعّالة في قرارات علاجه.

من أهم البنود: نوع الورم ودرجته (Grade)، والتي تصف مدى تشابه خلايا الورم بالخلايا الطبيعية، وحجم الورم، وحالة «هوامش الاستئصال» (Margins) التي تشير إلى ما إذا كانت كل الأنسجة السرطانية قد أُزيلت بالكامل.

كما يتضمن التقرير غالبًا معلومات عن الغدد الليمفاوية المجاورة، وما إذا كان هناك انتشار للورم إليها، وهي معلومة حاسمة في تحديد مرحلة المرض (Staging) والحاجة إلى علاج إضافي بعد الجراحة.

الطبيب المعالج هو الأقدر على شرح هذا التقرير بالتفصيل وربط نتائجه بخطة العلاج القادمة، ولا حرج أبدًا في طلب توضيح أي مصطلح غير مفهوم.$$,
$$After any tumor-removal surgery, the sample is sent to a lab for detailed analysis, and the results appear in what's known as a 'pathology report.' The language can seem complex at first, but understanding its key sections helps patients take an active role in their treatment decisions.

Key sections include: the tumor's type and grade — which describes how closely the tumor cells resemble normal cells — its size, and the status of the 'margins,' indicating whether all cancerous tissue was fully removed.

The report also typically includes information about nearby lymph nodes and whether the tumor has spread to them — a crucial factor in determining the disease stage and the need for further treatment after surgery.

Your treating physician is best placed to walk through this report in detail and connect its findings to your upcoming treatment plan — there's never any harm in asking for any term to be clarified.$$,
   false),
  ('life-after-recovery', $$الحياة بعد التعافي: العودة للحياة الطبيعية$$, $$Life After Recovery: Returning to Normal$$,
   $$تعافي$$, $$Recovery$$, '2026-07-25', 4, '/images/treatment-followup.jpg',
   $$خطوات عملية للانتقال بثقة إلى مرحلة ما بعد العلاج.$$,
   $$Practical steps for confidently transitioning into life after treatment.$$,
$$الوصول إلى مرحلة التعافي الكامل بعد رحلة علاج طويلة إنجاز كبير، لكنه غالبًا ما يأتي مصحوبًا بمشاعر مختلطة — فرح بانتهاء العلاج، وفي الوقت نفسه قلق من العودة إلى الحياة «الطبيعية» بعد كل ما مرّ به المريض.

من المهم منح النفس الوقت الكافي للتكيف، دون ضغط لاستعادة كل شيء دفعة واحدة. العودة التدريجية للنشاط البدني، وممارسة الرياضة الخفيفة بعد استشارة الطبيب، تساعدان الجسم على استعادة قوته تدريجيًا.

المتابعة الدورية بعد انتهاء العلاج لا تقل أهمية عن العلاج نفسه؛ فهي تضمن رصد أي تغيرات مبكرًا وتمنح المريض راحة نفسية بمعرفة أن حالته تحت المتابعة المستمرة.

وأخيرًا، الدعم النفسي والاجتماعي من العائلة والأصدقاء، أو حتى من مجموعات دعم متخصصة، يلعب دورًا لا يقل أهمية عن الرعاية الطبية في تسهيل هذه المرحلة الجديدة من الحياة.$$,
$$Reaching full recovery after a long treatment journey is a major milestone, but it often comes with mixed emotions — joy that treatment has ended, alongside anxiety about returning to 'normal' life after everything the patient has been through.

It's important to give yourself enough time to adjust, without pressure to get everything back at once. Gradually returning to physical activity, and light exercise after consulting your doctor, helps the body regain its strength over time.

Regular follow-up after treatment ends is just as important as the treatment itself — it ensures any changes are caught early and gives patients peace of mind knowing their condition is being continuously monitored.

Finally, emotional and social support from family, friends, or even specialized support groups plays a role that's just as important as medical care in easing this new chapter of life.$$,
   false);

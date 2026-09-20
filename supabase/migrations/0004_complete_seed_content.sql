-- ============================================================================
-- Completes the seeding started in 0003: that migration's inserts into
-- career_milestones, certifications, treatment_protocol_steps and
-- procedure_categories/procedure_items (originally seeded as short
-- "starter rows" in 0002) were partial and, in a few spots, paraphrased
-- rather than verbatim. This replaces those four tables' rows with the
-- complete, verbatim copy from the original hardcoded components
-- (CareerTimeline.tsx, Certifications.tsx, TreatmentProtocol.tsx,
-- ProceduresBreakdown.tsx) so the live site matches the pre-CMS site
-- exactly. Safe to run once against a project that only has 0001–0003
-- applied; any admin edits already made to these four tables will be
-- overwritten.
-- ============================================================================

delete from public.career_milestones;
delete from public.certifications;
delete from public.treatment_protocol_steps;
delete from public.procedure_categories; -- cascades to procedure_items

-- ----------------------------------------------------------------------------
-- career_milestones (from components/sections/about/CareerTimeline.tsx)
-- ----------------------------------------------------------------------------
insert into public.career_milestones (year, title_ar, title_en, description_ar, description_en, icon_tag, order_index)
values
  ('2008', $$بكالوريوس الطب والجراحة$$, $$MBBCh, Faculty of Medicine$$,
   $$تخرج بتقدير امتياز من كلية طب جامعة القاهرة.$$,
   $$Graduated with honors from the Faculty of Medicine, Cairo University.$$,
   'GraduationCap', 0),
  ('2012', $$الماجستير في الجراحة العامة$$, $$Master's Degree in General Surgery$$,
   $$حصل على درجة الماجستير في الجراحة العامة من جامعة القاهرة.$$,
   $$Earned a Master's degree in General Surgery from Cairo University.$$,
   'Stethoscope', 1),
  ('2015', $$زمالة جراحة الأورام$$, $$Fellowship in Surgical Oncology$$,
   $$أتم برنامج الزمالة في جراحة الأورام بالمعهد القومي للأورام.$$,
   $$Completed a fellowship in surgical oncology at the National Cancer Institute.$$,
   'Award', 2),
  ('2018', $$الدكتوراه في جراحة الأورام$$, $$MD in Surgical Oncology$$,
   $$حصل على درجة الدكتوراه في جراحة الأورام من جامعة القاهرة.$$,
   $$Earned an MD in Surgical Oncology from Cairo University.$$,
   'GraduationCap', 3),
  ('2020', $$استشاري جراحة الأورام$$, $$Consultant of Surgical Oncology$$,
   $$تم تعيينه استشاريًا لجراحة الأورام بالمعهد القومي للأورام - جامعة القاهرة.$$,
   $$Appointed Consultant of Surgical Oncology at the National Cancer Institute, Cairo University.$$,
   'ShieldCheck', 4),
  ('2023', $$عضو الجمعية المصرية لجراحة الأورام$$, $$Member, Egyptian Society of Surgical Oncology$$,
   $$انضم إلى عضوية الجمعية المصرية لجراحة الأورام تقديرًا لإسهاماته العلمية.$$,
   $$Joined the Egyptian Society of Surgical Oncology in recognition of his scientific contributions.$$,
   'Trophy', 5);

-- ----------------------------------------------------------------------------
-- certifications (from components/sections/about/Certifications.tsx)
-- ----------------------------------------------------------------------------
insert into public.certifications (title_ar, title_en, issuer_ar, issuer_en, detail_ar, detail_en, icon_tag, order_index)
values
  ($$بكالوريوس ودكتوراه الطب$$, $$MBBCh & MD in Surgery$$, $$جامعة القاهرة$$, $$Cairo University$$,
   $$تأهيل أكاديمي كامل في الطب والجراحة العامة، بتقدير امتياز مع مرتبة الشرف.$$,
   $$Full academic qualification in medicine and general surgery, graduated with honors.$$,
   'GraduationCap', 0),
  ($$زمالة جراحة الأورام$$, $$Fellowship in Surgical Oncology$$, $$المعهد القومي للأورام$$, $$National Cancer Institute$$,
   $$تدريب متخصص مكثف على أحدث تقنيات جراحة الأورام تحت إشراف نخبة من الأساتذة.$$,
   $$Intensive specialized training in the latest surgical oncology techniques under leading professors.$$,
   'Award', 1),
  ($$عضوية الجمعية المصرية لجراحة الأورام$$, $$Egyptian Society of Surgical Oncology$$, $$عضو فعال$$, $$Active Member$$,
   $$مشاركة فعالة في المؤتمرات العلمية وتطوير معايير الممارسة الجراحية محليًا.$$,
   $$Active participation in scientific conferences and advancing local surgical practice standards.$$,
   'ShieldCheck', 2),
  ($$عضوية دولية في جراحة الأورام$$, $$International Surgical Oncology Society$$, $$عضو دولي$$, $$International Member$$,
   $$تواصل مستمر مع أحدث الأبحاث والبروتوكولات العلاجية العالمية.$$,
   $$Ongoing engagement with the latest global research and treatment protocols.$$,
   'Globe2', 3),
  ($$أبحاث ومنشورات علمية دولية$$, $$Internationally Published Research$$, $$دوريات طبية محكّمة$$, $$Peer-Reviewed Journals$$,
   $$مساهمات بحثية منشورة في دوريات طبية محكّمة في مجال جراحة الأورام.$$,
   $$Research contributions published in peer-reviewed surgical oncology journals.$$,
   'BookOpen', 4),
  ($$تدريب وإشراف أطباء مقيمين$$, $$Resident Physician Training$$, $$المعهد القومي للأورام$$, $$National Cancer Institute$$,
   $$إشراف أكاديمي وعملي على أطباء مقيمين لصقل مهاراتهم الجراحية.$$,
   $$Academic and hands-on supervision of resident physicians to sharpen their surgical skills.$$,
   'UsersRound', 5);

-- ----------------------------------------------------------------------------
-- treatment_protocol_steps (from components/sections/services/TreatmentProtocol.tsx)
-- ----------------------------------------------------------------------------
insert into public.treatment_protocol_steps (title_ar, title_en, description_ar, description_en, icon_tag, order_index)
values
  ($$التشخيص الدقيق$$, $$Accurate Diagnosis$$,
   $$فحص إكلينيكي شامل وأحدث وسائل التصوير والتحاليل لتحديد طبيعة الحالة بدقة.$$,
   $$A thorough clinical exam plus the latest imaging and labs to precisely define the case.$$,
   'ScanSearch', 0),
  ($$تحديد مرحلة الورم$$, $$Staging$$,
   $$تحديد حجم الورم ومدى انتشاره لاختيار المسار العلاجي الأنسب.$$,
   $$Determining the tumor's size and spread to select the most suitable treatment path.$$,
   'Layers', 1),
  ($$القرار متعدد التخصصات$$, $$Multidisciplinary Decision$$,
   $$مناقشة الحالة مع فريق متكامل من أطباء الأورام الطبية والإشعاعية.$$,
   $$The case is reviewed with a full team of medical and radiation oncologists.$$,
   'UsersRound', 2),
  ($$خطة العلاج المخصصة$$, $$Personalized Treatment Plan$$,
   $$وضع وتنفيذ خطة علاجية (جراحة أو علاج) مصممة خصيصًا لحالة المريض.$$,
   $$Designing and executing a treatment plan (surgery or therapy) built around the patient.$$,
   'ClipboardCheck', 3);

-- ----------------------------------------------------------------------------
-- procedure_categories / procedure_items (from
-- components/sections/services/ProceduresBreakdown.tsx)
-- ----------------------------------------------------------------------------
with cat as (
  insert into public.procedure_categories (title_ar, title_en, icon_tag, image_url, order_index)
  values ($$أورام الثدي$$, $$Breast Tumors$$, 'HeartPulse', '/images/surgery-breast.jpg', 0)
  returning id
)
insert into public.procedure_items (category_id, title_ar, title_en, description_ar, description_en, order_index)
select id, title_ar, title_en, description_ar, description_en, order_index
from cat, (values
  ($$سرطان الثدي الغازي$$, $$Invasive Breast Cancer$$,
   $$استئصال دقيق للورم مع الحفاظ قدر الإمكان على الشكل التجميلي للثدي.$$,
   $$Precise tumor removal while preserving the breast's shape wherever possible.$$, 0),
  ($$جراحات الحفاظ على الثدي$$, $$Breast-Conserving Surgery$$,
   $$إزالة الورم فقط مع الحفاظ على أكبر قدر ممكن من أنسجة الثدي السليمة.$$,
   $$Removing only the tumor while preserving as much healthy breast tissue as possible.$$, 1),
  ($$إعادة بناء الثدي$$, $$Breast Reconstruction$$,
   $$إعادة بناء شكل الثدي بعد الاستئصال بالتنسيق مع جراحي التجميل.$$,
   $$Restoring the breast's shape after mastectomy, coordinated with plastic surgeons.$$, 2)
) as t(title_ar, title_en, description_ar, description_en, order_index);

with cat as (
  insert into public.procedure_categories (title_ar, title_en, icon_tag, image_url, order_index)
  values ($$أورام الجهاز الهضمي$$, $$GI Tumors$$, 'Scissors', '/images/surgery-gi.jpg', 1)
  returning id
)
insert into public.procedure_items (category_id, title_ar, title_en, description_ar, description_en, order_index)
select id, title_ar, title_en, description_ar, description_en, order_index
from cat, (values
  ($$سرطان المعدة$$, $$Stomach Cancer$$,
   $$استئصال جراحي دقيق لأورام المعدة مع الحفاظ على وظائف الجهاز الهضمي.$$,
   $$Precise surgical removal of stomach tumors while preserving digestive function.$$, 0),
  ($$سرطان القولون والمستقيم$$, $$Colorectal Cancer$$,
   $$علاج جراحي شامل لأورام القولون والمستقيم بأحدث البروتوكولات.$$,
   $$Comprehensive surgical treatment of colon and rectal tumors using the latest protocols.$$, 1),
  ($$سرطان الكبد والبنكرياس$$, $$Liver & Pancreatic Cancer$$,
   $$تدخلات جراحية دقيقة لأورام الكبد والبنكرياس المعقدة.$$,
   $$Precise surgical interventions for complex liver and pancreatic tumors.$$, 2)
) as t(title_ar, title_en, description_ar, description_en, order_index);

with cat as (
  insert into public.procedure_categories (title_ar, title_en, icon_tag, image_url, order_index)
  values ($$أورام الغدد والرقبة$$, $$Head & Neck Tumors$$, 'Stethoscope', '/images/surgery-headneck.jpg', 2)
  returning id
)
insert into public.procedure_items (category_id, title_ar, title_en, description_ar, description_en, order_index)
select id, title_ar, title_en, description_ar, description_en, order_index
from cat, (values
  ($$سرطان الغدة الدرقية$$, $$Thyroid Cancer$$,
   $$استئصال دقيق للغدة الدرقية مع الحفاظ على الأعصاب المحيطة.$$,
   $$Precise thyroid removal with careful preservation of the surrounding nerves.$$, 0),
  ($$أورام الغدد اللعابية$$, $$Salivary Gland Tumors$$,
   $$علاج جراحي دقيق لأورام الغدد اللعابية الحميدة والخبيثة.$$,
   $$Precise surgical treatment of benign and malignant salivary gland tumors.$$, 1),
  ($$أورام الرأس والرقبة$$, $$Head & Neck Tumors$$,
   $$تدخلات جراحية متخصصة لأورام منطقة الرأس والرقبة المعقدة.$$,
   $$Specialized surgical interventions for complex head and neck tumors.$$, 2)
) as t(title_ar, title_en, description_ar, description_en, order_index);

with cat as (
  insert into public.procedure_categories (title_ar, title_en, icon_tag, image_url, order_index)
  values ($$الجراحة بالمناظير$$, $$Laparoscopic Procedures$$, 'Microscope', '/images/surgery-laparoscopic.jpg', 3)
  returning id
)
insert into public.procedure_items (category_id, title_ar, title_en, description_ar, description_en, order_index)
select id, title_ar, title_en, description_ar, description_en, order_index
from cat, (values
  ($$استئصال أورام القولون بالمنظار$$, $$Laparoscopic Colon Resection$$,
   $$استئصال أورام القولون من خلال جروح صغيرة وتعافٍ أسرع.$$,
   $$Removing colon tumors through small incisions for a faster recovery.$$, 0),
  ($$استئصال المرارة بالمنظار$$, $$Laparoscopic Gallbladder Removal$$,
   $$إزالة المرارة والأورام الصفراوية بأقل تدخل جراحي ممكن.$$,
   $$Removing the gallbladder and biliary tumors with minimal surgical intervention.$$, 1),
  ($$الجراحة بمساعدة الروبوت$$, $$Robotic-Assisted Surgery$$,
   $$دقة إضافية في التدخلات الجراحية المعقدة باستخدام تقنية الروبوت.$$,
   $$Added precision in complex procedures using robotic-assisted technology.$$, 2)
) as t(title_ar, title_en, description_ar, description_en, order_index);

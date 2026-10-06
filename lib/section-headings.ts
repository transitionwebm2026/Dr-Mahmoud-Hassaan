import type { Bilingual } from "@/lib/i18n";
import type { SectionHeadingRow } from "@/lib/supabase/types";
import { toBilingual } from "@/lib/supabase/content";

/**
 * Every admin-editable section heading on the site (the small label chip,
 * the <h2> title and the optional description at the top of a section),
 * grouped by page slug. Keys match `section_headings.section_key` rows; the
 * copy here is what the site shipped with and is used whenever a page has no
 * row for that section yet (e.g. before migration 0011 is applied).
 *
 * Adding a new section heading: add it here, seed it in a migration, pass
 * `headings.<key>` into the section component from its `app/(site)` page,
 * and render a `SectionHeadingForm` for it in the admin page editor.
 */
interface SectionHeadingDefinition {
  /** Name shown on the admin form. */
  label: string;
  eyebrow: Bilingual;
  /** Wrap words in *asterisks* to color them with the brand gradient. */
  title: Bilingual;
  description?: Bilingual;
}

export const SECTION_HEADINGS = {
  home: {
    intro_video: {
      label: "Doctor Intro Video",
      eyebrow: { ar: "تعرف على طبيبك", en: "Meet Your Doctor" },
      title: { ar: "رسالة تعريفية من *د. محمود حسان*", en: "An introduction from *Dr. Mahmoud Hassan*" },
      description: {
        ar: "في هذا الفيديو، يشارككم د. محمود حسان نهجه في التعامل مع مرضى الأورام، وأهمية التشخيص المبكر، ودور الجراحة الدقيقة في رحلة الشفاء.",
        en: "In this short video, Dr. Mahmoud Hassan shares his approach to treating oncology patients, the importance of early diagnosis, and the role of precise surgery in the recovery journey.",
      },
    },
    key_surgeries: {
      label: "Key Surgeries",
      eyebrow: { ar: "أبرز الجراحات", en: "Key Surgeries" },
      title: { ar: "تخصصات جراحية دقيقة", en: "Precision Surgical Specialties" },
      description: {
        ar: "نقدم رعاية جراحية متكاملة لمختلف أنواع الأورام بأحدث التقنيات وأعلى معايير السلامة.",
        en: "Comprehensive surgical care for a wide range of tumors using the latest techniques and the highest safety standards.",
      },
    },
    key_treatments: {
      label: "Key Treatments",
      eyebrow: { ar: "أبرز العلاجات", en: "Key Treatments" },
      title: { ar: "رعاية متكاملة في كل خطوة", en: "Integrated Care at Every Step" },
      description: {
        ar: "من التشخيص الدقيق إلى التعافي الكامل، نرافق مرضانا بخطة علاجية واضحة ومخصصة.",
        en: "From accurate diagnosis to full recovery, patients are guided with a clear, personalized plan.",
      },
    },
    why_doctor: {
      label: "Why Choose the Doctor",
      eyebrow: { ar: "لماذا نحن", en: "Why Choose Us" },
      title: { ar: "لماذا تختار *د. محمود حسان*؟", en: "Why Choose *Dr. Mahmoud Hassan*?" },
    },
    patient_journey: {
      label: "Patient Journey",
      eyebrow: { ar: "رحلة المريض", en: "Patient Journey" },
      title: { ar: "خطوتك نحو الشفاء", en: "Your Roadmap to Recovery" },
      description: {
        ar: "خارطة طريق واضحة من التشخيص وحتى التعافي الكامل بعد الجراحة.",
        en: "A clear, step-by-step roadmap from diagnosis to full post-op recovery.",
      },
    },
    reviews: {
      label: "Patient Reviews Slider",
      eyebrow: { ar: "آراء المرضى", en: "Patient Reviews" },
      title: { ar: "ماذا يقول مرضانا؟", en: "What Our Patients Say" },
    },
    featured_videos: {
      label: "Featured Videos",
      eyebrow: { ar: "فيديوهات مختارة", en: "Featured Videos" },
      title: { ar: "محتوى توعوي مرئي", en: "Educational Video Content" },
    },
    faq: {
      label: "FAQ",
      eyebrow: { ar: "الأسئلة الشائعة", en: "Frequently Asked Questions" },
      title: { ar: "إجابات سريعة على أهم استفساراتك", en: "Quick Answers to Your Top Questions" },
      description: {
        ar: "نظرة عامة على التخصصات والاستشارات والحجز والمتابعة بعد العلاج.",
        en: "An overview of specialties, consultations, booking, and post-treatment follow-up.",
      },
    },
  },
  about: {
    doctor_message: {
      label: "Message From the Doctor",
      eyebrow: { ar: "كلمة من الدكتور", en: "A Message From the Doctor" },
      title: { ar: "رحلتي معكم تبدأ من هنا", en: "My journey with you starts here" },
    },
    career_timeline: {
      label: "Career Timeline",
      eyebrow: { ar: "المسيرة العملية", en: "Career Journey" },
      title: { ar: "محطات في مسيرة التميز", en: "Milestones of a Distinguished Career" },
      description: {
        ar: "من مقاعد الدراسة إلى غرف العمليات، رحلة علمية وعملية مبنية على التعلم المستمر.",
        en: "From the classroom to the operating room — a journey built on continuous learning.",
      },
    },
    intro_video: {
      label: "Introductory Video",
      eyebrow: { ar: "فيديو تعريفي", en: "Introductory Video" },
      title: { ar: "قصة الدكتور محمود حسان", en: "Dr. Mahmoud Hassan's Story" },
      description: {
        ar: "شاهد الفيديو للتعرف أكثر على رؤيته الطبية ونهجه في التعامل مع مرضى الأورام.",
        en: "Watch to learn more about his medical vision and approach to caring for oncology patients.",
      },
    },
    expertise: {
      label: "Areas of Expertise",
      eyebrow: { ar: "مجالات الخبرة والتخصص", en: "Areas of Expertise" },
      title: { ar: "تخصص دقيق في كل حالة", en: "Precision Focus in Every Case" },
      description: {
        ar: "سنوات من الممارسة المتخصصة في أكثر مجالات جراحة الأورام دقة وحساسية.",
        en: "Years of focused practice in some of the most precise and delicate fields of surgical oncology.",
      },
    },
    certifications: {
      label: "Certificates & Accreditations",
      eyebrow: { ar: "الشهادات والإنجازات", en: "Certificates & Accreditations" },
      title: { ar: "اعتمادات موثوقة عالميًا", en: "Globally Trusted Credentials" },
      description: { ar: "مرر المؤشر أو اضغط على البطاقة لمعرفة المزيد.", en: "Hover or tap a card to reveal more detail." },
    },
  },
  services: {
    treatment_protocol: {
      label: "Finding the Right Treatment Plan",
      eyebrow: { ar: "إيجاد خطة العلاج المناسبة", en: "Finding the Right Treatment Plan" },
      title: { ar: "بروتوكول واضح لكل حالة", en: "A Clear Protocol for Every Case" },
      description: {
        ar: "خطوات مبنية على أفضل الممارسات العالمية — اضغط على أي خطوة لاستكشافها.",
        en: "Steps built on global best practices — click any step to explore it.",
      },
    },
    surgeries_grid: {
      label: "Specialized Surgeries Grid",
      eyebrow: { ar: "التخصصات الطبية والجراحية", en: "Medical & Surgical Specialties" },
      title: { ar: "خدمات جراحية دقيقة ومتكاملة", en: "Precise, Integrated Surgical Care" },
      description: {
        ar: "تخصصات جراحية دقيقة تغطي أكثر أنواع أورام الجهاز الهضمي والثدي والرأس والرقبة شيوعًا.",
        en: "Focused surgical specialties covering the most common breast, GI, and head & neck tumor types.",
      },
    },
    procedures: {
      label: "Procedures & Conditions Breakdown",
      eyebrow: { ar: "تفاصيل الجراحات والأمراض", en: "Procedures & Conditions" },
      title: { ar: "تعرف على تفاصيل كل تخصص", en: "Explore Each Specialty in Detail" },
      description: {
        ar: "اختر تخصصًا لعرض الحالات والإجراءات التي يتم التعامل معها ضمنه.",
        en: "Select a specialty to see the specific conditions and procedures treated under it.",
      },
    },
    faq: {
      label: "Extended Clinical FAQ",
      eyebrow: { ar: "الأسئلة الشائعة", en: "Frequently Asked Questions" },
      title: { ar: "كل ما تريد معرفته عن الجراحة", en: "Everything You Need to Know About Surgery" },
      description: {
        ar: "إجابات تفصيلية حول التحضير للجراحة والتعافي والإقامة بالمستشفى.",
        en: "Detailed answers on surgical prep, recovery, and hospital stays.",
      },
    },
  },
  videos: {
    library: {
      label: "Video Library Grid",
      eyebrow: { ar: "مكتبة الفيديوهات الطبية", en: "Medical Video Library" },
      title: { ar: "محتوى توعوي يستحق المشاهدة", en: "Educational Content Worth Watching" },
      description: {
        ar: "شروحات جراحية ونصائح للمرضى في فيديوهات قصيرة وواضحة.",
        en: "Surgical explanations and patient advice in short, clear videos.",
      },
    },
  },
  articles: {
    featured: {
      label: "Featured Article",
      eyebrow: { ar: "مقال مميز", en: "Featured Article" },
      title: { ar: "المقالات والمحتوى الطبي", en: "Articles & Medical Insights" },
    },
    grid: {
      label: "Articles Grid",
      eyebrow: { ar: "أحدث المقالات", en: "Latest Articles" },
      title: { ar: "مقالات تستحق وقتك", en: "Articles Worth Your Time" },
    },
  },
  reviews: {
    grid: {
      label: "Patient Reviews Grid",
      eyebrow: { ar: "قصص حقيقية من مرضانا", en: "Real Stories From Our Patients" },
      title: { ar: "تجارب موثّقة برحلة التعافي الكاملة", en: "Verified Experiences Across the Full Recovery Journey" },
      description: {
        ar: "كل تقييم هنا من مريض حقيقي خضع للعلاج على يد الدكتور محمود حسان وفريقه الطبي.",
        en: "Every review here comes from a real patient treated by Dr. Mahmoud Hassan and his medical team.",
      },
    },
  },
  contact: {
    booking: {
      label: "Booking Form & Clinic Info",
      eyebrow: { ar: "الحجز والتواصل", en: "Booking & Contact" },
      title: { ar: "احجز استشارتك أو تواصل معنا مباشرة", en: "Book Your Consultation or Reach Us Directly" },
      description: {
        ar: "املأ الفورم لحجز استشارتك عبر واتساب، أو تعرف على موقع العيادة ومواعيد العمل وخط الطوارئ.",
        en: "Fill in the form to book your consultation via WhatsApp, or find the clinic's location, hours, and emergency hotline.",
      },
    },
  },
} satisfies Record<string, Record<string, SectionHeadingDefinition>>;

export type SectionHeadingPage = keyof typeof SECTION_HEADINGS;
export type SectionHeadingKey<P extends SectionHeadingPage> = keyof (typeof SECTION_HEADINGS)[P] & string;

/** What a section component renders. A missing eyebrow/description is hidden. */
export interface SectionHeadingContent {
  eyebrow?: Bilingual;
  title: Bilingual;
  description?: Bilingual;
}

export type SectionHeadingFields = Pick<
  SectionHeadingRow,
  "eyebrow_ar" | "eyebrow_en" | "title_ar" | "title_en" | "description_ar" | "description_en"
>;

function getDefinition(page: SectionHeadingPage, key: string): SectionHeadingDefinition {
  const definition = (SECTION_HEADINGS[page] as Record<string, SectionHeadingDefinition>)[key];
  if (!definition) throw new Error(`Unknown section heading "${page}/${key}" — add it to lib/section-headings.ts.`);
  return definition;
}

function findRow(rows: SectionHeadingRow[] | null | undefined, page: string, key: string) {
  return rows?.find((row) => row.page_slug === page && row.section_key === key);
}

/**
 * Resolves every heading on a page for its section components: the admin's
 * saved row when there is one (blank eyebrow/description = hidden), else the
 * built-in copy above.
 */
export function resolveSectionHeadings<P extends SectionHeadingPage>(
  page: P,
  rows: SectionHeadingRow[] | null | undefined
): Record<SectionHeadingKey<P>, SectionHeadingContent> {
  const definitions = SECTION_HEADINGS[page] as Record<string, SectionHeadingDefinition>;
  return Object.fromEntries(
    Object.entries(definitions).map(([key, definition]) => {
      const row = findRow(rows, page, key);
      const content: SectionHeadingContent = row
        ? {
            eyebrow: toBilingual(row.eyebrow_ar, row.eyebrow_en),
            title: toBilingual(row.title_ar, row.title_en) ?? definition.title,
            description: toBilingual(row.description_ar, row.description_en),
          }
        : { eyebrow: definition.eyebrow, title: definition.title, description: definition.description };
      return [key, content];
    })
  ) as Record<SectionHeadingKey<P>, SectionHeadingContent>;
}

/** The admin form's label + starting values for one section heading. */
export function getSectionHeadingFormData(
  page: SectionHeadingPage,
  key: string,
  rows: SectionHeadingRow[] | null | undefined
): { label: string; fields: SectionHeadingFields } {
  const definition = getDefinition(page, key);
  const row = findRow(rows, page, key);
  return {
    label: definition.label,
    fields: row ?? {
      eyebrow_ar: definition.eyebrow.ar,
      eyebrow_en: definition.eyebrow.en,
      title_ar: definition.title.ar,
      title_en: definition.title.en,
      description_ar: definition.description?.ar ?? "",
      description_en: definition.description?.en ?? "",
    },
  };
}

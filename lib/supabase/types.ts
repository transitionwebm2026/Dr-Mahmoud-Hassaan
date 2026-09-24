/**
 * Hand-written types mirroring `supabase/migrations/0001_init_cms_schema.sql`.
 *
 * These are plain row interfaces, not threaded through `createClient<Database>()`
 * as a generic: the `@supabase/supabase-js` version pinned in this project has a
 * generic-inference bug where a `Database` type parameter resolves every table's
 * Row/Insert/Update to `never` regardless of its shape (reproduced with the
 * library's own minimal example, independent of anything project-specific — see
 * git history on this file for the isolated repro). Supabase calls in
 * `lib/supabase/*.ts` are therefore untyped (`any`) at the query-builder level;
 * every call site instead annotates its own result against the interfaces below,
 * which keeps the rest of the admin CMS fully typed. Revisit this once that
 * upstream bug is fixed and swap back to a typed client + `Database` export.
 */

export type ReviewsCategory = "home" | "services" | "general";
export type AppointmentStatus = "new" | "contacted" | "completed";

export interface DoctorProfile {
  id: string;
  name_ar: string;
  name_en: string;
  title_ar: string;
  title_en: string;
  short_title_ar: string;
  short_title_en: string;
  bio_ar: string;
  bio_en: string;
  /** About page "message from the doctor" — paragraphs separated by a blank line. */
  message_ar: string;
  message_en: string;
  /** Photo for the About page "Message From the Doctor" card — distinct from main_image_url (Hero background). */
  message_image_url: string | null;
  /** Home page intro-video highlight bullets — one per line. */
  intro_highlights_ar: string;
  intro_highlights_en: string;
  years_experience: number;
  successful_operations: number;
  cured_patients: number;
  main_image_url: string | null;
  intro_video_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface PageHero {
  id: string;
  page_slug: string;
  title_ar: string;
  title_en: string;
  subtitle_ar: string;
  subtitle_en: string;
  description_ar: string;
  description_en: string;
  background_image_url: string | null;
  cta_primary_text_ar: string | null;
  cta_primary_text_en: string | null;
  cta_primary_link: string | null;
  cta_secondary_text_ar: string | null;
  cta_secondary_text_en: string | null;
  cta_secondary_link: string | null;
  footer_cta_title_ar: string | null;
  footer_cta_title_en: string | null;
  footer_cta_subtitle_ar: string | null;
  footer_cta_subtitle_en: string | null;
  created_at: string;
  updated_at: string;
}

export interface SurgeryService {
  id: string;
  title_ar: string;
  title_en: string;
  specialty_category_ar: string;
  specialty_category_en: string;
  short_description_ar: string;
  short_description_en: string;
  detailed_breakdown_ar: string;
  detailed_breakdown_en: string;
  image_url: string | null;
  order_index: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Treatment {
  id: string;
  disease_name_ar: string;
  disease_name_en: string;
  treatment_overview_ar: string;
  treatment_overview_en: string;
  details_ar: string;
  details_en: string;
  image_url: string | null;
  order_index: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface WhyDoctorPoint {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  icon_tag: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface PatientJourneyStep {
  id: string;
  step_number: number;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  icon_url: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  patient_name: string;
  /** Headline shown on the Reviews page grid (PatientReviewsGrid); unused by the Home slider. */
  title_ar: string;
  title_en: string;
  surgical_procedure_ar: string;
  surgical_procedure_en: string;
  rating: number;
  review_text_ar: string;
  review_text_en: string;
  review_date: string;
  is_verified: boolean;
  video_url: string | null;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Video {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  category_ar: string;
  category_en: string;
  /** Badge text, e.g. "02:14". */
  duration: string;
  thumbnail_url: string | null;
  video_url: string;
  order_index: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: string;
  slug: string;
  title_ar: string;
  title_en: string;
  category_ar: string;
  category_en: string;
  published_at: string;
  reading_time_minutes: number;
  featured_image_url: string | null;
  excerpt_ar: string;
  excerpt_en: string;
  content_ar: string;
  content_en: string;
  is_hero_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Faq {
  id: string;
  question_ar: string;
  question_en: string;
  answer_ar: string;
  answer_en: string;
  category: ReviewsCategory;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface ContactAppointment {
  id: string;
  name: string;
  phone: string;
  preferred_date: string | null;
  specialty: string | null;
  notes: string | null;
  status: AppointmentStatus;
  created_at: string;
  updated_at: string;
}

/** One entry in an admin-editable link list (navbar links, footer columns). */
export interface SiteLinkItem {
  label_ar: string;
  label_en: string;
  href: string;
  visible: boolean;
}

export interface ClinicSettings {
  id: string;
  address_ar: string;
  address_en: string;
  phone_primary: string | null;
  phone_secondary: string | null;
  emergency_line: string | null;
  working_hours_ar: string | null;
  working_hours_en: string | null;
  map_embed_url: string | null;
  facebook_url: string | null;
  instagram_url: string | null;
  tiktok_url: string | null;
  whatsapp_number: string | null;
  email: string | null;
  navbar_cta_text_ar: string | null;
  navbar_cta_text_en: string | null;
  navbar_cta_link: string | null;
  footer_tagline_ar: string | null;
  footer_tagline_en: string | null;
  footer_disclaimer_ar: string | null;
  footer_disclaimer_en: string | null;
  footer_quicklinks_title_ar: string | null;
  footer_quicklinks_title_en: string | null;
  footer_services_title_ar: string | null;
  footer_services_title_en: string | null;
  footer_contact_title_ar: string | null;
  footer_contact_title_en: string | null;
  brand_name_ar: string | null;
  brand_name_en: string | null;
  brand_subtitle_ar: string | null;
  brand_subtitle_en: string | null;
  logo_url: string | null;
  navbar_links: SiteLinkItem[] | null;
  navbar_cta_visible: boolean;
  navbar_show_phone: boolean;
  footer_quicklinks: SiteLinkItem[] | null;
  footer_services: SiteLinkItem[] | null;
  footer_copyright_ar: string | null;
  footer_copyright_en: string | null;
  footer_show_social: boolean;
  created_at: string;
  updated_at: string;
}

/** About page career timeline. */
export interface CareerMilestone {
  id: string;
  year: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  icon_tag: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

/** About page certificates & accreditations. */
export interface Certification {
  id: string;
  title_ar: string;
  title_en: string;
  issuer_ar: string;
  issuer_en: string;
  detail_ar: string;
  detail_en: string;
  icon_tag: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

/** Services page "Finding the Right Treatment Plan" steps. */
export interface TreatmentProtocolStep {
  id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  icon_tag: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

/** Services page "Procedures & Conditions" category tabs. */
export interface ProcedureCategory {
  id: string;
  title_ar: string;
  title_en: string;
  icon_tag: string;
  image_url: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

/** A procedure listed under a ProcedureCategory. */
export interface ProcedureItem {
  id: string;
  category_id: string;
  title_ar: string;
  title_en: string;
  description_ar: string;
  description_en: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}


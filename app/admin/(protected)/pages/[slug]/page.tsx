import { notFound } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { PAGE_SECTIONS } from "@/lib/admin/nav";
import PageHeroForm from "@/components/admin/pages/PageHeroForm";
import SectionHeadingForm from "@/components/admin/pages/SectionHeadingForm";
import IntroVideoForm from "@/components/admin/pages/IntroVideoForm";
import WhyDoctorManager from "@/components/admin/pages/WhyDoctorManager";
import PatientJourneyManager from "@/components/admin/pages/PatientJourneyManager";
import CareerMilestonesManager from "@/components/admin/pages/CareerMilestonesManager";
import CertificationsManager from "@/components/admin/pages/CertificationsManager";
import TreatmentProtocolManager from "@/components/admin/pages/TreatmentProtocolManager";
import ProcedureBreakdownManager from "@/components/admin/pages/ProcedureBreakdownManager";
import SurgeriesTreatmentsManager from "@/components/admin/surgeries-treatments/SurgeriesTreatmentsManager";
import ReviewManager from "@/components/admin/reviews/ReviewManager";
import VideoManager from "@/components/admin/videos/VideoManager";
import ArticleManager from "@/components/admin/articles/ArticleManager";
import FaqManager from "@/components/admin/faqs/FaqManager";
import DoctorProfileForm from "@/components/admin/doctor-profile/DoctorProfileForm";
import ClinicSettingsForm from "@/components/admin/settings/ClinicSettingsForm";
import AppointmentsTable from "@/components/admin/appointments/AppointmentsTable";
import { getSectionHeadingFormData, type SectionHeadingPage } from "@/lib/section-headings";
import type { DoctorProfile, SectionHeadingRow } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-ink/10 pt-6">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink/45">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

export default async function AdminPageSectionEditor({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = PAGE_SECTIONS.find((p) => p.slug === slug);
  if (!page) notFound();

  const supabase = await createClient();

  const [heroRes, headingsRes] = await Promise.all([
    supabase.from("pages_hero").select("*").eq("page_slug", slug).maybeSingle(),
    supabase.from("section_headings").select("*").eq("page_slug", slug),
  ]);
  const hero = heroRes.data;
  if (!hero) notFound();

  const headingRows = headingsRes.data as SectionHeadingRow[] | null;
  const headingForm = (sectionKey: string) => {
    const { label, fields } = getSectionHeadingFormData(slug as SectionHeadingPage, sectionKey, headingRows);
    return <SectionHeadingForm pageSlug={slug} sectionKey={sectionKey} label={label} heading={fields} />;
  };

  let extraSections: React.ReactNode = null;

  if (slug === "home") {
    const [profileRes, surgeriesRes, treatmentsRes, whyDoctorRes, journeyRes, reviewsRes, videosRes, faqsRes] =
      await Promise.all([
        supabase.from("doctor_profile").select("*").limit(1).maybeSingle(),
        supabase.from("surgeries_services").select("*").order("order_index"),
        supabase.from("treatments").select("*").order("order_index"),
        supabase.from("why_doctor").select("*").order("order_index"),
        supabase.from("patient_journey").select("*").order("order_index"),
        supabase.from("reviews").select("*").order("review_date", { ascending: false }),
        supabase.from("videos").select("*").order("order_index"),
        supabase.from("faqs").select("*").eq("category", "home").order("order_index"),
      ]);
    const profile = profileRes.data as DoctorProfile | null;

    extraSections = (
      <>
        <SectionBlock title="Achievements Counter (Stats)">
          <p className="glass-card p-5 text-sm text-ink/60">
            Years of experience, successful surgeries and patients-cured counters are edited from the{" "}
            <Link href="/admin/pages/about" className="font-bold text-brand-700 hover:underline">
              About page
            </Link>{" "}
            — this section displays the same numbers.
          </p>
        </SectionBlock>

        <SectionBlock title="Doctor Intro Video & Highlights">
          {headingForm("intro_video")}
          {profile && <IntroVideoForm profile={profile} />}
        </SectionBlock>

        <SectionBlock title="Key Surgeries & Key Treatments">
          {headingForm("key_surgeries")}
          {headingForm("key_treatments")}
          <SurgeriesTreatmentsManager surgeries={surgeriesRes.data ?? []} treatments={treatmentsRes.data ?? []} />
        </SectionBlock>

        <SectionBlock title="Why Choose the Doctor">
          {headingForm("why_doctor")}
          <WhyDoctorManager points={whyDoctorRes.data ?? []} />
        </SectionBlock>

        <SectionBlock title="Patient Journey">
          {headingForm("patient_journey")}
          <PatientJourneyManager steps={journeyRes.data ?? []} />
        </SectionBlock>

        <SectionBlock title="Patient Reviews Slider">
          {headingForm("reviews")}
          <ReviewManager reviews={reviewsRes.data ?? []} />
        </SectionBlock>

        <SectionBlock title="Featured Videos">
          {headingForm("featured_videos")}
          <VideoManager videos={videosRes.data ?? []} />
        </SectionBlock>

        <SectionBlock title="FAQ (Home)">
          {headingForm("faq")}
          <FaqManager faqs={faqsRes.data ?? []} defaultCategory="home" />
        </SectionBlock>
      </>
    );
  } else if (slug === "about") {
    const [profileRes, milestonesRes, surgeriesRes, treatmentsRes, certsRes] = await Promise.all([
      supabase.from("doctor_profile").select("*").limit(1).maybeSingle(),
      supabase.from("career_milestones").select("*").order("order_index"),
      supabase.from("surgeries_services").select("*").order("order_index"),
      supabase.from("treatments").select("*").order("order_index"),
      supabase.from("certifications").select("*").order("order_index"),
    ]);

    extraSections = (
      <>
        <SectionBlock title="Doctor Profile (name, bio, message & stats)">
          {headingForm("doctor_message")}
          <DoctorProfileForm profile={profileRes.data} />
        </SectionBlock>

        <SectionBlock title="Career Timeline">
          {headingForm("career_timeline")}
          <CareerMilestonesManager milestones={milestonesRes.data ?? []} />
        </SectionBlock>

        <SectionBlock title="Introductory Video">
          {headingForm("intro_video")}
          <p className="glass-card p-5 text-sm text-ink/60">
            Uses the same intro video configured on the{" "}
            <Link href="/admin/pages/home" className="font-bold text-brand-700 hover:underline">
              Home page
            </Link>
            .
          </p>
        </SectionBlock>

        <SectionBlock title="Areas of Expertise">
          {headingForm("expertise")}
          <SurgeriesTreatmentsManager surgeries={surgeriesRes.data ?? []} treatments={treatmentsRes.data ?? []} />
        </SectionBlock>

        <SectionBlock title="Certificates & Accreditations">
          {headingForm("certifications")}
          <CertificationsManager certifications={certsRes.data ?? []} />
        </SectionBlock>
      </>
    );
  } else if (slug === "services") {
    const [protocolRes, surgeriesRes, treatmentsRes, categoriesRes, itemsRes, faqsRes] = await Promise.all([
      supabase.from("treatment_protocol_steps").select("*").order("order_index"),
      supabase.from("surgeries_services").select("*").order("order_index"),
      supabase.from("treatments").select("*").order("order_index"),
      supabase.from("procedure_categories").select("*").order("order_index"),
      supabase.from("procedure_items").select("*").order("order_index"),
      supabase.from("faqs").select("*").eq("category", "services").order("order_index"),
    ]);

    extraSections = (
      <>
        <SectionBlock title="Finding the Right Treatment Plan">
          {headingForm("treatment_protocol")}
          <TreatmentProtocolManager steps={protocolRes.data ?? []} />
        </SectionBlock>

        <SectionBlock title="Specialized Surgeries Grid">
          {headingForm("surgeries_grid")}
          <SurgeriesTreatmentsManager surgeries={surgeriesRes.data ?? []} treatments={treatmentsRes.data ?? []} />
        </SectionBlock>

        <SectionBlock title="Procedures & Conditions Breakdown">
          {headingForm("procedures")}
          <ProcedureBreakdownManager categories={categoriesRes.data ?? []} items={itemsRes.data ?? []} />
        </SectionBlock>

        <SectionBlock title="Extended Clinical FAQ">
          {headingForm("faq")}
          <FaqManager faqs={faqsRes.data ?? []} defaultCategory="services" />
        </SectionBlock>
      </>
    );
  } else if (slug === "videos") {
    const videosRes = await supabase.from("videos").select("*").order("order_index");
    extraSections = (
      <SectionBlock title="Video Library Grid">
        {headingForm("library")}
        <VideoManager videos={videosRes.data ?? []} />
      </SectionBlock>
    );
  } else if (slug === "articles") {
    const articlesRes = await supabase.from("articles").select("*").order("published_at", { ascending: false });
    extraSections = (
      <SectionBlock title="Featured Article + Articles Grid">
        {headingForm("featured")}
        {headingForm("grid")}
        <ArticleManager articles={articlesRes.data ?? []} />
      </SectionBlock>
    );
  } else if (slug === "reviews") {
    const reviewsRes = await supabase.from("reviews").select("*").order("review_date", { ascending: false });
    extraSections = (
      <SectionBlock title="Patient Reviews Grid">
        {headingForm("grid")}
        <ReviewManager reviews={reviewsRes.data ?? []} />
      </SectionBlock>
    );
  } else if (slug === "contact") {
    const [appointmentsRes, settingsRes] = await Promise.all([
      supabase.from("contact_appointments").select("*").order("created_at", { ascending: false }),
      supabase.from("clinic_settings").select("*").limit(1).maybeSingle(),
    ]);

    extraSections = (
      <>
        <SectionBlock title="Booking & Contact Section">{headingForm("booking")}</SectionBlock>

        <SectionBlock title="Booking Form Submissions (Consultation Requests)">
          <AppointmentsTable appointments={appointmentsRes.data ?? []} />
        </SectionBlock>

        <SectionBlock title="Clinic Info & Map">
          <ClinicSettingsForm settings={settingsRes.data} />
        </SectionBlock>
      </>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold text-ink">{page.label} Page</h1>
        <p className="mt-1 text-sm text-ink/60">Every section rendered on this page, in the order it appears.</p>
      </div>

      <div>
        <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink/45">Hero Section</h2>
        <PageHeroForm hero={hero} />
      </div>

      {extraSections}
    </div>
  );
}

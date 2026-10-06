import { notFound } from "next/navigation";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { PAGE_SECTIONS, getLiveSitePath } from "@/lib/admin/nav";
import PageHeroForm from "@/components/admin/pages/PageHeroForm";
import FooterCtaForm from "@/components/admin/pages/FooterCtaForm";
import SectionHeadingForm from "@/components/admin/pages/SectionHeadingForm";
import PageSwitcher from "@/components/admin/pages/PageSwitcher";
import SectionJumpNav, { sectionAnchorId } from "@/components/admin/pages/SectionJumpNav";
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

/** One block of the page editor; `title` also feeds the "Jump to section" picker. */
interface EditorSection {
  title: string;
  content: React.ReactNode;
}

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    // scroll-mt clears the sticky mobile top bar + jump picker when jumping here.
    <section id={sectionAnchorId(title)} className="scroll-mt-32 border-t border-ink/10 pt-6 lg:scroll-mt-24">
      <h2 className="mb-3 text-sm font-bold uppercase tracking-wide text-ink/45">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
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

  let extraSections: EditorSection[] = [];

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

    extraSections = [
      {
        title: "Achievements Counter (Stats)",
        content: (
          <p className="glass-card p-5 text-sm text-ink/60">
            Years of experience, successful surgeries and patients-cured counters are edited from the{" "}
            <Link href="/admin/pages/about" className="font-bold text-brand-700 hover:underline">
              About page
            </Link>{" "}
            — this section displays the same numbers.
          </p>
        ),
      },
      {
        title: "Doctor Intro Video & Highlights",
        content: (
          <>
            {headingForm("intro_video")}
            {profile && <IntroVideoForm profile={profile} />}
          </>
        ),
      },
      {
        title: "Key Surgeries & Key Treatments",
        content: (
          <>
            {headingForm("key_surgeries")}
            {headingForm("key_treatments")}
            <SurgeriesTreatmentsManager surgeries={surgeriesRes.data ?? []} treatments={treatmentsRes.data ?? []} />
          </>
        ),
      },
      {
        title: "Why Choose the Doctor",
        content: (
          <>
            {headingForm("why_doctor")}
            <WhyDoctorManager points={whyDoctorRes.data ?? []} />
          </>
        ),
      },
      {
        title: "Patient Journey",
        content: (
          <>
            {headingForm("patient_journey")}
            <PatientJourneyManager steps={journeyRes.data ?? []} />
          </>
        ),
      },
      {
        title: "Patient Reviews Slider",
        content: (
          <>
            {headingForm("reviews")}
            <ReviewManager reviews={reviewsRes.data ?? []} />
          </>
        ),
      },
      {
        title: "Featured Videos",
        content: (
          <>
            {headingForm("featured_videos")}
            <VideoManager videos={videosRes.data ?? []} />
          </>
        ),
      },
      {
        title: "FAQ (Home)",
        content: (
          <>
            {headingForm("faq")}
            <FaqManager faqs={faqsRes.data ?? []} defaultCategory="home" />
          </>
        ),
      },
    ];
  } else if (slug === "about") {
    const [profileRes, milestonesRes, surgeriesRes, treatmentsRes, certsRes] = await Promise.all([
      supabase.from("doctor_profile").select("*").limit(1).maybeSingle(),
      supabase.from("career_milestones").select("*").order("order_index"),
      supabase.from("surgeries_services").select("*").order("order_index"),
      supabase.from("treatments").select("*").order("order_index"),
      supabase.from("certifications").select("*").order("order_index"),
    ]);

    extraSections = [
      {
        title: "Doctor Profile (name, bio, message & stats)",
        content: (
          <>
            {headingForm("doctor_message")}
            <DoctorProfileForm profile={profileRes.data} />
          </>
        ),
      },
      {
        title: "Career Timeline",
        content: (
          <>
            {headingForm("career_timeline")}
            <CareerMilestonesManager milestones={milestonesRes.data ?? []} />
          </>
        ),
      },
      {
        title: "Introductory Video",
        content: (
          <>
            {headingForm("intro_video")}
            <p className="glass-card p-5 text-sm text-ink/60">
              Uses the same intro video configured on the{" "}
              <Link href="/admin/pages/home" className="font-bold text-brand-700 hover:underline">
                Home page
              </Link>
              .
            </p>
          </>
        ),
      },
      {
        title: "Areas of Expertise",
        content: (
          <>
            {headingForm("expertise")}
            <SurgeriesTreatmentsManager surgeries={surgeriesRes.data ?? []} treatments={treatmentsRes.data ?? []} />
          </>
        ),
      },
      {
        title: "Certificates & Accreditations",
        content: (
          <>
            {headingForm("certifications")}
            <CertificationsManager certifications={certsRes.data ?? []} />
          </>
        ),
      },
    ];
  } else if (slug === "services") {
    const [protocolRes, surgeriesRes, treatmentsRes, categoriesRes, itemsRes, faqsRes] = await Promise.all([
      supabase.from("treatment_protocol_steps").select("*").order("order_index"),
      supabase.from("surgeries_services").select("*").order("order_index"),
      supabase.from("treatments").select("*").order("order_index"),
      supabase.from("procedure_categories").select("*").order("order_index"),
      supabase.from("procedure_items").select("*").order("order_index"),
      supabase.from("faqs").select("*").eq("category", "services").order("order_index"),
    ]);

    extraSections = [
      {
        title: "Finding the Right Treatment Plan",
        content: (
          <>
            {headingForm("treatment_protocol")}
            <TreatmentProtocolManager steps={protocolRes.data ?? []} />
          </>
        ),
      },
      {
        title: "Specialized Surgeries Grid",
        content: (
          <>
            {headingForm("surgeries_grid")}
            <SurgeriesTreatmentsManager surgeries={surgeriesRes.data ?? []} treatments={treatmentsRes.data ?? []} />
          </>
        ),
      },
      {
        title: "Procedures & Conditions Breakdown",
        content: (
          <>
            {headingForm("procedures")}
            <ProcedureBreakdownManager categories={categoriesRes.data ?? []} items={itemsRes.data ?? []} />
          </>
        ),
      },
      {
        title: "Extended Clinical FAQ",
        content: (
          <>
            {headingForm("faq")}
            <FaqManager faqs={faqsRes.data ?? []} defaultCategory="services" />
          </>
        ),
      },
    ];
  } else if (slug === "videos") {
    const videosRes = await supabase.from("videos").select("*").order("order_index");
    extraSections = [
      {
        title: "Video Library Grid",
        content: (
          <>
            {headingForm("library")}
            <VideoManager videos={videosRes.data ?? []} />
          </>
        ),
      },
    ];
  } else if (slug === "articles") {
    const articlesRes = await supabase.from("articles").select("*").order("published_at", { ascending: false });
    extraSections = [
      {
        title: "Featured Article + Articles Grid",
        content: (
          <>
            {headingForm("featured")}
            {headingForm("grid")}
            <ArticleManager articles={articlesRes.data ?? []} />
          </>
        ),
      },
    ];
  } else if (slug === "reviews") {
    const reviewsRes = await supabase.from("reviews").select("*").order("review_date", { ascending: false });
    extraSections = [
      {
        title: "Patient Reviews Grid",
        content: (
          <>
            {headingForm("grid")}
            <ReviewManager reviews={reviewsRes.data ?? []} />
          </>
        ),
      },
    ];
  } else if (slug === "contact") {
    const [appointmentsRes, settingsRes] = await Promise.all([
      supabase.from("contact_appointments").select("*").order("created_at", { ascending: false }),
      supabase.from("clinic_settings").select("*").limit(1).maybeSingle(),
    ]);

    extraSections = [
      { title: "Booking & Contact Section", content: headingForm("booking") },
      {
        title: "Booking Form Submissions (Consultation Requests)",
        content: <AppointmentsTable appointments={appointmentsRes.data ?? []} />,
      },
      { title: "Clinic Info & Map", content: <ClinicSettingsForm settings={settingsRes.data} /> },
    ];
  }

  const sections: EditorSection[] = [
    { title: "Hero Section", content: <PageHeroForm hero={hero} /> },
    ...extraSections,
    { title: "Bottom CTA Banner", content: <FooterCtaForm hero={hero} /> },
  ];

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-2xl font-extrabold text-ink">{page.label} Page</h1>
            <p className="mt-1 text-sm text-ink/60">Every section rendered on this page, in the order it appears.</p>
          </div>
          <Link
            href={getLiveSitePath(`/admin/pages/${slug}`)}
            target="_blank"
            className="btn-outline-glass hidden !px-4 !py-2 text-xs lg:inline-flex"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            View on Site
          </Link>
        </div>
        <PageSwitcher current={slug} />
      </div>

      <SectionJumpNav titles={sections.map((section) => section.title)} />

      {sections.map((section) => (
        <SectionBlock key={section.title} title={section.title}>
          {section.content}
        </SectionBlock>
      ))}
    </div>
  );
}

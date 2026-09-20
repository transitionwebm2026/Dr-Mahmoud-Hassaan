import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FooterCTA from "@/components/FooterCTA";
import DoctorIntroVideo from "@/components/sections/DoctorIntroVideo";
import StatsBar from "@/components/sections/StatsBar";
import KeySurgeries from "@/components/sections/KeySurgeries";
import KeyTreatments from "@/components/sections/KeyTreatments";
import WhyChooseDoctor from "@/components/sections/WhyChooseDoctor";
import PatientJourney from "@/components/sections/PatientJourney";
import ReviewsSlider from "@/components/sections/ReviewsSlider";
import FeaturedVideos from "@/components/sections/FeaturedVideos";
import HomeFAQ from "@/components/sections/HomeFAQ";
import FaqJsonLd from "@/components/seo/FaqJsonLd";
import { createClient } from "@/lib/supabase/server";
import { toBilingual, splitLines } from "@/lib/supabase/content";

export const metadata: Metadata = {
  title: "الرئيسية | Home",
  description:
    "د. محمود حسان، استشاري جراحة الأورام بالمعهد القومي للأورام - جامعة القاهرة، متخصص في جراحات أورام الثدي والجهاز الهضمي والرأس والرقبة. | Dr. Mahmoud Hassan, Consultant Surgical Oncologist at the National Cancer Institute, Cairo University, specializing in breast, GI, and head & neck tumor surgery.",
  alternates: { canonical: "/" },
};

export const revalidate = 60;

export default async function HomePage() {
  const supabase = await createClient();

  const [heroRes, profileRes, surgeriesRes, treatmentsRes, whyDoctorRes, journeyRes, reviewsRes, videosRes, faqsRes] =
    await Promise.all([
      supabase.from("pages_hero").select("*").eq("page_slug", "home").maybeSingle(),
      supabase.from("doctor_profile").select("*").limit(1).maybeSingle(),
      supabase.from("surgeries_services").select("*").eq("is_published", true).order("order_index").limit(3),
      supabase.from("treatments").select("*").eq("is_published", true).order("order_index").limit(3),
      supabase.from("why_doctor").select("*").order("order_index"),
      supabase.from("patient_journey").select("*").order("order_index"),
      supabase.from("reviews").select("*").eq("is_published", true).order("review_date", { ascending: false }).limit(6),
      supabase.from("videos").select("*").eq("is_published", true).order("order_index").limit(3),
      supabase.from("faqs").select("*").eq("category", "home").order("order_index"),
    ]);

  const hero = heroRes.data;
  const profile = profileRes.data;

  return (
    <>
      <Hero
        title={toBilingual(hero?.title_ar, hero?.title_en)}
        subtitle={toBilingual(hero?.subtitle_ar, hero?.subtitle_en)}
        description={toBilingual(hero?.description_ar, hero?.description_en)}
        photoSrc={hero?.background_image_url || profile?.main_image_url || undefined}
        primaryCta={{
          label: toBilingual(hero?.cta_primary_text_ar, hero?.cta_primary_text_en) ?? {
            ar: "احجز كشفك الآن",
            en: "Book Your Visit",
          },
          href: hero?.cta_primary_link || "/contact",
          icon: "calendar",
        }}
        secondaryCta={{
          label: toBilingual(hero?.cta_secondary_text_ar, hero?.cta_secondary_text_en) ?? {
            ar: "استكشف خدماتنا",
            en: "Explore Our Services",
          },
          href: hero?.cta_secondary_link || "/services",
          icon: "services",
        }}
      />

      <StatsBar
        curedPatients={profile?.cured_patients}
        successfulOperations={profile?.successful_operations}
        yearsExperience={profile?.years_experience}
      />

      <DoctorIntroVideo highlightsAr={splitLines(profile?.intro_highlights_ar)} highlightsEn={splitLines(profile?.intro_highlights_en)} />

      <KeySurgeries items={surgeriesRes.data ?? []} />

      <KeyTreatments items={treatmentsRes.data ?? []} />

      <WhyChooseDoctor points={whyDoctorRes.data ?? []} />

      <PatientJourney steps={journeyRes.data ?? []} />

      <ReviewsSlider reviews={reviewsRes.data ?? []} />

      <FeaturedVideos videos={videosRes.data ?? []} />

      <HomeFAQ faqs={faqsRes.data ?? []} />
      <FaqJsonLd faqs={faqsRes.data ?? []} />

      <FooterCTA
        title={toBilingual(hero?.footer_cta_title_ar, hero?.footer_cta_title_en)}
        subtitle={toBilingual(hero?.footer_cta_subtitle_ar, hero?.footer_cta_subtitle_en)}
      />
    </>
  );
}

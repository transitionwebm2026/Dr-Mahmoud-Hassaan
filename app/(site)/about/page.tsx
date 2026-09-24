import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FooterCTA from "@/components/FooterCTA";
import StatsBar from "@/components/sections/StatsBar";
import DoctorMessage from "@/components/sections/about/DoctorMessage";
import CareerTimeline from "@/components/sections/about/CareerTimeline";
import AboutVideo from "@/components/sections/about/AboutVideo";
import ExpertiseGrid from "@/components/sections/about/ExpertiseGrid";
import Certifications from "@/components/sections/about/Certifications";
import { createClient } from "@/lib/supabase/server";
import { toBilingual, splitParagraphs } from "@/lib/supabase/content";

export const metadata: Metadata = {
  title: "عن الدكتور | About the Doctor",
  description:
    "تعرف على المسيرة المهنية للدكتور محمود حسان، خبرته الأكاديمية والعملية في جراحة الأورام، وأبرز شهاداته واعتماداته. | Discover Dr. Mahmoud Hassan's professional journey, academic and clinical expertise in surgical oncology, and his key certifications.",
  alternates: { canonical: "/about" },
};

export const revalidate = 60;

export default async function AboutPage() {
  const supabase = await createClient();

  const [heroRes, profileRes, settingsRes, milestonesRes, expertiseRes, certsRes] = await Promise.all([
    supabase.from("pages_hero").select("*").eq("page_slug", "about").maybeSingle(),
    supabase.from("doctor_profile").select("*").limit(1).maybeSingle(),
    supabase.from("clinic_settings").select("*").limit(1).maybeSingle(),
    supabase.from("career_milestones").select("*").order("order_index"),
    supabase.from("surgeries_services").select("*").eq("is_published", true).order("order_index").limit(3),
    supabase.from("certifications").select("*").order("order_index"),
  ]);

  const hero = heroRes.data;
  const profile = profileRes.data;

  return (
    <>
      <Hero
        title={toBilingual(hero?.title_ar, hero?.title_en)}
        subtitle={toBilingual(hero?.subtitle_ar, hero?.subtitle_en) ?? { ar: "نبذة عن الدكتور", en: "About the Doctor" }}
        description={
          toBilingual(hero?.description_ar, hero?.description_en) ?? {
            ar: "تعرف على مسيرة الدكتور محمود حسان المهنية، وخبرته الواسعة في جراحة الأورام، والشهادات التي حصل عليها على مدار مسيرته.",
            en: "Learn about Dr. Mahmoud Hassan's professional journey, his extensive experience in surgical oncology, and the credentials he has earned throughout his career.",
          }
        }
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
            ar: "شاهد الفيديو التعريفي",
            en: "Watch Intro Video",
          },
          href: hero?.cta_secondary_link || "#doctor-intro",
          icon: "video",
        }}
        settings={settingsRes.data}
      />

      <DoctorMessage
        paragraphsAr={splitParagraphs(profile?.message_ar)}
        paragraphsEn={splitParagraphs(profile?.message_en)}
        imageSrc={profile?.message_image_url}
      />

      <CareerTimeline milestones={milestonesRes.data ?? []} />

      <AboutVideo videoUrl={profile?.intro_video_url} />

      <ExpertiseGrid items={expertiseRes.data ?? []} />

      <Certifications certifications={certsRes.data ?? []} />

      <StatsBar
        curedPatients={profile?.cured_patients}
        successfulOperations={profile?.successful_operations}
        yearsExperience={profile?.years_experience}
      />

      <FooterCTA
        title={
          toBilingual(hero?.footer_cta_title_ar, hero?.footer_cta_title_en) ?? {
            ar: "هل لديك سؤال للدكتور محمود حسان؟",
            en: "Have a question for Dr. Mahmoud Hassan?",
          }
        }
        subtitle={
          toBilingual(hero?.footer_cta_subtitle_ar, hero?.footer_cta_subtitle_en) ?? {
            ar: "تواصل معنا اليوم وسيسعد فريقنا بالرد على استفساراتك وحجز موعدك.",
            en: "Reach out today — our team is happy to answer your questions and book your visit.",
          }
        }
      />
    </>
  );
}

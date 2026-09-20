import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FooterCTA from "@/components/FooterCTA";
import SurgeriesGrid from "@/components/sections/services/SurgeriesGrid";
import ProceduresBreakdown from "@/components/sections/services/ProceduresBreakdown";
import TreatmentProtocol from "@/components/sections/services/TreatmentProtocol";
import ServicesFAQ from "@/components/sections/services/ServicesFAQ";
import FaqJsonLd from "@/components/seo/FaqJsonLd";
import { CONTACT } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { toBilingual } from "@/lib/supabase/content";

export const metadata: Metadata = {
  title: "الخدمات والجراحات | Services & Surgeries",
  description:
    "تخصصات جراحية دقيقة لعلاج أورام الثدي والجهاز الهضمي والغدد والرقبة بالمنظار وأحدث التقنيات. | Precise surgical specialties for breast, GI, and head & neck tumors using laparoscopic and minimally invasive techniques.",
  alternates: { canonical: "/services" },
};

export const revalidate = 60;

export default async function ServicesPage() {
  const supabase = await createClient();

  const [heroRes, surgeriesRes, protocolRes, categoriesRes, itemsRes, faqsRes] = await Promise.all([
    supabase.from("pages_hero").select("*").eq("page_slug", "services").maybeSingle(),
    supabase.from("surgeries_services").select("*").eq("is_published", true).order("order_index"),
    supabase.from("treatment_protocol_steps").select("*").order("order_index"),
    supabase.from("procedure_categories").select("*").order("order_index"),
    supabase.from("procedure_items").select("*").order("order_index"),
    supabase.from("faqs").select("*").eq("category", "services").order("order_index"),
  ]);

  const hero = heroRes.data;

  return (
    <>
      <Hero
        title={toBilingual(hero?.title_ar, hero?.title_en)}
        subtitle={toBilingual(hero?.subtitle_ar, hero?.subtitle_en) ?? { ar: "الخدمات والجراحات", en: "Services & Surgeries" }}
        description={
          toBilingual(hero?.description_ar, hero?.description_en) ?? {
            ar: "تخصصات جراحية دقيقة لعلاج أورام الثدي والجهاز الهضمي والغدد والرقبة، بأحدث التقنيات وأعلى معايير السلامة.",
            en: "Precise surgical specialties for breast, GI, and head & neck tumors, using the latest techniques and the highest safety standards.",
          }
        }
        photoSrc={hero?.background_image_url || undefined}
        primaryCta={{
          label: toBilingual(hero?.cta_primary_text_ar, hero?.cta_primary_text_en) ?? {
            ar: "حجز موعد",
            en: "Book Appointment",
          },
          href: hero?.cta_primary_link || "/contact",
          icon: "calendar",
        }}
        secondaryCta={{
          label: toBilingual(hero?.cta_secondary_text_ar, hero?.cta_secondary_text_en) ?? {
            ar: "اتصل بنا",
            en: "Contact Us",
          },
          href: hero?.cta_secondary_link || CONTACT.phoneHref,
          icon: "phone",
        }}
      />

      <TreatmentProtocol steps={protocolRes.data ?? []} />

      <SurgeriesGrid items={surgeriesRes.data ?? []} />

      <ProceduresBreakdown categories={categoriesRes.data ?? []} items={itemsRes.data ?? []} />

      <ServicesFAQ faqs={faqsRes.data ?? []} />
      <FaqJsonLd faqs={faqsRes.data ?? []} />

      <FooterCTA
        title={
          toBilingual(hero?.footer_cta_title_ar, hero?.footer_cta_title_en) ?? {
            ar: "جاهز لبدء خطة علاجك؟",
            en: "Ready to start your treatment plan?",
          }
        }
        subtitle={
          toBilingual(hero?.footer_cta_subtitle_ar, hero?.footer_cta_subtitle_en) ?? {
            ar: "تواصل معنا اليوم لحجز استشارتك ومناقشة أنسب خطة جراحية لحالتك.",
            en: "Reach out today to book your consultation and discuss the right surgical plan for your case.",
          }
        }
      />
    </>
  );
}

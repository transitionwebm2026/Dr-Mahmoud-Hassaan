import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FooterCTA from "@/components/FooterCTA";
import SurgeriesGrid from "@/components/sections/services/SurgeriesGrid";
import ProceduresBreakdown from "@/components/sections/services/ProceduresBreakdown";
import TreatmentProtocol from "@/components/sections/services/TreatmentProtocol";
import ServicesFAQ from "@/components/sections/services/ServicesFAQ";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "الخدمات والجراحات | Services & Surgeries",
  description:
    "تخصصات جراحية دقيقة لعلاج أورام الثدي والجهاز الهضمي والغدد والرقبة بالمنظار وأحدث التقنيات. | Precise surgical specialties for breast, GI, and head & neck tumors using laparoscopic and minimally invasive techniques.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero
        subtitle={{ ar: "الخدمات والجراحات", en: "Services & Surgeries" }}
        description={{
          ar: "تخصصات جراحية دقيقة لعلاج أورام الثدي والجهاز الهضمي والغدد والرقبة، بأحدث التقنيات وأعلى معايير السلامة.",
          en: "Precise surgical specialties for breast, GI, and head & neck tumors, using the latest techniques and the highest safety standards.",
        }}
        primaryCta={{
          label: { ar: "حجز موعد", en: "Book Appointment" },
          href: "/contact",
          icon: "calendar",
        }}
        secondaryCta={{
          label: { ar: "اتصل بنا", en: "Contact Us" },
          href: CONTACT.phoneHref,
          icon: "phone",
        }}
      />

      {/* Treatment Determination Protocol — right under the hero */}
      <TreatmentProtocol />

      {/* 2. Specialized Surgeries Grid */}
      <SurgeriesGrid />

      {/* 3. Detailed Surgical Procedures Breakdown */}
      <ProceduresBreakdown />

      {/* 5. Extended Clinical FAQ */}
      <ServicesFAQ />

      {/* 6. Bottom Global CTA */}
      <FooterCTA
        title={{ ar: "جاهز لبدء خطة علاجك؟", en: "Ready to start your treatment plan?" }}
        subtitle={{
          ar: "تواصل معنا اليوم لحجز استشارتك ومناقشة أنسب خطة جراحية لحالتك.",
          en: "Reach out today to book your consultation and discuss the right surgical plan for your case.",
        }}
      />
    </>
  );
}

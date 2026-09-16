import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FooterCTA from "@/components/FooterCTA";
import PatientReviewsGrid from "@/components/sections/reviews/PatientReviewsGrid";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "آراء المرضى | Patient Reviews",
  description:
    "قصص وتقييمات حقيقية من مرضى خضعوا لجراحات ورعاية علاجية على يد الدكتور محمود حسان وفريقه الطبي. | Real stories and ratings from patients treated by Dr. Mahmoud Hassan and his medical team.",
  alternates: { canonical: "/reviews" },
};

export default function ReviewsPage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero
        subtitle={{ ar: "آراء وتقييمات المرضى", en: "Patient Reviews & Testimonials" }}
        description={{
          ar: "قصص حقيقية من مرضى خاضوا رحلة العلاج والتعافي على يد الدكتور محمود حسان وفريقه الطبي المتكامل.",
          en: "Real stories from patients who went through their treatment and recovery journey with Dr. Mahmoud Hassan and his integrated medical team.",
        }}
        primaryCta={{
          label: { ar: "حجز موعد", en: "Book Appointment" },
          href: "/contact",
          icon: "calendar",
        }}
        secondaryCta={{
          label: { ar: "تواصل معنا", en: "Contact Us" },
          href: CONTACT.phoneHref,
          icon: "phone",
        }}
      />

      {/* 2. Interactive Patient Reviews Grid */}
      <PatientReviewsGrid />

      {/* 3. Bottom Global CTA */}
      <FooterCTA
        title={{ ar: "هل خضعت للعلاج معنا؟ شاركنا تجربتك", en: "Been treated with us? Share your experience" }}
        subtitle={{
          ar: "رأيك يساعد مرضى آخرين على اتخاذ قرارهم بثقة، وتواصلنا معك مستمر بعد التعافي.",
          en: "Your feedback helps other patients decide with confidence — and our support continues well after recovery.",
        }}
      />
    </>
  );
}

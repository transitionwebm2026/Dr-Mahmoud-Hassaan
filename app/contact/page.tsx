import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FooterCTA from "@/components/FooterCTA";
import ContactFormMapSection from "@/components/sections/contact/ContactFormMapSection";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "تواصل معنا | Contact Us",
  description:
    "احجز استشارتك مع الدكتور محمود حسان عبر واتساب أو الهاتف، أو تعرف على موقع العيادة ومواعيد العمل. | Book your consultation with Dr. Mahmoud Hassan via WhatsApp or phone, or find the clinic's location and hours.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero
        subtitle={{ ar: "تواصل معنا", en: "Contact Us" }}
        description={{
          ar: "فريقنا الطبي جاهز للرد على استفساراتك ومساعدتك في حجز استشارتك مع الدكتور محمود حسان.",
          en: "Our medical team is ready to answer your questions and help you book your consultation with Dr. Mahmoud Hassan.",
        }}
        primaryCta={{
          label: { ar: "حجز استشارة", en: "Book a Consultation" },
          href: "#booking-form",
          icon: "calendar",
        }}
        secondaryCta={{
          label: { ar: "تواصل مباشر", en: "Direct Contact" },
          href: CONTACT.phoneHref,
          icon: "phone",
        }}
      />

      {/* 2. Interactive Booking Form + Clinic Info & Map */}
      <ContactFormMapSection />

      {/* 3. Bottom Global CTA */}
      <FooterCTA
        title={{ ar: "لا تزال لديك أسئلة؟", en: "Still have questions?" }}
        subtitle={{
          ar: "فريقنا على استعداد للرد فورًا — اختر الطريقة الأنسب لك للتواصل معنا.",
          en: "Our team is ready to respond right away — pick whichever way works best for you.",
        }}
      />
    </>
  );
}

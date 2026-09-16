import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FooterCTA from "@/components/FooterCTA";
import ArticlesSection from "@/components/sections/articles/ArticlesSection";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "المقالات | Medical Articles",
  description:
    "مقالات طبية موثوقة عن جراحة الأورام والتشخيص والتعافي، مكتوبة لمساعدتك على فهم رحلتك العلاجية. | Trusted medical articles on surgical oncology, diagnosis, and recovery to help you understand your treatment journey.",
  alternates: { canonical: "/articles" },
};

export default function ArticlesPage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero
        subtitle={{ ar: "المقالات الطبية", en: "Medical Articles" }}
        description={{
          ar: "مقالات موثوقة عن جراحة الأورام والتشخيص والتعافي، مكتوبة لتساعدك على فهم رحلتك العلاجية.",
          en: "Trusted articles on surgical oncology, diagnosis, and recovery — written to help you understand your treatment journey.",
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

      {/* 2 & 3. Featured Article + Articles Grid (share the modal's open/close state) */}
      <ArticlesSection />

      {/* 5. Bottom Global CTA */}
      <FooterCTA
        title={{ ar: "لديك سؤال بعد القراءة؟", en: "Have a question after reading?" }}
        subtitle={{
          ar: "فريقنا جاهز للإجابة عن استفساراتك وحجز استشارتك.",
          en: "Our team is ready to answer your questions and book your consultation.",
        }}
      />
    </>
  );
}

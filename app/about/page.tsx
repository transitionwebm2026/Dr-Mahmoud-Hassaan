import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FooterCTA from "@/components/FooterCTA";
import StatsBar from "@/components/sections/StatsBar";
import DoctorMessage from "@/components/sections/about/DoctorMessage";
import CareerTimeline from "@/components/sections/about/CareerTimeline";
import AboutVideo from "@/components/sections/about/AboutVideo";
import ExpertiseGrid from "@/components/sections/about/ExpertiseGrid";
import Certifications from "@/components/sections/about/Certifications";

export const metadata: Metadata = {
  title: "عن الدكتور | About the Doctor",
  description:
    "تعرف على المسيرة المهنية للدكتور محمود حسان، خبرته الأكاديمية والعملية في جراحة الأورام، وأبرز شهاداته واعتماداته. | Discover Dr. Mahmoud Hassan's professional journey, academic and clinical expertise in surgical oncology, and his key certifications.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero
        subtitle={{ ar: "نبذة عن الدكتور", en: "About the Doctor" }}
        description={{
          ar: "تعرف على مسيرة الدكتور محمود حسان المهنية، وخبرته الواسعة في جراحة الأورام، والشهادات التي حصل عليها على مدار مسيرته.",
          en: "Learn about Dr. Mahmoud Hassan's professional journey, his extensive experience in surgical oncology, and the credentials he has earned throughout his career.",
        }}
      />

      {/* 2. Doctor's Message */}
      <DoctorMessage />

      {/* 3. Career Journey Timeline */}
      <CareerTimeline />

      {/* 4. Introductory Video */}
      <AboutVideo />

      {/* 5. Areas of Expertise */}
      <ExpertiseGrid />

      {/* 6. Certificates & Accreditations */}
      <Certifications />

      {/* 7. Achievements Counter */}
      <StatsBar />

      {/* 8. Bottom CTA */}
      <FooterCTA
        title={{ ar: "هل لديك سؤال للدكتور محمود حسان؟", en: "Have a question for Dr. Mahmoud Hassan?" }}
        subtitle={{
          ar: "تواصل معنا اليوم وسيسعد فريقنا بالرد على استفساراتك وحجز موعدك.",
          en: "Reach out today — our team is happy to answer your questions and book your visit.",
        }}
      />
    </>
  );
}

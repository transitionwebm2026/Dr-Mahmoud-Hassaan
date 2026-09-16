import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FooterCTA from "@/components/FooterCTA";
import VideoLibraryGrid from "@/components/sections/videos/VideoLibraryGrid";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "الفيديوهات | Video Library",
  description:
    "مكتبة فيديوهات توعوية قصيرة تشرح الإجراءات الجراحية وتقدم نصائح عملية قبل الجراحة وبعدها. | A library of short educational videos explaining surgical procedures and offering practical pre- and post-surgery advice.",
  alternates: { canonical: "/videos" },
};

export default function VideosPage() {
  return (
    <>
      {/* 1. Hero */}
      <Hero
        subtitle={{ ar: "مكتبة الفيديوهات", en: "Video Library" }}
        description={{
          ar: "فيديوهات توعوية قصيرة تشرح الإجراءات الجراحية وتقدم نصائح عملية للمرضى قبل الجراحة وبعدها.",
          en: "Short educational videos explaining surgical procedures and offering practical advice for patients before and after surgery.",
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

      {/* 2. Vertical Video Library Grid */}
      <VideoLibraryGrid />

      {/* 3. Bottom Global CTA */}
      <FooterCTA
        title={{ ar: "هل تريد استشارة شخصية؟", en: "Want a personal consultation?" }}
        subtitle={{
          ar: "الفيديوهات نقطة بداية — تواصل معنا للحصول على إجابات تخص حالتك تحديدًا.",
          en: "These videos are a starting point — reach out for answers specific to your case.",
        }}
      />
    </>
  );
}

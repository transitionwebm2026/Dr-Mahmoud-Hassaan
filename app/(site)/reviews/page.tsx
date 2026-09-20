import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FooterCTA from "@/components/FooterCTA";
import PatientReviewsGrid from "@/components/sections/reviews/PatientReviewsGrid";
import { CONTACT } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { toBilingual } from "@/lib/supabase/content";

export const metadata: Metadata = {
  title: "آراء المرضى | Patient Reviews",
  description:
    "قصص وتقييمات حقيقية من مرضى خضعوا لجراحات ورعاية علاجية على يد الدكتور محمود حسان وفريقه الطبي. | Real stories and ratings from patients treated by Dr. Mahmoud Hassan and his medical team.",
  alternates: { canonical: "/reviews" },
};

export const revalidate = 60;

export default async function ReviewsPage() {
  const supabase = await createClient();

  const [heroRes, reviewsRes] = await Promise.all([
    supabase.from("pages_hero").select("*").eq("page_slug", "reviews").maybeSingle(),
    supabase.from("reviews").select("*").eq("is_published", true).order("review_date", { ascending: false }),
  ]);

  const hero = heroRes.data;

  return (
    <>
      <Hero
        title={toBilingual(hero?.title_ar, hero?.title_en)}
        subtitle={
          toBilingual(hero?.subtitle_ar, hero?.subtitle_en) ?? {
            ar: "آراء وتقييمات المرضى",
            en: "Patient Reviews & Testimonials",
          }
        }
        description={
          toBilingual(hero?.description_ar, hero?.description_en) ?? {
            ar: "قصص حقيقية من مرضى خاضوا رحلة العلاج والتعافي على يد الدكتور محمود حسان وفريقه الطبي المتكامل.",
            en: "Real stories from patients who went through their treatment and recovery journey with Dr. Mahmoud Hassan and his integrated medical team.",
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
            ar: "تواصل معنا",
            en: "Contact Us",
          },
          href: hero?.cta_secondary_link || CONTACT.phoneHref,
          icon: "phone",
        }}
      />

      <PatientReviewsGrid reviews={reviewsRes.data ?? []} />

      <FooterCTA
        title={
          toBilingual(hero?.footer_cta_title_ar, hero?.footer_cta_title_en) ?? {
            ar: "هل خضعت للعلاج معنا؟ شاركنا تجربتك",
            en: "Been treated with us? Share your experience",
          }
        }
        subtitle={
          toBilingual(hero?.footer_cta_subtitle_ar, hero?.footer_cta_subtitle_en) ?? {
            ar: "رأيك يساعد مرضى آخرين على اتخاذ قرارهم بثقة، وتواصلنا معك مستمر بعد التعافي.",
            en: "Your feedback helps other patients decide with confidence — and our support continues well after recovery.",
          }
        }
      />
    </>
  );
}

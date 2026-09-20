import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FooterCTA from "@/components/FooterCTA";
import ContactFormMapSection from "@/components/sections/contact/ContactFormMapSection";
import { CONTACT } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { toBilingual } from "@/lib/supabase/content";

export const metadata: Metadata = {
  title: "تواصل معنا | Contact Us",
  description:
    "احجز استشارتك مع الدكتور محمود حسان عبر واتساب أو الهاتف، أو تعرف على موقع العيادة ومواعيد العمل. | Book your consultation with Dr. Mahmoud Hassan via WhatsApp or phone, or find the clinic's location and hours.",
  alternates: { canonical: "/contact" },
};

export const revalidate = 60;

export default async function ContactPage() {
  const supabase = await createClient();

  const [heroRes, settingsRes] = await Promise.all([
    supabase.from("pages_hero").select("*").eq("page_slug", "contact").maybeSingle(),
    supabase.from("clinic_settings").select("*").limit(1).maybeSingle(),
  ]);

  const hero = heroRes.data;

  return (
    <>
      <Hero
        title={toBilingual(hero?.title_ar, hero?.title_en)}
        subtitle={toBilingual(hero?.subtitle_ar, hero?.subtitle_en) ?? { ar: "تواصل معنا", en: "Contact Us" }}
        description={
          toBilingual(hero?.description_ar, hero?.description_en) ?? {
            ar: "فريقنا الطبي جاهز للرد على استفساراتك ومساعدتك في حجز استشارتك مع الدكتور محمود حسان.",
            en: "Our medical team is ready to answer your questions and help you book your consultation with Dr. Mahmoud Hassan.",
          }
        }
        photoSrc={hero?.background_image_url || undefined}
        primaryCta={{
          label: toBilingual(hero?.cta_primary_text_ar, hero?.cta_primary_text_en) ?? {
            ar: "حجز استشارة",
            en: "Book a Consultation",
          },
          href: hero?.cta_primary_link || "#booking-form",
          icon: "calendar",
        }}
        secondaryCta={{
          label: toBilingual(hero?.cta_secondary_text_ar, hero?.cta_secondary_text_en) ?? {
            ar: "تواصل مباشر",
            en: "Direct Contact",
          },
          href: hero?.cta_secondary_link || CONTACT.phoneHref,
          icon: "phone",
        }}
      />

      <ContactFormMapSection clinicSettings={settingsRes.data} />

      <FooterCTA
        title={
          toBilingual(hero?.footer_cta_title_ar, hero?.footer_cta_title_en) ?? {
            ar: "لا تزال لديك أسئلة؟",
            en: "Still have questions?",
          }
        }
        subtitle={
          toBilingual(hero?.footer_cta_subtitle_ar, hero?.footer_cta_subtitle_en) ?? {
            ar: "فريقنا على استعداد للرد فورًا — اختر الطريقة الأنسب لك للتواصل معنا.",
            en: "Our team is ready to respond right away — pick whichever way works best for you.",
          }
        }
      />
    </>
  );
}

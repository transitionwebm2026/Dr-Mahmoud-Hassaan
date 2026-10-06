import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FooterCTA from "@/components/FooterCTA";
import ContactFormMapSection from "@/components/sections/contact/ContactFormMapSection";
import { CONTACT } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { toBilingual } from "@/lib/supabase/content";
import { resolveSectionHeadings } from "@/lib/section-headings";
import { resolveFooterCta } from "@/lib/footer-cta";

export const metadata: Metadata = {
  title: "تواصل معنا | Contact Us",
  description:
    "احجز استشارتك مع الدكتور محمود حسان عبر واتساب أو الهاتف، أو تعرف على موقع العيادة ومواعيد العمل. | Book your consultation with Dr. Mahmoud Hassan via WhatsApp or phone, or find the clinic's location and hours.",
  alternates: { canonical: "/contact" },
};

export const revalidate = 60;

export default async function ContactPage() {
  const supabase = await createClient();

  const [heroRes, settingsRes, headingsRes] = await Promise.all([
    supabase.from("pages_hero").select("*").eq("page_slug", "contact").maybeSingle(),
    supabase.from("clinic_settings").select("*").limit(1).maybeSingle(),
    supabase.from("section_headings").select("*").eq("page_slug", "contact"),
  ]);

  const hero = heroRes.data;
  const footerCta = resolveFooterCta("contact", hero, settingsRes.data);
  const headings = resolveSectionHeadings("contact", headingsRes.data);

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
        settings={settingsRes.data}
      />

      <ContactFormMapSection heading={headings.booking} clinicSettings={settingsRes.data} />

      {footerCta && <FooterCTA cta={footerCta} />}
    </>
  );
}

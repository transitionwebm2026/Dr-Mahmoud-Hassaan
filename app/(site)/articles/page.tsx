import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FooterCTA from "@/components/FooterCTA";
import ArticlesSection from "@/components/sections/articles/ArticlesSection";
import { CONTACT } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { toBilingual } from "@/lib/supabase/content";

export const metadata: Metadata = {
  title: "المقالات | Medical Articles",
  description:
    "مقالات طبية موثوقة عن جراحة الأورام والتشخيص والتعافي، مكتوبة لمساعدتك على فهم رحلتك العلاجية. | Trusted medical articles on surgical oncology, diagnosis, and recovery to help you understand your treatment journey.",
  alternates: { canonical: "/articles" },
};

export const revalidate = 60;

export default async function ArticlesPage() {
  const supabase = await createClient();

  const [heroRes, articlesRes] = await Promise.all([
    supabase.from("pages_hero").select("*").eq("page_slug", "articles").maybeSingle(),
    supabase
      .from("articles")
      .select("*")
      .eq("is_published", true)
      .order("is_hero_featured", { ascending: false })
      .order("published_at", { ascending: false }),
  ]);

  const hero = heroRes.data;

  return (
    <>
      <Hero
        title={toBilingual(hero?.title_ar, hero?.title_en)}
        subtitle={toBilingual(hero?.subtitle_ar, hero?.subtitle_en) ?? { ar: "المقالات الطبية", en: "Medical Articles" }}
        description={
          toBilingual(hero?.description_ar, hero?.description_en) ?? {
            ar: "مقالات موثوقة عن جراحة الأورام والتشخيص والتعافي، مكتوبة لتساعدك على فهم رحلتك العلاجية.",
            en: "Trusted articles on surgical oncology, diagnosis, and recovery — written to help you understand your treatment journey.",
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

      <ArticlesSection articles={articlesRes.data ?? []} />

      <FooterCTA
        title={
          toBilingual(hero?.footer_cta_title_ar, hero?.footer_cta_title_en) ?? {
            ar: "لديك سؤال بعد القراءة؟",
            en: "Have a question after reading?",
          }
        }
        subtitle={
          toBilingual(hero?.footer_cta_subtitle_ar, hero?.footer_cta_subtitle_en) ?? {
            ar: "فريقنا جاهز للإجابة عن استفساراتك وحجز استشارتك.",
            en: "Our team is ready to answer your questions and book your consultation.",
          }
        }
      />
    </>
  );
}

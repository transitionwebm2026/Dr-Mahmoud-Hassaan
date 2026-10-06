import type { Metadata } from "next";
import Hero from "@/components/Hero";
import FooterCTA from "@/components/FooterCTA";
import VideoLibraryGrid from "@/components/sections/videos/VideoLibraryGrid";
import { CONTACT } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { toBilingual } from "@/lib/supabase/content";
import { resolveSectionHeadings } from "@/lib/section-headings";
import { resolveFooterCta } from "@/lib/footer-cta";

export const metadata: Metadata = {
  title: "الفيديوهات | Video Library",
  description:
    "مكتبة فيديوهات توعوية قصيرة تشرح الإجراءات الجراحية وتقدم نصائح عملية قبل الجراحة وبعدها. | A library of short educational videos explaining surgical procedures and offering practical pre- and post-surgery advice.",
  alternates: { canonical: "/videos" },
};

export const revalidate = 60;

export default async function VideosPage() {
  const supabase = await createClient();

  const [heroRes, settingsRes, videosRes, headingsRes] = await Promise.all([
    supabase.from("pages_hero").select("*").eq("page_slug", "videos").maybeSingle(),
    supabase.from("clinic_settings").select("*").limit(1).maybeSingle(),
    supabase.from("videos").select("*").eq("is_published", true).order("order_index"),
    supabase.from("section_headings").select("*").eq("page_slug", "videos"),
  ]);

  const hero = heroRes.data;
  const footerCta = resolveFooterCta("videos", hero, settingsRes.data);
  const headings = resolveSectionHeadings("videos", headingsRes.data);

  return (
    <>
      <Hero
        title={toBilingual(hero?.title_ar, hero?.title_en)}
        subtitle={toBilingual(hero?.subtitle_ar, hero?.subtitle_en) ?? { ar: "مكتبة الفيديوهات", en: "Video Library" }}
        description={
          toBilingual(hero?.description_ar, hero?.description_en) ?? {
            ar: "فيديوهات توعوية قصيرة تشرح الإجراءات الجراحية وتقدم نصائح عملية للمرضى قبل الجراحة وبعدها.",
            en: "Short educational videos explaining surgical procedures and offering practical advice for patients before and after surgery.",
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
        settings={settingsRes.data}
      />

      <VideoLibraryGrid heading={headings.library} videos={videosRes.data ?? []} />

      {footerCta && <FooterCTA cta={footerCta} />}
    </>
  );
}

import type { Faq } from "@/lib/supabase/types";

/** Renders FAQPage structured data (Arabic text, matching the site's default SSR language) for a page's FAQ section, so eligible questions can surface as rich results. */
export default function FaqJsonLd({ faqs }: { faqs: Faq[] }) {
  if (faqs.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question_ar,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer_ar,
      },
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

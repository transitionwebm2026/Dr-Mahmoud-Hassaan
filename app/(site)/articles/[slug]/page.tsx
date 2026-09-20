import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FooterCTA from "@/components/FooterCTA";
import ArticleContent from "@/components/sections/articles/ArticleContent";
import { DOCTOR } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";
import { getSiteUrl } from "@/lib/site-url";
import type { Article } from "@/lib/supabase/types";

export const revalidate = 60;

async function getArticle(slug: string): Promise<Article | null> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("articles")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();
  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) return {};

  const title = `${article.title_ar} | ${article.title_en}`;
  const description = `${article.excerpt_ar} | ${article.excerpt_en}`;

  return {
    title,
    description,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: article.published_at,
      ...(article.featured_image_url ? { images: [{ url: article.featured_image_url }] } : {}),
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();

  const siteUrl = getSiteUrl();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    headline: article.title_en,
    alternativeHeadline: article.title_ar,
    description: article.excerpt_en,
    ...(article.featured_image_url ? { image: article.featured_image_url } : {}),
    datePublished: article.published_at,
    dateModified: article.updated_at,
    inLanguage: ["ar", "en"],
    url: `${siteUrl}/articles/${article.slug}`,
    author: { "@type": "Person", name: DOCTOR.name.en },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ArticleContent article={article} />
      <FooterCTA />
    </>
  );
}

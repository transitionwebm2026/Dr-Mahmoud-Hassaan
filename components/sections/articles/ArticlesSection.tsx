import type { Article } from "@/lib/supabase/types";
import type { SectionHeadingContent } from "@/lib/section-headings";
import FeaturedArticle from "./FeaturedArticle";
import ArticlesGrid from "./ArticlesGrid";

export interface ArticlesSectionProps {
  articles: Article[];
  headings: { featured: SectionHeadingContent; grid: SectionHeadingContent };
}

export default function ArticlesSection({ articles, headings }: ArticlesSectionProps) {
  if (articles.length === 0) return null;

  const [featured, ...rest] = articles;

  return (
    <>
      <FeaturedArticle article={featured} heading={headings.featured} />
      <ArticlesGrid articles={rest} heading={headings.grid} />
    </>
  );
}

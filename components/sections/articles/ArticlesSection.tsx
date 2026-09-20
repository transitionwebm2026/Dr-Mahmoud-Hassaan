import type { Article } from "@/lib/supabase/types";
import FeaturedArticle from "./FeaturedArticle";
import ArticlesGrid from "./ArticlesGrid";

export interface ArticlesSectionProps {
  articles: Article[];
}

export default function ArticlesSection({ articles }: ArticlesSectionProps) {
  if (articles.length === 0) return null;

  const [featured, ...rest] = articles;

  return (
    <>
      <FeaturedArticle article={featured} />
      <ArticlesGrid articles={rest} />
    </>
  );
}

"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { articles } from "./articlesData";
import FeaturedArticle from "./FeaturedArticle";
import ArticlesGrid from "./ArticlesGrid";
import ArticleModal from "./ArticleModal";

const [featured, ...rest] = articles;

export default function ArticlesSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedArticle = articles.find((a) => a.id === selectedId) ?? null;

  return (
    <>
      <FeaturedArticle article={featured} onOpen={() => setSelectedId(featured.id)} />
      <ArticlesGrid articles={rest} onOpen={setSelectedId} />

      <AnimatePresence>
        {selectedArticle && (
          <ArticleModal article={selectedArticle} onClose={() => setSelectedId(null)} />
        )}
      </AnimatePresence>
    </>
  );
}

import { useState } from "react";
import { X } from "lucide-react";

interface ArticleFiltersProps {
  pillars: string[];
  selectedPillar: string | null;
  onPillarChange: (pillar: string | null) => void;
}

export function ArticleFilters({ pillars, selectedPillar, onPillarChange }: ArticleFiltersProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => onPillarChange(null)}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          selectedPillar === null
            ? "text-white"
            : "text-gray-600 hover:text-gray-900 border border-gray-300"
        }`}
        style={{
          backgroundColor: selectedPillar === null ? "var(--mustard)" : "transparent",
          borderColor: selectedPillar === null ? "var(--mustard)" : "var(--line)",
        }}
      >
        All Articles
      </button>

      {pillars.map((pillar) => (
        <button
          key={pillar}
          onClick={() => onPillarChange(selectedPillar === pillar ? null : pillar)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
            selectedPillar === pillar
              ? "text-white"
              : "text-gray-600 hover:text-gray-900 border border-gray-300"
          }`}
          style={{
            backgroundColor: selectedPillar === pillar ? "var(--mustard)" : "transparent",
            borderColor: selectedPillar === pillar ? "var(--mustard)" : "var(--line)",
          }}
        >
          {pillar}
          {selectedPillar === pillar && <X size={16} />}
        </button>
      ))}
    </div>
  );
}

export function RelatedArticles({ articles, currentSlug }: { articles: any[]; currentSlug: string }) {
  const related = articles.filter((a) => a.slug !== currentSlug).slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="mt-16 pt-8 border-t" style={{ borderColor: "var(--line)" }}>
      <h3
        className="font-display font-bold mb-6"
        style={{ color: "var(--ink)", fontSize: "20px" }}
      >
        Related Articles
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {related.map((article) => (
          <a
            key={article.slug}
            href={`/writing/${article.slug}`}
            className="group p-4 rounded-lg hover:bg-gray-50 transition-colors no-underline"
          >
            <p
              className="text-xs font-medium uppercase tracking-[0.1em] mb-2"
              style={{ color: "var(--mustard)" }}
            >
              {article.pillar}
            </p>
            <h4
              className="font-display font-bold mb-2 group-hover:underline"
              style={{ color: "var(--ink)", fontSize: "16px" }}
            >
              {article.title}
            </h4>
            <p style={{ color: "var(--ink-muted)", fontSize: "14px" }}>
              {article.readTime}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}

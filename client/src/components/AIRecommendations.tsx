import { trpc } from "@/lib/trpc";
import { Link } from "wouter";
import { Loader2, ArrowRight } from "lucide-react";

interface AIRecommendationsProps {
  currentArticleId: number;
  limit?: number;
}

export function AIRecommendations({ currentArticleId, limit = 4 }: AIRecommendationsProps) {
  const { data: recommendations, isLoading } = (trpc as any).recommendations.getRecommendations.useQuery({
    articleId: currentArticleId,
    limit,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 size={24} className="animate-spin" style={{ color: "var(--mustard)" }} />
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return null;
  }

  return (
    <section className="my-16 py-12 border-t border-b" style={{ borderColor: "var(--line)" }}>
      <h3 className="font-display font-bold text-2xl mb-8" style={{ color: "var(--ink)" }}>
        Recommended for You
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((rec: any) => (
          <Link
            key={rec.articleId}
            href={`/writing/${rec.slug}`}
            className="p-6 rounded-lg border transition-all hover:shadow-lg hover:border-opacity-50 bg-white cursor-pointer"
            style={{ borderColor: "var(--line)" }}
          >
            <div className="flex items-start justify-between mb-3">
              <h4 className="font-display font-bold text-lg flex-1" style={{ color: "var(--ink)" }}>
                {rec.title}
              </h4>
              <ArrowRight size={20} style={{ color: "var(--mustard)", flexShrink: 0 }} />
            </div>

            <p className="text-sm mb-3" style={{ color: "var(--ink-muted)" }}>
              {rec.reason.split("_").join(" ")}
            </p>

            <div className="text-xs font-medium" style={{ color: "var(--mustard)" }}>
              Relevance: {Math.round((rec.score / 100) * 100)}%
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

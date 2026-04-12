import { useState } from "react";
import { Star, TrendingUp, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FeaturedArticle {
  id: string;
  title: string;
  excerpt: string;
  pillar: string;
  readTime: number;
  views: number;
  featured: boolean;
}

interface ContentDiscoverabilityProps {
  articles: FeaturedArticle[];
  type: "trending" | "editors-picks" | "featured";
}

export function ContentDiscoverability({
  articles,
  type,
}: ContentDiscoverabilityProps) {
  const [selectedArticle, setSelectedArticle] = useState<string | null>(null);

  const getIcon = () => {
    switch (type) {
      case "trending":
        return <TrendingUp className="w-5 h-5 text-orange-500" />;
      case "editors-picks":
        return <Star className="w-5 h-5 text-yellow-500" />;
      case "featured":
        return <Flame className="w-5 h-5 text-red-500" />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case "trending":
        return "Trending Now";
      case "editors-picks":
        return "Editor's Picks";
      case "featured":
        return "Featured";
    }
  };

  const getDescription = () => {
    switch (type) {
      case "trending":
        return "Most read this week";
      case "editors-picks":
        return "Handpicked by our team";
      case "featured":
        return "Essential reading";
    }
  };

  return (
    <section className="py-8 px-4 bg-gradient-to-br from-[#F7F5F0] to-white rounded-lg">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          {getIcon()}
          <div>
            <h2 className="text-2xl font-bold text-[#1A1A1A]">{getTitle()}</h2>
            <p className="text-sm text-[#6B7280]">{getDescription()}</p>
          </div>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(0, 6).map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-[#E5E7EB] overflow-hidden cursor-pointer"
              onClick={() => setSelectedArticle(article.id)}
            >
              <div className="p-6">
                {/* Pillar Badge */}
                <div className="inline-block mb-3">
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-[#B8963E]/10 text-[#B8963E]">
                    {article.pillar}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#1A1A1A] mb-2 line-clamp-2">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">
                  {article.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-[#9CA3AF]">
                  <span>{article.readTime} min read</span>
                  <span>{article.views.toLocaleString()} views</span>
                </div>

                {/* CTA */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full mt-4 text-[#B8963E] border-[#B8963E] hover:bg-[#B8963E]/5"
                >
                  Read Article
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-8">
          <Button
            variant="ghost"
            className="text-[#B8963E] hover:text-[#9d7d35]"
          >
            View all {type === "trending" ? "trending" : type === "editors-picks" ? "editor's picks" : "featured"} articles →
          </Button>
        </div>
      </div>
    </section>
  );
}

/**
 * Hook to get featured articles
 */
export function useFeaturedArticles(type: "trending" | "editors-picks" | "featured") {
  const [articles, setArticles] = useState<FeaturedArticle[]>([]);
  const [loading, setLoading] = useState(true);

  // TODO: Replace with actual API call
  // const { data } = trpc.articles.getFeatured.useQuery({ type });

  return { articles, loading };
}

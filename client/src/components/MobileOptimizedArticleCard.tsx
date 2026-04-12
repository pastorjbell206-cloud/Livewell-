import { Link } from "wouter";
import { Clock, ChevronRight } from "lucide-react";

interface MobileOptimizedArticleCardProps {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  pillar: string;
  readTime: string;
  publishedAt?: Date;
  featured?: boolean;
}

export function MobileOptimizedArticleCard({
  title,
  excerpt,
  slug,
  pillar,
  readTime,
  publishedAt,
  featured,
}: MobileOptimizedArticleCardProps) {
  const pillarColors: Record<string, string> = {
    "Prophetic Disruption": "#1A1A1A",
    "Theological Depth": "#2C3E50",
    "Prophetic Justice": "#2D4A3E",
    "Integrated Life": "#B8963E",
    "Leadership Formation": "#2C3E50",
  };

  const pillarColor = pillarColors[pillar] || "#1A1A1A";

  return (
    <Link href={`/writing/${slug}`}>
      <div
        className={`block p-4 sm:p-6 rounded-lg border transition-all hover:shadow-lg hover:border-opacity-50 cursor-pointer ${
          featured ? "bg-gradient-to-br from-white to-gray-50" : "bg-white"
        }`}
        style={{ borderColor: "#D1C9BB" }}
      >
        {/* Pillar badge */}
        <div className="flex items-center justify-between mb-3">
          <span
            className="text-xs font-medium uppercase tracking-wider px-2 py-1 rounded"
            style={{ color: pillarColor, backgroundColor: `${pillarColor}15` }}
          >
            {pillar}
          </span>
          {featured && (
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#B8963E" }}>
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className="font-display font-bold text-lg sm:text-xl mb-2 line-clamp-2 hover:opacity-75 transition-opacity"
          style={{ color: "#1A1A1A" }}
        >
          {title}
        </h3>

        {/* Excerpt */}
        <p className="text-sm sm:text-base mb-4 line-clamp-2" style={{ color: "#6B7280" }}>
          {excerpt}
        </p>

        {/* Meta and CTA */}
        <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: "#D1C9BB" }}>
          <div className="flex items-center gap-4 text-xs" style={{ color: "#6B7280" }}>
            <div className="flex items-center gap-1">
              <Clock size={14} />
              {readTime}
            </div>
            {publishedAt && (
              <time>
                {new Date(publishedAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </time>
            )}
          </div>
          <ChevronRight size={18} style={{ color: "#B8963E" }} />
        </div>
      </div>
    </Link>
  );
}

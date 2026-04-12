import { Link } from "wouter";
import { Clock, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface ArticleCardProps {
  id: number;
  slug: string;
  title: string;
  excerpt?: string;
  body?: string;
  pillar: string;
  readTime?: number;
  author?: string;
  isFeatured?: boolean;
  date?: string;
  className?: string;
}

const PILLAR_COLORS: Record<string, { bg: string; text: string; icon: string }> = {
  "Prophetic Disruption": {
    bg: "bg-[#1A1A1A]",
    text: "text-white",
    icon: "🔥",
  },
  "Theological Depth": {
    bg: "bg-[#2C3E50]",
    text: "text-white",
    icon: "📚",
  },
  "Prophetic Justice": {
    bg: "bg-[#2D4A3E]",
    text: "text-white",
    icon: "⚖️",
  },
  "Integrated Life": {
    bg: "bg-[#B8963E]",
    text: "text-white",
    icon: "🏠",
  },
  "Leadership Formation": {
    bg: "bg-[#6B7280]",
    text: "text-white",
    icon: "👥",
  },
};

export function ArticleCard({
  id,
  slug,
  title,
  excerpt,
  body,
  pillar,
  readTime = 5,
  author = "James Bell",
  isFeatured = false,
  date,
  className,
}: ArticleCardProps) {
  const pillarColor = PILLAR_COLORS[pillar] || PILLAR_COLORS["Leadership Formation"];
  
  // Generate excerpt from body if not provided
  const displayExcerpt = excerpt || (body ? body.substring(0, 150).trim() + "..." : "");

  return (
    <Link href={`/writing/${slug}`}>
      <a className={cn(
        "group block h-full rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg hover:border-accent",
        isFeatured && "ring-2 ring-[#B8963E] ring-offset-2",
        className
      )}>
        {/* Header with pillar badge and featured star */}
        <div className="mb-4 flex items-start justify-between">
          <div className={cn(
            "inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium",
            pillarColor.bg,
            pillarColor.text
          )}>
            <span>{pillarColor.icon}</span>
            <span className="truncate">{pillar}</span>
          </div>
          {isFeatured && (
            <div className="flex items-center gap-1 rounded-full bg-[#B8963E] px-2 py-1 text-white">
              <Star size={14} className="fill-current" />
              <span className="text-xs font-semibold">Editor's Pick</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-3 line-clamp-2 text-xl font-bold leading-tight text-foreground group-hover:text-accent transition-colors">
          {title}
        </h3>

        {/* Excerpt */}
        {displayExcerpt && (
          <p className="mb-4 line-clamp-2 text-sm text-muted-foreground">
            {displayExcerpt}
          </p>
        )}

        {/* Footer with metadata */}
        <div className="flex flex-wrap items-center gap-3 border-t border-border pt-4 text-xs text-muted-foreground">
          {/* Read time */}
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{readTime} min read</span>
          </div>

          {/* Author */}
          {author && (
            <div className="flex items-center gap-1">
              <span className="text-[10px]">BY</span>
              <span className="font-medium text-foreground">{author}</span>
            </div>
          )}

          {/* Date */}
          {date && (
            <div className="ml-auto text-right">
              <span>{date}</span>
            </div>
          )}
        </div>
      </a>
    </Link>
  );
}

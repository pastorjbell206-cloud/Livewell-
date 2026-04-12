import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Skeleton } from "@/components/ui/skeleton";
import type { Post } from "@shared/types";

interface RelatedArticlesProps {
  currentSlug: string;
  currentPillar: string;
}

export function RelatedArticles({ currentSlug, currentPillar }: RelatedArticlesProps) {
  const { data: relatedArticles = [], isLoading } = trpc.relatedArticles.getRelated.useQuery({
    slug: currentSlug,
    pillar: currentPillar,
  }) as { data: Post[] | undefined; isLoading: boolean };

  if (isLoading) {
    return (
      <div className="mt-12 pt-8 border-t border-border">
        <h3 className="text-2xl font-serif font-bold mb-6">Keep Reading</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-48 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  if (!relatedArticles || relatedArticles.length === 0) {
    return null;
  }

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="text-2xl font-serif font-bold mb-6">Keep Reading</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {relatedArticles.map((article: Post) => (
          <Link key={article.slug} href={`/writing/${article.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <CardDescription className="text-xs font-semibold uppercase tracking-wider mb-2">
                      {article.pillar}
                    </CardDescription>
                    <CardTitle className="text-lg group-hover:text-accent transition-colors line-clamp-3">
                      {article.title}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col justify-between h-full">
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{article.readTime} min read</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

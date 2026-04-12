import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ForLeaders() {
  const [selectedPillar, setSelectedPillar] = useState<string | null>(null);

  const { data: posts, isLoading } = trpc.posts.listPublished.useQuery();

  const leaderArticles = useMemo(() => {
    if (!posts) return [];
    return posts.filter(
      (post: any) => post.audienceType === "leaders" && post.published
    );
  }, [posts]);

  const filteredArticles = useMemo(() => {
    if (!selectedPillar) return leaderArticles;
    return leaderArticles.filter((post: any) => post.pillar === selectedPillar);
  }, [leaderArticles, selectedPillar]);

  const pillars = ["Prophetic Disruption", "Theological Depth", "Prophetic Justice", "Integrated Life", "Leadership Formation"];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Leadership Formation & Vision
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Develop your leadership voice, navigate complexity, and lead with prophetic clarity
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg">Join Leaders Circle</Button>
              <Button size="lg" variant="outline">Explore Coaching</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured for Leaders</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {filteredArticles.slice(0, 3).map((post: any) => (
              <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="text-sm font-semibold text-primary mb-2">
                  {post.pillar}
                </div>
                <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                <p className="text-muted-foreground mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{post.readTime} min read</span>
                  <a href={`/article/${post.slug}`} className="text-primary hover:underline">
                    Read →
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pillar Filter */}
      <section className="py-12 md:py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Browse by Pillar</h2>
          <div className="flex flex-wrap gap-3 mb-12">
            <Button
              variant={selectedPillar === null ? "default" : "outline"}
              onClick={() => setSelectedPillar(null)}
            >
              All Articles ({leaderArticles.length})
            </Button>
            {pillars.map((pillar: string) => {
              const count = leaderArticles.filter(
                (post: any) => post.pillar === pillar
              ).length;
              return (
                <Button
                  key={pillar}
                  variant={selectedPillar === pillar ? "default" : "outline"}
                  onClick={() => setSelectedPillar(pillar)}
                >
                  {pillar} ({count})
                </Button>
              );
            })}
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {filteredArticles.map((post: any) => (
              <Card key={post.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="text-sm font-semibold text-primary mb-1">
                      {post.pillar}
                    </div>
                    <h3 className="text-xl font-bold">{post.title}</h3>
                  </div>
                </div>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {post.readTime} min read
                  </span>
                  <a href={`/article/${post.slug}`} className="text-primary hover:underline">
                    Read Article →
                  </a>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Develop Your Leadership?
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join our exclusive Leaders Circle for mentorship, peer community, and strategic coaching
          </p>
          <Button size="lg" variant="secondary">
            Join Leaders Circle
          </Button>
        </div>
      </section>
    </div>
  );
}

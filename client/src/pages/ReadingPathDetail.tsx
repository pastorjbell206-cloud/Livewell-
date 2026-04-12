import { SEOMeta } from "@/components/SEOMeta";
import { ArticleCard } from "@/components/ArticleCard";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, BookOpen } from "lucide-react";
import { Link, useRoute } from "wouter";
import { trpc } from "@/lib/trpc";

// Define reading paths with their topic filters
const READING_PATH_CONFIGS: Record<string, { title: string; description: string; topics: string[] }> = {
  "pastors-guide": {
    title: "A Pastor's Guide to Thriving",
    description: "Essential reading for navigating ministry, leadership challenges, and personal spiritual health",
    topics: ["leadership", "spiritual-formation"],
  },
  "church-leadership": {
    title: "Church Leadership Essentials",
    description: "Governance, vision, organizational health, and building healthy leadership teams",
    topics: ["leadership", "church-health"],
  },
  "marriage-family": {
    title: "Marriage & Family in Ministry",
    description: "Protecting your marriage, raising healthy kids, and maintaining family boundaries in ministry",
    topics: ["personal-growth"],
  },
  "spiritual-formation": {
    title: "Spiritual Formation & Prayer",
    description: "Deepening your own faith, spiritual disciplines, and inner transformation",
    topics: ["spiritual-formation"],
  },
  "new-to-ministry": {
    title: "New to Ministry",
    description: "Foundational teaching for those starting their pastoral journey",
    topics: ["leadership", "pastoral-care"],
  },
  "cultural-engagement": {
    title: "Cultural Engagement & Justice",
    description: "Navigating cultural issues, social justice, and prophetic witness in a divided world",
    topics: ["justice"],
  },
  "editors-picks": {
    title: "Editor's Picks",
    description: "Our handpicked selection of the most transformative articles on the site",
    topics: [], // Will show featured articles
  },
};

export function ReadingPathDetail() {
  const [match, params] = useRoute("/reading-paths/:slug");
  const { data: allPosts, isLoading } = trpc.posts.listPublished.useQuery();

  if (!match) {
    return (
      <div className="container py-12 text-center">
        <p className="text-muted-foreground">Reading path not found</p>
      </div>
    );
  }

  const pathConfig = READING_PATH_CONFIGS[params?.slug as string];

  if (!pathConfig) {
    return (
      <div className="container py-12">
        <Link href="/reading-paths">
          <Button variant="outline" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Reading Paths
          </Button>
        </Link>
        <p className="text-muted-foreground">Reading path not found</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--paper)" }}>
        <Loader2 size={32} style={{ color: "var(--gold)", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  // Filter articles based on reading path topics
  let filteredArticles = allPosts || [];
  
  if (params?.slug !== "editors-picks") {
    filteredArticles = filteredArticles.filter((post: any) =>
      pathConfig.topics.length === 0 || pathConfig.topics.some(topic => 
        post.topic?.toLowerCase() === topic.toLowerCase()
      )
    );
  } else {
    // For editor's picks, show featured/popular articles
    filteredArticles = filteredArticles.slice(0, 12);
  }

  const totalReadTime = filteredArticles.reduce((sum: number, article: any) => sum + (article.readTime || 5), 0);

  return (
    <>
      <SEOMeta
        title={pathConfig.title}
        description={pathConfig.description}
        keywords={`reading path, ${pathConfig.topics.join(", ")}, articles, learning journey`}
      />
      <div>
        {/* HERO SECTION */}
        <section className="hero" style={{ background: "linear-gradient(135deg, var(--forest) 0%, var(--ink) 100%)" }}>
          <div className="wrap">
            <Link href="/reading-paths">
              <button style={{ 
                background: "none", 
                border: "none", 
                color: "var(--gold)", 
                cursor: "pointer", 
                fontSize: "14px",
                fontFamily: "var(--U)",
                letterSpacing: ".1em",
                marginBottom: "16px",
                textTransform: "uppercase",
                display: "flex",
                alignItems: "center",
                gap: "8px"
              }}>
                ← Back to Reading Paths
              </button>
            </Link>
            <h1 className="hero-title" style={{ color: "white", marginBottom: "16px" }}>
              {pathConfig.title}
            </h1>
            <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "18px", lineHeight: "1.6", marginBottom: "24px", maxWidth: "600px" }}>
              {pathConfig.description}
            </p>
            <div style={{ color: "var(--gold)", fontSize: "14px", fontFamily: "var(--U)", letterSpacing: ".1em" }}>
              {filteredArticles.length} articles · {Math.round(totalReadTime / 5)} hours to complete
            </div>
          </div>
        </section>

        {/* ARTICLES SECTION */}
        <section className="section">
          <div className="wrap">
            <h2 className="section-title">Reading Path Articles</h2>
            
            {filteredArticles.length === 0 ? (
              <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--gray)" }}>
                <BookOpen size={48} style={{ margin: "0 auto 16px", opacity: 0.5 }} />
                <p style={{ fontSize: "18px" }}>No articles found for this reading path yet.</p>
                <p style={{ fontSize: "14px", marginTop: "8px", opacity: 0.7 }}>Check back soon!</p>
              </div>
            ) : (
              <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
                {filteredArticles.map((article: any, index: number) => (
                  <div key={article.id} style={{ position: "relative" }}>
                    {/* Article number badge */}
                    <div style={{
                      position: "absolute",
                      left: "-12px",
                      top: "16px",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "var(--gold)",
                      color: "var(--ink)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "12px",
                      zIndex: 10
                    }}>
                      {index + 1}
                    </div>
                    
                    <ArticleCard
                      id={article.id}
                      slug={article.slug}
                      title={article.title}
                      excerpt={article.excerpt}
                      pillar={article.pillar || article.topic}
                      readTime={article.readTime}
                      author={article.author || "James Bell"}
                      date={article.createdAt ? new Date(article.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }) : ""}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="section" style={{ background: "var(--forest)", color: "white", textAlign: "center" }}>
          <div className="wrap">
            <h2 className="section-title" style={{ color: "white", marginBottom: "16px" }}>
              Ready to Go Deeper?
            </h2>
            <p style={{ fontSize: "18px", marginBottom: "24px", color: "rgba(255,255,255,0.9)", maxWidth: "500px", margin: "0 auto 24px" }}>
              Join our community of pastoral leaders and get exclusive access to all reading paths, bonus content, and live Q&A sessions.
            </p>
            <Link href="/membership">
              <button style={{
                padding: "12px 32px",
                background: "var(--gold)",
                color: "var(--ink)",
                border: "none",
                borderRadius: "2px",
                fontWeight: "600",
                fontSize: "14px",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}>
                Explore Membership →
              </button>
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

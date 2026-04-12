import { useLocation } from "wouter";
import { SEOMeta } from "@/components/SEOMeta";
import { ArrowLeft, BookOpen, Users, Heart, Lightbulb, MapPin, Zap } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Loader2 } from "lucide-react";

const READING_PATHS = [
  {
    slug: "pastors-guide",
    title: "A Pastor's Guide to Thriving",
    description: "Essential reading for navigating ministry, leadership challenges, and personal spiritual health",
    icon: BookOpen,
    bgColor: "var(--sage)",
    accentColor: "var(--gold)",
    topics: ["Calling", "Burnout", "Spiritual Formation", "Leadership"],
    articleCount: 8,
  },
  {
    slug: "church-leadership",
    title: "Church Leadership Essentials",
    description: "Governance, vision, organizational health, and building healthy leadership teams",
    icon: Users,
    bgColor: "var(--forest)",
    accentColor: "var(--gold)",
    topics: ["Governance", "Vision", "Team Building", "Culture"],
    articleCount: 7,
  },
  {
    slug: "marriage-family",
    title: "Marriage & Family in Ministry",
    description: "Protecting your marriage, raising healthy kids, and maintaining family boundaries in ministry",
    icon: Heart,
    bgColor: "var(--ink)",
    accentColor: "var(--gold)",
    topics: ["Marriage", "Parenting", "Boundaries", "Family Health"],
    articleCount: 6,
  },
  {
    slug: "spiritual-formation",
    title: "Spiritual Formation & Prayer",
    description: "Deepening your own faith, spiritual disciplines, and inner transformation",
    icon: Lightbulb,
    bgColor: "var(--sage)",
    accentColor: "var(--gold)",
    topics: ["Prayer", "Disciplines", "Contemplation", "Growth"],
    articleCount: 6,
  },
  {
    slug: "new-to-ministry",
    title: "New to Ministry",
    description: "Foundational teaching for those starting their pastoral journey",
    icon: MapPin,
    bgColor: "var(--forest)",
    accentColor: "var(--gold)",
    topics: ["Basics", "Calling", "Preparation", "First Steps"],
    articleCount: 5,
  },
  {
    slug: "cultural-engagement",
    title: "Cultural Engagement & Justice",
    description: "Navigating cultural issues, social justice, and prophetic witness in a divided world",
    icon: Zap,
    bgColor: "var(--ink)",
    accentColor: "var(--gold)",
    topics: ["Culture", "Justice", "Witness", "Engagement"],
    articleCount: 7,
  },
  {
    slug: "editors-picks",
    title: "Editor's Picks",
    description: "Our handpicked selection of the most transformative articles on the site",
    icon: BookOpen,
    bgColor: "var(--sage)",
    accentColor: "var(--gold)",
    topics: ["Best Of", "Featured", "Essential", "Must-Read"],
    articleCount: 12,
  },
];

export default function ReadingPaths() {
  const [, navigate] = useLocation();
  const { data: posts, isLoading } = trpc.posts.listPublished.useQuery();

  if (isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--paper)" }}>
        <Loader2 size={32} style={{ color: "var(--gold)", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  return (
    <>
      <SEOMeta
        title="Reading Paths"
        description="Curated collections of articles organized by theme. Explore reading paths on pastoral leadership, spiritual formation, church health, and more."
        keywords="reading paths, collections, curated articles, learning journeys, theology"
      />
      <div>
        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero__inner" style={{ gridTemplateColumns: "1fr" }}>
            <div>
              <div className="kicker">
                <div className="kicker-line"></div>
                <div className="kicker-txt">CURATED COLLECTIONS</div>
              </div>
              <h1 className="hero-h">
                Explore <strong>Reading Paths</strong>
              </h1>
              <p className="hero-sub">
                Curated collections of articles organized by theme. Choose your path and dive deep into topics that matter most to you.
              </p>
            </div>
          </div>
        </section>

        {/* READING PATHS GRID */}
        <section className="section">
          <div className="wrap">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "32px" }}>
              {READING_PATHS.map((path) => {
                const Icon = path.icon;
                return (
                  <div
                    key={path.slug}
                    onClick={() => navigate(`/reading-paths/${path.slug}`)}
                    style={{
                      cursor: "pointer",
                      transition: "transform 0.3s ease",
                      borderRadius: "2px",
                      overflow: "hidden",
                      background: path.bgColor,
                      padding: "32px",
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      boxShadow: "0 4px 12px rgba(26,51,40,0.08)"
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 12px 32px rgba(26,51,40,0.15)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(26,51,40,0.08)";
                    }}
                  >
                    {/* Icon & Badge */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "24px" }}>
                      <div
                        style={{
                          padding: "12px",
                          borderRadius: "4px",
                          background: "rgba(196,146,59,0.15)"
                        }}
                      >
                        <Icon size={24} style={{ color: "var(--gold)" }} />
                      </div>
                      <div
                        style={{
                          padding: "6px 12px",
                          borderRadius: "20px",
                          fontSize: "12px",
                          fontWeight: "600",
                          background: "rgba(196,146,59,0.15)",
                          color: "var(--gold)"
                        }}
                      >
                        {path.articleCount} articles
                      </div>
                    </div>

                    {/* Title & Description */}
                    <h3
                      style={{
                        fontSize: "20px",
                        fontWeight: "600",
                        marginBottom: "12px",
                        color: "white",
                        fontFamily: "var(--F)"
                      }}
                    >
                      {path.title}
                    </h3>
                    <p
                      style={{
                        marginBottom: "24px",
                        color: "rgba(255,255,255,0.8)",
                        lineHeight: "1.6",
                        flex: "1"
                      }}
                    >
                      {path.description}
                    </p>

                    {/* Topics */}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "24px" }}>
                      {path.topics.map((topic) => (
                        <span
                          key={topic}
                          style={{
                            padding: "6px 12px",
                            fontSize: "11px",
                            fontWeight: "600",
                            borderRadius: "2px",
                            background: "rgba(196,146,59,0.2)",
                            color: "var(--gold)",
                            border: "1px solid rgba(196,146,59,0.3)"
                          }}
                        >
                          {topic}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <button
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        borderRadius: "2px",
                        fontWeight: "600",
                        fontSize: "14px",
                        background: "var(--gold)",
                        color: "var(--ink)",
                        border: "none",
                        cursor: "pointer",
                        transition: "all 0.2s ease"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--goldlt)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "var(--gold)";
                      }}
                    >
                      Explore Path →
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="section" style={{ background: "var(--cream)", textAlign: "center" }}>
          <div className="wrap">
            <h2 className="section-title">Not sure where to start?</h2>
            <p className="section-sub">
              Each reading path is designed to take you on a journey through related articles. Start with any path that resonates with you.
            </p>
            <button
              onClick={() => navigate("/")}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "12px 28px",
                background: "var(--ink)",
                color: "white",
                fontWeight: "600",
                fontSize: "14px",
                border: "none",
                borderRadius: "2px",
                cursor: "pointer",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--ink2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "var(--ink)";
              }}
            >
              <ArrowLeft size={16} />
              Back to Home
            </button>
          </div>
        </section>
      </div>
    </>
  );
}

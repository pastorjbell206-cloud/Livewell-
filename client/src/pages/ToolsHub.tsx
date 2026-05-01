import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Link } from "wouter";
import { BookOpen, Heart, Users } from "lucide-react";

const TOOLS = [
  {
    title: "Bible Verse Finder",
    description: "Find Scripture for any season of life. Search by topic — anxiety, grief, hope, courage, marriage, and more — and get curated verses you can copy and share.",
    href: "/tools/verse-finder",
    icon: BookOpen,
    color: "#2C3E50",
  },
  {
    title: "Prayer Generator",
    description: "Guided prayers for every occasion. Choose a prayer type — morning, evening, strength, guidance, gratitude — and receive a theologically rich prayer you can personalize.",
    href: "/tools/prayer-generator",
    icon: Heart,
    color: "#2D4A3E",
  },
  {
    title: "Family Devotion Builder",
    description: "Build a 15-minute family devotion in seconds. Pick your kids' age group and a theme, and get a complete devotion with Scripture, teaching, activity, and prayer.",
    href: "/tools/family-devotions",
    icon: Users,
    color: "#B8963E",
  },
];

export default function ToolsHub() {
  return (
    <Layout>
      <SEOMeta
        title="Free Ministry Tools"
        description="Free tools for pastors, parents, and Christians. Bible verse finder, prayer generator, and family devotion builder — built for real ministry needs."
        keywords="Bible verse finder, prayer generator, family devotions, Christian tools, pastoral tools"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Free Ministry Tools",
          description: "Free tools for pastors, parents, and Christians.",
          url: "https://www.livewellbyjamesbell.co/tools",
        }}
      />

      {/* Hero */}
      <section style={{ background: "var(--forest)", color: "var(--ivory)", padding: "80px 32px 60px", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: "700px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", color: "var(--gold)", fontFamily: "var(--U)", marginBottom: "16px" }}>
            FREE TOOLS
          </div>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 300, fontFamily: "var(--F)", lineHeight: 1.15, marginBottom: "20px" }}>
            Tools for the <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Work</em> of Ministry
          </h1>
          <p style={{ fontSize: "18px", lineHeight: 1.7, opacity: 0.85, fontFamily: "var(--B)" }}>
            Built for pastors, parents, and anyone who takes faith seriously enough to practice it.
          </p>
        </div>
      </section>

      {/* Tools Grid */}
      <section style={{ padding: "60px 32px", background: "var(--paper)" }}>
        <div className="wrap" style={{ maxWidth: "1000px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
            {TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  style={{
                    display: "block",
                    padding: "40px 32px",
                    background: "white",
                    borderRadius: "8px",
                    borderLeft: `4px solid ${tool.color}`,
                    textDecoration: "none",
                    transition: "transform 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(0,0,0,0.08)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <Icon size={32} style={{ color: tool.color, marginBottom: "16px" }} />
                  <h2 style={{ fontSize: "22px", fontWeight: 600, fontFamily: "var(--F)", color: "var(--ink)", marginBottom: "12px" }}>
                    {tool.title}
                  </h2>
                  <p style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--ink3)", fontFamily: "var(--B)" }}>
                    {tool.description}
                  </p>
                  <div style={{ marginTop: "20px", fontSize: "13px", fontWeight: 600, color: tool.color, fontFamily: "var(--U)" }}>
                    Use Tool →
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "60px 32px", background: "var(--cream)", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: "600px" }}>
          <h2 style={{ fontSize: "28px", fontWeight: 600, fontFamily: "var(--F)", color: "var(--ink)", marginBottom: "12px" }}>
            More tools coming soon
          </h2>
          <p style={{ fontSize: "16px", color: "var(--ink3)", lineHeight: 1.7, fontFamily: "var(--B)" }}>
            Sermon outline builder, pastoral care tracker, and reading plan generator are in development. Subscribe to get notified when they launch.
          </p>
        </div>
      </section>
    </Layout>
  );
}

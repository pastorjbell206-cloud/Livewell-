import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Link } from "wouter";
import { BookOpen, Heart, Users, Search, HeartHandshake, DollarSign, Baby, Brain, Mic, BookMarked, MessageCircle, Shield, Target, Church } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

const TOOLS = [
  {
    title: "Bible Verse Finder",
    description: "Find Scripture for any season of life. Search by topic — anxiety, grief, hope, courage, marriage, and more — and get curated verses you can copy and share.",
    href: "/tools/verse-finder",
    icon: BookOpen,
    color: "var(--ink2)",
  },
  {
    title: "Prayer Generator",
    description: "Guided prayers for every occasion. Choose a prayer type — morning, evening, strength, guidance, gratitude — and receive a theologically rich prayer you can personalize.",
    href: "/tools/prayer-generator",
    icon: Heart,
    color: "var(--ink)",
  },
  {
    title: "Family Devotion Builder",
    description: "Build a 15-minute family devotion in seconds. Pick your kids' age group and a theme, and get a complete devotion with Scripture, teaching, activity, and prayer.",
    href: "/tools/family-devotions",
    icon: Users,
    color: "var(--gold)",
  },
  {
    title: "Bible Study Guide",
    description: "Study any book of the Bible with theological depth. Key themes, study questions, and reading strategies for 12 essential books.",
    href: "/tools/bible-study",
    icon: Search,
    color: "var(--ink)",
  },
  {
    title: "Marriage Health Assessment",
    description: "A 15-question diagnostic across communication, intimacy, trust, shared vision, and conflict. Not a quiz — a real assessment with actionable recommendations.",
    href: "/tools/marriage-assessment",
    icon: HeartHandshake,
    color: "var(--gold)",
  },
  {
    title: "Financial Health Check",
    description: "A biblical stewardship assessment across generosity, contentment, stewardship, and family provision. Scripture-grounded with practical next steps.",
    href: "/tools/financial-health",
    icon: DollarSign,
    color: "var(--ink2)",
  },
  {
    title: "Parenting Stage Guide",
    description: "Age-specific guidance from toddlers to young adults. What your child needs, how to talk about God, common mistakes, and one practice to start this week.",
    href: "/tools/parenting-guide",
    icon: Baby,
    color: "var(--ink)",
  },
  {
    title: "Emotional Health Assessment",
    description: "15 questions across self-awareness, boundaries, grief, forgiveness, and rest. Scripture-grounded diagnostic with practical next steps.",
    href: "/tools/emotional-health",
    icon: Brain,
    color: "var(--gold)",
  },
  {
    title: "Sermon Outline Generator",
    description: "Enter a topic and audience, get a structured 3-point sermon outline with Scripture, illustrations, and application questions.",
    href: "/tools/sermon-outline",
    icon: Mic,
    color: "var(--ink2)",
  },
  {
    title: "Scripture Memory System",
    description: "Memorize 40 key verses across 8 categories. First-letter mode, fill-in-the-blank, and full recall practice with progress tracking.",
    href: "/tools/scripture-memory",
    icon: BookMarked,
    color: "var(--ink)",
  },
  {
    title: "Conflict Resolution Guide",
    description: "A 5-step guided process for 8 common conflict types. Name what happened, name what you feel, agree on one next step.",
    href: "/tools/conflict-guide",
    icon: MessageCircle,
    color: "var(--gold)",
  },
  {
    title: "Pastor Burnout Diagnostic",
    description: "24 questions across calling, isolation, marriage impact, board relations, and more. Your burnout signature with a recovery roadmap.",
    href: "/tools/pastor-burnout",
    icon: Shield,
    color: "var(--ink2)",
  },
  {
    title: "Life Audit",
    description: "24 questions across 8 life areas: spiritual, marriage, parenting, physical, financial, emotional, vocational, community. Your strengths and growth areas identified.",
    href: "/tools/life-audit",
    icon: Target,
    color: "var(--gold)",
  },
  {
    title: "Church Health Check",
    description: "18 questions across worship, discipleship, outreach, leadership, stewardship, and congregational care. For pastors assessing their church.",
    href: "/tools/church-health",
    icon: Church,
    color: "var(--ink)",
  },
];

export default function ToolsHub() {
  const verses = useFavorites("livewell-saved-verses");
  const prayers = useFavorites("livewell-saved-prayers");
  const totalSaved = verses.favorites.length + prayers.favorites.length;

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

          {totalSaved > 0 && (
            <div style={{ textAlign: "center", marginTop: "32px" }}>
              <Link
                href="/tools/saved"
                style={{
                  fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)",
                  color: "var(--mustard)", textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                Saved Items ({totalSaved})
              </Link>
            </div>
          )}
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

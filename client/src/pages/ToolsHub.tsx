import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Link } from "wouter";
import { BookOpen, Heart, Users, Search, HeartHandshake, DollarSign, Baby, Brain, Mic, BookMarked, MessageCircle, Shield, Target, Church } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";

export const TOOLS = [
  {
    title: "Test the Case",
    description: "The case for the resurrection, worked one move at a time. At every step you can push back with the objection you actually hold and get the honest answer, including what it does not prove. Argued with, not preached at. No altar call.",
    href: "/tools/test-the-case",
    icon: Shield,
    color: "var(--mustard)",
  },
  {
    title: "Which Lens Has You?",
    description: "Thirteen honest choices. Five lenses that do a reader's thinking before the reader does — the flag, the cause, the highlighter, the rearview, the marketplace. It ends not in a score but in the pillar built to dismantle the lens it found.",
    href: "/tools/which-lens",
    icon: Search,
    color: "var(--mustard)",
  },
  {
    title: "Deep Bible Study Companion",
    description: "Seminary-level depth in kitchen-table language. 20 books of the Bible with 6 layers of analysis: text, historical context, literary structure, scholarly views, modern application, and deeper resources.",
    href: "/tools/deep-bible",
    icon: Search,
    color: "var(--ink)",
  },
  {
    title: "Theology Quiz",
    description: "Ten questions across doctrine, church history, and the biblical storyline. Find out where your foundations are solid and where the gaps are. Part of the Theological Depth section.",
    href: "/tools/theology-quiz",
    icon: Brain,
    color: "var(--goldlt)",
  },
    {
    title: "The Whole-Life Assessment",
    description: "Thirty honest statements across the inner life, the body, relationships, work and money, and the world. Maps where life is flourishing and hands you a rule of life for the season. Part of Integrated Life.",
    href: "/life/assessment",
    icon: Heart,
    color: "var(--goldlt)",
  },
    {
    title: "Wisdom for All of Life",
    description: "The front door to Scripture's wisdom for the place no rule reaches: the deep Proverbs and Ecclesiastes guide, a topical map for money, words, work, anger, marriage, and more, and a month in Proverbs. Part of Integrated Life.",
    href: "/wisdom",
    icon: BookMarked,
    color: "var(--goldlt)",
  },
  {
    title: "Wisdom Finder",
    description: "Type in what you are struggling with, and find what the Bible says about it: the verses, the cultural world they were written in, how the church has understood them across history, and the practical application to your life now. Part of Integrated Life.",
    href: "/tools/wisdom-finder",
    icon: Search,
    color: "var(--ink2)",
  },
  {
    title: "Rule of Life Builder",
    description: "A rule of life is not a performance contract. It is a trellis. Choose sustainable practices across prayer, Scripture, rest, community, mission, and the body, and build a rhythm of grace you can actually keep. Part of Integrated Life.",
    href: "/tools/rule-of-life",
    icon: Target,
    color: "var(--goldlt)",
  },
  {
    title: "What the Bible Says About",
    description: "A topical guide to Scripture for the arenas of ordinary life: money, the tongue, anger, anxiety, work, marriage, friendship, suffering, forgiveness, and more, with the heart of each passage worth knowing by heart. Part of Integrated Life.",
    href: "/tools/bible-on",
    icon: BookOpen,
    color: "var(--ink)",
  },
  {
    title: "Proverbs in 31 Days",
    description: "A chapter of Proverbs a day, matched to the date, the way the church has read it for centuries. Each day a theme, a verse or two worth knowing by heart, and a reflection that runs the chapter into a real decision. Part of Integrated Life.",
    href: "/tools/proverbs-31",
    icon: BookMarked,
    color: "var(--goldlt)",
  },
  {
    title: "Passage Context Tool",
    description: "Enter any Bible reference and read it in context: the passage with room around it, who wrote it and why, its genre, the flow of the argument, cross-references, and the questions to ask of any text. Part of the Theological Depth section.",
    href: "/theology/passage",
    icon: BookMarked,
    color: "var(--goldlt)",
  },
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
    description: "Build a fifteen-minute family devotion for tonight. Pick your kids' age group and a theme, and get a complete devotion with Scripture, teaching, activity, and prayer.",
    href: "/tools/family-devotions",
    icon: Users,
    color: "var(--goldlt)",
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
    description: "Not a quiz. Fifteen questions across communication, intimacy, trust, shared vision, and conflict — and what to do about what you find.",
    href: "/tools/marriage-assessment",
    icon: HeartHandshake,
    color: "var(--goldlt)",
  },
  {
    title: "Financial Health Check",
    description: "Twelve questions across generosity, contentment, stewardship, and family provision — and what your answers say about who you believe owns what you have.",
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
    title: "Parenting Bible Verses",
    description: "Scripture for the real moments of parenting — fear, anger, identity, obedience, screens, doubt — each with a short, honest note for the parent.",
    href: "/tools/parenting-verses",
    icon: Baby,
    color: "var(--ink)",
  },
  {
    title: "Emotional Health Assessment",
    description: "Fifteen questions across self-awareness, boundaries, grief, forgiveness, and rest — and where Scripture meets each one.",
    href: "/tools/emotional-health",
    icon: Brain,
    color: "var(--goldlt)",
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
    color: "var(--goldlt)",
  },
    {
    title: "Life Audit",
    description: "24 questions across 8 life areas: spiritual, marriage, parenting, physical, financial, emotional, vocational, community. It names what is strong and what is slipping.",
    href: "/tools/life-audit",
    icon: Target,
    color: "var(--goldlt)",
  },
    {
    title: "Misused Verses — What the Bible Actually Says",
    description: "The passages we quote most and read least: what each one says in context, how it gets misused, and the fuller teaching underneath. The deepest verse tool on the site.",
    href: "/tools/bible-says",
    icon: BookOpen,
    color: "var(--ink)",
  },
  {
    title: "Quote Library",
    description: "Four hundred lines and counting from the essays and books, filed by conviction, comfort, challenge, history, and wisdom — each tied to the piece it came from. Copy one, share one, follow one home.",
    href: "/tools/quotes",
    icon: MessageCircle,
    color: "var(--ink2)",
  },
  {
    title: "Theology Glossary",
    description: "The working vocabulary of serious faith — justification, atonement, sanctification and the rest — defined plainly, searchable, without the seminary fee.",
    href: "/tools/glossary",
    icon: BookMarked,
    color: "var(--ink)",
  },
  {
    title: "The Consistency Check",
    description: "A searching self-examination of whether you defend truth selectively — one standard for your own side, another for your opponents. A mirror, not a weapon, and explicitly not for scoring anyone else.",
    href: "/disruption/consistency",
    icon: Shield,
    color: "var(--ink)",
  },
  {
    title: "The Party Scorecard",
    description: "How close is each party to the Bible, theme by theme? An even-handed tally built to come out split. The real test is whether you can name where your own side falls short.",
    href: "/nation/scorecard",
    icon: Target,
    color: "var(--ink2)",
  },
  {
    title: "If We Had a Biblical Government",
    description: "The Year of Jubilee, gleaning, the warning against kings — what Scripture's own economic principles might look like as policy, and why both parties would hate the result.",
    href: "/nation/policy",
    icon: Church,
    color: "var(--ink)",
  },
];

/** Display groups for the hub, ordered by need. Every TOOLS href appears exactly once. */
export const TOOL_GROUPS = [
  { title: "Start with an honest reading", tools: TOOLS.filter((t) => ["/diagnostic","/tools/life-audit","/assessments","/tools/emotional-health","/life/assessment"].includes(t.href)) },
  { title: "Scripture and theology", tools: TOOLS.filter((t) => ["/tools/deep-bible","/tools/bible-study","/resources/context","/theology/passage","/tools/verse-finder","/tools/bible-says","/tools/bible-on","/tools/theology-quiz","/tools/glossary","/tools/test-the-case","/tools/which-lens","/tools/scripture-memory"].includes(t.href)) },
  { title: "Wisdom for a real situation", tools: TOOLS.filter((t) => ["/wisdom","/tools/wisdom-finder","/tools/proverbs-31","/tools/quotes","/tools/conflict-guide","/tools/prayer-generator"].includes(t.href)) },
  { title: "Family, marriage, and the household", tools: TOOLS.filter((t) => ["/tools/family-devotions","/tools/marriage-assessment","/tools/parenting-guide","/tools/parenting-verses","/tools/financial-health","/tools/rule-of-life"].includes(t.href)) },
  { title: "The church and the public square", tools: TOOLS.filter((t) => ["/disruption/consistency","/tools/party-scorecard","/nation/biblical-government","/nation/scorecard","/nation/policy"].includes(t.href)) },
];


export default function ToolsHub() {
  const verses = useFavorites("livewell-saved-verses");
  const prayers = useFavorites("livewell-saved-prayers");
  const totalSaved = verses.favorites.length + prayers.favorites.length;

  return (
    <Layout>
      <SEOMeta
        title="Free Christian Tools for Families"
        description="Free tools for families and anyone practicing the faith: Bible verse finder, prayer generator, and family devotion builder, built for the week you are actually living."
        keywords="Bible verse finder, prayer generator, family devotions, Christian tools, marriage tools, parenting tools"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Free Christian Tools for Families",
          description: "Free tools for families and anyone practicing the faith.",
          url: "https://www.livewellbyjamesbell.co/tools",
        }}
      />

      {/* Hero */}
      <section style={{ background: "var(--charcoal)", color: "var(--ivory)", padding: "80px 32px 60px", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: "700px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", color: "var(--gold)", fontFamily: "var(--U)", marginBottom: "16px" }}>
            FREE TOOLS
          </div>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 52px)", fontWeight: 300, fontFamily: "var(--F)", lineHeight: 1.15, marginBottom: "20px" }}>
            Tools for the Life You Are <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Actually</em> Living
          </h1>
          <p style={{ fontSize: "18px", lineHeight: 1.7, opacity: 0.85, fontFamily: "var(--B)" }}>
            Built for marriages, for households, for anyone who takes the faith seriously enough to practice it on a Tuesday.
          </p>
        </div>
      </section>

      {/* Tools, in the order a person actually needs them: an honest reading
          first, then the Word, then wisdom for the situation, then the
          household, then the public square. Grouping lives in TOOL_GROUPS. */}
      <section style={{ padding: "60px 32px", background: "var(--paper)" }}>
        <div className="wrap" style={{ maxWidth: "1000px" }}>
          {TOOL_GROUPS.map((group) => (
            <div key={group.title} style={{ marginBottom: "56px" }}>
              <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "6px" }}>{group.title}</div>
              <div style={{ width: "40px", height: "1px", background: "var(--mustard)", marginBottom: "22px" }} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "32px" }}>
              {group.tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  style={{
                    display: "block",
                    padding: "40px 32px",
                    background: "var(--card)",
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
          ))}
          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <Link
              href="/tools/saved"
              style={{
                fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)",
                color: "var(--mustard-text)", textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              {totalSaved > 0 ? `Saved Items (${totalSaved})` : "Saved Items — verses and prayers you keep live here"}
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
}

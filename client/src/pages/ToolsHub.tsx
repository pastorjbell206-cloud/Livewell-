import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Link } from "wouter";
import { BookOpen, Heart, Users, Search, HeartHandshake, DollarSign, Baby, Brain, BookMarked, MessageCircle, Shield, Target, Church, PenLine, CalendarDays } from "lucide-react";
import { useFavorites } from "@/hooks/useFavorites";
import { useMemo, useState } from "react";
import { useLibrary } from "@/lib/library";
import { hasWordStarts, queryWords } from "@/lib/siteSearch";

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
    title: "Where Are You With God? A Self-Check",
    description: "Eight honest questions across four areas: where you are with God right now, without the church answer. Ends with a reading of your season and where to start.",
    href: "/diagnostic",
    icon: Search,
    color: "var(--ink)",
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
    description: "A rule of life is not a performance contract. It is a trellis. Choose sustainable practices across prayer, Scripture, rest, community, mission, and the body, and settle on a pattern you can actually keep on an ordinary week. Part of Integrated Life.",
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
    title: "Reading Scripture in Context",
    description: "Background guides to the Ancient Near Eastern, Second Temple Jewish, and Greco-Roman worlds of the Bible, and how to read Scripture apart from American politics.",
    href: "/resources/context",
    icon: BookOpen,
    color: "var(--ink)",
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
    description: "Search Scripture by what you are carrying: anxiety, grief, courage, marriage, and more. Each search returns the passages themselves, with the reference, so you can read them in context, copy them, and keep the ones you need.",
    href: "/tools/verse-finder",
    icon: BookOpen,
    color: "var(--ink2)",
  },
  {
    title: "The Worry Journal",
    description: "Five minutes before bed: name the worry, write the one thing that is yours to do tomorrow, hand the rest to God, and later see how your worries turned out. Private to your browser, with a printable version.",
    href: "/tools/worry-journal",
    icon: PenLine,
    color: "var(--goldlt)",
  },
  {
    title: "The Parent and Teen Conversation",
    description: "A parent and a teenager each answer twelve short statements about home on their own, swap codes, and see where they see things differently, with questions to ask each other there. Nothing is stored or sent.",
    href: "/tools/parent-teen-conversation",
    icon: MessageCircle,
    color: "var(--goldlt)",
  },
  {
    title: "The Prayer Planner",
    description: "Write down the people and needs you mean to pray for, give each a day, and each day see that day's names. Mark answered prayers and keep a dated record of them. Private to your browser.",
    href: "/tools/prayer-planner",
    icon: CalendarDays,
    color: "var(--ink)",
  },
  {
    title: "The Connection Planner",
    description: "For when you feel alone: name up to five people, choose one small step toward each this week, keep one place where the same faces gather, and check off what happened. Private to your browser.",
    href: "/tools/connection-planner",
    icon: HeartHandshake,
    color: "var(--goldlt)",
  },
  {
    title: "Prayer Generator",
    description: "Words for when you do not have your own. Choose the hour or the need, morning, evening, strength, guidance, gratitude, and get a written prayer to pray as it is, or copy and make your own.",
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
    title: "Marriage Health Self-Check",
    description: "Not a quiz. Fifteen questions across communication, intimacy, trust, shared vision, and conflict, and what to do about what you find.",
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
    title: "Emotional Health Self-Check",
    description: "Fifteen questions across self-awareness, boundaries, grief, forgiveness, and rest, and where Scripture meets each one.",
    href: "/tools/emotional-health",
    icon: Brain,
    color: "var(--goldlt)",
  },
  {
    title: "Spiritual Gifts Self-Check",
    description: "Thirty-two statements about what you've actually done, across eight gifts Scripture names, from teaching and mercy to hospitality and sharing the faith. It ranks no gift above another, and it sets out both views on the miraculous gifts without taking a side.",
    href: "/tools/spiritual-gifts",
    icon: Users,
    color: "var(--ink)",
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
    description: "How close is each party to the Bible, theme by theme? An honest tally that lands where the evidence puts it, not where either side would like. The real test is whether you can name where your own side falls short.",
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
  { title: "Start with an honest reading", tools: TOOLS.filter((t) => ["/diagnostic","/tools/life-audit","/tools/emotional-health","/tools/spiritual-gifts","/life/assessment"].includes(t.href)) },
  { title: "Scripture and theology", tools: TOOLS.filter((t) => ["/tools/deep-bible","/tools/bible-study","/resources/context","/theology/passage","/tools/verse-finder","/tools/bible-says","/tools/bible-on","/tools/theology-quiz","/tools/glossary","/tools/test-the-case","/tools/which-lens","/tools/scripture-memory"].includes(t.href)) },
  { title: "Wisdom for a real situation", tools: TOOLS.filter((t) => ["/wisdom","/tools/wisdom-finder","/tools/proverbs-31","/tools/quotes","/tools/conflict-guide","/tools/worry-journal","/tools/prayer-planner","/tools/connection-planner","/tools/prayer-generator"].includes(t.href)) },
  { title: "Family, marriage, and the household", tools: TOOLS.filter((t) => ["/tools/family-devotions","/tools/marriage-assessment","/tools/parenting-guide","/tools/parent-teen-conversation","/tools/parenting-verses","/tools/financial-health","/tools/rule-of-life"].includes(t.href)) },
  { title: "The church and the public square", tools: TOOLS.filter((t) => ["/disruption/consistency","/nation/scorecard","/nation/policy"].includes(t.href)) },
];


const slug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

/** A tool matches when every word of the query is in its name or description. */
function toolMatches(tool: (typeof TOOLS)[number], q: string): boolean {
  const words = queryWords(q);
  return words.length > 0 && hasWordStarts(`${tool.title} ${tool.description}`, words);
}

function ToolCard({ tool }: { tool: (typeof TOOLS)[number] }) {
  const Icon = tool.icon;
  return (
    <Link
      href={tool.href}
      className="tool-card"
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "clamp(18px, 3vw, 28px)",
        background: "var(--card)",
        borderRadius: "var(--radius-sm)",
        border: "1px solid var(--border)",
        borderLeft: `4px solid ${tool.color}`,
        textDecoration: "none",
        minHeight: "100%",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
        <Icon size={24} aria-hidden style={{ color: tool.color, flexShrink: 0 }} />
        <h3 style={{ fontSize: "21px", fontWeight: 500, fontFamily: "var(--F)", color: "var(--ink)", lineHeight: 1.2, margin: 0 }}>{tool.title}</h3>
      </div>
      <p className="tool-card-dek" style={{ fontSize: "15px", lineHeight: 1.6, color: "var(--ink-muted)", fontFamily: "var(--B)", margin: 0 }}>
        {tool.description}
      </p>
      <div style={{ marginTop: "auto", paddingTop: "14px", fontSize: "14px", fontWeight: 600, color: "var(--mustard-text)", fontFamily: "var(--U)" }}>
        Open the tool <span aria-hidden>→</span>
      </div>
    </Link>
  );
}

export default function ToolsHub() {
  const verses = useFavorites("livewell-saved-verses");
  const prayers = useFavorites("livewell-saved-prayers");
  const totalSaved = verses.favorites.length + prayers.favorites.length;
  const saved = useLibrary();
  const [query, setQuery] = useState("");
  const found = useMemo(() => (query.trim() ? TOOLS.filter((t) => toolMatches(t, query)) : []), [query]);
  const searching = query.trim().length > 0;

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
      <style>{`
        .tool-card:hover, .tool-card:focus-visible { border-color: var(--mustard); }
        @media (max-width: 640px) {
          .tool-card-dek { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        }
      `}</style>

      {/* Hero */}
      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-6) var(--s-4) var(--s-5)", textAlign: "center" }}>
        <div className="wrap" style={{ maxWidth: "700px" }}>
          <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", color: "var(--mustard)", fontFamily: "var(--U)", marginBottom: "16px" }}>
            FREE TOOLS
          </div>
          <h1 style={{ fontSize: "clamp(34px, 5vw, 52px)", fontWeight: 300, fontFamily: "var(--F)", lineHeight: 1.15, marginBottom: "16px" }}>
            Tools for the Life You Are <em style={{ fontStyle: "italic", color: "var(--mustard)" }}>Actually</em> Living
          </h1>
          <p style={{ fontSize: "17px", lineHeight: 1.7, color: "var(--charcoal-fg-muted)", fontFamily: "var(--B)", margin: "0 0 var(--s-4)" }}>
            Built for marriages, for households, for anyone who takes the faith seriously enough to practice it on a Tuesday. Every one is free and works on your phone, and the journals and planners keep what you write on your own device.
          </p>
          <label htmlFor="tool-find" style={{ display: "block", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--charcoal-fg)", marginBottom: "8px", textAlign: "left" }}>
            Find a tool
          </label>
          <input
            id="tool-find"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: prayer, worry, marriage"
            autoComplete="off"
            style={{ width: "100%", minHeight: "52px", padding: "12px 16px", fontSize: "17px", fontFamily: "var(--B)", borderRadius: "var(--radius-sm)", border: "1px solid var(--charcoal-line)", background: "var(--charcoal-fg)", color: "var(--charcoal)" }}
          />
        </div>
      </section>

      <section style={{ padding: "var(--s-5) var(--s-4) var(--s-6)", background: "var(--bone)" }}>
        <div className="wrap" style={{ maxWidth: "1000px" }}>
          <Link href="/my-library" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", minHeight: "52px", padding: "12px 16px", marginBottom: "var(--s-5)", border: "1px solid var(--border)", borderLeft: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", background: "var(--card)", color: "var(--ink)", textDecoration: "none", fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600 }}>
            <span>My Library{saved.length ? ` (${saved.length} saved)` : ""}: what you've saved and started, on this device</span>
            <span aria-hidden style={{ color: "var(--mustard-text)" }}>→</span>
          </Link>

          {/* Always on the page, so a screen reader hears each new count. */}
          <p role="status" style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", margin: searching ? "0 0 var(--s-3)" : 0 }}>
            {searching ? (found.length ? `${found.length} ${found.length === 1 ? "tool matches" : "tools match"} "${query.trim()}"` : `No tool matches "${query.trim()}".`) : ""}
          </p>
          {searching ? (
            <div>
              {found.length ? (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "16px" }}>
                  {found.map((tool) => <ToolCard key={tool.href} tool={tool} />)}
                </div>
              ) : (
                <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)" }}>
                  Try another word, <Link href={`/search?q=${encodeURIComponent(query.trim())}`} style={{ color: "var(--mustard-text)", fontWeight: 600 }}>search the whole site</Link>, or start at <Link href="/help" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>Find Help</Link> with what you're facing.
                </p>
              )}
            </div>
          ) : (
            <>
              {/* Jump to a group: on a phone the list is long, so the groups are one tap away. */}
              <nav aria-label="Tool groups" style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "var(--s-5)" }}>
                {TOOL_GROUPS.map((g) => (
                  <a key={g.title} href={`#${slug(g.title)}`} style={{ display: "inline-flex", alignItems: "center", minHeight: "44px", padding: "8px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-pill)", background: "var(--card)", color: "var(--ink)", textDecoration: "none", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600 }}>
                    {g.title} <span style={{ color: "var(--ink-muted)", fontWeight: 500, marginLeft: "6px" }}>{g.tools.length}</span>
                  </a>
                ))}
              </nav>
              {/* Tools, in the order a person actually needs them: an honest reading
                  first, then the Word, then wisdom for the situation, then the
                  household, then the public square. Grouping lives in TOOL_GROUPS. */}
              {TOOL_GROUPS.map((group) => (
                <div key={group.title} id={slug(group.title)} style={{ marginBottom: "var(--s-6)", scrollMarginTop: "80px" }}>
                  <h2 className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "6px" }}>{group.title}</h2>
                  <div style={{ width: "40px", height: "1px", background: "var(--mustard)", marginBottom: "18px" }} />
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "16px" }}>
                    {group.tools.map((tool) => <ToolCard key={tool.href} tool={tool} />)}
                  </div>
                </div>
              ))}
            </>
          )}

          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px 24px", justifyContent: "center", marginTop: "var(--s-4)" }}>
            <Link href="/my-library" style={{ fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", color: "var(--mustard-text)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
              My Library
            </Link>
            <Link href="/tools/saved" style={{ fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", color: "var(--mustard-text)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
              {totalSaved > 0 ? `Saved verses and prayers (${totalSaved})` : "Saved verses and prayers"}
            </Link>
          </div>
        </div>
      </section>

    </Layout>
  );
}

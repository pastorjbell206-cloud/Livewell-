/**
 * /study — the one door to studying the Bible.
 *
 * The Bible tools used to be nine separate doors with nine separate front
 * steps (docs/WORLD-CLASS-SITE-PROMPT.md, "The student who wants to study the
 * Bible"). This page arranges them by what the reader is actually holding
 * when they arrive — a passage, a topic, a question, a book of the Bible, a
 * word they do not know — and then opens onto the history and the theology
 * the study stands on. The tool entries themselves come from the registry in
 * ToolsHub so the two never drift; a tool listed here but not there is a bug.
 */
import { Link } from "wouter";
import { BookOpen, Compass, HelpCircle, Library, Search, Scroll, Landmark, Brain } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { TOOLS } from "@/pages/ToolsHub";

type Door = {
  holding: string;
  lead: string;
  icon: typeof BookOpen;
  hrefs: string[];
};

/**
 * Doors that are real pages but not registered in the tools hub. Passage
 * Context lives under /theology, and Wisdom is a library hub, not a tool.
 */
const OFF_REGISTRY: Record<string, { title: string; description: string }> = {
  "/theology/passage": {
    title: "A Passage in Context",
    description: "Enter any reference and see it in its setting: who wrote it and why, its genre, the flow of the argument around it, the cross-references, and the questions to ask of it.",
  },
  "/wisdom": {
    title: "Wisdom for All of Life",
    description: "Proverbs, Ecclesiastes, and the skill of living where no single command reaches.",
  },
};

/** Arranged by what the reader is holding, in the order a person tends to arrive. */
const DOORS: Door[] = [
  {
    holding: "A passage",
    lead: "You have a chapter open and want to understand it, not just read it.",
    icon: BookOpen,
    hrefs: ["/tools/deep-bible", "/theology/passage"],
  },
  {
    holding: "A topic",
    lead: "Money, anger, anxiety, marriage, work: what Scripture actually says, in context, not a verse on a mug.",
    icon: Compass,
    hrefs: ["/tools/bible-on", "/tools/verse-finder", "/tools/bible-says"],
  },
  {
    holding: "A question you are carrying",
    lead: "Type the thing you are struggling with and find the Bible's wisdom for it, and the world it was written in.",
    icon: HelpCircle,
    hrefs: ["/tools/wisdom-finder", "/wisdom"],
  },
  {
    holding: "A book of the Bible",
    lead: "Twelve essential books studied whole: key themes, reading strategies, the questions worth asking.",
    icon: Library,
    hrefs: ["/tools/bible-study", "/tools/proverbs-31"],
  },
  {
    holding: "A word you do not know",
    lead: "A hundred theological terms explained at three depths, from one line to the history behind it.",
    icon: Search,
    hrefs: ["/tools/glossary"],
  },
  {
    holding: "A verse you want to keep",
    lead: "Forty verses, memorized the way memory actually works.",
    icon: Scroll,
    hrefs: ["/tools/scripture-memory"],
  },
];

const STANDS_ON = [
  {
    title: "Church history",
    text: "You did not start the faith. You were handed it. The councils, the figures, the heresies, and the whole arc from Pentecost to today, hung on one timeline.",
    href: "/theology/history",
    icon: Landmark,
  },
  {
    title: "Theology",
    text: "The doctrines, the traditions, the creeds, and how to read Scripture without making it say what you already believe.",
    href: "/theology",
    icon: Brain,
  },
];

export default function Study() {
  const byHref = new Map(TOOLS.map((t) => [t.href, t] as const));

  return (
    <Layout>
      <SEOMeta
        title="Study the Bible — LiveWell by James Bell"
        description="One door to studying the Bible: study any passage in depth, find what Scripture says about a topic, bring the question you are carrying, work through a whole book, learn the words, and stand on the church's history."
        url="https://www.livewellbyjamesbell.co/study"
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-3) var(--s-5)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "1.5rem" }}>Study the Bible</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(2.2rem, 4.8vw, 3.2rem)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", color: "var(--bone)", marginBottom: "1.2rem" }}>
            Start with what you are holding
          </h1>
          <p style={{ color: "var(--bone)", opacity: 0.8, fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "62ch" }}>
            Nobody arrives at the Bible in general. You arrive with a chapter open, or a question you cannot put down, or a word from a sermon you did not understand. Begin there. Each door below opens onto real depth, and none of them assumes you have done this before.
          </p>
        </div>
      </section>

      {/* THE STUDY BIBLE — the whole text, with the Hebrew and Greek beneath it */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-3) 0" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <Link href="/study/bible" style={{ display: "block", padding: "32px", background: "var(--card)", border: "1px solid var(--border)", borderLeft: "4px solid var(--mustard)", borderRadius: "var(--radius-sm)", textDecoration: "none", backgroundImage: "none" }}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>New · The Study Bible</div>
            <div style={{ fontFamily: "var(--F)", fontSize: "clamp(1.6rem, 3vw, 2.2rem)", fontWeight: 400, color: "var(--ink)", marginBottom: "10px", lineHeight: 1.15 }}>Learn the whole Bible, one story from Genesis to Revelation</div>
            <p style={{ fontFamily: "var(--B)", fontSize: "1rem", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "64ch", margin: "0 0 14px" }}>
              Follow the Bible's one story in eleven acts, read an introduction to every book, and open study notes on every chapter: its history, its culture, how it is built, what it teaches, and how it points to Christ. Beneath every English word are the Hebrew and Greek it translates.
            </p>
            <div style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--ink)", borderBottom: "1px solid var(--mustard)", width: "fit-content", paddingBottom: "2px" }}>Open the Study Bible</div>
          </Link>
        </div>
      </section>

      {/* THE DOORS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-3)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto", display: "flex", flexDirection: "column", gap: "var(--s-5)" }}>
          {DOORS.map((door) => {
            const Icon = door.icon;
            const tools = door.hrefs.map((h) => byHref.get(h)).filter(Boolean) as (typeof TOOLS)[number][];
            const extra = door.hrefs.filter((h) => !byHref.has(h));
            return (
              <div key={door.holding}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
                  <Icon size={20} aria-hidden style={{ color: "var(--mustard-text)" }} />
                  <div className="eyebrow" style={{ color: "var(--mustard-text)" }}>You are holding</div>
                </div>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(1.6rem, 3vw, 2.1rem)", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--ink)", marginBottom: "0.4rem" }}>{door.holding}</h2>
                <p style={{ fontFamily: "var(--B)", fontSize: "1rem", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "62ch", marginBottom: "var(--s-3)" }}>{door.lead}</p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "20px" }}>
                  {tools.map((tool) => {
                    const TIcon = tool.icon;
                    return (
                      <Link key={tool.href} href={tool.href} style={{ display: "block", padding: "28px 28px", background: "var(--card)", borderRadius: "var(--radius-sm)", borderLeft: "3px solid var(--mustard)", textDecoration: "none" }}>
                        <TIcon size={26} aria-hidden style={{ color: "var(--ink)", marginBottom: "12px" }} />
                        <div style={{ fontFamily: "var(--F)", fontSize: "1.3rem", fontWeight: 500, color: "var(--ink)", marginBottom: "8px" }}>{tool.title}</div>
                        <p style={{ fontFamily: "var(--B)", fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink-muted)", margin: 0 }}>{tool.description}</p>
                        <div style={{ marginTop: "16px", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--ink)", borderBottom: "1px solid var(--mustard)", width: "fit-content", paddingBottom: "2px" }}>Open</div>
                      </Link>
                    );
                  })}
                  {extra.map((h) => {
                    const entry = OFF_REGISTRY[h];
                    if (!entry) return null;
                    return (
                      <Link key={h} href={h} style={{ display: "block", padding: "28px 28px", background: "var(--card)", borderRadius: "var(--radius-sm)", borderLeft: "3px solid var(--mustard)", textDecoration: "none" }}>
                        <div style={{ fontFamily: "var(--F)", fontSize: "1.3rem", fontWeight: 500, color: "var(--ink)", marginBottom: "8px" }}>{entry.title}</div>
                        <p style={{ fontFamily: "var(--B)", fontSize: "0.95rem", lineHeight: 1.65, color: "var(--ink-muted)", margin: 0 }}>{entry.description}</p>
                        <div style={{ marginTop: "16px", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--ink)", borderBottom: "1px solid var(--mustard)", width: "fit-content", paddingBottom: "2px" }}>Open</div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* WHAT THE STUDY STANDS ON */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-3)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "1rem" }}>What the study stands on</div>
          <p style={{ color: "var(--bone)", opacity: 0.75, fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "62ch", marginBottom: "2rem" }}>
            Every passage you study was read by twenty centuries of Christians before you, argued over in councils, and carried through the church's worst hours. Knowing that story is part of reading well.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "20px" }}>
            {STANDS_ON.map((s) => {
              const SIcon = s.icon;
              return (
                <Link key={s.href} href={s.href} style={{ display: "block", padding: "28px", border: "1px solid rgba(245,240,230,0.14)", borderRadius: "var(--radius-sm)", textDecoration: "none" }}>
                  <SIcon size={26} aria-hidden style={{ color: "var(--mustard)", marginBottom: "12px" }} />
                  <div style={{ fontFamily: "var(--F)", fontSize: "1.35rem", fontWeight: 400, color: "var(--bone)", marginBottom: "8px" }}>{s.title}</div>
                  <p style={{ fontFamily: "var(--B)", fontSize: "0.95rem", lineHeight: 1.65, color: "var(--bone)", opacity: 0.75, margin: 0 }}>{s.text}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

/**
 * Assessments (/assessments) — one front door for every instrument on the
 * site. The tools existed but were scattered across five sections with five
 * entrances; a person who wants an honest measure of where they are should
 * not need a map to find the mirror. Grouped by the question a person is
 * actually asking, each with plain "take this one if" guidance. Routing only —
 * every instrument keeps its own page and logic.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Link } from "wouter";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface Instrument {
  title: string;
  takeIf: string;
  gives: string;
  href: string;
}

interface Group {
  eyebrow: string;
  heading: string;
  blurb: string;
  items: Instrument[];
}

const GROUPS: Group[] = [
  {
    eyebrow: "Start here",
    heading: "Where are you, actually?",
    blurb:
      "Not where you say you are on Sunday. Where you are. These two take an honest reading of the whole picture — one quick, one thorough.",
    items: [
      {
        title: "The Diagnostic",
        takeIf: "you want the honest check-in — where are you with God right now, without the church answer.",
        gives: "A straight reading of your season, and where to go from it.",
        href: "/diagnostic",
      },
      {
        title: "The Whole-Life Assessment",
        takeIf: "you are willing to look at all of it — the inner life, the body, the home, work and money, the world.",
        gives: "A map of where your life is flourishing and where it has gone quiet, plus a rule of life for this season.",
        href: "/life/assessment",
      },
      {
        title: "Start Here",
        takeIf: "you are new to the site and want it to hand you a starting place.",
        gives: "Two minutes of honest questions, then a track that fits where you actually are.",
        href: "/start",
      },
    ],
  },
  {
    eyebrow: "For what you are carrying",
    heading: "The weight you brought with you.",
    blurb:
      "Instruments for the specific thing that is heavy right now. Each one is a mirror, not a verdict — what it shows you, the writing here is built to meet.",
    items: [
      {
        title: "The Marriage Assessment",
        takeIf: "the marriage is drifting, tense, or quiet, and you want an honest read instead of tips.",
        gives: "Where the covenant actually stands, and what to read next.",
        href: "/tools/marriage-assessment",
      },
      {
        title: "The Pastor Burnout Diagnostic",
        takeIf: "you lead a church and you are tired in a way a day off does not fix.",
        gives: "An honest measure of the cost you are carrying, and whether it is sustainable.",
        href: "/tools/pastor-burnout",
      },
      {
        title: "The Life Audit",
        takeIf: "the life you are living and the life you say you want have quietly diverged.",
        gives: "A structured look at the gap, without shame.",
        href: "/tools/life-audit",
      },
    ],
  },
  {
    eyebrow: "For what you believe",
    heading: "The convictions under the surface.",
    blurb:
      "What you actually believe — and whether you hold it evenly — is measurable. These three are the mirror for the mind.",
    items: [
      {
        title: "The Theology Quiz",
        takeIf: "you want to know where you land on the theological map, and why it matters.",
        gives: "Your place among the traditions, held irenically.",
        href: "/tools/theology-quiz",
      },
      {
        title: "The Consistency Check",
        takeIf: "you suspect you defend truth selectively — one standard for your side, another for theirs.",
        gives: "A mirror, not a scorecard.",
        href: "/disruption/consistency",
      },
      {
        title: "The Formation Inventory",
        takeIf: "you lead, and you want character measured before competence.",
        gives: "A leader's honest reading of the inner life that holds the work up.",
        href: "/leadership/inventory",
      },
    ],
  },
];

// ItemList so the assessments hub is indexed as one collection of instruments,
// each pointing at its own page.
const assessmentsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Assessments",
  description:
    "Honest instruments for spiritual, whole-life, marriage, burnout, theology, and consistency self-examination.",
  url: "https://www.livewellbyjamesbell.co/assessments",
  itemListElement: GROUPS.flatMap((g) => g.items).map((item, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: item.title,
    url: `https://www.livewellbyjamesbell.co${item.href}`,
  })),
};

export default function Assessments() {
  return (
    <Layout>
      <SEOMeta
        title="Assessments — Where Are You, Actually?"
        description="Nine honest instruments in one place: the spiritual check-in, the whole-life map, marriage, burnout, theology, and consistency. A mirror, not a verdict — and the writing to meet what it shows you."
        url="https://www.livewellbyjamesbell.co/assessments"
        structuredData={assessmentsSchema}
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", color: "var(--bone)", padding: "var(--s-7) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>Assessments</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "20px", maxWidth: "20ch" }}>
            An honest measure, before anything else.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.75)", maxWidth: "60ch" }}>
            Every instrument on the site, in one place, sorted by the question you
            are actually asking. None of them grades you. Each one is a mirror —
            and whatever it shows, the writing here was built to meet it.
          </p>
        </div>
      </section>

      {/* GROUPS */}
      {GROUPS.map((g, gi) => (
        <section key={g.eyebrow} style={{ background: gi % 2 ? "var(--bone-warm)" : "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
          <div style={wrap}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "12px" }}>{g.eyebrow}</div>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.6vw, 38px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.12, color: "var(--ink)", marginBottom: "10px", maxWidth: "26ch" }}>
              {g.heading}
            </h2>
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "62ch", marginBottom: "var(--s-4)" }}>
              {g.blurb}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "16px" }}>
              {g.items.map(it => (
                <Link
                  key={it.href}
                  href={it.href}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    background: "var(--card)",
                    border: "1px solid var(--line)",
                    borderTop: "2px solid var(--mustard)",
                    borderRadius: "var(--radius-sm)",
                    padding: "var(--s-4)",
                    textDecoration: "none",
                  }}
                >
                  <div style={{ fontFamily: "var(--F)", fontSize: "21px", fontWeight: 500, lineHeight: 1.2, color: "var(--ink)", marginBottom: "10px" }}>
                    {it.title}
                  </div>
                  <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink)", margin: "0 0 8px" }}>
                    <span style={{ color: "var(--ink-muted)" }}>Take this if </span>
                    {it.takeIf}
                  </p>
                  <p style={{ fontFamily: "var(--B)", fontSize: "13px", lineHeight: 1.6, color: "var(--ink-muted)", margin: "0 0 14px", flex: 1 }}>
                    {it.gives}
                  </p>
                  <span style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ink)", borderBottom: "1px solid var(--mustard)", alignSelf: "flex-start", paddingBottom: "2px" }}>
                    Begin →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* CLOSING */}
      <section style={{ background: "var(--charcoal)", color: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 2.8vw, 28px)", fontStyle: "italic", lineHeight: 1.4, color: "rgba(245,240,230,0.92)", marginBottom: "18px" }}>
            The mirror is not the point. What you do the day after you look is.
          </p>
          <div style={{ display: "flex", gap: "24px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/answers" style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>
              The hard questions, answered →
            </Link>
            <Link href="/writing" style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>
              The writing →
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

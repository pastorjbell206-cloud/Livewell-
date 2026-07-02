/**
 * Rule of Life Builder (/tools/rule-of-life) — choose a sustainable set of
 * practices across prayer, Scripture, rest, community, mission, and the body,
 * and build a personal rule of life you can copy and keep. A rule of life is
 * not a performance contract; it is a trellis, a few rhythms you return to so
 * that grace can reach you. All content is static. Pairs with
 * /life/discipleship-following-jesus and /life/rest-and-the-sabbath.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useState } from "react";
import { Link } from "wouter";
import { Copy, Check, RotateCcw, Sunrise, BookOpen, Moon, Users, HandHeart, HeartPulse } from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const eyebrow = { fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--mustard)" } as const;

interface Practice {
  id: string;
  label: string;
}
interface Category {
  id: string;
  title: string;
  icon: typeof Sunrise;
  intro: string;
  practices: Practice[];
}

const CATEGORIES: Category[] = [
  {
    id: "prayer",
    title: "Prayer",
    icon: Sunrise,
    intro: "How you will keep company with God through the day.",
    practices: [
      { id: "p-morning", label: "A fixed time of prayer each morning" },
      { id: "p-lords", label: "Pray the Lord's Prayer daily" },
      { id: "p-examen", label: "A short evening examen, naming the day before God" },
      { id: "p-fixed", label: "Pause to pray at set hours (midday, evening)" },
      { id: "p-list", label: "Pray for a few people by name each week" },
    ],
  },
  {
    id: "scripture",
    title: "Scripture",
    icon: BookOpen,
    intro: "How the Word will get into you.",
    practices: [
      { id: "s-daily", label: "Read Scripture a little each day" },
      { id: "s-plan", label: "Follow a reading plan through a book or the Gospels" },
      { id: "s-proverbs", label: "A chapter of Proverbs a day, matched to the date" },
      { id: "s-memorize", label: "Memorize one passage a month" },
      { id: "s-slow", label: "Read one short passage slowly and prayerfully" },
    ],
  },
  {
    id: "rest",
    title: "Worship and Rest",
    icon: Moon,
    intro: "The rhythms that remind you that you are a creature, not the keeper of the world.",
    practices: [
      { id: "r-worship", label: "Weekly worship with a gathered church" },
      { id: "r-sabbath", label: "A weekly day of rest you actually keep" },
      { id: "r-table", label: "The Lord's Supper as often as your church offers it" },
      { id: "r-calendar", label: "Keep the church seasons (Advent, Lent, Easter)" },
      { id: "r-quiet", label: "Regular silence and solitude away from screens" },
    ],
  },
  {
    id: "community",
    title: "Community",
    icon: Users,
    intro: "You cannot follow Jesus alone. Who will walk with you.",
    practices: [
      { id: "c-member", label: "Committed membership in a local church" },
      { id: "c-table", label: "A regular discipleship table or small group" },
      { id: "c-friend", label: "One spiritual friend who knows the truth about you" },
      { id: "c-confess", label: "Regular confession to a trusted brother or sister" },
    ],
  },
  {
    id: "mission",
    title: "Generosity and Mission",
    icon: HandHeart,
    intro: "The life that turns outward.",
    practices: [
      { id: "m-give", label: "Give a set portion, first, before other spending" },
      { id: "m-hospitality", label: "Open your home in hospitality on a rhythm" },
      { id: "m-disciple", label: "Walk with one person toward Jesus" },
      { id: "m-serve", label: "A regular, hidden act of service to the poor or the lonely" },
    ],
  },
  {
    id: "body",
    title: "The Body",
    icon: HeartPulse,
    intro: "You are not a soul that happens to have a body. Honor the limits God gave.",
    practices: [
      { id: "b-sleep", label: "A regular bedtime that honors your need for sleep" },
      { id: "b-move", label: "Move your body most days, walking or otherwise" },
      { id: "b-fast", label: "Fast on a rhythm that fits your life" },
      { id: "b-screens", label: "A guardrail on screens (none in bed, a daily off-time)" },
    ],
  },
];

export default function RuleOfLife() {
  const [chosen, setChosen] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  function toggle(id: string) {
    setChosen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
    setCopied(false);
    setCopyFailed(false);
  }

  function reset() {
    setChosen(new Set());
    setCopied(false);
    setCopyFailed(false);
  }

  const selectedByCategory = CATEGORIES
    .map((c) => ({ c, items: c.practices.filter((p) => chosen.has(p.id)) }))
    .filter((g) => g.items.length > 0);

  function ruleText(): string {
    const lines: string[] = ["MY RULE OF LIFE", "", "A few rhythms I will return to, so that grace can reach me. Not a scorecard. A trellis.", ""];
    for (const g of selectedByCategory) {
      lines.push(g.c.title.toUpperCase());
      g.items.forEach((p) => lines.push(`- ${p.label}`));
      lines.push("");
    }
    lines.push("Begin small. Keep what you can actually sustain, and let it grow.");
    return lines.join("\n");
  }

  async function copyRule() {
    const ok = await copyToClipboard(ruleText());
    if (!ok) {
      setCopyFailed(true);
      return;
    }
    setCopyFailed(false);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Layout>
      <SEOMeta
        title="Rule of Life Builder — Build a Sustainable Rhythm of Grace"
        description="A rule of life is a trellis, a few rhythms you return to so grace can reach you. Choose practices across prayer, rest, and more, and build one to keep."
        url="https://www.livewellbyjamesbell.co/tools/rule-of-life"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>A tool · Integrated Life</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 5vw, 50px)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "16ch" }}>
            Build a rule of life
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "62ch" }}>
            You are formed by what you repeatedly do. A rule of life is not a list of demands to fail at. It is a trellis, a few chosen rhythms you keep returning to, so that the life of God can grow up them. Choose what you can actually sustain. Begin small.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={{ ...wrap, maxWidth: "820px" }}>
          {CATEGORIES.map((cat) => (
            <div key={cat.id} style={{ marginBottom: "var(--s-4)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                <cat.icon size={18} style={{ color: "var(--mustard)" }} />
                <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 2.6vw, 26px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)" }}>{cat.title}</h2>
              </div>
              <p style={{ fontFamily: "var(--B)", fontSize: "14px", color: "var(--ink-muted)", marginBottom: "var(--s-2)", maxWidth: "60ch" }}>{cat.intro}</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))", gap: "8px" }}>
                {cat.practices.map((p) => {
                  const on = chosen.has(p.id);
                  return (
                    <button
                      key={p.id}
                      onClick={() => toggle(p.id)}
                      style={{
                        textAlign: "left", cursor: "pointer", display: "flex", gap: "10px", alignItems: "flex-start",
                        padding: "12px 14px",
                        background: on ? "var(--charcoal)" : "#FFFFFF",
                        color: on ? "var(--bone)" : "var(--ink)",
                        border: "1px solid rgba(20,17,12,0.1)",
                        fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.4,
                      }}
                    >
                      <span style={{ flexShrink: 0, width: "16px", height: "16px", marginTop: "2px", border: `1.5px solid ${on ? "var(--mustard)" : "rgba(20,17,12,0.3)"}`, background: on ? "var(--mustard)" : "transparent", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                        {on && <Check size={12} style={{ color: "var(--charcoal)" }} />}
                      </span>
                      {p.label}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* The generated rule */}
          <div style={{ marginTop: "var(--s-5)", borderTop: "2px solid var(--mustard)", paddingTop: "var(--s-4)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "var(--s-3)" }}>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)" }}>Your rule of life</h2>
              {chosen.size > 0 && (
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={copyRule} style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 16px", background: "var(--charcoal)", color: "var(--bone)", border: "none", fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px" }}>
                    {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copied" : "Copy rule"}
                  </button>
                  <button onClick={reset} style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 16px", background: "transparent", color: "var(--ink-muted)", border: "1px solid rgba(20,17,12,0.15)", fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px" }}>
                    <RotateCcw size={15} /> Reset
                  </button>
                </div>
              )}
            </div>
            {copyFailed && (
              <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: "0 0 var(--s-3)" }}>
                Copy failed — select and copy manually.
              </p>
            )}

            {chosen.size === 0 ? (
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)" }}>
                Choose a few practices above, the ones you can actually keep, and your rule will appear here. A short rule kept beats a long rule abandoned.
              </p>
            ) : (
              <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,17,12,0.08)", padding: "var(--s-4)" }}>
                <p style={{ fontFamily: "var(--B)", fontSize: "14px", color: "var(--ink-muted)", fontStyle: "italic", marginBottom: "var(--s-3)", maxWidth: "60ch" }}>
                  A few rhythms I will return to, so that grace can reach me. Not a scorecard. A trellis.
                </p>
                {selectedByCategory.map((g) => (
                  <div key={g.c.id} style={{ marginBottom: "var(--s-3)" }}>
                    <div style={{ ...eyebrow, color: "var(--ink)", marginBottom: "6px" }}>{g.c.title}</div>
                    <ul style={{ margin: 0, paddingLeft: "20px" }}>
                      {g.items.map((p) => (
                        <li key={p.id} style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)" }}>{p.label}</li>
                      ))}
                    </ul>
                  </div>
                ))}
                <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)", borderTop: "1px solid rgba(20,17,12,0.08)", paddingTop: "var(--s-2)", marginTop: "var(--s-2)" }}>
                  Begin small. Keep what you can sustain, and let it grow.
                </p>
              </div>
            )}
          </div>

          <div style={{ marginTop: "var(--s-5)", borderTop: "1px solid rgba(20,17,12,0.1)", paddingTop: "var(--s-3)", display: "flex", gap: "var(--s-4)", flexWrap: "wrap" }}>
            <Link href="/life/discipleship-following-jesus" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Read: Discipleship</Link>
            <Link href="/life/rest-and-the-sabbath" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Read: Rest and the Sabbath</Link>
            <Link href="/disciple-making" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Make disciples</Link>
          </div>
        </div>
      </section>

      {/* Tool-to-book bridge (QW-17): invitation register, never pressure. */}
      <section style={{ background: "var(--bone-warm)", padding: "56px 24px" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "16px" }}>GO DEEPER</p>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.75, color: "var(--ink)", maxWidth: "56ch", margin: "0 auto 22px" }}>
            This builder has a book behind it. <em>Rule of Life: The Ancient Art of Forming a Soul in an Age Built to Deform It</em> — the same trellis, at full depth.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <a href="/rule-of-life" style={{ display: "inline-block", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--bone)", background: "var(--ink)", padding: "12px 22px", borderRadius: "3px", textDecoration: "none" }}>Read about the book</a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

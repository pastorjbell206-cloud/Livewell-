/**
 * Start a Table (/tools/discipleship-table) — equips an ordinary believer to
 * begin and multiply a discipleship table. Pick who you are gathering and how
 * often, and get a complete, reproducing plan: an invitation to send, a simple
 * meal approach, a weekly rhythm of welcome, meal, Scripture (with the three
 * questions), and prayer, a starter set of passages, and how to multiply. All
 * content is static. Pairs with /life/making-disciples-at-the-table.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useState } from "react";
import { Link } from "wouter";
import { Users, Copy, Check, RotateCcw, Mail, UtensilsCrossed, BookOpen, HeartHandshake, Sprout } from "lucide-react";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

type AudienceId = "seekers" | "new-believers" | "committed" | "family";

interface Audience {
  id: AudienceId;
  label: string;
  invite: string;
  focus: string;
  passages: string[];
}

const AUDIENCES: Audience[] = [
  {
    id: "seekers",
    label: "Neighbors and seekers (not yet believing)",
    invite:
      "We are having a few people over for dinner soon. No agenda, just good food and good conversation. We would love to have you there. Come as you are.",
    focus:
      "Belonging comes before believing. The first job is simply to make them want to come back, so welcome them, feed them, ask real questions about their lives, and let them see an ordinary Christian home up close. Bring Scripture in gently after a few weeks, once the trust is real, and never preach at the table.",
    passages: [
      "Luke 15:11-32, the prodigal son",
      "Luke 19:1-10, Zacchaeus",
      "John 4:1-26, the woman at the well",
      "Mark 2:13-17, Jesus eats with sinners",
    ],
  },
  {
    id: "new-believers",
    label: "New believers learning to follow",
    invite:
      "We are starting a simple weekly table to grow together in following Jesus. A meal, a short bit of Scripture, and prayer. Nothing heavy and nothing you need to prepare. Would you come.",
    focus:
      "The basics of following Jesus, caught more than taught. Read a Gospel together a little at a time, pray for one another by name and follow up, and let them watch you live an ordinary, hopeful, struggling Christian life. They are learning the shape of a life with God by sharing yours.",
    passages: [
      "Mark 1:1-20, the kingdom and the call",
      "John 1:1-18, who Jesus is",
      "Luke 11:1-13, how to pray",
      "Matthew 6:25-34, do not worry",
    ],
  },
  {
    id: "committed",
    label: "A few committed followers going deep",
    invite:
      "I would love to gather a few of us who want to take following Jesus seriously: to meet weekly around a meal, open the Scriptures, be honest about our actual lives, and help each other grow. Are you in.",
    focus:
      "Depth and honesty, aimed at multiplication. Go further into Scripture, confess sin to one another, carry each other in prayer, and from the very start tell them plainly that they are being equipped to open a table of their own one day. A disciple who knows they are being trained to make disciples becomes one.",
    passages: [
      "The Gospel of Mark, a half-chapter a week",
      "The Sermon on the Mount, Matthew 5 to 7",
      "Romans 6 to 8, the new life in Christ",
      "Acts 2:42-47, the first church",
    ],
  },
  {
    id: "family",
    label: "Your household (and maybe another family)",
    invite:
      "Let us protect one night a week as our family table, phones away, where we eat together, read a little Scripture, and pray for each other. You are always welcome to bring a friend.",
    focus:
      "Forming your own children and opening your home. Keep it short and warm for the ages at your table, read a few verses, ask the three questions in the simplest form, pray for one another, and let your children grow up inside a household of faith with an open door. Faith is caught at this table more than in any program.",
    passages: [
      "A Gospel a few verses at a time, or a children's Bible",
      "Psalm 23, the Lord is my shepherd",
      "The Lord's Prayer, Matthew 6:9-13",
      "Luke 2, the birth of Jesus",
    ],
  },
];

type Cadence = "weekly" | "fortnightly";

const eyebrow = { fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--mustard)" } as const;

const THREE_QUESTIONS = [
  "What does this show us about God, and what he is like.",
  "What does it show us about people, and about us.",
  "What might it mean for how we live this week.",
];

const FLOW = [
  { icon: Users, label: "Welcome (about 10 minutes)", text: "Open the door warmly and without performance. Let people arrive, settle, and feel that they belong here before anything else happens." },
  { icon: UtensilsCrossed, label: "Eat together (30 to 45 minutes)", text: "Share a simple meal and let people help, bring something, set the table, clear the plates. A table where everyone has a hand in it becomes a family, and families are where disciples are made." },
  { icon: BookOpen, label: "Open the Scripture (about 15 minutes)", text: "Read a short passage aloud together, then ask the three questions. You do not need to be the expert. You open the book and let Jesus teach." },
  { icon: HeartHandshake, label: "Pray together (about 10 minutes)", text: "Ask each person, how can we pray for you this week. Write the answers down, pray simply, and follow up next time. Answered prayer disciples people faster than any lesson." },
];

export default function DiscipleshipTable() {
  const [audienceId, setAudienceId] = useState<AudienceId | null>(null);
  const [cadence, setCadence] = useState<Cadence>("weekly");
  const [copied, setCopied] = useState(false);

  const audience = AUDIENCES.find((a) => a.id === audienceId) || null;
  const cadenceWord = cadence === "weekly" ? "each week" : "every other week";

  function reset() {
    setAudienceId(null);
    setCadence("weekly");
    setCopied(false);
  }

  function planText(a: Audience): string {
    const lines: string[] = [];
    lines.push("START A TABLE — your discipleship table plan");
    lines.push("");
    lines.push(`Who you are gathering: ${a.label}`);
    lines.push(`Rhythm: meeting ${cadenceWord}, same night, same table.`);
    lines.push("");
    lines.push("THE INVITATION (send this, in your own words):");
    lines.push(a.invite);
    lines.push("");
    lines.push("YOUR FOCUS:");
    lines.push(a.focus);
    lines.push("");
    lines.push(`THE RHYTHM (${cadenceWord}):`);
    FLOW.forEach((f) => lines.push(`- ${f.label}: ${f.text}`));
    lines.push("");
    lines.push("THE THREE QUESTIONS (for the Scripture):");
    THREE_QUESTIONS.forEach((q) => lines.push(`- ${q}`));
    lines.push("");
    lines.push("PASSAGES TO BEGIN WITH:");
    a.passages.forEach((p) => lines.push(`- ${p}`));
    lines.push("");
    lines.push("HOW TO MULTIPLY:");
    lines.push("From the beginning, tell your people that one day they will do this for someone else. When someone is ready, help them start their own table, with their own people, on their own street. The goal is not a bigger table but more tables, each one reproducing.");
    return lines.join("\n");
  }

  async function copyPlan() {
    if (!audience) return;
    try {
      await navigator.clipboard.writeText(planText(audience));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <Layout>
      <SEOMeta
        title="Start a Table — A Discipleship Table Starter Kit"
        description="Build a reproducing plan for making disciples around a table: an invitation, a weekly rhythm of meal, Scripture, and prayer, and how to multiply. No training."
        url="https://www.livewellbyjamesbell.co/tools/discipleship-table"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>A tool · Make disciples</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 5vw, 50px)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "16ch" }}>
            Start a table
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "62ch" }}>
            Tell us who you want to gather and how often. We will hand you a complete, reproducing plan, the invitation to send, a simple rhythm of meal and Scripture and prayer, the passages to begin with, and how to multiply. No training required. You already have what you need.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={{ ...wrap, maxWidth: "780px" }}>
          {/* Step 1 — audience */}
          <div style={eyebrow}>Step 1 · Who are you gathering</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(320px, 100%), 1fr))", gap: "var(--s-2)", marginTop: "var(--s-2)", marginBottom: "var(--s-4)" }}>
            {AUDIENCES.map((a) => {
              const on = a.id === audienceId;
              return (
                <button
                  key={a.id}
                  onClick={() => { setAudienceId(a.id); setCopied(false); }}
                  style={{
                    textAlign: "left", cursor: "pointer", padding: "var(--s-3)",
                    background: on ? "var(--charcoal)" : "#FFFFFF",
                    color: on ? "var(--bone)" : "var(--ink)",
                    border: "1px solid rgba(20,17,12,0.1)",
                    borderTop: `2px solid var(--mustard)`,
                    fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.4,
                  }}
                >
                  <Users size={16} style={{ color: "var(--mustard)", marginBottom: "8px" }} />
                  <div style={{ fontFamily: "var(--U)", fontWeight: 600 }}>{a.label}</div>
                </button>
              );
            })}
          </div>

          {/* Step 2 — cadence */}
          <div style={eyebrow}>Step 2 · How often</div>
          <div style={{ display: "flex", gap: "var(--s-2)", marginTop: "var(--s-2)", marginBottom: "var(--s-4)", flexWrap: "wrap" }}>
            {(["weekly", "fortnightly"] as Cadence[]).map((c) => {
              const on = c === cadence;
              return (
                <button
                  key={c}
                  onClick={() => { setCadence(c); setCopied(false); }}
                  style={{
                    cursor: "pointer", padding: "10px 18px",
                    background: on ? "var(--mustard)" : "#FFFFFF",
                    color: on ? "var(--charcoal)" : "var(--ink)",
                    border: "1px solid rgba(20,17,12,0.12)",
                    fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px",
                  }}
                >
                  {c === "weekly" ? "Weekly" : "Every other week"}
                </button>
              );
            })}
          </div>

          {/* The plan */}
          {!audience ? (
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)", borderTop: "1px solid rgba(20,17,12,0.1)", paddingTop: "var(--s-3)" }}>
              Choose who you are gathering above, and your plan will appear here.
            </p>
          ) : (
            <div style={{ borderTop: "2px solid var(--mustard)", paddingTop: "var(--s-4)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "var(--s-3)" }}>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)" }}>Your table plan</h2>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button onClick={copyPlan} style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 16px", background: "var(--charcoal)", color: "var(--bone)", border: "none", fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px" }}>
                    {copied ? <Check size={15} /> : <Copy size={15} />} {copied ? "Copied" : "Copy plan"}
                  </button>
                  <button onClick={reset} style={{ cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", padding: "9px 16px", background: "transparent", color: "var(--ink-muted)", border: "1px solid rgba(20,17,12,0.15)", fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px" }}>
                    <RotateCcw size={15} /> Reset
                  </button>
                </div>
              </div>

              <p style={{ fontFamily: "var(--B)", fontSize: "14px", color: "var(--ink-muted)", marginBottom: "var(--s-4)" }}>
                Gathering {audience.label.toLowerCase()}, meeting {cadenceWord}, same night, same table.
              </p>

              {/* Invitation */}
              <div style={{ marginBottom: "var(--s-4)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
                  <Mail size={16} style={{ color: "var(--mustard)" }} />
                  <span style={{ ...eyebrow, color: "var(--ink)" }}>The invitation</span>
                </div>
                <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", background: "#FFFFFF", borderLeft: "3px solid var(--mustard)", padding: "var(--s-3)", fontStyle: "italic" }}>
                  {audience.invite}
                </p>
              </div>

              {/* Focus */}
              <div style={{ marginBottom: "var(--s-4)" }}>
                <div style={{ ...eyebrow, color: "var(--ink)", marginBottom: "8px" }}>Your focus</div>
                <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)" }}>{audience.focus}</p>
              </div>

              {/* Rhythm */}
              <div style={{ marginBottom: "var(--s-4)" }}>
                <div style={{ ...eyebrow, color: "var(--ink)", marginBottom: "var(--s-2)" }}>The rhythm, {cadenceWord}</div>
                <div style={{ display: "grid", gap: "var(--s-2)" }}>
                  {FLOW.map((f) => (
                    <div key={f.label} style={{ display: "flex", gap: "12px", background: "#FFFFFF", border: "1px solid rgba(20,17,12,0.08)", padding: "var(--s-3)" }}>
                      <f.icon size={18} style={{ color: "var(--mustard)", flexShrink: 0, marginTop: "2px" }} />
                      <div>
                        <div style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--ink)", marginBottom: "4px" }}>{f.label}</div>
                        <div style={{ fontFamily: "var(--B)", fontSize: "14.5px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{f.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Three questions */}
              <div style={{ marginBottom: "var(--s-4)" }}>
                <div style={{ ...eyebrow, color: "var(--ink)", marginBottom: "8px" }}>The three questions, for the Scripture</div>
                <ol style={{ margin: 0, paddingLeft: "20px" }}>
                  {THREE_QUESTIONS.map((q) => (
                    <li key={q} style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)" }}>{q}</li>
                  ))}
                </ol>
              </div>

              {/* Passages */}
              <div style={{ marginBottom: "var(--s-4)" }}>
                <div style={{ ...eyebrow, color: "var(--ink)", marginBottom: "8px" }}>Passages to begin with</div>
                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                  {audience.passages.map((p) => (
                    <li key={p} style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)" }}>{p}</li>
                  ))}
                </ul>
              </div>

              {/* Multiply */}
              <div style={{ background: "var(--charcoal)", padding: "var(--s-4)", color: "var(--bone)" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                  <Sprout size={16} style={{ color: "var(--mustard)" }} />
                  <span style={{ ...eyebrow }}>How to multiply</span>
                </div>
                <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.75, color: "rgba(245,240,230,0.85)" }}>
                  From the beginning, tell your people that one day they will do this for someone else. When someone is ready, help them start their own table, with their own people, on their own street. The goal is not a bigger table but more tables, each one reproducing.
                </p>
              </div>
            </div>
          )}

          <div style={{ marginTop: "var(--s-5)", borderTop: "1px solid rgba(20,17,12,0.1)", paddingTop: "var(--s-3)", display: "flex", gap: "var(--s-4)", flexWrap: "wrap" }}>
            <Link href="/life/making-disciples-at-the-table" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Read: Making Disciples at the Table</Link>
            <Link href="/disciple-making" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>The disciple-making path</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

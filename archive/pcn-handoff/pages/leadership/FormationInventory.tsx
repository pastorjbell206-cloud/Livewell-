/**
 * The Leadership Formation Inventory (/leadership/inventory). The flagship
 * diagnostic of the Leadership Formation hub. Character first, capacity
 * second, by design and by weight: 25 character statements across five
 * domains, 16 capacity statements across four. Answered alone, scored in the
 * browser, nothing sent anywhere. Results history persists to localStorage
 * ("lw-formation-inventory") so a leader can retake it in six months and see
 * what moved. Formation, not measurement.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const SCALE = ["Never", "Rarely", "Sometimes", "Often", "Always"] as const;
const STORAGE_KEY = "lw-formation-inventory";

interface Statement {
  id: string;
  text: string;
  /** Reverse-scored: "Always" on this statement is the warning, not the health. */
  reverse?: boolean;
}

interface Book {
  title: string;
  author: string;
}

interface Domain {
  id: string;
  name: string;
  bank: "character" | "capacity";
  framing: string;
  statements: Statement[];
  /** Character domains only: the pastoral reading shown when this domain is among the lowest two. */
  meaning?: string;
  practices?: string[];
  books?: Book[];
  /** Capacity domains only: one plain line shown when this is the weakest capacity domain. */
  note?: string;
}

const DOMAINS: Domain[] = [
  {
    id: "identity",
    name: "Identity",
    bank: "character",
    framing: "What your worth is fused to.",
    statements: [
      { id: "id1", text: "When attendance is down or the work is criticized, I feel it as a verdict on who I am.", reverse: true },
      { id: "id2", text: "I could lose this role tomorrow and still know, in my body and not just my theology, that I am loved." },
      { id: "id3", text: "I check the numbers, the comments, or the response more often than I would admit out loud.", reverse: true },
      { id: "id4", text: "When someone else succeeds at the thing I do, something in me sinks.", reverse: true },
      { id: "id5", text: "My sense of standing before God rises and falls with how the work went this week.", reverse: true },
    ],
    meaning:
      "A low score here usually means the role has moved into the room where your name used to live. Somewhere along the way the work stopped being something you do and became the evidence that you matter, which is why the criticism cuts deeper than it should and the slow Sunday feels like a sentence. This is not a moral failure. It is what happens to almost everyone who is good at something people praise. But it cannot hold. A self built on results will eventually be dismantled by them. The way back is not trying harder to believe you are loved. It is putting yourself, regularly and deliberately, in places where you are useless and loved anyway.",
    practices: [
      "Take one full day a month with no ministry output of any kind, and pay attention to what surfaces in you by mid afternoon.",
      "Each evening for two weeks, write one sentence about who you were before you were useful.",
      "Ask someone who loved you before the role what they have watched the role do to you. Then only listen.",
    ],
    books: [
      { title: "In the Name of Jesus", author: "Henri Nouwen" },
      { title: "The Freedom of Self-Forgetfulness", author: "Timothy Keller" },
    ],
  },
  {
    id: "ego",
    name: "Ego and Ambition",
    bank: "character",
    framing: "The need to be needed.",
    statements: [
      { id: "eg1", text: "I have said yes to things God never asked of me because someone important asked.", reverse: true },
      { id: "eg2", text: "I feel a quiet pull to be in the room, on the platform, or in the conversation where the influence is.", reverse: true },
      { id: "eg3", text: "I can celebrate a decision that shrinks my visibility when it is right for the people I serve." },
      { id: "eg4", text: "Being needed has become a kind of food for me, and I get hungry when no one calls.", reverse: true },
      { id: "eg5", text: "I have told a story in a way that makes me look better than the truth does.", reverse: true },
    ],
    meaning:
      "A low score here does not mean you are a fraud. It usually means the hunger arrived before you noticed it, the way it always does, dressed as faithfulness. Being needed is a real pleasure, and ministry feeds it endlessly, which is why so many leaders can no longer tell where the call ends and the appetite begins. The danger is not ambition itself. Paul was ambitious. The danger is ambition that has stopped being examined. The leaders who survive a platform are the ones who built a life that does not require one, and that life is built in secret, in the acts nobody applauds because nobody knows.",
    practices: [
      "Do one significant act of service this month that no one will ever know about, and tell no one, ever.",
      "Decline one visible opportunity this quarter and watch what the declining does in you.",
      "Pray daily, by name, for the success of someone whose gifting threatens yours.",
    ],
    books: [
      { title: "Redeeming Power", author: "Diane Langberg" },
      { title: "The Reformed Pastor", author: "Richard Baxter" },
    ],
  },
  {
    id: "rest",
    name: "Rest and Limits",
    bank: "character",
    framing: "Whether you can stop.",
    statements: [
      { id: "re1", text: "I take a full day each week when I do not work, produce, or perform, and I do not apologize for it." },
      { id: "re2", text: "I keep working past the point of usefulness because stopping feels like failure.", reverse: true },
      { id: "re3", text: "I sleep enough that the people closest to me are not meeting a depleted version of me." },
      { id: "re4", text: "I treat my limits as information from God rather than obstacles to push through." },
      { id: "re5", text: "The thought of an unscheduled, unproductive day makes me restless or vaguely guilty.", reverse: true },
    ],
    meaning:
      "A low score here is usually not a scheduling problem. It is a theology problem wearing a calendar costume. Somewhere under the busyness is a quiet conviction that the work will collapse without you, or that you will collapse without the work, and both of those are worth saying out loud to God because he has heard worse and stayed. Sabbath is not a reward for finishing. Nothing is ever finished. It is a weekly argument with the lie that you are what you produce. You will not rest your way into believing that overnight. You rest first, badly, restless and checking your phone, and the belief follows the practice the way it usually does.",
    practices: [
      "Put a weekly sabbath on the calendar the way you would a funeral, immovable, and keep it for eight weeks before you evaluate it.",
      "Set a hard stop to the workday and tell one person who will ask you about it.",
      "For two weeks, treat sleep as obedience rather than as what is left over.",
    ],
    books: [
      { title: "The Rest of God", author: "Mark Buchanan" },
      { title: "The Ruthless Elimination of Hurry", author: "John Mark Comer" },
    ],
  },
  {
    id: "hidden",
    name: "Hidden Life",
    bank: "character",
    framing: "The gap between the public self and the private one.",
    statements: [
      { id: "hi1", text: "There are things in my inner life that no living person knows.", reverse: true },
      { id: "hi2", text: "The person people meet in public and the person my family gets at home are recognizably the same person." },
      { id: "hi3", text: "I pray when no one is watching and no sermon or meeting depends on it." },
      { id: "hi4", text: "I manage my image more carefully than I tend my soul.", reverse: true },
      { id: "hi5", text: "Someone in my life has permission to ask me anything, and uses it." },
    ],
    meaning:
      "A low score here means the inner room has gone quiet, or gone secret, and those are different problems with the same ending. Every leader develops a public self. That is not the sin. The sin starts when the public self becomes the only one being fed, while the private one goes unprayed for and unknown. Whatever is unshared in you is not resting down there. It is compounding, the way interest does, and it will come due at the worst possible time because it always does. The mercy is that this domain turns faster than you would think, and it turns on a single conversation, usually the one you have been quietly deciding not to have.",
    practices: [
      "Tell one trusted person the thing you have never said out loud. If a friend feels too close, start with a counselor or a confessor.",
      "Pray fifteen minutes a day that produces nothing usable. No notes. No content. Nothing to repurpose.",
      "One day a week, fast from checking the public self: mentions, metrics, comments, all of it.",
    ],
    books: [
      { title: "The Contemplative Pastor", author: "Eugene Peterson" },
      { title: "Life Together", author: "Dietrich Bonhoeffer" },
    ],
  },
  {
    id: "emotional",
    name: "Emotional and Relational Health",
    bank: "character",
    framing: "What happens inside you around other people.",
    statements: [
      { id: "em1", text: "Criticism lodges in me for days, and I rehearse my defense long after the conversation is over.", reverse: true },
      { id: "em2", text: "The people closest to me would say I am safe to disagree with." },
      { id: "em3", text: "I notice what I am feeling before it leaks out as irritation, withdrawal, or control." },
      { id: "em4", text: "My spouse or closest friend knows the weight I am actually carrying, not the edited version." },
      { id: "em5", text: "When someone I lead hurts me, I go quiet, go cold, or go around them rather than to them.", reverse: true },
    ],
    meaning:
      "A low score here usually means your inner weather is running more of the room than you know. The criticism that lodges for days, the coldness you have learned to call patience, the version of the week your spouse receives after everyone else got the real one, none of that is personality. It is signal, and it is treatable. Emotionally healthy leaders are not calmer by temperament. They are people who at some point got curious about their reactions instead of obeying them. That curiosity can start this week, and it usually starts with one honest question asked of someone close enough to answer it truthfully.",
    practices: [
      "When the next criticism lands, wait twenty four hours before responding, and pay attention to what the waiting reveals.",
      "Ask your spouse or closest friend one question this week: what is it like to be on the other side of me. Then only listen.",
      "Name the feeling before you walk into the meeting. Out loud, to yourself, in the car if you have to.",
    ],
    books: [
      { title: "The Emotionally Healthy Leader", author: "Peter Scazzero" },
      { title: "A Failure of Nerve", author: "Edwin Friedman" },
    ],
  },
  {
    id: "people",
    name: "Leading People",
    bank: "capacity",
    framing: "Delegation, development, and conflict.",
    statements: [
      { id: "pe1", text: "I hand off real responsibility, not just tasks, and let people carry it differently than I would." },
      { id: "pe2", text: "There are people leading today because I developed them, not just recruited them." },
      { id: "pe3", text: "I name conflict early and directly rather than waiting for it to surface on its own." },
      { id: "pe4", text: "I keep work I should give away because explaining it feels harder than doing it.", reverse: true },
    ],
    note: "If this is low, start with one real handoff, authority included, and let the work be done differently than you would do it.",
  },
  {
    id: "teaching",
    name: "Teaching and Communication",
    bank: "capacity",
    framing: "Whether the word lands.",
    statements: [
      { id: "te1", text: "After I teach, people can say in their own words what I was asking of them." },
      { id: "te2", text: "I prepare with the actual people in front of me in mind, not the audience in my head." },
      { id: "te3", text: "I ask for honest feedback on my teaching and have changed things because of it." },
      { id: "te4", text: "I take twenty minutes to say what could be said in ten.", reverse: true },
    ],
    note: "If this is low, the fix is rarely more content. It is more clarity about the one thing you are asking of the people in front of you.",
  },
  {
    id: "stewardship",
    name: "Institutional Stewardship",
    bank: "capacity",
    framing: "Money, governance, and the systems under the soul.",
    statements: [
      { id: "st1", text: "I could explain our budget, and what it says about our priorities, to anyone who asked." },
      { id: "st2", text: "The systems I am responsible for would keep running for a season without me." },
      { id: "st3", text: "I avoid the administrative parts of leadership until they become emergencies.", reverse: true },
      { id: "st4", text: "The people who hold me accountable have real authority and real information, not just a title." },
    ],
    note: "If this is low, the spreadsheet is discipleship you have been deferring. One honest afternoon with the budget is a start.",
  },
  {
    id: "direction",
    name: "Direction and Discernment",
    bank: "capacity",
    framing: "Where this is going, and how you decide.",
    statements: [
      { id: "di1", text: "I can state where we are going in one sentence the people I lead could repeat." },
      { id: "di2", text: "I make decisions when they are needed, even when not everyone will be pleased." },
      { id: "di3", text: "I reopen settled decisions because someone was unhappy with them.", reverse: true },
      { id: "di4", text: "I regularly stop to ask whether we are doing the right things, not just doing things right." },
    ],
    note: "If this is low, write the one sentence. If you cannot write it, that is the finding.",
  },
];

const CHARACTER_DOMAINS = DOMAINS.filter((d) => d.bank === "character");
const CAPACITY_DOMAINS = DOMAINS.filter((d) => d.bank === "capacity");
const TOTAL_STATEMENTS = DOMAINS.reduce((n, d) => n + d.statements.length, 0);
const RESULTS_SCREEN = DOMAINS.length;

/* ------------------------------------------------------------------ */
/* Storage                                                             */
/* ------------------------------------------------------------------ */

interface RunEntry {
  date: string; // ISO
  scores: Record<string, number>; // domain id -> average, 1..5
}

function loadHistory(): RunEntry[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.filter((e) => e && typeof e === "object" && typeof e.date === "string" && e.scores && typeof e.scores === "object") as RunEntry[];
    return [];
  } catch {
    return [];
  }
}

function saveHistory(history: RunEntry[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // Storage unavailable. The inventory still works, it just forgets.
  }
}

/* ------------------------------------------------------------------ */
/* Scoring                                                             */
/* ------------------------------------------------------------------ */

function domainScore(domain: Domain, answers: Record<string, number>): number {
  let sum = 0;
  for (const s of domain.statements) {
    const a = answers[s.id] ?? 0;
    sum += s.reverse ? 6 - a : a;
  }
  return sum / domain.statements.length;
}

function bankAverage(domains: Domain[], scores: Record<string, number>): number {
  return domains.reduce((n, d) => n + (scores[d.id] ?? 0), 0) / domains.length;
}

function verdictFor(scores: Record<string, number>): string {
  const charAvg = bankAverage(CHARACTER_DOMAINS, scores);
  const capAvg = bankAverage(CAPACITY_DOMAINS, scores);
  const weighted = charAvg * 0.65 + capAvg * 0.35;
  if (charAvg >= 4 && weighted >= 4) {
    return "The foundation is holding. The work now is to keep it hidden, fed, and honest, because nothing erodes character like the assumption that it is finished.";
  }
  if (charAvg >= 3) {
    return "You are gifted enough to outrun your character. Most leaders who fell were. The gap is not a crisis yet. It is an invitation, and it has a clock on it.";
  }
  return "The work is underneath. Not the preaching, not the systems, not the vision. The self that does all of it. Everything you build will stand on that or fall through it.";
}

function formatDelta(prev: number | undefined, cur: number): string | null {
  if (prev === undefined || prev === null || Number.isNaN(prev)) return null;
  const delta = cur - prev;
  const sign = delta >= 0 ? "+" : "";
  return `last time ${prev.toFixed(1)}, now ${cur.toFixed(1)} (${sign}${delta.toFixed(1)})`;
}

function buildPlainText(scores: Record<string, number>, previous: RunEntry | null): string {
  const lines: string[] = [];
  lines.push("The Leadership Formation Inventory");
  lines.push(`Taken ${new Date().toLocaleDateString()}`);
  lines.push("");
  lines.push(verdictFor(scores));
  lines.push("");
  lines.push("CHARACTER (weighted first)");
  for (const d of CHARACTER_DOMAINS) {
    const delta = formatDelta(previous?.scores[d.id], scores[d.id]);
    lines.push(`  ${d.name}: ${scores[d.id].toFixed(1)} / 5${delta ? ` (${delta})` : ""}`);
  }
  const lowest = [...CHARACTER_DOMAINS].sort((a, b) => scores[a.id] - scores[b.id]).slice(0, 2);
  lines.push("");
  lines.push(`Where formation starts: ${lowest.map((d) => d.name).join(", ")}`);
  lines.push("");
  lines.push("CAPACITY (these matter, and they come second)");
  for (const d of CAPACITY_DOMAINS) {
    const delta = formatDelta(previous?.scores[d.id], scores[d.id]);
    lines.push(`  ${d.name}: ${scores[d.id].toFixed(1)} / 5${delta ? ` (${delta})` : ""}`);
  }
  lines.push("");
  lines.push("Scored in the browser. Nothing left the device.");
  return lines.join("\n");
}

/* ------------------------------------------------------------------ */
/* The six-month loop                                                  */
/* ------------------------------------------------------------------ */

const RETAKE_MONTHS = 6;
/** How old a run must be before the intro quietly says it is time again. */
const REMIND_MONTHS = 5;

function addMonths(iso: string, months: number): Date {
  const d = new Date(iso);
  d.setMonth(d.getMonth() + months);
  return d;
}

function fmtDate(d: Date | string): string {
  const date = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
}

function fmtAxisDate(iso: string): string {
  return new Date(iso).toLocaleDateString(undefined, { month: "short", year: "2-digit" });
}

/**
 * Runs that can be charted: a real date and a real 1..5 score for every
 * domain. Anything a corrupted or older localStorage entry left short is
 * skipped, not crashed on. Reading history stays untouched either way.
 */
function chartableRuns(history: RunEntry[]): RunEntry[] {
  return history.filter(
    (e) =>
      !Number.isNaN(new Date(e.date).getTime()) &&
      DOMAINS.every((d) => {
        const v = e.scores[d.id];
        return typeof v === "number" && Number.isFinite(v) && v >= 1 && v <= 5;
      })
  );
}

/* ------------------------------------------------------------------ */
/* Shared style fragments                                              */
/* ------------------------------------------------------------------ */

const wrap = { maxWidth: "740px", margin: "0 auto" } as const;
const heroWrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

const bodyText = { fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)" } as const;
const mutedText = { fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" } as const;

const primaryBtn = {
  fontFamily: "var(--U)", fontWeight: 600, fontSize: "15px", padding: "12px 24px", minHeight: "44px",
  background: "var(--mustard)", color: "var(--charcoal)", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer",
} as const;

const quietBtn = {
  fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", padding: "11px 18px", minHeight: "44px",
  background: "transparent", color: "var(--ink-muted)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer",
} as const;

function ScoreBar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, ((value - 1) / 4) * 100));
  return (
    <div style={{ height: "4px", background: "var(--border)", borderRadius: "2px", overflow: "hidden" }} aria-hidden="true">
      <div style={{ height: "100%", width: `${pct}%`, background: "var(--mustard)" }} />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* The long view: inline SVG, no chart library                         */
/* ------------------------------------------------------------------ */

function TrajectoryChart({ runs }: { runs: RunEntry[] }) {
  const W = 640;
  const H = 250;
  const padL = 34;
  const padR = 16;
  const padT = 16;
  const padB = 36;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const n = runs.length;
  const x = (i: number) => (n <= 1 ? padL + innerW / 2 : padL + (i / (n - 1)) * innerW);
  const y = (v: number) => padT + ((5 - Math.max(1, Math.min(5, v))) / 4) * innerH;
  const charVals = runs.map((r) => bankAverage(CHARACTER_DOMAINS, r.scores));
  const capVals = runs.map((r) => bankAverage(CAPACITY_DOMAINS, r.scores));
  const points = (vals: number[]) => vals.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ");
  const labelIdx =
    n <= 4
      ? runs.map((_, i) => i)
      : Array.from(new Set([0, Math.round((n - 1) / 3), Math.round(((n - 1) * 2) / 3), n - 1]));
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "auto", display: "block" }}
      role="img"
      aria-label={`Character and capacity averages across ${n} readings, ${fmtDate(runs[0].date)} to ${fmtDate(runs[n - 1].date)}. Character moved from ${charVals[0].toFixed(1)} to ${charVals[n - 1].toFixed(1)}; capacity from ${capVals[0].toFixed(1)} to ${capVals[n - 1].toFixed(1)}.`}
    >
      {[1, 2, 3, 4, 5].map((v) => (
        <g key={v}>
          <line x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} stroke="var(--border)" strokeWidth={1} />
          <text x={padL - 8} y={y(v) + 4} textAnchor="end" fontSize={11} fontFamily="var(--U)" fill="var(--ink-muted)">
            {v}
          </text>
        </g>
      ))}
      <polyline points={points(capVals)} fill="none" stroke="var(--ink-muted)" strokeWidth={2} strokeDasharray="5 5" strokeLinejoin="round" strokeLinecap="round" />
      <polyline points={points(charVals)} fill="none" stroke="var(--ink)" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
      {capVals.map((v, i) => (
        <circle key={`cap-${i}`} cx={x(i)} cy={y(v)} r={3} fill="var(--ink-muted)" />
      ))}
      {charVals.map((v, i) => (
        <circle key={`chr-${i}`} cx={x(i)} cy={y(v)} r={3.5} fill="var(--mustard)" stroke="var(--ink)" strokeWidth={1} />
      ))}
      {labelIdx.map((i) => (
        <text
          key={`d-${i}`}
          x={x(i)}
          y={H - 12}
          textAnchor={i === 0 ? "start" : i === n - 1 ? "end" : "middle"}
          fontSize={11}
          fontFamily="var(--U)"
          fill="var(--ink-muted)"
        >
          {fmtAxisDate(runs[i].date)}
        </text>
      ))}
    </svg>
  );
}

function Sparkline({ values }: { values: number[] }) {
  const W = 120;
  const H = 40;
  const pad = 4;
  const n = values.length;
  const x = (i: number) => (n <= 1 ? W / 2 : pad + (i / (n - 1)) * (W - pad * 2));
  const y = (v: number) => pad + ((5 - Math.max(1, Math.min(5, v))) / 4) * (H - pad * 2);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "40px", display: "block" }} aria-hidden="true">
      <line x1={pad} y1={y(3)} x2={W - pad} y2={y(3)} stroke="var(--border)" strokeWidth={1} />
      <polyline
        points={values.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ")}
        fill="none"
        stroke="var(--ink)"
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle cx={x(n - 1)} cy={y(values[n - 1])} r={2.5} fill="var(--mustard)" />
    </svg>
  );
}

/** Requires two or more chartable runs; callers handle the shorter cases. */
function TrendView({ runs }: { runs: RunEntry[] }) {
  if (runs.length < 2) return null;
  const legendItem = { display: "inline-flex", alignItems: "center", gap: "8px", ...mutedText, fontSize: "12px" } as const;
  return (
    <div>
      <p style={{ ...mutedText, marginBottom: "var(--s-3)", maxWidth: "62ch" }}>
        {runs.length} readings, {fmtDate(runs[0].date)} to {fmtDate(runs[runs.length - 1].date)}. The chart does not grade you. It shows what the slow work has moved, and what it has not.
      </p>
      <TrajectoryChart runs={runs} />
      <div style={{ display: "flex", gap: "18px", flexWrap: "wrap", marginTop: "10px", marginBottom: "var(--s-4)" }}>
        <span style={legendItem}>
          <span aria-hidden="true" style={{ width: "18px", borderTop: "2px solid var(--ink)", display: "inline-block" }} />
          Character average
        </span>
        <span style={legendItem}>
          <span aria-hidden="true" style={{ width: "18px", borderTop: "2px dashed var(--ink-muted)", display: "inline-block" }} />
          Capacity average
        </span>
      </div>
      <h3 style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)", marginBottom: "12px" }}>
        Domain by domain
      </h3>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "12px" }}>
        {DOMAINS.map((d) => {
          const vals = runs.map((r) => r.scores[d.id]);
          const delta = vals[vals.length - 1] - vals[0];
          const sign = delta >= 0 ? "+" : "";
          return (
            <div key={d.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "12px" }}>
              <div style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "12px", color: "var(--ink)", marginBottom: "2px" }}>{d.name}</div>
              <div style={{ ...mutedText, fontSize: "11px", marginBottom: "6px" }}>{d.bank === "character" ? "Character" : "Capacity"}</div>
              <Sparkline values={vals} />
              <p style={{ ...mutedText, fontSize: "12px", marginTop: "6px" }}>
                {vals[0].toFixed(1)} to {vals[vals.length - 1].toFixed(1)} ({sign}
                {delta.toFixed(1)})
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Statement-by-statement drilldown                                    */
/* ------------------------------------------------------------------ */

function AnswerDrilldown({ answers, scores }: { answers: Record<string, number>; scores: Record<string, number> }) {
  return (
    <div style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", background: "var(--card)" }}>
      {DOMAINS.map((d, i) => (
        <details key={d.id} className="fi-acc" style={{ borderTop: i === 0 ? "none" : "1px solid var(--border)" }}>
          <summary
            aria-label={`${d.name}, scored ${scores[d.id].toFixed(1)} out of 5. Expand to see your answer to each statement.`}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", minHeight: "48px", padding: "10px 16px", cursor: "pointer", fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--ink)" }}
          >
            <span>{d.name}</span>
            <span style={{ marginLeft: "auto", color: "var(--ink-muted)", fontSize: "13px", fontWeight: 600, whiteSpace: "nowrap" }}>
              {scores[d.id].toFixed(1)} / 5
            </span>
          </summary>
          <div style={{ padding: "0 16px 14px" }}>
            {d.statements.map((s) => (
              <div key={s.id} style={{ padding: "10px 0", borderTop: "1px solid var(--border)" }}>
                <p style={{ ...bodyText, fontSize: "15px", marginBottom: "4px" }}>{s.text}</p>
                <p style={{ ...mutedText, fontSize: "13px" }}>
                  You answered:{" "}
                  <span style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--ink)" }}>
                    {answers[s.id] ? SCALE[answers[s.id] - 1] : "Unanswered"}
                  </span>
                  {s.reverse ? " · reverse-scored" : ""}
                </p>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function FormationInventory() {
  // -1 = intro, 0..8 = one domain per screen, 9 = results.
  const [screen, setScreen] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [history, setHistory] = useState<RunEntry[]>(() => loadHistory());
  const [previous, setPrevious] = useState<RunEntry | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [screen]);

  const scores = useMemo(() => {
    const s: Record<string, number> = {};
    for (const d of DOMAINS) s[d.id] = domainScore(d, answers);
    return s;
  }, [answers]);

  const finish = () => {
    const prior = loadHistory();
    setPrevious(prior.length > 0 ? prior[prior.length - 1] : null);
    const entry: RunEntry = { date: new Date().toISOString(), scores };
    const next = [...prior, entry];
    setHistory(next);
    saveHistory(next);
    setCopied(false);
    setScreen(RESULTS_SCREEN);
  };

  const retake = () => {
    setAnswers({});
    setPrevious(null);
    setCopied(false);
    setScreen(-1);
  };

  const clearHistory = () => {
    if (!window.confirm("Clear your inventory history from this browser? Your current results stay on screen.")) return;
    setHistory([]);
    setPrevious(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Nothing to clear if storage is unavailable.
    }
  };

  const copyResults = async () => {
    const text = buildPlainText(scores, previous);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt("Copy your results:", text);
    }
  };

  const lastRun = history.length > 0 ? history[history.length - 1] : null;
  const runs = useMemo(() => chartableRuns(history), [history]);
  const retakeDue = lastRun !== null && new Date() >= addMonths(lastRun.date, REMIND_MONTHS);

  return (
    <Layout>
      <SEOMeta
        title="The Leadership Formation Inventory — A Character-First Leadership Assessment"
        description="A character-first diagnostic for pastors and leaders. Nine domains, forty one statements, about ten minutes, scored entirely in your browser."
        url="https://www.livewellbyjamesbell.co/leadership/inventory"
      />

      {/* Focus ring for the hidden radio inputs; everything else is inline. */}
      <style>{`
        .fi-opt input{position:absolute;opacity:0;width:1px;height:1px;margin:0}
        .fi-opt input:focus-visible + span{outline:2px solid var(--mustard);outline-offset:2px}
        .fi-acc > summary{list-style:none}
        .fi-acc > summary::-webkit-details-marker{display:none}
        .fi-acc > summary::after{content:"+";font-family:var(--U);font-size:16px;line-height:1;color:var(--ink-muted)}
        .fi-acc[open] > summary::after{content:"\\2212"}
        .fi-acc > summary:focus-visible{outline:2px solid var(--mustard);outline-offset:-2px}
        .fi-print{display:none}
        @media print{
          nav, footer, .skip-link, .fi-screen{display:none !important}
          .fi-print{display:block !important;color:#000;background:#fff;font-family:var(--B);font-size:11pt;line-height:1.55;padding:0}
          .fi-print h1{font-family:var(--F);font-weight:400;font-size:22pt;letter-spacing:-0.02em;margin:0 0 4pt}
          .fi-print h2{font-family:var(--F);font-weight:500;font-size:15pt;margin:16pt 0 6pt;page-break-after:avoid}
          .fi-print h3{font-family:var(--F);font-weight:500;font-size:12.5pt;margin:10pt 0 3pt;page-break-after:avoid}
          .fi-print p{margin:0 0 6pt;max-width:none}
          .fi-print ul{margin:0 0 6pt;padding-left:14pt}
          .fi-print li{margin-bottom:3pt}
          .fi-print .fi-print-meta{font-size:9.5pt;color:#333;margin-bottom:10pt}
          .fi-print .fi-print-label{font-family:var(--U);font-weight:600;font-size:9pt;text-transform:uppercase;letter-spacing:0.08em;margin:6pt 0 2pt}
          .fi-print .fi-print-row{display:flex;justify-content:space-between;gap:12pt;border-bottom:0.5pt solid #999;padding:3pt 0;page-break-inside:avoid}
          .fi-print .fi-print-block{page-break-inside:avoid;margin-bottom:10pt}
          .fi-print .fi-print-foot{margin-top:14pt;padding-top:6pt;border-top:0.5pt solid #999;font-size:9.5pt;color:#333}
        }
      `}</style>

      {/* Hero */}
      <section className="fi-screen" style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={heroWrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/leadership" style={{ color: "inherit" }}>Leadership Formation</Link> · The flagship inventory
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>
            The Leadership Formation Inventory
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "60ch" }}>
            Who you are will outlast what you can do. This inventory reads both, in that order.
          </p>
        </div>
      </section>

      {/* ------------------------------ Intro ------------------------------ */}
      {screen === -1 && (
        <section className="fi-screen" style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
          <div style={wrap}>
            {lastRun && retakeDue && (
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderLeft: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "14px 16px", marginBottom: "var(--s-4)" }}>
                <p style={{ ...bodyText, fontSize: "15px" }}>
                  You last took this on {fmtDate(lastRun.date)}. The six months are up, or close to it. Take it again and see what the slow work has done.
                </p>
              </div>
            )}
            <p style={{ ...bodyText, marginBottom: "14px" }}>
              This is not a measurement. It is formation. There is no grade at the end, no percentile, no comparison to other leaders, because the question this inventory asks cannot be graded. It can only be answered honestly or not at all.
            </p>
            <p style={{ ...bodyText, marginBottom: "14px" }}>
              Forty one statements, nine domains, about ten minutes. The first five domains are character: identity, ego, rest, the hidden life, emotional health. The last four are capacity: leading people, teaching, stewardship, direction. Character comes first and is weighted heavier, because gifting gets a leader the platform and character decides whether he survives it. Every public collapse you have watched began as a private one nobody inventoried.
            </p>
            <p style={{ ...bodyText, marginBottom: "14px" }}>
              Answer the way you would at midnight, not the way you would in an interview. Nothing leaves this browser. No account, no server, no one reading over your shoulder. Your results, and your history if you retake it later, live on this device and nowhere else.
            </p>

            {lastRun && (
              <p style={{ ...mutedText, marginBottom: "14px" }}>
                You have taken this {history.length === 1 ? "once" : `${history.length} times`}, most recently on {new Date(lastRun.date).toLocaleDateString()}. Your results screen will show what moved.
              </p>
            )}

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "var(--s-3)" }}>
              <button onClick={() => setScreen(0)} style={primaryBtn}>Begin the inventory</button>
              {history.length > 0 && (
                <button onClick={clearHistory} style={quietBtn}>Clear history</button>
              )}
            </div>

            {runs.length >= 2 && (
              <div style={{ marginTop: "var(--s-5)", borderTop: "1px solid var(--border)", paddingTop: "var(--s-4)" }}>
                <div className="eyebrow" style={{ marginBottom: "10px" }}>The long view</div>
                <TrendView runs={runs} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* --------------------------- Domain screens --------------------------- */}
      {screen >= 0 && screen < RESULTS_SCREEN && (() => {
        const domain = DOMAINS[screen];
        const bankDomains = domain.bank === "character" ? CHARACTER_DOMAINS : CAPACITY_DOMAINS;
        const bankIndex = bankDomains.findIndex((d) => d.id === domain.id) + 1;
        const answeredHere = domain.statements.filter((s) => answers[s.id]).length;
        const complete = answeredHere === domain.statements.length;
        const isLast = screen === RESULTS_SCREEN - 1;
        const answeredTotal = DOMAINS.flatMap((d) => d.statements).filter((s) => answers[s.id]).length;

        return (
          <section className="fi-screen" style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
            <div style={wrap}>
              {/* Progress across domains */}
              <div style={{ marginBottom: "var(--s-4)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "8px" }}>
                  <span className="eyebrow">{domain.bank === "character" ? "Character" : "Capacity"} · Domain {bankIndex} of {bankDomains.length}</span>
                  <span style={{ ...mutedText, fontSize: "12px" }}>{answeredTotal} of {TOTAL_STATEMENTS} answered</span>
                </div>
                <div style={{ display: "flex", gap: "4px" }} aria-hidden="true">
                  {DOMAINS.map((d, i) => (
                    <div key={d.id} style={{ flex: "1 1 0", height: "3px", borderRadius: "2px", background: i < screen ? "var(--mustard)" : i === screen ? "var(--mustard-text)" : "var(--border)" }} />
                  ))}
                </div>
              </div>

              <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.6vw, 36px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "6px" }}>{domain.name}</h2>
              <p style={{ ...mutedText, fontSize: "15px", marginBottom: "var(--s-4)" }}>{domain.framing}</p>

              {domain.statements.map((s, n) => (
                <div key={s.id} style={{ marginBottom: "var(--s-4)", paddingBottom: "var(--s-3)", borderBottom: "1px solid var(--border)" }}>
                  <p style={{ ...bodyText, marginBottom: "12px" }}>
                    <span style={{ color: "var(--mustard-text)", fontFamily: "var(--U)", fontWeight: 600 }}>{n + 1}. </span>
                    {s.text}
                  </p>
                  <div role="radiogroup" aria-label={s.text} style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                    {SCALE.map((label, si) => {
                      const val = si + 1;
                      const on = answers[s.id] === val;
                      return (
                        <label key={val} className="fi-opt" style={{ flex: "1 1 0", minWidth: "88px", position: "relative", cursor: "pointer" }}>
                          <input
                            type="radio"
                            name={s.id}
                            value={val}
                            checked={on}
                            aria-label={label}
                            onChange={() => setAnswers((a) => ({ ...a, [s.id]: val }))}
                          />
                          <span style={{
                            display: "flex", alignItems: "center", justifyContent: "center", minHeight: "44px",
                            fontFamily: "var(--U)", fontWeight: 600, fontSize: "12px", lineHeight: 1.3, padding: "8px 6px",
                            borderRadius: "var(--radius-sm)",
                            border: "1px solid " + (on ? "var(--mustard)" : "var(--border)"),
                            background: on ? "var(--mustard)" : "var(--card)",
                            color: on ? "var(--charcoal)" : "var(--ink-muted)",
                          }}>{label}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
                <button onClick={() => setScreen(screen - 1)} style={quietBtn}>
                  {screen === 0 ? "Back to the introduction" : "Back"}
                </button>
                <button
                  disabled={!complete}
                  onClick={() => (isLast ? finish() : setScreen(screen + 1))}
                  style={{
                    ...primaryBtn,
                    background: complete ? "var(--mustard)" : "var(--border)",
                    color: complete ? "var(--charcoal)" : "var(--ink-muted)",
                    cursor: complete ? "pointer" : "not-allowed",
                  }}
                >
                  {!complete
                    ? `Answer all ${domain.statements.length} (${answeredHere} done)`
                    : isLast ? "See the results" : "Continue"}
                </button>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ------------------------------ Results ------------------------------ */}
      {screen === RESULTS_SCREEN && (() => {
        const lowestTwo = [...CHARACTER_DOMAINS].sort((a, b) => scores[a.id] - scores[b.id]).slice(0, 2);
        const lowestCapacity = [...CAPACITY_DOMAINS].sort((a, b) => scores[a.id] - scores[b.id])[0];
        const nextDue = addMonths(lastRun ? lastRun.date : new Date().toISOString(), RETAKE_MONTHS);

        return (
          <>
            {/* Verdict */}
            <section className="fi-screen" style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
              <div style={wrap}>
                <div style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", borderRadius: "var(--radius-sm)", padding: "var(--s-5)", borderTop: "3px solid var(--mustard)" }}>
                  <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "10px" }}>The verdict</div>
                  <p style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 2.8vw, 26px)", fontWeight: 500, lineHeight: 1.45, color: "var(--charcoal-fg)" }}>
                    {verdictFor(scores)}
                  </p>
                </div>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "var(--s-3)" }}>
                  <button onClick={copyResults} aria-live="polite" style={primaryBtn}>{copied ? "Copied" : "Copy results"}</button>
                  <button onClick={() => window.print()} style={quietBtn}>Print your results</button>
                  <button onClick={retake} style={quietBtn}>Retake the inventory</button>
                  {history.length > 0 && <button onClick={clearHistory} style={quietBtn}>Clear history</button>}
                </div>
                {previous && (
                  <p style={{ ...mutedText, fontSize: "13px", marginTop: "12px" }}>
                    Compared against your last run on {new Date(previous.date).toLocaleDateString()}.
                  </p>
                )}
                <p style={{ ...mutedText, fontSize: "13px", marginTop: previous ? "4px" : "12px" }}>
                  Your next reading is due {fmtDate(nextDue)}. Put it on the calendar now, while the answers are honest.
                </p>
              </div>
            </section>

            {/* Character first */}
            <section className="fi-screen" style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" }}>
              <div style={wrap}>
                <div className="eyebrow" style={{ marginBottom: "10px" }}>Character · Read this first</div>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.6vw, 36px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "var(--s-4)" }}>
                  The foundation
                </h2>
                {CHARACTER_DOMAINS.map((d) => {
                  const delta = formatDelta(previous?.scores[d.id], scores[d.id]);
                  return (
                    <div key={d.id} style={{ marginBottom: "var(--s-3)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                        <span style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--ink)" }}>{d.name}</span>
                        <span style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px", color: "var(--ink-muted)" }}>{scores[d.id].toFixed(1)} / 5</span>
                      </div>
                      <ScoreBar value={scores[d.id]} />
                      {delta && <p style={{ ...mutedText, fontSize: "12px", marginTop: "5px" }}>{delta}</p>}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Where formation starts */}
            <section className="fi-screen" style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
              <div style={wrap}>
                <div className="eyebrow" style={{ marginBottom: "10px" }}>The lowest two character domains</div>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.6vw, 36px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "12px" }}>
                  Where formation starts
                </h2>
                <p style={{ ...bodyText, marginBottom: "var(--s-4)", maxWidth: "62ch" }}>
                  Not where you are worst. Where the work begins. These two domains scored lowest, which makes them the door, not the indictment.
                </p>

                {lowestTwo.map((d) => (
                  <div key={d.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderTop: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)", marginBottom: "var(--s-3)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
                      <h3 style={{ fontFamily: "var(--F)", fontSize: "24px", fontWeight: 500, color: "var(--ink)" }}>{d.name}</h3>
                      <span style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px", color: "var(--ink-muted)" }}>{scores[d.id].toFixed(1)} / 5</span>
                    </div>
                    <p style={{ ...bodyText, marginBottom: "var(--s-3)" }}>{d.meaning}</p>

                    <div className="eyebrow" style={{ marginBottom: "8px" }}>Practices</div>
                    <ul style={{ margin: "0 0 var(--s-3)", paddingLeft: "20px" }}>
                      {d.practices?.map((p, i) => (
                        <li key={i} style={{ ...bodyText, fontSize: "15px", marginBottom: "8px" }}>{p}</li>
                      ))}
                    </ul>

                    <div className="eyebrow" style={{ marginBottom: "8px" }}>Reading</div>
                    {d.books?.map((b, i) => (
                      <p key={i} style={{ ...bodyText, fontSize: "15px", marginBottom: "4px" }}>
                        <em>{b.title}</em><span style={{ color: "var(--ink-muted)" }}>, {b.author}</span>
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </section>

            {/* Capacity, second by design */}
            <section className="fi-screen" style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" }}>
              <div style={wrap}>
                <div className="eyebrow" style={{ marginBottom: "10px" }}>Capacity · Second by design</div>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.6vw, 36px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "12px" }}>
                  The skills
                </h2>
                <p style={{ ...bodyText, marginBottom: "var(--s-4)", maxWidth: "62ch" }}>
                  These matter, and they come second. Capacity can be taught in a year. Character is formed over a lifetime, and no amount of skill will hold up a leader whose inner life is giving way.
                </p>

                {CAPACITY_DOMAINS.map((d) => {
                  const delta = formatDelta(previous?.scores[d.id], scores[d.id]);
                  const isLowest = d.id === lowestCapacity.id;
                  return (
                    <div key={d.id} style={{ marginBottom: "var(--s-3)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "6px" }}>
                        <span style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--ink)" }}>{d.name}</span>
                        <span style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px", color: "var(--ink-muted)" }}>{scores[d.id].toFixed(1)} / 5</span>
                      </div>
                      <ScoreBar value={scores[d.id]} />
                      {delta && <p style={{ ...mutedText, fontSize: "12px", marginTop: "5px" }}>{delta}</p>}
                      {isLowest && d.note && <p style={{ ...mutedText, fontSize: "14px", marginTop: "8px", maxWidth: "60ch" }}>{d.note}</p>}
                    </div>
                  );
                })}

                <p style={{ ...mutedText, fontStyle: "italic", marginTop: "var(--s-4)", borderTop: "1px solid var(--border)", paddingTop: "var(--s-3)" }}>
                  Nothing here was sent anywhere. Take it again in six months and see what the slow work has done.
                </p>
              </div>
            </section>

            {/* Statement by statement */}
            <section className="fi-screen" style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
              <div style={wrap}>
                <div className="eyebrow" style={{ marginBottom: "10px" }}>The working</div>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.6vw, 36px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "12px" }}>
                  Statement by statement
                </h2>
                <p style={{ ...bodyText, marginBottom: "var(--s-4)", maxWidth: "62ch" }}>
                  The reading above is not an oracle. It is arithmetic on your own answers, and every score can be traced to what you said. Open a domain and check the work.
                </p>
                <AnswerDrilldown answers={answers} scores={scores} />
                <p style={{ ...mutedText, fontSize: "13px", marginTop: "12px", maxWidth: "62ch" }}>
                  Reverse-scored statements count the other way. On those, the more often, the greater the warning.
                </p>
              </div>
            </section>

            {/* The long view */}
            <section className="fi-screen" style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
              <div style={wrap}>
                <div className="eyebrow" style={{ marginBottom: "10px" }}>The long view</div>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.6vw, 36px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "12px" }}>
                  What the retakes show
                </h2>
                {runs.length >= 2 ? (
                  <TrendView runs={runs} />
                ) : (
                  <p style={{ ...bodyText, maxWidth: "62ch" }}>
                    One reading is a point, not a line. The trend begins the second time you take this, and the second time is due {fmtDate(nextDue)}. Come back then. This browser will remember.
                  </p>
                )}
              </div>
            </section>

            {/* Print document. Hidden on screen; the whole page when printed. */}
            <div className="fi-print">
              <h1>The Leadership Formation Inventory</h1>
              <p className="fi-print-meta">
                Taken {fmtDate(new Date())}. Scored in the browser; nothing left the device.
              </p>
              <p style={{ fontFamily: "var(--F)", fontSize: "14pt", lineHeight: 1.4 }}>{verdictFor(scores)}</p>

              <h2>Character, read first</h2>
              {CHARACTER_DOMAINS.map((d) => {
                const delta = formatDelta(previous?.scores[d.id], scores[d.id]);
                return (
                  <div key={d.id} className="fi-print-row">
                    <span>{d.name}</span>
                    <span>
                      {scores[d.id].toFixed(1)} / 5{delta ? ` (${delta})` : ""}
                    </span>
                  </div>
                );
              })}

              <h2>Where formation starts</h2>
              {lowestTwo.map((d) => (
                <div key={d.id} className="fi-print-block">
                  <h3>
                    {d.name}, {scores[d.id].toFixed(1)} / 5
                  </h3>
                  <p>{d.meaning}</p>
                  <p className="fi-print-label">Practices</p>
                  <ul>
                    {d.practices?.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                  <p className="fi-print-label">Reading</p>
                  <p>{d.books?.map((b) => `${b.title}, ${b.author}`).join(" · ")}</p>
                </div>
              ))}

              <h2>Capacity, second by design</h2>
              {CAPACITY_DOMAINS.map((d) => {
                const delta = formatDelta(previous?.scores[d.id], scores[d.id]);
                return (
                  <div key={d.id} className="fi-print-row">
                    <span>{d.name}</span>
                    <span>
                      {scores[d.id].toFixed(1)} / 5{delta ? ` (${delta})` : ""}
                    </span>
                  </div>
                );
              })}
              {lowestCapacity.note && (
                <p style={{ marginTop: "6pt" }}>
                  {lowestCapacity.name}: {lowestCapacity.note}
                </p>
              )}

              <p className="fi-print-foot">
                Next reading due {fmtDate(nextDue)}. Six months is long enough for the slow work to show.
                <br />
                livewellbyjamesbell.co/leadership/inventory
              </p>
            </div>
          </>
        );
      })()}
    </Layout>
  );
}

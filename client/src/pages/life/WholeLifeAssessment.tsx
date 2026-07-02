/**
 * The Whole-Life Assessment (/life/assessment). The annual life check-up of
 * the Integrated Life hub. Five domains, thirty statements, about eight
 * minutes, scored entirely in the browser. It maps where a life is
 * flourishing and where it is fragmented, hands back two places to begin and
 * a simple rule of life for the season — and then it keeps the rule: weekly
 * kept-or-missed check-ins, a year-over-year trajectory, and a printable
 * record. Run history persists to localStorage ("lw-whole-life", the
 * original array shape, untouched); the living rule persists separately
 * ("lw-whole-life-rule", versioned, read defensively). Flourishing, not
 * optimization. God is not grading anyone here.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const SCALE = ["Never", "Rarely", "Sometimes", "Often", "Always"] as const;
const STORAGE_KEY = "lw-whole-life";
const RULE_KEY = "lw-whole-life-rule";
const RULE_STORE_VERSION = 1;

/** The check-up is annual. */
const RETAKE_MONTHS = 12;
/** How old a run must be before the intro quietly says the year is up. */
const REMIND_MONTHS = 11;
/** A rule is drawn for a season. After this, the page suggests a new one. */
const RULE_SEASON_MONTHS = 3;
/** Most recent weeks visible in the check-in grid. */
const VISIBLE_WEEKS = 6;

interface Statement {
  id: string;
  text: string;
  /** Reverse-scored: "Always" on this statement is the wound, not the health. */
  reverse?: boolean;
}

interface Book {
  title: string;
  author: string;
}

interface Domain {
  id: string;
  name: string;
  framing: string;
  statements: Statement[];
  /** The pastoral reading shown when this domain is among the lowest two. */
  meaning: string;
  /**
   * Practice pool. practices[0] is the starting practice for this week when
   * the domain is among the lowest two, and the line this domain contributes
   * to the rule of life.
   */
  practices: string[];
  books: Book[];
}

const DOMAINS: Domain[] = [
  {
    id: "inner",
    name: "The Inner Life",
    framing: "What happens in you when no one is watching.",
    statements: [
      { id: "in1", text: "When I pray, I am talking to God, not performing for an audience I cannot see." },
      { id: "in2", text: "When grief or anger comes, I bring it to God plainly instead of cleaning it up first." },
      { id: "in3", text: "There are parts of my story I keep buried because I am ashamed of them.", reverse: true },
      { id: "in4", text: "The voice in my head talks to me the way a harsh critic would, not the way a good father would.", reverse: true },
      { id: "in5", text: "When doubt shows up, I say it out loud, to God or to someone I trust, instead of pretending it is not there." },
      { id: "in6", text: "There are moments in an ordinary week when I feel something I would honestly call joy." },
    ],
    meaning:
      "A low score here usually means the inner room has gone quiet, or gone harsh. Somewhere along the way prayer became a performance or stopped altogether, and the voice that narrates your days learned its tone from someone who should never have been teaching it. None of this disqualifies you. The Psalms are full of people whose inner lives were a mess, and God kept every one of their poems. The way back in is smaller than you think: honest words, said badly, to a God who has heard worse and stayed.",
    practices: [
      "Pray five minutes a day this week in your own words, badly if necessary. No script, no performance, nothing to show for it.",
      "Once a day, tell God the thing you actually feel before you tell him the thing you think you should feel.",
      "Keep one line a day of what gave you joy, however small, and read the list back on Sunday.",
    ],
    books: [
      { title: "Confessions", author: "Augustine" },
      { title: "Emotionally Healthy Spirituality", author: "Peter Scazzero" },
    ],
  },
  {
    id: "body",
    name: "The Body and the Rhythms",
    framing: "Sleep, rest, food, movement, attention.",
    statements: [
      { id: "bo1", text: "I sleep enough that the people who live with me meet a rested version of me." },
      { id: "bo2", text: "I keep one day a week that is genuinely different from the other six, a day of rest and not of catching up." },
      { id: "bo3", text: "I eat to soothe feelings I have not named, or to feel in control of something.", reverse: true },
      { id: "bo4", text: "I move my body most days, even if it is only a walk." },
      { id: "bo5", text: "I reach for my phone before I have been awake five minutes.", reverse: true },
      { id: "bo6", text: "I treat my limits, my energy, my hours, my age, as facts to receive rather than enemies to defeat." },
    ],
    meaning:
      "A low score here is rarely a discipline problem. It is usually about what the body has been asked to absorb: the missed sleep, the meals eaten standing up, the screen reached for before the day has even said good morning. Your body is not the obstacle to your spiritual life. It is the place where your spiritual life happens. Rest is not a reward for the productive. It is a gift offered to the tired, which is to say, to you, and receiving it badly still counts as receiving it.",
    practices: [
      "Pick a bedtime this week and keep it five nights out of seven. Treat sleep as trust, not as whatever is left over.",
      "Take one screen-free hour at the same time each day and notice what your attention does with the freedom.",
      "Walk twenty minutes a day without headphones and let the thinking happen on its own.",
    ],
    books: [
      { title: "The Ruthless Elimination of Hurry", author: "John Mark Comer" },
      { title: "Liturgy of the Ordinary", author: "Tish Harrison Warren" },
    ],
  },
  {
    id: "home",
    name: "The Home and Relationships",
    framing: "Whether you are known, or only around people.",
    statements: [
      { id: "ho1", text: "There is at least one person who knows the unedited version of my life." },
      { id: "ho2", text: "I have a friendship that goes deeper than schedules and scores, one where real things get said." },
      { id: "ho3", text: "When something is wrong between me and someone I love, I bring it up rather than waiting for it to pass." },
      { id: "ho4", text: "People who are not family eat at my table." },
      { id: "ho5", text: "I am lonelier than the people around me would ever guess.", reverse: true },
      { id: "ho6", text: "When I am with my family, I am actually with them, not half somewhere else." },
    ],
    meaning:
      "A low score here often means you are surrounded and unaccompanied. Plenty of people, no one who knows. The unedited version of your life has gone unspoken for so long that keeping it quiet can feel like safety, and it is not safety. It is only silence, and silence compounds. Being fully known is a risk, and it is the risk a human life was built for. You do not have to be known by everyone. You have to be known by someone, and that begins with one person and one true sentence.",
    practices: [
      "Tell one safe person one true thing this week that you have been editing out of the story.",
      "Invite someone to your table this week. The food does not matter. The invitation does.",
      "When you are with your family this week, leave the phone in another room and stay in the one you are in.",
    ],
    books: [
      { title: "The Gospel Comes with a House Key", author: "Rosaria Butterfield" },
    ],
  },
  {
    id: "work",
    name: "Work, Money, and Calling",
    framing: "What your labor and your ledger are doing to your soul.",
    statements: [
      { id: "wo1", text: "I can see how my ordinary work, on an ordinary Tuesday, matters to God." },
      { id: "wo2", text: "Work follows me into evenings and days off, in my hands or in my head.", reverse: true },
      { id: "wo3", text: "I give money away in amounts I actually feel." },
      { id: "wo4", text: "I catch myself believing the next purchase will finally settle something in me.", reverse: true },
      { id: "wo5", text: "Money I owe keeps me up at night or hums under my days as a quiet dread.", reverse: true },
      { id: "wo6", text: "The people I work with know what I believe without me hiding it or hammering them with it." },
    ],
    meaning:
      "A low score here usually means work and money have been carrying questions they were never built to answer: whether you matter, whether you are safe, whether you are enough. The ordinary work of your hands matters to God far more than the culture of achievement will ever admit, and money makes a useful servant and a merciless master. None of this is solved by a budget app or a better job. It is loosened by small acts of trust: one day off that actually holds, one gift given quietly, one honest look at the numbers with someone beside you.",
    practices: [
      "Give one gift this week that you will feel, to your church or to someone in need, and tell no one.",
      "Set a hard stop to one workday this week and let the unfinished work stay unfinished overnight.",
      "Before work each morning this week, offer the day's ordinary tasks to God in a single sentence.",
    ],
    books: [
      { title: "The Practice of the Presence of God", author: "Brother Lawrence" },
      { title: "The Treasure Principle", author: "Randy Alcorn" },
    ],
  },
  {
    id: "world",
    name: "The Life in the World",
    framing: "Neighbors, church, service, culture, creation.",
    statements: [
      { id: "wl1", text: "I know my nearest neighbors by name, and they know mine." },
      { id: "wl2", text: "I belong to a church in a way that would be missed, not just attend one." },
      { id: "wl3", text: "In an ordinary week, someone outside my own household is served by me." },
      { id: "wl4", text: "I take in shows, feeds, and news with some judgment about what they are doing to me." },
      { id: "wl5", text: "The people who know me outside church would be surprised to learn I am a Christian.", reverse: true },
      { id: "wl6", text: "I treat the created world, the ground, the food, the creatures, as something I answer for." },
    ],
    meaning:
      "A low score here usually means your life has drawn inward, the way most lives do now, with the neighbors unnamed, the church attended but not joined, and the world arriving mainly through a screen. This is not coldness in you. It is the shape modern life pours us into unless we resist it on purpose. The resistance is humbler than it sounds: a name learned, a meal shared, a small act of service repeated until it stops being a project and starts being who you are. The world does not need your platform. It needs your presence.",
    practices: [
      "Learn one neighbor's name this week, or use a name you already know in an actual conversation.",
      "Serve one person outside your household this week in a way that costs you something, even something small.",
      "After one show or one hour of the feed this week, ask a single question: what was that asking me to love.",
    ],
    books: [
      { title: "The Art of the Commonplace", author: "Wendell Berry" },
    ],
  },
];

const TOTAL_STATEMENTS = DOMAINS.reduce((n, d) => n + d.statements.length, 0);
const RESULTS_SCREEN = DOMAINS.length;

/* ------------------------------------------------------------------ */
/* Storage: run history (original shape, untouched)                    */
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
    if (Array.isArray(parsed)) {
      return parsed.filter(
        (e) => e && typeof e === "object" && typeof e.date === "string" && e.scores && typeof e.scores === "object"
      ) as RunEntry[];
    }
    return [];
  } catch {
    return [];
  }
}

function saveHistory(history: RunEntry[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch {
    // Storage unavailable. The assessment still works, it just forgets.
  }
}

/* ------------------------------------------------------------------ */
/* Storage: the living rule (new key, versioned, read defensively)     */
/* ------------------------------------------------------------------ */

type CheckState = "kept" | "missed";

interface RulePractice {
  /** Domain id at the time the rule was drawn. */
  domain: string;
  /** Domain name, snapshotted so old rules survive future content edits. */
  name: string;
  /** The practice line itself, snapshotted for the same reason. */
  text: string;
}

interface RuleEntry {
  /** ISO date of the attempt that drew this rule. One rule per attempt. */
  date: string;
  practices: RulePractice[];
  /** week-start key (YYYY-MM-DD, local Sunday) -> domain id -> kept/missed */
  checks: Record<string, Record<string, CheckState>>;
}

function isRulePractice(p: unknown): p is RulePractice {
  if (!p || typeof p !== "object") return false;
  const c = p as Partial<RulePractice>;
  return typeof c.domain === "string" && typeof c.name === "string" && typeof c.text === "string";
}

function normalizeChecks(raw: unknown): RuleEntry["checks"] {
  if (!raw || typeof raw !== "object") return {};
  const out: RuleEntry["checks"] = {};
  for (const [week, marks] of Object.entries(raw as Record<string, unknown>)) {
    if (!marks || typeof marks !== "object") continue;
    const clean: Record<string, CheckState> = {};
    for (const [domain, state] of Object.entries(marks as Record<string, unknown>)) {
      if (state === "kept" || state === "missed") clean[domain] = state;
    }
    if (Object.keys(clean).length > 0) out[week] = clean;
  }
  return out;
}

/**
 * The v1 store is { v: 1, rules: RuleEntry[] }. A bare array is accepted too,
 * and every entry is checked field by field, so a corrupted or older shape
 * degrades to "no rule yet" instead of a crash. Run history is a separate key
 * and is never touched by any of this.
 */
function loadRules(): RuleEntry[] {
  try {
    const raw = window.localStorage.getItem(RULE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    const list: unknown[] = Array.isArray(parsed)
      ? parsed
      : parsed && typeof parsed === "object" && Array.isArray((parsed as { rules?: unknown }).rules)
        ? ((parsed as { rules: unknown[] }).rules)
        : [];
    const rules: RuleEntry[] = [];
    for (const entry of list) {
      if (!entry || typeof entry !== "object") continue;
      const e = entry as Partial<RuleEntry>;
      if (typeof e.date !== "string" || !Array.isArray(e.practices)) continue;
      const practices = e.practices.filter(isRulePractice);
      if (practices.length === 0) continue;
      rules.push({ date: e.date, practices, checks: normalizeChecks(e.checks) });
    }
    return rules;
  } catch {
    return [];
  }
}

function saveRules(rules: RuleEntry[]) {
  try {
    window.localStorage.setItem(RULE_KEY, JSON.stringify({ v: RULE_STORE_VERSION, rules }));
  } catch {
    // Storage unavailable. The rule still renders, it just forgets.
  }
}

/* ------------------------------------------------------------------ */
/* Weeks: the grid the rule is kept on                                 */
/* ------------------------------------------------------------------ */

/** Local week-start key (Sunday) for a given date, as YYYY-MM-DD. */
function weekKeyFor(input: Date): string {
  const d = new Date(input);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - d.getDay());
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function weekLabel(key: string): string {
  const d = new Date(`${key}T00:00:00`);
  if (Number.isNaN(d.getTime())) return key;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

/** Week-start keys from the rule's drawing to now, most recent `max` kept. */
function weeksSince(rule: RuleEntry, max = VISIBLE_WEEKS): string[] {
  const start = new Date(rule.date);
  const from = Number.isNaN(start.getTime()) ? new Date() : start;
  const keys: string[] = [];
  const cursor = new Date(`${weekKeyFor(from)}T00:00:00`);
  const last = new Date(`${weekKeyFor(new Date())}T00:00:00`);
  while (cursor.getTime() <= last.getTime() && keys.length < 520) {
    keys.push(weekKeyFor(cursor));
    cursor.setDate(cursor.getDate() + 7);
  }
  if (keys.length === 0) keys.push(weekKeyFor(new Date()));
  return keys.slice(-max);
}

/* ------------------------------------------------------------------ */
/* Dates: the annual rhythm                                            */
/* ------------------------------------------------------------------ */

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

function overallAverage(scores: Record<string, number>): number {
  return DOMAINS.reduce((n, d) => n + (scores[d.id] ?? 0), 0) / DOMAINS.length;
}

function verdictFor(scores: Record<string, number>): string {
  const avg = overallAverage(scores);
  if (avg >= 4) {
    return "Much of your life is holding together, and that is grace before it is achievement. The work now is gratitude with its sleeves rolled up: tend what is whole, and stay close to the rooms that still ache.";
  }
  if (avg >= 3) {
    return "Parts of your life are flourishing and parts are running on fumes, which makes you human, not failing. A life is not repaired all at once. It is mended one room at a time, and two rooms are named below.";
  }
  return "You are carrying more fragmentation than anyone should carry alone, and the first thing to hear is that God is not disappointed in you. A scattered life is not a verdict. It is a starting place, and small practices move it further than you would believe.";
}

function sortedByScore(scores: Record<string, number>): Domain[] {
  return [...DOMAINS].sort((a, b) => (scores[a.id] ?? 0) - (scores[b.id] ?? 0));
}

function formatDelta(prev: number | undefined, cur: number): string | null {
  if (prev === undefined || prev === null || Number.isNaN(prev)) return null;
  const delta = cur - prev;
  const sign = delta >= 0 ? "+" : "";
  return `last time ${prev.toFixed(1)}, now ${cur.toFixed(1)} (${sign}${delta.toFixed(1)})`;
}

function buildRuleText(scores: Record<string, number>): string {
  const ordered = sortedByScore(scores);
  const lines: string[] = [];
  lines.push("A rule for this season");
  lines.push(`Drawn up ${new Date().toLocaleDateString()} from the Whole-Life Assessment`);
  lines.push("");
  for (const d of ordered) {
    lines.push(`${d.name}:`);
    lines.push(`  ${d.practices[0]}`);
    lines.push("");
  }
  lines.push("One practice per domain. Kept imperfectly. Kept anyway.");
  return lines.join("\n");
}

/** A complete set of 1..5 scores for every domain; older or corrupted entries fail quietly. */
function scoresComplete(s: Record<string, number> | null | undefined): s is Record<string, number> {
  return (
    !!s &&
    DOMAINS.every((d) => {
      const v = s[d.id];
      return typeof v === "number" && Number.isFinite(v) && v >= 1 && v <= 5;
    })
  );
}

/**
 * Runs that can be charted: a real date and a real score for every domain.
 * Anything a corrupted or older localStorage entry left short is skipped,
 * not crashed on. Reading history stays untouched either way.
 */
function chartableRuns(history: RunEntry[]): RunEntry[] {
  return history.filter((e) => !Number.isNaN(new Date(e.date).getTime()) && scoresComplete(e.scores));
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

const h2Style = {
  fontFamily: "var(--F)", fontSize: "clamp(26px, 3.6vw, 36px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)",
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
  const overall = runs.map((r) => overallAverage(r.scores));
  const labelIdx =
    n <= 4
      ? runs.map((_, i) => i)
      : Array.from(new Set([0, Math.round((n - 1) / 3), Math.round(((n - 1) * 2) / 3), n - 1]));
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: "100%", height: "auto", display: "block" }}
      role="img"
      aria-label={`Whole-life average across ${n} check-ups, ${fmtDate(runs[0].date)} to ${fmtDate(runs[n - 1].date)}. It moved from ${overall[0].toFixed(1)} to ${overall[n - 1].toFixed(1)} out of 5.`}
    >
      {[1, 2, 3, 4, 5].map((v) => (
        <g key={v}>
          <line x1={padL} y1={y(v)} x2={W - padR} y2={y(v)} stroke="var(--border)" strokeWidth={1} />
          <text x={padL - 8} y={y(v) + 4} textAnchor="end" fontSize={11} fontFamily="var(--U)" fill="var(--ink-muted)">
            {v}
          </text>
        </g>
      ))}
      <polyline
        points={overall.map((v, i) => `${x(i).toFixed(1)},${y(v).toFixed(1)}`).join(" ")}
        fill="none"
        stroke="var(--ink)"
        strokeWidth={2}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {overall.map((v, i) => (
        <circle key={i} cx={x(i)} cy={y(v)} r={3.5} fill="var(--mustard)" stroke="var(--ink)" strokeWidth={1} />
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
  return (
    <div>
      <p style={{ ...mutedText, marginBottom: "var(--s-3)", maxWidth: "62ch" }}>
        {runs.length} check-ups, {fmtDate(runs[0].date)} to {fmtDate(runs[runs.length - 1].date)}. The line does not grade you. It shows what the years of ordinary weeks have actually done, room by room.
      </p>
      <TrajectoryChart runs={runs} />
      <div style={{ display: "flex", gap: "18px", flexWrap: "wrap", marginTop: "10px", marginBottom: "var(--s-4)" }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: "8px", ...mutedText, fontSize: "12px" }}>
          <span aria-hidden="true" style={{ width: "18px", borderTop: "2px solid var(--ink)", display: "inline-block" }} />
          Whole-life average, all five domains
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
              <div style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "12px", color: "var(--ink)", marginBottom: "6px" }}>{d.name}</div>
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
/* The living rule: week-by-week check-ins                             */
/* ------------------------------------------------------------------ */

function RuleCheckIns({ rule, onToggle }: { rule: RuleEntry; onToggle: (week: string, domain: string) => void }) {
  const weeks = weeksSince(rule);
  const thisWeek = weekKeyFor(new Date());
  return (
    <div>
      {rule.practices.map((p, pi) => (
        <div key={p.domain} style={{ padding: pi === 0 ? "0 0 14px" : "14px 0", borderTop: pi === 0 ? "none" : "1px solid var(--border)" }}>
          <div style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px", color: "var(--ink)", marginBottom: "4px" }}>{p.name}</div>
          <p style={{ ...bodyText, fontSize: "15px", marginBottom: "10px" }}>{p.text}</p>
          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }} role="group" aria-label={`Weekly check-ins for ${p.name}`}>
            {weeks.map((w) => {
              const state = rule.checks[w]?.[p.domain];
              const isNow = w === thisWeek;
              const word = state === "kept" ? "kept" : state === "missed" ? "missed" : "not marked";
              return (
                <button
                  key={w}
                  type="button"
                  className="wla-week"
                  onClick={() => onToggle(w, p.domain)}
                  aria-label={`${p.name}, week of ${weekLabel(w)}${isNow ? ", this week" : ""}: ${word}. Select to change.`}
                  style={{
                    flex: "1 1 0", minWidth: "46px", maxWidth: "76px", minHeight: "48px",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "3px",
                    fontFamily: "var(--U)", fontWeight: 600, cursor: "pointer",
                    borderRadius: "var(--radius-sm)",
                    border: "1px solid " + (state === "kept" ? "var(--mustard)" : isNow ? "var(--ink-muted)" : "var(--border)"),
                    background: state === "kept" ? "var(--mustard)" : "var(--card)",
                    color: state === "kept" ? "var(--charcoal)" : "var(--ink-muted)",
                  }}
                >
                  <span style={{ fontSize: "10px", letterSpacing: "0.04em" }}>{isNow ? "Now" : weekLabel(w)}</span>
                  <span aria-hidden="true" style={{ fontSize: "14px", lineHeight: 1 }}>
                    {state === "kept" ? "✓" : state === "missed" ? "✕" : "·"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <p style={{ ...mutedText, fontSize: "12px", marginTop: "4px" }}>
        Select a week once for kept, twice for missed, a third time to clear it. A missed week is information, not a verdict.
      </p>
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
        <details key={d.id} className="wla-acc" style={{ borderTop: i === 0 ? "none" : "1px solid var(--border)" }}>
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
/* Print document: hidden on screen, the whole page when printed       */
/* ------------------------------------------------------------------ */

function PrintDocument({
  scores,
  takenIso,
  previous,
  rule,
  nextDue,
}: {
  scores: Record<string, number> | null;
  takenIso: string;
  previous: RunEntry | null;
  rule: RuleEntry | null;
  nextDue: Date;
}) {
  const s = scoresComplete(scores) ? scores : null;
  const lowestTwo = s ? sortedByScore(s).slice(0, 2) : [];
  const ruleWeeks = rule ? weeksSince(rule) : [];
  return (
    <div className="wla-print">
      <h1>The Whole-Life Assessment</h1>
      <p className="wla-print-meta">Taken {fmtDate(takenIso) || "on this device"}. Scored in the browser; nothing left the device.</p>

      {s && (
        <>
          <p style={{ fontFamily: "var(--F)", fontSize: "14pt", lineHeight: 1.4 }}>{verdictFor(s)}</p>

          <h2>The map</h2>
          {DOMAINS.map((d) => {
            const delta = formatDelta(previous?.scores[d.id], s[d.id]);
            return (
              <div key={d.id} className="wla-print-row">
                <span>{d.name}</span>
                <span>
                  {s[d.id].toFixed(1)} / 5{delta ? ` (${delta})` : ""}
                </span>
              </div>
            );
          })}

          {(s["inner"] ?? 5) < 3 && (
            <div className="wla-print-block" style={{ marginTop: "8pt" }}>
              <p>
                One more word, and it is not a footnote. Your inner life scored low, and when the inside of a life has felt heavy for a long stretch, that weight can be depression or anxiety. Those are medical realities, not spiritual failures, and they do not respond to trying harder. Seeing a doctor or a licensed counselor is wisdom, not weakness. The God who heals through prayer also heals through good medicine and good people, and he is not less present in a waiting room.
              </p>
              <p>And if you are in crisis right now, set this page down and call or text 988. You are worth that call.</p>
            </div>
          )}

          <h2>Where to begin</h2>
          {lowestTwo.map((d) => (
            <div key={d.id} className="wla-print-block">
              <h3>
                {d.name}, {s[d.id].toFixed(1)} / 5
              </h3>
              <p>{d.meaning}</p>
              <p className="wla-print-label">Start this week</p>
              <p>{d.practices[0]}</p>
              <p className="wla-print-label">Reading</p>
              <p>{d.books.map((b) => `${b.title}, ${b.author}`).join(" · ")}</p>
            </div>
          ))}
        </>
      )}

      {rule && (
        <>
          <h2>A rule for this season</h2>
          <p className="wla-print-meta">
            Drawn {fmtDate(rule.date) || "from your last check-up"}. One practice per domain, the lowest rooms first. Kept imperfectly. Kept anyway.
          </p>
          {rule.practices.map((p) => {
            const marked = ruleWeeks.filter((w) => rule.checks[w]?.[p.domain]);
            return (
              <div key={p.domain} className="wla-print-block">
                <h3>{p.name}</h3>
                <p>{p.text}</p>
                <p className="wla-print-label">The weeks</p>
                <p>
                  {marked.length === 0
                    ? "No weeks marked yet."
                    : ruleWeeks.map((w) => `${weekLabel(w)}: ${rule.checks[w]?.[p.domain] ?? "unmarked"}`).join(" · ")}
                </p>
              </div>
            );
          })}
        </>
      )}

      <p className="wla-print-foot">
        Next check-up due {fmtDate(nextDue) || "a year from your last one"}. A year is long enough for the slow work to show.
        <br />
        livewellbyjamesbell.co/life/assessment
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function WholeLifeAssessment() {
  // -1 = intro, 0..4 = one domain per screen, 5 = results.
  const [screen, setScreen] = useState(-1);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [history, setHistory] = useState<RunEntry[]>(() => loadHistory());
  const [rules, setRules] = useState<RuleEntry[]>(() => loadRules());
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
    const now = new Date().toISOString();
    const entry: RunEntry = { date: now, scores };
    const next = [...prior, entry];
    setHistory(next);
    saveHistory(next);
    // Draw the rule for this season and keep it, versioned by attempt date.
    const rule: RuleEntry = {
      date: now,
      practices: sortedByScore(scores).map((d) => ({ domain: d.id, name: d.name, text: d.practices[0] })),
      checks: {},
    };
    const nextRules = [...loadRules(), rule];
    setRules(nextRules);
    saveRules(nextRules);
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
    if (!window.confirm("Clear your check-up history and your rule of life from this browser? Your current results stay on screen.")) return;
    setHistory([]);
    setRules([]);
    setPrevious(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(RULE_KEY);
    } catch {
      // Nothing to clear if storage is unavailable.
    }
  };

  const copyRule = async () => {
    const text = buildRuleText(scores);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      window.prompt("Copy your rule for this season:", text);
    }
  };

  /** Mark a week for one practice: unmarked -> kept -> missed -> unmarked. */
  const toggleCheck = (week: string, domain: string) => {
    setRules((prev) => {
      if (prev.length === 0) return prev;
      const next = prev.slice();
      const rule = next[next.length - 1];
      const weekMarks: Record<string, CheckState> = { ...(rule.checks[week] ?? {}) };
      const cur = weekMarks[domain];
      if (cur === undefined) weekMarks[domain] = "kept";
      else if (cur === "kept") weekMarks[domain] = "missed";
      else delete weekMarks[domain];
      const checks = { ...rule.checks };
      if (Object.keys(weekMarks).length > 0) checks[week] = weekMarks;
      else delete checks[week];
      next[next.length - 1] = { ...rule, checks };
      saveRules(next);
      return next;
    });
  };

  const lastRun = history.length > 0 ? history[history.length - 1] : null;
  const runs = useMemo(() => chartableRuns(history), [history]);
  const activeRule = rules.length > 0 ? rules[rules.length - 1] : null;
  const checkupDue = lastRun !== null && new Date() >= addMonths(lastRun.date, REMIND_MONTHS);
  const ruleStale = activeRule !== null && new Date() >= addMonths(activeRule.date, RULE_SEASON_MONTHS);
  const nextDue = addMonths(lastRun ? lastRun.date : new Date().toISOString(), RETAKE_MONTHS);

  return (
    <Layout>
      <SEOMeta
        title="The Whole-Life Assessment — The Annual Life Check-Up"
        description="Thirty honest statements across five domains, taken once a year: the inner life, the body, the home, the work, the world. Scored in your browser, with a rule of life you keep week by week."
        url="https://www.livewellbyjamesbell.co/life/assessment"
      />

      {/* Focus rings, the drilldown accordion, and the print sheet; everything else is inline. */}
      <style>{`
        .wla-opt input{position:absolute;opacity:0;width:1px;height:1px;margin:0}
        .wla-opt input:focus-visible + span{outline:2px solid var(--mustard);outline-offset:2px}
        .wla-week:focus-visible{outline:2px solid var(--mustard);outline-offset:2px}
        .wla-acc > summary{list-style:none}
        .wla-acc > summary::-webkit-details-marker{display:none}
        .wla-acc > summary::after{content:"+";font-family:var(--U);font-size:16px;line-height:1;color:var(--ink-muted)}
        .wla-acc[open] > summary::after{content:"\\2212"}
        .wla-acc > summary:focus-visible{outline:2px solid var(--mustard);outline-offset:-2px}
        .wla-print{display:none}
        @media print{
          nav, footer, .skip-link, .wla-screen{display:none !important}
          .wla-print{display:block !important;color:#000;background:#fff;font-family:var(--B);font-size:11pt;line-height:1.55;padding:0}
          .wla-print h1{font-family:var(--F);font-weight:400;font-size:22pt;letter-spacing:-0.02em;margin:0 0 4pt}
          .wla-print h2{font-family:var(--F);font-weight:500;font-size:15pt;margin:16pt 0 6pt;page-break-after:avoid}
          .wla-print h3{font-family:var(--F);font-weight:500;font-size:12.5pt;margin:10pt 0 3pt;page-break-after:avoid}
          .wla-print p{margin:0 0 6pt;max-width:none}
          .wla-print .wla-print-meta{font-size:9.5pt;color:#333;margin-bottom:10pt}
          .wla-print .wla-print-label{font-family:var(--U);font-weight:600;font-size:9pt;text-transform:uppercase;letter-spacing:0.08em;margin:6pt 0 2pt}
          .wla-print .wla-print-row{display:flex;justify-content:space-between;gap:12pt;border-bottom:0.5pt solid #999;padding:3pt 0;page-break-inside:avoid}
          .wla-print .wla-print-block{page-break-inside:avoid;margin-bottom:10pt}
          .wla-print .wla-print-foot{margin-top:14pt;padding-top:6pt;border-top:0.5pt solid #999;font-size:9.5pt;color:#333}
        }
      `}</style>

      {/* Hero */}
      <section className="wla-screen" style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={heroWrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/life" style={{ color: "inherit" }}>Integrated Life</Link> · The annual life check-up
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>
            The Whole-Life Assessment
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "60ch" }}>
            Where is your life flourishing, and where has it quietly come apart? Thirty statements, once a year. One honest map.
          </p>
        </div>
      </section>

      {/* ------------------------------ Intro ------------------------------ */}
      {screen === -1 && (
        <section className="wla-screen" style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
          <div style={wrap}>
            {lastRun && checkupDue && (
              <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderLeft: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "14px 16px", marginBottom: "var(--s-4)" }}>
                <p style={{ ...bodyText, fontSize: "15px" }}>
                  You last took this on {fmtDate(lastRun.date)}. The year is up, or close to it. Take it again and lay the new map against the old one.
                </p>
              </div>
            )}

            <p style={{ ...bodyText, marginBottom: "14px" }}>
              This is not a scorecard, and God is not grading you. He already knows the state of every room in your house and he has not left. What this assessment offers is a map: thirty statements about an ordinary life, read honestly, showing you where things are flourishing and where they have gone quiet.
            </p>
            <p style={{ ...bodyText, marginBottom: "14px" }}>
              Five domains, six statements each, about eight minutes. The inner life. The body and its rhythms. The home and its relationships. Work, money, and calling. The life you live in the world. None of these is the spiritual part of your life, because there is no spiritual part. There is one life, and all of it is where God meets you.
            </p>
            <p style={{ ...bodyText, marginBottom: "14px" }}>
              It is built as an annual check-up. Once a year, the same thirty statements, and a new map to lay against the old one. Between check-ups the work is smaller and weekly: the rule of life your results draw up, one practice per domain, marked kept or missed as the weeks pass. This page keeps both, the map and the rule, and asks for neither more often than it should.
            </p>
            <p style={{ ...bodyText, marginBottom: "14px" }}>
              Answer the way you would at midnight, not the way you would in a small group. Nothing leaves this browser. No account, no server, no one reading over your shoulder. Your results, and your history if you come back to it later, live on this device and nowhere else.
            </p>

            {lastRun && (
              <p style={{ ...mutedText, marginBottom: "14px" }}>
                You have taken this {history.length === 1 ? "once" : `${history.length} times`}, most recently on {new Date(lastRun.date).toLocaleDateString()}. Your results will show what has moved since then.
              </p>
            )}

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "var(--s-3)" }}>
              <button onClick={() => setScreen(0)} style={primaryBtn}>Begin the assessment</button>
              {(history.length > 0 || rules.length > 0) && (
                <button onClick={clearHistory} style={quietBtn}>Clear history</button>
              )}
            </div>

            {/* The living rule: what the last check-up handed back, kept weekly. */}
            {activeRule && (
              <div style={{ marginTop: "var(--s-5)", borderTop: "1px solid var(--border)", paddingTop: "var(--s-4)" }}>
                <div className="eyebrow" style={{ marginBottom: "10px" }}>The living rule</div>
                <h2 style={{ ...h2Style, marginBottom: "12px" }}>Your rule for this season</h2>
                <p style={{ ...bodyText, marginBottom: "var(--s-3)", maxWidth: "62ch" }}>
                  Drawn {fmtDate(activeRule.date) || "from your last check-up"}, the lowest rooms first. The assessment is annual. The rule is weekly, and the weeks are where it lives or does not.
                </p>
                {ruleStale && (
                  <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderLeft: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "12px 16px", marginBottom: "var(--s-3)" }}>
                    <p style={{ ...bodyText, fontSize: "15px" }}>
                      This rule was drawn for a season, and the season has turned. Keep whatever took root, and when you are ready, retake the assessment and draw the next one.
                    </p>
                  </div>
                )}
                <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)" }}>
                  <RuleCheckIns rule={activeRule} onToggle={toggleCheck} />
                </div>
                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "var(--s-3)" }}>
                  <button onClick={() => window.print()} style={quietBtn}>Print your rule</button>
                </div>
              </div>
            )}

            {/* The long view, for anyone with two or more years behind them. */}
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
        const answeredHere = domain.statements.filter((s) => answers[s.id]).length;
        const complete = answeredHere === domain.statements.length;
        const isLast = screen === RESULTS_SCREEN - 1;
        const answeredTotal = DOMAINS.flatMap((d) => d.statements).filter((s) => answers[s.id]).length;

        return (
          <section className="wla-screen" style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
            <div style={wrap}>
              {/* Progress dots across domains */}
              <div style={{ marginBottom: "var(--s-4)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
                  <span className="eyebrow">Domain {screen + 1} of {DOMAINS.length}</span>
                  <span style={{ ...mutedText, fontSize: "12px" }}>{answeredTotal} of {TOTAL_STATEMENTS} answered</span>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }} aria-hidden="true">
                  {DOMAINS.map((d, i) => (
                    <span
                      key={d.id}
                      style={{
                        width: "10px", height: "10px", borderRadius: "50%",
                        background: i < screen ? "var(--mustard)" : i === screen ? "var(--mustard-text)" : "transparent",
                        border: "1px solid " + (i <= screen ? "var(--mustard)" : "var(--border)"),
                      }}
                    />
                  ))}
                </div>
              </div>

              <h2 style={{ ...h2Style, marginBottom: "6px" }}>{domain.name}</h2>
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
                        <label key={val} className="wla-opt" style={{ flex: "1 1 0", minWidth: "88px", position: "relative", cursor: "pointer" }}>
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
                    : isLast ? "See the map" : "Continue"}
                </button>
              </div>
            </div>
          </section>
        );
      })()}

      {/* ------------------------------ Results ------------------------------ */}
      {screen === RESULTS_SCREEN && (() => {
        const ordered = sortedByScore(scores);
        const lowestTwo = ordered.slice(0, 2);
        const innerLow = (scores["inner"] ?? 5) < 3;

        return (
          <>
            {/* Verdict */}
            <section className="wla-screen" style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
              <div style={wrap}>
                <div style={{ background: "var(--charcoal)", color: "var(--bone)", borderRadius: "var(--radius-sm)", padding: "var(--s-5)", borderTop: "3px solid var(--mustard)" }}>
                  <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "10px" }}>What the map says</div>
                  <p style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 2.8vw, 26px)", fontWeight: 500, lineHeight: 1.45, color: "var(--bone)" }}>
                    {verdictFor(scores)}
                  </p>
                </div>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "var(--s-3)" }}>
                  <button onClick={() => window.print()} style={quietBtn}>Print your results</button>
                  <button onClick={retake} style={quietBtn}>Retake the assessment</button>
                  {history.length > 0 && <button onClick={clearHistory} style={quietBtn}>Clear history</button>}
                </div>
                {previous && (
                  <p style={{ ...mutedText, fontSize: "13px", marginTop: "12px" }}>
                    Compared against your last run on {new Date(previous.date).toLocaleDateString()}.
                  </p>
                )}
                <p style={{ ...mutedText, fontSize: "13px", marginTop: previous ? "4px" : "12px" }}>
                  Your next check-up is due {fmtDate(nextDue) || "a year from now"}. A year is long enough for a life to drift, and short enough to catch it.
                </p>
              </div>
            </section>

            {/* The five domains */}
            <section className="wla-screen" style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" }}>
              <div style={wrap}>
                <div className="eyebrow" style={{ marginBottom: "10px" }}>Five domains, one life</div>
                <h2 style={{ ...h2Style, marginBottom: "var(--s-4)" }}>
                  The map
                </h2>
                {DOMAINS.map((d) => {
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

            {/* Mental health guardrail */}
            {innerLow && (
              <section className="wla-screen" style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) 0" }}>
                <div style={wrap}>
                  <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderLeft: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)" }}>
                    <p style={{ ...bodyText, marginBottom: "10px" }}>
                      One more word before the map, and it is not a footnote. Your inner life scored low, and when the inside of a life has felt heavy for a long stretch, that weight can be depression or anxiety. Those are medical realities, not spiritual failures, and they do not respond to trying harder. Seeing a doctor or a licensed counselor is wisdom, not weakness. The God who heals through prayer also heals through good medicine and good people, and he is not less present in a waiting room.
                    </p>
                    <p style={{ ...bodyText }}>
                      And if you are in crisis right now, set this page down and call or text 988. You are worth that call.
                    </p>
                  </div>
                </div>
              </section>
            )}

            {/* Where to begin */}
            <section className="wla-screen" style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
              <div style={wrap}>
                <div className="eyebrow" style={{ marginBottom: "10px" }}>The lowest two domains</div>
                <h2 style={{ ...h2Style, marginBottom: "12px" }}>
                  Where to begin
                </h2>
                <p style={{ ...bodyText, marginBottom: "var(--s-4)", maxWidth: "62ch" }}>
                  Not where you are worst. Where the door is. These two domains scored lowest, which makes them the place to start, not the evidence against you.
                </p>

                {lowestTwo.map((d) => (
                  <div key={d.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderTop: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)", marginBottom: "var(--s-3)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "10px" }}>
                      <h3 style={{ fontFamily: "var(--F)", fontSize: "24px", fontWeight: 500, color: "var(--ink)" }}>{d.name}</h3>
                      <span style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px", color: "var(--ink-muted)" }}>{scores[d.id].toFixed(1)} / 5</span>
                    </div>
                    <p style={{ ...bodyText, marginBottom: "var(--s-3)" }}>{d.meaning}</p>

                    <div className="eyebrow" style={{ marginBottom: "8px" }}>Start this week</div>
                    <p style={{ ...bodyText, fontSize: "15px", marginBottom: "var(--s-3)" }}>{d.practices[0]}</p>

                    <div className="eyebrow" style={{ marginBottom: "8px" }}>Reading</div>
                    {d.books.map((b, i) => (
                      <p key={i} style={{ ...bodyText, fontSize: "15px", marginBottom: "4px" }}>
                        <em>{b.title}</em><span style={{ color: "var(--ink-muted)" }}>, {b.author}</span>
                      </p>
                    ))}
                  </div>
                ))}
              </div>
            </section>

            {/* A rule for this season */}
            <section className="wla-screen" style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" }}>
              <div style={wrap}>
                <div className="eyebrow" style={{ marginBottom: "10px" }}>One practice per domain</div>
                <h2 style={{ ...h2Style, marginBottom: "12px" }}>
                  A rule for this season
                </h2>
                <p style={{ ...bodyText, marginBottom: "var(--s-4)", maxWidth: "62ch" }}>
                  A rule of life is not a regimen. It is a trellis, something for a life to grow along. Here is a simple one drawn from your map, the lowest domains first because that is where the tending starts. Keep it imperfectly. Keep it anyway. Under each practice sits the week now in front of you: mark it kept or missed as it passes, and when you come back to this page, the weeks will be waiting.
                </p>

                <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)", marginBottom: "var(--s-3)" }}>
                  {activeRule ? (
                    <RuleCheckIns rule={activeRule} onToggle={toggleCheck} />
                  ) : (
                    ordered.map((d) => (
                      <div key={d.id} style={{ marginBottom: "var(--s-3)" }}>
                        <div style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px", color: "var(--ink)", marginBottom: "4px" }}>{d.name}</div>
                        <p style={{ ...bodyText, fontSize: "15px" }}>{d.practices[0]}</p>
                      </div>
                    ))
                  )}
                  <button onClick={copyRule} style={{ ...primaryBtn, marginTop: "var(--s-3)" }}>{copied ? "Copied" : "Copy this rule"}</button>
                </div>

                <p style={{ ...mutedText, fontStyle: "italic", marginTop: "var(--s-4)", borderTop: "1px solid var(--border)", paddingTop: "var(--s-3)" }}>
                  Nothing here was sent anywhere. Come back to this page and it will remember: the rule week by week, the map year by year.
                </p>

                {/* Eight-week plan CTA */}
                <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderTop: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)", marginTop: "var(--s-4)" }}>
                  <div className="eyebrow" style={{ marginBottom: "8px" }}>Your next step</div>
                  <p style={{ ...bodyText, marginBottom: "var(--s-3)", maxWidth: "62ch" }}>
                    The rule names the practices. The eight-week plan walks them with you, one week at a time.
                  </p>
                  <Link
                    href="/plans/whole-life"
                    style={{ ...primaryBtn, display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}
                  >
                    Start the eight-week plan
                  </Link>
                </div>
              </div>
            </section>

            {/* Statement by statement */}
            <section className="wla-screen" style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
              <div style={wrap}>
                <div className="eyebrow" style={{ marginBottom: "10px" }}>The arithmetic</div>
                <h2 style={{ ...h2Style, marginBottom: "12px" }}>
                  Statement by statement
                </h2>
                <p style={{ ...bodyText, marginBottom: "var(--s-4)", maxWidth: "62ch" }}>
                  No oracle produced the map above. It is your own answers, added together, and every score traces back to something you said. Open a domain and see.
                </p>
                <AnswerDrilldown answers={answers} scores={scores} />
                <p style={{ ...mutedText, fontSize: "13px", marginTop: "12px", maxWidth: "62ch" }}>
                  Reverse-scored statements count the other way. On those, the more often, the heavier the finding.
                </p>
              </div>
            </section>

            {/* The long view */}
            <section className="wla-screen" style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
              <div style={wrap}>
                <div className="eyebrow" style={{ marginBottom: "10px" }}>The long view</div>
                <h2 style={{ ...h2Style, marginBottom: "12px" }}>
                  Year over year
                </h2>
                {runs.length >= 2 ? (
                  <TrendView runs={runs} />
                ) : (
                  <p style={{ ...bodyText, maxWidth: "62ch" }}>
                    One check-up is a point, not a line. The line begins the second time you take this, and the second one is due {fmtDate(nextDue) || "a year from now"}. Come back then. This browser will remember.
                  </p>
                )}
              </div>
            </section>
          </>
        );
      })()}

      {/* Print document: results when they are on screen, otherwise the last
          saved check-up and the living rule. Hidden until window.print(). */}
      {(screen === RESULTS_SCREEN || (screen === -1 && (activeRule !== null || lastRun !== null))) && (
        <PrintDocument
          scores={screen === RESULTS_SCREEN ? scores : lastRun ? lastRun.scores : null}
          takenIso={screen === RESULTS_SCREEN ? new Date().toISOString() : (lastRun?.date ?? activeRule?.date ?? new Date().toISOString())}
          previous={screen === RESULTS_SCREEN ? previous : history.length >= 2 ? history[history.length - 2] : null}
          rule={activeRule}
          nextDue={nextDue}
        />
      )}
    </Layout>
  );
}

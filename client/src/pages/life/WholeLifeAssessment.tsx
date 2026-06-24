/**
 * The Whole-Life Assessment (/life/assessment). The flagship tool of the
 * Integrated Life hub. Five domains, thirty statements, about eight minutes,
 * scored entirely in the browser. It maps where a life is flourishing and
 * where it is fragmented, then hands back two places to begin and a simple
 * rule of life for the season. History persists to localStorage
 * ("lw-whole-life") so it can be retaken and compared. Flourishing, not
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
/* Component                                                           */
/* ------------------------------------------------------------------ */

export default function WholeLifeAssessment() {
  // -1 = intro, 0..4 = one domain per screen, 5 = results.
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
    if (!window.confirm("Clear your assessment history from this browser? Your current results stay on screen.")) return;
    setHistory([]);
    setPrevious(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
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

  const lastRun = history.length > 0 ? history[history.length - 1] : null;

  return (
    <Layout>
      <SEOMeta
        title="The Whole-Life Assessment — Where Is Your Life Flourishing"
        description="Thirty honest statements across five domains of an ordinary life: the inner life, the body, the home, the work, the world. About eight minutes, scored entirely in your browser. A map of flourishing and fragmentation, not a scorecard."
        url="https://www.livewellbyjamesbell.co/life/assessment"
      />

      {/* Focus ring for the visually hidden radio inputs; everything else is inline. */}
      <style>{`
        .wla-opt input{position:absolute;opacity:0;width:1px;height:1px;margin:0}
        .wla-opt input:focus-visible + span{outline:2px solid var(--mustard);outline-offset:2px}
      `}</style>

      {/* Hero */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={heroWrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/life" style={{ color: "inherit" }}>Integrated Life</Link> · The flagship assessment
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>
            The Whole-Life Assessment
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "60ch" }}>
            Where is your life flourishing, and where has it quietly come apart? Thirty statements. One honest map.
          </p>
        </div>
      </section>

      {/* ------------------------------ Intro ------------------------------ */}
      {screen === -1 && (
        <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
          <div style={wrap}>
            <p style={{ ...bodyText, marginBottom: "14px" }}>
              This is not a scorecard, and God is not grading you. He already knows the state of every room in your house and he has not left. What this assessment offers is a map: thirty statements about an ordinary life, read honestly, showing you where things are flourishing and where they have gone quiet.
            </p>
            <p style={{ ...bodyText, marginBottom: "14px" }}>
              Five domains, six statements each, about eight minutes. The inner life. The body and its rhythms. The home and its relationships. Work, money, and calling. The life you live in the world. None of these is the spiritual part of your life, because there is no spiritual part. There is one life, and all of it is where God meets you.
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
              {history.length > 0 && (
                <button onClick={clearHistory} style={quietBtn}>Clear history</button>
              )}
            </div>
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
          <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
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
                        <label key={val} className="wla-opt" style={{ flex: "1 1 0", minWidth: "88px", position: "relative", cursor: "pointer" }}>
                          <input
                            type="radio"
                            name={s.id}
                            value={val}
                            checked={on}
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
            <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
              <div style={wrap}>
                <div style={{ background: "var(--charcoal)", color: "var(--bone)", borderRadius: "var(--radius-sm)", padding: "var(--s-5)", borderTop: "3px solid var(--mustard)" }}>
                  <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "10px" }}>What the map says</div>
                  <p style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 2.8vw, 26px)", fontWeight: 500, lineHeight: 1.45, color: "var(--bone)" }}>
                    {verdictFor(scores)}
                  </p>
                </div>

                <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginTop: "var(--s-3)" }}>
                  <button onClick={retake} style={quietBtn}>Retake the assessment</button>
                  {history.length > 0 && <button onClick={clearHistory} style={quietBtn}>Clear history</button>}
                </div>
                {previous && (
                  <p style={{ ...mutedText, fontSize: "13px", marginTop: "12px" }}>
                    Compared against your last run on {new Date(previous.date).toLocaleDateString()}.
                  </p>
                )}
              </div>
            </section>

            {/* The five domains */}
            <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" }}>
              <div style={wrap}>
                <div className="eyebrow" style={{ marginBottom: "10px" }}>Five domains, one life</div>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.6vw, 36px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "var(--s-4)" }}>
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
              <section style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) 0" }}>
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
            <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
              <div style={wrap}>
                <div className="eyebrow" style={{ marginBottom: "10px" }}>The lowest two domains</div>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.6vw, 36px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "12px" }}>
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
            <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
              <div style={wrap}>
                <div className="eyebrow" style={{ marginBottom: "10px" }}>One practice per domain</div>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.6vw, 36px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "12px" }}>
                  A rule for this season
                </h2>
                <p style={{ ...bodyText, marginBottom: "var(--s-4)", maxWidth: "62ch" }}>
                  A rule of life is not a regimen. It is a trellis, something for a life to grow along. Here is a simple one drawn from your map, the lowest domains first because that is where the tending starts. Keep it imperfectly. Keep it anyway.
                </p>

                <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)", marginBottom: "var(--s-3)" }}>
                  {ordered.map((d) => (
                    <div key={d.id} style={{ marginBottom: "var(--s-3)" }}>
                      <div style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px", color: "var(--ink)", marginBottom: "4px" }}>{d.name}</div>
                      <p style={{ ...bodyText, fontSize: "15px" }}>{d.practices[0]}</p>
                    </div>
                  ))}
                  <button onClick={copyRule} style={primaryBtn}>{copied ? "Copied" : "Copy this rule"}</button>
                </div>

                <p style={{ ...mutedText, fontStyle: "italic", marginTop: "var(--s-4)", borderTop: "1px solid var(--border)", paddingTop: "var(--s-3)" }}>
                  Nothing here was sent anywhere. Come back in a season and see what the slow work has done.
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
          </>
        );
      })()}
    </Layout>
  );
}

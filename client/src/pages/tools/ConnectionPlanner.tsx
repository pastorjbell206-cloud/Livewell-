/**
 * The Connection Planner (/tools/connection-planner): a few people, one small
 * step toward each, every week.
 *
 * docs/grow/GROW-PROMPT.md 5.3 (row 3, "I feel so alone") asks for "a
 * connection planner tool" in the loneliness kit, and 7.3 sets the tool
 * standard. The design is the care page's own counsel: loneliness "yields to
 * small, repeated steps toward the same people over time." A reader names up
 * to five people (first names or initials), picks one small step toward each
 * for the week and, if they like, a day, and names one place where the same
 * people gather every week. Through the week they check off what happened; a
 * step counts when it is taken, whatever the answer. The reading says how the
 * week went in plain sentences, never as a verdict on the reader, and points
 * to the care page, its plan, and a reading the care page trusts. Starting a
 * new week keeps the names, clears the checks, and keeps a line in a short
 * history. A week closes only once a full week has passed since it began, so
 * a run of empty weeks (and the 988 line it brings) is never a run of days.
 *
 * Everything stays in this browser (lib/storage, key livewell-connection-planner).
 * The hero says what to do if loneliness has turned into thoughts of not
 * wanting to be alive, and the help block at the foot carries the lines the
 * loneliness care page carries (its crisisTopics: suicide and abuse). A reader
 * whose contact with people is controlled by someone else is pointed to the
 * Domestic Violence Hotline in that block, told not to keep the planner on a
 * phone that person checks, and offered the care page's quick exit.
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { ToolActions } from "@/components/ToolActions";
import { RemindMe } from "@/components/RemindMe";
import ScriptureNote from "@/components/ScriptureNote";
import { CrisisBlock } from "@/components/CrisisBlock";
import { QuickExit } from "@/components/QuickExit";
import { readStoredJSON, writeStoredJSON, removeStoredJSON } from "@/lib/storage";

export const STEP_IDS = ["text", "call", "meal", "note", "invite", "ask"] as const;
export type StepId = (typeof STEP_IDS)[number];

/** The small steps, each with a word on how to take it; `say` is a sentence to borrow. */
export const STEPS: Record<StepId, { label: string; hint: string; say?: string }> = {
  text: { label: "Send a text", hint: "Make it specific:", say: "I've been thinking about you. Could we get coffee Saturday?" },
  call: { label: "Call", hint: "A voice carries what a text can't. If they don't pick up, leave a short message; the step still counts." },
  meal: { label: "Ask them to coffee or a meal", hint: "Name a day and a place. A specific invitation is easier to accept than a vague one." },
  note: { label: "Write a note", hint: "A few lines by hand, or a card in the mail. Tell them one thing you're grateful for in them." },
  invite: { label: "Invite them to something already happening", hint: "Bring them along to something you already do: a service, a game, a walk, dinner at your table." },
  ask: { label: "Ask how they really are", hint: "Ask, then wait for the real answer:", say: "How are you really doing? I've got time." },
};

export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
/** -1 means any day this week. */
export type Day = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface Person {
  id: string;
  /** A first name or initials, nothing more. */
  name: string;
  step: StepId;
  day: Day;
  done: boolean;
}

export interface PastWeek {
  /** The local date (YYYY-MM-DD) the week began. */
  weekOf: string;
  planned: number;
  reached: number;
  place: string;
  placeDone: boolean;
}

export interface PlannerState {
  people: Person[];
  /** The one place where the same people gather every week. */
  place: string;
  placeDone: boolean;
  /** The local date (YYYY-MM-DD) this week began. */
  weekOf: string;
  history: PastWeek[];
}

export const STORAGE_KEY = "livewell-connection-planner";
export const MAX_PEOPLE = 5;
const HISTORY_KEEP = 12;

const ISO_DAY = /^\d{4}-\d{2}-\d{2}$/;
const count0 = (n: unknown) => Number.isInteger(n) && (n as number) >= 0;
const isPerson = (x: unknown): x is Person => {
  const p = x as Person;
  return !!p && typeof p.id === "string" && typeof p.name === "string" && (STEP_IDS as readonly string[]).includes(p.step) &&
    Number.isInteger(p.day) && p.day >= -1 && p.day <= 6 && typeof p.done === "boolean";
};
const isWeek = (x: unknown): x is PastWeek => {
  const w = x as PastWeek;
  return !!w && typeof w.weekOf === "string" && ISO_DAY.test(w.weekOf) && count0(w.planned) && count0(w.reached) &&
    typeof w.place === "string" && typeof w.placeDone === "boolean";
};
const isState = (x: unknown): x is PlannerState => {
  const s = x as PlannerState;
  return !!s && Array.isArray(s.people) && s.people.every(isPerson) && typeof s.place === "string" && typeof s.placeDone === "boolean" &&
    typeof s.weekOf === "string" && ISO_DAY.test(s.weekOf) && Array.isArray(s.history) && s.history.every(isWeek);
};

/** Today's local date as YYYY-MM-DD, so a week turns over on the reader's calendar, not UTC's. */
export function localDate(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
/** "2026-10-14" as a Date at local midnight, so a label never shifts a day. */
const fromLocal = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
};
const dayLabel = (iso: string) => fromLocal(iso).toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
const dateLabel = (iso: string) => fromLocal(iso).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" });

const fresh = (): PlannerState => ({ people: [], place: "", placeDone: false, weekOf: localDate(), history: [] });
const newId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

const WORDS = ["none", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve"];
const say = (n: number) => WORDS[n] ?? String(n);

export interface WeekTally {
  planned: number;
  reached: number;
  place: string;
  placeDone: boolean;
}

/** How many of the most recent past weeks went by with no step taken and no visit to the weekly place. */
export function emptyStreak(history: PastWeek[]): number {
  let n = 0;
  for (const w of history) {
    if (w.planned > 0 && w.reached === 0 && !w.placeDone) n++;
    else break;
  }
  return n;
}

/**
 * The week, read back in plain sentences: what happened, what it usually
 * means, and the next small thing. Never a score, and never the reader's
 * fault. `emptyBefore` is the run of empty weeks just before this one.
 */
export function weekReading(w: WeekTally, emptyBefore = 0): string[] {
  const out: string[] = [];
  if (w.planned === 0) {
    out.push("Your list is empty for now. Start with one name: someone you'd like to be closer to, someone you've lost touch with, or someone who may be lonelier than they look. If no one comes to mind yet, that says nothing final about you. Begin with the weekly place, where faces become names over time.");
  } else if (w.reached === 0) {
    out.push("None of this week's steps have happened yet, and that isn't a verdict on you. Loneliness argues against almost every first step, and it argues hardest just before you send the message. Choose the smallest step on your list and take it today, before you feel ready. If the week ends this way, start a new one. Your names will still be here.");
  } else if (w.reached < w.planned) {
    out.push(`You reached ${say(w.reached)} of the ${say(w.planned)} people on your list this week. Small steps toward the same people, repeated, are how friendship usually grows. Carry the others into next week. If someone didn't answer, it more often means a busy week on their end than a judgment on you, so try once more before you decide anything.`);
  } else {
    const all =
      w.planned === 1 ? "You reached the one person on your list this week."
      : w.planned === 2 ? "You reached both people on your list this week."
      : `You reached all ${say(w.planned)} people on your list this week.`;
    out.push(
      `${all} Keep the same names next week, because repetition is how an acquaintance becomes a friend.` +
        (w.planned < MAX_PEOPLE ? " When it starts to feel ordinary, add one more name, and think first of someone who may be lonelier than they look." : ""),
    );
  }

  const place = w.place.trim();
  if (!place) {
    out.push("You haven't named a place to belong yet. A group, a class, a team, or a volunteer shift that meets every week will do more over a year than any single good evening, because it puts you in a room with the same people week after week.");
  } else if (w.placeDone) {
    out.push(`You were at your weekly place (${place}) this week. Go back next week and learn one more name there.`);
  } else {
    out.push(`Your weekly place (${place}) isn't checked yet this week. Going back to the same people week after week is where friendship usually takes root, so give it two months before you judge it.`);
  }

  if (w.planned > 0 && w.reached === 0 && !w.placeDone && emptyBefore >= 2) {
    out.push(`The ${say(emptyBefore)} weeks before this one went by without a step. When loneliness gets that heavy, say so to someone in plain words: a pastor, a group leader, or a doctor. If it has turned into thoughts of not wanting to be alive, please reach someone tonight. Call or text 988.`);
  }
  return out;
}

/** One past week in a line: what happened, in the reader's own terms. */
export function pastWeekLine(w: PastWeek): string {
  const what =
    w.planned === 0 ? "no names on the list"
    : w.reached === 0 ? "no steps taken"
    : w.reached === w.planned ? (w.planned === 1 ? "reached the one person on the list" : w.planned === 2 ? "reached both" : `reached all ${say(w.planned)}`)
    : `reached ${say(w.reached)} of ${say(w.planned)}`;
  return w.placeDone ? `${what}; went to ${w.place || "the weekly place"}` : what;
}

const wrap = { maxWidth: "var(--w-prose)", margin: "0 auto" } as const;
const h2 = { fontFamily: "var(--F)", fontSize: "clamp(26px, 3.6vw, 34px)", fontWeight: 400, color: "var(--ink)", margin: "0 0 10px" } as const;
const h3 = { fontFamily: "var(--F)", fontSize: "22px", fontWeight: 500, color: "var(--ink)", margin: "0 0 10px" } as const;
const body = { fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", margin: "0 0 var(--s-3)" } as const;
const label = { display: "block", fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, color: "var(--ink)", margin: "0 0 6px" } as const;
const hint = { fontFamily: "var(--B)", fontSize: "14.5px", lineHeight: 1.6, color: "var(--ink-muted)", margin: "0 0 8px" } as const;
const field = {
  width: "100%", minHeight: "44px", boxSizing: "border-box", fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.5, color: "var(--ink)",
  background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "10px 12px",
} as const;
const primary = {
  minHeight: "44px", padding: "12px 22px", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer",
  background: "var(--charcoal)", color: "var(--charcoal-fg)", fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600,
} as const;
const linkBtn = { font: "inherit", fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", background: "none", border: 0, padding: "6px 0", cursor: "pointer", textDecoration: "underline" } as const;
const check = { display: "inline-flex", alignItems: "center", gap: "10px", minHeight: "44px", fontFamily: "var(--U)", fontSize: "15px", fontWeight: 500, color: "var(--ink)", cursor: "pointer" } as const;
const box = { width: "22px", height: "22px", margin: 0, accentColor: "var(--ink)", cursor: "pointer" } as const;
const a = { color: "var(--mustard-text)", fontWeight: 600 } as const;

/** Print: the week's plan alone, as a page to keep by the phone. Colors are left to the site's print rule. */
const PRINT_CSS = `
  .cp-print{display:none}
  @media print{
    nav, footer, .skip-link, .cp-screen{display:none !important}
    .cp-print{display:block !important;font-family:var(--B);font-size:11pt;line-height:1.55}
    .cp-print h1{font-family:var(--F);font-weight:400;font-size:22pt;letter-spacing:-0.02em;margin:0 0 4pt}
    .cp-print h2{font-family:var(--F);font-weight:500;font-size:14pt;margin:14pt 0 4pt;page-break-after:avoid}
    .cp-print p{margin:0 0 6pt;max-width:none}
    .cp-print .cp-meta{font-size:9.5pt;margin-bottom:8pt}
    .cp-print .cp-row{display:flex;gap:10pt;align-items:baseline;border-bottom:0.5pt solid;padding:7pt 0;page-break-inside:avoid}
    .cp-print .cp-box{display:inline-block;flex:none;width:10pt;height:10pt;border:1pt solid;text-align:center;line-height:10pt;font-size:9pt}
    .cp-print .cp-foot{margin-top:14pt;padding-top:6pt;border-top:0.5pt solid;font-size:9.5pt}
  }
`;

export default function ConnectionPlanner() {
  const [state, setState] = useState<PlannerState>(() => readStoredJSON(STORAGE_KEY, isState, fresh()));
  const [saveFailed, setSaveFailed] = useState(false);
  const [name, setName] = useState("");
  const [step, setStep] = useState<StepId>("text");
  const [day, setDay] = useState<Day>(-1);
  const [editing, setEditing] = useState<string | null>(null);
  const [started, setStarted] = useState(false);
  /** What the always-mounted status line says after an add, a remove, a new week, or a clear. */
  const [announce, setAnnounce] = useState("");
  /** Bumped after an add, a remove, or a clear: focus goes back to the name field (or, with five names, the line saying so). */
  const [refocus, setRefocus] = useState(0);
  const nameRef = useRef<HTMLInputElement>(null);
  const fullRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (refocus) (nameRef.current ?? fullRef.current)?.focus();
  }, [refocus]);

  const today = localDate();
  const weekday = new Date().getDay();
  const persist = (next: PlannerState) => {
    setState(next);
    setSaveFailed(!writeStoredJSON(STORAGE_KEY, next));
  };
  const update = (id: string, change: Partial<Person>) => persist({ ...state, people: state.people.map((p) => (p.id === id ? { ...p, ...change } : p)) });

  const add = () => {
    const n = name.trim();
    if (!n || state.people.length >= MAX_PEOPLE) return;
    persist({ ...state, people: [...state.people, { id: newId(), name: n, step, day, done: false }] });
    setName("");
    setStep("text");
    setDay(-1);
    setStarted(false);
    setAnnounce(`Added ${n}.`);
    setRefocus((k) => k + 1);
  };
  const remove = (p: Person) => {
    if (!window.confirm("Remove this name from your list?")) return;
    persist({ ...state, people: state.people.filter((x) => x.id !== p.id) });
    setAnnounce(`Removed ${p.name}.`);
    setRefocus((k) => k + 1);
  };
  const setPlace = (place: string) => persist({ ...state, place, placeDone: place.trim() ? state.placeDone : false });
  const startNewWeek = () => {
    const week: PastWeek = {
      weekOf: state.weekOf,
      planned: state.people.length,
      reached: state.people.filter((p) => p.done).length,
      place: state.place.trim(),
      placeDone: state.placeDone,
    };
    persist({
      ...state,
      people: state.people.map((p) => ({ ...p, done: false })),
      placeDone: false,
      weekOf: today,
      history: [week, ...state.history].slice(0, HISTORY_KEEP),
    });
    setEditing(null);
    setStarted(true);
    setAnnounce("A new week has started.");
  };
  const clearAll = () => {
    if (!window.confirm("Clear your names, your place, and your past weeks from this browser? This cannot be undone.")) return;
    removeStoredJSON(STORAGE_KEY);
    setState(fresh());
    setSaveFailed(false);
    setStarted(false);
    setEditing(null);
    setAnnounce("Everything here is cleared from this browser.");
    setRefocus((k) => k + 1);
  };

  const reached = state.people.filter((p) => p.done).length;
  const reading = weekReading({ planned: state.people.length, reached, place: state.place, placeDone: state.placeDone }, emptyStreak(state.history));
  const start = fromLocal(state.weekOf);
  /** Whole days since the week began, by the reader's calendar; rounding absorbs a daylight-saving hour. */
  const days = Math.round((fromLocal(today).getTime() - start.getTime()) / 864e5);
  const weekOld = days >= 7;
  const hasWeek = state.people.length > 0 || state.place.trim() !== "";
  // A full week before it closes, so two quick closes can't make a false run of
  // empty weeks; a start date in the future (a clock that was wrong) never locks it.
  const canClose = hasWeek && (weekOld || days < 0);
  const closeFrom = localDate(new Date(start.getFullYear(), start.getMonth(), start.getDate() + 7));
  const stepNow = STEPS[step];

  return (
    <Layout>
      <SEOMeta
        title="The Connection Planner: Small Steps When You Feel Alone"
        description="A private weekly planner for loneliness: name a few people, choose one small step toward each, keep one place to belong, and see how the week went."
        url="https://www.livewellbyjamesbell.co/tools/connection-planner"
      />
      <style>{PRINT_CSS}</style>

      <div className="cp-screen">
        {/* Inside the screen-only wrapper, so the pill stays off the printed page. */}
        <QuickExit />
        <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
          <div style={wrap}>
            <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>
              <Link href="/help/loneliness" style={{ color: "inherit" }}>Find help: loneliness</Link> · A companion tool
            </div>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.4vw, 56px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "0 0 16px" }}>
              The Connection Planner
            </h1>
            <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.7, margin: "0 0 12px", maxWidth: "60ch" }}>
              Loneliness rarely gives way to one big connection. It yields to small steps toward the same few people, taken again and again. Name up to five people, choose one small step toward each for this week, and keep one place where the same faces gather every week. As the week goes, check off what happened, then start the next one.
            </p>
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, margin: "0 0 12px", maxWidth: "60ch", opacity: 0.85 }}>
              It takes about five minutes a week. Everything you write stays in this browser and is never sent anywhere. This is a planner, not counseling: if the loneliness has settled into a hopelessness that won't lift, talk with a doctor or a counselor as well as your church.
            </p>
            <div style={{ margin: "0 0 16px" }}>
              <RemindMe
                title="The Connection Planner"
                details="Five minutes: check off this week's small steps toward your people, and choose next week's."
                href="/tools/connection-planner"
                freq="WEEKLY"
                count={8}
                schedule="once a week for eight weeks"
                defaultTime="evening"
                onDark
              />
            </div>
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, margin: 0, maxWidth: "60ch" }}>
              If the loneliness has turned into thoughts of not wanting to be alive, don't wait for the end of the week. Please reach someone tonight: call or text{" "}
              <a href="tel:988" style={{ color: "inherit", fontWeight: 700 }}>988</a>, or call{" "}
              <a href="tel:911" style={{ color: "inherit", fontWeight: 700 }}>911</a> if you're in danger.{" "}
              <a href="#help-now" style={{ color: "inherit", fontWeight: 600 }}>Every line is at the foot of this page.</a>
            </p>
          </div>
        </section>

        <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }} aria-labelledby="this-week">
          <div style={wrap}>
            <h2 id="this-week" style={h2}>This week</h2>
            <p style={{ ...hint, margin: "0 0 var(--s-3)" }}>
              Started {dayLabel(state.weekOf)}. A step counts when you take it, whatever the answer.
              {weekOld && hasWeek ? " A week or more has gone by; when you're ready, start a new week below." : ""}
            </p>

            {state.people.length === 0 ? (
              <p style={{ ...body, color: "var(--ink-muted)" }}>
                No one on your list yet. Add a first name below; one is enough to begin. If no name comes to mind, that's more common than it feels, and it isn't a verdict on you. Start with{" "}
                <a href="#one-place" style={a}>the place to belong</a>, and let the names come from there.
              </p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 var(--s-4)" }}>
                {state.people.map((p) => (
                  <li key={p.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "14px 16px", marginBottom: "10px" }}>
                    <p style={{ fontFamily: "var(--B)", fontSize: "17px", fontWeight: 600, color: "var(--ink)", margin: "0 0 2px" }}>{p.name}</p>
                    <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.55, color: "var(--ink)", margin: "0 0 4px", textDecoration: p.done ? "line-through" : "none" }}>
                      {STEPS[p.step].label}
                      {p.day === -1 ? ", any day this week" : `, ${DAYS[p.day]}`}
                      {p.day === weekday && !p.done ? " (today)" : ""}
                    </p>
                    {!p.done && (
                      <p style={{ ...hint, margin: "0 0 4px" }}>
                        {STEPS[p.step].hint}
                        {STEPS[p.step].say && <> <em>{STEPS[p.step].say}</em></>}
                      </p>
                    )}
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "4px 18px" }}>
                      <label style={check}>
                        <input type="checkbox" style={box} checked={p.done} onChange={(e) => update(p.id, { done: e.target.checked })} aria-label={`${p.name}: done this week`} />
                        Done
                      </label>
                      <button type="button" style={linkBtn} onClick={() => setEditing(editing === p.id ? null : p.id)} aria-expanded={editing === p.id} aria-controls={`cp-edit-${p.id}`}>
                        {editing === p.id ? "Finished changing" : "Change the step"}
                      </button>
                      <button type="button" style={linkBtn} onClick={() => remove(p)} aria-label={`Remove ${p.name}`}>Remove</button>
                    </div>
                    {editing === p.id && (
                      <div id={`cp-edit-${p.id}`} style={{ display: "grid", gap: "10px", margin: "6px 0 4px" }}>
                        <div>
                          <label htmlFor={`cp-step-${p.id}`} style={label}>Step this week</label>
                          <select id={`cp-step-${p.id}`} style={field} value={p.step} onChange={(e) => update(p.id, { step: e.target.value as StepId })}>
                            {STEP_IDS.map((s) => <option key={s} value={s}>{STEPS[s].label}</option>)}
                          </select>
                        </div>
                        <div>
                          <label htmlFor={`cp-day-${p.id}`} style={label}>Day</label>
                          <select id={`cp-day-${p.id}`} style={field} value={p.day} onChange={(e) => update(p.id, { day: Number(e.target.value) as Day })}>
                            <option value={-1}>Any day this week</option>
                            {DAYS.map((d, n) => <option key={d} value={n}>{d}</option>)}
                          </select>
                        </div>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {state.people.length < MAX_PEOPLE ? (
              <form onSubmit={(e) => { e.preventDefault(); add(); }} aria-labelledby="add-someone">
                <h3 id="add-someone" style={h3}>Add someone</h3>
                <div style={{ marginBottom: "var(--s-3)" }}>
                  <label htmlFor="cp-name" style={label}>First name or initials</label>
                  <p style={hint}>That's all this needs. It stays on this device and is never sent anywhere.</p>
                  <input ref={nameRef} id="cp-name" type="text" autoComplete="off" maxLength={40} style={field} value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div style={{ marginBottom: "var(--s-3)" }}>
                  <label htmlFor="cp-step" style={label}>One small step this week</label>
                  <select id="cp-step" style={field} value={step} onChange={(e) => setStep(e.target.value as StepId)}>
                    {STEP_IDS.map((s) => <option key={s} value={s}>{STEPS[s].label}</option>)}
                  </select>
                  <p style={{ ...hint, margin: "8px 0 0" }}>
                    {stepNow.hint}
                    {stepNow.say && <> <em>{stepNow.say}</em></>}
                  </p>
                </div>
                <div style={{ marginBottom: "var(--s-3)" }}>
                  <label htmlFor="cp-day" style={label}>A day, if you like</label>
                  <select id="cp-day" style={field} value={day} onChange={(e) => setDay(Number(e.target.value) as Day)}>
                    <option value={-1}>Any day this week</option>
                    {DAYS.map((d, n) => <option key={d} value={n}>{d}</option>)}
                  </select>
                </div>
                <button type="submit" style={{ ...primary, opacity: name.trim() ? 1 : 0.6 }} disabled={!name.trim()}>Add</button>
              </form>
            ) : (
              <p ref={fullRef} tabIndex={-1} style={{ ...body, color: "var(--ink-muted)", margin: 0 }}>Five is plenty for one week. To add someone else, remove a name first.</p>
            )}
            <p role="status" className="sr-only">{announce}</p>
            {saveFailed && (
              <p role="status" style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: "10px 0 0" }}>
                Couldn't save to this browser — your work here will not survive a reload.
              </p>
            )}
          </div>
        </section>

        <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" }} aria-labelledby="one-place">
          <div style={wrap}>
            <h2 id="one-place" style={h2}>One place to belong</h2>
            <p style={body}>
              Friendship mostly grows from seeing the same faces again and again, without anyone having to plan it. Name one place that meets every week: a small group, a class, a team, a choir, a volunteer shift. Working alongside people is often easier than sitting across from them. Psalm 68:6 says that "God settles the lonely in families," and the New Testament finds that household in the church; a small group or a serving team you return to every week is often where it begins.
            </p>
            <label htmlFor="cp-place" style={label}>Your weekly place</label>
            <input id="cp-place" type="text" autoComplete="off" maxLength={80} style={field} value={state.place} onChange={(e) => setPlace(e.target.value)} placeholder="Tuesday small group, the choir, Saturday at the food pantry" />
            {state.place.trim() ? (
              <label style={{ ...check, marginTop: "8px" }}>
                <input type="checkbox" style={box} checked={state.placeDone} onChange={(e) => persist({ ...state, placeDone: e.target.checked })} />
                I was there this week
              </label>
            ) : (
              <p style={{ ...hint, margin: "8px 0 0" }}>
                If you don't have one yet, ask a pastor or a group leader in so many words: <em>I've been really lonely, and I don't know how to get in here. Can you help me find a place?</em>
              </p>
            )}
            <div style={{ marginTop: "var(--s-3)" }}>
              <ScriptureNote rendering="bsb" />
            </div>
          </div>
        </section>

        <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }} aria-labelledby="how-it-went">
          <div style={wrap}>
            <h2 id="how-it-went" style={h2}>How this week went</h2>
            {started && (
              <p style={{ ...body, fontStyle: "italic" }}>A new week has started. Your names and your place are still here, and last week is kept below.</p>
            )}
            {reading.map((r) => <p key={r} style={body}>{r}</p>)}
            <button type="button" style={{ ...primary, opacity: canClose ? 1 : 0.6 }} disabled={!canClose} onClick={startNewWeek}>
              Start a new week
            </button>
            <p style={{ ...hint, margin: "8px 0 var(--s-4)" }}>
              {hasWeek && !canClose
                ? `You can close this week from ${dayLabel(closeFrom)}, a week after it began: your names and your place stay, the checks clear, and this week is kept below.`
                : "Keeps your names and your place, clears the checks, and keeps this week below."}
            </p>

            <h3 style={h3}>Past weeks</h3>
            {state.history.length === 0 ? (
              <p style={{ ...hint, fontSize: "16px" }}>Nothing here yet. When you start a new week, this one will be kept here in a line.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {state.history.map((w, i) => (
                  <li key={`${w.weekOf}-${i}`} style={{ borderBottom: "1px solid var(--border)", padding: "10px 0", fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.6, color: "var(--ink)" }}>
                    <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>Week of {dateLabel(w.weekOf)}: </span>
                    {pastWeekLine(w)}.
                  </li>
                ))}
              </ul>
            )}
            <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: "var(--s-3) 0 0" }}>
              Saved only in this browser.{" "}
              {(hasWeek || state.history.length > 0) && (
                <button type="button" onClick={clearAll} style={{ ...linkBtn, padding: 0, color: "var(--mustard-text)" }}>Clear everything</button>
              )}
            </p>
          </div>
        </section>

        <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4) var(--s-4)" }} aria-labelledby="from-here">
          <div style={wrap}>
            <h2 id="from-here" style={h2}>Where to go from here</h2>
            <p style={body}>
              For the whole picture of why loneliness is so hard now, what Scripture says to it, and when to get more help, read{" "}
              <Link href="/help/loneliness" style={a}>I feel so alone</Link>. To keep going one step a week, walk{" "}
              <Link href="/plans/loneliness" style={a}>Eight Weeks Toward Being Known</Link>. And if making friends as an adult feels impossibly slow, read{" "}
              <Link href="/life/friendship-against-isolation" style={a}>Why Is It So Hard to Make Real Friends as an Adult?</Link>
            </p>
            <p style={body}>
              Some loneliness is imposed. If a spouse or partner controls who you see, or someone at home makes you afraid, that's a safety problem before it's a loneliness problem. The National Domestic Violence Hotline can help you plan for your safety, and its number is with the{" "}
              <a href="#help-now" style={a}>help lines at the foot of this page</a>. If that person checks your phone, look for help on a device they can't see. And don't keep this planner on a phone they check, because the names you add stay in this browser until you choose Clear everything.
            </p>
            <ToolActions toolName="The Connection Planner" onStartOver={clearAll} />
          </div>
        </section>

        <div style={{ background: "var(--bone)", padding: "0 var(--s-4) var(--s-5)" }}>
          <CrisisBlock id="help-now" variant="compact" topics={["suicide", "abuse"]} />
        </div>
      </div>

      <div className="cp-print" aria-hidden="true">
        <h1>The Connection Planner</h1>
        <p className="cp-meta">Week of {dateLabel(state.weekOf)}. One small step toward each person; a step counts when you take it, whatever the answer.</p>
        <h2>This week</h2>
        {Array.from({ length: MAX_PEOPLE }, (_, i) => state.people[i]).map((p, i) =>
          p ? (
            <div key={p.id} className="cp-row">
              <span className="cp-box">{p.done ? "✓" : ""}</span>
              <span><strong>{p.name}</strong>: {STEPS[p.step].label}{p.day === -1 ? "" : `, ${DAYS[p.day]}`}</span>
            </div>
          ) : (
            <div key={`blank-${i}`} className="cp-row"><span className="cp-box" /><span>{" "}</span></div>
          ),
        )}
        <h2>One place to belong</h2>
        <div className="cp-row">
          <span className="cp-box">{state.placeDone ? "✓" : ""}</span>
          <span>{state.place.trim() || " "}</span>
        </div>
        {state.people.length > 0 && (
          <>
            <h2>How this week went</h2>
            {reading.map((r) => <p key={r}>{r}</p>)}
          </>
        )}
        <p className="cp-foot">
          If the loneliness has turned into thoughts of not wanting to be alive, call or text 988, or call 911 if you're in danger. More help: www.livewellbyjamesbell.co/help/loneliness. This planner: www.livewellbyjamesbell.co/tools/connection-planner.
        </p>
      </div>
    </Layout>
  );
}

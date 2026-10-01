/**
 * The Prayer Planner (/tools/prayer-planner): your people, spread across the
 * week.
 *
 * docs/grow/GROW-PROMPT.md 7.3 lists "a prayer planner" among the companion
 * tools the top needs call for. A reader lists the people and concerns they
 * mean to pray for, gives each a day (or every day), and each day the planner
 * shows that day's names. Marking a name "prayed" lasts for the day; marking
 * a request "answered" keeps a dated line in a record of answered prayer,
 * with a note in the reader's own words. It is a list and a memory, never a
 * scorecard.
 *
 * Everything stays in this browser (lib/storage, key livewell-prayer-planner).
 */
import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { ToolActions } from "@/components/ToolActions";
import ScriptureNote from "@/components/ScriptureNote";
import { readStoredJSON, writeStoredJSON, removeStoredJSON } from "@/lib/storage";

export const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
/** -1 means every day. */
export type Day = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface PrayerItem {
  id: string;
  name: string;
  day: Day;
  /** The local date (YYYY-MM-DD) it was last marked prayed. */
  prayedOn: string | null;
  answered: { on: string; note: string } | null;
}

export interface PlannerState {
  items: PrayerItem[];
}

export const STORAGE_KEY = "livewell-prayer-planner";

const isItem = (x: unknown): x is PrayerItem => {
  const i = x as PrayerItem;
  return !!i && typeof i.id === "string" && typeof i.name === "string" && Number.isInteger(i.day) && i.day >= -1 && i.day <= 6 &&
    (i.prayedOn === null || typeof i.prayedOn === "string") &&
    (i.answered === null || (typeof i.answered === "object" && typeof i.answered.on === "string" && typeof i.answered.note === "string"));
};
const isState = (x: unknown): x is PlannerState => !!x && Array.isArray((x as PlannerState).items) && (x as PlannerState).items.every(isItem);

/** Today's local date as YYYY-MM-DD, so "prayed today" turns over at local midnight. */
export function localDate(d = new Date()): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** The items to pray for on a given weekday: that day's names and every-day names, not yet answered. */
export function forDay(items: PrayerItem[], weekday: number): PrayerItem[] {
  return items.filter((i) => !i.answered && (i.day === -1 || i.day === weekday));
}

const wrap = { maxWidth: "var(--w-prose)", margin: "0 auto" } as const;
const field = {
  boxSizing: "border-box", fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.5, color: "var(--ink)",
  background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "10px 12px",
} as const;
const primary = {
  minHeight: "44px", padding: "10px 20px", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer",
  background: "var(--charcoal)", color: "var(--charcoal-fg)", fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600,
} as const;
const pill = {
  minHeight: "40px", padding: "8px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-pill)", cursor: "pointer",
  background: "transparent", color: "var(--ink)", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 500,
} as const;
const linkBtn = { font: "inherit", fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", background: "none", border: 0, padding: 0, cursor: "pointer", textDecoration: "underline" } as const;
const h2 = { fontFamily: "var(--F)", fontSize: "clamp(26px, 3.6vw, 34px)", fontWeight: 400, color: "var(--ink)", margin: "0 0 10px" } as const;

const newId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export default function PrayerPlanner() {
  const [state, setState] = useState<PlannerState>(() => readStoredJSON(STORAGE_KEY, isState, { items: [] }));
  const [saveFailed, setSaveFailed] = useState(false);
  const [name, setName] = useState("");
  const [day, setDay] = useState<Day>(-1);
  const [answering, setAnswering] = useState<string | null>(null);
  const [note, setNote] = useState("");

  const today = localDate();
  const weekday = new Date().getDay();
  const persist = (next: PlannerState) => {
    setState(next);
    setSaveFailed(!writeStoredJSON(STORAGE_KEY, next));
  };
  const update = (id: string, change: Partial<PrayerItem>) => persist({ items: state.items.map((i) => (i.id === id ? { ...i, ...change } : i)) });

  const add = () => {
    const n = name.trim();
    if (!n) return;
    persist({ items: [...state.items, { id: newId(), name: n, day, prayedOn: null, answered: null }] });
    setName("");
  };
  const remove = (id: string) => {
    if (!window.confirm("Remove this name from your list?")) return;
    persist({ items: state.items.filter((i) => i.id !== id) });
  };
  const markAnswered = (id: string) => {
    update(id, { answered: { on: today, note: note.trim() } });
    setAnswering(null);
    setNote("");
  };
  const clearAll = () => {
    if (!window.confirm("Clear your whole prayer list and record from this browser? This cannot be undone.")) return;
    removeStoredJSON(STORAGE_KEY);
    setState({ items: [] });
    setSaveFailed(false);
  };

  const todays = forDay(state.items, weekday);
  const answered = state.items.filter((i) => i.answered).sort((a, b) => (b.answered!.on > a.answered!.on ? 1 : -1));
  const open = state.items.filter((i) => !i.answered);

  return (
    <Layout>
      <SEOMeta
        title="The Prayer Planner: Your People, Through the Week"
        description="A private prayer list: give each person or concern a day, see today's names, and keep a dated record of answered prayer. Stays in your browser."
        url="https://www.livewellbyjamesbell.co/tools/prayer-planner"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>
            <Link href="/help/prayer" style={{ color: "inherit" }}>Find help: prayer</Link> · A companion tool
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.4vw, 56px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "0 0 16px" }}>
            The Prayer Planner
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.7, margin: "0 0 12px", maxWidth: "60ch" }}>
            Most of us promise to pray for someone and then forget by Thursday. Write down the people and the needs you mean to carry, give each one a day, and each day this page will hand you that day's names. When a prayer is answered, mark it, and keep the record.
          </p>
          <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, margin: 0, maxWidth: "60ch", opacity: 0.85 }}>
            Everything stays in this browser and is never sent anywhere.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }} aria-labelledby="today">
        <div style={wrap}>
          <h2 id="today" style={h2}>Today, {DAYS[weekday]}</h2>
          {todays.length === 0 ? (
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.65, color: "var(--ink-muted)", margin: "0 0 var(--s-3)" }}>
              {open.length === 0 ? "Your list is empty. Add the first name below." : `No one is on ${DAYS[weekday]}'s list. Pray for anyone the day brings to mind, or give someone this day below.`}
            </p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 var(--s-3)" }}>
              {todays.map((i) => {
                const prayed = i.prayedOn === today;
                return (
                  <li key={i.id} style={{ background: "var(--card)", border: "1px solid var(--border)", padding: "12px 14px", marginBottom: "8px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "10px" }}>
                      <span style={{ fontFamily: "var(--B)", fontSize: "17px", color: "var(--ink)", textDecoration: prayed ? "line-through" : "none" }}>{i.name}</span>
                      <span style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                        <button type="button" style={{ ...pill, ...(prayed ? { background: "var(--ink)", color: "var(--bone)", borderColor: "var(--ink)" } : {}) }} aria-pressed={prayed} onClick={() => update(i.id, { prayedOn: prayed ? null : today })}>
                          {prayed ? "Prayed today" : "Mark prayed"}
                        </button>
                        <button type="button" style={pill} onClick={() => { setAnswering(i.id); setNote(""); }}>Answered</button>
                      </span>
                    </div>
                    {answering === i.id && (
                      <div style={{ marginTop: "10px" }}>
                        <label htmlFor={`note-${i.id}`} style={{ display: "block", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--ink)", marginBottom: "6px" }}>
                          How was it answered? (optional, in your own words)
                        </label>
                        <input id={`note-${i.id}`} type="text" style={{ ...field, width: "100%" }} value={note} onChange={(e) => setNote(e.target.value)} />
                        <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                          <button type="button" style={primary} onClick={() => markAnswered(i.id)}>Keep it in the record</button>
                          <button type="button" style={pill} onClick={() => setAnswering(null)}>Cancel</button>
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          <div style={{ background: "var(--bone-warm)", borderLeft: "3px solid var(--mustard)", padding: "14px 16px" }}>
            <p style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-muted)", margin: "0 0 6px" }}>A pattern, if you want one</p>
            <p style={{ fontFamily: "var(--B)", fontSize: "15.5px", lineHeight: 1.65, color: "var(--ink)", margin: "0 0 8px" }}>
              Jesus gave his disciples a shape for prayer: "Our Father in heaven, hallowed be Your name. Your kingdom come, Your will be done, on earth as it is in heaven. Give us this day our daily bread. And forgive us our debts, as we also have forgiven our debtors. And lead us not into temptation, but deliver us from the evil one." (Matthew 6:9-13)
            </p>
            <p style={{ fontFamily: "var(--B)", fontSize: "15.5px", lineHeight: 1.65, color: "var(--ink)", margin: 0 }}>
              Pray each name through it: that God would be honored in their life, that his will would be done in what they face, that they would have what they need today, that they would know forgiveness and give it, and that they would be kept from harm.
            </p>
          </div>
          <ScriptureNote rendering="bsb" />
        </div>
      </section>

      <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" }} aria-labelledby="the-list">
        <div style={wrap}>
          <h2 id="the-list" style={h2}>Your list</h2>
          <form onSubmit={(e) => { e.preventDefault(); add(); }} style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "flex-end", margin: "0 0 var(--s-3)" }}>
            <div style={{ flex: "1 1 240px" }}>
              <label htmlFor="pp-name" style={{ display: "block", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--ink)", marginBottom: "6px" }}>A person or a need</label>
              <input id="pp-name" type="text" style={{ ...field, width: "100%" }} value={name} onChange={(e) => setName(e.target.value)} placeholder="Mom's surgery, a friend's marriage, my son at school" />
            </div>
            <div>
              <label htmlFor="pp-day" style={{ display: "block", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--ink)", marginBottom: "6px" }}>Which day</label>
              <select id="pp-day" style={field} value={day} onChange={(e) => setDay(Number(e.target.value) as Day)}>
                <option value={-1}>Every day</option>
                {DAYS.map((d, n) => <option key={d} value={n}>{d}</option>)}
              </select>
            </div>
            <button type="submit" style={{ ...primary, opacity: name.trim() ? 1 : 0.6 }} disabled={!name.trim()}>Add</button>
          </form>
          {saveFailed && (
            <p role="status" style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: "0 0 10px" }}>
              Couldn't save to this browser — your work here will not survive a reload.
            </p>
          )}
          {open.length > 0 && (
            <div>
              {([-1, 0, 1, 2, 3, 4, 5, 6] as Day[]).map((d) => {
                const rows = open.filter((i) => i.day === d);
                if (!rows.length) return null;
                return (
                  <div key={d} style={{ marginBottom: "12px" }}>
                    <h3 style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-muted)", margin: "0 0 4px" }}>
                      {d === -1 ? "Every day" : DAYS[d]}
                    </h3>
                    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                      {rows.map((i) => (
                        <li key={i.id} style={{ display: "flex", justifyContent: "space-between", gap: "10px", borderBottom: "1px solid var(--border)", padding: "8px 0" }}>
                          <span style={{ fontFamily: "var(--B)", fontSize: "16px", color: "var(--ink)" }}>{i.name}</span>
                          <button type="button" style={linkBtn} onClick={() => remove(i.id)} aria-label={`Remove ${i.name}`}>Remove</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }} aria-labelledby="answered">
        <div style={wrap}>
          <h2 id="answered" style={h2}>Answered</h2>
          {answered.length === 0 ? (
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.65, color: "var(--ink-muted)", margin: 0 }}>
              When a prayer is answered, mark it on today's list and it will be kept here with the date. Some answers are yes, some are not yet, and some are a different mercy than the one you asked for; write it down the way it came.
            </p>
          ) : (
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {answered.map((i) => (
                <li key={i.id} style={{ borderBottom: "1px solid var(--border)", padding: "10px 0" }}>
                  <p style={{ fontFamily: "var(--U)", fontSize: "12.5px", color: "var(--ink-muted)", margin: "0 0 2px" }}>{i.answered!.on}</p>
                  <p style={{ fontFamily: "var(--B)", fontSize: "16px", color: "var(--ink)", margin: "0 0 2px" }}>{i.name}</p>
                  {i.answered!.note && <p style={{ fontFamily: "var(--B)", fontSize: "15px", fontStyle: "italic", color: "var(--ink-muted)", margin: "0 0 4px" }}>{i.answered!.note}</p>}
                  <button type="button" style={linkBtn} onClick={() => update(i.id, { answered: null })}>Move back to my list</button>
                </li>
              ))}
            </ul>
          )}
          <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: "var(--s-3) 0 var(--s-3)" }}>
            Saved only in this browser.{" "}
            {state.items.length > 0 && (
              <button type="button" onClick={clearAll} style={{ ...linkBtn, color: "var(--mustard-text)" }}>Clear everything</button>
            )}
          </p>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", margin: "0 0 var(--s-3)" }}>
            If prayer itself feels impossible right now, start with{" "}
            <Link href="/help/prayer" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>I don't know how to pray</Link>, or walk{" "}
            <Link href="/plans/prayer" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>the eight-week plan</Link>. For words to borrow, the{" "}
            <Link href="/tools/prayer-generator" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>Prayer Generator</Link> has written prayers for the hours of the day.
          </p>
          <ToolActions toolName="The Prayer Planner" />
        </div>
      </section>
    </Layout>
  );
}

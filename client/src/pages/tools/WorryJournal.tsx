/**
 * The Worry Journal (/tools/worry-journal): five minutes before bed.
 *
 * docs/grow/GROW-PROMPT.md 7.3 asks for "a worry journal with a guided
 * evening reflection" as a companion to the anxiety kit. Four short prompts:
 * what you are worried about, the one small thing that is yours to do
 * tomorrow, what is not yours to carry, and a sentence of prayer. After a few
 * days each worry asks how it turned out, so a reader can see, in their own
 * handwriting, how many of the things that kept them awake came to pass and
 * how they got through the ones that did.
 *
 * Everything stays in this browser (lib/storage, key livewell-worry-journal).
 * It is a journal, not treatment, and says so. The help block sits at the
 * foot, and the anxiety care page is one link away.
 */
import { useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { ToolActions } from "@/components/ToolActions";
import ScriptureNote from "@/components/ScriptureNote";
import { CrisisBlock } from "@/components/CrisisBlock";
import { readStoredJSON, writeStoredJSON, removeStoredJSON, isArrayOf } from "@/lib/storage";

export type Outcome = "didnt" | "through" | "waiting";

export interface WorryEntry {
  id: string;
  /** ISO date-time the day was closed. */
  date: string;
  worry: string;
  mine: string;
  notMine: string;
  prayer: string;
  outcome: Outcome | null;
}

export const STORAGE_KEY = "livewell-worry-journal";
/** Days before an entry asks how it turned out. */
export const LOOK_BACK_DAYS = 3;

const isEntry = (x: unknown): x is WorryEntry => {
  const e = x as WorryEntry;
  return !!e && typeof e.id === "string" && typeof e.date === "string" && typeof e.worry === "string" &&
    typeof e.mine === "string" && typeof e.notMine === "string" && typeof e.prayer === "string" &&
    (e.outcome === null || e.outcome === "didnt" || e.outcome === "through" || e.outcome === "waiting");
};
const isEntries = isArrayOf(isEntry);

const OUTCOMES: { value: Outcome; label: string }[] = [
  { value: "didnt", label: "It didn't happen" },
  { value: "through", label: "It happened, and I got through it" },
  { value: "waiting", label: "Still waiting to see" },
];

const wrap = { maxWidth: "var(--w-prose)", margin: "0 auto" } as const;
const label = { display: "block", fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, color: "var(--ink)", margin: "0 0 6px" } as const;
const hint = { fontFamily: "var(--B)", fontSize: "14.5px", lineHeight: 1.6, color: "var(--ink-muted)", margin: "0 0 8px" } as const;
const field = {
  width: "100%", boxSizing: "border-box", fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.6, color: "var(--ink)",
  background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "10px 12px",
} as const;
const primary = {
  minHeight: "44px", padding: "12px 22px", border: "none", borderRadius: "var(--radius-sm)", cursor: "pointer",
  background: "var(--charcoal)", color: "var(--charcoal-fg)", fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600,
} as const;
const quiet = {
  minHeight: "40px", padding: "8px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-pill)", cursor: "pointer",
  background: "transparent", color: "var(--ink)", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 500,
} as const;

/** The reader's own record, in a sentence: never a score, only what they answered. */
export function lookBackSummary(didnt: number, through: number): string {
  const total = didnt + through;
  const lead = `You have looked back on ${total} ${total === 1 ? "worry" : "worries"}.`;
  if (through === 0) return `${lead} ${didnt === 1 ? "It did not happen." : `None of the ${didnt} happened.`}`;
  if (didnt === 0) return `${lead} ${through === 1 ? "It happened, and you got through it." : `All ${through} happened, and you got through every one.`}`;
  return `${lead} ${didnt} did not happen, and you got through the ${through === 1 ? "one that did" : `${through} that did`}.`;
}

const daysSince = (iso: string, now: Date) => (now.getTime() - new Date(iso).getTime()) / 864e5;
const newId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

export default function WorryJournal() {
  const [entries, setEntries] = useState<WorryEntry[]>(() => readStoredJSON(STORAGE_KEY, isEntries, []));
  const [saveFailed, setSaveFailed] = useState(false);
  const [draft, setDraft] = useState({ worry: "", mine: "", notMine: "", prayer: "" });
  const [closed, setClosed] = useState(false);

  const persist = (next: WorryEntry[]) => {
    setEntries(next);
    setSaveFailed(!writeStoredJSON(STORAGE_KEY, next));
  };

  const closeDay = () => {
    if (!draft.worry.trim()) return;
    persist([{ id: newId(), date: new Date().toISOString(), ...draft, outcome: null }, ...entries]);
    setDraft({ worry: "", mine: "", notMine: "", prayer: "" });
    setClosed(true);
  };
  const setOutcome = (id: string, outcome: Outcome) => persist(entries.map((e) => (e.id === id ? { ...e, outcome } : e)));
  const remove = (id: string) => {
    if (!window.confirm("Delete this entry from your journal?")) return;
    persist(entries.filter((e) => e.id !== id));
  };
  const clearAll = () => {
    if (!window.confirm("Clear the whole journal from this browser? This cannot be undone.")) return;
    removeStoredJSON(STORAGE_KEY);
    setEntries([]);
    setSaveFailed(false);
  };

  const now = new Date();
  const toLookBack = entries.filter((e) => (e.outcome === null || e.outcome === "waiting") && daysSince(e.date, now) >= LOOK_BACK_DAYS);
  const answered = entries.filter((e) => e.outcome === "didnt" || e.outcome === "through");
  const didnt = answered.filter((e) => e.outcome === "didnt").length;
  const through = answered.length - didnt;

  return (
    <Layout>
      <SEOMeta
        title="The Worry Journal: Five Minutes Before Bed"
        description="A private evening journal for worry: name it, sort what is yours to do from what is not, pray, and later see how your worries turned out."
        url="https://www.livewellbyjamesbell.co/tools/worry-journal"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>
            <Link href="/help/anxiety" style={{ color: "inherit" }}>Find help: anxiety</Link> · A companion tool
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.4vw, 56px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "0 0 16px" }}>
            The Worry Journal
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.7, margin: "0 0 12px", maxWidth: "60ch" }}>
            Five minutes before bed. Name what you are worried about, sort the one thing that is yours to do tomorrow from what is not yours to carry, and hand the rest to God in a sentence of prayer. After a few days, each worry will ask how it turned out.
          </p>
          <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, margin: 0, maxWidth: "60ch", opacity: 0.85 }}>
            Everything you write stays in this browser and is never sent anywhere. This is a journal, not treatment: if worry has taken over your days or your sleep for weeks, see a doctor or a licensed counselor.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }} aria-labelledby="tonight">
        <div style={wrap}>
          <h2 id="tonight" style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.6vw, 34px)", fontWeight: 400, color: "var(--ink)", margin: "0 0 var(--s-3)" }}>
            Tonight
          </h2>

          {closed ? (
            <div role="status" style={{ background: "var(--card)", border: "1px solid var(--border)", borderTop: "2px solid var(--mustard)", padding: "var(--s-3)" }}>
              <p style={{ fontFamily: "var(--F)", fontSize: "21px", fontStyle: "italic", lineHeight: 1.5, color: "var(--ink)", margin: "0 0 6px" }}>
                "I will lie down and sleep in peace, for You alone, O LORD, make me dwell in safety."
              </p>
              <p style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)", margin: "0 0 14px" }}>Psalm 4:8</p>
              <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.65, color: "var(--ink)", margin: "0 0 14px" }}>
                The day is closed. What was yours to do is written down for the morning, and the rest has been handed over. Goodnight.
              </p>
              <button type="button" style={quiet} onClick={() => setClosed(false)}>Write another</button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); closeDay(); }}>
              <div style={{ marginBottom: "var(--s-3)" }}>
                <label htmlFor="wj-worry" style={label}>1. What are you worried about tonight?</label>
                <p style={hint}>Say it plainly, the way you would to a friend. One worry is enough.</p>
                <textarea id="wj-worry" required rows={3} style={field} value={draft.worry} onChange={(e) => setDraft({ ...draft, worry: e.target.value })} />
              </div>
              <div style={{ marginBottom: "var(--s-3)" }}>
                <label htmlFor="wj-mine" style={label}>2. What part of this is yours to do tomorrow?</label>
                <p style={hint}>One small, real thing: a call, a question, an email, an appointment. If there is nothing to do, write that.</p>
                <input id="wj-mine" type="text" style={field} value={draft.mine} onChange={(e) => setDraft({ ...draft, mine: e.target.value })} />
              </div>
              <div style={{ marginBottom: "var(--s-3)" }}>
                <label htmlFor="wj-notmine" style={label}>3. What part is not yours to carry?</label>
                <p style={hint}>
                  Other people's choices, the outcome, the future. The first letter of Peter tells Christians under real pressure, "Cast all your anxiety on Him, because He cares for you" (1 Peter 5:7).
                </p>
                <textarea id="wj-notmine" rows={2} style={field} value={draft.notMine} onChange={(e) => setDraft({ ...draft, notMine: e.target.value })} />
              </div>
              <div style={{ marginBottom: "var(--s-3)" }}>
                <label htmlFor="wj-prayer" style={label}>4. A sentence of prayer</label>
                <p style={hint}>It does not need to be eloquent. <em>Lord, I give you this. Tomorrow I will do the one thing. Tonight I am going to sleep.</em></p>
                <textarea id="wj-prayer" rows={2} style={field} value={draft.prayer} onChange={(e) => setDraft({ ...draft, prayer: e.target.value })} />
              </div>
              <button type="submit" style={{ ...primary, opacity: draft.worry.trim() ? 1 : 0.6 }} disabled={!draft.worry.trim()}>
                Close the day
              </button>
            </form>
          )}
          {saveFailed && (
            <p role="status" style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: "10px 0 0" }}>
              Couldn't save to this browser — your work here will not survive a reload.
            </p>
          )}
          <ScriptureNote rendering="bsb" />
        </div>
      </section>

      <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" }} aria-labelledby="looking-back">
        <div style={wrap}>
          <h2 id="looking-back" style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.6vw, 34px)", fontWeight: 400, color: "var(--ink)", margin: "0 0 10px" }}>
            Looking back
          </h2>
          {entries.length === 0 ? (
            <p style={{ ...hint, fontSize: "16px" }}>Nothing here yet. After your first few evenings, the worries you wrote will come back and ask how they turned out.</p>
          ) : (
            <>
              {answered.length > 0 && (
                <p style={{ fontFamily: "var(--B)", fontSize: "16.5px", lineHeight: 1.7, color: "var(--ink)", margin: "0 0 var(--s-3)" }}>
                  {lookBackSummary(didnt, through)} Worry tells you it is keeping you safe. Your own record is worth reading the next time it says so.
                </p>
              )}
              {toLookBack.length > 0 && (
                <div style={{ marginBottom: "var(--s-4)" }}>
                  <h3 style={{ fontFamily: "var(--F)", fontSize: "22px", fontWeight: 500, color: "var(--ink)", margin: "0 0 10px" }}>How did these turn out?</h3>
                  {toLookBack.map((e) => (
                    <div key={e.id} style={{ background: "var(--card)", border: "1px solid var(--border)", padding: "14px 16px", marginBottom: "10px" }}>
                      <p style={{ fontFamily: "var(--U)", fontSize: "12.5px", color: "var(--ink-muted)", margin: "0 0 4px" }}>{new Date(e.date).toLocaleDateString()}</p>
                      <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.6, color: "var(--ink)", margin: "0 0 10px" }}>{e.worry}</p>
                      <div role="group" aria-label="How it turned out" style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {OUTCOMES.map((o) => (
                          <button key={o.value} type="button" style={{ ...quiet, ...(e.outcome === o.value ? { background: "var(--ink)", color: "var(--bone)", borderColor: "var(--ink)" } : {}) }} aria-pressed={e.outcome === o.value} onClick={() => setOutcome(e.id, o.value)}>
                            {o.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <h3 style={{ fontFamily: "var(--F)", fontSize: "22px", fontWeight: 500, color: "var(--ink)", margin: "0 0 10px" }}>Your journal</h3>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {entries.map((e) => (
                  <li key={e.id} style={{ borderBottom: "1px solid var(--border)", padding: "12px 0" }}>
                    <p style={{ fontFamily: "var(--U)", fontSize: "12.5px", color: "var(--ink-muted)", margin: "0 0 4px" }}>
                      {new Date(e.date).toLocaleDateString()}
                      {e.outcome ? ` · ${OUTCOMES.find((o) => o.value === e.outcome)?.label}` : ""}
                    </p>
                    <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.6, color: "var(--ink)", margin: "0 0 4px" }}>{e.worry}</p>
                    {e.mine && <p style={{ ...hint, margin: "0 0 2px" }}>Mine to do: {e.mine}</p>}
                    {e.notMine && <p style={{ ...hint, margin: "0 0 2px" }}>Not mine to carry: {e.notMine}</p>}
                    {e.prayer && <p style={{ ...hint, fontStyle: "italic", margin: "0 0 6px" }}>{e.prayer}</p>}
                    <button type="button" onClick={() => remove(e.id)} style={{ font: "inherit", fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", background: "none", border: 0, padding: 0, cursor: "pointer", textDecoration: "underline" }}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
              <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: "var(--s-3) 0 0" }}>
                Saved only in this browser.{" "}
                <button type="button" onClick={clearAll} style={{ font: "inherit", color: "var(--mustard-text)", background: "none", border: 0, padding: 0, cursor: "pointer", textDecoration: "underline" }}>
                  Clear the whole journal
                </button>
              </p>
            </>
          )}
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-4)" }}>
        <div style={wrap}>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", margin: "0 0 10px" }}>
            Rather write by hand? Print a week of evenings:{" "}
            <a href="/downloads/tools/worry-log-letter.pdf" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>US Letter</a>
            {" · "}
            <a href="/downloads/tools/worry-log-a4.pdf" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>A4</a> (PDF).
          </p>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", margin: "0 0 var(--s-3)" }}>
            For the whole picture of what worry is, what Scripture says to it, and when to get more help, read{" "}
            <Link href="/help/anxiety" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>I can't stop worrying</Link>, or walk{" "}
            <Link href="/plans/anxiety" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>the eight-week plan</Link>.
          </p>
          <ToolActions toolName="The Worry Journal" />
        </div>
        <CrisisBlock variant="compact" />
      </section>
    </Layout>
  );
}

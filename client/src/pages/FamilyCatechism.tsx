/**
 * Family Catechism (/family/catechism) — a New City Catechism-style set of 76
 * questions a family learns and discusses together. A family has its own
 * place, from question 1, kept on this device (audit 2026-11, F4); a household
 * learning with a church can follow the calendar's weekly pick instead, which
 * walks every question in turn and starts again (lib/familyCatechism.ts). Each
 * question opens to an adult answer, a child's version, the Scripture, a short
 * commentary, and a prayer. Data: /family-catechism.json.
 */
import { useEffect, useMemo, useState } from "react";
import { useProgress } from "@/hooks/useProgress";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import ScriptureNote from "@/components/ScriptureNote";
import { VerseRef } from "@/components/VerseRef";
import LoadFailed from "@/components/LoadFailed";
import { fetchJson } from "@/lib/fetch-json";
import { SAVE_FAILED } from "@/components/TakeItWithYou";
import { catechismWeekIndex, familyQuestionIndex, nextPlace, readCatechismPlace, saveCatechismPlace, type CatechismPlace } from "@/lib/familyCatechism";

interface Entry {
  number: number;
  part: string;
  question: string;
  answer: string;
  kidsAnswer: string;
  scripture: string;
  scriptureText: string;
  commentary: string;
  prayer?: string;
}

function isEntries(x: unknown): x is Entry[] {
  return Array.isArray(x) && x.every((e) => typeof e?.number === "number" && typeof e?.question === "string" && typeof e?.part === "string");
}

const quiet = { fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--ink)", background: "none", border: "1px solid var(--borderdk)", borderRadius: "var(--radius-sm)", minHeight: "44px", padding: "0 16px", cursor: "pointer" } as const;

function QuestionCard({ e, highlight, open, setOpen, learned, onToggleLearned, onStartHere }: {
  e: Entry;
  highlight?: boolean;
  open: number | null;
  setOpen: (n: number | null) => void;
  learned?: boolean;
  onToggleLearned?: () => void;
  /** Make this the family's question (its own place in the catechism). */
  onStartHere?: () => void;
}) {
  const isOpen = open === e.number;
  return (
    <div style={{ background: "var(--card)", border: `1px solid ${highlight ? "var(--mustard)" : "var(--border)"}`, borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
      <button type="button" onClick={() => setOpen(isOpen ? null : e.number)} aria-expanded={isOpen}
        style={{ width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", padding: "16px var(--s-4)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
        <span style={{ display: "flex", gap: "12px" }}>
          <span style={{ fontFamily: "var(--F)", fontSize: "18px", color: "var(--mustard-text)", fontWeight: 500, minWidth: "28px" }}>{learned ? "✓" : e.number}</span>
          <span style={{ fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, color: "var(--ink)", lineHeight: 1.3 }}>{e.question}</span>
        </span>
        <ChevronDown size={18} aria-hidden style={{ flexShrink: 0, color: "var(--ink-muted)", marginTop: "4px", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
      </button>
      {isOpen && (
        <div style={{ padding: "0 var(--s-4) var(--s-4)", borderTop: "1px solid var(--border)" }}>
          <p style={{ fontFamily: "var(--F)", fontSize: "19px", lineHeight: 1.5, color: "var(--ink)", margin: "16px 0" }}>{e.answer}</p>
          <div style={{ marginBottom: "16px" }}>
            <span className="eyebrow">For the little ones</span>
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink-muted)", marginTop: "4px" }}>{e.kidsAnswer}</p>
          </div>
          <div style={{ marginBottom: "16px" }}>
            {/* The verse is printed below it, so the reference goes to its chapter. */}
            <span className="eyebrow"><VerseRef reference={e.scripture} mode="link" /></span>
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", fontStyle: "italic", marginTop: "4px" }}>{e.scriptureText}</p>
          </div>
          <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", marginBottom: e.prayer ? "16px" : 0 }}>{e.commentary}</p>
          {e.prayer && (
            <p style={{ fontFamily: "var(--F)", fontSize: "15px", fontStyle: "italic", lineHeight: 1.7, color: "var(--ink-muted)", borderLeft: "2px solid var(--mustard)", paddingLeft: "14px" }}>{e.prayer}</p>
          )}
          {onToggleLearned && (
            <button type="button" onClick={onToggleLearned}
              style={{ marginTop: "18px", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: learned ? "var(--mustard-text)" : "var(--ink-muted)", background: "none", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "8px 14px", cursor: "pointer" }}>
              {learned ? "✓ Learned" : "Mark learned"}
            </button>
          )}
          {onStartHere && (
            <button type="button" onClick={onStartHere}
              style={{ marginTop: "18px", marginLeft: onToggleLearned ? "10px" : 0, fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--ink-muted)", background: "none", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "8px 14px", cursor: "pointer" }}>
              Make this our question
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function FamilyCatechism() {
  // Loading, failed, and loaded are distinct states keyed to a retry nonce
  // (the HowTos pattern), so a failed fetch offers a retry instead of
  // "Loading…" forever.
  const [loaded, setLoaded] = useState<Entry[] | null>(null);
  const [failedAt, setFailedAt] = useState<number | null>(null);
  const [nonce, setNonce] = useState(0);
  const failed = failedAt === nonce;
  const [open, setOpen] = useState<number | null>(null);
  const { isDone, toggle, count, reset, persisted } = useProgress("lw-family-catechism-v1");

  useEffect(() => {
    let live = true;
    fetchJson("/family-catechism.json", isEntries)
      .then((d) => { if (live) setLoaded(d); })
      .catch(() => { if (live) setFailedAt(nonce); });
    return () => { live = false; };
  }, [nonce]);

  const entries = useMemo(() => loaded ?? [], [loaded]);
  const parts = useMemo(() => {
    const order: string[] = [];
    const map = new Map<string, Entry[]>();
    for (const e of entries) {
      if (!map.has(e.part)) { map.set(e.part, []); order.push(e.part); }
      map.get(e.part)!.push(e);
    }
    return order.map((p) => ({ part: p, items: map.get(p)! }));
  }, [entries]);

  // A family's own place (audit 2026-11, F4): question 1 until it moves, kept
  // on this device. A household learning with a church can follow the
  // calendar's weekly question instead.
  const [place, setPlace] = useState<CatechismPlace>(() => readCatechismPlace());
  const [placeKept, setPlaceKept] = useState(true);
  const move = (next: CatechismPlace) => {
    setPlace(next);
    setPlaceKept(saveCatechismPlace(next));
  };
  const calendar = entries.length > 0 ? entries[catechismWeekIndex(new Date(), entries.length)] : undefined;
  const ours = entries.length > 0 ? entries[familyQuestionIndex(place, entries.length)] : undefined;
  const own = place.follow === "own";
  const learnAndGoOn = () => {
    if (!ours) return;
    if (!isDone(String(ours.number))) toggle(String(ours.number));
    move(nextPlace({ ...place, at: ours.number }, entries.length));
    setOpen(null);
  };

  return (
    <Layout>
      <SEOMeta
        title="Family Catechism: 76 Questions and Answers"
        description="Seventy-six short questions and answers that teach the faith. Each week: a question, answers for adults and children, a verse, a reflection, a prayer."
        url="https://www.livewellbyjamesbell.co/family/catechism"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/family" style={{ color: "inherit" }}>Family</Link> · Catechism
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "22ch" }}>
            The Family Catechism
          </h1>
          <p className="page-standfirst">Short questions and answers that teach the faith.</p>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "var(--charcoal-fg-muted)", maxWidth: "62ch" }}>
            Seventy-six questions, taken one a week. A family learns the faith the way it has always been learned, by question and answer, said out loud together until it lives in them. Each one has an answer for the grown-ups and a shorter one for the little ones, a verse, a short word for the parent, and a prayer.
          </p>
          <p style={{ fontFamily: "var(--U)", fontSize: "15px", lineHeight: 1.6, marginTop: "var(--s-2)" }}>
            <Link href="/how-tos/fam-how-to-use-a-family-catechism" style={{ color: "var(--charcoal-fg)", textDecoration: "underline", textDecorationColor: "var(--mustard)", textUnderlineOffset: "0.2em" }}>
              New to this? How to use a family catechism
            </Link>
          </p>
        </div>
      </section>

      {/* THE FAMILY'S OWN PLACE, OR THE CALENDAR'S QUESTION */}
      {ours && (
        <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" }} aria-label={own ? "Your family's place in the catechism" : "This week's question"}>
          <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "12px" }}>
              {own ? `Your family's place: Question ${ours.number} of ${entries.length}` : `This week: Question ${ours.number}`}
            </div>
            <QuestionCard e={ours} highlight open={open} setOpen={setOpen} learned={isDone(String(ours.number))} onToggleLearned={() => toggle(String(ours.number))} />
            {own ? (
              <>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "var(--s-3)" }}>
                  <button type="button" className="pg-action" onClick={learnAndGoOn}>
                    {ours.number >= entries.length ? "We learned it. Back to question 1" : "We learned it. Next question"}
                  </button>
                  {ours.number > 1 && (
                    <button type="button" style={quiet} onClick={() => move({ ...place, at: ours.number - 1 })}>
                      Go back one
                    </button>
                  )}
                </div>
                <p style={{ fontFamily: "var(--U)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", margin: "var(--s-3) 0 0", maxWidth: "62ch" }} aria-live="polite">
                  {placeKept ? "This device remembers which question your family is on. Stay on one as long as it takes." : SAVE_FAILED}
                  {calendar && (
                    <>
                      {" "}
                      If you're learning these with a church or a group, you can{" "}
                      <button type="button" onClick={() => move({ ...place, follow: "calendar" })} style={{ font: "inherit", fontWeight: 600, color: "var(--mustard-text)", background: "none", border: "none", padding: "10px 0", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "0.2em" }}>
                        follow the calendar's question instead
                      </button>
                      {" "}(this week it's question {calendar.number}).
                    </>
                  )}
                </p>
              </>
            ) : (
              <p style={{ fontFamily: "var(--U)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", margin: "var(--s-3) 0 0", maxWidth: "62ch" }} aria-live="polite">
                {placeKept ? "You're following the calendar, one question a week, the same for every household." : SAVE_FAILED}{" "}
                <button type="button" onClick={() => move({ ...place, follow: "own" })} style={{ font: "inherit", fontWeight: 600, color: "var(--mustard-text)", background: "none", border: "none", padding: "10px 0", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "0.2em" }}>
                  {place.at > 1 ? `Go back to your own place, question ${place.at}` : "Start at question 1 and go at your own pace"}
                </button>
              </p>
            )}
          </div>
        </section>
      )}

      {/* EVERY QUESTION, BY PART */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          {failed && (
            <LoadFailed what="The catechism" onRetry={() => setNonce((n) => n + 1)} backHref="/family" backLabel="Back to Family" />
          )}
          {!loaded && !failed && (
            <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }} role="status">Loading the catechism…</p>
          )}
          {entries.length > 0 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "var(--s-4)" }}>
              <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em", color: "var(--ink-muted)" }}>
                {count} of {entries.length} learned{!persisted && " — couldn't save to this browser, your progress here will not survive a reload"}
              </span>
              {count > 0 && (
                <button type="button" onClick={reset}
                  style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--ink-muted)", background: "none", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "7px 13px", cursor: "pointer" }}>
                  Reset progress
                </button>
              )}
            </div>
          )}
          {parts.length > 0 && <ScriptureNote rendering="bsb" />}
          {parts.map(({ part, items }) => (
            <div key={part} style={{ marginBottom: "var(--s-5)" }}>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s-3)", paddingBottom: "8px", borderBottom: "2px solid var(--mustard)" }}>{part}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {items.map((e) => <QuestionCard key={e.number} e={e} open={open} setOpen={setOpen} learned={isDone(String(e.number))} onToggleLearned={() => toggle(String(e.number))} onStartHere={own && ours?.number === e.number ? undefined : () => { move({ v: 1, follow: "own", at: e.number }); window.scrollTo({ top: 0 }); }} />)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

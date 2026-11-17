/**
 * Family Bible reading plans (/family/reading-plans) — structured plans a family
 * follows together, each day a passage and a short prompt. Data:
 * /family-reading-plans.json. A family starts a plan on a date, and from then
 * on the page opens on today's reading (lib/familyPlans, audit 2026-11 F16).
 */
import { useEffect, useState } from "react";
import { useProgress } from "@/hooks/useProgress";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import LoadFailed from "@/components/LoadFailed";
import { RefText } from "@/components/VerseRef";
import { fetchJson } from "@/lib/fetch-json";
import { RemindMe } from "@/components/RemindMe";
import { SAVE_FAILED } from "@/components/TakeItWithYou";
import { localISODate } from "@/lib/familyYear";
import { PLAN_TICKS_KEY, firstUnread, planDayOn, readPlanStarts, savePlanStarts, withPlanStart, withoutPlan, type PlanStarts } from "@/lib/familyPlans";

interface Day { day: number; passage: string; prompt: string; }
interface Plan { id: string; title: string; description: string; audience: string; length: string; days: Day[]; }

function isPlans(x: unknown): x is Plan[] {
  return Array.isArray(x) && x.every((p) => typeof p?.id === "string" && typeof p?.title === "string" && Array.isArray(p?.days));
}

export default function FamilyReadingPlans() {
  // Loading, failed, and loaded are distinct states keyed to a retry nonce
  // (the HowTos pattern), so a failed fetch offers a retry instead of
  // "Loading plans…" forever.
  const [loaded, setLoaded] = useState<Plan[] | null>(null);
  const [failedAt, setFailedAt] = useState<number | null>(null);
  const [nonce, setNonce] = useState(0);
  const failed = failedAt === nonce;
  const plans = loaded ?? [];
  const [open, setOpen] = useState<string | null>(null);
  const { isDone, toggle, count, reset, persisted } = useProgress(PLAN_TICKS_KEY);
  // Plans that know what day it is (audit 2026-11, F16): the date each plan
  // was started, on this device, and today on the reader's own calendar.
  const [today] = useState(() => localISODate());
  const [starts, setStarts] = useState<PlanStarts>(() => readPlanStarts());
  const [startsKept, setStartsKept] = useState(true);
  const keep = (next: PlanStarts) => {
    setStarts(next);
    setStartsKept(savePlanStarts(next));
  };
  const started = plans.flatMap((plan) => {
    const start = starts.starts[plan.id];
    const at = start ? planDayOn(start, today, plan.days.length) : null;
    return at ? [{ plan, at }] : [];
  });

  useEffect(() => {
    let live = true;
    fetchJson("/family-reading-plans.json", isPlans)
      .then((d) => { if (live) setLoaded(d); })
      .catch(() => { if (live) setFailedAt(nonce); });
    return () => { live = false; };
  }, [nonce]);

  /** Today's day of a started plan, or null. */
  const todayOf = (plan: Plan) => started.find((s) => s.plan.id === plan.id && !s.at.finished)?.at.day ?? null;

  return (
    <Layout>
      <SEOMeta
        title="Family Bible Reading Plans"
        description="Read the Bible together as a family: the life of Jesus, the Old Testament for kids, the Psalms, and a starter plan. A passage and a prompt for each day."
        url="https://www.livewellbyjamesbell.co/family/reading-plans"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/family" style={{ color: "inherit" }}>Family</Link> · Reading plans
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>
            Read the Bible together.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "var(--charcoal-fg-muted)", maxWidth: "62ch" }}>
            A passage a day and a short prompt to talk about it. Walk the life of Jesus, the great Old Testament story, the Psalms, or a starter plan if your family is beginning or beginning again. Start one today and this page will open on today's reading each time you come back.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto", display: "flex", flexDirection: "column", gap: "16px" }}>
          {failed && (
            <LoadFailed what="The reading plans" onRetry={() => setNonce((n) => n + 1)} backHref="/family" backLabel="Back to Family" />
          )}
          {!loaded && !failed && (
            <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }} role="status">Loading plans…</p>
          )}
          {started.length > 0 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "var(--s-3)" }}>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3vw, 32px)", fontWeight: 500, lineHeight: 1.15, color: "var(--ink)", margin: 0 }}>Today's reading</h2>
              {started.map(({ plan, at }) => {
                const day = plan.days[at.day - 1];
                const key = `${plan.id}:${at.day}`;
                const behind = firstUnread(plan.id, Math.min(at.day, plan.days.length + 1), isDone);
                return (
                  <div key={plan.id} className="tb-tonight" style={{ minHeight: 0 }}>
                    <p className="eyebrow" style={{ margin: 0 }}>
                      {plan.title} · {at.finished ? `${plan.days.length} days` : `Day ${at.day} of ${plan.days.length}`}
                    </p>
                    {day ? (
                      <>
                        <h3 className="tb-tonight__title" style={{ fontSize: "clamp(26px, 3.4vw, 36px)" }}>
                          <RefText text={day.passage} />
                        </h3>
                        <p className="tb-text" style={{ maxWidth: "62ch", margin: "0 0 var(--s-2)" }}>{day.prompt}</p>
                      </>
                    ) : (
                      <p className="tb-text" style={{ maxWidth: "62ch", margin: "10px 0 var(--s-2)" }}>
                        By the calendar you've reached the end of this plan.{behind ? ` Day ${behind} is the first one not ticked.` : ""}
                      </p>
                    )}
                    <div className="tb-tonight__actions">
                      {day && (
                        <button type="button" className={isDone(key) ? "pg-action pg-action--quiet" : "pg-action"} aria-pressed={isDone(key)} onClick={() => toggle(key)}>
                          {isDone(key) ? "✓ Read today" : "We read it"}
                        </button>
                      )}
                      {behind && (
                        <button type="button" className="pg-action pg-action--quiet" onClick={() => keep(withPlanStart(starts, plan.id, today, behind))}>
                          Make today day {behind}
                        </button>
                      )}
                      {!day && (
                        <button type="button" className="pg-action pg-action--quiet" onClick={() => keep(withPlanStart(starts, plan.id, today))}>
                          Start it again today
                        </button>
                      )}
                      <button type="button" className="pg-action pg-action--quiet" onClick={() => keep(withoutPlan(starts, plan.id))}>
                        Stop this plan
                      </button>
                    </div>
                    {day && (
                      <RemindMe
                        title={`Family reading: ${plan.title}`}
                        details="Today's passage from your family reading plan, with one thing to talk about."
                        href="/family/reading-plans"
                        freq="DAILY"
                        count={plan.days.length - at.day + 1}
                        schedule={plan.days.length - at.day + 1 === 1 ? "today" : `once a day for the ${plan.days.length - at.day + 1} days left`}
                      />
                    )}
                    {day && behind && (
                      <p className="tb-line">
                        Day {behind} is the first one not ticked. If you fell behind, nothing is lost: make today day {behind} and carry on from there.
                      </p>
                    )}
                  </div>
                );
              })}
              {!startsKept && <p className="tb-line">{SAVE_FAILED}</p>}
            </div>
          )}
          {plans.length > 0 && count > 0 && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px", marginBottom: "var(--s-3)" }}>
              <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em", color: "var(--ink-muted)" }}>
                {count} day{count === 1 ? "" : "s"} read{!persisted && " — couldn't save to this browser, your progress here will not survive a reload"}
              </span>
              <button type="button" onClick={reset}
                style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--ink-muted)", background: "none", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "7px 13px", cursor: "pointer" }}>
                Reset progress
              </button>
            </div>
          )}
          {plans.map((plan) => {
            const isOpen = open === plan.id;
            return (
              <div key={plan.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderTop: "2px solid var(--mustard)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                <button type="button" onClick={() => setOpen(isOpen ? null : plan.id)} aria-expanded={isOpen}
                  style={{ width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", padding: "var(--s-4)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <span>
                    <span style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard-text)" }}>{plan.audience} · {plan.length}</span>
                    <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "24px", fontWeight: 500, color: "var(--ink)", margin: "4px 0 8px" }}>{plan.title}</span>
                    <span style={{ display: "block", fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink-muted)", maxWidth: "62ch" }}>{plan.description}</span>
                  </span>
                  <ChevronDown size={20} aria-hidden style={{ flexShrink: 0, color: "var(--ink-muted)", marginTop: "4px", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
                </button>
                {!starts.starts[plan.id] && (
                  <div style={{ padding: "0 var(--s-4) var(--s-4)" }}>
                    <button type="button" className="pg-action pg-action--quiet" onClick={() => { keep(withPlanStart(starts, plan.id, today)); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
                      Start today
                    </button>
                    {!startsKept && <p className="tb-line">{SAVE_FAILED}</p>}
                  </div>
                )}
                {isOpen && (
                  <div style={{ borderTop: "1px solid var(--border)" }}>
                    {plan.days.map((d) => (
                      <div key={d.day} aria-current={todayOf(plan) === d.day ? "date" : undefined} style={{ display: "flex", gap: "14px", padding: "12px var(--s-4)", borderBottom: "1px solid var(--border)", alignItems: "flex-start", background: todayOf(plan) === d.day ? "var(--bone-warm)" : undefined }}>
                        <button type="button" onClick={() => toggle(`${plan.id}:${d.day}`)} aria-pressed={isDone(`${plan.id}:${d.day}`)} title="Mark this day read"
                          style={{ fontFamily: "var(--F)", fontSize: "16px", color: "var(--mustard-text)", fontWeight: 500, minWidth: "62px", background: "none", border: "none", cursor: "pointer", textAlign: "left", padding: 0 }}>
                          {isDone(`${plan.id}:${d.day}`) ? `✓ Day ${d.day}` : `Day ${d.day}`}
                        </button>
                        <span>
                          {/* The page quotes nothing, so the day's passage opens in a verse sheet. */}
                          <span style={{ display: "block", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}><RefText text={d.passage} />{todayOf(plan) === d.day && <span style={{ color: "var(--mustard-text)" }}> · Today</span>}</span>
                          <span style={{ display: "block", fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", marginTop: "2px" }}>{d.prompt}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {plans.length > 0 && (
            <p style={{ fontFamily: "var(--U)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink-muted)", margin: "var(--s-2) 0 0" }}>
              For the whole Bible in a year, there's a plan for that too:{" "}
              <Link href="/study/bible/guides/whole-story-2027" className="tb-different__link">
                Read the whole story in 2027
              </Link>
              .
            </p>
          )}
        </div>
      </section>
    </Layout>
  );
}

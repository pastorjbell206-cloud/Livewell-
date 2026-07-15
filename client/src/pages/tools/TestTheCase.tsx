import { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useProgress } from "@/hooks/useProgress";
import { ARGUMENT_CASES, caseBySlug, type ArgumentCase } from "@/data/argumentCases";

/**
 * Test the Case (/tools/test-the-case) is the "argued with, not preached at"
 * tool. A case is worked one move at a time; at each move the reader can push
 * back with the objection they actually hold and get the honest answer,
 * including what the move does not prove. Progress persists via useProgress so
 * a reader can leave and come back where they stopped. Unpublished cases show
 * an honest "In progress" and never dead-end.
 */
const PUBLISHED = ARGUMENT_CASES.filter((c) => c.published);
const DEFAULT_CASE: ArgumentCase = PUBLISHED[0] ?? ARGUMENT_CASES[0];

function initialSlug(): string {
  if (typeof window === "undefined") return DEFAULT_CASE.slug;
  const requested = new URLSearchParams(window.location.search).get("case");
  const c = requested ? caseBySlug(requested) : undefined;
  return c && c.published ? c.slug : DEFAULT_CASE.slug;
}

const wrap = { maxWidth: "var(--w-prose)", margin: "0 auto" } as const;

export default function TestTheCase() {
  const [slug, setSlug] = useState<string>(() => initialSlug());
  const active = caseBySlug(slug) ?? DEFAULT_CASE;
  const { done, toggle, reset } = useProgress("lw-test-the-case");

  const keyFor = (stepId: string) => `${active.slug}:${stepId}`;
  const completed = useMemo(
    () => active.steps.filter((s) => done[keyFor(s.id)]).length,
    [active, done]
  );

  // Resume at the first not-yet-passed step (capped at the last step).
  const [stepIdx, setStepIdx] = useState<number>(() =>
    Math.min(completed, Math.max(0, active.steps.length - 1))
  );
  const [openObjection, setOpenObjection] = useState<number | null>(null);
  // Once the reader passes the final step, the closing verdict shows.
  const finishedKey = `${active.slug}:__finished`;
  const finished = Boolean(done[finishedKey]);

  const step = active.steps[stepIdx];
  const isLast = stepIdx === active.steps.length - 1;

  function switchCase(next: ArgumentCase) {
    if (!next.published) return;
    setSlug(next.slug);
    const passed = next.steps.filter((s) => done[`${next.slug}:${s.id}`]).length;
    setStepIdx(Math.min(passed, Math.max(0, next.steps.length - 1)));
    setOpenObjection(null);
  }

  function advance() {
    if (!done[keyFor(step.id)]) toggle(keyFor(step.id));
    setOpenObjection(null);
    if (isLast) {
      if (!done[finishedKey]) toggle(finishedKey);
    } else {
      setStepIdx((i) => i + 1);
    }
  }

  function back() {
    setOpenObjection(null);
    if (finished) {
      if (done[finishedKey]) toggle(finishedKey);
      return;
    }
    setStepIdx((i) => Math.max(0, i - 1));
  }

  function startOver() {
    // Clear only this case's progress, keep any other case's.
    for (const s of active.steps) if (done[keyFor(s.id)]) toggle(keyFor(s.id));
    if (done[finishedKey]) toggle(finishedKey);
    setStepIdx(0);
    setOpenObjection(null);
  }

  const btn = {
    fontFamily: "var(--U)",
    fontSize: "13px",
    fontWeight: 600,
    borderRadius: "var(--radius-sm)",
    cursor: "pointer",
    padding: "10px 18px",
  } as const;

  return (
    <Layout>
      <SEOMeta
        title="Test the Case: Push Back at Every Step"
        description="An interactive, honest walkthrough of the case for the resurrection. Raise the objection you actually hold at each move and get the real answer, including what it does not prove. No altar call."
        url="https://www.livewellbyjamesbell.co/tools/test-the-case"
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-4) var(--s-6)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>Test the Case</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.5vw, 56px)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", marginBottom: "18px", maxWidth: "20ch" }}>
            {active.title}
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "62ch" }}>
            {active.intro}
          </p>
        </div>
      </section>

      {/* CASE PICKER */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-4)" }}>
        <div style={{ ...wrap, display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-muted)", marginRight: "4px" }}>The cases</span>
          {ARGUMENT_CASES.map((c) =>
            c.published ? (
              <button key={c.slug} type="button" onClick={() => switchCase(c)}
                style={{ ...btn, background: c.slug === active.slug ? "var(--ink)" : "var(--card)", color: c.slug === active.slug ? "var(--bone)" : "var(--ink)", border: "1px solid var(--border)" }}>
                {c.title}
              </button>
            ) : (
              <span key={c.slug} title="This case is being written"
                style={{ ...btn, background: "transparent", color: "var(--ink-muted)", border: "1px dashed var(--border)", cursor: "default" }}>
                {c.title} · In progress
              </span>
            )
          )}
        </div>
      </section>

      {/* THE STEP-THROUGH */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-7)" }}>
        <div style={wrap}>
          {finished ? (
            <div>
              <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "12px" }}>Where the case ends</div>
              <p style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 2.6vw, 26px)", lineHeight: 1.5, color: "var(--ink)", marginBottom: "28px", maxWidth: "60ch" }}>
                {active.close}
              </p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                <button type="button" onClick={back} style={{ ...btn, background: "var(--card)", color: "var(--ink)", border: "1px solid var(--border)" }}>Back to the last step</button>
                <button type="button" onClick={startOver} style={{ ...btn, background: "transparent", color: "var(--ink-muted)", border: "1px solid var(--border)" }}>Start this case over</button>
              </div>
            </div>
          ) : (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "16px" }}>
                <span style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--mustard-text)" }}>
                  Move {stepIdx + 1} of {active.steps.length}
                </span>
                {completed > 0 && (
                  <button type="button" onClick={startOver} style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, color: "var(--ink-muted)", background: "none", border: "none", cursor: "pointer", textDecoration: "underline", textUnderlineOffset: "3px" }}>
                    Start over
                  </button>
                )}
              </div>

              <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "var(--ink)", marginBottom: "24px", maxWidth: "64ch" }}>
                {step.move}
              </p>

              <div style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: "10px" }}>
                Not convinced? Push back.
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "24px" }}>
                {step.objections.map((o, i) => {
                  const isOpen = openObjection === i;
                  return (
                    <div key={i} style={{ border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden", background: "var(--card)" }}>
                      <button type="button" onClick={() => setOpenObjection(isOpen ? null : i)} aria-expanded={isOpen}
                        style={{ width: "100%", textAlign: "left", padding: "14px var(--s-4)", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--F)", fontSize: "17px", fontWeight: 500, color: isOpen ? "var(--mustard-text)" : "var(--ink)", lineHeight: 1.35 }}>
                        {o.label}
                      </button>
                      {isOpen && (
                        <p style={{ padding: "0 var(--s-4) 16px", margin: 0, fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.75, color: "var(--ink-muted)", borderTop: "1px solid var(--border)", paddingTop: "14px" }}>
                          {o.response}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>

              <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", fontStyle: "italic", borderLeft: "2px solid var(--mustard)", paddingLeft: "14px", marginBottom: "28px", maxWidth: "60ch" }}>
                What this move does not settle: {step.grants}
              </p>

              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {stepIdx > 0 && (
                  <button type="button" onClick={back} style={{ ...btn, background: "var(--card)", color: "var(--ink)", border: "1px solid var(--border)" }}>Back</button>
                )}
                <button type="button" onClick={advance} style={{ ...btn, background: "var(--ink)", color: "var(--bone)", border: "1px solid var(--ink)" }}>
                  {isLast ? "See where it lands" : "That's fair, keep going"}
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

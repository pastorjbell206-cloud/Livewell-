import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { useProgress } from "@/hooks/useProgress";
import { ARGUMENT_CASES, caseBySlug, type ArgumentCase } from "@/data/argumentCases";
import { trackCaseStart, trackObjection, trackCaseComplete } from "@/lib/telemetry";
import { toolById } from "@/lib/toolsList";
import { ProgressLine, QuestionCard, ResultActions, ResultSection, ToolHead } from "@/components/tool-shell";
import "./test-the-case.css";

/**
 * Test the Case (/tools/test-the-case) is the "argued with, not preached at"
 * tool. A case is worked one move at a time; at each move the reader can push
 * back with the objection they actually hold and get the honest answer,
 * including what the move does not prove. Progress persists via useProgress so
 * a reader can leave and come back where they stopped. Unpublished cases show
 * an honest "In progress" and never dead-end.
 *
 * On the tool shell (2026-11-20): ToolHead with the tool's one name, the case
 * picker as a QuestionCard, ProgressLine ("Move 2 of 6", Back, and the site's
 * sentence when the browser will not save), ResultSection for where the case
 * ends, ResultActions (Print, Start over with a confirm, Send to my phone).
 * The place is still kept by useProgress under lw-test-the-case, the key it
 * has always used and the one My Library reads (lib/myProgress.ts). Every
 * case, move, objection, answer and closing line is unchanged
 * (data/argumentCases.ts), and so is the logic below that walks them.
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
  const tool = toolById("test-the-case");
  const [slug, setSlug] = useState<string>(() => initialSlug());
  const active = caseBySlug(slug) ?? DEFAULT_CASE;
  const { done, toggle, persisted } = useProgress("lw-test-the-case");

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
    trackCaseStart(next.slug);
    const passed = next.steps.filter((s) => done[`${next.slug}:${s.id}`]).length;
    setStepIdx(Math.min(passed, Math.max(0, next.steps.length - 1)));
    setOpenObjection(null);
  }

  /** Opening an objection is the signal worth having: which pushback a reader
   *  actually holds. Recorded by index, never by text. */
  function toggleObjection(i: number) {
    const opening = openObjection !== i;
    setOpenObjection(opening ? i : null);
    if (opening) trackObjection(active.slug, step.id, i);
  }

  function advance() {
    if (!done[keyFor(step.id)]) toggle(keyFor(step.id));
    setOpenObjection(null);
    if (isLast) {
      if (!done[finishedKey]) toggle(finishedKey);
      trackCaseComplete(active.slug);
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

  // After a move, the move's text takes focus, so a keyboard or screen reader
  // user starts the new move at its top; not on a fresh load.
  const moveRef = useRef<HTMLHeadingElement>(null);
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const h = moveRef.current ?? document.getElementById("ttc-end-h");
    if (!h) return;
    h.scrollIntoView?.({ block: "start" });
    h.focus({ preventScroll: true });
  }, [stepIdx, finished, slug]);

  return (
    <Layout>
      <SEOMeta
        title="Did the Resurrection Happen? Test the Case"
        description="An interactive, honest walkthrough of the case for the resurrection. Raise the objection you actually hold at each move and get the real answer, including what it does not prove. No altar call."
        url="https://www.livewellbyjamesbell.co/tools/test-the-case"
      />

      <ToolHead
        path="/tools/test-the-case"
        title={tool.name}
        line={<>{active.intro}</>}
        time={`About ${tool.time}`}
        keeps="Where you stopped in each case, so you can leave and come back to it. It stays in this browser."
        plate="lantern"
      />

      {/* CASE PICKER */}
      <section className="ts-band ts-band--warm ttc-pick no-print" aria-label="The cases">
        <div className="ts-col">
          <QuestionCard
            question="The cases"
            options={PUBLISHED.map((c) => ({ value: c.slug, label: c.title }))}
            value={active.slug}
            onChange={(v) => {
              const next = caseBySlug(v);
              if (next) switchCase(next);
            }}
            columns={2}
          />
          {ARGUMENT_CASES.some((c) => !c.published) && (
            <p className="ttc-coming">
              Being written:{" "}
              {ARGUMENT_CASES.filter((c) => !c.published)
                .map((c) => `${c.title} · In progress`)
                .join("; ")}
            </p>
          )}
        </div>
      </section>

      {/* THE STEP-THROUGH */}
      <section className="ts-band ttc-case" aria-labelledby="ttc-case-h">
        <div className="ts-col">
          <h2 id="ttc-case-h" className="ts-r__title">
            {active.title}
          </h2>
          {finished ? (
            <ResultSection title="Where the case ends" id="ttc-end">
              <p className="ttc-close">{active.close}</p>
              <div className="ts-actions__row no-print">
                <button type="button" onClick={back} className="btn btn--quiet ts-actions__btn">
                  <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" /> Back to the last step
                </button>
              </div>
              <div className="ttc-after">
                <p>
                  No decision is required here, and none is being asked. If you want to keep going at your own pace, the Doubt and Faith essays take these questions apart one move at a time.
                </p>
                <Link href="/writing?track=doubt" className="ttc-link">
                  Read the Doubt and Faith essays
                </Link>
                <div className="no-print" style={{ marginTop: "28px" }}>
                  <NewsletterSignup variant="inline" source="test-the-case" audienceType="skeptic" title="The essays by email, through Substack" description="For the questions that do not fit on a web page. Leave your email here and finish on Substack. No altar call comes with it." />
                </div>
              </div>
              <ResultActions
                title={tool.name}
                summary={active.title}
                onStartOver={startOver}
                startOverClears="where you stopped in this case (other cases stay as they are)"
              />
            </ResultSection>
          ) : (
            <div>
              <ProgressLine step={stepIdx + 1} total={active.steps.length} unit="Move" onBack={back} saveFailed={!persisted} />
              {completed > 0 && (
                <button type="button" onClick={startOver} className="btn--text ttc-restart no-print">
                  Start over
                </button>
              )}

              <h3 className="ttc-move" tabIndex={-1} ref={moveRef}>
                <span className="sr-only">Move {stepIdx + 1}. </span>
                {step.move}
              </h3>

              <p className="ttc-push">Not convinced? Push back.</p>
              <ul className="ttc-objections">
                {step.objections.map((o, i) => {
                  const isOpen = openObjection === i;
                  return (
                    <li key={i} className={`ttc-objection${isOpen ? " is-open" : ""}`}>
                      <button type="button" onClick={() => toggleObjection(i)} aria-expanded={isOpen} aria-controls={`ttc-answer-${i}`} className="ttc-objection__q">
                        {o.label}
                      </button>
                      <p id={`ttc-answer-${i}`} hidden={!isOpen} className="ttc-objection__a">
                        {o.response}
                      </p>
                    </li>
                  );
                })}
              </ul>

              <p className="ttc-grants">What this move does not settle: {step.grants}</p>

              <div className="ts-nav no-print">
                {stepIdx > 0 ? (
                  <button type="button" onClick={back} className="btn--text">
                    <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" /> Back
                  </button>
                ) : (
                  <span />
                )}
                <button type="button" onClick={advance} className="btn">
                  {isLast ? "See where it lands" : "That's fair, keep going"}
                  <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" style={{ marginLeft: 8 }} />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

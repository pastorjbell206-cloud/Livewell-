/**
 * Stepper: one step per screen, with Back and Next at the bottom where a hand
 * holding a phone can reach them. The first use is table mode on a family
 * devotion (read, ask, pray, one at a time); later, any short sequence a
 * person works through in order.
 *
 * Only the current step is rendered. The bar at the bottom stays in view
 * while a long step scrolls, and says where the reader is ("2 of 5"): a
 * position, never a score. When the reader moves, focus goes to the new
 * step's heading, so a screen reader starts the step at its top and a long
 * step scrolls back to its beginning. On the last step, Next becomes the
 * finishing action (`onFinish`, labelled by `finishLabel`).
 *
 * Controlled (`step` + `onStepChange`, so a page can keep the step in its URL)
 * or self-contained (`defaultStep`). Plain buttons; no library needed. Styles
 * live in index.css (.st-stepper*, .st-action), tokens only.
 */
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

export interface StepperStep {
  /** Stable key for the step. */
  id: string;
  title: ReactNode;
  content: ReactNode;
}

export function Stepper({
  steps,
  label,
  step,
  defaultStep = 0,
  onStepChange,
  onFinish,
  finishLabel = "Done",
  backLabel = "Back",
  nextLabel = "Next",
  headingLevel = 2,
}: {
  steps: StepperStep[];
  /** Accessible name for the whole sequence ("Tonight's devotion"). */
  label: string;
  /** The current step's index, when the page owns it. */
  step?: number;
  defaultStep?: number;
  onStepChange?: (index: number) => void;
  /** Shown in place of Next on the last step. */
  onFinish?: () => void;
  finishLabel?: string;
  backLabel?: string;
  nextLabel?: string;
  headingLevel?: 2 | 3;
}) {
  const [own, setOwn] = useState(defaultStep);
  const count = steps.length;
  const index = Math.min(Math.max(step ?? own, 0), Math.max(count - 1, 0));
  const current = steps[index];
  const headingRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const positionId = useId();

  // Focus follows the reader's own move, never the first render.
  useEffect(() => {
    if (!moved.current) return;
    moved.current = false;
    headingRef.current?.focus();
  }, [index]);

  if (!current) return null;

  const go = (to: number) => {
    if (to < 0 || to >= count || to === index) return;
    moved.current = true;
    if (step === undefined) setOwn(to);
    onStepChange?.(to);
  };

  const last = index === count - 1;
  const Heading = headingLevel === 3 ? "h3" : "h2";

  return (
    <div className="st-stepper" role="group" aria-label={label}>
      <div className="st-stepper__step" key={current.id}>
        <Heading ref={headingRef} tabIndex={-1} className="st-stepper__title" aria-describedby={positionId}>
          {current.title}
        </Heading>
        <div className="st-stepper__body">{current.content}</div>
      </div>
      <div className="st-stepper__bar">
        <button type="button" className="st-action st-action--quiet st-stepper__back" onClick={() => go(index - 1)} disabled={index === 0}>
          {backLabel}
        </button>
        <p className="st-stepper__position" id={positionId}>
          {index + 1} of {count}
        </p>
        {last && onFinish ? (
          <button type="button" className="st-action st-stepper__next" onClick={onFinish}>
            {finishLabel}
          </button>
        ) : (
          <button type="button" className="st-action st-stepper__next" onClick={() => go(index + 1)} disabled={last}>
            {nextLabel}
          </button>
        )}
      </div>
    </div>
  );
}

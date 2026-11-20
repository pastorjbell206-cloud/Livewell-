/**
 * The one result layout. In order: the plain reading first (ResultReading),
 * then, where a tool scores, a chart drawn in the palette (ScoreChart: ink
 * bars on cream, mustard only for the one row marked as the place to start),
 * then Scripture (ResultScripture), then next steps (ResultNext). The
 * actions sit in one row (ResultActions): Change my answers, Print, Send to
 * my phone, Start over (which asks first).
 *
 * "Send to my phone" is components/TakeItWithYou: the phone's own share sheet
 * where there is one, else a code to scan and a copy-link button. It sends the
 * page's address only: no answers, nothing about the reader, no server.
 */
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight, PencilLine, Printer, RotateCcw } from "lucide-react";
import { TakeItWithYou } from "@/components/TakeItWithYou";

export function ResultSection({ title, id, children, className }: { title: string; id?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`ts-r${className ? ` ${className}` : ""}`} aria-labelledby={id ? `${id}-h` : undefined}>
      <h2 className="ts-r__title" id={id ? `${id}-h` : undefined} tabIndex={id ? -1 : undefined}>
        {title}
      </h2>
      {children}
    </section>
  );
}

/**
 * Bring the reader to the top of a result as it appears: the safety question
 * first when the page has one (components/SafetyCheck, "#safety-check-h"),
 * else the reading's heading (`<id>-h`). Focus moves there too, so a screen
 * reader starts where the eye does.
 */
export function focusResultTop(readingId: string) {
  const h = document.getElementById("safety-check-h") ?? document.getElementById(`${readingId}-h`);
  if (!h) return;
  if (!h.hasAttribute("tabindex")) h.setAttribute("tabindex", "-1");
  h.scrollIntoView?.({ block: "start" });
  h.focus({ preventScroll: true });
}

/**
 * The plain reading: what the answers suggest, in paragraphs. With an `id`,
 * its heading is `<id>-h` and can take focus, so a tool can move the reader
 * there when the result appears.
 */
export function ResultReading({ title = "What this suggests", id, children }: { title?: string; id?: string; children: ReactNode }) {
  return (
    <ResultSection title={title} id={id} className="ts-r--reading">
      <div className="ts-r__prose">{children}</div>
    </ResultSection>
  );
}

export interface ScoreRow {
  label: string;
  /** 0 to max. */
  value: number;
  /** The one row to start with; the only mustard on the chart. */
  start?: boolean;
  /** Words for the value ("3 of 5", "Often"). */
  valueText?: string;
}

/** A chart of scores: a list a screen reader reads as words, bars drawn for the eye. */
export function ScoreChart({ rows, max, caption }: { rows: ScoreRow[]; max: number; caption: string }) {
  return (
    <figure className="ts-chart">
      <figcaption className="ts-chart__caption">{caption}</figcaption>
      <ul className="ts-chart__rows">
        {rows.map((r) => (
          <li key={r.label} className={`ts-chart__row${r.start ? " is-start" : ""}`}>
            <span className="ts-chart__label">
              {r.label}
              {r.start && <span className="ts-chart__flag">Start here</span>}
            </span>
            <span className="ts-chart__track" aria-hidden="true">
              <span className="ts-chart__bar" style={{ width: `${Math.max(0, Math.min(1, r.value / max)) * 100}%` }} />
            </span>
            <span className="ts-chart__value">{r.valueText ?? `${r.value} of ${max}`}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

export interface NextStep {
  kind: string;
  label: string;
  href: string;
}

export function ResultNext({ title = "Where to go next", steps }: { title?: string; steps: NextStep[] }) {
  if (!steps.length) return null;
  return (
    <ResultSection title={title} className="ts-r--next">
      <ul className="ts-next">
        {steps.map((s) => (
          <li key={s.href}>
            <Link href={s.href} className="ts-next__link">
              <span className="ts-next__kind">{s.kind}</span>
              <span className="ts-next__label">{s.label}</span>
              <ArrowRight className="ts-next__arrow" size={18} strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </ResultSection>
  );
}

export interface ResultActionsProps {
  /** The page's name, for Send to my phone and My Library. */
  title: string;
  /** One line that travels with the link. */
  summary?: string;
  /** What it is in My Library ("Tool", "Self-check", "Wisdom"). */
  kind?: string;
  /** Change my answers: back to the questions with every answer kept. */
  onChange?: () => void;
  changeLabel?: string;
  /** Start over: clears what this device keeps for the tool. Asks first. */
  onStartOver?: () => void;
  /** What Start over clears, in the confirm line. */
  startOverClears?: string;
  /** Show Save to My Library (default true). */
  save?: boolean;
}

export function ResultActions({ title, summary, kind = "Tool", onChange, changeLabel = "Change my answers", onStartOver, startOverClears = "your answers on this device", save = true }: ResultActionsProps) {
  const [confirming, setConfirming] = useState(false);
  const yesRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (confirming) yesRef.current?.focus();
  }, [confirming]);
  return (
    <div className="ts-actions no-print">
      <div className="ts-actions__row">
        {onChange && (
          <button type="button" className="btn btn--quiet ts-actions__btn" onClick={onChange}>
            <PencilLine size={16} strokeWidth={1.75} aria-hidden="true" /> {changeLabel}
          </button>
        )}
        <button type="button" className="btn btn--quiet ts-actions__btn" onClick={() => window.print()}>
          <Printer size={16} strokeWidth={1.75} aria-hidden="true" /> Print
        </button>
        {onStartOver && !confirming && (
          <button type="button" className="btn btn--quiet ts-actions__btn" onClick={() => setConfirming(true)}>
            <RotateCcw size={16} strokeWidth={1.75} aria-hidden="true" /> Start over
          </button>
        )}
      </div>
      {onStartOver && confirming && (
        <div className="ts-confirm" role="group" aria-label="Start over?">
          <p className="ts-confirm__q">Start over? This clears {startOverClears}.</p>
          <div className="ts-actions__row">
            <button
              ref={yesRef}
              type="button"
              className="btn ts-actions__btn"
              onClick={() => {
                setConfirming(false);
                onStartOver();
              }}
            >
              Yes, start over
            </button>
            <button type="button" className="btn btn--quiet ts-actions__btn" onClick={() => setConfirming(false)}>
              Keep them
            </button>
          </div>
        </div>
      )}
      <TakeItWithYou title={title} kind={kind} summary={summary} save={save} />
    </div>
  );
}

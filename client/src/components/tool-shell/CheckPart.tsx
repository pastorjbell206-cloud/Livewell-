/**
 * CheckPart: one part of a self-check on the shell. A check with several
 * statements under each heading (the Whole-Life Assessment's domains, the
 * Emotional Health check's five areas) shows one part at a time: where the
 * reader is (ProgressLine, and how many are answered), the part's heading
 * and line, anything the part carries (a verse), one QuestionCard per
 * statement, and a Back and Continue row. Continue waits until every
 * statement in the part has an answer.
 *
 * When the part changes, the page brings its heading into view and moves
 * focus there, so a keyboard or screen reader user starts the new part at
 * its top. A part the page opens on (a saved place) takes no focus.
 */
import { useEffect, useRef, type ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import QuestionCard, { type QuestionOption } from "./QuestionCard";
import ProgressLine from "./ProgressLine";

export interface CheckStatement {
  id: string;
  text: ReactNode;
}

export interface CheckPartProps {
  /** 1-based part. */
  step: number;
  total: number;
  /** "Part" (default), "Domain". */
  unit?: string;
  answered: number;
  questions: number;
  title: string;
  line?: ReactNode;
  /** Shown between the line and the statements (a verse). */
  children?: ReactNode;
  statements: CheckStatement[];
  options: QuestionOption[];
  value: (id: string) => string | null;
  onAnswer: (id: string, value: string) => void;
  onBack?: () => void;
  backLabel?: string;
  onNext: () => void;
  nextLabel: string;
  /** What the Continue button says while the part is unfinished. */
  waitingLabel?: string;
  saveFailed?: boolean;
  /** True when the page opened on this part (a saved place): no focus move. */
  quiet?: boolean;
  /** Show the number beside each answer (default true). */
  numbered?: boolean;
  columns?: 1 | 2 | 3;
}

export default function CheckPart(props: CheckPartProps) {
  const { step, total, unit = "Part", answered, questions, title, line, children, statements, options, value, onAnswer, onBack, backLabel = "Back", onNext, nextLabel, waitingLabel, saveFailed, quiet, numbered, columns } = props;
  const headRef = useRef<HTMLHeadingElement>(null);
  const first = useRef(true);
  useEffect(() => {
    if (first.current && quiet) {
      first.current = false;
      return;
    }
    first.current = false;
    const h = headRef.current;
    if (!h) return;
    h.scrollIntoView?.({ block: "start" });
    h.focus({ preventScroll: true });
  }, [step, quiet]);

  const done = statements.filter((s) => value(s.id) !== null).length;
  const complete = done === statements.length;

  return (
    <div className="ts-part">
      <ProgressLine step={step} total={total} unit={unit} saveFailed={saveFailed} />
      <p className="ts-count">
        {answered} of {questions} answered
      </p>
      <h2 className="ts-part__title" tabIndex={-1} ref={headRef}>
        {title}
      </h2>
      {line && <p className="ts-part__line">{line}</p>}
      {children}
      <div className="ts-qs">
        {statements.map((s) => (
          <QuestionCard key={s.id} question={s.text} options={options} value={value(s.id)} onChange={(v) => onAnswer(s.id, v)} numbered={numbered} columns={columns} />
        ))}
      </div>
      <div className="ts-nav">
        {onBack ? (
          <button type="button" className="btn--text" onClick={onBack}>
            <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" /> {backLabel}
          </button>
        ) : (
          <span />
        )}
        <button type="button" className="btn" onClick={onNext} disabled={!complete}>
          {complete ? nextLabel : (waitingLabel ?? `Answer all ${statements.length} (${done} done)`)}
          {complete && <ArrowRight size={16} strokeWidth={1.75} aria-hidden="true" style={{ marginLeft: 8 }} />}
        </button>
      </div>
    </div>
  );
}

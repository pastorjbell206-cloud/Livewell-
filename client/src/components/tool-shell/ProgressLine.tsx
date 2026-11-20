/**
 * ProgressLine: where the reader is in a tool, in words first ("Question 7 of
 * 30 · Home and relationships") and a thin bar after, with Back when there is
 * somewhere to go back to. The words carry the meaning; the bar repeats it for
 * the eye and is hidden from screen readers. A save failure shows the one
 * sentence the site uses for it.
 */
import { ArrowLeft } from "lucide-react";
import { SAVE_FAILED } from "./useToolProgress";

export interface ProgressLineProps {
  /** 1-based step. */
  step: number;
  total: number;
  /** "Question" (default), "Step", "Part". */
  unit?: string;
  /** The section the step belongs to. */
  section?: string;
  onBack?: () => void;
  saveFailed?: boolean;
}

export default function ProgressLine({ step, total, unit = "Question", section, onBack, saveFailed }: ProgressLineProps) {
  const pct = total > 0 ? Math.round((Math.min(step, total) / total) * 100) : 0;
  return (
    <div className="ts-progress">
      <div className="ts-progress__row">
        {onBack && step > 1 ? (
          <button type="button" className="btn--text ts-progress__back" onClick={onBack}>
            <ArrowLeft size={16} strokeWidth={1.75} aria-hidden="true" /> Back
          </button>
        ) : null}
        <p className="ts-progress__words" aria-live="polite">
          {unit} {Math.min(step, total)} of {total}
          {section ? <span className="ts-progress__section"> · {section}</span> : null}
        </p>
      </div>
      <div className="ts-progress__bar" aria-hidden="true">
        <span style={{ width: `${pct}%` }} />
      </div>
      {saveFailed && (
        <p className="ts-save-failed" role="status">
          {SAVE_FAILED}
        </p>
      )}
    </div>
  );
}

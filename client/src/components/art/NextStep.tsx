/**
 * NextStep: the band before the footer that says what to do now (the
 * simpler pages, 2026-11-27). A small label, the step in a few plain words,
 * an optional line, and one main action (a `.btn`), with at most one quiet
 * second (`.btn btn--quiet`). Warm cream by default, or the page's cream
 * where the band above it is warm, so two bands never run together.
 */
import type { ReactNode } from "react";

export default function NextStep({
  title,
  line,
  action,
  second,
  label = "Next step",
  id = "lw-next-title",
  tone = "warm",
}: {
  title: string;
  line?: ReactNode;
  /** The one main action: a link with class "btn". */
  action: ReactNode;
  /** At most one quiet second: a link with class "btn btn--quiet". */
  second?: ReactNode;
  label?: string;
  id?: string;
  tone?: "warm" | "bone";
}) {
  return (
    <section className={`home-sec${tone === "warm" ? " home-sec--warm" : ""} lw-next`} aria-labelledby={id}>
      <div className="home-wrap lw-next__in">
        <div>
          <p className="eyebrow">{label}</p>
          <h2 id={id} className="lw-next__title">
            {title}
          </h2>
          {line && <p className="lw-next__line">{line}</p>}
        </div>
        <div className="lw-next__acts">
          {action}
          {second}
        </div>
      </div>
    </section>
  );
}

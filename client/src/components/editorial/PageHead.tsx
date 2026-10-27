/**
 * PageHead: the compact head for every page except Home and About, which keep
 * the full charcoal hero. A short eyebrow (where the reader is), the page's
 * one H1, one line on what the page is for, and, where the page has one, the
 * thing to do first. Left-aligned on the cream page, with a hairline under it,
 * so the page's own content starts on the first screen of a phone instead of
 * after a screen of prose on charcoal.
 *
 * Actions are the page's own links or buttons; give them `pg-action` (or
 * `pg-action pg-action--quiet` for a second one) for the shared look. Pass
 * `titleRef` when the page moves focus to its heading (the heading then takes
 * focus without joining the tab order). Styles live in index.css (.pg-*).
 */
import type { CSSProperties, ReactNode, Ref } from "react";

export function PageHead({
  eyebrow,
  title,
  lede,
  actions,
  titleId,
  titleRef,
  width,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  /** One line, a sentence at most. */
  lede?: ReactNode;
  actions?: ReactNode;
  titleId?: string;
  titleRef?: Ref<HTMLHeadingElement>;
  /** Width of the head's column, to match the page below (default var(--w-default)). */
  width?: string;
}) {
  return (
    <div className="pg-head">
      <div className="pg-head__inner" style={width ? ({ "--pg-w": width } as CSSProperties) : undefined}>
        {eyebrow && <p className="eyebrow pg-head__eyebrow">{eyebrow}</p>}
        <h1 id={titleId} ref={titleRef} tabIndex={titleRef ? -1 : undefined} className="pg-head__title">
          {title}
        </h1>
        {lede && <p className="pg-head__lede">{lede}</p>}
        {actions && <div className="pg-head__actions">{actions}</div>}
      </div>
    </div>
  );
}

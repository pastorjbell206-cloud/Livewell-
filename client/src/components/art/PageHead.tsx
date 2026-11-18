/**
 * PageHead: the one page top for the whole site (README.md, "How a door's
 * page is built"). A small label naming the door the page belongs to, the
 * page's one plain H1, one short line, an optional main action, and a plate
 * from the kit in its frame.
 *
 * Two sizes:
 * - "door": a door's own page (/study, and the doors that follow it). The
 *   plate is large, beside the words on a laptop and edge to edge above them
 *   on a phone, as on Home.
 * - "inner": every other page. A small mark (a plate in a small frame, or any
 *   picture passed as `art`) beside the title, or no picture at all.
 *
 * The frame's ratio is set in CSS, so the space is held before the drawing
 * arrives (the plates load as their own chunk) and nothing below it moves.
 * Sizes come from the shared heading scale (--fs-display for a door,
 * --fs-h1 for an inner page). The classes are the old .pg-head ones plus
 * modifiers, so every page that already used editorial/PageHead, and the
 * print rules written for it, keep working.
 *
 * No landmark of its own: it sits inside the layout's <main>.
 */
import type { CSSProperties, ReactNode, Ref } from "react";
import { Link } from "wouter";
import Plate, { type PlateName } from "./Plate";
import PlateFrame from "./PlateFrame";

export interface PageHeadProps {
  /** The door this page belongs to ("Bible", "About"): a small label over the title. */
  door?: ReactNode;
  /** Where the label goes when tapped (the door's own page). */
  doorHref?: string;
  /** The page's one H1, in plain words. */
  title: ReactNode;
  /** One short line, a sentence at most. */
  line?: ReactNode;
  /** The main action: a link or button with class "btn" (and "btn--quiet" for a second). */
  action?: ReactNode;
  /** "door" for a door's own page; "inner" (the default) for every other page. */
  size?: "door" | "inner";
  /** A plate from the kit, shown in its frame. */
  plate?: PlateName;
  /** Any other picture for the frame (a portrait), in place of a plate. */
  art?: ReactNode;
  /** Anything that must stay with the head (a jump list, a second short paragraph). */
  children?: ReactNode;
  titleId?: string;
  /** Pass when the page moves focus to its heading; it then takes focus without joining the tab order. */
  titleRef?: Ref<HTMLHeadingElement>;
  /** Width of the head's column, to match the page below (default var(--w-default)). */
  width?: string;
  /** A page's own hook on the head (a portrait's ratio, say). */
  className?: string;
}

export default function PageHead({
  door,
  doorHref,
  title,
  line,
  action,
  size = "inner",
  plate,
  art,
  children,
  titleId,
  titleRef,
  width,
  className,
}: PageHeadProps) {
  const picture = art ?? (plate ? <Plate name={plate} decorative /> : null);
  const cls = `pg-head pg-head--${size}${picture ? " pg-head--art" : ""}${className ? ` ${className}` : ""}`;
  return (
    <div className={cls}>
      <div className="pg-head__inner" style={width ? ({ "--pg-w": width } as CSSProperties) : undefined}>
        <div className="pg-head__words">
          {door && <p className="eyebrow pg-head__eyebrow">{doorHref ? <Link href={doorHref}>{door}</Link> : door}</p>}
          <h1 id={titleId} ref={titleRef} tabIndex={titleRef ? -1 : undefined} className="pg-head__title">
            {title}
          </h1>
          {line && <p className="pg-head__lede">{line}</p>}
          {children}
          {action && <div className="pg-head__actions">{action}</div>}
        </div>
        {picture && (
          <PlateFrame className="pg-head__art" ratio={null}>
            {picture}
          </PlateFrame>
        )}
      </div>
    </div>
  );
}

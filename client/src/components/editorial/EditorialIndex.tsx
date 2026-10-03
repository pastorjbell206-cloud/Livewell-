/**
 * EditorialIndex — the way a long collection reads on this site: an index of
 * rows divided by hairlines, not a wall of boxed tiles. Each row is one link
 * (no repeated "read more"); type carries the hierarchy (kicker, serif title,
 * a dek set at reading size, a meta line); the arrow and a mustard underline
 * answer hover and keyboard focus. Two columns on wide screens, one on phones,
 * so a row never narrows below a comfortable measure.
 *
 * Styles live in index.css (.ed-*). Pass `read` to show a reader which essays
 * they have already finished (lib/readProgress).
 */
import { Link } from "wouter";
import type { CSSProperties, ReactNode } from "react";

export interface IndexItem {
  href: string;
  title: string;
  dek?: string | null;
  kicker?: string | null;
  meta?: ReactNode;
  /** true → plain <a> that opens in a new tab (off-site). */
  external?: boolean;
  /** The reader has finished this one. */
  read?: boolean;
  /** Optional art shown beside the row on wide screens. */
  thumb?: string;
}

type HeadingTag = "h2" | "h3" | "h4" | "span";

export function EditorialIndex({
  items,
  columns = 2,
  compact = false,
  numbered = false,
  headingAs = "h3",
  label,
  tone = "light",
  thumbSide = "left",
  thumbWidth,
}: {
  items: IndexItem[];
  /** Where per-item art sits; "right" suits an essay library. */
  thumbSide?: "left" | "right";
  /** Art width in px (default 112). */
  thumbWidth?: number;
  columns?: 1 | 2;
  /** "dark" for an index sitting on a charcoal section. */
  tone?: "light" | "dark";
  /** Tighter rows and two-line deks, for very long lists. */
  compact?: boolean;
  /** Prefix each title with its position (reading paths, series). */
  numbered?: boolean;
  headingAs?: HeadingTag;
  /** Accessible name for the list when the page has several. */
  label?: string;
}) {
  const cls = [
    "ed-index",
    columns === 2 ? "ed-index--2" : "",
    compact ? "ed-index--compact" : "",
    tone === "dark" ? "ed-index--dark" : "",
  ].filter(Boolean).join(" ");
  const Heading = headingAs;
  return (
    <ul className={cls} aria-label={label} style={thumbWidth ? ({ "--ed-thumb-w": `${thumbWidth}px` } as CSSProperties) : undefined}>
      {items.map((it, i) => {
        const art = it.thumb ? (
          <img className="ed-thumb" src={it.thumb} alt="" loading="lazy" decoding="async" width={thumbWidth ?? 112} height={Math.round(((thumbWidth ?? 112) * 630) / 1200)} />
        ) : null;
        const body = (
          <>
            {thumbSide === "left" && art}
            <div>
              {it.kicker && <span className="ed-kicker">{it.kicker}</span>}
              <Heading className="ed-title">
                {numbered && <span className="ed-num">{i + 1}</span>}{numbered && " "}
                {it.title}
              </Heading>
              {it.dek && <p className="ed-dek">{it.dek}</p>}
              {(it.meta || it.read) && (
                <div className="ed-meta">
                  {it.read && <span className="ed-read">✓ Read</span>}
                  {it.meta}
                </div>
              )}
            </div>
            {thumbSide === "right" && art}
            <span className="ed-arrow" aria-hidden>→</span>
          </>
        );
        const rowCls = !it.thumb ? "ed-row" : thumbSide === "right" ? "ed-row ed-row--thumb-right" : "ed-row ed-row--thumb";
        return (
          <li key={`${it.href}|${it.title}`}>
            {it.external ? (
              <a className={rowCls} href={it.href} target="_blank" rel="noopener noreferrer">{body}</a>
            ) : it.href.startsWith("#") || /\.(pdf|epub|docx?)($|[?#])/i.test(it.href) ? (
              // In-page anchors and files (a printable PDF) are plain links, not app routes.
              <a className={rowCls} href={it.href}>{body}</a>
            ) : (
              <Link className={rowCls} href={it.href}>{body}</Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

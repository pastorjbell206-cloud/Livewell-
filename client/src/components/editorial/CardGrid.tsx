/**
 * CardGrid — for short sets that should feel lifted off the page: the tools,
 * the doors into a section, a handful of features. Cards never shrink below
 * `min` pixels (default 320), so three is the most a wide screen shows and a
 * phone shows one; the whole card is the link, and its one action line names
 * the actual action ("Take the assessment"), never a generic "read more".
 * For anything longer than about six items, use EditorialIndex instead.
 *
 * Styles live in index.css (.ed-cards, .ed-card).
 */
import { Link } from "wouter";
import type { CSSProperties, ReactNode } from "react";

export interface CardItem {
  href: string;
  title: string;
  dek?: string | null;
  kicker?: string | null;
  /** A specific action ("Take the assessment", "Open the timeline"). */
  cta?: string;
  /** Extra line under the dek (counts, time). */
  meta?: ReactNode;
  external?: boolean;
}

type HeadingTag = "h2" | "h3" | "h4" | "span";

export function CardGrid({
  items,
  min = 320,
  tone = "light",
  headingAs = "h3",
  label,
}: {
  items: CardItem[];
  min?: number;
  /** "dark" for cards sitting on a charcoal section. */
  tone?: "light" | "dark";
  headingAs?: HeadingTag;
  label?: string;
}) {
  const Heading = headingAs;
  const cardCls = tone === "dark" ? "ed-card ed-card--dark" : "ed-card";
  return (
    <ul className="ed-cards" style={{ "--ed-card-min": `${min}px` } as CSSProperties} aria-label={label}>
      {items.map((it) => {
        const body = (
          <>
            {it.kicker && <span className="ed-kicker" style={{ marginBottom: 0 }}>{it.kicker}</span>}
            <Heading className="ed-card-title">{it.title}</Heading>
            {it.dek && <p className="ed-card-dek">{it.dek}</p>}
            {it.meta && <div className="ed-meta" style={{ marginTop: 0 }}>{it.meta}</div>}
            <div className="ed-card-foot">
              <span>{it.cta ?? ""}</span>
              <span className="ed-arrow" aria-hidden>→</span>
            </div>
          </>
        );
        return (
          <li key={`${it.href}|${it.title}`}>
            {it.external ? (
              <a className={cardCls} href={it.href} target="_blank" rel="noopener noreferrer">{body}</a>
            ) : it.href.startsWith("#") ? (
              <a className={cardCls} href={it.href}>{body}</a>
            ) : (
              <Link className={cardCls} href={it.href}>{body}</Link>
            )}
          </li>
        );
      })}
    </ul>
  );
}

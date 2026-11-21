/**
 * TurnNav: previous and next, for anything read in order (the wisdom topics
 * of one subject, the Bible Explorer's films, the longer doctrine studies).
 * The two ends come from the page's own data, never a typed list. Styled by
 * the .qa-turn rules the Honest Answers already use (index.css), so every
 * "what's next" on the site looks and behaves the same: two cards side by
 * side, stacked on a phone, each at least 64px high.
 */
import { Link } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface Turn {
  href: string;
  title: string;
}

export default function TurnNav({
  prev,
  next,
  label,
  prevLabel = "Previous",
  nextLabel = "Next",
  className,
}: {
  prev?: Turn | null;
  next?: Turn | null;
  /** What is being turned through, for a screen reader: "Previous and next topic". */
  label: string;
  prevLabel?: string;
  nextLabel?: string;
  className?: string;
}) {
  if (!prev && !next) return null;
  return (
    <nav className={`qa-turn no-print${className ? ` ${className}` : ""}`} aria-label={label}>
      {prev ? (
        <Link href={prev.href} rel="prev">
          <small>
            <ArrowLeft aria-hidden="true" size={16} strokeWidth={1.75} /> {prevLabel}
          </small>
          <span>{prev.title}</span>
        </Link>
      ) : (
        <span aria-hidden="true" />
      )}
      {next && (
        <Link href={next.href} rel="next" className="qa-turn__next">
          <small>
            {nextLabel} <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
          </small>
          <span>{next.title}</span>
        </Link>
      )}
    </nav>
  );
}

/**
 * SectionHead — one consistent opening for every section of a collection
 * page: a short eyebrow, a serif heading, an optional sentence of intro, and
 * (when the section is a preview of something larger) a single "see all"
 * link carrying the real count. Styles live in index.css (.ed-section-head).
 */
import { Link } from "wouter";
import type { ReactNode } from "react";

export function SectionHead({
  eyebrow,
  title,
  intro,
  seeAll,
  id,
  as = "h2",
}: {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  seeAll?: { href: string; label: string };
  id?: string;
  as?: "h2" | "h3";
}) {
  const Heading = as;
  return (
    <div className="ed-section-head">
      <div>
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <Heading id={id}>{title}</Heading>
        {intro && <p className="ed-section-intro">{intro}</p>}
      </div>
      {seeAll && (
        <Link href={seeAll.href} className="ed-see-all">
          {seeAll.label} →
        </Link>
      )}
    </div>
  );
}

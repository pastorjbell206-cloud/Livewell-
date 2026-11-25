/**
 * WorkCard: one of James's works on /connect. The plate in its frame, the
 * name, one plain line, and one clear button that opens it. Unlike DoorCard
 * the card itself is not a link: the button is, so a reader sees exactly
 * where it goes. An outside address opens in a new tab (rel="noopener"),
 * carries a small arrow, says so to a screen reader, and shows the site's
 * name under the button.
 *
 * `lead` is the wide first card (LiveWell itself): the picture beside the
 * words on a laptop, and room for a second action.
 */
import type { ReactNode } from "react";
import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";
import Plate from "./Plate";
import PlateFrame from "./PlateFrame";
import type { Work } from "@/lib/works";
import "../hub.css";

export function WorkAction({ work, quiet = false }: { work: Pick<Work, "href" | "action" | "external" | "name">; quiet?: boolean }) {
  const cls = `btn lw-work__btn${quiet ? " btn--quiet" : ""}`;
  if (work.external) {
    return (
      <a href={work.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {work.action}
        <ArrowUpRight aria-hidden="true" size={18} strokeWidth={1.75} />
        <span className="sr-only"> (opens {work.name} in a new tab)</span>
      </a>
    );
  }
  return (
    <Link href={work.href} className={cls}>
      {work.action}
    </Link>
  );
}

export default function WorkCard({
  work,
  label,
  lead = false,
  headingLevel = 3,
  children,
}: {
  work: Work;
  /** A small label over the name ("The home and the library"). */
  label?: string;
  lead?: boolean;
  headingLevel?: 2 | 3;
  /** A second action, after the main button (lead card only, by convention). */
  children?: ReactNode;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  return (
    <article className={`lw-work${lead ? " lw-work--lead" : ""}`} aria-labelledby={`work-${work.id}`}>
      <PlateFrame className="lw-work__art" ratio={null}>
        <Plate name={work.plate} decorative />
      </PlateFrame>
      <div className="lw-work__text">
        {label && <p className="lw-work__label">{label}</p>}
        <H id={`work-${work.id}`} className="lw-work__name">
          {work.name}
        </H>
        <p className="lw-work__line">{work.line}</p>
        <div className="lw-work__actions">
          <WorkAction work={work} />
          {children}
        </div>
        {work.external && work.host && <p className="lw-work__host">{work.host}</p>}
      </div>
    </article>
  );
}

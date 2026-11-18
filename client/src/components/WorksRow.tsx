/**
 * WorksRow: everything James does, as one compact row of small icon links
 * (lib/works.ts, the same list /connect draws as cards), ending in the link to
 * the page that holds all of it. Used on /about under his own words.
 */
import { Link } from "wouter";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { allWorks } from "@/lib/works";
import "./hub.css";

export default function WorksRow({ id = "works-row" }: { id?: string }) {
  return (
    <nav className="lw-works-row" aria-labelledby={`${id}-title`}>
      <p id={`${id}-title`} className="lw-works-row__label">
        Where else to find James
      </p>
      <ul className="lw-works-row__list">
        {allWorks().map((w) => {
          const Icon = w.icon;
          const inner = (
            <>
              <span className="lw-works-row__icon" aria-hidden="true">
                <Icon size={18} strokeWidth={1.75} />
              </span>
              <span>{w.name}</span>
              {w.external && (
                <>
                  <ArrowUpRight aria-hidden="true" size={15} strokeWidth={1.75} className="lw-works-row__out" />
                  <span className="sr-only"> (opens {w.host || "another site"} in a new tab)</span>
                </>
              )}
            </>
          );
          return (
            <li key={w.id}>
              {w.external ? (
                <a href={w.href} target="_blank" rel="noopener noreferrer" className="lw-works-row__link">
                  {inner}
                </a>
              ) : (
                <Link href={w.href} className="lw-works-row__link">
                  {inner}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      <Link href="/connect" className="lw-works-row__all">
        Everything James does, on one page
        <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
      </Link>
    </nav>
  );
}

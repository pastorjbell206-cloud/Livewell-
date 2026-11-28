/**
 * Three numbered steps under the headline: what LiveWell is for, as James put it
 * (2026-11-27: "know what to believe, why you believe it, and how to explain").
 * Each step opens a room the catalogue already has, by its own name, so a page
 * keeps one name everywhere. The steps are client/src/data/home-steps.json;
 * scripts/prerender-heads.mjs writes the same list into the static hero.
 */
import { Link } from "wouter";
import steps from "@/data/home-steps.json";
import { entryById } from "@/lib/siteCatalog";

export function homeSteps() {
  return steps.map((s) => {
    const room = entryById(s.room);
    if (!room) throw new Error(`home-steps.json: no room "${s.room}" in the catalogue`);
    return { step: s.step, name: room.name, href: room.href };
  });
}

export default function HomeSteps() {
  return (
    <ol className="hero-steps">
      {homeSteps().map((s, i) => (
        <li key={s.href}>
          <Link href={s.href} className="hero-step">
            <span className="hero-step__n" aria-hidden="true">
              {i + 1}
            </span>
            <span className="hero-step__body">
              <span className="hero-step__t">{s.step}</span>
              <span className="hero-step__r">{s.name}</span>
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}

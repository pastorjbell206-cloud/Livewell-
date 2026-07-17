import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { MOVEMENTS, PILLARS_V2 } from "@/lib/taxonomy";
import { ROUTE_FOR_PILLAR } from "@/components/PillarLanding";
import { getReadingPathBySlug, availableCount } from "@/lib/readingPaths";

/**
 * /map — the site's thesis, standable in one screen: two movements, six
 * pillars, drawn as the road it is. Every node links its landing page;
 * Diagnosis nodes also show the length of their ordered reading path.
 * Data comes straight from taxonomy.ts and readingPaths.ts — this page
 * holds no copy of the spine, only the drawing of it.
 */

const PATH_FOR_PILLAR: Record<string, string> = {
  "capture-by-the-right": "capture-by-the-right",
  "capture-by-the-left": "capture-by-the-left",
  "reading-scripture-past-our-politics": "reading-scripture-past-our-politics",
  "after-christendom-pillar": "the-church-after-christendom",
  "the-pastoral-angle": "the-pastoral-angle",
};

export default function Map() {
  const diagnosis = PILLARS_V2.filter((p) => p.movement === "diagnosis");
  const formation = PILLARS_V2.filter((p) => p.movement === "formation");

  return (
    <Layout>
      <SEOMeta
        title="The Map — Two Movements, Six Pillars | LiveWell"
        description="The whole site in one screen: five pillars of diagnosis — the captures, Scripture, Christendom, the pastoral weight — flowing into one pillar of formation."
        url="https://www.livewellbyjamesbell.co/map"
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-3) var(--s-5)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "1.5rem" }}>The map</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(2.2rem, 4.8vw, 3.2rem)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", color: "var(--bone)", marginBottom: "1.2rem" }}>
            The whole argument, in one screen
          </h1>
          <p style={{ color: "var(--bone)", opacity: 0.8, fontSize: "1.05rem", lineHeight: 1.7, maxWidth: "62ch" }}>
            Everything here moves the same direction: first the diagnosis — what captured the American church, named one capture at a time — then the formation, where a life gets rebuilt on older ground. Stand anywhere on this map and you can see where you are, what came before you, and what the next step is.
          </p>
        </div>
      </section>

      {/* THE MAP */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-3)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr", gap: "1.4rem", alignItems: "stretch" }} className="map-grid">
            {/* MOVEMENT I */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              <div>
                <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "0.2rem" }}>Movement I — {MOVEMENTS.diagnosis.title}</div>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-muted)", margin: "0 0 0.5rem" }}>{MOVEMENTS.diagnosis.subtitle}</p>
              </div>
              {diagnosis.map((p) => {
                const pathSlug = PATH_FOR_PILLAR[p.slug];
                const path = pathSlug ? getReadingPathBySlug(pathSlug) : undefined;
                return (
                  <Link
                    key={p.slug}
                    href={ROUTE_FOR_PILLAR[p.slug]}
                    style={{ display: "block", textDecoration: "none", background: "var(--card)", border: "1px solid rgba(20,17,12,0.12)", padding: "1rem 1.2rem" }}
                  >
                    <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "1.12rem", fontWeight: 400, color: "var(--ink)", marginBottom: "0.25rem" }}>
                      {p.name} <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle", color: "var(--mustard)" }} />
                    </span>
                    <span style={{ display: "block", fontSize: "0.82rem", lineHeight: 1.55, color: "var(--ink-muted)" }}>
                      {p.blurb}
                    </span>
                    {path && (
                      <span style={{ display: "block", marginTop: "0.45rem", fontFamily: "var(--U)", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mustard)" }}>
                        {availableCount(path)} essays, in order
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>

            {/* ARROW */}
            <div aria-hidden="true" style={{ display: "flex", alignItems: "center", fontFamily: "var(--F)", fontSize: "1.6rem", color: "var(--mustard)" }} className="map-arrow">
              →
            </div>

            {/* MOVEMENT II */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
              <div>
                <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "0.2rem" }}>Movement II — {MOVEMENTS.formation.title}</div>
                <p style={{ fontSize: "0.85rem", color: "var(--ink-muted)", margin: "0 0 0.5rem" }}>{MOVEMENTS.formation.subtitle}</p>
              </div>
              {formation.map((p) => (
                <Link
                  key={p.slug}
                  href={ROUTE_FOR_PILLAR[p.slug]}
                  style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", textDecoration: "none", background: "var(--card)", border: "1px solid var(--mustard)", padding: "1.4rem 1.4rem" }}
                >
                  <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "1.3rem", fontWeight: 400, color: "var(--ink)", marginBottom: "0.4rem" }}>
                    {p.name} <ArrowRight size={15} style={{ display: "inline", verticalAlign: "middle", color: "var(--mustard)" }} />
                  </span>
                  <span style={{ display: "block", fontSize: "0.88rem", lineHeight: 1.6, color: "var(--ink-muted)" }}>
                    {p.blurb} This is where the tools, the practices, and the family writing live — the diagnosis was never the point. This is.
                  </span>
                </Link>
              ))}
            </div>
          </div>
          <style>{`@media (max-width: 760px){ .map-grid{grid-template-columns:1fr !important} .map-arrow{transform:rotate(90deg);justify-content:center;padding:.2rem 0} }`}</style>
        </div>
      </section>

      {/* HOW TO WALK IT */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-3)", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div style={{ width: "40px", height: "2px", background: "var(--mustard)", margin: "0 auto 2rem" }} />
          <p style={{ fontFamily: "var(--F)", fontSize: "1.1rem", lineHeight: 1.65, color: "var(--bone)", fontStyle: "italic", marginBottom: "2rem" }}>
            You do not have to walk it in order. But it was built in order, and the order is doing something.
          </p>
          <div style={{ display: "flex", gap: "2rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/tools/which-lens" style={{ fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "0.25rem" }}>
              Not sure where to stand? Take the diagnostic
            </Link>
            <Link href="/start" style={{ fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "0.25rem" }}>
              Start at the beginning
            </Link>
            <Link href="/reading-paths" style={{ fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "0.25rem" }}>
              All reading paths
            </Link>
            <Link href="/pillars" style={{ fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "0.25rem" }}>
              The six pillars
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

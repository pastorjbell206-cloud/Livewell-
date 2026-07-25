import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SITE_URL } from "@/lib/site";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { MOVEMENTS, PILLARS_V2, pillarUrl } from "@/lib/taxonomy";
import { ROUTE_FOR_PILLAR } from "@/components/PillarLanding";

/**
 * The pillars — rendered straight from PILLARS_V2/MOVEMENTS in
 * lib/taxonomy.ts, the canonical two-movement spine. (This page previously
 * hardcoded five legacy-named pillars while the sitewide footer promised
 * "all six" — the one page that should never drift from the taxonomy did.)
 *
 * Each Diagnosis pillar links to its ordered reading path; every pillar links
 * to its filtered essay list. The four standing library sections are kept
 * below as what they are — reference wings, not a competing pillar scheme.
 */

/** Diagnosis pillar slug → its ordered reading path at /reading-paths/:slug. */
const PATH_FOR_PILLAR: Record<string, string> = {
  "capture-by-the-right": "capture-by-the-right",
  "capture-by-the-left": "capture-by-the-left",
  "reading-scripture-past-our-politics": "reading-scripture-past-our-politics",
  "the-pastoral-angle": "the-pastoral-angle",
};

const WINGS = [
  { name: "Theological Depth", href: "/theology", blurb: "Doctrine, church history, the whole biblical story." },
  { name: "Prophetic Justice", href: "/justice", blurb: "The poor, the outsider, the systems we inherit." },
  { name: "Prophetic Disruption", href: "/disruption", blurb: "The church, empire, and the politics that capture it." },
  { name: "Integrated Life", href: "/life", blurb: "Marriage, parenting, vocation, and rest." },
];

const linkStyle = {
  fontFamily: "var(--U)",
  fontSize: "0.8rem",
  fontWeight: 500,
  color: "var(--mustard)",
  textDecoration: "none",
  borderBottom: "1px solid var(--mustard)",
  paddingBottom: "0.15rem",
} as const;

export default function Pillars() {
  const diagnosis = PILLARS_V2.filter((p) => p.movement === "diagnosis");
  const formation = PILLARS_V2.filter((p) => p.movement === "formation");

  return (
    <Layout>
      <SEOMeta
        title="The Five Pillars — Diagnosis and Formation | LiveWell"
        description="Two movements, five pillars: the capture by the right and by the left, Scripture past our politics, the pastoral angle, and living well after Christendom."
        url={`${SITE_URL}/pillars`}
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-3) var(--s-5)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "1.5rem" }}>The spine of the site</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(2.2rem, 4.8vw, 3.2rem)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", color: "var(--charcoal-fg)", marginBottom: "1.2rem" }}>
            Five pillars, two movements
          </h1>
          <p style={{ color: "var(--charcoal-fg)", opacity: 0.8, fontSize: "1.05rem", lineHeight: 1.7, marginBottom: "1.4rem" }}>
            Everything on this site hangs on one arc. First the diagnosis — naming what captured the American church and how it happened. Then the formation — how to live well on the other side of it. Four pillars do the naming. The fifth does the building.
          </p>
          <Link href="/tools/which-lens" style={linkStyle}>
            Not sure which pillar is yours? Take the diagnostic <ArrowRight size={13} style={{ display: "inline", verticalAlign: "middle" }} />
          </Link>
        </div>
      </section>

      {/* MOVEMENT I — DIAGNOSIS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-3)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "0.5rem" }}>Movement I — {MOVEMENTS.diagnosis.title}</div>
          <p style={{ fontFamily: "var(--F)", fontSize: "1.2rem", fontStyle: "italic", color: "var(--ink-muted)", marginBottom: "2.5rem" }}>
            {MOVEMENTS.diagnosis.subtitle}
          </p>
          {diagnosis.map((p) => (
            <div key={p.slug} style={{ borderBottom: "1px solid rgba(20,17,12,0.1)", padding: "1.8rem 0" }}>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "1.5rem", fontWeight: 400, letterSpacing: "-0.01em", marginBottom: "0.6rem" }}>
                <Link href={ROUTE_FOR_PILLAR[p.slug]} style={{ color: "var(--ink)", textDecoration: "none" }}>
                  {p.name} <ArrowRight size={16} style={{ display: "inline", verticalAlign: "middle", color: "var(--mustard)" }} />
                </Link>
              </h2>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "62ch", marginBottom: "1rem" }}>
                {p.blurb}
              </p>
              <div style={{ display: "flex", gap: "1.6rem", flexWrap: "wrap" }}>
                {PATH_FOR_PILLAR[p.slug] && (
                  <Link href={`/reading-paths/${PATH_FOR_PILLAR[p.slug]}`} style={linkStyle}>
                    Read the path, in order <ArrowRight size={13} style={{ display: "inline", verticalAlign: "middle" }} />
                  </Link>
                )}
                <Link href={pillarUrl(p.slug)} style={{ ...linkStyle, color: "var(--ink-muted)", borderBottomColor: "var(--ink-muted)" }}>
                  All essays in this pillar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MOVEMENT II — FORMATION */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-3)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "0.5rem" }}>Movement II — {MOVEMENTS.formation.title}</div>
          <p style={{ fontFamily: "var(--F)", fontSize: "1.2rem", fontStyle: "italic", color: "var(--ink-muted)", marginBottom: "2.5rem" }}>
            {MOVEMENTS.formation.subtitle}
          </p>
          {formation.map((p) => (
            <div key={p.slug} style={{ padding: "0.2rem 0 0.6rem" }}>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "1.5rem", fontWeight: 400, letterSpacing: "-0.01em", color: "var(--ink)", marginBottom: "0.6rem" }}>
                {p.name}
              </h2>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "62ch", marginBottom: "1rem" }}>
                {p.blurb}
              </p>
              <div style={{ display: "flex", gap: "1.6rem", flexWrap: "wrap" }}>
                <Link href="/living-well" style={linkStyle}>
                  Enter the formation hub <ArrowRight size={13} style={{ display: "inline", verticalAlign: "middle" }} />
                </Link>
                <Link href={pillarUrl(p.slug)} style={{ ...linkStyle, color: "var(--ink-muted)", borderBottomColor: "var(--ink-muted)" }}>
                  All essays in this pillar
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* THE LIBRARY WINGS — kept, honestly named */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-3)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "1rem" }}>The reference wings</div>
          <p style={{ color: "var(--charcoal-fg)", opacity: 0.75, fontSize: "0.95rem", lineHeight: 1.7, maxWidth: "62ch", marginBottom: "2rem" }}>
            Alongside the pillars, four standing library sections hold the reference collections — the working shelves the essays draw on.
          </p>
          {WINGS.map((w) => (
            <Link key={w.href} href={w.href} style={{ display: "block", textDecoration: "none", padding: "1.1rem 0", borderBottom: "1px solid rgba(244,241,234,0.12)" }}>
              <span style={{ fontFamily: "var(--F)", fontSize: "1.15rem", fontWeight: 400, color: "var(--charcoal-fg)" }}>
                {w.name} <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle", color: "var(--mustard)" }} />
              </span>
              <span style={{ display: "block", fontSize: "0.85rem", lineHeight: 1.6, color: "var(--charcoal-fg)", opacity: 0.55, marginTop: "0.25rem" }}>
                {w.blurb}
              </span>
            </Link>
          ))}
          <div style={{ marginTop: "2.5rem", display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            <Link href="/reading-paths" style={linkStyle}>All reading paths</Link>
            <Link href="/writing" style={linkStyle}>The full library</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

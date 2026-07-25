import { useMemo, type ReactNode } from "react";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { StatementBand } from "@/components/EditorialBlocks";
import { trpc } from "@/lib/trpc";
import { PILLAR_BY_ID, pillarForPost, pillarUrl, type Pillar } from "@/lib/taxonomy";
import { getReadingPathBySlug, availableCount } from "@/lib/readingPaths";
import ToolStrip, { type ToolStripItem } from "@/components/ToolStrip";

/**
 * Shared shell for the six pillar landing pages. Each page supplies its own
 * SEOMeta (string literals, per the prerender contract), its on-voice intro
 * as children, and the one-line statement; this renders the house structure:
 * hero → intro prose → statement → the ordered path + the filtered library →
 * where the pillar sits in the arc. Copy lives in the pages, not here.
 */

/** Pillar slug → its landing route (the formation pillar lives at /living-well). */
export const ROUTE_FOR_PILLAR: Record<string, string> = {
  "capture-by-the-right": "/capture-by-the-right",
  "capture-by-the-left": "/capture-by-the-left",
  "reading-scripture-past-our-politics": "/reading-scripture-past-our-politics",
  "the-pastoral-angle": "/the-pastoral-angle",
  "living-well-after-christendom": "/living-well",
};

const NUMBER_WORD: Record<number, string> = { 1: "One", 2: "Two", 3: "Three", 4: "Four", 5: "Five", 6: "Six" };

const goldLink = {
  fontFamily: "var(--U)",
  fontSize: "0.85rem",
  fontWeight: 500,
  color: "var(--mustard)",
  textDecoration: "none",
  borderBottom: "1px solid var(--mustard)",
  paddingBottom: "0.2rem",
} as const;

export default function PillarLanding({
  pillar,
  pathSlug,
  statement,
  tools,
  toolsIntro,
  children,
}: {
  pillar: Pillar;
  /** Reading-path slug at /reading-paths/:slug, when the pillar has one. */
  pathSlug?: string;
  /** The one-line verdict rendered as a StatementBand between intro and path. */
  statement: string;
  /** Instruments that genuinely serve this pillar — omitted when none do. */
  tools?: ToolStripItem[];
  toolsIntro?: string;
  /** The on-voice intro paragraphs. */
  children: ReactNode;
}) {
  const postsQuery = trpc.posts.listPublished.useQuery();
  const essayCount = useMemo(
    () => (postsQuery.data ?? []).filter((p) => pillarForPost(p)?.id === pillar.id).length,
    [postsQuery.data, pillar.id],
  );
  const path = pathSlug ? getReadingPathBySlug(pathSlug) : undefined;
  const prev = PILLAR_BY_ID.get(pillar.id - 1);
  const next = PILLAR_BY_ID.get(pillar.id + 1);

  return (
    <Layout>
      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-4) var(--s-6)", color: "var(--charcoal-fg)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            Diagnosis · Pillar {NUMBER_WORD[pillar.id]}
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(38px, 6vw, 68px)", fontWeight: 400, lineHeight: 1.02, letterSpacing: "-0.03em", marginBottom: "20px", maxWidth: "16ch" }}>
            {pillar.name}
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "19px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "60ch" }}>
            {pillar.blurb}
          </p>
        </div>
      </section>

      {/* THE INTRO — the pillar's own voice */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-3)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div className="article-body prose-section">{children}</div>
        </div>
      </section>

      <StatementBand tone="light" eyebrow="The verdict underneath" width="38ch">
        {statement}
      </StatementBand>

      {/* THE WAY THROUGH */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-3)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "1.6rem", fontWeight: 400, color: "var(--ink)", marginBottom: "1.6rem" }}>
            Two ways in
          </h2>
          {path && pathSlug && (
            <Link href={`/reading-paths/${pathSlug}`} style={{ display: "block", textDecoration: "none", background: "var(--card, #FFFFFF)", border: "1px solid rgba(20,17,12,0.12)", padding: "1.4rem 1.5rem", marginBottom: "1rem" }}>
              <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "1.2rem", color: "var(--ink)", marginBottom: "0.35rem" }}>
                The ordered path <ArrowRight size={15} style={{ display: "inline", verticalAlign: "middle", color: "var(--mustard)" }} />
              </span>
              <span style={{ display: "block", fontSize: "0.9rem", lineHeight: 1.6, color: "var(--ink-muted)" }}>
                {availableCount(path)} essays in reading order — each one assumes the ground the one before it cleared. Start here if you're new to the pillar.
              </span>
            </Link>
          )}
          <Link href={pillarUrl(pillar.slug)} style={{ display: "block", textDecoration: "none", background: "var(--card, #FFFFFF)", border: "1px solid rgba(20,17,12,0.12)", padding: "1.4rem 1.5rem" }}>
            <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "1.2rem", color: "var(--ink)", marginBottom: "0.35rem" }}>
              The open shelf <ArrowRight size={15} style={{ display: "inline", verticalAlign: "middle", color: "var(--mustard)" }} />
            </span>
            <span style={{ display: "block", fontSize: "0.9rem", lineHeight: 1.6, color: "var(--ink-muted)" }}>
              {postsQuery.data ? `All ${essayCount} essays filed under this pillar` : "Every essay filed under this pillar"}, newest first — browse in any order.
            </span>
          </Link>
        </div>
      </section>

      {/* THE INSTRUMENTS — only when tools genuinely serve this pillar */}
      {tools && tools.length > 0 && (
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-3)" }}>
          <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
            <ToolStrip tools={tools} intro={toolsIntro} />
          </div>
        </section>
      )}

      {/* WHERE IT SITS IN THE ARC */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-5) var(--s-3)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto", display: "flex", justifyContent: "space-between", gap: "2rem", flexWrap: "wrap" }}>
          <div>
            {prev && ROUTE_FOR_PILLAR[prev.slug] && (
              <Link href={ROUTE_FOR_PILLAR[prev.slug]} style={{ textDecoration: "none" }}>
                <span style={{ display: "block", fontFamily: "var(--U)", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--charcoal-fg)", opacity: 0.5, marginBottom: "0.3rem" }}>← Previous pillar</span>
                <span style={{ fontFamily: "var(--F)", fontSize: "1.05rem", color: "var(--charcoal-fg)" }}>{prev.name}</span>
              </Link>
            )}
          </div>
          <div style={{ textAlign: "right" }}>
            {next && ROUTE_FOR_PILLAR[next.slug] && (
              <Link href={ROUTE_FOR_PILLAR[next.slug]} style={{ textDecoration: "none" }}>
                <span style={{ display: "block", fontFamily: "var(--U)", fontSize: "0.7rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--charcoal-fg)", opacity: 0.5, marginBottom: "0.3rem" }}>Next pillar →</span>
                <span style={{ fontFamily: "var(--F)", fontSize: "1.05rem", color: "var(--charcoal-fg)" }}>{next.name}</span>
              </Link>
            )}
          </div>
          <div style={{ flexBasis: "100%", marginTop: "1.2rem" }}>
            <Link href="/pillars" style={goldLink}>All five pillars</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

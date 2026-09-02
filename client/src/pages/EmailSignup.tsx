/**
 * /subscribe — the honest subscribe page.
 *
 * Two things here are real: the site's own subscriber ledger (so the
 * readership belongs to the author and not to a platform) and the handoff to
 * Substack, where the essays are actually delivered. The pitch is the one
 * paragraph in positioning.ts (SUBSTACK_PITCH), used verbatim on /substack and
 * in the footer as well, so a reader is asked once, in one voice.
 *
 * This page used to promise a weekly cadence and an audience-matched first
 * essay. No sender or sequence exists behind either promise (roadmap LT-4), so
 * both are gone; the copy now says only what the stack can do.
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SegmentedSignup } from "@/components/SegmentedSignup";
import { BRAND_SENTENCE, SUBSTACK_PITCH, SUBSTACK_SERIES_TITLE } from "@/lib/positioning";

export default function EmailSignup() {
  return (
    <Layout>
      <SEOMeta
        title="Subscribe — LiveWell by James Bell"
        description={BRAND_SENTENCE}
        url="https://www.livewellbyjamesbell.co/subscribe"
        keywords="subscribe, Substack, The End of Christian America, theology essays, reading paths, James Bell"
      />

      {/* ── HERO ── */}
      <section style={{ background: "var(--charcoal)", padding: "96px 24px 72px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 28 }}>
            <span style={{ width: 32, height: 1, background: "var(--mustard)", display: "inline-block" }} />
            <span style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--mustard)" }}>
              On Substack · a book in parts
            </span>
            <span style={{ width: 32, height: 1, background: "var(--mustard)", display: "inline-block" }} />
          </div>

          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--charcoal-fg)", marginBottom: 24 }}>
            {SUBSTACK_SERIES_TITLE}
          </h1>
          <p style={{ fontFamily: "var(--F)", fontSize: "clamp(18px, 2.2vw, 22px)", color: "var(--charcoal-fg)", opacity: 0.8, maxWidth: 560, margin: "0 auto", lineHeight: 1.5 }}>
            {BRAND_SENTENCE}
          </p>
        </div>
      </section>

      {/* ── THE ONE REAL FORM ── */}
      <section style={{ background: "var(--bone)", padding: "72px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <SegmentedSignup title="Subscribe" description={SUBSTACK_PITCH} source="subscribe-page" />
          <p style={{ fontFamily: "var(--B)", fontSize: "13px", lineHeight: 1.6, color: "var(--ink-muted)", marginTop: 16, maxWidth: "60ch" }}>
            We keep your address on our own list as well, so the readership belongs to
            us and not to a platform — if the essays ever move, you move with them.
          </p>
        </div>
      </section>

      {/* ── READING PATHS (the self-paced real thing) ── */}
      <section style={{ background: "var(--bone-warm)", padding: "72px 24px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--mustard-text)", marginBottom: 20 }}>
            Prefer to read at your own pace
          </p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 400, color: "var(--ink)", marginBottom: 16 }}>
            The reading paths are open now
          </h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", color: "var(--ink-muted)", lineHeight: 1.7, maxWidth: "54ch", margin: "0 auto 32px" }}>
            Curated sequences through the library — deconstruction, church history,
            the skeptic's track, and more — in the right order, one essay at a time,
            no inbox required. Email versions of these paths are being built; when
            they can actually be delivered, subscribers hear first.
          </p>
          <Link href="/reading-paths" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", border: "none", padding: "13px 28px", minHeight: "44px", fontSize: "14px", fontWeight: 500, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer" }}>
              Browse the Reading Paths
            </button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

/**
 * /subscribe — the honest subscribe page.
 *
 * This page used to advertise eight "email reading path" sequences and end in
 * a form whose submit handler was a setTimeout that showed success without
 * calling anything ("Backend not wired yet"). No sender exists in the stack,
 * so the sequences could not be delivered and the reader's choice went
 * nowhere. Until real transactional email ships (roadmap LT-4), this page
 * offers the two things that are real: the weekly essay list (recorded via
 * SegmentedSignup, completed on Substack) and the self-paced reading paths.
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SegmentedSignup } from "@/components/SegmentedSignup";

export default function EmailSignup() {
  return (
    <Layout>
      <SEOMeta
        title="Subscribe — LiveWell by James Bell"
        description="One serious essay a week, chosen for where you actually are — skeptic, doubter, pastor, or seeker. Plus self-paced reading paths through the whole library."
        url="https://www.livewellbyjamesbell.co/subscribe"
        keywords="subscribe, newsletter, theology essays, reading paths, James Bell"
      />

      {/* ── HERO ── */}
      <section style={{ background: "var(--charcoal)", padding: "96px 24px 72px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 28 }}>
            <span style={{ width: 32, height: 1, background: "var(--mustard)", display: "inline-block" }} />
            <span style={{ fontFamily: "var(--U)", fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--mustard)" }}>
              The Weekly Essay
            </span>
            <span style={{ width: 32, height: 1, background: "var(--mustard)", display: "inline-block" }} />
          </div>

          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--charcoal-fg)", marginBottom: 24 }}>
            One serious essay
            <br />
            a week. Written slow,
            <br />
            sent <em style={{ fontStyle: "italic", color: "var(--mustard)" }}>once</em>.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "clamp(16px, 2vw, 18px)", color: "rgba(255,255,255,.65)", maxWidth: 560, margin: "0 auto", lineHeight: 1.75 }}>
            Theology that meets the actual Tuesday afternoon of marriage, money,
            parenting, and doubt. Tell us who you are and the first essay you get
            will match it. No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* ── THE ONE REAL FORM ── */}
      <section style={{ background: "var(--bone)", padding: "72px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <SegmentedSignup
            title="Subscribe — and tell us where you're standing"
            description="Skeptic, doubter, pastor, or seeker. One essay a week either way; the first one is chosen for you."
          />
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
            <button style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", border: "none", padding: "13px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer" }}>
              Browse the Reading Paths
            </button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

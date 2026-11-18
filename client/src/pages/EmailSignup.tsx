/**
 * /subscribe — the honest subscribe page.
 *
 * This page used to advertise eight "email reading path" sequences and end in
 * a form whose submit handler was a setTimeout that showed success without
 * calling anything ("Backend not wired yet"). No sender exists in the stack,
 * so the sequences could not be delivered and the reader's choice went
 * nowhere. Until real transactional email ships (roadmap LT-4), this page
 * offers the two things that are real: the newsletter (recorded via
 * SegmentedSignup, completed on Substack) and the essays on the site.
 *
 * The page promises only what happens (2026-11-17): no pace ("one essay a
 * week") and no matched first essay, because nothing in the code sends
 * either. Everyone who confirms on Substack gets the same newsletter.
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
        description="Get James Bell's new essays by email through his Substack newsletter. Every essay on this site is also free to read without subscribing."
        url="https://www.livewellbyjamesbell.co/subscribe"
        keywords="subscribe, newsletter, theology essays, reading paths, James Bell"
      />

      {/* ── HERO ── */}
      <section style={{ background: "var(--charcoal)", padding: "96px 24px 72px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 28 }}>
            <span style={{ width: 32, height: 1, background: "var(--mustard)", display: "inline-block" }} />
            <span style={{ fontFamily: "var(--U)", fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--mustard)" }}>
              The newsletter
            </span>
            <span style={{ width: 32, height: 1, background: "var(--mustard)", display: "inline-block" }} />
          </div>

          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--charcoal-fg)", marginBottom: 24 }}>
            New essays,
            <br />
            sent to your inbox.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "clamp(16px, 2vw, 18px)", color: "rgba(255,255,255,.65)", maxWidth: 560, margin: "0 auto", lineHeight: 1.75 }}>
            Theology that meets the weight of marriage, money,
            parenting, and doubt. The newsletter goes out through Substack. Enter
            your email below and a Substack tab opens where you confirm it. After
            that, new essays come to your inbox when they are published, and you
            can leave the moment it stops being worth your time.
          </p>
        </div>
      </section>

      {/* ── THE ONE REAL FORM ── */}
      <section style={{ background: "var(--bone)", padding: "72px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <SegmentedSignup
            title="Subscribe, and tell us where you're standing"
            description="Skeptic, Christian, pastor, or just exploring. Your answer tells us who is reading. Everyone gets the same newsletter."
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
            The essays are open now
          </h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", color: "var(--ink-muted)", lineHeight: 1.7, maxWidth: "54ch", margin: "0 auto 32px" }}>
            A short shelf of essays, grouped by subject, with three to start with.
            Read them at your own pace, no inbox required.
          </p>
          <Link href="/writing" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--ink)", color: "var(--bone)", border: "none", padding: "13px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer" }}>
              Read the essays
            </button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}

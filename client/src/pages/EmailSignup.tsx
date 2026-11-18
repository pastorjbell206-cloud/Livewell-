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
import { channelUrl } from "@/lib/channels";

export default function EmailSignup() {
  const substack = channelUrl("substack");
  return (
    <Layout>
      <SEOMeta
        title="Subscribe"
        description="Get James Bell's new essays by email through his Substack. Leave your email here and confirm on Substack, or read there first and decide later."
        url="https://www.livewellbyjamesbell.co/subscribe"
        keywords="subscribe, Substack, newsletter, theology essays, James Bell"
      />

      {/* ── HERO ── */}
      <section style={{ background: "var(--charcoal)", padding: "96px 24px 72px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 28 }}>
            <span style={{ width: 32, height: 1, background: "var(--mustard)", display: "inline-block" }} />
            <span style={{ fontFamily: "var(--U)", fontSize: "0.6875rem", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--mustard)" }}>
              Substack
            </span>
            <span style={{ width: 32, height: 1, background: "var(--mustard)", display: "inline-block" }} />
          </div>

          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 300, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--charcoal-fg)", marginBottom: 24 }}>
            New essays by email,
            <br />
            through Substack.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "clamp(16px, 2vw, 18px)", color: "var(--charcoal-fg-muted)", maxWidth: 560, margin: "0 auto", lineHeight: 1.75 }}>
            The newsletter is James&rsquo;s Substack. Leave your email below and you will finish the
            sign-up there, where the essays are sent from. Nothing else comes with it, and you can
            leave the moment it stops being worth your time.
          </p>
          {substack && (
            <p style={{ margin: "20px 0 0", fontFamily: "var(--U)", fontSize: "15px" }}>
              <a
                href={substack}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", minHeight: "44px", color: "var(--charcoal-fg)", textDecoration: "underline", textDecorationColor: "var(--mustard)", textUnderlineOffset: "4px", backgroundImage: "none" }}
              >
                Read on Substack first
              </a>
            </p>
          )}
        </div>
      </section>

      {/* ── THE ONE REAL FORM ── */}
      <section style={{ background: "var(--bone)", padding: "72px 24px" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <SegmentedSignup
            title="Subscribe on Substack"
            description="Pick the line closest to where you stand. It tells James who is reading, and everyone gets the same essays."
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

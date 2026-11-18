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
import PageHead from "@/components/art/PageHead";
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

      <PageHead
        door="About"
        doorHref="/about"
        title="New essays by email, through Substack"
        line="Leave your email below and finish the sign-up on Substack. You can leave at any time."
        plate="quill"
        width="var(--w-content)"
        action={
          substack && (
            <a href={substack} target="_blank" rel="noopener noreferrer" className="btn btn--quiet">
              Read on Substack first
            </a>
          )
        }
      />

      {/* ── THE ONE REAL FORM ── */}
      <section style={{ background: "var(--bone)", padding: "72px var(--gutter)" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <SegmentedSignup
            title="Subscribe on Substack"
            description="Pick the line closest to where you stand. It tells James who is reading, and everyone gets the same essays."
          />
        </div>
      </section>

      {/* ── READING PATHS (the self-paced real thing) ── */}
      <section style={{ background: "var(--bone-warm)", padding: "72px var(--gutter)" }}>
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
          {/* One link, styled as the site's button (a button inside a link was two targets, the link 20px tall). */}
          <Link href="/writing" className="btn">
            Read the essays
          </Link>
        </div>
      </section>
    </Layout>
  );
}

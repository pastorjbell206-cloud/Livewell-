/**
 * /substack — the handoff page to the Substack.
 *
 * One pitch, verbatim from positioning.ts (SUBSTACK_PITCH): the same paragraph
 * used on /subscribe and in the footer, so a reader is asked once, in one
 * voice, wherever they meet the form. The page names the serialized book,
 * which is the reason to subscribe, and makes no cadence or subscriber-count
 * claim — neither is verifiable from this repo.
 *
 * Brand contract: tokens only, display weight 400, no third-party imagery. The
 * previous version carried bold display type, a hardcoded rgba text colour, a
 * stock "writing desk" photo from a CDN the site does not control, and a CTA
 * that sent readers to an iOS share link seeded in the settings table.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { ExternalLink } from "lucide-react";
import { Link } from "wouter";
import { substackSubscribeUrl } from "@/lib/site";
import {
  BRAND_SENTENCE,
  SUBSTACK_PITCH,
  SUBSTACK_SERIES_TITLE,
  SUBSTACK_SERIES_URL,
} from "@/lib/positioning";

export default function SubstackPage() {
  const subscribeUrl = substackSubscribeUrl(undefined, "substack-page");

  return (
    <>
      <SEOMeta
        title="The End of Christian America — on Substack"
        description={BRAND_SENTENCE}
        url="https://www.livewellbyjamesbell.co/substack"
        keywords="Substack, The End of Christian America, James Bell, Christian nationalism, serialized book"
      />
      <Layout>
        <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-4) var(--s-6)" }}>
          <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
              <span aria-hidden style={{ width: "32px", height: "1px", background: "var(--mustard)" }} />
              <span
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--mustard)",
                }}
              >
                On Substack · a book in parts
              </span>
            </div>
            <h1
              style={{
                fontFamily: "var(--F)",
                fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--charcoal-fg)",
                marginBottom: "1rem",
              }}
            >
              {SUBSTACK_SERIES_TITLE}
            </h1>
            <p
              style={{
                fontFamily: "var(--F)",
                fontSize: "clamp(1.125rem, 2vw, 1.375rem)",
                lineHeight: 1.5,
                color: "var(--charcoal-fg)",
                opacity: 0.8,
                maxWidth: "36em",
                margin: 0,
              }}
            >
              {BRAND_SENTENCE}
            </p>
          </div>
        </section>

        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
          <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
            <div style={{ width: "40px", height: "2px", background: "var(--mustard)", marginBottom: "2rem" }} />
            <p
              style={{
                fontFamily: "var(--B)",
                fontSize: "1.0625rem",
                lineHeight: 1.7,
                color: "var(--ink)",
                maxWidth: "68ch",
                marginBottom: "2rem",
              }}
            >
              {SUBSTACK_PITCH}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
              <a
                href={subscribeUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "13px 24px",
                  minHeight: "44px",
                  background: "var(--mustard)",
                  color: "var(--ink)",
                  textDecoration: "none",
                  borderRadius: "var(--radius-sm)",
                  fontFamily: "var(--U)",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
              >
                <ExternalLink size={16} aria-hidden /> Subscribe on Substack
              </a>
              <a
                href={SUBSTACK_SERIES_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  minHeight: "44px",
                  fontFamily: "var(--U)",
                  fontSize: "14px",
                  fontWeight: 500,
                  color: "var(--ink)",
                  textDecoration: "underline",
                  textDecorationColor: "var(--mustard)",
                  textUnderlineOffset: "4px",
                }}
              >
                Read the first part
              </a>
            </div>

            <p
              style={{
                fontFamily: "var(--B)",
                fontSize: "14px",
                lineHeight: 1.6,
                color: "var(--ink-muted)",
                marginTop: "2rem",
                maxWidth: "60ch",
              }}
            >
              Prefer to leave your address here first?{" "}
              <Link href="/subscribe" style={{ color: "var(--ink)", textDecorationColor: "var(--mustard)" }}>
                The subscribe page
              </Link>{" "}
              records it on our own list, then hands you to Substack to finish.
            </p>
          </div>
        </section>
      </Layout>
    </>
  );
}

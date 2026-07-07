import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { PullQuote, SectionArt } from "@/components/EditorialBlocks";
import { SITE_URL } from "@/lib/site";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

/**
 * The five pillars — the site's single taxonomy spine, matching the nav,
 * footer, and homepage exactly (names, order, and hub links). This page shows
 * the same five; it does not introduce a competing scheme.
 */
const PILLARS = [
  { name: "Theological Depth", href: "/theology", blurb: "Doctrine, church history, the whole biblical story." },
  { name: "Prophetic Justice", href: "/justice", blurb: "The poor, the outsider, the systems we inherit." },
  { name: "Prophetic Disruption", href: "/disruption", blurb: "The church, empire, and the politics that capture it." },
  { name: "Leadership Formation", href: "/leadership", blurb: "Character before competence, for those who lead." },
  { name: "Integrated Life", href: "/life", blurb: "Marriage, parenting, vocation, and rest." },
];

export default function Pillars() {
  return (
    <Layout>
      <SEOMeta
        title="The Five Pillars — The Library | James Bell"
        description="Theological depth, prophetic disruption, prophetic justice, leadership formation, and the integrated life: the five pillars that organize James Bell's writing."
        url={`${SITE_URL}/pillars`}
      />
      <div style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          {/* Header */}
          <div style={{ textAlign: "center", marginBottom: "var(--s-6)" }}>
            <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>
              The Library
            </div>
            <h1
              style={{
                fontFamily: "var(--F)",
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                color: "var(--ink)",
                marginBottom: "20px",
              }}
            >
              Five pillars. One argument.
            </h1>
            <p
              style={{
                fontFamily: "var(--B)",
                fontSize: "19px",
                lineHeight: 1.7,
                color: "var(--ink-muted)",
                maxWidth: "60ch",
                margin: "0 auto",
              }}
            >
              Every essay is filed under one of five pillars. Start with the one
              that fits, and follow it as far as it goes.
            </p>
          </div>

          <SectionArt seed="pillars-intro" />

          {/* Pillars */}
          <div style={{ display: "grid", gap: "20px", marginBottom: "var(--s-6)" }}>
            {PILLARS.map(pillar => (
              <Link
                key={pillar.href}
                href={pillar.href}
                style={{
                  display: "block",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderLeft: "3px solid var(--mustard)",
                  borderRadius: "var(--radius-sm)",
                  padding: "24px 28px",
                  textDecoration: "none",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    gap: "16px",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "var(--F)",
                      fontSize: "24px",
                      fontWeight: 500,
                      letterSpacing: "-0.01em",
                      color: "var(--ink)",
                    }}
                  >
                    {pillar.name}
                  </h2>
                  <ArrowRight size={18} aria-hidden style={{ color: "var(--ink-muted)", flexShrink: 0 }} />
                </div>
                <p
                  style={{
                    fontFamily: "var(--B)",
                    fontSize: "15px",
                    lineHeight: 1.6,
                    color: "var(--ink-muted)",
                    marginTop: "10px",
                  }}
                >
                  {pillar.blurb}
                </p>
              </Link>
            ))}
          </div>

          <PullQuote>
            The five pillars are not five subjects. They are one faith, pressed
            at five points.
          </PullQuote>

          {/* CTA */}
          <div style={{ textAlign: "center", marginTop: "var(--s-5)" }}>
            <Link
              href="/writing"
              style={{
                display: "inline-block",
                padding: "14px 28px",
                background: "var(--ink)",
                color: "var(--bone)",
                borderRadius: "var(--radius-sm)",
                fontFamily: "var(--U)",
                fontWeight: 600,
                fontSize: "14px",
                textDecoration: "none",
              }}
            >
              Read every essay
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

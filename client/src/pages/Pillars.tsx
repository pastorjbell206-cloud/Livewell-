/**
 * Pillars (/pillars) — the five content pillars as the top-level browse lens.
 *
 * Presentation only; the pillars and their essay-matching rules live in
 * lib/pillars.ts. Each pillar links to /writing?pillar=<slug>, which filters
 * the archive to that pillar's essays.
 */
import { Link } from "wouter";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { PILLARS } from "@/lib/pillars";

export default function Pillars() {
  return (
    <Layout>
      <SEOMeta
        title="The Five Pillars — LiveWell by James Bell"
        description="Five lenses on the work: capture by the right, capture by the left, reading Scripture past our politics, after Christendom, and the pastoral angle."
        url="https://www.livewellbyjamesbell.co/pillars"
        type="website"
      />

      {/* HEADER */}
      <section style={{ background: "var(--charcoal)", padding: "5rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div
            style={{
              fontFamily: "var(--U)",
              fontSize: "11px",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              color: "var(--mustard)",
              marginBottom: "1.5rem",
            }}
          >
            The archive, by theme
          </div>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(2.25rem, 5vw, 3.25rem)",
              fontWeight: 400,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--bone)",
              marginBottom: "1.25rem",
            }}
          >
            Five pillars
          </h1>
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "1.0625rem",
              lineHeight: 1.7,
              color: "var(--bone)",
              opacity: 0.78,
              maxWidth: "60ch",
            }}
          >
            The places where Scripture and American politics collide — and the
            pastoral work of holding the line between them. Pick a pillar to read
            the essays that live there.
          </p>
        </div>
      </section>

      {/* PILLARS */}
      <section style={{ background: "var(--bone)", padding: "4rem 1.5rem 5rem" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          {PILLARS.map((pillar, i) => (
            <Link
              key={pillar.slug}
              href={`/writing?pillar=${pillar.slug}`}
              style={{ display: "block", textDecoration: "none" }}
            >
              <article
                style={{
                  borderTop: i === 0 ? "1px solid var(--border)" : "none",
                  borderBottom: "1px solid var(--border)",
                  padding: "2rem 0",
                  display: "flex",
                  gap: "1.5rem",
                  alignItems: "baseline",
                }}
              >
                <span
                  aria-hidden
                  style={{
                    fontFamily: "var(--U)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    color: "var(--mustard-text)",
                    flexShrink: 0,
                    minWidth: "2rem",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h2
                    style={{
                      fontFamily: "var(--F)",
                      fontSize: "clamp(1.5rem, 3vw, 2rem)",
                      fontWeight: 400,
                      lineHeight: 1.15,
                      letterSpacing: "-0.02em",
                      color: "var(--ink)",
                      margin: "0 0 0.5rem",
                    }}
                  >
                    {pillar.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--B)",
                      fontSize: "1rem",
                      lineHeight: 1.7,
                      color: "var(--ink-muted)",
                      maxWidth: "64ch",
                      margin: 0,
                    }}
                  >
                    {pillar.description}
                  </p>
                </div>
                <span
                  aria-hidden
                  style={{
                    fontFamily: "var(--U)",
                    fontSize: "1.1rem",
                    color: "var(--mustard)",
                    flexShrink: 0,
                  }}
                >
                  →
                </span>
              </article>
            </Link>
          ))}

          <div style={{ marginTop: "3rem" }}>
            <Link
              href="/writing"
              style={{
                fontFamily: "var(--U)",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--mustard-text)",
                textDecoration: "none",
                borderBottom: "1px solid var(--mustard)",
                paddingBottom: "0.25rem",
              }}
            >
              Or read every essay
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

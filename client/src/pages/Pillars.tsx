import Layout from "@/components/Layout";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { useMemo } from "react";
import { trpc } from "@/lib/trpc";
import {
  MOVEMENTS,
  PILLARS_BY_MOVEMENT,
  pillarUrl,
  pillarForPost,
  type Movement,
} from "@/lib/taxonomy";

const MOVEMENT_ORDER: Movement[] = ["diagnosis", "formation"];

export default function Pillars() {
  const postsQuery = trpc.posts.listPublished.useQuery();
  const counts = useMemo(() => {
    const c: Record<number, number> = {};
    for (const p of postsQuery.data ?? []) {
      const pl = pillarForPost(p);
      if (pl) c[pl.id] = (c[pl.id] ?? 0) + 1;
    }
    return c;
  }, [postsQuery.data]);

  return (
    <Layout>
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
              Two movements. Six pillars.
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
              The writing moves in two motions — first the diagnosis of what was
              lost and why, then the formation of how to live well on the other
              side. Every essay is filed under one of six pillars.
            </p>
          </div>

          {/* Movements → pillars */}
          {MOVEMENT_ORDER.map(movement => (
            <section key={movement} style={{ marginBottom: "var(--s-6)" }}>
              <div
                style={{
                  borderBottom: "1px solid var(--border)",
                  paddingBottom: "12px",
                  marginBottom: "var(--s-4)",
                }}
              >
                <h2
                  style={{
                    fontFamily: "var(--F)",
                    fontSize: "32px",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    color: "var(--ink)",
                  }}
                >
                  {MOVEMENTS[movement].title}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--U)",
                    fontSize: "13px",
                    textTransform: "uppercase",
                    letterSpacing: "0.16em",
                    color: "var(--mustard-text)",
                    marginTop: "6px",
                  }}
                >
                  {MOVEMENTS[movement].subtitle}
                </p>
              </div>

              <div style={{ display: "grid", gap: "20px" }}>
                {PILLARS_BY_MOVEMENT[movement].map(pillar => (
                  <Link
                    key={pillar.id}
                    href={pillarUrl(pillar.slug)}
                    style={{
                      display: "block",
                      background: "var(--card)",
                      border: "1px solid var(--border)",
                      borderLeft: "3px solid var(--mustard)",
                      borderRadius: "var(--radius-sm)",
                      padding: "24px 28px",
                      textDecoration: "none",
                      transition: "border-color 0.2s",
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
                      <h3
                        style={{
                          fontFamily: "var(--F)",
                          fontSize: "24px",
                          fontWeight: 500,
                          letterSpacing: "-0.01em",
                          color: "var(--ink)",
                        }}
                      >
                        <span style={{ color: "var(--mustard-text)", marginRight: "10px" }}>
                          {pillar.id}
                        </span>
                        {pillar.name}
                      </h3>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexShrink: 0 }}>
                        <span
                          style={{
                            fontFamily: "var(--U)",
                            fontSize: "12px",
                            color: "var(--ink-muted)",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {counts[pillar.id] ?? 0} {counts[pillar.id] === 1 ? "essay" : "essays"}
                        </span>
                        <ArrowRight size={18} aria-hidden style={{ color: "var(--ink-muted)" }} />
                      </div>
                    </div>
                    {/* Intro placeholder — James supplies the final on-voice copy. */}
                    <p
                      style={{
                        fontFamily: "var(--B)",
                        fontSize: "15px",
                        lineHeight: 1.6,
                        color: "var(--ink-muted)",
                        marginTop: "10px",
                        fontStyle: "italic",
                      }}
                    >
                      {pillar.blurb}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          ))}

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

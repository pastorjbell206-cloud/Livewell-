/**
 * Topic Pathways index (/pathways). For each major topic, a guided route:
 * read a few essays, do the study, then read the book free. This page gathers
 * the routes; each pathway's ordered steps live in client/public/pathways/
 * <slug>.json and render on /pathways/:slug (TopicPathway).
 *
 * The manifest (client/public/pathways/index.json) is loaded at runtime so a
 * new pathway file appears here without touching this component. Loading,
 * failed, and loaded-but-empty are three distinct states (elevation HS-4): a
 * failed load shows LoadFailed with a retry, never an endless spinner.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import LoadFailed from "@/components/LoadFailed";
import { fetchJson } from "@/lib/fetch-json";
import { GeneratedCover, coverThemeFor } from "@/components/GeneratedCover";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface PathwaySummary {
  slug: string;
  title: string;
  subtitle: string;
  forWhom: string;
}

function isSummary(x: unknown): x is PathwaySummary {
  if (typeof x !== "object" || x === null) return false;
  const o = x as Record<string, unknown>;
  return typeof o.slug === "string" && typeof o.title === "string";
}

function isManifest(x: unknown): x is PathwaySummary[] {
  return Array.isArray(x) && x.every(isSummary);
}

export default function Pathways() {
  // Loading, failed, and loaded are keyed to the retry nonce so a "Try again"
  // resets cleanly without a synchronous setState inside the effect.
  const [loaded, setLoaded] = useState<{ nonce: number; items: PathwaySummary[] } | null>(null);
  const [failedAt, setFailedAt] = useState<number | null>(null);
  const [nonce, setNonce] = useState(0);
  const failed = failedAt === nonce;
  const items = loaded && loaded.nonce === nonce ? loaded.items : null;

  useEffect(() => {
    let stale = false;
    fetchJson("/pathways/index.json", isManifest)
      .then((d) => { if (!stale) setLoaded({ nonce, items: d }); })
      .catch(() => { if (!stale) setFailedAt(nonce); });
    return () => { stale = true; };
  }, [nonce]);

  return (
    <Layout>
      <SEOMeta
        title="Topic Pathways — A Guided Route Through Each Major Topic"
        description="For each major topic, a guided route: read a few essays, do the study, then read the book free. The deep library, turned into a spine you can follow start to end."
        url="https://www.livewellbyjamesbell.co/pathways"
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>Topic Pathways</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.4vw, 58px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "18px", maxWidth: "18ch" }}>
            Start somewhere. Follow it through.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "62ch" }}>
            The library is deep and it is wide, which is another way of saying it is easy to get lost in. A pathway is the way through one subject: a few essays to read first, a study to work, and a book to finish — free to read, in order, start to end.
          </p>
        </div>
      </section>

      {/* THE PATHWAYS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>The routes</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "var(--s-4)" }}>
            Pick the question you are living in
          </h2>

          {failed ? (
            <LoadFailed what="The pathways" onRetry={() => setNonce((n) => n + 1)} backHref="/resources" backLabel="All resources" />
          ) : !items ? (
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)" }}>Gathering the routes…</p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(380px, 100%), 1fr))", gap: "16px" }}>
              {items.map((p) => (
                <Link
                  key={p.slug}
                  href={`/pathways/${p.slug}`}
                  style={{ display: "flex", gap: "16px", textDecoration: "none", color: "inherit", background: "var(--card)", border: "1px solid rgba(20,17,12,0.08)", borderRadius: "var(--radius-sm)", overflow: "hidden", height: "100%" }}
                >
                  <div style={{ width: "104px", flexShrink: 0, alignSelf: "flex-start", aspectRatio: "3 / 4", overflow: "hidden" }}>
                    <GeneratedCover title={p.title} {...coverThemeFor(`${p.title} ${p.subtitle}`)} style={{ width: "100%", height: "100%" }} />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0, padding: "var(--s-4) var(--s-4) var(--s-4) 0" }}>
                    <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>Read · Study · Book</div>
                    <div style={{ fontFamily: "var(--F)", fontSize: "23px", fontWeight: 500, color: "var(--ink)", lineHeight: 1.18, marginBottom: "10px" }}>{p.title}</div>
                    <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", marginBottom: "12px" }}>{p.subtitle}</p>
                    <p style={{ fontFamily: "var(--B)", fontSize: "13px", fontStyle: "italic", lineHeight: 1.55, color: "var(--ink-muted)", marginBottom: "14px", flex: 1 }}>{p.forWhom}</p>
                    <span style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink)", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px", alignSelf: "flex-start" }}>
                      Begin the pathway →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CLOSING */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-5) var(--s-4)", color: "var(--charcoal-fg)", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--F)", fontSize: "17px", fontStyle: "italic", lineHeight: 1.6, color: "rgba(245,240,230,0.85)", marginBottom: "20px" }}>
            A pathway is a place to start, not a fence. When one ends, the whole library is still open.
          </p>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/reading-paths" style={{ fontFamily: "var(--U)", fontSize: "13.5px", fontWeight: 600, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>Reading Paths</Link>
            <Link href="/studyguides" style={{ fontFamily: "var(--U)", fontSize: "13.5px", fontWeight: 600, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>Study Guides</Link>
            <Link href="/read" style={{ fontFamily: "var(--U)", fontSize: "13.5px", fontWeight: 600, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>The Library</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

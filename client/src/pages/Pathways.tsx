/**
 * Topic Pathways index (/pathways). For each major topic, a guided route:
 * read a few essays, do the study, then finish in the book — the opening free. This page gathers
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
import { getReadEssays } from "@/lib/readProgress";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface PathwaySummary {
  slug: string;
  title: string;
  subtitle: string;
  forWhom: string;
  /** Slugs of the readable steps, from scripts/build-pathways-index.mjs. */
  steps?: string[];
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

  // The reader's own progress, read from this device only and never sent
  // anywhere. A route the reader has started says so, and says how far.
  const readSet = getReadEssays();
  const progressOf = (p: PathwaySummary) => {
    const steps = p.steps ?? [];
    if (!steps.length) return null;
    const done = steps.filter((s) => readSet.has(s)).length;
    return { done, total: steps.length, pct: Math.round((done / steps.length) * 100) };
  };

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
        description="For each major topic, a guided route: read a few essays, do the study, then finish in the book — the opening free. The deep library, turned into a spine you can follow start to end."
        url="https://www.livewellbyjamesbell.co/pathways"
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>Topic Pathways</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.4vw, 58px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "18px", maxWidth: "18ch" }}>
            Start somewhere. Follow it through.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "62ch" }}>
            The library is deep and it is wide, which is another way of saying it is easy to get lost in. A pathway is the way through one subject: a few essays to read first, a study to work, and a book to finish — in order, start to end. The opening of every book is free.
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
              {items.map((p) => {
                const prog = progressOf(p);
                return (
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
                    {prog && prog.done > 0 && (
                      <div style={{ marginBottom: "12px" }}>
                        <div
                          role="progressbar"
                          aria-valuenow={prog.pct}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${prog.done} of ${prog.total} read`}
                          style={{ height: "4px", background: "var(--border)", borderRadius: "999px", overflow: "hidden", marginBottom: "6px" }}
                        >
                          <div style={{ width: `${prog.pct}%`, height: "100%", background: "var(--mustard)" }} />
                        </div>
                        <span style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mustard-text)" }}>
                          {prog.done === prog.total ? "Finished" : `${prog.done} of ${prog.total} read`}
                        </span>
                      </div>
                    )}
                    <span style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink)", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px", alignSelf: "flex-start" }}>
                      {prog && prog.done > 0 && prog.done < prog.total
                        ? "Continue the pathway →"
                        : prog && prog.done === prog.total
                          ? "Read it again →"
                          : "Begin the pathway →"}
                    </span>
                  </div>
                </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CLOSING */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-5) var(--s-4)", color: "var(--bone)", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--F)", fontSize: "17px", fontStyle: "italic", lineHeight: 1.6, color: "rgba(245,240,230,0.85)", marginBottom: "20px" }}>
            A pathway is a place to start, not a fence. When one ends, the whole library is still open.
          </p>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/reading-paths" style={{ fontFamily: "var(--U)", fontSize: "13.5px", fontWeight: 600, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>Reading Paths</Link>
            <Link href="/studyguides" style={{ fontFamily: "var(--U)", fontSize: "13.5px", fontWeight: 600, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>Study Guides</Link>
            <Link href="/books" style={{ fontFamily: "var(--U)", fontSize: "13.5px", fontWeight: 600, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>The Books</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

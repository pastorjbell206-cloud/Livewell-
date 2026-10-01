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
import { CardGrid } from "@/components/editorial/CardGrid";
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
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
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
            <>
              <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: "0 0 var(--s-2)" }}>
                {items.length} {items.length === 1 ? "pathway" : "pathways"}
              </p>
              {/* Each card: the subtitle as dek, then (in the meta slot) who it
                  is for and the reader's device-local progress, and one action
                  that says where the reader stands on this route. */}
              <CardGrid
                min={360}
                label="Topic pathways"
                items={items.map((p) => {
                  const prog = progressOf(p);
                  return {
                    href: `/pathways/${p.slug}`,
                    title: p.title,
                    dek: p.subtitle,
                    meta: (
                      <>
                        {p.forWhom && (
                          <p style={{ flexBasis: "100%", margin: 0, fontFamily: "var(--B)", fontSize: "15px", fontStyle: "italic", lineHeight: 1.6, color: "var(--ink-muted)" }}>{p.forWhom}</p>
                        )}
                        {prog && prog.done > 0 && (
                          <div style={{ flexBasis: "100%", marginTop: "8px" }}>
                            <div
                              role="progressbar"
                              aria-valuenow={prog.pct}
                              aria-valuemin={0}
                              aria-valuemax={100}
                              aria-label={`${prog.done} of ${prog.total} read`}
                              style={{ height: "4px", background: "var(--border)", borderRadius: "var(--radius-pill)", overflow: "hidden", marginBottom: "6px" }}
                            >
                              <div style={{ width: `${prog.pct}%`, height: "100%", background: "var(--mustard)" }} />
                            </div>
                            <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--ink)" }}>
                              {prog.done === prog.total ? "Finished" : `${prog.done} of ${prog.total} read`}
                            </span>
                          </div>
                        )}
                      </>
                    ),
                    cta:
                      prog && prog.done > 0 && prog.done < prog.total
                        ? "Continue the pathway"
                        : prog && prog.done === prog.total
                          ? "Read it again"
                          : "Begin the pathway",
                  };
                })}
              />
            </>
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
            <Link href="/books" style={{ fontFamily: "var(--U)", fontSize: "13.5px", fontWeight: 600, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>The Books</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

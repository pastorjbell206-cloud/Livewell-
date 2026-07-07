/**
 * A single Topic Pathway (/pathways/:slug) — the guided route through one
 * subject, rendered from client/public/pathways/<slug>.json. The reader moves
 * top to bottom: read a few essays, do the study, then read the book free
 * (and buy it if it is worth keeping). Each movement is a numbered step; each
 * item is a real internal link with a one-line reason to open it.
 *
 * Load states are three real states (elevation HS-4): a connection failure
 * shows LoadFailed with a retry; a genuine 404 (an unknown slug) shows an
 * honest not-found; neither leaves a spinner running forever.
 */
import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import LoadFailed from "@/components/LoadFailed";
import { fetchJson } from "@/lib/fetch-json";
import { SITE_URL } from "@/lib/site";

const wrap = { maxWidth: "var(--w-content)", margin: "0 auto" } as const;

interface PathwayItem { label: string; href: string; blurb: string }
interface Movement { kind: "read" | "study" | "book"; heading: string; note: string; items: PathwayItem[] }
interface Pathway { slug: string; title: string; subtitle: string; forWhom: string; movements: Movement[] }

function isPathway(x: unknown): x is Pathway {
  if (typeof x !== "object" || x === null) return false;
  const o = x as Record<string, unknown>;
  return typeof o.slug === "string" && typeof o.title === "string" && Array.isArray(o.movements) && o.movements.length > 0;
}

const KIND_LABEL: Record<Movement["kind"], string> = {
  read: "First, read",
  study: "Then, study",
  book: "Then, the book",
};

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase",
  letterSpacing: "0.18em", color: "var(--mustard-text)",
};

export default function TopicPathway() {
  const [, params] = useRoute("/pathways/:slug");
  const slug = params?.slug;

  // Loaded data, and any error, are both tagged with the slug + retry nonce so
  // moving between pathways never flashes stale content and "Try again"
  // resets cleanly.
  const [loaded, setLoaded] = useState<{ slug: string; nonce: number; data: Pathway } | null>(null);
  const [errored, setErrored] = useState<{ slug: string; nonce: number; kind: "notfound" | "failed" } | null>(null);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    if (!slug) return;
    let stale = false;
    fetchJson(`/pathways/${slug}.json`, isPathway)
      .then((d) => { if (!stale) setLoaded({ slug, nonce, data: d }); })
      .catch((e: unknown) => {
        if (stale) return;
        const kind = String(e instanceof Error ? e.message : e).includes("404") ? "notfound" : "failed";
        setErrored({ slug, nonce, kind });
      });
    return () => { stale = true; };
  }, [slug, nonce]);

  const data = loaded && loaded.slug === slug && loaded.nonce === nonce ? loaded.data : null;
  const err = errored && errored.slug === slug && errored.nonce === nonce ? errored.kind : null;

  return (
    <Layout>
      <SEOMeta
        title={data ? `${data.title} — A Topic Pathway` : "Topic Pathways"}
        description={data ? data.subtitle : "A guided route through a major topic: read a few essays, do the study, then read the book free."}
        url={`${SITE_URL}/pathways/${slug ?? ""}`}
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div style={{ ...eyebrow, color: "var(--mustard)", marginBottom: "14px" }}>
            <Link href="/pathways" style={{ color: "inherit", textDecoration: "none" }}>Topic Pathways</Link>
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>
            {data ? data.title : "A guided route"}
          </h1>
          {data && (
            <>
              <p style={{ fontFamily: "var(--F)", fontSize: "21px", fontStyle: "italic", color: "rgba(245,240,230,0.82)", margin: "0 0 16px", maxWidth: "44ch" }}>{data.subtitle}</p>
              <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "58ch" }}>{data.forWhom}</p>
            </>
          )}
        </div>
      </section>

      {/* BODY */}
      {err === "failed" ? (
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
          <LoadFailed what="This pathway" onRetry={() => setNonce((n) => n + 1)} backHref="/pathways" backLabel="All pathways" />
        </section>
      ) : err === "notfound" ? (
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
          <div style={{ ...wrap, textAlign: "center", maxWidth: "480px" }}>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "28px", fontWeight: 400, color: "var(--ink)", marginBottom: "12px" }}>That pathway isn't here.</h2>
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", marginBottom: "22px" }}>
              It may have been renamed, or the link is off by a word. Every pathway that exists is on the index.
            </p>
            <Link href="/pathways" style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>See all pathways</Link>
          </div>
        </section>
      ) : !data ? (
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)", minHeight: "30vh" }}>
          <div style={wrap}><p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)" }}>Gathering the route…</p></div>
        </section>
      ) : (
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-7)" }}>
          <div style={wrap}>
            {data.movements.map((m, i) => (
              <div key={i} style={{ marginBottom: i === data.movements.length - 1 ? 0 : "var(--s-6)" }}>
                {/* Movement header — a numbered step */}
                <div style={{ display: "flex", gap: "16px", alignItems: "baseline", marginBottom: "6px" }}>
                  <span aria-hidden style={{ fontFamily: "var(--F)", fontSize: "40px", fontWeight: 400, color: "var(--mustard)", lineHeight: 1, flexShrink: 0 }}>{i + 1}</span>
                  <div>
                    <div style={{ ...eyebrow, marginBottom: "6px" }}>{KIND_LABEL[m.kind]}</div>
                    <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.2vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.12 }}>{m.heading}</h2>
                  </div>
                </div>
                <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", margin: "0 0 18px", paddingLeft: "56px", maxWidth: "62ch" }}>{m.note}</p>

                {/* Items */}
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", paddingLeft: "56px" }}>
                  {m.items.map((it, j) => (
                    <Link
                      key={j}
                      href={it.href}
                      style={{ display: "block", textDecoration: "none", color: "inherit", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "16px 18px" }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", gap: "14px", alignItems: "baseline" }}>
                        <span style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)", lineHeight: 1.25 }}>{it.label}</span>
                        <span aria-hidden style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--mustard-text)", flexShrink: 0 }}>→</span>
                      </div>
                      <p style={{ fontFamily: "var(--B)", fontSize: "14.5px", lineHeight: 1.6, color: "var(--ink-muted)", margin: "6px 0 0" }}>{it.blurb}</p>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {/* End of route */}
            <div style={{ marginTop: "var(--s-6)", paddingTop: "var(--s-5)", borderTop: "1px solid var(--border)", textAlign: "center" }}>
              <p style={{ fontFamily: "var(--F)", fontSize: "18px", fontStyle: "italic", color: "var(--ink-muted)", marginBottom: "18px" }}>
                That is the route. Where it ends, the whole library is still open.
              </p>
              <Link href="/pathways" style={{ fontFamily: "var(--U)", fontSize: "13.5px", fontWeight: 600, color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>The other pathways →</Link>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}

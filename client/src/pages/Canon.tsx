/**
 * The canon (/canon): the twelve essays to read first, in order. Nobody can
 * hold 678 essays; everyone can hold twelve. The list is client/src/data/
 * canon.json (James's to edit); the build emits /essays/canon.json from it so
 * this page paints without the API.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { LoadFailed } from "@/components/LoadFailed";
import { EssayArt } from "@/components/EssayArt";
import { TrackChip } from "@/components/TrackChip";
import { fetchJson } from "@/lib/fetch-json";

interface CanonEssay {
  slug: string;
  title: string;
  excerpt?: string;
  metaDescription?: string;
  pillar?: string | null;
  readTime?: string | null;
}

const isCanon = (x: unknown): x is CanonEssay[] =>
  Array.isArray(x) && x.every(e => !!e && typeof e === "object" && typeof (e as CanonEssay).slug === "string" && typeof (e as CanonEssay).title === "string");

export default function Canon() {
  const [essays, setEssays] = useState<CanonEssay[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let stale = false;
    fetchJson("/essays/canon.json", isCanon)
      .then(list => { if (!stale) setEssays(list); })
      .catch(() => { if (!stale) setFailed(true); });
    return () => { stale = true; };
  }, [nonce]);

  return (
    <Layout>
      <SEOMeta
        title="The Twelve"
        description="The twelve essays to read first on LiveWell, in order: a pastor who was an atheist, the gospel as news, the kingdom, the Bible read honestly, doubt, and the church after Christendom."
        url="https://www.livewellbyjamesbell.co/canon"
      />

      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>Start with these</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(36px, 5.4vw, 60px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "18px", maxWidth: "14ch" }}>
            Twelve essays. Read them in order.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.75, color: "color-mix(in srgb, var(--charcoal-fg) 80%, transparent)", maxWidth: "58ch" }}>
            There are hundreds of essays here. These twelve are the argument in the order it was built: who is writing and why he believes, what the gospel actually is, how to read the book, what to do with doubt, and what happens to the church now. An afternoon each. A month for all of them.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          {failed ? (
            <LoadFailed what="The twelve" onRetry={() => { setFailed(false); setEssays(null); setNonce(n => n + 1); }} backHref="/writing" backLabel="All the writing" />
          ) : essays === null ? (
            <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Loading…</p>
          ) : (
            <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "var(--s-4)" }}>
              {essays.map((e, i) => (
                <li key={e.slug}>
                  <Link href={`/writing/${e.slug}`} style={{ textDecoration: "none", color: "inherit", display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: "18px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--s-3)" }} className="canon-row">
                    <div style={{ display: "flex", gap: "18px", alignItems: "flex-start", flexWrap: "wrap" }}>
                      <div style={{ flex: "0 0 180px", maxWidth: "100%" }}>
                        <EssayArt seed={e.slug} track={e.pillar ?? undefined} decorative style={{ borderRadius: "var(--radius-sm)" }} />
                      </div>
                      <div style={{ flex: "1 1 260px", minWidth: 0 }}>
                        <div style={{ display: "flex", gap: "14px", alignItems: "center", marginBottom: "8px" }}>
                          <span style={{ fontFamily: "var(--F)", fontSize: "28px", lineHeight: 1, color: "var(--mustard-text)" }}>{String(i + 1).padStart(2, "0")}</span>
                          <TrackChip pillarOrTrack={e.pillar} slug={e.slug} asLink={false} />
                        </div>
                        <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 2.6vw, 28px)", fontWeight: 500, lineHeight: 1.2, letterSpacing: "-0.01em", color: "var(--ink)", marginBottom: "8px" }}>{e.title}</h2>
                        <p style={{ fontFamily: "var(--B)", fontSize: "15.5px", lineHeight: 1.65, color: "var(--ink-muted)", maxWidth: "60ch", marginBottom: "8px" }}>{e.metaDescription || e.excerpt}</p>
                        {e.readTime && <span style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--ink-muted)" }}>{e.readTime}</span>}
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ol>
          )}
          <div style={{ marginTop: "var(--s-5)", borderTop: "1px solid var(--border)", paddingTop: "var(--s-3)", display: "flex", gap: "var(--s-4)", flexWrap: "wrap" }}>
            <Link href="/writing" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)", backgroundImage: "none" }}>All the writing</Link>
            <Link href="/books" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)", backgroundImage: "none" }}>The books</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

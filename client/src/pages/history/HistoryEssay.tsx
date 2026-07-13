/**
 * Renders one Church History essay from
 * client/public/history/essays/<slug>.json at /theology/history/:slug.
 */
import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import Layout from "@/components/Layout";
import { Prose } from "@/lib/prose";
import { SEOMeta } from "@/components/SEOMeta";
import PageEndNav from "@/components/PageEndNav";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface Section { id: string; kicker?: string; title: string; body: string }
interface Essay {
  slug: string; title: string; subtitle: string; era: string; dateRange: string;
  sections: Section[]; keyFigures?: { name: string; note: string }[]; sources?: { title: string; author: string }[];
}

export default function HistoryEssay() {
  const [, params] = useRoute("/theology/history/:slug");
  const slug = params?.slug;
  // The fetch result is tagged with the slug it answered; data/missing are
  // derived per render, so navigating to a new slug resets the view without a
  // synchronous setState in the effect.
  const [result, setResult] = useState<{ slug: string; data: Essay | null } | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`/history/essays/${slug}.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setResult({ slug, data: d || null }))
      .catch(() => setResult({ slug, data: null }));
  }, [slug]);

  const data = result && result.slug === slug ? result.data : null;
  const missing = !!result && result.slug === slug && result.data === null;

  return (
    <Layout>
      {data && <SEOMeta title={`${data.title} — Church History`} description={data.subtitle} url={`https://www.livewellbyjamesbell.co/theology/history/${slug}`} />}

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/theology/history" style={{ color: "inherit" }}>Church History</Link>
            {data ? ` · ${data.era} · ${data.dateRange}` : ""}
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "22ch" }}>{data?.title ?? (missing ? "That essay is not here yet." : "Loading the essay…")}</h1>
          {missing && (
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "60ch" }}>
              It may have moved. Start from the{" "}
              <Link href="/theology/history" style={{ color: "var(--mustard)", textDecoration: "underline", textUnderlineOffset: "3px" }}>Church History library</Link>.
            </p>
          )}
          {data?.subtitle && <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "62ch" }}>{data.subtitle}</p>}
        </div>
      </section>

      {data?.sections.map((s, i) => (
        <section key={s.id} style={{ background: i % 2 ? "var(--bone-warm)" : "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
          <div style={wrap}>
            {s.kicker && <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>{s.kicker}</div>}
            <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.1, marginBottom: "var(--s-3)" }}>{s.title}</h2>
            <Prose text={s.body} />
          </div>
        </section>
      ))}

      {data && (data.keyFigures?.length || data.sources?.length) ? (
        <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4)", color: "var(--bone)" }}>
          <div style={{ ...wrap, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--s-5)" }}>
            {data.keyFigures?.length ? (
              <div>
                <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "10px" }}>Key figures</div>
                {data.keyFigures.map((f, i) => <p key={i} style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.55, color: "rgba(245,240,230,0.85)", marginBottom: "8px" }}><span style={{ fontFamily: "var(--F)", fontSize: "17px" }}>{f.name}.</span> {f.note}</p>)}
              </div>
            ) : null}
            {data.sources?.length ? (
              <div>
                <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "10px" }}>Sources</div>
                {data.sources.map((r, i) => <p key={i} style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.5, color: "rgba(245,240,230,0.8)", marginBottom: "8px" }}>{r.title}<span style={{ color: "rgba(245,240,230,0.5)" }}>, {r.author}</span></p>)}
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
        <div style={wrap}>
          <Link href="/theology/history" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>← All of Church History</Link>
        </div>
      </section>

      {data && <PageEndNav back={{ href: "/theology/history", label: "Church History" }} />}
    </Layout>
  );
}

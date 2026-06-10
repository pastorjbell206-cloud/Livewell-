/**
 * Renders a single Reading Scripture in Context guide from
 * client/public/context/guides/<slug>.json. Route /resources/context/:slug.
 * Same section model as the leadership articles, plus a Sources block
 * (scholarship the guide rests on) and related guides from the manifest.
 */
import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface Section { id: string; kicker?: string; title: string; body: string }
interface Guide {
  slug: string; title: string; subtitle: string; kicker: string; group: string;
  sections: Section[]; keyTexts?: string[]; sources?: { title: string; author: string }[];
}
interface IndexEntry { slug: string; title: string; blurb: string; group: string }

export default function ContextGuide() {
  const [, params] = useRoute("/resources/context/:slug");
  const slug = params?.slug;
  const [data, setData] = useState<Guide | null>(null);
  const [missing, setMissing] = useState(false);
  const [related, setRelated] = useState<IndexEntry[]>([]);

  useEffect(() => {
    if (!slug) return;
    setData(null);
    setMissing(false);
    setRelated([]);
    fetch(`/context/guides/${slug}.json`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => (d ? setData(d) : setMissing(true)))
      .catch(() => setMissing(true));
  }, [slug]);

  useEffect(() => {
    if (!data) return;
    fetch("/context/guides-index.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((idx: { guides: IndexEntry[] } | null) => {
        if (!idx) return;
        const others = idx.guides.filter((g) => g.slug !== slug);
        const sameGroup = others.filter((g) => g.group === data.group);
        const rest = others.filter((g) => g.group !== data.group);
        setRelated([...sameGroup, ...rest].slice(0, 4));
      })
      .catch(() => {});
  }, [data, slug]);

  return (
    <Layout>
      {data && <SEOMeta title={`${data.title} — Reading Scripture in Context`} description={data.subtitle} url={`https://www.livewellbyjamesbell.co/resources/context/${slug}`} />}

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/resources/context" style={{ color: "inherit" }}>Reading Scripture in Context</Link>
            {data?.kicker ? ` · ${data.kicker}` : ""}
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5.2vw, 56px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "22ch" }}>{data?.title ?? (missing ? "Not found" : "Loading…")}</h1>
          {data?.subtitle && <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "62ch" }}>{data.subtitle}</p>}
        </div>
      </section>

      {data?.sections.map((s, i) => (
        <section key={s.id} style={{ background: i % 2 ? "var(--bone-warm)" : "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
          <div style={wrap}>
            {s.kicker && <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>{s.kicker}</div>}
            <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.1, marginBottom: "var(--s-3)" }}>{s.title}</h2>
            {s.body.split("\n\n").map((p, j) => <p key={j} style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.78, color: "var(--ink)", maxWidth: "68ch", marginBottom: "16px" }}>{p}</p>)}
          </div>
        </section>
      ))}

      {data && (data.keyTexts?.length || data.sources?.length) ? (
        <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4)", color: "var(--bone)" }}>
          <div style={{ ...wrap, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--s-5)" }}>
            {data.keyTexts?.length ? (
              <div>
                <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "10px" }}>Key texts</div>
                {data.keyTexts.map((t, i) => <p key={i} style={{ fontFamily: "var(--F)", fontSize: "17px", lineHeight: 1.6, color: "rgba(245,240,230,0.9)", marginBottom: "8px" }}>{t}</p>)}
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

      {related.length > 0 && (
        <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" }}>
          <div style={wrap}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "var(--s-3)" }}>Keep reading</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--s-3)" }}>
              {related.map((g) => (
                <Link key={g.slug} href={`/resources/context/${g.slug}`} style={{ display: "block", background: "#FFFFFF", border: "1px solid rgba(20,17,12,0.08)", borderTop: "2px solid var(--mustard)", padding: "var(--s-3)", textDecoration: "none" }}>
                  <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: "8px" }}>{g.group}</div>
                  <div style={{ fontFamily: "var(--F)", fontSize: "19px", lineHeight: 1.25, color: "var(--ink)", marginBottom: "8px" }}>{g.title}</div>
                  <div style={{ fontFamily: "var(--B)", fontSize: "13.5px", lineHeight: 1.55, color: "var(--ink-muted)" }}>{g.blurb}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
        <div style={wrap}>
          <Link href="/resources/context" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>← All context guides</Link>
        </div>
      </section>
    </Layout>
  );
}

/**
 * Renders a single Leadership Formation article from
 * client/public/leadership/articles/<slug>.json. Route /leadership/article/:slug.
 * Same clean section model as the Nation essays: kicker, title, body paragraphs.
 */
import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import Layout from "@/components/Layout";
import PageEndNav from "@/components/PageEndNav";
import { Prose } from "@/lib/prose";
import { SEOMeta } from "@/components/SEOMeta";
import type { LeadershipArticle as Article } from "@/lib/leadership";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface IndexEntry { slug: string; title: string; blurb: string; group: string }

export default function LeadershipArticle() {
  const [, params] = useRoute("/leadership/article/:slug");
  const slug = params?.slug;
  const [data, setData] = useState<Article | null>(null);
  const [missing, setMissing] = useState(false);
  const [related, setRelated] = useState<IndexEntry[]>([]);

  useEffect(() => {
    if (!slug) return;
    setData(null);
    setMissing(false);
    setRelated([]);
    fetch(`/leadership/articles/${slug}.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => (d ? setData(d) : setMissing(true)))
      .catch(() => setMissing(true));
  }, [slug]);

  // Related reading: same group first, then the rest of the library, never self.
  useEffect(() => {
    if (!data) return;
    fetch("/leadership/articles-index.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((idx: { articles: IndexEntry[] } | null) => {
        if (!idx) return;
        const others = idx.articles.filter((a) => a.slug !== slug);
        const sameGroup = others.filter((a) => a.group === data.group);
        const rest = others.filter((a) => a.group !== data.group);
        setRelated([...sameGroup, ...rest].slice(0, 4));
      })
      .catch(() => {});
  }, [data, slug]);

  return (
    <Layout>
      {data && <SEOMeta title={`${data.title} — Leadership Formation`} description={data.subtitle} url={`https://www.livewellbyjamesbell.co/leadership/article/${slug}`} />}

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/leadership" style={{ color: "inherit" }}>Leadership Formation</Link>
            {data?.kicker ? ` · ${data.kicker}` : ""}
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5.2vw, 56px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "22ch" }}>{data?.title ?? (missing ? "That article is not here yet." : "Loading the article…")}</h1>
          {missing && (
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "60ch" }}>
              It may have moved. Start from the{" "}
              <Link href="/leadership/library" style={{ color: "var(--mustard)", textDecoration: "underline", textUnderlineOffset: "3px" }}>Leadership Library</Link>.
            </p>
          )}
          {data?.subtitle && <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "62ch" }}>{data.subtitle}</p>}
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

      {data && (data.keyTexts?.length || data.furtherReading?.length) ? (
        <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4)", color: "var(--bone)" }}>
          <div style={{ ...wrap, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--s-5)" }}>
            {data.keyTexts?.length ? (
              <div>
                <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "10px" }}>Key texts</div>
                {data.keyTexts.map((t, i) => <p key={i} style={{ fontFamily: "var(--F)", fontSize: "17px", lineHeight: 1.6, color: "rgba(245,240,230,0.9)", marginBottom: "8px" }}>{t}</p>)}
              </div>
            ) : null}
            {data.furtherReading?.length ? (
              <div>
                <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "10px" }}>Further reading</div>
                {data.furtherReading.map((r, i) => <p key={i} style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.5, color: "rgba(245,240,230,0.8)", marginBottom: "8px" }}>{r.title}<span style={{ color: "rgba(245,240,230,0.5)" }}>, {r.author}</span></p>)}
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
              {related.map((a) => (
                <Link key={a.slug} href={`/leadership/article/${a.slug}`} style={{ display: "block", background: "#FFFFFF", border: "1px solid rgba(20,17,12,0.08)", borderTop: "2px solid var(--mustard)", padding: "var(--s-3)", textDecoration: "none" }}>
                  <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--ink-muted)", marginBottom: "8px" }}>{a.group}</div>
                  <div style={{ fontFamily: "var(--F)", fontSize: "19px", lineHeight: 1.25, color: "var(--ink)", marginBottom: "8px" }}>{a.title}</div>
                  <div style={{ fontFamily: "var(--B)", fontSize: "13.5px", lineHeight: 1.55, color: "var(--ink-muted)" }}>{a.blurb}</div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
        <div style={wrap}>
          <Link href="/leadership" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>← All of Leadership Formation</Link>
          <span style={{ margin: "0 12px", color: "var(--ink-muted)" }}>·</span>
          <Link href="/leadership/library" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Search the Leadership Library</Link>
        </div>
      </section>

      {data && <PageEndNav back={{ href: "/leadership", label: "The Leadership Hub" }} />}
    </Layout>
  );
}

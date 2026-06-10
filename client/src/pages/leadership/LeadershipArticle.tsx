/**
 * Renders a single Leadership Formation article from
 * client/public/leadership/articles/<slug>.json. Route /leadership/article/:slug.
 * Same clean section model as the Nation essays: kicker, title, body paragraphs.
 */
import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import type { LeadershipArticle as Article } from "@/lib/leadership";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

export default function LeadershipArticle() {
  const [, params] = useRoute("/leadership/article/:slug");
  const slug = params?.slug;
  const [data, setData] = useState<Article | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    if (!slug) return;
    setData(null);
    setMissing(false);
    fetch(`/leadership/articles/${slug}.json`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => (d ? setData(d) : setMissing(true)))
      .catch(() => setMissing(true));
  }, [slug]);

  return (
    <Layout>
      {data && <SEOMeta title={`${data.title} — Leadership Formation`} description={data.subtitle} url={`https://www.livewellbyjamesbell.co/leadership/article/${slug}`} />}

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/leadership" style={{ color: "inherit" }}>Leadership Formation</Link>
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

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
        <div style={wrap}>
          <Link href="/leadership" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>← All of Leadership Formation</Link>
        </div>
      </section>
    </Layout>
  );
}

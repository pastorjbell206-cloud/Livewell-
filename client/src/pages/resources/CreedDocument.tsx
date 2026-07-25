/**
 * Renders one creed/confession from client/public/creeds/documents/<slug>.json
 * at /resources/creeds/:slug: the Bell-voice introduction, the full
 * public-domain text in serif, then plain-language notes on the loaded phrases.
 */
import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import Layout from "@/components/Layout";
import { Prose } from "@/lib/prose";
import { SEOMeta } from "@/components/SEOMeta";
import PageEndNav from "@/components/PageEndNav";

const wrap = { maxWidth: "var(--w-prose)", margin: "0 auto" } as const;

interface Annotation { phrase: string; note: string }
interface Doc {
  slug: string; title: string; subtitle: string; group: string; date: string;
  intro: string; text: string; annotations?: Annotation[];
}

export default function CreedDocument() {
  const [, params] = useRoute("/resources/creeds/:slug");
  const slug = params?.slug;
  // Result tagged with the slug it answered; data/missing derived per render,
  // so a new slug resets the view without a synchronous setState in the effect.
  const [result, setResult] = useState<{ slug: string; data: Doc | null } | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`/creeds/documents/${slug}.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setResult({ slug, data: d || null }))
      .catch(() => setResult({ slug, data: null }));
  }, [slug]);

  const data = result && result.slug === slug ? result.data : null;
  const missing = !!result && result.slug === slug && result.data === null;

  return (
    <Layout>
      {data && <SEOMeta title={`${data.title} — Full Text with Notes`} description={data.subtitle} url={`https://www.livewellbyjamesbell.co/resources/creeds/${slug}`} />}

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/resources/creeds" style={{ color: "inherit" }}>Creeds, Confessions, and Classics</Link>
            {data?.date ? ` · ${data.date}` : ""}
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 5vw, 50px)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", marginBottom: "14px" }}>{data?.title ?? (missing ? "Not found" : "Loading…")}</h1>
          {data?.subtitle && <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)" }}>{data.subtitle}</p>}
        </div>
      </section>

      {data && (
        <>
          <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
            <div style={wrap}>
              <Prose text={data.intro} />
            </div>
          </section>

          <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" }}>
            <div style={wrap}>
              <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "var(--s-3)" }}>The text</div>
              {data.text.split("\n\n").map((p, i) => (
                <p key={i} style={{ fontFamily: "var(--F)", fontSize: "19px", lineHeight: 1.7, color: "var(--ink)", maxWidth: "62ch", marginBottom: "18px" }}>{p}</p>
              ))}
            </div>
          </section>

          {data.annotations && data.annotations.length > 0 && (
            <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
              <div style={wrap}>
                <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "var(--s-3)" }}>Notes on the language</div>
                {data.annotations.map((a, i) => (
                  <div key={i} style={{ borderLeft: "2px solid var(--mustard)", paddingLeft: "16px", marginBottom: "var(--s-3)" }}>
                    <div style={{ fontFamily: "var(--F)", fontSize: "18px", fontStyle: "italic", color: "var(--ink)", marginBottom: "6px" }}>{a.phrase}</div>
                    <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", margin: 0 }}>{a.note}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section style={{ background: "var(--charcoal)", padding: "var(--s-4)", color: "var(--charcoal-fg)" }}>
            <div style={{ ...wrap, display: "flex", gap: "var(--s-4)", flexWrap: "wrap" }}>
              <Link href="/resources/creeds" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)" }}>← All documents</Link>
              <Link href="/theology/creeds" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)" }}>The confessions surveyed</Link>
            </div>
          </section>

          <PageEndNav back={{ href: "/resources/creeds", label: "Creeds & Confessions" }} />
        </>
      )}
    </Layout>
  );
}

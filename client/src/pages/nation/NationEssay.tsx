/**
 * Long-form essay renderer for the Christ and the Nation sub-hub. Loads
 * /nation/<slug>.json ({ title, subtitle, sections, furtherReading }) and
 * renders it as a serious, readable essay. Used for the Christian-nation
 * question, the Old Testament theocracy, and the danger of empire.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Prose } from "@/lib/prose";
import { SEOMeta, getArticleSchema, getBreadcrumbSchema } from "@/components/SEOMeta";
import ArticleProgress from "@/components/ArticleProgress";
import { AudienceShare } from "@/components/AudienceShare";
import { useEssayCompletion } from "@/lib/useEssayCompletion";

interface Section { id: string; kicker: string; title: string; body: string; }
interface Reading { title: string; author: string; }
interface NextRead { label: string; href: string; blurb: string; }
interface Essay { title: string; subtitle: string; sections: Section[]; furtherReading: Reading[]; datePublished?: string; readNext?: NextRead[]; }

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const card = { background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)", textDecoration: "none", color: "inherit", display: "block", borderTop: "3px solid var(--mustard)" } as const;
const SITE = "https://www.livewellbyjamesbell.co";

// When an essay does not curate its own "read next," every Christ-and-the-Nation
// essay still carries the reader onward: to the flagship (the whole diagnosis)
// and the guided pathway. Self-links are filtered at render.
const DEFAULT_READNEXT: NextRead[] = [
  { label: "The State of the American Church", href: "/nation/state-of-the-american-church", blurb: "The flagship. The whole diagnosis: two captivities, right and left, and the older faith underneath both." },
  { label: "Faith and the Flag", href: "/pathways/christian-nationalism", blurb: "The guided path through the whole topic. Essays, a study, and the free book, in order." },
];

export default function NationEssay({ slug }: { slug: string }) {
  const [e, setE] = useState<Essay | null>(null);
  useEffect(() => {
    fetch(`/nation/${slug}.json`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setE(d))
      .catch(() => {});
  }, [slug]);

  // Structured data so answer engines can place and cite the essay: a
  // BreadcrumbList (Home › Christ and the Nation › Title) on every essay, plus
  // an Article schema wherever the essay carries an honest publish date.
  const url = `${SITE}/nation/${slug}`;
  const structuredData = e
    ? [
        getBreadcrumbSchema([
          { name: "Home", url: `${SITE}/` },
          { name: "Christ and the Nation", url: `${SITE}/nation` },
          { name: e.title, url },
        ]),
        ...(e.datePublished
          ? [getArticleSchema(e.title, e.subtitle, e.datePublished, e.datePublished, undefined, url, undefined, undefined, "Christ and the Nation")]
          : []),
      ]
    : undefined;

  // Every essay carries the reader onward: its own curated next reads when it
  // has them, otherwise the section default. An essay never links to itself.
  const readNext = e
    ? (e.readNext ?? DEFAULT_READNEXT).filter((r) => r.href !== `/nation/${slug}`)
    : [];

  // Reading aids, shared with the /writing essays: a read-time estimate for the
  // progress bar, and the foot-sentinel ref that records a true completion.
  const words = e ? e.sections.reduce((n, s) => n + s.body.trim().split(/\s+/).filter(Boolean).length, 0) : 0;
  const readTime = `${Math.max(1, Math.round(words / 200))} min read`;
  const bodyEndRef = useEssayCompletion(slug, `/nation/${slug}`, !!e);

  return (
    <Layout>
      <SEOMeta title={`${e?.title ?? "Christ and the Nation"} — LiveWell by James Bell`} description={e?.subtitle ?? ""} url={url} structuredData={structuredData} />
      {e && <ArticleProgress readTime={readTime} />}

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/nation" style={{ color: "inherit" }}>Christ and the Nation</Link>
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.5vw, 58px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "22ch" }}>{e?.title ?? "Loading…"}</h1>
          {e?.subtitle && <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "62ch" }}>{e.subtitle}</p>}
        </div>
      </section>

      {e?.sections.map((s, i) => (
        <section key={s.id} style={{ background: i % 2 ? "var(--bone-warm)" : "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
          <div style={wrap}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>{s.kicker}</div>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.1, marginBottom: "var(--s-3)" }}>{s.title}</h2>
            <Prose text={s.body} />
          </div>
        </section>
      ))}

      {e && (
        <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)", borderTop: "1px solid var(--border)" }}>
          <div style={{ ...wrap, textAlign: "center" }}>
            <div ref={bodyEndRef} aria-hidden="true" style={{ height: 1 }} />
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "12px" }}>Send this to someone who needs it</div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <AudienceShare title={e.title} url={url} />
            </div>
          </div>
        </section>
      )}

      {readNext.length > 0 && (
        <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
          <div style={wrap}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "var(--s-3)" }}>Keep reading</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(280px, 100%), 1fr))", gap: "16px" }}>
              {readNext.map((r) => (
                <Link key={r.href} href={r.href} style={card}>
                  <div style={{ fontFamily: "var(--F)", fontSize: "19px", fontWeight: 500, color: "var(--ink)", marginBottom: "6px", lineHeight: 1.2 }}>{r.label}</div>
                  <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{r.blurb}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {e && e.furtherReading?.length > 0 && (
        <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4)", color: "var(--bone)" }}>
          <div style={wrap}>
            <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "var(--s-3)" }}>Further reading</div>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "var(--s-4)" }}>
              {e.furtherReading.map((b, i) => (
                <div key={i}>
                  <span style={{ fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, color: "var(--bone)", fontStyle: "italic" }}>{b.title}</span>
                  <span style={{ fontFamily: "var(--B)", fontSize: "14px", color: "rgba(245,240,230,0.7)" }}>{`  ·  ${b.author}`}</span>
                </div>
              ))}
            </div>
            <Link href="/nation" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard)" }}>Back to Christ and the Nation →</Link>
          </div>
        </section>
      )}
    </Layout>
  );
}

/**
 * Leadership Formation training guides (/leadership/guides and
 * /leadership/guides/:slug). The Servant Leadership Bible Study, the Elder
 * Training Manual, the Deacon Training Manual, and How to Develop Leaders —
 * each a full multi-session guide rendered session by session. Data:
 * /leadership/formation-guides.json.
 */
import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { Streamdown } from "streamdown";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SITE_URL } from "@/lib/site";

const wrap = { maxWidth: "var(--w-content)", margin: "0 auto" } as const;
const prose = { maxWidth: "var(--w-prose)", margin: "0 auto" } as const;
const eyebrow: React.CSSProperties = {
  fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase",
  letterSpacing: "0.18em", color: "var(--mustard-text)",
};

interface Verse { ref: string; text: string }
interface Session { title: string; headline: string; scripture: string; bigIdea: string; teaching?: string; discussion: string[]; practice: string; prayer: string; memoryVerse: Verse }
interface Guide { slug: string; title: string; subtitle: string; audience: string; intro: string; process?: string[]; partial?: boolean; pdf?: string; sessions: Session[] }

export default function FormationGuides() {
  const [guides, setGuides] = useState<Guide[] | null>(null);
  const [, params] = useRoute("/leadership/guides/:slug");
  const slug = params?.slug;

  useEffect(() => {
    fetch("/leadership/formation-guides.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setGuides(d.guides))
      .catch(() => {});
  }, []);

  if (!guides) {
    return (
      <Layout>
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)", minHeight: "50vh" }}>
          <div style={wrap}><p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Loading the guides…</p></div>
        </section>
      </Layout>
    );
  }

  // ── One guide, rendered in full ──
  if (slug) {
    const g = guides.find((x) => x.slug === slug);
    if (!g) {
      return (
        <Layout>
          <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)", minHeight: "50vh" }}>
            <div style={prose}><p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>That guide wasn’t found. <Link href="/leadership/guides" style={{ color: "var(--mustard-text)" }}>Back to the guides</Link>.</p></div>
          </section>
        </Layout>
      );
    }
    return (
      <Layout>
        <SEOMeta
          title={`${g.title} — Free, Session by Session`}
          description={g.intro}
          url={`${SITE_URL}/leadership/guides/${g.slug}`}
          structuredData={{ "@context": "https://schema.org", "@type": "Course", name: g.title, description: g.intro, provider: { "@type": "Organization", name: "LiveWell by James Bell" } }}
        />
        <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-7) var(--s-4) var(--s-6)" }}>
          <div style={prose}>
            <Link href="/leadership/guides" style={{ ...eyebrow, color: "var(--mustard)", textDecoration: "none" }}>← Leadership Formation · Training guides</Link>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 4.6vw, 52px)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.02em", margin: "16px 0 10px" }}>{g.title}</h1>
            <p style={{ fontFamily: "var(--F)", fontSize: "21px", fontStyle: "italic", color: "rgba(245,240,230,.82)", margin: "0 0 8px" }}>{g.subtitle}</p>
            <p style={{ fontFamily: "var(--U)", fontSize: "13px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(245,240,230,.6)", margin: "0 0 22px" }}>{g.sessions.length} sessions · {g.audience}</p>
            <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "rgba(245,240,230,.82)", maxWidth: "62ch" }}>{g.intro}</p>
            {g.pdf && (
              <a href={g.pdf} download style={{ display: "inline-block", marginTop: "24px", background: "var(--mustard)", color: "var(--charcoal)", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 700, padding: "13px 24px", borderRadius: "var(--radius-sm)", textDecoration: "none" }}>
                Download the full manual (PDF) ↓
              </a>
            )}
          </div>
        </section>

        {g.process && (
          <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
            <div style={prose}>
              <div style={eyebrow}>The process</div>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "28px", fontWeight: 400, color: "var(--ink)", margin: "10px 0 20px" }}>Four stages, character before ordination</h2>
              <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {g.process.map((p, i) => (
                  <li key={i} style={{ display: "flex", gap: "16px", padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                    <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 700, color: "var(--mustard-text)", flex: "0 0 28px", paddingTop: "2px" }}>{i + 1}</span>
                    <span style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.6, color: "var(--ink)" }}>{p}</span>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-7)" }}>
          <div style={prose}>
            {g.sessions.map((s, i) => (
              <article key={i} style={{ marginBottom: "var(--s-6)", paddingBottom: "var(--s-5)", borderBottom: i < g.sessions.length - 1 ? "1px solid var(--border)" : "none" }}>
                <div style={eyebrow}>Session {i + 1} · {s.scripture}</div>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.4vw, 34px)", fontWeight: 400, color: "var(--ink)", margin: "8px 0 4px", lineHeight: 1.15 }}>{s.title}</h2>
                <p style={{ fontFamily: "var(--F)", fontSize: "19px", fontStyle: "italic", color: "var(--ink-muted)", margin: "0 0 18px" }}>{s.headline}</p>

                {s.teaching && (
                  <div className="article-body prose-section" style={{ marginBottom: "26px" }}>
                    <Streamdown>{s.teaching}</Streamdown>
                  </div>
                )}

                <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--mustard-text)", marginBottom: "4px" }}>The big idea</div>
                <p style={{ fontFamily: "var(--F)", fontSize: "22px", lineHeight: 1.4, color: "var(--ink)", margin: "0 0 22px" }}>{s.bigIdea}</p>

                <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--mustard-text)", marginBottom: "8px" }}>For discussion</div>
                <ol style={{ margin: "0 0 22px", paddingLeft: "20px" }}>
                  {s.discussion.map((q, j) => (
                    <li key={j} style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "8px" }}>{q}</li>
                  ))}
                </ol>

                <div style={{ background: "var(--bone-warm)", borderLeft: "3px solid var(--mustard)", padding: "16px 20px", marginBottom: "16px" }}>
                  <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--mustard-text)", marginBottom: "6px" }}>This week, try this</div>
                  <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.65, color: "var(--ink)", margin: 0 }}>{s.practice}</p>
                </div>

                <p style={{ fontFamily: "var(--B)", fontSize: "15.5px", lineHeight: 1.7, color: "var(--ink)", margin: "0 0 12px" }}><strong style={{ color: "var(--mustard-text)" }}>Closing prayer. </strong>{s.prayer}</p>
                <p style={{ fontFamily: "var(--F)", fontSize: "17px", fontStyle: "italic", color: "var(--mustard-text)", margin: 0 }}>“{s.memoryVerse.text}” — {s.memoryVerse.ref}</p>
              </article>
            ))}
            {g.partial && (
              <p style={{ fontFamily: "var(--B)", fontSize: "14px", color: "var(--ink-muted)", fontStyle: "italic" }}>More sessions in this guide are being written.</p>
            )}
          </div>
        </section>
      </Layout>
    );
  }

  // ── Index of all guides ──
  return (
    <Layout>
      <SEOMeta
        title="Free Leadership Training Guides — Servant Leadership, Elders, Deacons"
        description="Free, session-by-session training guides for the church: a Servant Leadership Bible study, an Elder Training Manual, a Deacon Training Manual, and how to develop leaders. Scripture, discussion, practice, and prayer for each session."
        url={`${SITE_URL}/leadership/guides`}
      />
      <section style={{ background: "var(--charcoal)", color: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
        <div style={wrap}>
          <div style={{ ...eyebrow, color: "var(--mustard)" }}>
            <Link href="/leadership" style={{ color: "inherit", textDecoration: "none" }}>Leadership Formation</Link> · Training guides
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "16px 0 16px", maxWidth: "18ch" }}>
            Train the men who lead the church
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "62ch" }}>
            Free, session-by-session guides — character before competence, every session anchored in a text and a practice. Run them with an elder team, a cohort, or one man across a coffee table.
          </p>
        </div>
      </section>
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-7)" }}>
        <div style={wrap}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--s-4)" }}>
            {guides.map((g) => (
              <Link key={g.slug} href={`/leadership/guides/${g.slug}`} style={{ display: "block", background: "#FFFFFF", border: "1px solid var(--border)", borderTop: "2px solid var(--mustard)", padding: "var(--s-4)", textDecoration: "none" }}>
                <div style={{ ...eyebrow, marginBottom: "10px" }}>{g.sessions.length} sessions{g.partial ? "+" : ""}</div>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "24px", fontWeight: 500, color: "var(--ink)", margin: "0 0 4px", lineHeight: 1.2 }}>{g.title}</h2>
                <p style={{ fontFamily: "var(--F)", fontSize: "16px", fontStyle: "italic", color: "var(--ink-muted)", margin: "0 0 10px" }}>{g.subtitle}</p>
                <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", margin: 0 }}>{g.intro.slice(0, 150)}…</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

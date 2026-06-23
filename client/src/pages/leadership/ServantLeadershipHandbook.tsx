/**
 * The Servant Leadership Handbook (/leadership/handbook). A twelve-chapter book
 * on servant and organizational leadership for the church — read in full, with
 * a table of contents, each chapter's verdict, and reflection questions. Data:
 * /leadership/servant-leadership-handbook.json.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { Streamdown } from "streamdown";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SITE_URL } from "@/lib/site";

const prose = { maxWidth: "var(--w-prose)", margin: "0 auto" } as const;
const eyebrow: React.CSSProperties = {
  fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase",
  letterSpacing: "0.18em", color: "var(--mustard-text)",
};

interface Chapter { n: number; slug: string; title: string; summary: string; verdict: string; body: string; reflect: string[] }

export default function ServantLeadershipHandbook() {
  const [chapters, setChapters] = useState<Chapter[] | null>(null);

  useEffect(() => {
    fetch("/leadership/servant-leadership-handbook.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setChapters(d.chapters))
      .catch(() => {});
  }, []);

  return (
    <Layout>
      <SEOMeta
        title="The Servant Leadership Handbook — A Free Book on Leading the Church"
        description="A free twelve-chapter handbook on servant and organizational leadership in the church — from the towel and the throne to raising your replacement. Scripture-anchored, written for the men who carry the weight."
        url={`${SITE_URL}/leadership/handbook`}
        structuredData={{ "@context": "https://schema.org", "@type": "Book", name: "The Servant Leadership Handbook", author: { "@type": "Person", name: "James Bell" }, url: `${SITE_URL}/leadership/handbook`, bookFormat: "https://schema.org/EBook", inLanguage: "en" }}
      />

      {/* HERO */}
      <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-7) var(--s-4) var(--s-6)" }}>
        <div style={prose}>
          <div style={{ ...eyebrow, color: "var(--mustard)" }}>
            <Link href="/leadership/servant-leadership" style={{ color: "inherit", textDecoration: "none" }}>Servant Leadership</Link> · The Handbook
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "16px 0 14px", maxWidth: "16ch" }}>
            The Servant Leadership Handbook
          </h1>
          <p style={{ fontFamily: "var(--F)", fontSize: "21px", fontStyle: "italic", color: "rgba(245,240,230,.82)", margin: "0 0 18px" }}>
            A book on leading the church — from the towel and the throne to raising your replacement.
          </p>
          <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.75, color: "rgba(245,240,230,.82)", maxWidth: "60ch" }}>
            Twelve chapters on what authority is for, who you put in the room, how decisions get made, leading change without casualties, and handing it on. Free, and written to be used — read it through, or run it with your leaders a chapter at a time.
          </p>
        </div>
      </section>

      {!chapters ? (
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)", minHeight: "40vh" }}>
          <div style={prose}><p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Loading the handbook…</p></div>
        </section>
      ) : (
        <>
          {/* CONTENTS */}
          <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
            <div style={prose}>
              <div style={eyebrow}>Contents</div>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "28px", fontWeight: 400, color: "var(--ink)", margin: "10px 0 20px" }}>Twelve chapters</h2>
              <ol style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {chapters.map((c) => (
                  <li key={c.n} style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                    <a href={`#ch-${c.n}`} style={{ display: "flex", gap: "16px", textDecoration: "none", color: "inherit" }}>
                      <span style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 700, color: "var(--mustard-text)", flex: "0 0 28px", paddingTop: "4px" }}>{String(c.n).padStart(2, "0")}</span>
                      <span>
                        <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "20px", color: "var(--ink)", lineHeight: 1.2 }}>{c.title}</span>
                        <span style={{ display: "block", fontFamily: "var(--B)", fontSize: "14px", color: "var(--ink-muted)", marginTop: "2px" }}>{c.summary}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* CHAPTERS */}
          <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-7)" }}>
            <div style={prose}>
              {chapters.map((c) => (
                <article key={c.n} id={`ch-${c.n}`} style={{ marginBottom: "var(--s-7)", paddingBottom: "var(--s-6)", borderBottom: "1px solid var(--border)", scrollMarginTop: "80px" }}>
                  <div style={eyebrow}>Chapter {c.n}</div>
                  <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", margin: "8px 0 var(--s-4)", lineHeight: 1.1 }}>{c.title}</h2>
                  <div className="article-body prose-section">
                    <Streamdown>{c.body}</Streamdown>
                  </div>
                  <p style={{ fontFamily: "var(--F)", fontSize: "22px", fontStyle: "italic", color: "var(--mustard-text)", margin: "var(--s-4) 0 var(--s-4)", paddingLeft: "20px", borderLeft: "3px solid var(--mustard)" }}>{c.verdict}</p>
                  {c.reflect?.length > 0 && (
                    <div style={{ background: "var(--bone-warm)", padding: "18px 22px", borderRadius: "var(--radius-sm)" }}>
                      <div style={{ ...eyebrow, marginBottom: "10px" }}>Reflect</div>
                      <ol style={{ margin: 0, paddingLeft: "20px" }}>
                        {c.reflect.map((q, i) => (
                          <li key={i} style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "6px" }}>{q}</li>
                        ))}
                      </ol>
                    </div>
                  )}
                </article>
              ))}
              <div style={{ textAlign: "center" }}>
                <Link href="/leadership/guides" style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--mustard-text)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "3px" }}>
                  Now run it with your leaders → the training guides
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </Layout>
  );
}

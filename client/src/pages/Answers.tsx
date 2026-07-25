/**
 * Answers (/answers) — the search-shaped front door for hard questions.
 * Each H2 is the reader's actual query; each answer is three tight paragraphs
 * distilled from the essay that carries the full argument, laddering
 * short answer → the essay → the book. The depth ladder in one page: nobody is
 * forced through 2,500 words to get help, and nobody who wants the 2,500 words
 * is denied them. Data lives in client/src/data/answers.ts; FAQPage JSON-LD is
 * built from the same array so search and the page can never disagree.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { ANSWERS } from "@/data/answers";
import { Link } from "wouter";

const wrap = { maxWidth: "var(--w-content)", margin: "0 auto" } as const;

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: ANSWERS.map(a => ({
    "@type": "Question",
    name: a.question,
    acceptedAnswer: { "@type": "Answer", text: a.paragraphs.join(" ") },
  })),
};

export default function Answers() {
  return (
    <Layout>
      <SEOMeta
        title="Honest Answers to Hard Questions About Christianity"
        description="Did the resurrection happen? Why trust the Bible? If God is good, why suffering? Straight answers from a pastor who was an atheist first — each with the full essay behind it."
        url="https://www.livewellbyjamesbell.co/answers"
        structuredData={faqSchema}
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-7) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>Answers</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(36px, 6vw, 60px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "20px", maxWidth: "22ch" }}>
            The questions people actually ask.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.75)", maxWidth: "60ch" }}>
            Straight answers first — two minutes each. Behind every one stands the
            full essay, and behind the essay, the book. Go as deep as you want.
            Written by a pastor who was an atheist far longer than he has been
            this, so the questions get taken seriously, not managed.
          </p>
        </div>
      </section>

      {/* QUESTION INDEX */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-4) var(--s-4)", borderBottom: "1px solid var(--border)" }}>
        <div style={wrap}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {ANSWERS.map(a => (
              <a
                key={a.slug}
                href={`#${a.slug}`}
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "13px",
                  fontWeight: 500,
                  color: "var(--ink)",
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                  borderRadius: "999px",
                  padding: "8px 16px",
                  textDecoration: "none",
                }}
              >
                {a.question}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* THE ANSWERS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          {ANSWERS.map((a, i) => (
            <article key={a.slug} id={a.slug} style={{ paddingTop: i === 0 ? 0 : "var(--s-5)", marginTop: i === 0 ? 0 : "var(--s-5)", borderTop: i === 0 ? "none" : "1px solid var(--border)", scrollMarginTop: "84px" }}>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 3.6vw, 36px)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.15, color: "var(--ink)", marginBottom: "18px" }}>
                {a.question}
              </h2>
              {a.paragraphs.map((p, j) => (
                <p key={j} style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "14px", opacity: j === 0 ? 1 : 0.92 }}>
                  {p}
                </p>
              ))}
              {/* The depth ladder */}
              <div style={{ background: "var(--card)", border: "1px solid var(--line)", borderLeft: "2px solid var(--mustard)", padding: "16px 20px", marginTop: "18px", display: "flex", flexDirection: "column", gap: "6px" }}>
                <Link href={`/writing/${a.essaySlug}`} style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--ink)", textDecoration: "none" }}>
                  The full essay: {a.essayTitle} →
                </Link>
                <Link href={a.bookHref} style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 500, color: "var(--ink-muted)", textDecoration: "none" }}>
                  The book behind it: {a.bookTitle}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CLOSING */}
      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 2.8vw, 28px)", fontStyle: "italic", lineHeight: 1.4, color: "rgba(245,240,230,0.92)", marginBottom: "18px" }}>
            Your question is not on this page? It has probably been asked before,
            and taken seriously.
          </p>
          <Link href="/faq" style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>
            Browse every question →
          </Link>
        </div>
      </section>
    </Layout>
  );
}

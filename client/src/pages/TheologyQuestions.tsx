/**
 * Hard Questions hub (/theology/questions). The questions a new believer or an
 * honest skeptic actually arrives with, answered warmly and fairly, each routed
 * into the doctrine and the passages behind it. Grouped by category, each
 * question expands, and carries an id anchor so other pages can link straight
 * to it. Data: /theology/questions.json.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta, getFAQPageSchema } from "@/components/SEOMeta";
import { Prose } from "@/lib/prose";
import { DOCTRINE_INDEX } from "@/lib/theology";
import { StatementBand } from "@/components/EditorialBlocks";

interface Q {
  id: string; question: string; category: string; shortAnswer: string; answer: string;
  whereChristiansDiffer: string; doctrine: string; doctrineTitle: string; passages: string[];
}

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

export default function TheologyQuestions() {
  const [questions, setQuestions] = useState<Q[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    fetch("/theology/questions.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.questions && setQuestions(d.questions))
      .catch(() => {});
  }, []);

  // Open and scroll to a question if the URL carries its id as a hash.
  useEffect(() => {
    if (questions.length === 0) return;
    const hash = window.location.hash.replace("#", "");
    if (hash && questions.some((q) => q.id === hash)) {
      setOpen(hash);
      setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  }, [questions]);

  const groups = useMemo(() => {
    const order: string[] = [];
    const map = new Map<string, Q[]>();
    for (const q of questions) { if (!map.has(q.category)) { map.set(q.category, []); order.push(q.category); } map.get(q.category)!.push(q); }
    return order.map((c) => ({ category: c, items: map.get(c)! }));
  }, [questions]);

  const docReady = (slug: string) => DOCTRINE_INDEX.some((d) => d.slug === slug && d.ready);

  // FAQPage JSON-LD for answer engines — built from the loaded questions, so it
  // carries the full set once fetched (and simply omits until then).
  const faqSchema = useMemo(
    () =>
      questions.length > 0
        ? [
            getFAQPageSchema(
              questions.map((q) => ({
                question: q.question,
                answer: q.shortAnswer || q.answer,
              }))
            ),
          ]
        : undefined,
    [questions]
  );

  return (
    <Layout>
      <SEOMeta
        title="Hard Questions — Honest Answers to What You Actually Ask"
        description="Can I lose my salvation? Why does God allow suffering? Is the Bible reliable? The questions people really arrive with, answered warmly and fairly."
        url="https://www.livewellbyjamesbell.co/theology/questions"
        structuredData={faqSchema}
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/theology" style={{ color: "inherit" }}>Theological Depth</Link> · Hard questions
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>
            The questions you actually came with.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "62ch" }}>
            Nobody starts by searching for a doctrine. They start with a question that keeps them up at night. Here are the real ones, answered plainly and without flinching, each one opening a door to the fuller study behind it. The plain-language versions live at{" "}
            <Link href="/faq" style={{ color: "var(--bone)", borderBottom: "1px solid var(--mustard)", textDecoration: "none" }}>questions people ask</Link>.
          </p>
        </div>
      </section>

      <StatementBand tone="light" eyebrow="Before you begin" width="32ch">
        A question held honestly has never been the enemy of faith.
      </StatementBand>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
        <div style={wrap}>
          {questions.length === 0 && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Loading…</p>}
          {groups.map(({ category, items }) => (
            <div key={category} style={{ marginBottom: "var(--s-5)" }}>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(20px, 2.8vw, 26px)", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s-3)", paddingBottom: "6px", borderBottom: "2px solid var(--mustard)" }}>{category}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {items.map((q) => {
                  const isOpen = open === q.id;
                  return (
                    <div key={q.id} id={q.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden", scrollMarginTop: "90px" }}>
                      <button type="button" onClick={() => setOpen(isOpen ? null : q.id)} aria-expanded={isOpen}
                        style={{ width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", padding: "16px var(--s-4)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                        <span>
                          <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)", lineHeight: 1.3 }}>{q.question}</span>
                          {!isOpen && <span style={{ display: "block", fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.55, color: "var(--ink-muted)", marginTop: "6px" }}>{q.shortAnswer}</span>}
                        </span>
                        <ChevronDown size={18} aria-hidden style={{ flexShrink: 0, color: "var(--ink-muted)", marginTop: "4px", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
                      </button>
                      {isOpen && (
                        <div style={{ padding: "0 var(--s-4) var(--s-4)", borderTop: "1px solid var(--border)" }}>
                          <p style={{ fontFamily: "var(--F)", fontSize: "18px", lineHeight: 1.5, color: "var(--ink)", margin: "16px 0" }}>{q.shortAnswer}</p>
                          <Prose text={q.answer} />
                          {q.whereChristiansDiffer && (
                            <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", background: "var(--bone-warm)", borderRadius: "var(--radius-sm)", padding: "12px 14px", marginTop: "8px" }}>
                              <strong style={{ color: "var(--mustard-text)" }}>Where Christians differ. </strong>{q.whereChristiansDiffer}
                            </p>
                          )}
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", marginTop: "16px", paddingTop: "12px", borderTop: "1px solid var(--border)" }}>
                            {q.doctrine && docReady(q.doctrine) && (
                              <Link href={`/theology/doctrine/${q.doctrine}`} style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--charcoal)", background: "var(--mustard)", padding: "8px 14px", borderRadius: "999px" }}>
                                Go deeper: {q.doctrineTitle} →
                              </Link>
                            )}
                            {q.passages?.map((ref) => (
                              <Link key={ref} href={`/theology/passage?ref=${encodeURIComponent(ref)}`} style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)", border: "1px solid var(--mustard)", padding: "8px 12px", borderRadius: "999px" }}>
                                {ref}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

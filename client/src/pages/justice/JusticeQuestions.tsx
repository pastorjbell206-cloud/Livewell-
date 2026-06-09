/**
 * Justice hard questions (/justice/questions). The questions a skeptical reader
 * arrives with about justice and the gospel ('Is the gospel political?', 'Is
 * Christianity left or right?', 'Isn't social justice just Marxism?'), answered
 * fairly from both directions and routed into the topics. Data:
 * /justice/questions.json.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { TOPIC_INDEX } from "@/lib/justice";

interface Q {
  id: string; question: string; category: string; shortAnswer: string; answer: string;
  whereChristiansDiffer: string; topic: string; passages: string[];
}

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

export default function JusticeQuestions() {
  const [questions, setQuestions] = useState<Q[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    fetch("/justice/questions.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.questions && setQuestions(d.questions))
      .catch(() => {});
  }, []);

  const topicReady = (slug: string) => TOPIC_INDEX.find((t) => t.slug === slug && t.ready);

  return (
    <Layout>
      <SEOMeta
        title="Hard Questions About Justice and the Gospel"
        description="Is the gospel political? Is Christianity left or right? What even is social justice? Honest answers that take the suspicion seriously from every direction."
        url="https://www.livewellbyjamesbell.co/justice/questions"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/justice" style={{ color: "inherit" }}>Prophetic Justice</Link> · Hard questions
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>
            The suspicions, taken seriously.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "62ch" }}>
            Some hear 'justice' and brace for a political ambush. Others hear it and brace for a sermon that dodges the real thing. Both worries deserve an honest answer. Here they are.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
        <div style={{ ...wrap, display: "flex", flexDirection: "column", gap: "10px" }}>
          {questions.length === 0 && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Loading…</p>}
          {questions.map((q) => {
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
                    {q.answer.split("\n\n").map((p, i) => (
                      <p key={i} style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.75, color: "var(--ink-muted)", maxWidth: "68ch", marginBottom: "12px" }}>{p}</p>
                    ))}
                    {q.whereChristiansDiffer && (
                      <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", background: "var(--bone-warm)", borderRadius: "var(--radius-sm)", padding: "12px 14px", marginTop: "8px" }}>
                        <strong style={{ color: "var(--mustard-text)" }}>Where Christians differ. </strong>{q.whereChristiansDiffer}
                      </p>
                    )}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", marginTop: "16px", paddingTop: "12px", borderTop: "1px solid var(--border)" }}>
                      {q.topic && topicReady(q.topic) && (
                        <Link href={`/justice/topic/${q.topic}`} style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--charcoal)", background: "var(--mustard)", padding: "8px 14px", borderRadius: "999px" }}>
                          Go deeper: {topicReady(q.topic)!.title} →
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
      </section>
    </Layout>
  );
}

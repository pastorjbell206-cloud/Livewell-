/**
 * Family Catechism (/family/catechism) — a New City Catechism-style set of 52
 * questions a family learns and discusses together, one per week. Each question
 * opens to an adult answer, a child's version, the Scripture, a short
 * commentary, and a prayer. Data: /family-catechism.json.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

interface Entry {
  number: number;
  part: string;
  question: string;
  answer: string;
  kidsAnswer: string;
  scripture: string;
  scriptureText: string;
  commentary: string;
  prayer?: string;
}

function weekOfYear(): number {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 1);
  const days = Math.floor((now.getTime() - start.getTime()) / 86400000);
  return Math.min(52, Math.max(1, Math.ceil((days + start.getDay() + 1) / 7)));
}

function QuestionCard({ e, highlight, open, setOpen }: {
  e: Entry;
  highlight?: boolean;
  open: number | null;
  setOpen: (n: number | null) => void;
}) {
  const isOpen = open === e.number;
  return (
    <div style={{ background: "var(--card)", border: `1px solid ${highlight ? "var(--mustard)" : "var(--border)"}`, borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
      <button type="button" onClick={() => setOpen(isOpen ? null : e.number)} aria-expanded={isOpen}
        style={{ width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", padding: "16px var(--s-4)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
        <span style={{ display: "flex", gap: "12px" }}>
          <span style={{ fontFamily: "var(--F)", fontSize: "18px", color: "var(--mustard-text)", fontWeight: 500, minWidth: "28px" }}>{e.number}</span>
          <span style={{ fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, color: "var(--ink)", lineHeight: 1.3 }}>{e.question}</span>
        </span>
        <ChevronDown size={18} aria-hidden style={{ flexShrink: 0, color: "var(--ink-muted)", marginTop: "4px", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
      </button>
      {isOpen && (
        <div style={{ padding: "0 var(--s-4) var(--s-4)", borderTop: "1px solid var(--border)" }}>
          <p style={{ fontFamily: "var(--F)", fontSize: "19px", lineHeight: 1.5, color: "var(--ink)", margin: "16px 0" }}>{e.answer}</p>
          <div style={{ marginBottom: "16px" }}>
            <span className="eyebrow">For the little ones</span>
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink-muted)", marginTop: "4px" }}>{e.kidsAnswer}</p>
          </div>
          <div style={{ marginBottom: "16px" }}>
            <span className="eyebrow">{e.scripture}</span>
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", fontStyle: "italic", marginTop: "4px" }}>{e.scriptureText}</p>
          </div>
          <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", marginBottom: e.prayer ? "16px" : 0 }}>{e.commentary}</p>
          {e.prayer && (
            <p style={{ fontFamily: "var(--F)", fontSize: "15px", fontStyle: "italic", lineHeight: 1.7, color: "var(--ink-muted)", borderLeft: "2px solid var(--mustard)", paddingLeft: "14px" }}>{e.prayer}</p>
          )}
        </div>
      )}
    </div>
  );
}

export default function FamilyCatechism() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    fetch("/family-catechism.json")
      .then((r) => (r.ok ? r.json() : []))
      .then((d) => Array.isArray(d) && setEntries(d))
      .catch(() => {});
  }, []);

  const parts = useMemo(() => {
    const order: string[] = [];
    const map = new Map<string, Entry[]>();
    for (const e of entries) {
      if (!map.has(e.part)) { map.set(e.part, []); order.push(e.part); }
      map.get(e.part)!.push(e);
    }
    return order.map((p) => ({ part: p, items: map.get(p)! }));
  }, [entries]);

  const ofTheWeek = entries.find((e) => e.number === weekOfYear()) ?? entries[0];

  return (
    <Layout>
      <SEOMeta
        title="The Family Catechism — 52 Questions to Learn Together"
        description="A 52-question family catechism in the New City Catechism tradition. Each week: a question, answers for adults and children, a verse, a reflection, a prayer."
        url="https://www.livewellbyjamesbell.co/family/catechism"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/family" style={{ color: "inherit" }}>Family</Link> · Catechism
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "22ch" }}>
            The Family Catechism
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "62ch" }}>
            Fifty-two questions, one for each week of the year. A family learns the faith the way it has always been learned, by question and answer, said out loud together until it lives in them. Each one has an answer for the grown-ups and a shorter one for the little ones, a verse, a short word for the parent, and a prayer.
          </p>
        </div>
      </section>

      {/* QUESTION OF THE WEEK */}
      {ofTheWeek && (
        <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" }}>
          <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "12px" }}>This week — Question {ofTheWeek.number}</div>
            <QuestionCard e={ofTheWeek} highlight open={open} setOpen={setOpen} />
          </div>
        </section>
      )}

      {/* ALL 52, BY PART */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          {entries.length === 0 && (
            <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Loading the catechism…</p>
          )}
          {parts.map(({ part, items }) => (
            <div key={part} style={{ marginBottom: "var(--s-5)" }}>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s-3)", paddingBottom: "8px", borderBottom: "2px solid var(--mustard)" }}>{part}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {items.map((e) => <QuestionCard key={e.number} e={e} open={open} setOpen={setOpen} />)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

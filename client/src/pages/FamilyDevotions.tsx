/**
 * Family devotions (/family/devotions) — the full set: 52 weekly devotions for
 * the year, plus seasonal devotionals for Advent and Holy Week. Data:
 * /family-devotions.json + /family-devotions-2.json (weekly), and
 * /family-seasonal.json (advent + holyWeek).
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

interface Weekly {
  id: string; title: string; theme: string; passage: string; passageText: string;
  bigIdea: string; reflection: string; questions: string[]; activity: string; prayer: string;
}
interface Daily {
  day: number; label: string; title: string; passage: string; passageText: string;
  reflection: string; question: string; prayer: string;
}

type Tab = "weekly" | "advent" | "holyWeek";

export default function FamilyDevotions() {
  const [weekly, setWeekly] = useState<Weekly[]>([]);
  const [advent, setAdvent] = useState<Daily[]>([]);
  const [holyWeek, setHolyWeek] = useState<Daily[]>([]);
  const [tab, setTab] = useState<Tab>("weekly");
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([
      fetch("/family-devotions.json").then((r) => (r.ok ? r.json() : [])).catch(() => []),
      fetch("/family-devotions-2.json").then((r) => (r.ok ? r.json() : [])).catch(() => []),
    ]).then(([a, b]) => setWeekly([...(Array.isArray(a) ? a : []), ...(Array.isArray(b) ? b : [])]));
    fetch("/family-seasonal.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d) { setAdvent(d.advent ?? []); setHolyWeek(d.holyWeek ?? []); } })
      .catch(() => {});
  }, []);

  const tabs: { id: Tab; label: string; count: number }[] = useMemo(() => [
    { id: "weekly", label: "Weekly (a year)", count: weekly.length },
    { id: "advent", label: "Advent", count: advent.length },
    { id: "holyWeek", label: "Holy Week", count: holyWeek.length },
  ], [weekly.length, advent.length, holyWeek.length]);

  const Accordion = ({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) => {
    const isOpen = open === id;
    return (
      <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
        <button type="button" onClick={() => setOpen(isOpen ? null : id)} aria-expanded={isOpen}
          style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "16px var(--s-4)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
          <span>
            <span style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard-text)" }}>{eyebrow}</span>
            <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)", marginTop: "4px" }}>{title}</span>
          </span>
          <ChevronDown size={18} aria-hidden style={{ flexShrink: 0, color: "var(--ink-muted)", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
        </button>
        {isOpen && <div style={{ padding: "0 var(--s-4) var(--s-4)", borderTop: "1px solid var(--border)" }}>{children}</div>}
      </div>
    );
  };

  const Verse = ({ passage, text }: { passage: string; text: string }) => (
    <>
      <p style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, color: "var(--mustard-text)", margin: "16px 0 4px" }}>{passage}</p>
      <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", fontStyle: "italic", marginBottom: "16px" }}>{text}</p>
    </>
  );
  const Prayer = ({ text }: { text: string }) => (
    <p style={{ fontFamily: "var(--F)", fontSize: "15px", fontStyle: "italic", lineHeight: 1.7, color: "var(--ink-muted)", borderLeft: "2px solid var(--mustard)", paddingLeft: "14px" }}>{text}</p>
  );

  const list = tab === "weekly" ? weekly : tab === "advent" ? advent : holyWeek;

  return (
    <Layout>
      <SEOMeta
        title="Family Devotions — A Year of Devotions, Advent, and Holy Week"
        description="A full year of family devotions to do together, plus daily Advent and Holy Week devotionals — each with a passage, a question, an activity, and a prayer."
        url="https://www.livewellbyjamesbell.co/family/devotions"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/family" style={{ color: "inherit" }}>Family</Link> · Devotions
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>
            A year of devotions, together.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "62ch" }}>
            A devotion for every week of the year, plus daily readings to walk your family through Advent and Holy Week. Each one is short, a passage and a question and something to do together and a prayer, made for the table or the couch.
          </p>
        </div>
      </section>

      {/* TABS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) 0" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "8px" }}>
          {tabs.map((t) => (
            <button key={t.id} type="button" onClick={() => { setTab(t.id); setOpen(null); }}
              style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, padding: "10px 16px", borderRadius: "999px", cursor: "pointer",
                border: `1px solid ${tab === t.id ? "var(--mustard)" : "var(--border)"}`, background: tab === t.id ? "var(--bone-warm)" : "transparent", color: "var(--ink)" }}>
              {t.label}{t.count ? ` · ${t.count}` : ""}
            </button>
          ))}
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-4) var(--s-4) var(--s-7)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto", display: "flex", flexDirection: "column", gap: "10px" }}>
          {list.length === 0 && (
            <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Loading…</p>
          )}
          {tab === "weekly" && weekly.map((d, i) => (
            <Accordion key={d.id} id={d.id} eyebrow={`Week ${i + 1} · ${d.theme}`} title={d.title}>
              <Verse passage={d.passage} text={d.passageText} />
              <p style={{ fontFamily: "var(--F)", fontSize: "17px", color: "var(--ink)", marginBottom: "12px" }}>{d.bigIdea}</p>
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", marginBottom: "16px", whiteSpace: "pre-line" }}>{d.reflection}</p>
              <div className="eyebrow" style={{ marginBottom: "8px" }}>Talk about it</div>
              <ul style={{ margin: "0 0 16px", paddingLeft: "20px", fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.8, color: "var(--ink)" }}>
                {d.questions.map((q, j) => <li key={j}>{q}</li>)}
              </ul>
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "12px" }}><strong>Try this together.</strong> {d.activity}</p>
              <Prayer text={d.prayer} />
            </Accordion>
          ))}
          {(tab === "advent" || tab === "holyWeek") && (list as Daily[]).map((d) => (
            <Accordion key={`${tab}-${d.day}`} id={`${tab}-${d.day}`} eyebrow={d.label} title={d.title}>
              <Verse passage={d.passage} text={d.passageText} />
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", marginBottom: "16px" }}>{d.reflection}</p>
              <div className="eyebrow" style={{ marginBottom: "8px" }}>Talk about it</div>
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "16px" }}>{d.question}</p>
              <Prayer text={d.prayer} />
            </Accordion>
          ))}
        </div>
      </section>
    </Layout>
  );
}

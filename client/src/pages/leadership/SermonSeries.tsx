/**
 * The Sermon Series Library (/leadership/sermon-series). Browsable series
 * outlines, both book-by-book (walking through a book of the Bible) and
 * topical, each with the series arc and a per-sermon breakdown of text, big
 * idea, and aim. Data: client/public/leadership/sermon-series.json. Stateless.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface Sermon { n: number; title: string; text: string; bigIdea: string; aim: string; }
interface Series { id: string; kind: "book" | "topical"; title: string; subtitle: string; scriptureRange: string; audience?: string; bigIdea: string; sermons: Sermon[]; }
interface Data { intro: string; series: Series[]; }

export default function SermonSeries() {
  const [data, setData] = useState<Data | null>(null);
  const [kind, setKind] = useState<"all" | "book" | "topical">("all");
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    fetch("/leadership/sermon-series.json", { cache: "no-store" }).then((r) => (r.ok ? r.json() : null)).then((d) => d && setData(d)).catch(() => {});
  }, []);

  const shown = useMemo(() => (data ? data.series.filter((s) => kind === "all" || s.kind === kind) : []), [data, kind]);

  return (
    <Layout>
      <SEOMeta title="The Sermon Series Library — Outlines for Preaching" description="Sermon series outlines for preaching, both book by book through Scripture and topical, each with the series arc and a per-sermon breakdown of text, big idea, and aim." url="https://www.livewellbyjamesbell.co/leadership/sermon-series" />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}><Link href="/leadership" style={{ color: "inherit" }}>Leadership Formation</Link> · Sermon series</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5.5vw, 58px)", fontWeight: 400, lineHeight: 1.03, letterSpacing: "-0.03em", marginBottom: "16px", maxWidth: "20ch" }}>A year of preaching, mapped.</h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "62ch" }}>Series to preach straight through a book, and series gathered around a question a congregation is actually asking. Each one carries its arc and a sermon-by-sermon breakdown: the text, the one idea, and the aim. A starting point, not a script.</p>
          <Link href="/leadership/bible-sermons" style={{ display: "inline-block", marginTop: "20px", fontFamily: "var(--U)", fontSize: "13.5px", fontWeight: 600, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>
            Browse a series for all 66 books →
          </Link>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
        <div style={{ ...wrap, maxWidth: "820px" }}>
          {data && <div style={{ marginBottom: "var(--s-4)" }}>{data.intro.split("\n\n").map((p, i) => <p key={i} style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "10px" }}>{p}</p>)}</div>}

          <div style={{ display: "flex", gap: "8px", marginBottom: "var(--s-4)" }}>
            <Chip active={kind === "all"} onClick={() => setKind("all")}>All</Chip>
            <Chip active={kind === "book"} onClick={() => setKind("book")}>Through a book</Chip>
            <Chip active={kind === "topical"} onClick={() => setKind("topical")}>Topical</Chip>
          </div>

          {!data && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Loading…</p>}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            {shown.map((s) => {
              const isOpen = open === s.id;
              return (
                <div key={s.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderTop: "2px solid var(--mustard)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                  <button onClick={() => setOpen(isOpen ? null : s.id)} aria-expanded={isOpen} style={{ width: "100%", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "12px", padding: "16px var(--s-4)", background: "none", border: "none", cursor: "pointer" }}>
                    <span>
                      <span className="eyebrow" style={{ color: "var(--mustard-text)" }}>{s.kind === "book" ? "Through a book" : "Topical"} · {s.scriptureRange} · {s.sermons.length} weeks</span>
                      <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "23px", fontWeight: 500, color: "var(--ink)", margin: "4px 0 2px", lineHeight: 1.15 }}>{s.title}</span>
                      <span style={{ display: "block", fontFamily: "var(--B)", fontSize: "14px", color: "var(--ink-muted)" }}>{s.subtitle}</span>
                    </span>
                    <ChevronDown size={20} aria-hidden style={{ flexShrink: 0, color: "var(--ink-muted)", marginTop: "4px", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
                  </button>
                  {isOpen && (
                    <div style={{ padding: "0 var(--s-4) var(--s-4)", borderTop: "1px solid var(--border)" }}>
                      <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)", margin: "16px 0" }}><strong style={{ color: "var(--mustard-text)" }}>The arc. </strong>{s.bigIdea}</p>
                      {s.audience && <p style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--ink-muted)", marginBottom: "12px" }}>Good for: {s.audience}</p>}
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {s.sermons.map((m) => (
                          <div key={m.n} style={{ background: "var(--bone-warm)", borderRadius: "var(--radius-sm)", padding: "12px 14px" }}>
                            <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
                              <span style={{ fontFamily: "var(--U)", fontWeight: 700, fontSize: "13px", color: "var(--mustard-text)" }}>{m.n}</span>
                              <strong style={{ fontFamily: "var(--F)", fontSize: "18px", color: "var(--ink)" }}>{m.title}</strong>
                            </div>
                            <div style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--ink-muted)", margin: "2px 0 6px" }}>{m.text}</div>
                            <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink)" }}><strong style={{ color: "var(--mustard-text)" }}>Big idea. </strong>{m.bigIdea}</p>
                            <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}><strong style={{ color: "var(--ink)" }}>Aim. </strong>{m.aim}</p>
                          </div>
                        ))}
                      </div>
                      <div style={{ marginTop: "14px" }}>
                        <a href={`/downloads/sermon-series/${s.id}.pdf`} download style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px", color: "var(--mustard-text)", textDecoration: "none" }}>Download PDF ↓</a>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return <button onClick={onClick} style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "13px", padding: "7px 14px", borderRadius: "999px", cursor: "pointer", border: "1px solid " + (active ? "var(--mustard)" : "var(--border)"), background: active ? "var(--mustard)" : "var(--card)", color: active ? "var(--charcoal)" : "var(--ink-muted)" }}>{children}</button>;
}

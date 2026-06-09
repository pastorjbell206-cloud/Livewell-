/**
 * Guided learning paths (/theology/paths). Curated, ordered tracks through the
 * Theological Depth section for someone who does not know where to start: a
 * start-here path, the gospel traced through Scripture, the whole story, and
 * the doctrines that divide. Data: /theology/paths.json.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

interface Step { label: string; href: string; note: string; }
interface Path { id: string; title: string; audience: string; blurb: string; steps: Step[]; }

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

export default function TheologyPaths() {
  const [paths, setPaths] = useState<Path[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    fetch("/theology/paths.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d?.paths) { setPaths(d.paths); setOpen(d.paths[0]?.id ?? null); } })
      .catch(() => {});
  }, []);

  return (
    <Layout>
      <SEOMeta
        title="Where to Start — Guided Learning Paths"
        description="Do not know where to begin? Follow a guided path: start here for new believers, the gospel traced through Scripture, the whole story of the Bible, or the doctrines that divide explained."
        url="https://www.livewellbyjamesbell.co/theology/paths"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/theology" style={{ color: "inherit" }}>Theological Depth</Link> · Where to start
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>
            You do not have to start in the deep end.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "60ch" }}>
            There is a lot here, and no single right order. Pick the path that fits where you are. Each one is a short, ordered walk through the section, one step at a time.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
        <div style={{ ...wrap, display: "flex", flexDirection: "column", gap: "16px" }}>
          {paths.length === 0 && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Loading paths…</p>}
          {paths.map((p) => {
            const isOpen = open === p.id;
            return (
              <div key={p.id} style={{ background: "var(--card)", border: "1px solid var(--border)", borderTop: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                <button type="button" onClick={() => setOpen(isOpen ? null : p.id)} aria-expanded={isOpen}
                  style={{ width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", padding: "var(--s-4)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <span>
                    <span style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard-text)" }}>{p.audience} · {p.steps.length} steps</span>
                    <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 500, color: "var(--ink)", margin: "4px 0 8px" }}>{p.title}</span>
                    <span style={{ display: "block", fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink-muted)", maxWidth: "64ch" }}>{p.blurb}</span>
                  </span>
                  <ChevronDown size={20} aria-hidden style={{ flexShrink: 0, color: "var(--ink-muted)", marginTop: "4px", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
                </button>
                {isOpen && (
                  <ol style={{ listStyle: "none", margin: 0, padding: "0 0 8px", borderTop: "1px solid var(--border)" }}>
                    {p.steps.map((s, i) => (
                      <li key={i}>
                        <Link href={s.href} style={{ display: "flex", gap: "14px", padding: "14px var(--s-4)", borderBottom: i < p.steps.length - 1 ? "1px solid var(--border)" : "none", textDecoration: "none", color: "inherit" }}>
                          <span style={{ fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, color: "var(--mustard-text)", minWidth: "26px" }}>{i + 1}</span>
                          <span>
                            <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "17px", fontWeight: 500, color: "var(--ink)" }}>{s.label}</span>
                            <span style={{ display: "block", fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.55, color: "var(--ink-muted)", marginTop: "2px" }}>{s.note}</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
}

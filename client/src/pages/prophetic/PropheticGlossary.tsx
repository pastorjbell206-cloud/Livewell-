/**
 * Shared glossary for a prophetic section. Searchable, alphabetical, loaded from
 * <base>/glossary.json.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Search } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import type { SectionConfig } from "@/lib/prophetic";

interface Term { term: string; hebrew: string; short: string; definition: string; seeAlso: string[]; }

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

export default function PropheticGlossary({ config }: { config: SectionConfig }) {
  const [terms, setTerms] = useState<Term[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch(`${config.base}/glossary.json`, { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.terms && setTerms(d.terms))
      .catch(() => {});
  }, [config.base]);

  const filtered = useMemo(() => {
    const n = q.trim().toLowerCase();
    if (!n) return terms;
    return terms.filter((t) => t.term.toLowerCase().includes(n) || t.short.toLowerCase().includes(n) || t.definition.toLowerCase().includes(n));
  }, [terms, q]);

  const groups = useMemo(() => {
    const map = new Map<string, Term[]>();
    for (const t of [...filtered].sort((a, b) => a.term.localeCompare(b.term))) {
      const l = t.term[0].toUpperCase();
      if (!map.has(l)) map.set(l, []);
      map.get(l)!.push(t);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <Layout>
      <SEOMeta title={`Glossary — ${config.label}`} description="The words of biblical justice from mishpat to jubilee, including the politically loaded ones, defined even-handedly." url={`https://www.livewellbyjamesbell.co${config.base}/glossary`} />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href={config.base} style={{ color: "inherit" }}>{config.label}</Link> · Glossary
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 50px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>The words, defined fairly.</h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "62ch", marginBottom: "22px" }}>
            Many of these words have been turned into weapons. Here they are defined from the text and the tradition, with the loaded ones handled honestly from both sides.
          </p>
          <div style={{ position: "relative", maxWidth: "440px" }}>
            <Search size={18} aria-hidden style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--ink-muted)" }} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search terms…" aria-label="Search glossary"
              style={{ width: "100%", fontFamily: "var(--B)", fontSize: "16px", padding: "12px 16px 12px 42px", borderRadius: "var(--radius-sm)", border: "1px solid rgba(245,240,230,0.3)", background: "var(--bone)", color: "var(--ink)" }} />
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
        <div style={wrap}>
          {terms.length === 0 && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Loading…</p>}
          {groups.map(([letter, items]) => (
            <div key={letter} style={{ marginBottom: "var(--s-5)" }}>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "28px", fontWeight: 400, color: "var(--mustard-text)", marginBottom: "var(--s-3)", paddingBottom: "6px", borderBottom: "2px solid var(--mustard)" }}>{letter}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {items.map((t) => (
                  <div key={t.term} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
                      <span style={{ fontFamily: "var(--F)", fontSize: "21px", fontWeight: 500, color: "var(--ink)" }}>{t.term}</span>
                      {t.hebrew && <span style={{ fontFamily: "var(--B)", fontSize: "13px", fontStyle: "italic", color: "var(--mustard-text)" }}>{t.hebrew}</span>}
                    </div>
                    <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.5, color: "var(--ink)", fontWeight: 500, marginBottom: "8px" }}>{t.short}</p>
                    <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "68ch" }}>{t.definition}</p>
                    {t.seeAlso?.length > 0 && <p style={{ fontFamily: "var(--B)", fontSize: "13px", color: "var(--ink-muted)", marginTop: "10px", paddingTop: "8px", borderTop: "1px solid var(--border)" }}>See also: {t.seeAlso.join(", ")}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

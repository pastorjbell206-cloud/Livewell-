/**
 * Theology glossary (/theology/glossary). A searchable, alphabetical glossary
 * of the technical terms a new believer meets across the section, each defined
 * warmly and linked to its doctrine where one applies. Data:
 * /theology/theology-glossary.json.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Search } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { DOCTRINE_INDEX } from "@/lib/theology";

interface Term { term: string; pronunciation: string; short: string; definition: string; seeAlso: string[]; doctrine: string; }

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

export default function TheologyGlossary() {
  const [terms, setTerms] = useState<Term[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    fetch("/theology/theology-glossary.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.terms && setTerms(d.terms))
      .catch(() => {});
  }, []);

  // Scroll to a term if the URL carries its anchor (used by search deep links).
  useEffect(() => {
    if (terms.length === 0) return;
    const hash = window.location.hash.replace("#", "");
    if (hash) setTimeout(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
  }, [terms]);

  const docTitle = (slug: string) => DOCTRINE_INDEX.find((d) => d.slug === slug && d.ready)?.title;

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return terms;
    return terms.filter((t) => t.term.toLowerCase().includes(needle) || t.short.toLowerCase().includes(needle) || t.definition.toLowerCase().includes(needle));
  }, [terms, q]);

  const groups = useMemo(() => {
    const map = new Map<string, Term[]>();
    for (const t of [...filtered].sort((a, b) => a.term.localeCompare(b.term))) {
      const letter = t.term[0].toUpperCase();
      if (!map.has(letter)) map.set(letter, []);
      map.get(letter)!.push(t);
    }
    return Array.from(map.entries());
  }, [filtered]);

  return (
    <Layout>
      <SEOMeta
        title="Theology Glossary — Every Term, Defined Plainly"
        description="A searchable glossary of theological terms for the new believer, from atonement to the Trinity, each defined warmly and linked to the doctrine it belongs to."
        url="https://www.livewellbyjamesbell.co/theology/glossary"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/theology" style={{ color: "inherit" }}>Theological Depth</Link> · Glossary
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>
            Every word, explained plainly.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "60ch", marginBottom: "22px" }}>
            Theology has a vocabulary, and nobody is born knowing it. Here is every term in this section, defined the way a good pastor would explain it across a table. Search for one, or read straight through.
          </p>
          <div style={{ position: "relative", maxWidth: "440px" }}>
            <Search size={18} aria-hidden style={{ position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)", color: "var(--ink-muted)" }} />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search terms…" aria-label="Search glossary"
              style={{ width: "100%", fontFamily: "var(--B)", fontSize: "16px", padding: "12px 16px 12px 42px", borderRadius: "var(--radius-sm)", border: "1px solid rgba(245,240,230,0.3)", background: "var(--bone)", color: "var(--ink)" }} />
          </div>
          {terms.length > 0 && <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "rgba(245,240,230,0.6)", marginTop: "12px" }}>{filtered.length} of {terms.length} terms</p>}
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
        <div style={wrap}>
          {terms.length === 0 && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Loading the glossary…</p>}
          {terms.length > 0 && filtered.length === 0 && <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>No term matches that. Try another word.</p>}
          {groups.map(([letter, items]) => (
            <div key={letter} style={{ marginBottom: "var(--s-5)" }}>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "28px", fontWeight: 400, color: "var(--mustard-text)", marginBottom: "var(--s-3)", paddingBottom: "6px", borderBottom: "2px solid var(--mustard)" }}>{letter}</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {items.map((t) => (
                  <div key={t.term} id={t.term.toLowerCase().replace(/\s+/g, "-")} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)", scrollMarginTop: "90px" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "10px", marginBottom: "6px" }}>
                      <span style={{ fontFamily: "var(--F)", fontSize: "21px", fontWeight: 500, color: "var(--ink)" }}>{t.term}</span>
                      {t.pronunciation && <span style={{ fontFamily: "var(--B)", fontSize: "13px", fontStyle: "italic", color: "var(--ink-muted)" }}>{t.pronunciation}</span>}
                    </div>
                    <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.5, color: "var(--ink)", fontWeight: 500, marginBottom: "8px" }}>{t.short}</p>
                    <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "68ch" }}>{t.definition}</p>
                    {(t.seeAlso?.length > 0 || t.doctrine) && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", marginTop: "12px", paddingTop: "10px", borderTop: "1px solid var(--border)" }}>
                        {t.doctrine && docTitle(t.doctrine) && (
                          <Link href={`/theology/doctrine/${t.doctrine}`} style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, color: "var(--mustard-text)" }}>In: {docTitle(t.doctrine)} →</Link>
                        )}
                        {t.seeAlso?.length > 0 && (
                          <span style={{ fontFamily: "var(--B)", fontSize: "13px", color: "var(--ink-muted)" }}>See also: {t.seeAlso.join(", ")}</span>
                        )}
                      </div>
                    )}
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

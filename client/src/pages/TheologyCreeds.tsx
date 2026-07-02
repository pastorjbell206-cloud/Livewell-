/**
 * Creeds and confessions library (/theology/creeds). The actual historic
 * statements of the faith: the full text of the great creeds (Apostles',
 * Nicene, Athanasian, Chalcedonian Definition), and short summaries of the
 * major confessions. Data: /theology/theology-creeds.json.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

interface Creed { name: string; era: string; note: string; text: string; }
interface Confession { name: string; tradition: string; year: string; summary: string; }

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

export default function TheologyCreeds() {
  const [creeds, setCreeds] = useState<Creed[]>([]);
  const [confessions, setConfessions] = useState<Confession[]>([]);
  const [open, setOpen] = useState<string | null>(null);

  useEffect(() => {
    fetch("/theology/theology-creeds.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => { if (d) { setCreeds(d.creeds ?? []); setConfessions(d.confessions ?? []); if (d.creeds?.[0]) setOpen(d.creeds[0].name); } })
      .catch(() => {});
  }, []);

  return (
    <Layout>
      <SEOMeta
        title="Creeds and Confessions — The Faith in Its Own Words"
        description="The historic creeds in full, from the Apostles' Creed to the Chalcedonian Definition, plus summaries of the great confessions that shaped the traditions."
        url="https://www.livewellbyjamesbell.co/theology/creeds"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/theology" style={{ color: "inherit" }}>Theological Depth</Link> · Creeds and confessions
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>
            The faith, in its own words.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "62ch" }}>
            When you say a creed, you are speaking words the church has said for more than a thousand years, in prison cells and cathedrals and quiet kitchens. Here they are in full, with the great confessions that later traditions wrote to say more.
          </p>
        </div>
      </section>

      {/* CREEDS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-4)" }}>
        <div style={{ ...wrap, display: "flex", flexDirection: "column", gap: "12px" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 400, color: "var(--ink)", marginBottom: "8px" }}>The creeds</h2>
          {creeds.length === 0 && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-5) 0" }}>Loading…</p>}
          {creeds.map((c) => {
            const isOpen = open === c.name;
            return (
              <div key={c.name} style={{ background: "var(--card)", border: "1px solid var(--border)", borderTop: "2px solid var(--mustard)", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                <button type="button" onClick={() => setOpen(isOpen ? null : c.name)} aria-expanded={isOpen}
                  style={{ width: "100%", display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "12px", padding: "var(--s-4)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
                  <span>
                    <span style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard-text)" }}>{c.era}</span>
                    <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "24px", fontWeight: 500, color: "var(--ink)", marginTop: "4px" }}>{c.name}</span>
                  </span>
                  <ChevronDown size={20} aria-hidden style={{ flexShrink: 0, color: "var(--ink-muted)", marginTop: "6px", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
                </button>
                {isOpen && (
                  <div style={{ padding: "0 var(--s-4) var(--s-4)", borderTop: "1px solid var(--border)" }}>
                    <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", fontStyle: "italic", margin: "16px 0", maxWidth: "66ch" }}>{c.note}</p>
                    <div style={{ borderLeft: "2px solid var(--mustard)", paddingLeft: "18px" }}>
                      {c.text.split("\n\n").map((para, i) => (
                        <p key={i} style={{ fontFamily: "var(--F)", fontSize: "17px", lineHeight: 1.7, color: "var(--ink)", marginBottom: "12px", maxWidth: "64ch" }}>{para}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CONFESSIONS */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
        <div style={wrap}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 400, color: "var(--ink)", marginBottom: "8px" }}>The confessions</h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "66ch", marginBottom: "var(--s-4)", fontStyle: "italic" }}>
            Longer documents the traditions wrote to spell out what they believe in detail. Each one is worth reading in full elsewhere. Here is what each is and who holds to it.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
            {confessions.map((c) => (
              <div key={c.name} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)" }}>
                <div style={{ fontFamily: "var(--F)", fontSize: "19px", fontWeight: 500, color: "var(--ink)", marginBottom: "4px" }}>{c.name}</div>
                <div style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, color: "var(--mustard-text)", marginBottom: "10px" }}>{c.tradition} · {c.year}</div>
                <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.65, color: "var(--ink-muted)" }}>{c.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

/**
 * Doctrine comparison table (/theology/compare). Pick any worked doctrine and
 * see its positions side by side: the one-line summary, the best-case voice,
 * the advocates, and the key texts, laid out in columns so the differences are
 * easy to scan. Reads the same doctrine JSON the doctrine pages use, so it
 * needs no content of its own.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { TriageBadge } from "@/components/TriageBadge";
import { DOCTRINE_INDEX, type Doctrine } from "@/lib/theology";

const wrap = { maxWidth: "var(--w-wide)", margin: "0 auto" } as const;

export default function TheologyCompare() {
  const ready = useMemo(() => DOCTRINE_INDEX.filter((d) => d.ready), []);
  const [slug, setSlug] = useState<string>(ready[0]?.slug ?? "soteriology");
  // The fetched doctrine is tagged with the slug it answered; `doc` is derived
  // per render, so switching doctrines resets the view without a synchronous
  // setState in the effect.
  const [result, setResult] = useState<{ slug: string; doc: Doctrine | null } | null>(null);

  useEffect(() => {
    fetch(`/theology/${slug}.json`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setResult({ slug, doc: d }))
      .catch(() => setResult({ slug, doc: null }));
  }, [slug]);

  const doc = result && result.slug === slug ? result.doc : null;

  const col = `minmax(220px, 1fr)`;

  return (
    <Layout>
      <SEOMeta
        title="Compare the Views — Doctrine Comparison Table"
        description="Pick any contested doctrine and see every position side by side: the one-line summary, the case each makes, its advocates, and its key texts."
        url="https://www.livewellbyjamesbell.co/theology/compare"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/theology" style={{ color: "inherit" }}>Theological Depth</Link> · Compare the views
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>
            See the positions side by side.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "60ch", marginBottom: "20px" }}>
            Pick a doctrine and lay its views in a row. The same fair treatment as the full doctrine pages, arranged so you can scan the differences at a glance.
          </p>
          <select value={slug} onChange={(e) => setSlug(e.target.value)}
            style={{ fontFamily: "var(--B)", fontSize: "16px", padding: "12px 16px", borderRadius: "var(--radius-sm)", border: "1px solid rgba(245,240,230,0.3)", background: "var(--bone)", color: "var(--ink)", minWidth: "min(440px, 100%)", maxWidth: "100%" }}>
            {ready.map((d) => <option key={d.slug} value={d.slug}>{d.title}</option>)}
          </select>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
        <div style={wrap}>
          {!doc && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Loading…</p>}
          {doc && (
            <>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", marginBottom: "var(--s-4)" }}>
                <TriageBadge triage={doc.triage} withShort />
                <Link href={`/theology/doctrine/${doc.slug}`} style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)", marginLeft: "auto" }}>Read the full doctrine →</Link>
              </div>

              <p className="scroll-hint" style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--ink-muted)", marginBottom: "8px" }}>
                Swipe sideways to see every column.
              </p>
              <div style={{ overflowX: "auto", paddingBottom: "8px", WebkitOverflowScrolling: "touch" }}>
                <div style={{ display: "grid", gridTemplateColumns: `140px repeat(${doc.positions.length}, ${col})`, gap: "1px", background: "var(--border)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", minWidth: `${140 + doc.positions.length * 240}px` }}>
                  {/* Header row */}
                  <div style={{ background: "var(--charcoal)" }} />
                  {doc.positions.map((p) => (
                    <div key={p.name} style={{ background: "var(--charcoal)", color: "var(--bone)", padding: "14px", fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, borderTop: "3px solid var(--mustard)" }}>{p.name}</div>
                  ))}

                  {/* In one line */}
                  <div style={{ background: "var(--bone-warm)", padding: "14px", fontFamily: "var(--U)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--mustard-text)" }}>In one line</div>
                  {doc.positions.map((p) => (
                    <div key={p.name} style={{ background: "var(--card)", padding: "14px", fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink)", fontWeight: 500 }}>{p.inOneLine}</div>
                  ))}

                  {/* The case */}
                  <div style={{ background: "var(--bone-warm)", padding: "14px", fontFamily: "var(--U)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--mustard-text)" }}>The case, in brief</div>
                  {doc.positions.map((p) => (
                    <div key={p.name} style={{ background: "var(--card)", padding: "14px", fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.65, color: "var(--ink-muted)" }}>{p.bestCase.split("\n\n")[0]}</div>
                  ))}

                  {/* Advocates */}
                  <div style={{ background: "var(--bone-warm)", padding: "14px", fontFamily: "var(--U)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--mustard-text)" }}>Voices</div>
                  {doc.positions.map((p) => (
                    <div key={p.name} style={{ background: "var(--card)", padding: "14px", fontFamily: "var(--B)", fontSize: "13px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{p.advocates.join(", ")}</div>
                  ))}

                  {/* Key texts */}
                  <div style={{ background: "var(--bone-warm)", padding: "14px", fontFamily: "var(--U)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--mustard-text)" }}>Key texts</div>
                  {doc.positions.map((p) => (
                    <div key={p.name} style={{ background: "var(--card)", padding: "14px", fontFamily: "var(--U)", fontSize: "13px", lineHeight: 1.7, color: "var(--ink-muted)" }}>{p.keyTexts.join(" · ")}</div>
                  ))}
                </div>
              </div>
              <p style={{ fontFamily: "var(--B)", fontSize: "13px", color: "var(--ink-muted)", fontStyle: "italic", marginTop: "12px" }}>The case shown is the opening of each position's own statement. Read the full doctrine for the whole argument, the biblical evidence, and where the author lands.</p>
            </>
          )}
        </div>
      </section>

      {/* The six written comparisons — prose treatments of the pairings
          readers search for by name. This page linked none of them before. */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.5vw, 32px)", fontWeight: 400, letterSpacing: "-0.015em", color: "var(--ink)", marginBottom: "8px" }}>
            The worked comparisons.
          </h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "62ch", marginBottom: "20px" }}>
            Six pairings written out in full — history, worship, doctrine, and
            what each tradition would say about the other, stated fairly.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "12px" }}>
            {[
              { href: "/compare/catholic-vs-protestant", label: "Catholic vs. Protestant" },
              { href: "/compare/calvinism-vs-arminianism", label: "Calvinism vs. Arminianism" },
              { href: "/compare/baptist-vs-methodist", label: "Baptist vs. Methodist" },
              { href: "/compare/evangelical-vs-mainline", label: "Evangelical vs. Mainline" },
              { href: "/compare/orthodox-vs-catholic", label: "Orthodox vs. Catholic" },
              { href: "/compare/liturgical-vs-contemporary", label: "Liturgical vs. Contemporary worship" },
            ].map((c) => (
              <Link key={c.href} href={c.href} style={{ display: "block", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "14px 16px", fontFamily: "var(--U)", fontSize: "14.5px", fontWeight: 500, color: "var(--ink)", textDecoration: "none" }}>
                {c.label} →
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

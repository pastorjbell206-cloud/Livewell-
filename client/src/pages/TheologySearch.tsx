/**
 * Unified search for the Theological Depth section (/theology/search). One box
 * across the doctrines, the 230 passage notes, the glossary, the creeds and
 * confessions, the church-history figures, the traditions, and the hard
 * questions. Everything is client-side: the data files are fetched once and
 * searched in the browser. A query that looks like a Bible reference also
 * offers a direct jump into the Passage Context Tool.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Search, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { DOCTRINE_INDEX } from "@/lib/theology";

interface Result { type: string; title: string; subtitle: string; href: string; }

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

function titleizeKey(key: string) {
  return key.replace(/\b\w/g, (c) => c.toUpperCase());
}
const looksLikeRef = (q: string) => /^\s*[0-3]?\s*[A-Za-z][A-Za-z.\s]*\s*\d+(\s*:\s*\d+(\s*-\s*\d+)?)?\s*$/.test(q) && /\d/.test(q);

export default function TheologySearch() {
  const [q, setQ] = useState("");
  const [data, setData] = useState<{ notes: any; glossary: any[]; creeds: any[]; confessions: any[]; figures: any[]; traditions: any[]; questions: any[] }>({
    notes: {}, glossary: [], creeds: [], confessions: [], figures: [], traditions: [], questions: [],
  });

  useEffect(() => {
    const get = (f: string) => fetch(f).then((r) => (r.ok ? r.json() : null)).catch(() => null);
    Promise.all([
      get("/theology/passage-notes.json"),
      get("/theology/theology-glossary.json"),
      get("/theology/theology-creeds.json"),
      get("/theology/church-history-figures.json"),
      get("/theology/traditions.json"),
      get("/theology/questions.json"),
    ]).then(([notes, glossary, creeds, figures, traditions, questions]) => {
      setData({
        notes: notes ?? {},
        glossary: glossary?.terms ?? [],
        creeds: creeds?.creeds ?? [],
        confessions: creeds?.confessions ?? [],
        figures: figures?.figures ?? [],
        traditions: traditions?.traditions ?? [],
        questions: questions?.questions ?? [],
      });
    });
  }, []);

  const results = useMemo<Result[]>(() => {
    const needle = q.trim().toLowerCase();
    if (needle.length < 2) return [];
    const out: Result[] = [];
    const has = (s: string | undefined) => (s ?? "").toLowerCase().includes(needle);

    for (const d of DOCTRINE_INDEX) if (d.ready && (has(d.title) || has(d.blurb)))
      out.push({ type: "Doctrine", title: d.title, subtitle: d.blurb, href: `/theology/doctrine/${d.slug}` });

    for (const [key, note] of Object.entries<any>(data.notes)) {
      const hay = [key, note.flow, (note.misreadings ?? []).join(" "), (note.echoes ?? []).join(" ")].join(" ");
      if (hay.toLowerCase().includes(needle))
        out.push({ type: "Passage", title: titleizeKey(key), subtitle: note.flow ? String(note.flow).slice(0, 120) : "A worked passage in context", href: `/theology/passage?ref=${encodeURIComponent(titleizeKey(key))}` });
    }

    for (const t of data.glossary) if (has(t.term) || has(t.short) || has(t.definition))
      out.push({ type: "Glossary", title: t.term, subtitle: t.short, href: `/theology/glossary#${String(t.term).toLowerCase().replace(/\s+/g, "-")}` });

    for (const q of data.questions) if (has(q.question) || has(q.shortAnswer) || has(q.answer))
      out.push({ type: "Question", title: q.question, subtitle: q.shortAnswer, href: `/theology/questions#${q.id}` });

    for (const t of data.traditions) if (has(t.name) || has(t.treasures) || has(t.distinctives))
      out.push({ type: "Tradition", title: t.name, subtitle: t.distinctives, href: "/theology/traditions" });

    for (const c of data.creeds) if (has(c.name) || has(c.note))
      out.push({ type: "Creed", title: c.name, subtitle: c.note, href: "/theology/creeds" });
    for (const c of data.confessions) if (has(c.name) || has(c.summary))
      out.push({ type: "Confession", title: c.name, subtitle: c.summary, href: "/theology/creeds" });

    for (const f of data.figures) if (has(f.name) || has(f.summary) || has(f.role))
      out.push({ type: "Figure", title: f.name, subtitle: `${f.dates} · ${f.role}`, href: "/theology/history" });

    return out.slice(0, 80);
  }, [q, data]);

  const grouped = useMemo(() => {
    const order = ["Doctrine", "Question", "Passage", "Glossary", "Tradition", "Creed", "Confession", "Figure"];
    const map = new Map<string, Result[]>();
    for (const r of results) { if (!map.has(r.type)) map.set(r.type, []); map.get(r.type)!.push(r); }
    return order.filter((t) => map.has(t)).map((t) => ({ type: t, items: map.get(t)! }));
  }, [results]);

  const showRefJump = looksLikeRef(q);

  return (
    <Layout>
      <SEOMeta
        title="Search the Theological Depth Section"
        description="One search across every doctrine, passage, glossary term, creed, figure, tradition, and hard question in the Theological Depth section."
        url="https://www.livewellbyjamesbell.co/theology/search"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/theology" style={{ color: "inherit" }}>Theological Depth</Link> · Search
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(30px, 5vw, 48px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>
            Search everything.
          </h1>
          <div style={{ position: "relative", maxWidth: "560px" }}>
            <Search size={20} aria-hidden style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", color: "var(--ink-muted)" }} />
            <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="A word, a doctrine, a question, or a reference like John 3" aria-label="Search the section"
              style={{ width: "100%", fontFamily: "var(--B)", fontSize: "17px", padding: "14px 16px 14px 48px", borderRadius: "var(--radius-sm)", border: "1px solid rgba(245,240,230,0.3)", background: "var(--bone)", color: "var(--ink)" }} />
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-7)", minHeight: "40vh" }}>
        <div style={wrap}>
          {showRefJump && (
            <Link href={`/theology/passage?ref=${encodeURIComponent(q.trim())}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", background: "var(--card)", border: "1px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "16px var(--s-4)", textDecoration: "none", marginBottom: "var(--s-4)" }}>
              <span>
                <span style={{ display: "block", fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "4px" }}>Read in context</span>
                <span style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)" }}>Open {q.trim()} in the Passage Context Tool</span>
              </span>
              <ArrowRight size={20} aria-hidden style={{ color: "var(--mustard-text)", flexShrink: 0 }} />
            </Link>
          )}

          {q.trim().length >= 2 && results.length === 0 && !showRefJump && (
            <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }}>Nothing matched that. Try another word, or a Bible reference.</p>
          )}
          {q.trim().length < 2 && (
            <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0", maxWidth: "60ch", margin: "0 auto", lineHeight: 1.7 }}>
              Start typing. This searches the doctrines, all 230 passage studies, the glossary, the creeds and confessions, the people of church history, the traditions, and the hard questions, all at once.
            </p>
          )}

          {grouped.map(({ type, items }) => (
            <div key={type} style={{ marginBottom: "var(--s-4)" }}>
              <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>{type}{items.length > 1 ? "s" : ""} · {items.length}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {items.map((r, i) => (
                  <Link key={i} href={r.href} style={{ display: "block", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "12px var(--s-4)", textDecoration: "none", color: "inherit" }}>
                    <span style={{ fontFamily: "var(--F)", fontSize: "17px", fontWeight: 500, color: "var(--ink)" }}>{r.title}</span>
                    {r.subtitle && <span style={{ display: "block", fontFamily: "var(--B)", fontSize: "13px", lineHeight: 1.5, color: "var(--ink-muted)", marginTop: "2px" }}>{r.subtitle}{r.subtitle.length >= 120 ? "…" : ""}</span>}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

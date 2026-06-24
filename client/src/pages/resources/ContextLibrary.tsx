/**
 * Reading Scripture in Context (/resources/context). The platform's signature
 * library: guides to the Ancient Near Eastern, Second Temple Jewish, and
 * Greco-Roman worlds of the Bible, the honor-shame frameworks of its cultures,
 * and how to read the text apart from American political assumptions.
 * Driven by a manifest at client/public/context/guides-index.json, generated
 * from the guide JSON files by scripts/build-context-index.mjs.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Search } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface Entry { slug: string; title: string; blurb: string; group: string; }

const GROUP_ORDER = [
  "Reading Past Our Politics",
  "Ancient Near East",
  "Second Temple Judaism",
  "The Greco-Roman World",
  "Honor, Shame, and Culture",
];

export default function ContextLibrary() {
  const [items, setItems] = useState<Entry[]>([]);
  const [q, setQ] = useState("");
  const [group, setGroup] = useState<string | null>(null);

  useEffect(() => {
    fetch("/context/guides-index.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setItems(d.guides || []))
      .catch(() => {});
  }, []);

  const groups = useMemo(() => {
    const present = new Set(items.map((i) => i.group));
    return GROUP_ORDER.filter((g) => present.has(g)).concat(
      Array.from(present).filter((g) => !GROUP_ORDER.includes(g)).sort()
    );
  }, [items]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return items.filter((i) => {
      if (group && i.group !== group) return false;
      if (!needle) return true;
      return (i.title + " " + i.blurb + " " + i.group).toLowerCase().includes(needle);
    });
  }, [items, q, group]);

  const grouped = useMemo(() => {
    const m = new Map<string, Entry[]>();
    for (const g of groups) m.set(g, []);
    for (const i of filtered) m.get(i.group)?.push(i);
    return Array.from(m.entries()).filter(([, v]) => v.length > 0);
  }, [filtered, groups]);

  return (
    <Layout>
      <SEOMeta
        title="Reading Scripture in Context — Biblical Background Guides"
        description="Guides to the Ancient Near Eastern, Second Temple Jewish, and Greco-Roman worlds of the Bible, and how to read Scripture apart from American politics. Free."
        url="https://www.livewellbyjamesbell.co/resources/context"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>Resources · The signature library</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.4vw, 58px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "18px", maxWidth: "20ch" }}>
            Reading Scripture in Context
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "64ch", marginBottom: "12px" }}>
            The Bible was not written in English, in America, or in this century. It was written by Middle Eastern authors, to people living under empires they did not control, in cultures built on honor, kinship, and covenant. Most of what we misread, we misread because we never noticed the distance.
          </p>
          <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "64ch" }}>
            These guides close that distance. Not to make you superior to other readers. To put you under the text as it actually stands, before our politics got to it. Every guide is sourced to real scholarship you can check.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-4)" }}>
        <div style={wrap}>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ position: "relative", flex: "1 1 260px", maxWidth: "420px" }}>
              <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--ink-muted)" }} />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search the guides"
                aria-label="Search the context guides"
                style={{ width: "100%", padding: "10px 12px 10px 36px", fontFamily: "var(--U)", fontSize: "14px", background: "#FFFFFF", border: "1px solid rgba(20,17,12,0.15)", borderRadius: "2px", color: "var(--ink)", outline: "none" }}
              />
            </div>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              <button onClick={() => setGroup(null)} style={{ fontFamily: "var(--U)", fontSize: "12.5px", fontWeight: 600, padding: "7px 12px", borderRadius: "2px", cursor: "pointer", border: "1px solid rgba(20,17,12,0.18)", background: group === null ? "var(--charcoal)" : "transparent", color: group === null ? "var(--bone)" : "var(--ink)" }}>
                All
              </button>
              {groups.map((g) => (
                <button key={g} onClick={() => setGroup(group === g ? null : g)} style={{ fontFamily: "var(--U)", fontSize: "12.5px", fontWeight: 600, padding: "7px 12px", borderRadius: "2px", cursor: "pointer", border: "1px solid rgba(20,17,12,0.18)", background: group === g ? "var(--charcoal)" : "transparent", color: group === g ? "var(--bone)" : "var(--ink)" }}>
                  {g}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          {items.length === 0 ? (
            <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Loading the library…</p>
          ) : grouped.length === 0 ? (
            <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Nothing matches that search.</p>
          ) : (
            grouped.map(([g, entries]) => (
              <div key={g} style={{ marginBottom: "var(--s-5)" }}>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "6px" }}>{g}</h2>
                <div style={{ width: "36px", height: "2px", background: "var(--mustard)", marginBottom: "var(--s-3)" }} />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--s-3)" }}>
                  {entries.map((e) => (
                    <Link key={e.slug} href={`/resources/context/${e.slug}`} style={{ display: "block", background: "#FFFFFF", border: "1px solid rgba(20,17,12,0.08)", borderTop: "2px solid var(--mustard)", padding: "var(--s-3)", textDecoration: "none" }}>
                      <div style={{ fontFamily: "var(--F)", fontSize: "19px", lineHeight: 1.25, color: "var(--ink)", marginBottom: "8px" }}>{e.title}</div>
                      <div style={{ fontFamily: "var(--B)", fontSize: "13.5px", lineHeight: 1.55, color: "var(--ink-muted)" }}>{e.blurb}</div>
                    </Link>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section style={{ background: "var(--charcoal)", padding: "var(--s-5) var(--s-4)", color: "var(--bone)" }}>
        <div style={wrap}>
          <p style={{ fontFamily: "var(--F)", fontSize: "17px", fontStyle: "italic", lineHeight: 1.6, color: "rgba(245,240,230,0.85)", maxWidth: "56ch", marginBottom: "16px" }}>
            Context is not a weapon for winning arguments. It is a posture for losing them, to the text.
          </p>
          <Link href="/resources" style={{ fontFamily: "var(--U)", fontSize: "13.5px", fontWeight: 600, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>
            ← All resources
          </Link>
        </div>
      </section>
    </Layout>
  );
}

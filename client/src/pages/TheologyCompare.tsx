/**
 * Doctrine comparison table (/theology/compare). Pick any worked doctrine and
 * see its positions side by side: the one-line summary, the best-case voice,
 * the advocates, and the key texts, laid out in columns so the differences are
 * easy to scan. Reads the same doctrine JSON the doctrine pages use, so it
 * needs no content of its own. A doctrine that does not load says so, with a
 * retry and a way back (lib/fetch-json, components/LoadFailed), instead of
 * "Loading…" for ever (the walk's polish, 2026-11-23).
 */
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { TriageBadge } from "@/components/TriageBadge";
import { LoadFailed } from "@/components/LoadFailed";
import InnerHead from "@/components/art/InnerHead";
import SectionHead from "@/components/art/SectionHead";
import { LibCard } from "@/components/art/LibraryIndex";
import { Scale } from "lucide-react";
import { fetchJson } from "@/lib/fetch-json";
import { trailFor } from "@/lib/pagePlace";
import { DOCTRINE_INDEX, type Doctrine } from "@/lib/theology";

const wrap = { maxWidth: "var(--w-wide)", margin: "0 auto" } as const;

const isText = (x: unknown): x is string => typeof x === "string";
const isTexts = (x: unknown): x is string[] => Array.isArray(x) && x.every(isText);
/** The fields the table reads, so a malformed file shows the failure panel rather than breaking the page. */
function isComparable(x: unknown): x is Doctrine {
  const d = x as Partial<Doctrine> | null;
  return (
    !!d &&
    isText(d.slug) &&
    isText(d.title) &&
    Array.isArray(d.positions) &&
    d.positions.every((p) => !!p && isText(p.name) && isText(p.inOneLine) && isText(p.bestCase) && isTexts(p.advocates) && isTexts(p.keyTexts))
  );
}

/** The way back from a doctrine that did not load: the door this page sits in, by its catalogue name. */
const BACK = trailFor("/theology/compare")?.door ?? { name: "Questions", href: "/topics" };

export default function TheologyCompare() {
  const ready = useMemo(() => DOCTRINE_INDEX.filter((d) => d.ready), []);
  // A link can name the doctrine to open on: /theology/compare?doctrine=origins.
  const [slug, setSlug] = useState<string>(() => {
    const asked = typeof window === "undefined" ? null : new URLSearchParams(window.location.search).get("doctrine");
    return (asked && ready.some((d) => d.slug === asked) ? asked : ready[0]?.slug) ?? "soteriology";
  });
  // The fetched doctrine is tagged with the slug and the attempt it answered;
  // `doc` and `failed` are derived per render, so switching doctrines or
  // trying again shows "Loading…" without a synchronous setState in the effect.
  const [nonce, setNonce] = useState(0);
  const [result, setResult] = useState<{ slug: string; nonce: number; doc: Doctrine | null } | null>(null);

  useEffect(() => {
    let live = true;
    fetchJson(`/theology/${slug}.json`, isComparable)
      .then((d) => live && setResult({ slug, nonce, doc: d }))
      .catch(() => live && setResult({ slug, nonce, doc: null }));
    return () => {
      live = false;
    };
  }, [slug, nonce]);

  const current = result && result.slug === slug && result.nonce === nonce ? result : null;
  const doc = current?.doc ?? null;
  const failed = !!current && !current.doc;

  const col = `minmax(220px, 1fr)`;

  /** The rows of the table, by the label each row carries. */
  const rows: { label: string; cell: (p: Doctrine["positions"][number]) => string; style: CSSProperties }[] = [
    { label: "In one line", cell: (p) => p.inOneLine, style: { fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink)", fontWeight: 500 } },
    { label: "The case, in brief", cell: (p) => p.bestCase.split("\n\n")[0], style: { fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.65, color: "var(--ink-muted)" } },
    { label: "Voices", cell: (p) => p.advocates.join(", "), style: { fontFamily: "var(--B)", fontSize: "13px", lineHeight: 1.6, color: "var(--ink-muted)" } },
    { label: "Key texts", cell: (p) => p.keyTexts.join(" · "), style: { fontFamily: "var(--U)", fontSize: "13px", lineHeight: 1.7, color: "var(--ink-muted)" } },
  ];
  const label: CSSProperties = { background: "var(--bone-warm)", padding: "14px", fontFamily: "var(--U)", fontSize: "12px", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--mustard-text)" };

  return (
    <Layout>
      <SEOMeta
        title="Compare Christian Views on Disputed Doctrines"
        description="Pick any contested doctrine and see every position side by side: the one-line summary, the case each makes, its advocates, and its key texts."
        url="https://www.livewellbyjamesbell.co/theology/compare"
      />

      {/* One line under the title: a second one said the same thing again (walk 2026-11, finding 17). */}
      <InnerHead path="/theology/compare" title="Where Christians differ" line="Compare Christian views, side by side" plate="arch" />

      {/* FIRST: pick a doctrine. */}
      <section className="home-sec home-sec--dark lw-band-tight" aria-labelledby="tc-pick-title">
        <div className="home-wrap">
          <SectionHead dark icon={Scale} label={`${ready.length} doctrines`} title="Pick a doctrine." id="tc-pick-title" />
          <p className="lw-group__line" style={{ color: "var(--charcoal-fg-muted)" }}>
            Pick a doctrine and lay its views in a row. The same fair treatment as the full doctrine pages, arranged so you can scan the differences at a glance.
          </p>
          <label htmlFor="tc-doctrine" className="lw-find__label">
            Choose a doctrine
          </label>
          <select
            id="tc-doctrine"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            style={{ fontFamily: "var(--B)", fontSize: "17px", minHeight: "52px", padding: "12px 16px", borderRadius: "var(--radius-sm)", border: "1px solid var(--charcoal-line)", borderBottom: "2px solid var(--mustard)", background: "var(--charcoal-fg)", color: "var(--charcoal)", width: "min(560px, 100%)" }}
          >
            {ready.map((d) => <option key={d.slug} value={d.slug}>{d.title}</option>)}
          </select>
        </div>
      </section>

      <section className="home-sec" style={{ paddingLeft: "var(--gutter)", paddingRight: "var(--gutter)" }}>
        <div style={wrap}>
          {failed && <LoadFailed what="The comparison" onRetry={() => setNonce((n) => n + 1)} backHref={BACK.href} backLabel={`Back to ${BACK.name}`} />}
          {!doc && !failed && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", textAlign: "center", padding: "var(--s-6) 0" }} role="status">Loading…</p>}
          {doc && (
            <>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", marginBottom: "var(--s-4)" }}>
                <TriageBadge triage={doc.triage} withShort />
                <Link href={`/theology/doctrine/${doc.slug}`} className="btn--text" style={{ marginLeft: "auto" }}>Read the full doctrine →</Link>
              </div>

              {/* A laptop: one table, the views in columns. */}
              <div className="tc-table" style={{ overflowX: "auto", paddingBottom: "8px", WebkitOverflowScrolling: "touch" }}>
                <div role="table" aria-label={`${doc.title}: the views side by side`} style={{ display: "grid", gridTemplateColumns: `140px repeat(${doc.positions.length}, ${col})`, gap: "1px", background: "var(--border)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", minWidth: `${140 + doc.positions.length * 240}px` }}>
                  <div role="row" style={{ display: "contents" }}>
                    <div role="columnheader" style={{ ...label, background: "var(--charcoal)", color: "var(--mustard)", borderTop: "3px solid var(--mustard)" }}>View</div>
                    {doc.positions.map((p) => (
                      <div role="columnheader" key={p.name} style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "14px", fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, borderTop: "3px solid var(--mustard)" }}>{p.name}</div>
                    ))}
                  </div>
                  {rows.map((r) => (
                    <div role="row" key={r.label} style={{ display: "contents" }}>
                      <div role="rowheader" style={label}>{r.label}</div>
                      {doc.positions.map((p) => (
                        <div role="cell" key={p.name} style={{ background: "var(--card)", padding: "14px", ...r.style }}>{r.cell(p)}</div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              {/* A phone: each view as its own card, so no column stands empty. */}
              <ul className="tc-cards">
                {doc.positions.map((p) => (
                  <li key={p.name} className="tc-card">
                    <h2 className="tc-card__name">{p.name}</h2>
                    <dl>
                      {rows.map((r) => (
                        <div key={r.label}>
                          <dt>{r.label}</dt>
                          <dd style={r.style}>{r.cell(p)}</dd>
                        </div>
                      ))}
                    </dl>
                  </li>
                ))}
              </ul>
              <p style={{ fontFamily: "var(--B)", fontSize: "13px", color: "var(--ink-muted)", fontStyle: "italic", marginTop: "12px" }}>The case shown is the opening of each position's own statement. Read the full doctrine for the whole argument, the biblical evidence, and where the author lands.</p>
            </>
          )}
        </div>
      </section>

      {/* The six written comparisons, prose treatments of the pairings readers search for by name. */}
      <section className="home-sec home-sec--warm" aria-labelledby="tc-worked-title">
        <div className="home-wrap">
          <SectionHead icon={Scale} label="Six pairings" title="The worked comparisons." id="tc-worked-title" />
          <p className="lw-group__line">
            Six pairings written out in full — history, worship, doctrine, and
            what each tradition would say about the other, stated fairly.
          </p>
          <ul className="lw-index">
            {[
              { href: "/compare/catholic-vs-protestant", label: "Catholic vs. Protestant" },
              { href: "/compare/calvinism-vs-arminianism", label: "Calvinism vs. Arminianism" },
              { href: "/compare/baptist-vs-methodist", label: "Baptist vs. Methodist" },
              { href: "/compare/evangelical-vs-mainline", label: "Evangelical vs. Mainline" },
              { href: "/compare/orthodox-vs-catholic", label: "Orthodox vs. Catholic" },
              { href: "/compare/liturgical-vs-contemporary", label: "Liturgical vs. Contemporary worship" },
            ].map((c) => (
              <li key={c.href}>
                <LibCard item={{ href: c.href, title: c.label }} icon={Scale} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}

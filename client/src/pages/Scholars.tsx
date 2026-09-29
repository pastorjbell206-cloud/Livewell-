/**
 * /scholars. The index of named witnesses: every scholar, theologian, and
 * historical writer the site cites by name, A to Z, with the works cited, the
 * pages that cite each work, and the pages that discuss the person in the prose.
 *
 * Generated from the site's own citations by scripts/build-reference-indexes.mjs
 * (client/public/indexes/scholar-index.json). Nobody appears here who is not
 * cited somewhere on the site.
 */
import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Link } from "wouter";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { LoadFailed } from "@/components/LoadFailed";
import { fetchJson } from "@/lib/fetch-json";

interface PlaceRef {
  title: string;
  url: string;
  kind: string;
}
interface Work {
  title: string;
  year?: string;
  citedIn: PlaceRef[];
}
export interface Scholar {
  name: string;
  sortKey: string;
  works: Work[];
  discussedIn: PlaceRef[];
}
interface ScholarIndexData {
  scholars: Scholar[];
}

const isScholarIndex = (x: unknown): x is ScholarIndexData =>
  !!x && typeof x === "object" && Array.isArray((x as ScholarIndexData).scholars);

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const SHOWN = 6;

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const quietLink: CSSProperties = {
  color: "var(--ink)",
  textDecoration: "underline",
  textDecorationColor: "var(--mustard)",
  textUnderlineOffset: "3px",
  backgroundImage: "none",
};
const small: CSSProperties = { fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted)" };

export const letterOf = (s: Scholar) => {
  const c = (s.sortKey || s.name).charAt(0).toUpperCase();
  return LETTERS.includes(c) ? c : "#";
};

function initialLetter(): string | null {
  try {
    const h = typeof window !== "undefined" ? window.location.hash.replace(/^#/, "").toUpperCase() : "";
    return LETTERS.includes(h) ? h : null;
  } catch {
    return null;
  }
}

export default function Scholars() {
  const [data, setData] = useState<ScholarIndexData | null>(null);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [letter, setLetter] = useState<string | null>(initialLetter);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let stale = false;
    fetchJson("/indexes/scholar-index.json", isScholarIndex)
      .then((d) => {
        if (!stale) setData(d);
      })
      .catch(() => {
        if (!stale) setFailed(true);
      });
    return () => {
      stale = true;
    };
  }, [nonce]);

  const byLetter = useMemo(() => {
    const m = new Map<string, Scholar[]>();
    for (const s of data?.scholars ?? []) {
      const l = letterOf(s);
      if (!m.has(l)) m.set(l, []);
      m.get(l)!.push(s);
    }
    return m;
  }, [data]);

  const active = letter && byLetter.has(letter) ? letter : LETTERS.find((l) => byLetter.has(l)) ?? "A";
  const q = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (q.length < 2 || !data) return null;
    return data.scholars.filter((s) => s.name.toLowerCase().includes(q) || s.works.some((w) => w.title.toLowerCase().includes(q))).slice(0, 60);
  }, [q, data]);

  const choose = (l: string) => {
    setLetter(l);
    setQuery("");
    try {
      window.history.replaceState(null, "", `#${l.toLowerCase()}`);
    } catch {
      /* the letter still changes on screen */
    }
  };

  const total = data?.scholars.length ?? 0;
  const works = data?.scholars.reduce((n, s) => n + s.works.length, 0) ?? 0;
  const shown = results ?? byLetter.get(active) ?? [];

  return (
    <Layout>
      <SEOMeta
        title="Index of Scholars and Witnesses"
        description="Every scholar, theologian, and historical writer LiveWell cites by name, A to Z: the works cited, the pages that cite them, and where each is discussed."
        url="https://www.livewellbyjamesbell.co/scholars"
      />
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "14px" }}>
            Reference
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(2.3rem, 5.4vw, 3.8rem)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.05, color: "var(--ink)", margin: "0 0 16px" }}>
            Scholars and Witnesses
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "1.08rem", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "66ch", margin: 0 }}>
            The writing here leans on other people's work and names them when it does: church fathers and Reformers, historians and sociologists, believers and the unbelievers who pressed them hardest. This is the index of every one of them, with the works the site cites, the pages that cite each work, and the pages that take the person up in the argument itself.
          </p>
          <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", margin: "var(--s-3) 0 0" }}>
            {data ? `${total.toLocaleString()} named witnesses, ${works.toLocaleString()} works. ` : ""}
            <Link href="/scripture-index" style={quietLink}>
              The Scripture index
            </Link>
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
        <div style={wrap}>
          {failed && !data ? (
            <LoadFailed
              what="The index of scholars"
              onRetry={() => {
                setFailed(false);
                setNonce((n) => n + 1);
              }}
              backHref="/theology"
              backLabel="Theological Depth"
            />
          ) : !data ? (
            <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)", minHeight: "30vh" }}>Loading the index…</p>
          ) : (
            <>
              <label style={{ display: "block", maxWidth: "420px", marginBottom: "var(--s-3)" }}>
                <span style={{ ...small, display: "block", marginBottom: "6px" }}>Find a name or a title</span>
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Bonhoeffer, A Secular Age…"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontFamily: "var(--U)",
                    fontSize: "15px",
                    color: "var(--ink)",
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                  }}
                />
              </label>
              <nav aria-label="Letters" style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "var(--s-5)" }}>
                {LETTERS.map((l) => {
                  const has = byLetter.has(l);
                  const on = !results && l === active;
                  return (
                    <button
                      key={l}
                      type="button"
                      disabled={!has}
                      aria-pressed={on}
                      onClick={() => choose(l)}
                      style={{
                        minWidth: "36px",
                        minHeight: "36px",
                        fontFamily: "var(--U)",
                        fontSize: "14px",
                        fontWeight: 600,
                        color: has ? "var(--ink)" : "var(--ink-muted)",
                        background: on ? "var(--card)" : "transparent",
                        border: "1px solid var(--border)",
                        borderBottom: on ? "2px solid var(--mustard)" : "1px solid var(--border)",
                        borderRadius: "var(--radius-sm)",
                        cursor: has ? "pointer" : "default",
                        opacity: has ? 1 : 0.45,
                      }}
                    >
                      {l}
                    </button>
                  );
                })}
              </nav>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(1.6rem, 3.2vw, 2.1rem)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 var(--s-4)" }}>
                {results ? (results.length ? `Matching “${query.trim()}”` : `Nothing matches “${query.trim()}”`) : active}
              </h2>
              <div style={{ display: "grid", gap: "var(--s-4)" }}>
                {shown.map((s) => (
                  <ScholarEntry key={s.sortKey + s.name} s={s} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}

function PlaceLinks({ refs, label }: { refs: PlaceRef[]; label: string }) {
  const [all, setAll] = useState(false);
  const list = all ? refs : refs.slice(0, SHOWN);
  return (
    <p style={{ fontFamily: "var(--B)", fontSize: "14.5px", lineHeight: 1.6, color: "var(--ink-muted)", margin: "4px 0 0" }}>
      <span>{label} </span>
      {list.map((r, i) => (
        <span key={r.url}>
          {i > 0 ? "; " : ""}
          <Link href={r.url} style={quietLink}>
            {r.title}
          </Link>
        </span>
      ))}
      {refs.length > SHOWN && (
        <>
          {" "}
          <button
            type="button"
            onClick={() => setAll((v) => !v)}
            style={{ background: "none", border: "none", padding: 0, fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)", cursor: "pointer" }}
          >
            {all ? "Show fewer" : `and ${refs.length - SHOWN} more`}
          </button>
        </>
      )}
    </p>
  );
}

function ScholarEntry({ s }: { s: Scholar }) {
  const citing = new Set(s.works.flatMap((w) => w.citedIn.map((r) => r.url)));
  const elsewhere = s.discussedIn.filter((r) => !citing.has(r.url));
  return (
    <article style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)" }}>
      <h3 style={{ fontFamily: "var(--F)", fontSize: "1.45rem", fontWeight: 500, color: "var(--ink)", margin: "0 0 10px", lineHeight: 1.2 }}>{s.name}</h3>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "10px" }}>
        {s.works.map((w) => (
          <li key={w.title}>
            <span style={{ fontFamily: "var(--B)", fontSize: "15.5px", color: "var(--ink)", fontStyle: "italic" }}>{w.title}</span>
            {w.year && <span style={{ fontFamily: "var(--B)", fontSize: "14.5px", color: "var(--ink-muted)" }}>{` (${w.year})`}</span>}
            <PlaceLinks refs={w.citedIn} label="Cited in" />
          </li>
        ))}
      </ul>
      {elsewhere.length > 0 && (
        <div style={{ marginTop: "12px", paddingTop: "10px", borderTop: "1px solid var(--border)" }}>
          <PlaceLinks refs={elsewhere} label="Also discussed in" />
        </div>
      )}
    </article>
  );
}

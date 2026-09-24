/**
 * Notes (/notes). The short pieces: the Facebook-length posts, in order, with
 * nothing added. Content-as-data from client/public/notes/notes.json, filled
 * by scripts/import-facebook-notes.mjs from James's own posts and gated by
 * scripts/validate-notes.mjs. An empty library shows its empty state honestly
 * and points to the room where the notes are today.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { LoadFailed } from "@/components/LoadFailed";
import { fetchJson } from "@/lib/fetch-json";
import { CHANNELS } from "@/lib/channels";

const wrap = { maxWidth: "var(--w-content)", margin: "0 auto" } as const;

interface Note {
  id: string;
  date: string;
  text: string;
  source: "facebook" | "site";
  url?: string;
  scripture?: string;
}

const isNotesDoc = (x: unknown): x is { notes: Note[] } =>
  !!x && typeof x === "object" && Array.isArray((x as { notes?: unknown }).notes) &&
  (x as { notes: unknown[] }).notes.every(n => !!n && typeof n === "object" && typeof (n as Note).id === "string" && typeof (n as Note).text === "string" && typeof (n as Note).date === "string");

function longDate(iso: string): string {
  const d = new Date(`${iso}T12:00:00Z`);
  return Number.isNaN(d.getTime()) ? iso : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
}

export default function Notes() {
  const [notes, setNotes] = useState<Note[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [year, setYear] = useState<string>("all");

  useEffect(() => {
    let stale = false;
    fetchJson("/notes/notes.json", isNotesDoc)
      .then(d => { if (!stale) setNotes([...d.notes].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))); })
      .catch(() => { if (!stale) setFailed(true); });
    return () => { stale = true; };
  }, [nonce]);

  const years = useMemo(() => Array.from(new Set((notes ?? []).map(n => n.date.slice(0, 4)))).sort().reverse(), [notes]);
  const shown = useMemo(() => (notes ?? []).filter(n => year === "all" || n.date.startsWith(year)), [notes, year]);
  const facebook = CHANNELS.find(c => c.id === "facebook" && c.live);

  return (
    <Layout>
      <SEOMeta
        title="Notes"
        description="The short pieces James Bell writes most days: a paragraph for someone who needed one, kept here in order with nothing added. Facebook-length, pastor's voice."
        url="https://www.livewellbyjamesbell.co/notes"
      />

      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>Notes</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.2vw, 56px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "18px", maxWidth: "16ch" }}>
            The short pieces.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.75, color: "color-mix(in srgb, var(--charcoal-fg) 82%, transparent)", maxWidth: "58ch" }}>
            Most days James writes something the length of a breath: a paragraph for one person, posted where they would see it. The essays are the long argument. These are the sentences in between, kept in order, with nothing added.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          {failed ? (
            <LoadFailed what="The notes" onRetry={() => { setFailed(false); setNotes(null); setNonce(n => n + 1); }} backHref="/writing" backLabel="Back to the writing" />
          ) : notes === null ? (
            <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Loading the notes…</p>
          ) : notes.length === 0 ? (
            <div style={{ maxWidth: "52ch" }}>
              <p style={{ fontFamily: "var(--F)", fontSize: "26px", lineHeight: 1.3, color: "var(--ink)", marginBottom: "16px" }}>
                The notes are not here yet.
              </p>
              <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", marginBottom: "24px" }}>
                Until they are imported, the short pieces live where James posts them. Nothing here will be written in his name by anyone else.
              </p>
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                {facebook && (
                  <a href={facebook.url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--mustard-text)", backgroundImage: "none" }}>
                    Read them on Facebook →
                  </a>
                )}
                <Link href="/writing" style={{ fontFamily: "var(--U)", fontWeight: 600, fontSize: "14px", color: "var(--ink)", backgroundImage: "none" }}>
                  The essays →
                </Link>
              </div>
            </div>
          ) : (
            <>
              {years.length > 1 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "var(--s-4)" }}>
                  {["all", ...years].map(y => {
                    const on = y === year;
                    return (
                      <button key={y} type="button" onClick={() => setYear(y)} aria-pressed={on} style={{ cursor: "pointer", padding: "8px 14px", background: on ? "var(--mustard)" : "var(--card)", color: on ? "var(--charcoal)" : "var(--ink)", border: "1px solid var(--border)", fontFamily: "var(--U)", fontWeight: 600, fontSize: "13.5px" }}>
                        {y === "all" ? "All" : y}
                      </button>
                    );
                  })}
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: "var(--s-4)" }}>
                {shown.map(n => (
                  <article key={n.id} id={`note-${n.id}`} style={{ background: "var(--card)", border: "1px solid var(--border)", borderLeft: "2px solid var(--mustard)", padding: "var(--s-4)", borderRadius: "var(--radius-sm)" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap", marginBottom: "14px" }}>
                      <a href={`#note-${n.id}`} style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mustard-text)", textDecoration: "none", backgroundImage: "none" }}>
                        {longDate(n.date)}
                      </a>
                      {n.scripture && (
                        <span style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--ink-muted)" }}>{n.scripture}</span>
                      )}
                    </div>
                    {n.text.split(/\n{2,}/).map((p, i) => (
                      <p key={i} style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.75, color: "var(--ink)", maxWidth: "62ch", marginTop: i ? "1em" : 0 }}>
                        {p}
                      </p>
                    ))}
                    {n.url && (
                      <a href={n.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: "14px", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--mustard-text)", backgroundImage: "none" }}>
                        {n.source === "facebook" ? "On Facebook →" : "Source →"}
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </>
          )}

          <div style={{ marginTop: "var(--s-5)", borderTop: "1px solid var(--border)", paddingTop: "var(--s-3)", display: "flex", gap: "var(--s-4)", flexWrap: "wrap" }}>
            <Link href="/writing" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)", backgroundImage: "none" }}>All the writing</Link>
            <Link href="/substack" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)", backgroundImage: "none" }}>The newsletter</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

/**
 * The Passage Context Tool (/theology/passage) — the flagship tool of the
 * Theological Depth section. A reader enters any Bible reference and the tool
 * surrounds it with everything needed to read it in context rather than as a
 * free-floating verse: the passage with runway before and after, where it
 * sits, who wrote it and why, its genre and how that genre asks to be read,
 * the flow of the argument, cross-references, an interpretation spectrum that
 * links to the doctrine pages, and a fixed checklist of questions to carry to
 * any passage.
 *
 * Book metadata and genre guidance come from /theology/bible-books.json.
 * Contested-passage notes come from /theology/passage-notes.json. The passage
 * text itself is fetched at runtime from the public-domain World English Bible,
 * so the tool never stores or invents Scripture. If that fetch fails, every
 * teaching panel still renders and the reader is pointed to the reference.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { ChevronDown, Search } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { fetchJson } from "@/lib/fetch-json";
import { DOCTRINE_INDEX } from "@/lib/theology";

interface BookMeta {
  book: string; abbrevs: string[]; testament: "OT" | "NT"; chapters: number;
  genre: string; author: string; audience: string; occasion: string; date: string; summary: string;
}
interface BibleData { genres: Record<string, string>; books: BookMeta[]; }
interface Spectrum { note: string; doctrine: string; doctrineTitle: string; }
interface WordStudy { original: string; gloss: string; note: string; }
interface PassageNote {
  flow?: string;
  crossRefs?: string[];
  spectrum?: Spectrum;
  words?: WordStudy[];
  echoes?: string[];
  misreadings?: string[];
  prompts?: string[];
}
interface Verse { verse: number; text: string; }

// Parsing depends on the book list; a response without books is a failed load.
const isBibleData = (x: unknown): x is BibleData => {
  const d = x as BibleData;
  return !!d && typeof d === "object" && Array.isArray(d.books) && d.books.length > 0 &&
    !!d.genres && typeof d.genres === "object";
};

const isNotesFile = (x: unknown): x is Record<string, PassageNote> =>
  !!x && typeof x === "object" && !Array.isArray(x);

const QUESTIONS = [
  "What did it mean to the people it was first written to?",
  "What kind of writing is this, and how does that kind ask to be read?",
  "What comes right before and right after it?",
  "What does the rest of Scripture say about the same thing?",
  "Only then: what does it mean for me?",
];

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const cardStyle = { background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)" } as const;

function normalize(s: string) {
  return s.toLowerCase().replace(/\./g, "").replace(/\s+/g, " ").trim();
}

/** Resolve a free-text book token (name or abbreviation) to a book. */
function resolveBook(token: string, books: BookMeta[]): BookMeta | null {
  const t = normalize(token);
  if (!t) return null;
  for (const b of books) if (normalize(b.book) === t) return b;
  for (const b of books) if (b.abbrevs.some((a) => normalize(a) === t)) return b;
  for (const b of books) if (normalize(b.book).startsWith(t)) return b;
  for (const b of books) if (b.abbrevs.some((a) => normalize(a).startsWith(t)) && t.length >= 2) return b;
  return null;
}

interface Parsed { book: BookMeta; chapter: number; start?: number; end?: number; }

function parseReference(input: string, books: BookMeta[]): Parsed | null {
  const m = input.match(/^\s*([0-3]?\s*[A-Za-z.\s]+?)\s*(\d+)\s*(?::\s*(\d+)\s*(?:[-–]\s*(\d+))?)?\s*$/);
  if (!m) return null;
  const book = resolveBook(m[1], books);
  if (!book) return null;
  let chapter = parseInt(m[2], 10);
  // A single-chapter book with a lone number means a verse, not a chapter.
  let start = m[3] ? parseInt(m[3], 10) : undefined;
  let end = m[4] ? parseInt(m[4], 10) : undefined;
  if (book.chapters === 1 && !m[3]) { start = chapter; chapter = 1; }
  if (chapter < 1 || chapter > book.chapters) return null;
  return { book, chapter, start, end };
}

function Panel({ title, kicker, defaultOpen = false, children }: { title: string; kicker?: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ ...cardStyle, overflow: "hidden" }}>
      <button type="button" onClick={() => setOpen((o) => !o)} aria-expanded={open}
        style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", padding: "16px var(--s-4)", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}>
        <span>
          {kicker && <span style={{ display: "block", fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "4px" }}>{kicker}</span>}
          <span style={{ fontFamily: "var(--F)", fontSize: "21px", fontWeight: 500, color: "var(--ink)" }}>{title}</span>
        </span>
        <ChevronDown size={18} aria-hidden style={{ flexShrink: 0, color: "var(--ink-muted)", transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
      </button>
      {open && <div style={{ padding: "0 var(--s-4) var(--s-4)", borderTop: "1px solid var(--border)" }}>{children}</div>}
    </div>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ marginBottom: "14px" }}>
      <div className="eyebrow" style={{ marginBottom: "4px" }}>{label}</div>
      <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, color: "var(--ink)" }}>{value}</p>
    </div>
  );
}

export default function PassageContext() {
  const [data, setData] = useState<BibleData | null>(null);
  const [notes, setNotes] = useState<Record<string, PassageNote>>({});
  const [input, setInput] = useState("");
  const [parsed, setParsed] = useState<Parsed | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fallback picker state
  const [pickBook, setPickBook] = useState("Romans");
  const [pickChapter, setPickChapter] = useState(9);

  // Passage text fetch
  const [verses, setVerses] = useState<Verse[] | null>(null);
  const [textState, setTextState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [showFull, setShowFull] = useState(false);

  // Local data load, with its own error + retry. The attempt (retry nonce) that
  // failed is recorded; deriving `booksError` from it means Retry clears the
  // banner without extra state writes inside the effect.
  const [nonce, setNonce] = useState(0);
  const [failedNonce, setFailedNonce] = useState<number | null>(null);
  const booksError = failedNonce === nonce;

  useEffect(() => {
    let stale = false;
    fetchJson("/theology/bible-books.json", isBibleData)
      .then((d) => { if (!stale) setData(d); })
      .catch(() => { if (!stale) setFailedNonce(nonce); });
    // Passage notes are enrichment: every panel degrades gracefully without
    // them, so their failure never blocks the tool.
    fetchJson("/theology/passage-notes.json", isNotesFile)
      .then((d) => { if (!stale) setNotes(d); })
      .catch(() => {});
    return () => { stale = true; };
  }, [nonce]);

  const books = data?.books ?? [];
  const pickBookMeta = books.find((b) => b.book === pickBook);

  // Deep link: /theology/passage?ref=John 3:16 resolves automatically once the
  // book metadata has loaded, so search results and other pages can link in.
  // This is a genuine one-shot sync from an external source (the URL) after the
  // async book data arrives — it runs at most once (guarded by `parsed`), so the
  // synchronous setState is intentional, not a cascading-render risk.
  useEffect(() => {
    if (books.length === 0 || parsed) return;
    const ref = new URLSearchParams(window.location.search).get("ref");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (ref) { setInput(ref); resolve(parseReference(ref, books), ref); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books.length]);

  function resolve(p: Parsed | null, raw: string) {
    if (!p) {
      // If the book data never arrived, the reference is not the problem —
      // the banner below the form says what failed. Never blame the input.
      if (books.length === 0) {
        setError(booksError ? null : "Still loading the book data — try again in a moment.");
        return;
      }
      setError(`Could not read '${raw}'. Try a form like John 6:44 or Romans 9:14-18.`);
      return;
    }
    setError(null);
    setParsed(p);
    setShowFull(!p.start);
    fetchText(p);
  }

  function fetchText(p: Parsed) {
    setTextState("loading"); setVerses(null);
    const ref = `${p.book.book} ${p.chapter}`;
    fetch(`https://bible-api.com/${encodeURIComponent(ref)}?translation=web`)
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        const vs = Array.isArray(d?.verses) ? d.verses.map((v: any) => ({ verse: v.verse, text: String(v.text).trim() })) : [];
        if (vs.length === 0) { setTextState("error"); return; }
        setVerses(vs); setTextState("done");
      })
      .catch(() => setTextState("error"));
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    resolve(parseReference(input, books), input);
  }

  function onPick() {
    const b = books.find((x) => x.book === pickBook);
    if (!b) return;
    const p: Parsed = { book: b, chapter: Math.min(pickChapter, b.chapters) };
    setInput(`${b.book} ${p.chapter}`);
    resolve(p, `${b.book} ${p.chapter}`);
  }

  const note = useMemo(() => {
    if (!parsed) return undefined;
    return notes[`${parsed.book.book.toLowerCase()} ${parsed.chapter}`];
  }, [parsed, notes]);

  const genreNote = parsed && data ? data.genres[parsed.book.genre] : undefined;

  // Which verses to show: the focused window (range plus runway) or the whole chapter.
  const shown = useMemo(() => {
    if (!verses) return [];
    if (showFull || !parsed?.start) return verses;
    const lo = Math.max(1, parsed.start - 2);
    const hi = (parsed.end ?? parsed.start) + 2;
    return verses.filter((v) => v.verse >= lo && v.verse <= hi);
  }, [verses, showFull, parsed]);

  const refLabel = parsed
    ? `${parsed.book.book} ${parsed.chapter}${parsed.start ? `:${parsed.start}${parsed.end ? `-${parsed.end}` : ""}` : ""}`
    : "";

  return (
    <Layout>
      <SEOMeta
        title="The Passage Context Tool — Read Any Verse in Context"
        description="Enter any Bible reference and see it in context: who wrote it and why, its genre, the flow of the argument, cross-references, and the questions to ask of it."
        url="https://www.livewellbyjamesbell.co/theology/passage"
      />

      {/* HERO + INPUT */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "16px", color: "var(--mustard)" }}>
            <Link href="/theology" style={{ color: "inherit" }}>Theological Depth</Link> · Passage Context Tool
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "18ch" }}>
            Never read a verse alone again.
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.78)", maxWidth: "60ch", marginBottom: "24px" }}>
            A verse pulled out of its context can be made to say almost anything. Enter any reference and this tool puts it back where it belongs: inside its paragraph, its book, its author's purpose, and the wider witness of Scripture. It will not tell you what a contested passage means. It will teach you the questions to ask.
          </p>

          <form onSubmit={onSubmit} style={{ display: "flex", flexWrap: "wrap", gap: "10px", maxWidth: "560px" }}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g. John 6:44 or Romans 9:14-18"
              aria-label="Bible reference"
              style={{ flex: "1 1 280px", fontFamily: "var(--B)", fontSize: "16px", padding: "12px 16px", borderRadius: "var(--radius-sm)", border: "1px solid rgba(245,240,230,0.3)", background: "var(--bone)", color: "var(--ink)" }}
            />
            <button type="submit" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, padding: "12px 22px", borderRadius: "var(--radius-sm)", border: "none", background: "var(--mustard)", color: "var(--charcoal)", cursor: "pointer" }}>
              <Search size={16} aria-hidden /> Read in context
            </button>
          </form>

          {/* Fallback picker */}
          {books.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center", marginTop: "14px" }}>
              <span style={{ fontFamily: "var(--U)", fontSize: "12px", color: "rgba(245,240,230,0.6)" }}>or pick</span>
              <select value={pickBook} onChange={(e) => { setPickBook(e.target.value); setPickChapter(1); }}
                style={{ fontFamily: "var(--B)", fontSize: "14px", padding: "8px 10px", borderRadius: "var(--radius-sm)", border: "1px solid rgba(245,240,230,0.3)", background: "var(--bone)", color: "var(--ink)" }}>
                {books.map((b) => <option key={b.book} value={b.book}>{b.book}</option>)}
              </select>
              <select value={pickChapter} onChange={(e) => setPickChapter(parseInt(e.target.value, 10))}
                style={{ fontFamily: "var(--B)", fontSize: "14px", padding: "8px 10px", borderRadius: "var(--radius-sm)", border: "1px solid rgba(245,240,230,0.3)", background: "var(--bone)", color: "var(--ink)" }}>
                {Array.from({ length: pickBookMeta?.chapters ?? 1 }, (_, i) => i + 1).map((c) => <option key={c} value={c}>Chapter {c}</option>)}
              </select>
              <button type="button" onClick={onPick}
                style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, padding: "8px 16px", borderRadius: "var(--radius-sm)", border: "1px solid var(--mustard)", background: "transparent", color: "var(--mustard)", cursor: "pointer" }}>
                Go
              </button>
            </div>
          )}
          {/* Curated, deeply worked passages */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center", marginTop: "14px" }}>
            <span style={{ fontFamily: "var(--U)", fontSize: "12px", color: "rgba(245,240,230,0.6)" }}>Worked in depth:</span>
            {["Jeremiah 29:11", "Philippians 4:13", "Micah 6:8"].map((r) => (
              <button key={r} type="button" onClick={() => { setInput(r); resolve(parseReference(r, books), r); }}
                style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, padding: "6px 14px", borderRadius: "999px", border: "1px solid var(--mustard)", background: "rgba(212,160,23,0.14)", color: "var(--mustard)", cursor: "pointer" }}>
                {r}
              </button>
            ))}
          </div>
          {error && <p style={{ fontFamily: "var(--B)", fontSize: "14px", color: "var(--mustard)", marginTop: "12px" }}>{error}</p>}
          {booksError && (
            <div role="alert" style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap", marginTop: "12px" }}>
              <p style={{ fontFamily: "var(--B)", fontSize: "14px", color: "var(--mustard)", margin: 0 }}>
                The tool's book data didn't load — a connection problem, not your reference.
              </p>
              <button type="button" onClick={() => setNonce((n) => n + 1)}
                style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, padding: "6px 14px", borderRadius: "var(--radius-sm)", border: "1px solid var(--mustard)", background: "transparent", color: "var(--mustard)", cursor: "pointer" }}>
                Try again
              </button>
            </div>
          )}
        </div>
      </section>

      {/* RESULTS */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
        <div style={{ ...wrap, display: "flex", flexDirection: "column", gap: "12px" }}>
          {!parsed && (
            <div style={{ ...cardStyle, padding: "var(--s-5)" }}>
              <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "10px" }}>The five questions</div>
              <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "64ch", marginBottom: "16px" }}>
                Every time you open the Bible, these are the questions a careful reader asks, in this order. Enter a passage above and the tool will walk you through the first four before you ever get to the fifth.
              </p>
              <ol style={{ margin: 0, paddingLeft: "22px", fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.9, color: "var(--ink)" }}>
                {QUESTIONS.map((q, i) => <li key={i}>{q}</li>)}
              </ol>
            </div>
          )}

          {parsed && (
            <>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "8px", marginBottom: "4px" }}>
                <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(26px, 4vw, 38px)", fontWeight: 400, color: "var(--ink)", letterSpacing: "-0.02em" }}>{refLabel}</h2>
                <span style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--mustard-text)" }}>{parsed.book.genre} · {parsed.book.testament === "OT" ? "Old Testament" : "New Testament"}</span>
              </div>

              {/* 1. THE PASSAGE */}
              <Panel title="The passage, with room around it" kicker="Read it first" defaultOpen>
                {textState === "loading" && <p style={{ fontFamily: "var(--U)", color: "var(--ink-muted)", padding: "16px 0" }}>Loading the text…</p>}
                {textState === "error" && (
                  <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", paddingTop: "16px" }}>
                    The passage text could not be loaded right now. Open your own Bible to {refLabel} and read a few verses before and after it. Everything below still works.
                  </p>
                )}
                {textState === "done" && verses && (
                  <>
                    <div style={{ paddingTop: "16px", fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.8, color: "var(--ink)", maxWidth: "68ch" }}>
                      {shown.map((v) => {
                        const inRange = parsed.start != null && v.verse >= parsed.start && v.verse <= (parsed.end ?? parsed.start);
                        return (
                          <span key={v.verse} style={{ background: inRange ? "rgba(212,160,23,0.18)" : "transparent", borderRadius: "3px", padding: inRange ? "1px 2px" : 0 }}>
                            <sup style={{ fontFamily: "var(--U)", fontSize: "11px", color: "var(--mustard-text)", fontWeight: 700, marginRight: "3px" }}>{v.verse}</sup>
                            {v.text}{" "}
                          </span>
                        );
                      })}
                    </div>
                    {parsed.start && (
                      <button type="button" onClick={() => setShowFull((s) => !s)}
                        style={{ marginTop: "16px", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, padding: "8px 16px", borderRadius: "999px", border: "1px solid var(--border)", background: "transparent", color: "var(--ink)", cursor: "pointer" }}>
                        {showFull ? "Narrow to the passage" : "Widen to the whole chapter"}
                      </button>
                    )}
                    <p style={{ fontFamily: "var(--U)", fontSize: "11px", color: "var(--ink-muted)", marginTop: "12px" }}>World English Bible, public domain.</p>
                  </>
                )}
              </Panel>

              {/* 2. WHERE IT SITS */}
              <Panel title="Where it sits" kicker="The neighborhood" defaultOpen>
                <div style={{ paddingTop: "16px" }}>
                  <MetaRow label="The book" value={parsed.book.book} />
                  <MetaRow label="What is happening around here" value={parsed.book.summary} />
                </div>
              </Panel>

              {/* 3. WHO WROTE IT, TO WHOM, WHY */}
              <Panel title="Who wrote it, to whom, and why" kicker="Written to someone first">
                <div style={{ paddingTop: "16px" }}>
                  <MetaRow label="Author" value={parsed.book.author} />
                  <MetaRow label="First audience" value={parsed.book.audience} />
                  <MetaRow label="Occasion" value={parsed.book.occasion} />
                  <MetaRow label="When" value={parsed.book.date} />
                </div>
              </Panel>

              {/* 4. GENRE */}
              <Panel title={`Genre: ${parsed.book.genre.toLowerCase()}`} kicker="How this kind of writing asks to be read">
                <p style={{ paddingTop: "16px", fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.75, color: "var(--ink)", maxWidth: "68ch" }}>{genreNote}</p>
              </Panel>

              {/* 5. FLOW OF THE ARGUMENT (if noted) */}
              {note?.flow && (
                <Panel title="The flow of the argument" kicker="What it is concluding from, and arguing toward" defaultOpen>
                  <p style={{ paddingTop: "16px", fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.75, color: "var(--ink)", maxWidth: "68ch" }}>{note.flow}</p>
                </Panel>
              )}

              {/* 5b. KEY WORDS (if noted) */}
              {note?.words && note.words.length > 0 && (
                <Panel title="Key words in the original" kicker="Grammar and language">
                  <ul style={{ paddingTop: "16px", margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                    {note.words.map((w, i) => (
                      <li key={i} style={{ background: "var(--bone-warm)", borderRadius: "var(--radius-sm)", padding: "12px 14px" }}>
                        <span style={{ fontFamily: "var(--F)", fontSize: "17px", fontWeight: 500, color: "var(--ink)" }}>{w.original}</span>
                        <span style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--mustard-text)" }}>{`  ·  ${w.gloss}`}</span>
                        <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.65, color: "var(--ink-muted)", marginTop: "4px" }}>{w.note}</p>
                      </li>
                    ))}
                  </ul>
                </Panel>
              )}

              {/* 6. CROSS-REFERENCES (if noted) */}
              {note?.crossRefs && note.crossRefs.length > 0 && (
                <Panel title="What the rest of Scripture says" kicker="Cross-references">
                  <div style={{ paddingTop: "16px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {note.crossRefs.map((r) => (
                      <button key={r} type="button" onClick={() => { setInput(r); resolve(parseReference(r, books), r); window.scrollTo({ top: 0, behavior: "smooth" }); }}
                        style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, padding: "8px 14px", borderRadius: "999px", border: "1px solid var(--mustard)", background: "rgba(212,160,23,0.10)", color: "var(--mustard-text)", cursor: "pointer" }}>
                        {r}
                      </button>
                    ))}
                  </div>
                </Panel>
              )}

              {/* 6b. ECHOES ACROSS SCRIPTURE (if noted) */}
              {note?.echoes && note.echoes.length > 0 && (
                <Panel title="Echoes across Scripture" kicker="The same thread elsewhere">
                  <ul style={{ paddingTop: "16px", margin: 0, paddingLeft: "20px", fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.8, color: "var(--ink)" }}>
                    {note.echoes.map((e, i) => <li key={i}>{e}</li>)}
                  </ul>
                </Panel>
              )}

              {/* 7. INTERPRETATION SPECTRUM (if noted) */}
              {note?.spectrum && (
                <Panel title="Where this passage is contested" kicker="The interpretation spectrum" defaultOpen>
                  <div style={{ paddingTop: "16px" }}>
                    <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.75, color: "var(--ink)", maxWidth: "68ch", marginBottom: "14px" }}>{note.spectrum.note}</p>
                    {DOCTRINE_INDEX.find((d) => d.slug === note.spectrum!.doctrine && d.ready) ? (
                      <Link href={`/theology/doctrine/${note.spectrum.doctrine}`}
                        style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--mustard-text)" }}>
                        See the views laid out fairly: {note.spectrum.doctrineTitle} →
                      </Link>
                    ) : (
                      <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", fontStyle: "italic" }}>
                        The doctrine page for {note.spectrum.doctrineTitle} is still being written.
                      </span>
                    )}
                  </div>
                </Panel>
              )}

              {/* 7b. COMMON MISREADINGS (if noted) */}
              {note?.misreadings && note.misreadings.length > 0 && (
                <Panel title="Common misreadings" kicker="Read with care" defaultOpen>
                  <ul style={{ paddingTop: "16px", margin: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                    {note.misreadings.map((m, i) => (
                      <li key={i} style={{ display: "flex", gap: "10px", fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink)" }}>
                        <span aria-hidden style={{ color: "var(--mustard-text)", fontWeight: 700, flexShrink: 0 }}>▹</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </Panel>
              )}

              {/* 7c. CURATED PROMPTS (if noted) — now you do the work */}
              {note?.prompts && note.prompts.length > 0 && (
                <div style={{ ...cardStyle, background: "var(--bone-warm)", borderLeft: "3px solid var(--mustard)", padding: "var(--s-4)" }}>
                  <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>Now you do the work</div>
                  <h3 style={{ fontFamily: "var(--F)", fontSize: "21px", fontWeight: 500, color: "var(--ink)", marginBottom: "12px" }}>Questions to sit with</h3>
                  <ol style={{ margin: 0, paddingLeft: "22px", fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.9, color: "var(--ink)" }}>
                    {note.prompts.map((p, i) => <li key={i}>{p}</li>)}
                  </ol>
                </div>
              )}

              {/* 8. QUESTIONS TO ASK */}
              <Panel title="Questions to carry to any passage" kicker="The habit to build" defaultOpen={!note?.prompts}>
                <ol style={{ paddingTop: "16px", margin: 0, paddingLeft: "22px", fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.9, color: "var(--ink)" }}>
                  {QUESTIONS.map((q, i) => <li key={i}>{q}</li>)}
                </ol>
              </Panel>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}

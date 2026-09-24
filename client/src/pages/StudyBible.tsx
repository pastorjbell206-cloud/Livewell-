/**
 * /study/bible — the Study Bible (docs/STUDY-BIBLE-PROMPT.md, Phase 1).
 *
 *   /study/bible                     every book, by testament
 *   /study/bible/:book               the book's chapters
 *   /study/bible/:book/:chapter      the reader: Berean Standard Bible text, a
 *                                    word-by-word Hebrew or Greek interlinear,
 *                                    and a study panel for any verse or word
 *
 * Data comes from /bible/* (scripts/build-bible.mjs): licensed sources only,
 * credited at the foot of every page. Nothing here is written from memory.
 */
import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { Link, useRoute } from "wouter";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { LoadFailed } from "@/components/LoadFailed";
import { readStoredJSON, writeStoredJSON } from "@/lib/storage";
import { fetchCatalogue, type CatalogueItem } from "@/lib/catalogue";
import {
  chapterHref,
  editionSplit,
  expandGrammar,
  fetchBooks,
  fetchChapter,
  fetchMorph,
  langOf,
  lookupLex,
  parseRef,
  safeDefinition,
  type BibleBook,
  type BibleChapter,
  type BibleVerse,
  type BibleWord,
  type LexEntry,
} from "@/lib/bible";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const HEB: CSSProperties = { fontFamily: '"SBL Hebrew", "Ezra SIL", "Taamey Frank CLM", "Times New Roman", serif', direction: "rtl" };
const GRK: CSSProperties = { fontFamily: '"SBL Greek", "Gentium Plus", "Times New Roman", serif' };
const MODE_KEY = "livewell-studybible-mode";

const LATER_NOTE = "The earliest Greek manuscripts do not include this verse, and the Berean Standard Bible leaves it out. Later manuscripts, and translations such as the King James Version, include it.";

type Mode = "reading" | "interlinear";
type Selection = { kind: "verse"; verse: BibleVerse } | { kind: "word"; verse: BibleVerse; index: number } | null;

function useBooks() {
  const [books, setBooks] = useState<BibleBook[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);
  useEffect(() => {
    let stale = false;
    fetchBooks().then((b) => { if (!stale) setBooks(b); }).catch(() => { if (!stale) setFailed(true); });
    return () => { stale = true; };
  }, [nonce]);
  return { books, failed, retry: () => { setFailed(false); setNonce((n) => n + 1); } };
}

export default function StudyBible() {
  const [, chapterParams] = useRoute("/study/bible/:book/:chapter");
  const [, bookParams] = useRoute("/study/bible/:book");
  const { books, failed, retry } = useBooks();

  const slug = chapterParams?.book ?? bookParams?.book;
  const book = books?.find((b) => b.slug === slug);
  const chapterNum = chapterParams ? parseInt(chapterParams.chapter, 10) : NaN;

  return (
    <Layout>
      <SEOMeta
        title="The Study Bible: Hebrew, Greek, and Every Word Explained"
        description="Read the whole Bible with the Hebrew and Greek beneath every word: dictionary meanings, grammar in plain English, every occurrence, cross-references, and the context guides that open each passage."
        url="https://www.livewellbyjamesbell.co/study/bible"
      />
      {failed && !books ? (
        <div style={{ padding: "var(--s-6) var(--s-4)" }}>
          <LoadFailed what="The Study Bible" onRetry={retry} backHref="/study" backLabel="Back to Study" />
        </div>
      ) : !books ? (
        <p role="status" style={{ ...wrap, padding: "var(--s-6) var(--s-4)", fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Opening the Study Bible…</p>
      ) : slug && !book ? (
        <div style={{ ...wrap, padding: "var(--s-6) var(--s-4)" }}>
          <p style={{ fontFamily: "var(--B)" }}>That book isn't in the Bible's table of contents.</p>
          <Link href="/study/bible" style={{ color: "var(--ink)", fontWeight: 600 }}>All the books</Link>
        </div>
      ) : book && Number.isFinite(chapterNum) ? (
        <Reader books={books} book={book} chapter={chapterNum} />
      ) : book ? (
        <ChapterGrid book={book} />
      ) : (
        <BookIndex books={books} />
      )}
      <Credits />
    </Layout>
  );
}

// ── index pages ──────────────────────────────────────────────────────────────

function Hero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-4)" }}>
      <div style={wrap}>
        <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "12px" }}>{eyebrow}</div>
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(2.1rem, 4.8vw, 3.2rem)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.08, color: "var(--ink)", margin: "0 0 12px" }}>{title}</h1>
        {children}
      </div>
    </section>
  );
}

function BookIndex({ books }: { books: BibleBook[] }) {
  const groups: [string, BibleBook[]][] = [
    ["The Old Testament", books.filter((b) => b.testament === "OT")],
    ["The New Testament", books.filter((b) => b.testament === "NT")],
  ];
  return (
    <>
      <Hero eyebrow="The Study Bible" title="Read it the way scholars do">
        <p style={{ fontFamily: "var(--B)", fontSize: "1.05rem", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "64ch", margin: 0 }}>
          Every chapter of Scripture, with the Hebrew and Greek beneath every word. Tap a word for its dictionary meaning, its grammar in plain English, and everywhere else it appears. Tap a verse for its cross-references and the guides that open its world.
        </p>
      </Hero>
      <section style={{ background: "var(--bone)", padding: "0 var(--s-4) var(--s-6)" }}>
        <div style={{ ...wrap, display: "grid", gap: "var(--s-5)" }}>
          {groups.map(([label, list]) => (
            <div key={label}>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "1.6rem", fontWeight: 400, color: "var(--ink)", margin: "0 0 12px" }}>{label}</h2>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "8px" }}>
                {list.map((b) => (
                  <li key={b.code}>
                    <Link href={`/study/bible/${b.slug}`} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", minHeight: "44px", padding: "8px 12px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", color: "var(--ink)", textDecoration: "none", fontFamily: "var(--U)", fontSize: "14px" }}>
                      <span>{b.name}</span>
                      <span style={{ color: "var(--ink-muted)", fontSize: "12px" }}>{b.chapters}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function ChapterGrid({ book }: { book: BibleBook }) {
  return (
    <>
      <Hero eyebrow={book.testament === "OT" ? "The Old Testament" : "The New Testament"} title={book.name}>
        <p style={{ margin: 0, fontFamily: "var(--U)", fontSize: "14px" }}>
          <Link href="/study/bible" style={{ color: "var(--ink)", textDecoration: "underline", textDecorationColor: "var(--mustard)", textUnderlineOffset: "4px", backgroundImage: "none" }}>All the books</Link>
        </p>
      </Hero>
      <section style={{ background: "var(--bone)", padding: "0 var(--s-4) var(--s-6)" }}>
        <ul aria-label={`Chapters of ${book.name}`} style={{ ...wrap, listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(56px, 1fr))", gap: "8px" }}>
          {Array.from({ length: book.chapters }, (_, i) => i + 1).map((n) => (
            <li key={n}>
              <Link href={chapterHref(book.slug, n)} aria-label={`${book.name} chapter ${n}`} style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "48px", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", color: "var(--ink)", textDecoration: "none", fontFamily: "var(--U)", fontSize: "15px" }}>
                {n}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

// ── the reader ───────────────────────────────────────────────────────────────

function useWide(minWidth = 1000) {
  const [wide, setWide] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    const on = () => setWide(mq.matches);
    on();
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, [minWidth]);
  return wide;
}

function Reader({ books, book, chapter }: { books: BibleBook[]; book: BibleBook; chapter: number }) {
  // Each loaded chapter and each selection carries the chapter it belongs to,
  // so moving to another chapter shows nothing stale without resetting state
  // inside an effect.
  const key = `${book.slug}/${chapter}`;
  const [loaded, setLoaded] = useState<{ key: string; data: BibleChapter } | null>(null);
  const [failedKey, setFailedKey] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);
  const [mode, setMode] = useState<Mode>(() => readStoredJSON<Mode>(MODE_KEY, (x): x is Mode => x === "reading" || x === "interlinear", "reading"));
  const [picked, setPicked] = useState<{ key: string; sel: Selection } | null>(null);
  const wide = useWide();
  const lang = book.testament === "OT" ? "H" : "G";
  const valid = chapter >= 1 && chapter <= book.chapters;
  const data = loaded?.key === key ? loaded.data : null;
  const failed = failedKey === key;

  useEffect(() => {
    if (!valid) return;
    let stale = false;
    fetchChapter(book.slug, chapter)
      .then((d) => { if (!stale) setLoaded({ key: `${book.slug}/${chapter}`, data: d }); })
      .catch(() => { if (!stale) setFailedKey(`${book.slug}/${chapter}`); });
    return () => { stale = true; };
  }, [book.slug, chapter, nonce, valid]);

  // A #v16 link opens that verse until the reader picks something else.
  const hashVerse = useMemo(() => {
    if (!data || typeof window === "undefined") return null;
    const m = window.location.hash.match(/^#v(\d+)$/);
    return m ? data.verses.find((x) => x.v === +m[1]) ?? null : null;
  }, [data]);
  const sel: Selection = picked?.key === key ? picked.sel : hashVerse ? { kind: "verse", verse: hashVerse } : null;
  const setSel = (s: Selection) => setPicked({ key, sel: s });

  useEffect(() => {
    if (hashVerse) requestAnimationFrame(() => document.getElementById(`v${hashVerse.v}`)?.scrollIntoView({ block: "center" }));
  }, [hashVerse]);

  const changeMode = (m: Mode) => {
    setMode(m);
    writeStoredJSON(MODE_KEY, m);
  };

  const bookIdx = books.findIndex((b) => b.code === book.code);
  const prev = chapter > 1 ? { slug: book.slug, ch: chapter - 1 } : bookIdx > 0 ? { slug: books[bookIdx - 1].slug, ch: books[bookIdx - 1].chapters } : null;
  const next = chapter < book.chapters ? { slug: book.slug, ch: chapter + 1 } : bookIdx < books.length - 1 ? { slug: books[bookIdx + 1].slug, ch: 1 } : null;

  if (!valid) {
    return (
      <div style={{ ...wrap, padding: "var(--s-6) var(--s-4)" }}>
        <p style={{ fontFamily: "var(--B)" }}>{book.name} has {book.chapters} chapter{book.chapters === 1 ? "" : "s"}.</p>
        <Link href={`/study/bible/${book.slug}`} style={{ color: "var(--ink)", fontWeight: 600 }}>Choose a chapter</Link>
      </div>
    );
  }

  const panel = sel && data ? <StudyPanel books={books} book={book} chapter={chapter} sel={sel} setSel={setSel} lang={lang} onClose={() => setSel(null)} /> : null;

  return (
    <>
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-3)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ ...wrap, display: "flex", flexWrap: "wrap", alignItems: "flex-end", justifyContent: "space-between", gap: "14px" }}>
          <div>
            <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>
              <Link href="/study/bible" style={{ color: "inherit", textDecoration: "none", backgroundImage: "none" }}>The Study Bible</Link>
            </div>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(2rem, 4.5vw, 2.8rem)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.05, color: "var(--ink)", margin: 0 }}>
              <Link href={`/study/bible/${book.slug}`} style={{ color: "inherit", textDecoration: "none", backgroundImage: "none" }}>{book.name}</Link> {chapter}
            </h1>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
            <div role="group" aria-label="How to show the text" style={{ display: "inline-flex", border: "1px solid var(--border)", borderRadius: "999px", overflow: "hidden" }}>
              {(["reading", "interlinear"] as Mode[]).map((m) => (
                <button key={m} type="button" aria-pressed={mode === m} onClick={() => changeMode(m)} style={{ minHeight: "40px", padding: "0 16px", border: "none", cursor: "pointer", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, background: mode === m ? "var(--ink)" : "var(--card)", color: mode === m ? "var(--bone)" : "var(--ink)" }}>
                  {m === "reading" ? "Reading" : book.testament === "OT" ? "Hebrew" : "Greek"}
                </button>
              ))}
            </div>
            <nav aria-label="Chapters" style={{ display: "inline-flex", gap: "6px" }}>
              {prev ? <NavBtn href={chapterHref(prev.slug, prev.ch)} label="Previous chapter"><ChevronLeft size={18} /></NavBtn> : null}
              {next ? <NavBtn href={chapterHref(next.slug, next.ch)} label="Next chapter"><ChevronRight size={18} /></NavBtn> : null}
            </nav>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={{ ...wrap, display: "flex", gap: "var(--s-5)", alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 0", minWidth: 0 }}>
            {failed && !data ? (
              <LoadFailed what={`${book.name} ${chapter}`} onRetry={() => { setFailedKey(null); setNonce((n) => n + 1); }} backHref={`/study/bible/${book.slug}`} backLabel={`All of ${book.name}`} />
            ) : !data ? (
              <p role="status" style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Opening {book.name} {chapter}…</p>
            ) : mode === "reading" ? (
              <ReadingText data={data} sel={sel} onVerse={(v) => setSel({ kind: "verse", verse: v })} />
            ) : (
              <Interlinear data={data} lang={lang} sel={sel} onVerse={(v) => setSel({ kind: "verse", verse: v })} onWord={(v, i) => setSel({ kind: "word", verse: v, index: i })} />
            )}
            {data && (
              <p style={{ marginTop: "var(--s-5)", fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", maxWidth: "68ch" }}>
                Tap a verse number to study the verse{mode === "interlinear" ? ", or any word to study the word" : `. Switch to ${lang === "H" ? "Hebrew" : "Greek"} to see every word beneath the English`}.
              </p>
            )}
          </div>
          {wide && (
            <aside aria-label="Study panel" style={{ flex: "0 0 380px", position: "sticky", top: "88px", maxHeight: "calc(100vh - 110px)", overflowY: "auto", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)" }}>
              {panel ?? <p style={{ margin: 0, fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink-muted)" }}>Choose a verse number or a word, and its study opens here.</p>}
            </aside>
          )}
        </div>
      </section>

      {!wide && panel && (
        <aside aria-label="Study panel" style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 60, maxHeight: "72vh", overflowY: "auto", background: "var(--card)", borderTop: "2px solid var(--mustard)", boxShadow: "0 -8px 30px rgba(0,0,0,0.18)", padding: "var(--s-4)" }}>
          {panel}
        </aside>
      )}
    </>
  );
}

function NavBtn({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <Link href={href} aria-label={label} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "40px", height: "40px", border: "1px solid var(--border)", borderRadius: "999px", background: "var(--card)", color: "var(--ink)", backgroundImage: "none" }}>
      {children}
    </Link>
  );
}

const verseNumStyle = (active: boolean): CSSProperties => ({
  border: "none",
  background: active ? "var(--mustard)" : "transparent",
  color: active ? "var(--charcoal)" : "var(--mustard-text)",
  fontFamily: "var(--U)",
  fontSize: "12px",
  fontWeight: 700,
  padding: "2px 5px",
  marginRight: "4px",
  borderRadius: "4px",
  cursor: "pointer",
  verticalAlign: "super",
  lineHeight: 1,
  minWidth: "24px",
  minHeight: "24px",
});

function ReadingText({ data, sel, onVerse }: { data: BibleChapter; sel: Selection; onVerse: (v: BibleVerse) => void }) {
  return (
    <div style={{ maxWidth: "68ch", fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.85, color: "var(--ink)" }}>
      {data.verses.map((v) => (
        <span key={v.v} id={`v${v.v}`} style={{ scrollMarginTop: "100px", background: sel?.verse.v === v.v ? "var(--bone-warm)" : "transparent" }}>
          <button type="button" aria-label={`Study verse ${v.v}`} onClick={() => onVerse(v)} style={verseNumStyle(sel?.verse.v === v.v)}>{v.v}</button>
          {v.t || <span style={{ fontFamily: "var(--U)", fontSize: "14px", fontStyle: "italic", color: "var(--ink-muted)" }}>[Not in the earliest manuscripts]</span>}{" "}
        </span>
      ))}
    </div>
  );
}

function Interlinear({ data, lang, sel, onVerse, onWord }: { data: BibleChapter; lang: "H" | "G"; sel: Selection; onVerse: (v: BibleVerse) => void; onWord: (v: BibleVerse, i: number) => void }) {
  const script = lang === "H" ? HEB : GRK;
  return (
    <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "var(--s-4)" }}>
      {data.verses.map((v) => (
        <li key={v.v} id={`v${v.v}`} style={{ scrollMarginTop: "100px", paddingBottom: "var(--s-3)", borderBottom: "1px solid var(--border)" }}>
          <p style={{ margin: "0 0 10px", fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", maxWidth: "68ch" }}>
            <button type="button" aria-label={`Study verse ${v.v}`} onClick={() => onVerse(v)} style={verseNumStyle(sel?.verse.v === v.v && sel.kind === "verse")}>{v.v}</button>
            {v.t || <span style={{ fontStyle: "italic", color: "var(--ink-muted)" }}>{LATER_NOTE}</span>}
          </p>
          {v.w.length === 0 ? (
            <p style={{ margin: 0, fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>
              Hebrew and English Bibles number this passage differently; the {lang === "H" ? "Hebrew" : "Greek"} for this verse sits under a neighboring verse number.
            </p>
          ) : (
            <div dir={lang === "H" ? "rtl" : "ltr"} lang={lang === "H" ? "he" : "grc"} style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {v.w.map((w, i) => {
                const active = sel?.kind === "word" && sel.verse.v === v.v && sel.index === i;
                return (
                  <button key={i} type="button" onClick={() => onWord(v, i)} aria-label={`${w[0]}, ${w[2] || "word"}: study this word`} style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "2px", padding: "6px 8px", minWidth: "44px", background: active ? "var(--bone-warm)" : "var(--card)", border: active ? "1px solid var(--mustard)" : "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer", position: "relative" }}>
                    <span style={{ ...script, fontSize: lang === "H" ? "22px" : "19px", lineHeight: 1.3, color: "var(--ink)" }}>{w[0]}</span>
                    <span dir="ltr" style={{ fontFamily: "var(--U)", fontSize: "11px", fontStyle: "italic", color: "var(--ink-muted)" }}>{w[1]}</span>
                    <span dir="ltr" style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--ink)" }}>{w[2]}</span>
                    {w[5] && <span aria-label="differs between Greek editions" title="Differs between Greek editions" style={{ position: "absolute", top: "4px", right: "4px", width: "6px", height: "6px", borderRadius: "50%", background: "var(--mustard)" }} />}
                  </button>
                );
              })}
            </div>
          )}
        </li>
      ))}
    </ol>
  );
}

// ── the study panel ──────────────────────────────────────────────────────────

const panelH = { fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "var(--mustard-text)", margin: "var(--s-4) 0 8px" };
const quietLink: CSSProperties = { color: "var(--ink)", textDecoration: "underline", textDecorationColor: "var(--mustard)", textUnderlineOffset: "3px", backgroundImage: "none" };

function StudyPanel(props: { books: BibleBook[]; book: BibleBook; chapter: number; sel: NonNullable<Selection>; setSel: (s: Selection) => void; lang: "H" | "G"; onClose: () => void }) {
  const { sel, onClose } = props;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
        <div className="eyebrow" style={{ color: "var(--mustard-text)" }}>{props.book.name} {props.chapter}:{sel.verse.v}</div>
        <button type="button" onClick={onClose} aria-label="Close the study panel" style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", border: "1px solid var(--border)", borderRadius: "999px", background: "var(--card)", cursor: "pointer", color: "var(--ink)" }}>
          <X size={16} />
        </button>
      </div>
      {sel.kind === "word" ? <WordStudy {...props} word={sel.verse.w[sel.index]} /> : <VerseStudy {...props} verse={sel.verse} />}
    </div>
  );
}

function WordStudy({ books, lang, word, sel, setSel }: { books: BibleBook[]; lang: "H" | "G"; word: BibleWord; sel: NonNullable<Selection>; setSel: (s: Selection) => void }) {
  const [lexFor, setLexFor] = useState<{ strong: string; r: { key: string; entry: LexEntry } | null } | null>(null);
  const [morph, setMorph] = useState<Record<string, string> | null>(null);
  const [, , gloss, strong, grammar, editions] = word;
  const wlang = langOf(strong) ?? lang;

  useEffect(() => {
    let stale = false;
    lookupLex(strong).then((r) => { if (!stale) setLexFor({ strong, r }); }).catch(() => { if (!stale) setLexFor({ strong, r: null }); });
    fetchMorph(wlang).then((m) => { if (!stale) setMorph(m); }).catch(() => {});
    return () => { stale = true; };
  }, [strong, wlang]);

  const lex = lexFor?.strong === strong ? lexFor.r : undefined;
  const script = wlang === "H" ? HEB : GRK;
  const parsing = morph ? expandGrammar(wlang, grammar, morph) : [];
  const variant = editionSplit(editions);

  return (
    <div>
      <p style={{ ...script, fontSize: "34px", lineHeight: 1.3, color: "var(--ink)", margin: "10px 0 0", textAlign: wlang === "H" ? "right" : "left" }} lang={wlang === "H" ? "he" : "grc"}>{word[0]}</p>
      <p style={{ margin: "2px 0 0", fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)" }}><i>{word[1]}</i> · “{gloss}”</p>

      <div style={panelH}>Grammar</div>
      {parsing.length ? (
        <div style={{ display: "grid", gap: "10px" }}>
          {parsing.map((p, i) => (
            <dl key={i} style={{ margin: 0, display: "grid", gridTemplateColumns: "auto 1fr", gap: "2px 12px", fontFamily: "var(--U)", fontSize: "13.5px", lineHeight: 1.5 }}>
              {p.split(";").map((pair) => pair.split("=")).filter((kv) => kv.length === 2).map(([k, v]) => (
                <div key={k} style={{ display: "contents" }}>
                  <dt style={{ color: "var(--ink-muted)" }}>{k.trim()}</dt>
                  <dd style={{ margin: 0, color: "var(--ink)" }}>{v.trim()}</dd>
                </div>
              ))}
            </dl>
          ))}
        </div>
      ) : <p style={{ margin: 0, fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>{grammar || "—"}</p>}

      <div style={panelH}>Dictionary</div>
      {lex === undefined ? (
        <p role="status" style={{ margin: 0, fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>Looking it up…</p>
      ) : lex === null ? (
        <p style={{ margin: 0, fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>No dictionary entry for {strong}.</p>
      ) : (
        <>
          <p style={{ margin: "0 0 4px", fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink)" }}>
            <span style={{ ...script, fontSize: "20px" }}>{lex.entry.l}</span> <i>{lex.entry.tr}</i> · {lex.entry.g}
          </p>
          <p style={{ margin: "0 0 8px", fontFamily: "var(--U)", fontSize: "12px", color: "var(--ink-muted)" }}>
            {lex.key}{lex.entry.rel ? ` · ${lex.entry.rel}` : ""}
          </p>
          <div style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.65, color: "var(--ink)" }} dangerouslySetInnerHTML={{ __html: safeDefinition(lex.entry.d) }} />

          <div style={panelH}>Where else it appears</div>
          <p style={{ margin: "0 0 8px", fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink)" }}>
            {lex.entry.n.toLocaleString()} time{lex.entry.n === 1 ? "" : "s"} in the {wlang === "H" ? "Hebrew Old Testament" : "Greek New Testament"}{lex.entry.r.length < lex.entry.n ? `; the first ${lex.entry.r.length} are listed` : ""}.
          </p>
          <p style={{ margin: 0, fontFamily: "var(--U)", fontSize: "13px", lineHeight: 1.9 }}>
            {lex.entry.r.map((r, i) => {
              const p = parseRef(r, books);
              return p ? (
                <span key={r}>
                  <Link href={chapterHref(p.slug, p.chapter, p.verse)} style={quietLink}>{p.label}</Link>
                  {i < lex.entry.r.length - 1 ? " · " : ""}
                </span>
              ) : null;
            })}
          </p>
        </>
      )}

      {variant && (
        <>
          <div style={panelH}>Greek editions</div>
          <p style={{ margin: 0, fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink)" }}>
            This word is in {variant.in.join(", ")}{variant.out.length ? `, but not in ${variant.out.join(", ")}` : ""}. The major editions of the Greek New Testament differ here.
          </p>
        </>
      )}

      <p style={{ margin: "var(--s-4) 0 0", fontFamily: "var(--U)", fontSize: "13px" }}>
        <button type="button" onClick={() => setSel({ kind: "verse", verse: sel.verse })} style={{ ...quietLink, border: "none", padding: 0, cursor: "pointer", background: "none", fontFamily: "inherit", fontSize: "inherit" }}>
          Study the whole verse
        </button>
      </p>
    </div>
  );
}

function VerseStudy({ books, book, chapter, verse, lang, setSel }: { books: BibleBook[]; book: BibleBook; chapter: number; verse: BibleVerse; lang: "H" | "G"; setSel: (s: Selection) => void }) {
  const [related, setRelated] = useState<CatalogueItem[] | null>(null);
  useEffect(() => {
    let stale = false;
    const chapterKey = `${book.name.toLowerCase()} ${chapter}`;
    fetchCatalogue()
      .then((c) => {
        if (stale) return;
        const hits = c.items.filter((it) =>
          (it.scripture ?? []).some((s) => {
            const n = s.toLowerCase().replace(/\s+/g, " ").trim();
            return n === chapterKey || n.startsWith(`${chapterKey}:`) || n.startsWith(`${chapterKey}–`) || n.startsWith(`${chapterKey}-`);
          })
        );
        setRelated(hits.slice(0, 8));
      })
      .catch(() => { if (!stale) setRelated([]); });
    return () => { stale = true; };
  }, [book.name, chapter]);

  const script = lang === "H" ? HEB : GRK;
  const refLabel = `${book.name} ${chapter}:${verse.v}`;
  const xrefs = useMemo(() => (verse.x ?? []).map((r) => parseRef(r, books)).filter(Boolean) as NonNullable<ReturnType<typeof parseRef>>[], [verse.x, books]);

  return (
    <div>
      <p style={{ margin: "10px 0 0", fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)" }}>{verse.t || <i style={{ color: "var(--ink-muted)" }}>{LATER_NOTE}</i>}</p>

      {verse.w.length > 0 && (
        <>
          <div style={panelH}>Word by word</div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {verse.w.map((w, i) => (
              <li key={i}>
                <button type="button" onClick={() => setSel({ kind: "word", verse, index: i })} style={{ display: "flex", width: "100%", gap: "10px", alignItems: "baseline", justifyContent: "space-between", minHeight: "36px", padding: "4px 0", border: "none", borderBottom: "1px solid var(--border)", background: "none", cursor: "pointer", textAlign: "left" }}>
                  <span lang={lang === "H" ? "he" : "grc"} style={{ ...script, direction: lang === "H" ? "rtl" : "ltr", fontSize: "18px", color: "var(--ink)" }}>{w[0]}</span>
                  <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", flex: 1, textAlign: "right" }}>{w[2]}</span>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}

      {xrefs.length > 0 && (
        <>
          <div style={panelH}>Cross-references</div>
          <p style={{ margin: 0, fontFamily: "var(--U)", fontSize: "13px", lineHeight: 1.9 }}>
            {xrefs.map((p, i) => (
              <span key={`${p.label}${i}`}>
                <Link href={chapterHref(p.slug, p.chapter, p.verse)} style={quietLink}>{p.label}</Link>
                {i < xrefs.length - 1 ? " · " : ""}
              </span>
            ))}
          </p>
        </>
      )}

      {related && related.length > 0 && (
        <>
          <div style={panelH}>On LiveWell</div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "8px" }}>
            {related.map((it) => (
              <li key={`${it.kind}|${it.href}|${it.title}`}>
                <Link href={it.href} style={{ ...quietLink, textDecoration: "none", display: "block" }}>
                  <span style={{ display: "block", fontFamily: "var(--U)", fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--mustard-text)" }}>{it.kind}</span>
                  <span style={{ fontFamily: "var(--F)", fontSize: "17px", color: "var(--ink)" }}>{it.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}

      <div style={panelH}>Go deeper</div>
      <p style={{ margin: 0, fontFamily: "var(--U)", fontSize: "13px", lineHeight: 1.9 }}>
        <Link href={`/theology/passage?ref=${encodeURIComponent(refLabel)}`} style={quietLink}>This passage in context</Link>
        {" · "}
        <Link href={`/explore?q=${encodeURIComponent(`${book.name} ${chapter}`)}`} style={quietLink}>Search the Library for {book.name} {chapter}</Link>
      </p>
    </div>
  );
}

function Credits() {
  return (
    <footer style={{ background: "var(--bone-warm)", padding: "var(--s-4)", borderTop: "1px solid var(--border)" }}>
      <p style={{ ...wrap, fontFamily: "var(--U)", fontSize: "12px", lineHeight: 1.7, color: "var(--ink-muted)", margin: "0 auto" }}>
        English text: the Berean Standard Bible (public domain). Hebrew and Greek texts, dictionaries, and grammar: STEP Bible data from Tyndale House, Cambridge,{" "}
        <a href="https://www.STEPBible.org" target="_blank" rel="noopener noreferrer" style={quietLink}>STEPBible.org</a>, CC BY 4.0. Cross-references:{" "}
        <a href="https://www.openbible.info/labs/cross-references/" target="_blank" rel="noopener noreferrer" style={quietLink}>OpenBible.info</a>, CC BY.
      </p>
    </footer>
  );
}

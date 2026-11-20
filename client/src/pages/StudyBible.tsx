/**
 * /study/bible — the Study Bible (docs/STUDY-BIBLE-PROMPT.md, Phase 1).
 *
 *   /study/bible                     the front door: Go to, the 66 books (study-bible/BibleFront)
 *   /study/bible/:book               the book at a glance, then its introduction (study-bible/BookFront)
 *   /study/bible/:book/:chapter      the reader: Berean Standard Bible text, a
 *                                    word-by-word Hebrew or Greek interlinear,
 *                                    a study panel for any verse or word, and
 *                                    the chapter's study notes
 *
 * Original-language data comes from /bible/* (scripts/build-bible.mjs):
 * licensed sources only, credited at the foot of every page. The authored
 * layer (introductions, notes, the story path) follows docs/BIBLE-NOTES-SPEC.md.
 * The story and doctrine pages live in StudyBibleStory and StudyBibleDoctrines.
 */
import { lazy, Suspense, useEffect, useId, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { Link, useRoute, useSearch } from "wouter";
import { useLocationProperty } from "wouter/use-browser-location";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, NotebookPen, PencilLine, X } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { LoadFailed } from "@/components/LoadFailed";
import { copyToClipboard } from "@/lib/clipboard";
import { SITE_URL } from "@/lib/site";
import { readStoredJSON, writeStoredJSON } from "@/lib/storage";
import { fetchCatalogue, type CatalogueItem } from "@/lib/catalogue";
import {
  BIBLE_TRANSLATION,
  chapterHref,
  editionSplit,
  expandGrammar,
  chapterBookName,
  fetchBooks,
  fetchChapter,
  fetchChapterText,
  fetchMorph,
  grammarRows,
  isPoetry,
  langOf,
  lookupLex,
  occurrenceLine,
  parseRef,
  plainGloss,
  poetryLines,
  safeDefinition,
  verseCopyText,
  type BibleBook,
  type BibleChapter,
  type BibleTextChapter,
  type BibleVerse,
  type BibleWord,
  type LexEntry,
} from "@/lib/bible";
import {
  fetchDoctrines,
  fetchNote,
  fetchNotesIndex,
  fetchVerseNotes,
  itemsForPassage,
  noteForVerse,
  OTHER_TRANSLATIONS,
  translationHref,
  type ChapterNote,
  type Doctrine,
  type VerseNote,
} from "@/lib/bible-notes";
import { Credits, Gloss, useLoad } from "@/pages/study-bible/shared";
import { ChapterHead, ChapterNotesBody, OutlinePanel, useStoryPlace } from "@/pages/study-bible/ChapterNotes";
import { VerseEntry } from "@/pages/study-bible/VerseNotes";
import { GoToPassage } from "@/pages/study-bible/GoToPassage";
import { LaterClose, LaterOpen, laterEdge } from "@/components/LaterMark";
import { SCRIPTURE_BOOKS } from "@/lib/scripture-ref";
import { TextSize, useTextSize } from "@/components/TextSize";
import {
  chapterMarks,
  markRef,
  readMarks,
  readView,
  removeMark,
  saveMark,
  writeLastChapter,
  writeView,
  type ChapterView,
  type Mark,
  type MarkColor,
} from "@/lib/bible-desk";

// Loaded only when used: the guided study, the highlight and note controls,
// the list of the reader's own notes, and the cross-references read in place.
const ChapterWalk = lazy(() => import("@/pages/study-bible/ChapterWalk"));
const VerseMarks = lazy(() => import("@/pages/study-bible/VerseMarks"));
const ChapterMarksList = lazy(() => import("@/pages/study-bible/VerseMarks").then((m) => ({ default: m.ChapterMarksList })));
const CrossRefList = lazy(() => import("@/pages/study-bible/CrossRefs"));

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const HEB: CSSProperties = { fontFamily: '"SBL Hebrew", "Ezra SIL", "Taamey Frank CLM", "Times New Roman", serif', direction: "rtl" };
const GRK: CSSProperties = { fontFamily: '"SBL Greek", "Gentium Plus", "Times New Roman", serif' };
const MODE_KEY = "livewell-studybible-mode";

// The front page and a book's page are their own chunks, so a chapter (the
// page most readers land on) does not carry their code or styles. Until one
// arrives, a screen-tall box holds the footer below the fold.
const BibleFront = lazy(() => import("@/pages/study-bible/BibleFront"));
const BookFront = lazy(() => import("@/pages/study-bible/BookFront"));
const hold = <div style={{ minHeight: "100vh" }} />;
const FRONT_BOOKS: BibleBook[] = [...SCRIPTURE_BOOKS];

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
      {!slug && (
        <SEOMeta
          title="Free Online Study Bible: Notes on Every Chapter"
          description="A free online Study Bible: the story in eleven parts, an introduction to every book, notes on all 1,189 chapters, and the Hebrew and Greek."
          url="https://www.livewellbyjamesbell.co/study/bible"
        />
      )}
      {!slug ? (
        // The front page draws at once from the committed table of books
        // (lib/scripture-ref, the same as /bible/books.json), so it never
        // shows a loading line first and then moves.
        <Suspense fallback={hold}>
          <BibleFront books={books ?? FRONT_BOOKS} />
        </Suspense>
      ) : failed && !books ? (
        <div style={{ padding: "var(--s-6) var(--gutter)" }}>
          <LoadFailed what="The Study Bible" onRetry={retry} backHref="/study" backLabel="Back to Study" />
        </div>
      ) : !books ? (
        <p role="status" style={{ ...wrap, padding: "var(--s-6) var(--gutter)", fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Opening the Study Bible…</p>
      ) : slug && !book ? (
        <div style={{ ...wrap, padding: "var(--s-6) var(--gutter)" }}>
          <p style={{ fontFamily: "var(--B)" }}>That book isn't in the Bible's table of contents.</p>
          <Link href="/study/bible" style={{ color: "var(--ink)", fontWeight: 600 }}>All the books</Link>
        </div>
      ) : book && Number.isFinite(chapterNum) ? (
        <Reader books={books} book={book} chapter={chapterNum} />
      ) : book ? (
        <Suspense fallback={<>{hold}<span hidden data-lw-loading /></>}>
          <BookFront books={books} book={book} />
        </Suspense>
      ) : null}
      <Credits />
    </Layout>
  );
}

// ── the reader ───────────────────────────────────────────────────────────────

const WIDE = 1000;

function useWide(minWidth = WIDE) {
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

/**
 * Brings a verse where it can be read. On a phone the study panel covers the
 * lower part of the screen, so the verse goes to the top of what is left; on
 * a wide screen it goes to the middle. A verse already in clear view stays
 * where it is unless `always` says to move it.
 */
function showVerse(n: number, always = false) {
  if (typeof window === "undefined") return;
  const el = document.getElementById(`v${n}`);
  if (!el || typeof el.scrollIntoView !== "function") return;
  const phone = !window.matchMedia?.(`(min-width: ${WIDE}px)`).matches;
  const r = el.getBoundingClientRect();
  const floor = phone ? window.innerHeight * 0.56 : window.innerHeight;
  if (!always && r.top >= 90 && r.bottom <= floor) return;
  el.scrollIntoView({ block: phone ? "start" : "center" });
}

function Reader({ books, book, chapter }: { books: BibleBook[]; book: BibleBook; chapter: number }) {
  // Each loaded chapter and each selection carries the chapter it belongs to,
  // so moving to another chapter shows nothing stale without resetting state
  // inside an effect.
  const key = `${book.slug}/${chapter}`;
  const [loaded, setLoaded] = useState<{ key: string; data: BibleChapter } | null>(null);
  const [textOnly, setTextOnly] = useState<{ key: string; data: BibleTextChapter } | null>(null);
  const [failedKey, setFailedKey] = useState<string | null>(null);
  const [nonce, setNonce] = useState(0);
  const [mode, setMode] = useState<Mode>(() => readStoredJSON<Mode>(MODE_KEY, (x): x is Mode => x === "reading" || x === "interlinear", "reading"));
  // Read (the text alone) or Study (the text with its notes), kept on this
  // device. A first visit opens in Study, with one line saying Read exists.
  const [view, setView] = useState<ChapterView>(() => readView() ?? "study");
  const [chosen, setChosen] = useState(() => readView() !== null);
  const [viewSaveFailed, setViewSaveFailed] = useState(false);
  const [sizeOpen, setSizeOpen] = useState(false);
  const textSize = useTextSize();
  const [picked, setPicked] = useState<{ key: string; hash: string; sel: Selection } | null>(null);
  const [tall, setTall] = useState(false);
  const [tab, setTab] = useState<PanelTab>("notes");
  // Highlights and notes, read from this device with the page.
  const [marks, setMarks] = useState<Mark[]>(() => readMarks());
  const [marksFailed, setMarksFailed] = useState(false);
  // The guided study ("Study this chapter"), open for one chapter at a time.
  // ?study=walk in the address opens it (the How to study page links so).
  const search = useSearch();
  const [walkKey, setWalkKey] = useState<string | null>(null);
  const [seenSearch, setSeenSearch] = useState<string | null>(null);
  if (seenSearch !== `${key}?${search}`) {
    setSeenSearch(`${key}?${search}`);
    if (new URLSearchParams(search).get("study") === "walk") setWalkKey(key);
  }
  const walking = walkKey === key;
  const wide = useWide();
  const lang = book.testament === "OT" ? "H" : "G";
  const valid = chapter >= 1 && chapter <= book.chapters;
  // Read needs only the chapter's words (about 4 KB for John 3); Study and the
  // guided study need the full file with the Hebrew or Greek and the
  // cross-references (about 42 KB).
  const full = view === "study" || walking;
  const { data: note } = useLoad<ChapterNote>(valid ? `note-${book.slug}/${chapter}` : null, () => fetchNote(book.slug, chapter));
  const place = useStoryPlace(book.slug, chapter);
  const { data: index } = useLoad("notes-index", fetchNotesIndex);
  const hasVerseNotes = valid && (index?.withVerses ?? []).includes(key);
  const { data: verseNotes } = useLoad<VerseNote[]>(hasVerseNotes ? `verse-notes-${key}` : null, () => fetchVerseNotes(book.slug, chapter));
  const data = loaded?.key === key ? loaded.data : null;
  const readData: BibleTextChapter | null = data ?? (textOnly?.key === key ? textOnly.data : null);
  const failed = failedKey === key;
  const mine = useMemo(() => chapterMarks(marks, book.slug, chapter), [marks, book.slug, chapter]);

  useEffect(() => {
    if (!valid || !full) return;
    let stale = false;
    fetchChapter(book.slug, chapter)
      .then((d) => { if (!stale) setLoaded({ key: `${book.slug}/${chapter}`, data: d }); })
      .catch(() => { if (!stale) setFailedKey(`${book.slug}/${chapter}`); });
    return () => { stale = true; };
  }, [book.slug, chapter, nonce, valid, full]);

  useEffect(() => {
    if (!valid || full) return;
    let stale = false;
    fetchChapterText(book.slug, chapter)
      .then((d) => { if (!stale) setTextOnly({ key: `${book.slug}/${chapter}`, data: d }); })
      .catch(() => { if (!stale) setFailedKey(`${book.slug}/${chapter}`); });
    return () => { stale = true; };
  }, [book.slug, chapter, nonce, valid, full]);

  // The chapter last opened, so "How to study the Bible" can offer to try the
  // method on it.
  useEffect(() => {
    if (valid) writeLastChapter({ slug: book.slug, chapter, label: `${chapterBookName(book)} ${chapter}` });
  }, [book, chapter, valid]);

  // The verses that have a note of their own, so the text can mark them.
  const noted = useMemo(() => {
    const set = new Set<number>();
    if (data && verseNotes) for (const v of data.verses) if (noteForVerse(verseNotes, v.v)) set.add(v.v);
    return set;
  }, [data, verseNotes]);

  // A #v16 link opens that verse until the reader picks something else. The
  // hash is followed as it changes: the header's search can open a verse of
  // the chapter already on screen, and that changes nothing but the hash.
  const hash = useLocationProperty(() => window.location.hash, () => "");
  const hashVerse = useMemo(() => {
    if (!data || view === "read") return null;
    const m = hash.match(/^#v(\d+)$/);
    return m ? data.verses.find((x) => x.v === +m[1]) ?? null : null;
  }, [data, hash, view]);
  const sel: Selection = view === "read" ? null : picked?.key === key && picked.hash === hash ? picked.sel : hashVerse ? { kind: "verse", verse: hashVerse } : null;
  const setSel = (s: Selection) => setPicked({ key, hash, sel: s });

  useEffect(() => {
    if (hashVerse) requestAnimationFrame(() => showVerse(hashVerse.v, true));
  }, [hashVerse]);

  // In Read a #v16 link still lands on its verse; it only opens nothing.
  useEffect(() => {
    if (view !== "read" || !readData) return;
    const m = window.location.hash.match(/^#v(\d+)$/);
    if (m) requestAnimationFrame(() => document.getElementById(`v${m[1]}`)?.scrollIntoView?.({ block: "start" }));
  }, [view, readData, hash]);

  // A verse chosen by a tap, by the panel's arrows, or from the outline stays
  // readable above the panel.
  const selVerse = sel?.verse.v ?? null;
  useEffect(() => {
    if (selVerse !== null) requestAnimationFrame(() => showVerse(selVerse));
  }, [selVerse, key]);

  // A #notes link (from a doctrine page) lands on the notes once they exist.
  useEffect(() => {
    if (note && data && typeof window !== "undefined" && window.location.hash === "#notes")
      requestAnimationFrame(() => document.getElementById("notes")?.scrollIntoView({ block: "start" }));
  }, [note, data]);

  const changeMode = (m: Mode) => {
    setMode(m);
    writeStoredJSON(MODE_KEY, m);
  };
  const changeView = (v: ChapterView) => {
    setView(v);
    setChosen(true);
    setViewSaveFailed(!writeView(v));
  };
  const saveVerseMark = (v: BibleVerse) => (change: { color?: MarkColor; note?: string }) => {
    const r = saveMark(marks, { ref: markRef(book.code, chapter, v.v), slug: book.slug, chapter, verse: v.v, label: `${chapterBookName(book)} ${chapter}:${v.v}` }, change);
    setMarks(r.marks);
    setMarksFailed(!r.saved);
    return r.saved;
  };
  const dropMark = (ref: string) => {
    const r = removeMark(marks, ref);
    setMarks(r.marks);
    setMarksFailed(!r.saved);
  };
  const closeWalk = () => {
    setWalkKey(null);
    if (new URLSearchParams(window.location.search).get("study") === "walk") {
      window.history.replaceState(window.history.state, "", window.location.pathname + window.location.hash);
    }
  };

  const bookIdx = books.findIndex((b) => b.code === book.code);
  const prev = chapter > 1 ? { slug: book.slug, ch: chapter - 1 } : bookIdx > 0 ? { slug: books[bookIdx - 1].slug, ch: books[bookIdx - 1].chapters } : null;
  const next = chapter < book.chapters ? { slug: book.slug, ch: chapter + 1 } : bookIdx < books.length - 1 ? { slug: books[bookIdx + 1].slug, ch: 1 } : null;
  const nameOf = (slug: string) => books.find((b) => b.slug === slug)?.name ?? slug;

  if (!valid) {
    return (
      <div style={{ ...wrap, padding: "var(--s-6) var(--gutter)" }}>
        <SEOMeta title={`${book.name}: Choose a Chapter`} description={`${book.name} in the Study Bible.`} noindex />
        <h1 style={{ fontFamily: "var(--F)", fontSize: "var(--fs-h1)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 12px" }}>{book.name}</h1>
        <p style={{ fontFamily: "var(--B)" }}>{book.name} has {book.chapters} chapter{book.chapters === 1 ? "" : "s"}, and this address asks for one it does not have.</p>
        <Link href={book.chapters === 1 ? chapterHref(book.slug, 1) : `/study/bible/${book.slug}`} style={{ color: "var(--ink)", fontWeight: 600 }}>{book.chapters === 1 ? `Read ${book.name}` : "Choose a chapter"}</Link>
      </div>
    );
  }

  const onVerse = (v: BibleVerse) => setSel({ kind: "verse", verse: v });
  // The panel's arrows: the verse before or after the one open.
  const step = (by: -1 | 1) => {
    if (!data || !sel) return;
    const v = data.verses[data.verses.findIndex((x) => x.v === sel.verse.v) + by];
    if (v) onVerse(v);
  };
  const at = data && sel ? data.verses.findIndex((x) => x.v === sel.verse.v) : -1;
  const panel = sel && data ? (
    <StudyPanel
      books={books} book={book} chapter={chapter} sel={sel} setSel={setSel} lang={lang} data={data} verseNotes={verseNotes ?? null}
      onClose={() => setSel(null)}
      onStep={step} hasPrev={at > 0} hasNext={at >= 0 && at < data.verses.length - 1}
      tall={wide ? undefined : tall} onTall={() => setTall((t) => !t)}
      tab={tab} onTab={setTab}
      mark={mine.get(sel.verse.v)} onMark={saveVerseMark(sel.verse)} marksFailed={marksFailed}
    />
  ) : null;
  // "Go to" a verse of this same chapter: select it and bring it on screen.
  const goToVerse = (n: number) => {
    const v = data?.verses.find((x) => x.v === n);
    if (!v) return false;
    onVerse(v);
    requestAnimationFrame(() => showVerse(n, true));
    return true;
  };
  const onWord = (v: BibleVerse, i: number) => setSel({ kind: "word", verse: v, index: i });
  const original = lang === "H" ? "Hebrew" : "Greek";
  const reading = view === "read";
  // Read is one centred column for the words alone; Study keeps the wide desk.
  const frame = reading ? { maxWidth: "var(--w-read)", margin: "0 auto" } : wrap;
  // On a first load the prerendered chapter stays on screen until the page
  // below has what it shows above the fold (lib/prerender-hold.ts).
  const waiting = reading
    ? !readData && !failed
    : (!data && !failed) || note === undefined || place === undefined || index === undefined || (hasVerseNotes && verseNotes === undefined);
  const myMarks = Array.from(mine.values());

  return (
    <>
      <SEOMeta
        title={note ? `${chapterBookName(book)} ${chapter} Study Notes – ${note.title}` : `${chapterBookName(book)} ${chapter} Study Notes, Hebrew and Greek`}
        description={note?.summary ?? `${chapterBookName(book)} ${chapter} with study notes, cross-references, and the ${original} beneath every word.`}
        url={`https://www.livewellbyjamesbell.co/study/bible/${book.slug}/${chapter}`}
        type="article"
      />
      <section style={{ background: "var(--bone)", padding: "var(--s-3) var(--gutter) var(--s-2)", borderBottom: "1px solid var(--border)" }}>
        <div style={frame}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "14px" }}>
            <div style={{ minWidth: 0 }}>
              <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "4px" }}>
                <Link href="/study/bible" style={{ color: "inherit", textDecoration: "none", backgroundImage: "none" }}>The Study Bible</Link>
              </div>
              <h1 style={{ fontFamily: "var(--F)", fontSize: "var(--fs-h1)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.05, color: "var(--ink)", margin: 0 }}>
                <Link href={`/study/bible/${book.slug}`} style={{ color: "inherit", textDecoration: "none", backgroundImage: "none" }}>{chapterBookName(book)}</Link> {chapter}
              </h1>
            </div>
            <nav aria-label="Chapters" style={{ display: "inline-flex", flex: "0 0 auto", gap: "6px" }}>
              {prev ? <NavBtn href={chapterHref(prev.slug, prev.ch)} label="Previous chapter"><ChevronLeft size={18} /></NavBtn> : null}
              {next ? <NavBtn href={chapterHref(next.slug, next.ch)} label="Next chapter"><ChevronRight size={18} /></NavBtn> : null}
            </nav>
          </div>
          <p style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: "0 12px", margin: "4px 0 0", fontFamily: "var(--U)", fontSize: "13px", lineHeight: 1.5, color: "var(--ink-muted)" }}>
            <span style={{ color: "var(--ink)", fontWeight: 600 }}>{BIBLE_TRANSLATION}</span>
            {!reading && (
              <span>
                Also in{" "}
                {OTHER_TRANSLATIONS.map((t) => (
                  <a key={t.code} href={translationHref(book.name, chapter, t.code)} target="_blank" rel="noopener noreferrer" aria-label={`${book.name} ${chapter} in the ${t.name}, on another site`} style={{ ...quietLink, display: "inline-block", padding: "13px 6px", margin: "-13px -1px" }}>{t.name}</a>
                ))}
              </span>
            )}
          </p>
          <div className="sb-viewbar">
            <div role="group" aria-label="How to show this chapter" className="sb-switch">
              <button type="button" aria-pressed={reading} onClick={() => changeView("read")}>Read</button>
              <button type="button" aria-pressed={!reading} onClick={() => changeView("study")}>Study</button>
            </div>
            {reading ? (
              <button type="button" className="sb-aa" aria-expanded={sizeOpen} aria-label="Text size" onClick={() => setSizeOpen((o) => !o)}>
                <span aria-hidden>Aa</span>
              </button>
            ) : (
              <button type="button" className="sb-walkbtn" onClick={() => setWalkKey(key)}>
                <NotebookPen size={18} strokeWidth={1.75} aria-hidden /> Study this chapter
              </button>
            )}
          </div>
          {reading && sizeOpen && (
            <div className="sb-sizerow">
              <TextSize size={textSize.size} onChange={textSize.setSize} saveFailed={textSize.saveFailed} />
            </div>
          )}
          {!reading && !chosen && (
            <p className="sb-hint">
              <span>New here? <button type="button" onClick={() => changeView("read")}>Read</button> shows the words alone, with nothing in the way.</span>
              <button type="button" className="sb-hint__x" aria-label="Keep the Study view and hide this line" onClick={() => changeView("study")}><X size={16} strokeWidth={1.75} aria-hidden /></button>
            </p>
          )}
          {viewSaveFailed && <p role="alert" className="sb-marks__alert">Couldn't save to this browser — your work here will not survive a reload.</p>}
          {!reading && (
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: "10px", marginTop: "8px" }}>
              <div role="group" aria-label="How to show the text" style={{ display: "inline-flex", flex: "0 0 auto", border: "1px solid var(--border)", borderRadius: "999px", overflow: "hidden" }}>
                {(["reading", "interlinear"] as Mode[]).map((m) => (
                  <button key={m} type="button" aria-pressed={mode === m} onClick={() => changeMode(m)} style={{ minHeight: "44px", padding: "0 16px", border: "none", cursor: "pointer", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, background: mode === m ? "var(--ink)" : "var(--card)", color: mode === m ? "var(--bone)" : "var(--ink)" }}>
                    {m === "reading" ? "English" : original}
                  </button>
                ))}
              </div>
              <div style={{ flex: "1 1 240px", minWidth: 0 }}>
                <GoToPassage here={chapterHref(book.slug, chapter)} onVerse={goToVerse} />
              </div>
            </div>
          )}
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: reading ? "var(--s-4) var(--gutter) var(--s-6)" : "var(--s-3) var(--gutter) var(--s-6)" }}>
        <div style={{ ...frame, display: "flex", gap: "var(--s-5)", alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 0", minWidth: 0 }}>
            {/* On a first load the prerendered chapter stays on screen until the
                heading, the text and the summary above it have all arrived
                (lib/prerender-hold.ts), so none of them pushes the others down.
                The verses' own notes are waited for too: each one puts a dot
                beside its verse number, and a dot that came late widened the
                number and rewrapped the lines after it. Read waits for the
                words alone. */}
            {waiting && <span hidden data-lw-loading />}
            {!reading && <ChapterHead note={note} place={place} />}
            {failed && !(reading ? readData : data) ? (
              <LoadFailed what={`${book.name} ${chapter}`} onRetry={() => { setFailedKey(null); setNonce((n) => n + 1); }} backHref={`/study/bible/${book.slug}`} backLabel={`All of ${book.name}`} />
            ) : reading ? (
              readData ? <ReadText data={readData} poetry={isPoetry(book.slug, chapter)} scale={textSize.scale} label={`${chapterBookName(book)} ${chapter}`} /> : <p role="status" style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Opening {chapterBookName(book)} {chapter}…</p>
            ) : !data ? (
              <p role="status" style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Opening {chapterBookName(book)} {chapter}…</p>
            ) : mode === "reading" ? (
              <ReadingText data={data} sel={sel} onVerse={onVerse} noted={noted} marks={mine} poetry={isPoetry(book.slug, chapter)} scale={textSize.scale} />
            ) : (
              <Interlinear data={data} lang={lang} sel={sel} onVerse={onVerse} onWord={onWord} noted={noted} />
            )}
            {(reading ? readData : data) && (
              <>
                {!reading && (
                  <p style={{ marginTop: "var(--s-4)", fontFamily: "var(--U)", fontSize: "13px", lineHeight: 1.6, color: "var(--ink-muted)", maxWidth: "68ch" }}>
                    Tap any verse to study it, highlight it, or write a note on it{mode === "interlinear" ? ", or any word to study the word" : `. Switch to ${original} to see every word beneath the English`}.
                    {noted.size > 0 ? " A dot beside a verse number means that verse has notes of its own." : ""}
                    {mode === "interlinear" ? ` A gray word in a meaning is one the ${original} has and English leaves out, or one English has to add.` : ""}
                  </p>
                )}
                {!reading && myMarks.length > 0 && (
                  <Suspense fallback={<span hidden data-lw-loading />}>
                    <ChapterMarksList marks={myMarks} onOpen={(n) => { const v = data?.verses.find((x) => x.v === n); if (v) { onVerse(v); requestAnimationFrame(() => showVerse(n, true)); } }} onRemove={dropMark} />
                  </Suspense>
                )}
                <nav aria-label="The chapter before and the chapter after" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: "10px", marginTop: "var(--s-3)", maxWidth: "68ch" }}>
                  {prev ? (
                    <Link href={chapterHref(prev.slug, prev.ch)} style={{ ...quietLink, display: "inline-flex", alignItems: "center", gap: "6px", minHeight: "44px", fontFamily: "var(--U)", fontSize: "14px", textDecoration: "none" }}>
                      <ChevronLeft size={16} aria-hidden /> {nameOf(prev.slug)} {prev.ch}
                    </Link>
                  ) : <span />}
                  {next && (
                    <Link href={chapterHref(next.slug, next.ch)} style={{ ...quietLink, display: "inline-flex", alignItems: "center", gap: "6px", minHeight: "44px", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, textDecoration: "none" }}>
                      {nameOf(next.slug)} {next.ch} <ChevronRight size={16} aria-hidden />
                    </Link>
                  )}
                </nav>
              </>
            )}
            {!reading && note && <ChapterNotesBody books={books} book={book} chapter={chapter} note={note} data={data} place={place} verseNotes={verseNotes ?? null} onWord={onWord} onVerse={onVerse} />}
          </div>
          {wide && !reading && (
            <aside aria-label="Study panel" style={{ flex: "0 0 380px", position: "sticky", top: "88px", maxHeight: "calc(100vh - 110px)", overflowY: "auto", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)" }}>
              {panel ?? (note ? <OutlinePanel note={note} data={data} onVerse={onVerse} /> : <p style={{ margin: 0, fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink-muted)" }}>Tap a verse or a word, and its study opens here.</p>)}
            </aside>
          )}
        </div>
      </section>

      {!wide && panel && (
        // About two fifths of the screen (index.css, .sb-panel), so the verse
        // being studied stays readable above it; "taller" is one tap away.
        <aside aria-label="Study panel" className="sb-panel" data-tall={tall || undefined} style={{ position: "fixed", left: 0, right: 0, bottom: "var(--lw-appbar-h, 0px)", zIndex: 60, overflowY: "auto", overscrollBehavior: "contain", background: "var(--card)", borderTop: "2px solid var(--mustard)", boxShadow: "var(--shadow-modal)", padding: "12px var(--s-3) var(--s-3)" }}>
          {panel}
        </aside>
      )}

      {walking && data && note !== undefined && (
        <Suspense fallback={null}>
          <ChapterWalk books={books} book={book} chapter={chapter} data={data} note={note} next={next ? { slug: next.slug, chapter: next.ch } : null} onClose={closeWalk} />
        </Suspense>
      )}
    </>
  );
}

function NavBtn({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <Link href={href} aria-label={label} style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", border: "1px solid var(--border)", borderRadius: "999px", background: "var(--card)", color: "var(--ink)", backgroundImage: "none" }}>
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
  fontWeight: 600,
  padding: "2px 5px",
  marginRight: "4px",
  borderRadius: "4px",
  cursor: "pointer",
  verticalAlign: "super",
  lineHeight: 1,
  minWidth: "24px",
  minHeight: "24px",
});

/** The verse number: the button a keyboard or a screen reader uses, with a dot when the verse has notes and a pen when the reader wrote one. */
function VerseNum({ v, active, noted, mine, onVerse }: { v: BibleVerse; active: boolean; noted: boolean; mine?: Mark; onVerse: (v: BibleVerse) => void }) {
  const yours = mine ? (mine.note ? ", with your note" : ", which you highlighted") : "";
  return (
    <button type="button" className="sb-num" aria-label={`Study verse ${v.v}${noted ? ", which has notes" : ""}${yours}`} onClick={(e) => { e.stopPropagation(); onVerse(v); }} style={verseNumStyle(active)}>
      {v.v}{noted && <span className="sb-dot" aria-hidden />}{mine?.note && <PencilLine className="sb-pen" size={11} strokeWidth={1.75} aria-hidden />}
    </button>
  );
}

/** A tap anywhere on a verse opens it, unless the reader is selecting its words to copy. */
const tapVerse = (v: BibleVerse, onVerse: (v: BibleVerse) => void) => () => {
  if (typeof window !== "undefined" && window.getSelection?.()?.toString()) return;
  onVerse(v);
};

function ReadingText({ data, sel, onVerse, noted, marks, poetry, scale }: { data: BibleChapter; sel: Selection; onVerse: (v: BibleVerse) => void; noted: Set<number>; marks: Map<number, Mark>; poetry: boolean; scale: number }) {
  return (
    <div className={poetry ? "sb-text sb-text--poetry" : "sb-text"} style={{ maxWidth: "var(--w-read)", fontFamily: "var(--font-reading)", fontSize: `calc(var(--fs-read) * ${1.05 * scale})`, lineHeight: 1.75, color: "var(--ink)" }}>
      {data.verses.map((v, i) => {
        const active = sel?.verse.v === v.v;
        const mine = marks.get(v.v);
        const edge = laterEdge(data.verses, i);
        return (
          // The number inside is the control a keyboard reaches; the tap on the words is the same act, made easier to hit.
          <span key={v.v} id={`v${v.v}`} className="sb-verse" data-active={active || undefined} data-mark={mine?.color} onClick={tapVerse(v, onVerse)}>
            {edge?.open && <LaterOpen />}
            <VerseNum v={v} active={active} noted={noted.has(v.v)} mine={mine} onVerse={onVerse} />
            {!v.t ? (
              <span style={{ fontFamily: "var(--U)", fontSize: "14px", fontStyle: "italic", color: "var(--ink-muted)" }}>[Not in the earliest manuscripts]</span>
            ) : poetry ? (
              poetryLines(v.t).map((line, i) => <span key={i} className="sb-line">{line} </span>)
            ) : v.t}{" "}
            {edge?.close && <LaterClose />}
          </span>
        );
      })}
    </div>
  );
}

/**
 * The Read view: the words alone, in the reading face, larger, with no verse
 * numbers, no note dots, no marks and nothing to tap. Each verse keeps its
 * #v anchor, so a link to a verse still lands on it.
 */
function ReadText({ data, poetry, scale, label }: { data: BibleTextChapter; poetry: boolean; scale: number; label: string }) {
  return (
    <div className={poetry ? "sb-text sb-text--read sb-text--poetry" : "sb-text sb-text--read"} style={{ fontSize: `calc(var(--fs-read) * ${1.15 * scale})` }} aria-label={`${label}, ${BIBLE_TRANSLATION}`} role="region">
      {data.verses.map((v, i) => {
        if (!v.t) return null;
        const edge = laterEdge(data.verses, i);
        return (
          <span key={v.v} id={`v${v.v}`} className="sb-verse sb-verse--read">
            {edge?.open && <LaterOpen />}
            {poetry ? poetryLines(v.t).map((line, i) => <span key={i} className="sb-line">{line} </span>) : v.t}{" "}
            {edge?.close && <LaterClose />}
          </span>
        );
      })}
    </div>
  );
}

function Interlinear({ data, lang, sel, onVerse, onWord, noted }: { data: BibleChapter; lang: "H" | "G"; sel: Selection; onVerse: (v: BibleVerse) => void; onWord: (v: BibleVerse, i: number) => void; noted: Set<number> }) {
  const script = lang === "H" ? HEB : GRK;
  return (
    <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "var(--s-4)" }}>
      {data.verses.map((v, i) => {
        const active = sel?.verse.v === v.v && sel.kind === "verse";
        const edge = laterEdge(data.verses, i);
        return (
          <li key={v.v} id={`v${v.v}`} style={{ scrollMarginTop: "100px", paddingBottom: "var(--s-3)", borderBottom: "1px solid var(--border)" }}>
            <p className="sb-verse" data-active={active || undefined} onClick={tapVerse(v, onVerse)} style={{ margin: "0 0 10px", fontFamily: "var(--font-reading)", fontSize: "17px", lineHeight: 1.65, color: "var(--ink)", maxWidth: "68ch" }}>
              {edge?.open && <LaterOpen />}
              <VerseNum v={v} active={active} noted={noted.has(v.v)} onVerse={onVerse} />
              {v.t || <span style={{ fontStyle: "italic", color: "var(--ink-muted)" }}>{LATER_NOTE}</span>}
              {edge?.close && <> <LaterClose /></>}
            </p>
            {v.w.length === 0 ? (
              <p style={{ margin: 0, fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>
                Hebrew and English Bibles number this passage differently; the {lang === "H" ? "Hebrew" : "Greek"} for this verse sits under a neighboring verse number.
              </p>
            ) : (
              <div dir={lang === "H" ? "rtl" : "ltr"} lang={lang === "H" ? "he" : "grc"} style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                {v.w.map((w, i) => {
                  const on = sel?.kind === "word" && sel.verse.v === v.v && sel.index === i;
                  return (
                    <button key={i} type="button" onClick={() => onWord(v, i)} aria-label={`${w[0]}, ${plainGloss(w[2]) || "word"}: study this word`} style={{ display: "inline-flex", flexDirection: "column", alignItems: "center", gap: "2px", padding: "6px 8px", minWidth: "44px", background: on ? "var(--bone-warm)" : "var(--card)", border: on ? "1px solid var(--mustard)" : "1px solid var(--border)", borderRadius: "var(--radius-sm)", cursor: "pointer", position: "relative" }}>
                      <span style={{ ...script, fontSize: lang === "H" ? "22px" : "19px", lineHeight: 1.3, color: "var(--ink)" }}>{w[0]}</span>
                      <span dir="ltr" style={{ fontFamily: "var(--U)", fontSize: "11px", fontStyle: "italic", color: "var(--ink-muted)" }}>{w[1]}</span>
                      <span dir="ltr" lang="en" style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--ink)" }}><Gloss text={w[2]} /></span>
                      {w[5] && <span aria-label="differs between Greek editions" title="Differs between Greek editions" style={{ position: "absolute", top: "4px", right: "4px", width: "6px", height: "6px", borderRadius: "50%", background: "var(--mustard)" }} />}
                    </button>
                  );
                })}
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}

// ── the study panel ──────────────────────────────────────────────────────────

const panelH = { fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase" as const, color: "var(--mustard-text)", margin: "var(--s-4) 0 8px" };
const quietLink: CSSProperties = { color: "var(--ink)", textDecoration: "underline", textDecorationColor: "var(--mustard)", textUnderlineOffset: "3px", backgroundImage: "none" };
const roundBtn: CSSProperties = { display: "inline-flex", alignItems: "center", justifyContent: "center", width: "44px", height: "44px", border: "1px solid var(--border)", borderRadius: "999px", background: "var(--card)", cursor: "pointer", color: "var(--ink)" };
const pillBtn: CSSProperties = { display: "inline-flex", alignItems: "center", minHeight: "44px", padding: "0 14px", border: "1px solid var(--border)", borderRadius: "999px", background: "var(--card)", cursor: "pointer", color: "var(--ink)", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600 };
const emptyLine: CSSProperties = { margin: "4px 0 0", fontFamily: "var(--U)", fontSize: "13.5px", lineHeight: 1.6, color: "var(--ink-muted)" };

/** The verse panel's tabs: the same four on every verse, in this order, each there even when it has nothing. */
type PanelTab = "notes" | "words" | "xrefs" | "translations";
const PANEL_TABS: { id: PanelTab; name: string }[] = [
  { id: "notes", name: "Notes" },
  { id: "words", name: "Words" },
  { id: "xrefs", name: "Cross-references" },
  { id: "translations", name: "Translations" },
];

interface PanelProps {
  books: BibleBook[];
  book: BibleBook;
  chapter: number;
  sel: NonNullable<Selection>;
  setSel: (s: Selection) => void;
  lang: "H" | "G";
  data: BibleChapter;
  verseNotes: VerseNote[] | null;
  onClose: () => void;
  onStep: (by: -1 | 1) => void;
  hasPrev: boolean;
  hasNext: boolean;
  /** On a phone: whether the panel is at its taller height. Undefined beside the text, where it has no height to change. */
  tall?: boolean;
  onTall: () => void;
  /** The tab open, kept as the reader steps from verse to verse. */
  tab: PanelTab;
  onTab: (t: PanelTab) => void;
  /** The reader's own highlight and note on this verse. */
  mark: Mark | undefined;
  onMark: (change: { color?: MarkColor; note?: string }) => boolean;
  marksFailed: boolean;
}

function StudyPanel(props: PanelProps) {
  const { sel, onClose, onStep, hasPrev, hasNext, tall, onTall } = props;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "10px" }}>
        <div className="eyebrow" style={{ color: "var(--mustard-text)", minWidth: 0 }}>{props.book.name} {props.chapter}:{sel.verse.v}</div>
        <div style={{ display: "inline-flex", flex: "0 0 auto", gap: "6px" }}>
          <button type="button" onClick={() => onStep(-1)} disabled={!hasPrev} aria-label="The verse before" style={{ ...roundBtn, opacity: hasPrev ? 1 : 0.4, cursor: hasPrev ? "pointer" : "default" }}><ChevronLeft size={16} /></button>
          <button type="button" onClick={() => onStep(1)} disabled={!hasNext} aria-label="The next verse" style={{ ...roundBtn, opacity: hasNext ? 1 : 0.4, cursor: hasNext ? "pointer" : "default" }}><ChevronRight size={16} /></button>
          {tall !== undefined && (
            <button type="button" onClick={onTall} aria-pressed={tall} aria-label="Make the study panel taller" style={roundBtn}>{tall ? <ChevronDown size={16} /> : <ChevronUp size={16} />}</button>
          )}
          <button type="button" onClick={onClose} aria-label="Close the study panel" style={roundBtn}><X size={16} /></button>
        </div>
      </div>
      {sel.kind === "word" ? <WordStudy {...props} word={sel.verse.w[sel.index]} /> : <VerseStudy {...props} verse={sel.verse} />}
    </div>
  );
}

/** A dictionary entry long enough to bury the short meaning above it is folded; a short one is shown as it is. */
const LONG_ENTRY = 320;

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
  const parsing = morph ? expandGrammar(wlang, grammar, morph).map(grammarRows).filter((rows) => rows.length > 0) : [];
  const variant = editionSplit(editions);
  const definition = lex ? safeDefinition(lex.entry.d) : "";
  const entryStyle: CSSProperties = { fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.65, color: "var(--ink)" };

  return (
    <div>
      <p style={{ ...script, fontSize: "34px", lineHeight: 1.3, color: "var(--ink)", margin: "10px 0 0", textAlign: wlang === "H" ? "right" : "left" }} lang={wlang === "H" ? "he" : "grc"}>{word[0]}</p>
      <p style={{ margin: "2px 0 0", fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)" }}><i>{word[1]}</i> · “<span style={{ color: "var(--ink)" }}><Gloss text={gloss} /></span>”</p>

      <div style={panelH}>Grammar</div>
      {parsing.length ? (
        <div style={{ display: "grid", gap: "10px" }}>
          {parsing.map((rows, i) => (
            <dl key={i} style={{ margin: 0, display: "grid", gridTemplateColumns: "auto 1fr", gap: "2px 12px", fontFamily: "var(--U)", fontSize: "13.5px", lineHeight: 1.5 }}>
              {rows.map((row) => (
                <div key={row.k} style={{ display: "contents" }}>
                  <dt style={{ color: "var(--ink-muted)" }}>{row.k}</dt>
                  <dd style={{ margin: 0, color: "var(--ink)" }}>{row.v}{row.hence && <span style={{ color: "var(--ink-muted)" }}> ({row.hence})</span>}</dd>
                </div>
              ))}
            </dl>
          ))}
        </div>
      ) : <p style={{ margin: 0, fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)" }}>{grammar || "No grammar is recorded for this word."}</p>}

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
          {definition.replace(/<[^>]*>/g, "").length > LONG_ENTRY ? (
            <details className="sb-section" style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
              <summary style={{ cursor: "pointer", minHeight: "44px", display: "flex", alignItems: "center", fontFamily: "var(--U)", fontSize: "13.5px", fontWeight: 600, color: "var(--ink)" }}>The full dictionary entry</summary>
              <div style={{ ...entryStyle, padding: "0 0 12px" }} dangerouslySetInnerHTML={{ __html: definition }} />
            </details>
          ) : (
            <div style={entryStyle} dangerouslySetInnerHTML={{ __html: definition }} />
          )}

          <div style={panelH}>Where else it appears</div>
          <p style={{ margin: "0 0 8px", fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink)" }}>
            {occurrenceLine(lex.entry.n, lex.entry.r.length, wlang)}
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
        <button type="button" onClick={() => setSel({ kind: "verse", verse: sel.verse })} style={{ ...quietLink, border: "none", padding: 0, minHeight: "44px", cursor: "pointer", background: "none", fontFamily: "inherit", fontSize: "inherit" }}>
          Study the whole verse
        </button>
      </p>
    </div>
  );
}

type Copied = { what: "verse" | "link"; ok: boolean; at: string } | null;

function VerseStudy({ books, book, chapter, verse, lang, setSel, data, verseNotes, tab, onTab, mark, onMark, marksFailed }: PanelProps & { verse: BibleVerse }) {
  const [related, setRelated] = useState<CatalogueItem[] | null>(null);
  const { data: doctrines } = useLoad<Doctrine[]>("doctrines", fetchDoctrines);
  const entry = verseNotes ? noteForVerse(verseNotes, verse.v) : null;
  const tabsId = useId();
  useEffect(() => {
    let stale = false;
    fetchCatalogue()
      .then((c) => { if (!stale) setRelated(itemsForPassage(c.items, book.slug, chapter).slice(0, 8)); })
      .catch(() => { if (!stale) setRelated([]); });
    return () => { stale = true; };
  }, [book.slug, chapter]);

  const script = lang === "H" ? HEB : GRK;
  const refLabel = `${chapterBookName(book)} ${chapter}:${verse.v}`;
  const xrefs = useMemo(() => (verse.x ?? []).filter((r) => parseRef(r, books) !== null), [verse.x, books]);

  // What was copied belongs to the verse it was copied from; another verse starts clean.
  const at = `${book.slug}/${chapter}/${verse.v}`;
  const [copiedState, setCopied] = useState<Copied>(null);
  const copied = copiedState?.at === at ? copiedState : null;
  const copy = (what: "verse" | "link") => {
    const text = what === "verse" ? verseCopyText(verse.t, book.name, chapter, verse.v) : `${SITE_URL}${chapterHref(book.slug, chapter, verse.v)}`;
    void copyToClipboard(text).then((ok) => setCopied({ what, ok, at }));
  };
  const copyLabel = (what: "verse" | "link", idle: string) => (copied?.what === what ? (copied.ok ? "Copied" : "Couldn’t copy") : idle);

  const counts: Record<PanelTab, number> = { notes: entry ? 1 : 0, words: verse.w.length, xrefs: xrefs.length, translations: OTHER_TRANSLATIONS.length };
  // Arrow keys move along the tabs, as a tab list does.
  const onKeys = (e: React.KeyboardEvent) => {
    const i = PANEL_TABS.findIndex((t) => t.id === tab);
    const to = e.key === "ArrowRight" ? i + 1 : e.key === "ArrowLeft" ? i - 1 : e.key === "Home" ? 0 : e.key === "End" ? PANEL_TABS.length - 1 : null;
    if (to === null) return;
    e.preventDefault();
    const t = PANEL_TABS[(to + PANEL_TABS.length) % PANEL_TABS.length];
    onTab(t.id);
    document.getElementById(`${tabsId}-${t.id}`)?.focus();
  };

  return (
    <div>
      <p style={{ margin: "10px 0 0", fontFamily: "var(--font-reading)", fontSize: "18px", lineHeight: 1.6, color: "var(--ink)" }}>{verse.t || <i style={{ color: "var(--ink-muted)" }}>{LATER_NOTE}</i>}</p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", margin: "10px 0 0" }}>
        {verse.t && <button type="button" onClick={() => copy("verse")} style={pillBtn}>{copyLabel("verse", "Copy verse")}</button>}
        <button type="button" onClick={() => copy("link")} style={pillBtn}>{copyLabel("link", "Copy link")}</button>
      </div>
      <p role="status" style={{ margin: copied && !copied.ok ? "8px 0 0" : 0, fontFamily: "var(--U)", fontSize: "13px", lineHeight: 1.5, color: "var(--ink-muted)" }}>
        {copied && !copied.ok ? (copied.what === "verse" ? "This browser would not copy it. Select the verse above and copy it by hand." : "This browser would not copy it. The link is the address of this page with the verse number on the end.") : ""}
      </p>

      {/* Highlights and notes: their own small chunk, loaded when a verse is first opened. */}
      <Suspense fallback={<div className="sb-marks sb-marks--wait" />}>
        <VerseMarks label={refLabel} mark={mark} onSave={onMark} saveFailed={marksFailed} />
      </Suspense>

      <div role="tablist" aria-label={`Study ${refLabel}`} className="sb-tabs" onKeyDown={onKeys}>
        {PANEL_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            id={`${tabsId}-${t.id}`}
            aria-selected={tab === t.id}
            aria-controls={`${tabsId}-panel`}
            tabIndex={tab === t.id ? 0 : -1}
            data-empty={counts[t.id] === 0 || undefined}
            onClick={() => onTab(t.id)}
          >
            {t.name}
            {(t.id === "words" || t.id === "xrefs") && counts[t.id] > 0 && <span className="sb-tabs__n">{counts[t.id]}</span>}
            {counts[t.id] === 0 && <span className="sr-only"> (nothing here)</span>}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`${tabsId}-panel`} aria-labelledby={`${tabsId}-${tab}`} className="sb-tabpanel">
        {tab === "notes" && (
          <>
            {entry ? (
              <>
                {entry.v.includes("-") && <div style={{ ...panelH, marginTop: 0 }}>Notes on {chapter}:{entry.v.replace("-", "–")}</div>}
                <VerseEntry entry={entry} doctrines={doctrines} data={data} lang={lang} onWord={(v, i) => setSel({ kind: "word", verse: v, index: i })} />
              </>
            ) : (
              <p style={emptyLine}>There are no notes on this verse by itself. The notes on the whole chapter are below the text.</p>
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
              <Link href={`/search?q=${encodeURIComponent(`${book.name} ${chapter}`)}`} style={quietLink}>Search the site for {book.name} {chapter}</Link>
            </p>
          </>
        )}

        {tab === "words" && (
          verse.w.length > 0 ? (
            <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
              {verse.w.map((w, i) => (
                <li key={i}>
                  <button type="button" onClick={() => setSel({ kind: "word", verse, index: i })} style={{ display: "flex", width: "100%", gap: "10px", alignItems: "baseline", justifyContent: "space-between", minHeight: "44px", padding: "4px 0", border: "none", borderBottom: "1px solid var(--border)", background: "none", cursor: "pointer", textAlign: "left" }}>
                    <span lang={lang === "H" ? "he" : "grc"} style={{ ...script, direction: lang === "H" ? "rtl" : "ltr", fontSize: "18px", color: "var(--ink)" }}>{w[0]}</span>
                    <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink)", flex: 1, textAlign: "right" }}><Gloss text={w[2]} /></span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p style={emptyLine}>No {lang === "H" ? "Hebrew" : "Greek"} words are listed under this verse. Hebrew and English Bibles number some verses differently, so its words may sit under the verse beside it.</p>
          )
        )}

        {tab === "xrefs" && (
          <Suspense fallback={<p role="status" style={emptyLine}>Opening the cross-references…</p>}>
            <CrossRefList refs={xrefs} books={books} />
          </Suspense>
        )}

        {tab === "translations" && (
          <>
            <p style={emptyLine}>{refLabel} in other translations, on Bible Gateway (another site):</p>
            <ul style={{ listStyle: "none", margin: "10px 0 0", padding: 0, display: "flex", flexWrap: "wrap", gap: "8px" }}>
              {OTHER_TRANSLATIONS.map((t) => (
                <li key={t.code}>
                  <a href={translationHref(book.name, chapter, t.code, verse.v)} target="_blank" rel="noopener noreferrer" aria-label={`${refLabel} in the ${t.name}, on another site`} style={{ ...pillBtn, textDecoration: "none" }}>{t.name}</a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

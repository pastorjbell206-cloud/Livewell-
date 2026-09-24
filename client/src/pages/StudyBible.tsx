/**
 * /study/bible — the Study Bible (docs/STUDY-BIBLE-PROMPT.md, Phase 1).
 *
 *   /study/bible                     the front door: the story, the books, the doctrines
 *   /study/bible/:book               the book: its introduction and every chapter
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
import { useEffect, useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { Link, useRoute } from "wouter";
import { ArrowRight, ChevronLeft, ChevronRight, X } from "lucide-react";

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
import {
  fetchDoctrines,
  fetchIntro,
  fetchNote,
  fetchNotesIndex,
  fetchStory,
  fetchStoryline,
  flattenStory,
  itemsForPassage,
  readProgress,
  spreadKinds,
  type BookIntro,
  type ChapterNote,
} from "@/lib/bible-notes";
import { Band, Credits, H2, H3, Pill, Prose, RelatedList, card, kicker, useLoad } from "@/pages/study-bible/shared";
import { ChapterHead, ChapterNotesBody, OutlinePanel, useStoryPlace } from "@/pages/study-bible/ChapterNotes";

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
      {!slug && (
        <SEOMeta
          title="The Study Bible: Learn the Whole Story, With Hebrew and Greek"
          description="Learn the whole Bible: its one story in eleven acts, an introduction to every book, study notes on all 1,189 chapters with their history and culture, the doctrines they teach, and the Hebrew and Greek beneath every word."
          url="https://www.livewellbyjamesbell.co/study/bible"
        />
      )}
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
        <BookPage books={books} book={book} />
      ) : (
        <BookIndex books={books} />
      )}
      <Credits />
    </Layout>
  );
}

// ── the front door ───────────────────────────────────────────────────────────

/** The traditional sections of the Protestant canon, by position in books.json. */
const SECTIONS: { label: string; from: number; to: number }[] = [
  { label: "The Law", from: 0, to: 4 },
  { label: "History", from: 5, to: 16 },
  { label: "Poetry and Wisdom", from: 17, to: 21 },
  { label: "The Prophets", from: 22, to: 38 },
  { label: "The Gospels and Acts", from: 39, to: 43 },
  { label: "The Letters", from: 44, to: 64 },
  { label: "Revelation", from: 65, to: 65 },
];

function BookIndex({ books }: { books: BibleBook[] }) {
  const { data: index } = useLoad("notes-index", fetchNotesIndex);
  const { data: next } = useLoad("story-next", () =>
    fetchStory().then((story) => {
      const progress = readProgress();
      if (!progress.size) return null;
      return flattenStory(story).find((s) => !progress.has(`${s.slug}/${s.chapter}`)) ?? null;
    })
  );
  const nameOf = (slug: string) => books.find((b) => b.slug === slug)?.name ?? slug;
  const doors: { href: string; kicker: string; title: string; body: string }[] = [
    { href: "/study/bible/story", kicker: "Start here", title: "The Story of the Bible", body: "The whole Bible as one story in eleven acts, from creation to new creation, with the history behind each act and every chapter in the order it happened." },
    { href: "#books", kicker: "Book by book", title: "The Sixty-Six Books", body: "An introduction to every book (who wrote it, when, why, and how it is built), then study notes on each of its chapters." },
    { href: "/study/bible/doctrines", kicker: "What it teaches", title: "The Doctrines", body: "God, creation, sin, covenant, Christ, salvation, the Spirit, the church, and the last things, each traced through every chapter that teaches it." },
  ];
  return (
    <>
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "12px" }}>The Study Bible</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(2.3rem, 5.4vw, 3.8rem)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.05, color: "var(--ink)", margin: "0 0 16px", textWrap: "balance" }}>Learn the whole Bible</h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "1.12rem", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "66ch", margin: 0 }}>
            Whether you have never opened it or have read it for years. Every chapter comes with notes on its history, its culture, how it is built, what it teaches, and where it sits in the one story that runs from Genesis to Revelation. Underneath every English word are the Hebrew and Greek it translates.
          </p>
          {next && (
            <p style={{ margin: "var(--s-4) 0 0" }}>
              <Link href={`${chapterHref(next.slug, next.chapter)}?path=story`} style={{ display: "inline-flex", alignItems: "center", gap: "8px", minHeight: "46px", padding: "0 20px", background: "var(--ink)", color: "var(--bone)", borderRadius: "999px", textDecoration: "none", backgroundImage: "none", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600 }}>
                Continue the story: {nameOf(next.slug)} {next.chapter} <ArrowRight size={16} aria-hidden />
              </Link>
            </p>
          )}
        </div>
      </section>
      <section style={{ background: "var(--bone)", padding: "0 var(--s-4) var(--s-6)" }}>
        <ul style={{ ...wrap, listStyle: "none", padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "14px" }}>
          {doors.map((d) => (
            <li key={d.href}>
              <Link href={d.href} style={{ ...card, display: "grid", gap: "8px", height: "100%", padding: "var(--s-4)", textDecoration: "none", backgroundImage: "none", color: "var(--ink)" }}>
                <span style={kicker}>{d.kicker}</span>
                <span style={{ fontFamily: "var(--F)", fontSize: "1.65rem", lineHeight: 1.1 }}>{d.title}</span>
                <span style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{d.body}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <section id="books" style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)", scrollMarginTop: "70px" }}>
        <div style={{ ...wrap, display: "grid", gap: "var(--s-5)" }}>
          <H2>The Sixty-Six Books</H2>
          {SECTIONS.map((sec) => (
            <div key={sec.label}>
              <H3>{sec.label}</H3>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))", gap: "8px" }}>
                {books.slice(sec.from, sec.to + 1).map((b) => (
                  <li key={b.code}>
                    <Link href={`/study/bible/${b.slug}`} style={{ ...card, display: "grid", gap: "4px", height: "100%", padding: "10px 14px", color: "var(--ink)", textDecoration: "none", backgroundImage: "none" }}>
                      <span style={{ display: "flex", justifyContent: "space-between", gap: "8px", fontFamily: "var(--U)", fontSize: "14.5px", fontWeight: 600 }}>
                        <span>{b.name}</span>
                        <span style={{ color: "var(--ink-muted)", fontSize: "12px", fontWeight: 400 }}>{b.chapters} ch.</span>
                      </span>
                      {index?.taglines[b.slug] && <span style={{ fontFamily: "var(--B)", fontSize: "13.5px", lineHeight: 1.45, color: "var(--ink-muted)" }}>{index.taglines[b.slug]}</span>}
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

// ── a book ───────────────────────────────────────────────────────────────────

function BookPage({ books, book }: { books: BibleBook[]; book: BibleBook }) {
  const { data: intro } = useLoad<BookIntro>(`intro-${book.slug}`, () => fetchIntro(book.slug));
  const { data: index } = useLoad("notes-index", fetchNotesIndex);
  const { data: act } = useLoad(`act-${book.slug}`, () =>
    Promise.all([fetchStory(), fetchStoryline()]).then(([story, line]) => {
      const a = story.acts.find((x) => x.path.some((r) => r.book === book.slug));
      const l = a && line.find((x) => x.id === a.id);
      return l ? { id: l.id, label: l.act, title: l.title } : null;
    })
  );
  const { data: related } = useLoad(`book-related-${book.slug}`, () =>
    fetchCatalogue().then((c) => spreadKinds(itemsForPassage(c.items, books, book.slug), 8))
  );
  const { data: doctrines } = useLoad("doctrines", fetchDoctrines);
  const titles = index?.titles[book.slug] ?? [];
  const testament = book.testament === "OT" ? "The Old Testament" : "The New Testament";

  return (
    <>
      {intro ? (
        <SEOMeta title={`${book.name}: Introduction, Outline, and Study Notes`} description={intro.tagline} url={`https://www.livewellbyjamesbell.co/study/bible/${book.slug}`} />
      ) : (
        <SEOMeta title={`${book.name}: Study Notes, Hebrew and Greek`} description={`Every chapter of ${book.name} with study notes and the original language beneath every word.`} url={`https://www.livewellbyjamesbell.co/study/bible/${book.slug}`} />
      )}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "12px" }}>
            <span><Link href="/study/bible" style={{ color: "inherit", textDecoration: "none", backgroundImage: "none" }}>The Study Bible</Link> · {testament}</span>
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(2.3rem, 5.4vw, 3.8rem)", fontWeight: 400, letterSpacing: "-0.02em", lineHeight: 1.05, color: "var(--ink)", margin: "0 0 14px" }}>{book.name}</h1>
          {intro && <p style={{ fontFamily: "var(--B)", fontSize: "1.15rem", lineHeight: 1.65, color: "var(--ink-muted)", maxWidth: "62ch", margin: "0 0 14px" }}>{intro.tagline}</p>}
          <p style={{ margin: 0, fontFamily: "var(--U)", fontSize: "13.5px", color: "var(--ink-muted)", display: "flex", flexWrap: "wrap", gap: "6px 14px" }}>
            <span>{book.chapters} chapter{book.chapters === 1 ? "" : "s"}</span>
            {act && <span>In the story: <Link href={`/study/bible/story/${act.id}`} style={quietLink}>{act.label}, {act.title}</Link></span>}
            <a href="#chapters" style={quietLink}>Go to the chapters</a>
          </p>
        </div>
      </section>

      {intro && (
        <>
          <Band>
            <H2>What this book is</H2>
            <Prose text={intro.overview} />
          </Band>
          <Band tone="warm">
            <H2>How it is built</H2>
            <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "10px", maxWidth: "72ch" }}>
              {intro.structure.map((s) => {
                const first = parseInt(s.range, 10);
                return (
                  <li key={s.range} style={{ ...card, padding: "14px var(--s-4)" }}>
                    <Link href={chapterHref(book.slug, first)} style={{ ...quietLink, textDecoration: "none", display: "block" }}>
                      <span style={kicker}>{book.name} {s.range.replace(/-/g, "–")}</span>
                      <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "1.3rem", margin: "4px 0" }}>{s.title}</span>
                    </Link>
                    <span style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink)" }}>{s.summary}</span>
                  </li>
                );
              })}
            </ol>
          </Band>
        </>
      )}

      <section id="chapters" style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)", scrollMarginTop: "70px" }}>
        <div style={wrap}>
          <H2>The chapters</H2>
          <ol aria-label={`Chapters of ${book.name}`} style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: titles.some(Boolean) ? "repeat(auto-fill, minmax(250px, 1fr))" : "repeat(auto-fill, minmax(56px, 1fr))", gap: "8px" }}>
            {Array.from({ length: book.chapters }, (_, i) => i + 1).map((n) => {
              const title = titles[n - 1];
              return (
                <li key={n}>
                  <Link href={chapterHref(book.slug, n)} aria-label={`${book.name} chapter ${n}${title ? `: ${title}` : ""}`} style={{ ...card, display: "flex", alignItems: "center", gap: "12px", minHeight: "48px", height: "100%", padding: title ? "8px 12px" : 0, justifyContent: title ? "flex-start" : "center", color: "var(--ink)", textDecoration: "none", backgroundImage: "none" }}>
                    <span style={{ flex: "0 0 auto", fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, minWidth: title ? "28px" : undefined, textAlign: "center" }}>{n}</span>
                    {title && <span style={{ fontFamily: "var(--B)", fontSize: "14.5px", lineHeight: 1.4 }}>{title}</span>}
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {intro && (
        <>
          <Band tone="warm">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--s-5)" }}>
              <div><H3>Who wrote it</H3><Prose text={intro.author} size={16} /></div>
              <div><H3>When</H3><Prose text={intro.date} size={16} /></div>
              <div><H3>The world it was written in</H3><Prose text={intro.setting} size={16} /></div>
              <div><H3>Why it was written</H3><Prose text={intro.purpose} size={16} /></div>
            </div>
          </Band>
          <Band>
            <H2>Where it sits in the story</H2>
            <Prose text={intro.story} />
            <div style={{ height: "var(--s-4)" }} />
            <H2>{book.testament === "OT" ? "How it points to Christ" : "What it shows of Christ"}</H2>
            <Prose text={intro.christ} />
          </Band>
          <Band tone="warm">
            <H2>Themes to follow</H2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "14px" }}>
              {intro.themes.map((t) => (
                <div key={t.title} style={{ ...card, padding: "var(--s-4)" }}>
                  <H3>{t.title}</H3>
                  <p style={{ margin: 0, fontFamily: "var(--B)", fontSize: "15.5px", lineHeight: 1.65, color: "var(--ink)" }}>{t.body}</p>
                </div>
              ))}
            </div>
          </Band>
          <Band>
            <H2>Chapters to start with</H2>
            <ul style={{ listStyle: "none", margin: "0 0 var(--s-5)", padding: 0, display: "grid", gap: "10px", maxWidth: "72ch" }}>
              {intro.keyChapters.map((k) => (
                <li key={k.ch} style={{ display: "flex", gap: "14px", alignItems: "baseline" }}>
                  <Link href={chapterHref(book.slug, k.ch)} style={{ ...quietLink, flex: "0 0 auto", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600 }}>{book.name} {k.ch}</Link>
                  <span style={{ fontFamily: "var(--B)", fontSize: "15.5px", lineHeight: 1.6, color: "var(--ink)" }}>{k.why}</span>
                </li>
              ))}
            </ul>
            <H2>How to read it well</H2>
            <Prose text={intro.reading} />
            {intro.doctrines.length > 0 && (
              <>
                <div style={{ ...kicker, margin: "var(--s-4) 0 10px" }}>Doctrines it teaches</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {intro.doctrines.map((d) => <Pill key={d} href={`/study/bible/doctrines/${d}`}>{doctrines?.find((x) => x.id === d)?.name ?? d}</Pill>)}
                </div>
              </>
            )}
          </Band>
        </>
      )}

      {related && related.length > 0 && (
        <Band tone={intro ? "warm" : "bone"}>
          <H2>{book.name} on LiveWell</H2>
          <RelatedList items={related} />
        </Band>
      )}
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
  const { data: note } = useLoad<ChapterNote>(valid ? `note-${book.slug}/${chapter}` : null, () => fetchNote(book.slug, chapter));
  const place = useStoryPlace(book.slug, chapter);
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

  // A #notes link (from a doctrine page) lands on the notes once they exist.
  useEffect(() => {
    if (note && data && typeof window !== "undefined" && window.location.hash === "#notes")
      requestAnimationFrame(() => document.getElementById("notes")?.scrollIntoView({ block: "start" }));
  }, [note, data]);

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
  const onVerse = (v: BibleVerse) => setSel({ kind: "verse", verse: v });
  const onWord = (v: BibleVerse, i: number) => setSel({ kind: "word", verse: v, index: i });

  return (
    <>
      <SEOMeta
        title={note ? `${book.name} ${chapter} Study Notes \u2013 ${note.title}` : `${book.name} ${chapter} Study Notes, Hebrew and Greek`}
        description={note?.summary ?? `${book.name} ${chapter} with study notes, cross-references, and the ${lang === "H" ? "Hebrew" : "Greek"} beneath every word.`}
        url={`https://www.livewellbyjamesbell.co/study/bible/${book.slug}/${chapter}`}
        type="article"
      />
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
            <ChapterHead note={note} place={place} />
            {failed && !data ? (
              <LoadFailed what={`${book.name} ${chapter}`} onRetry={() => { setFailedKey(null); setNonce((n) => n + 1); }} backHref={`/study/bible/${book.slug}`} backLabel={`All of ${book.name}`} />
            ) : !data ? (
              <p role="status" style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Opening {book.name} {chapter}…</p>
            ) : mode === "reading" ? (
              <ReadingText data={data} sel={sel} onVerse={onVerse} />
            ) : (
              <Interlinear data={data} lang={lang} sel={sel} onVerse={onVerse} onWord={onWord} />
            )}
            {data && (
              <p style={{ marginTop: "var(--s-5)", fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", maxWidth: "68ch" }}>
                Tap a verse number to study the verse{mode === "interlinear" ? ", or any word to study the word" : `. Switch to ${lang === "H" ? "Hebrew" : "Greek"} to see every word beneath the English`}.
              </p>
            )}
            {note && <ChapterNotesBody books={books} book={book} chapter={chapter} note={note} data={data} place={place} onWord={onWord} onVerse={onVerse} />}
          </div>
          {wide && (
            <aside aria-label="Study panel" style={{ flex: "0 0 380px", position: "sticky", top: "88px", maxHeight: "calc(100vh - 110px)", overflowY: "auto", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "var(--s-4)" }}>
              {panel ?? (note ? <OutlinePanel note={note} data={data} onVerse={onVerse} /> : <p style={{ margin: 0, fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink-muted)" }}>Choose a verse number or a word, and its study opens here.</p>)}
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
    fetchCatalogue()
      .then((c) => { if (!stale) setRelated(itemsForPassage(c.items, books, book.slug, chapter).slice(0, 8)); })
      .catch(() => { if (!stale) setRelated([]); });
    return () => { stale = true; };
  }, [books, book.slug, chapter]);

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

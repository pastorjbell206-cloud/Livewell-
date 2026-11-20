/**
 * The Wisdom Books Explorer (/tools/wisdom-books): Proverbs and Ecclesiastes.
 * Proverbs read three ways: today's chapter (the day of the month, the old
 * habit of a chapter a day), every verse on one of twenty themes in book
 * order, or chapter by chapter. Ecclesiastes read two ways: every verse on
 * one of sixteen themes fitted to that book, or chapter by chapter. Each
 * chapter is laid out under the Study Bible's own outline, title and summary;
 * any verse in a theme opens to the verses around it; and a fixed panel
 * teaches in the Study Bible's own words how to read the book (a proverb: a
 * pattern, not a promise, with 26:4-5 side by side; Ecclesiastes: the
 * readings of hevel and of the epilogue, given side by side, no side taken).
 *
 * Content as data (client/public/wisdom-books/, built and checked by
 * scripts/build-wisdom-books-index.mjs and scripts/validate-wisdom-books.mjs):
 * the BSB word for word, the notes word for word, the themes tagged by hand.
 * Not listed on the Tools door or in any menu until James names it; reachable
 * by its address and from the Wisdom Finder, and noindex.
 *
 * Built on the tool shell: ToolHead, QuestionCard, useToolProgress
 * (`livewell-progress-wisdom-books`: the book, and Proverbs' way in, theme,
 * chapter, chapters marked read and lines kept, in the shape it has always
 * had; `livewell-progress-wisdom-books-ecclesiastes`: the same for
 * Ecclesiastes), ResultSection, ResultNext, ResultActions.
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "wouter";
import { BookOpen, Check, ChevronLeft, ChevronRight, X } from "lucide-react";
import Layout from "@/components/Layout";
import LoadFailed from "@/components/LoadFailed";
import { SEOMeta } from "@/components/SEOMeta";
import {
  QuestionCard,
  ResultActions,
  ResultNext,
  ResultSection,
  SAVE_FAILED,
  ToolHead,
  useToolProgress,
} from "@/components/tool-shell";
import {
  WB_BOOKS,
  bookChapters,
  bookName,
  fetchWbChapter,
  fetchWbIndex,
  fetchWbTheme,
  outlineStart,
  studyHref,
  todaysChapter,
  type WbBook,
  type WbChapter,
  type WbIndex,
  type WbThemeFile,
} from "@/lib/wisdom-books";
import "./wisdom-books.css";

type Way = "today" | "theme" | "chapter";

interface Kept {
  c: number;
  v: number;
  t: string;
}

interface Place {
  /** The book shown; kept in Proverbs' place only (absent means Proverbs). */
  book?: WbBook;
  way: Way | null;
  theme: string | null;
  chapter: number;
  read: number[];
  kept: Kept[];
}

const isKept = (k: unknown): k is Kept =>
  !!k &&
  typeof k === "object" &&
  typeof (k as Kept).c === "number" &&
  typeof (k as Kept).v === "number" &&
  typeof (k as Kept).t === "string";
const isPlace = (x: unknown): x is Place => {
  const p = x as Place;
  return (
    !!p &&
    typeof p === "object" &&
    (p.book === undefined || p.book === "proverbs" || p.book === "ecclesiastes") &&
    (p.way === null ||
      p.way === "today" ||
      p.way === "theme" ||
      p.way === "chapter") &&
    (p.theme === null || typeof p.theme === "string") &&
    typeof p.chapter === "number" &&
    p.chapter >= 1 &&
    p.chapter <= 31 &&
    Array.isArray(p.read) &&
    p.read.every(n => typeof n === "number") &&
    Array.isArray(p.kept) &&
    p.kept.every(isKept)
  );
};

const KEEP_MAX = 12;
const refIn = (b: WbBook) => (c: number, v: number) => `${bookName(b)} ${c}:${v}`;

function useChapter(n: number | null, book: WbBook) {
  const [cache, setCache] = useState<Map<number, WbChapter>>(new Map());
  const [failed, setFailed] = useState<number | null>(null);
  const [nonce, setNonce] = useState(0);
  // A new book starts a new cache.
  const [cacheBook, setCacheBook] = useState(book);
  if (cacheBook !== book) {
    setCacheBook(book);
    setCache(new Map());
    setFailed(null);
  }
  useEffect(() => {
    if (n === null || cache.has(n) || cacheBook !== book) return;
    let stale = false;
    fetchWbChapter(n, book)
      .then(d => {
        if (!stale) setCache(m => new Map(m).set(n, d));
      })
      .catch(() => {
        if (!stale) setFailed(n);
      });
    return () => {
      stale = true;
    };
  }, [n, cache, nonce, book, cacheBook]);
  return {
    get: (c: number) => cache.get(c) ?? null,
    load: (c: number) =>
      !cache.has(c) &&
      fetchWbChapter(c, book)
        .then(d => setCache(m => new Map(m).set(c, d)))
        .catch(() => undefined),
    failed,
    retry: () => {
      setFailed(null);
      setNonce(x => x + 1);
    },
  };
}

function KeepButton({
  verse,
  kept,
  onToggle,
  refOf,
}: {
  verse: Kept;
  kept: boolean;
  onToggle: () => void;
  refOf: (c: number, v: number) => string;
}) {
  return (
    <button
      type="button"
      className="wb-keep"
      aria-pressed={kept}
      onClick={onToggle}
    >
      {kept ? <Check size={14} strokeWidth={2} aria-hidden="true" /> : null}
      Keep this line
      <span className="sr-only"> ({refOf(verse.c, verse.v)})</span>
    </button>
  );
}

export default function WisdomBooks() {
  const today = todaysChapter();
  const main = useToolProgress<Place>("wisdom-books", isPlace, {
    way: null,
    theme: null,
    chapter: today,
    read: [],
    kept: [],
  });
  const ecc = useToolProgress<Place>("wisdom-books-ecclesiastes", isPlace, {
    way: null,
    theme: null,
    chapter: 1,
    read: [],
    kept: [],
  });
  const book: WbBook = main.value.book ?? "proverbs";
  const isProverbs = book === "proverbs";
  const place = isProverbs ? main : ecc;
  const p = place.value;
  const name = bookName(book);
  const total = bookChapters(book);
  const ref = refIn(book);
  // The index of the book shown; one loaded for another book is not shown.
  const [loaded, setLoaded] = useState<{ book: WbBook; data: WbIndex } | null>(
    null
  );
  const index = loaded?.book === book ? loaded.data : null;
  const [indexFailed, setIndexFailed] = useState(false);
  const [indexNonce, setIndexNonce] = useState(0);
  const [themeFile, setThemeFile] = useState<
    (WbThemeFile & { book: WbBook }) | null
  >(null);
  const [themeFailed, setThemeFailed] = useState<string | null>(null);
  const [themeNonce, setThemeNonce] = useState(0);
  const [open, setOpen] = useState<string | null>(null);
  // Set when the reader picks a chapter or a theme: the view's heading takes
  // focus (and comes into view) once its verses have arrived.
  const wantView = useRef(false);

  const shownChapter =
    p.way === "today" && isProverbs
      ? today
      : p.way === "chapter"
        ? Math.min(p.chapter, total)
        : null;
  const chapters = useChapter(shownChapter, book);
  const chapter = shownChapter !== null ? chapters.get(shownChapter) : null;

  useEffect(() => {
    let stale = false;
    fetchWbIndex(book)
      .then(d => !stale && setLoaded({ book, data: d }))
      .catch(() => !stale && setIndexFailed(true));
    return () => {
      stale = true;
    };
  }, [indexNonce, book]);

  useEffect(() => {
    if (p.way !== "theme" || !p.theme) return;
    if (themeFile?.id === p.theme && themeFile.book === book) return;
    let stale = false;
    const id = p.theme;
    fetchWbTheme(id, book)
      .then(d => !stale && setThemeFile({ ...d, book }))
      .catch(() => !stale && setThemeFailed(id));
    return () => {
      stale = true;
    };
  }, [p.way, p.theme, themeFile, themeNonce, book]);

  useEffect(() => {
    if (!wantView.current) return;
    const h = document.getElementById("wb-view-h");
    if (!h) return;
    wantView.current = false;
    (h.closest("section") ?? h).scrollIntoView?.({ block: "start" });
    h.focus({ preventScroll: true });
  });

  const theme = useMemo(
    () => index?.themes.find(t => t.id === p.theme) ?? null,
    [index, p.theme]
  );
  const themeName = useMemo(
    () => new Map(index?.themes.map(t => [t.id, t.name]) ?? []),
    [index]
  );
  const isKeptLine = (c: number, v: number) =>
    p.kept.some(k => k.c === c && k.v === v);
  const toggleKeep = (k: Kept) =>
    place.set(x => ({
      ...x,
      kept: x.kept.some(y => y.c === k.c && y.v === k.v)
        ? x.kept.filter(y => !(y.c === k.c && y.v === k.v))
        : [k, ...x.kept].slice(0, KEEP_MAX),
    }));
  const goChapter = (n: number) => {
    setOpen(null);
    place.set(x => ({ ...x, way: "chapter", chapter: n }));
    wantView.current = true;
  };
  const goTheme = (id: string) => {
    setOpen(null);
    place.set(x => ({ ...x, way: "theme", theme: id }));
    wantView.current = true;
  };

  // Chapter verses grouped under the Study Bible's outline.
  const sections = useMemo(() => {
    if (!chapter) return [];
    const starts = chapter.outline
      .map(o => ({ ...o, start: outlineStart(o.v) }))
      .sort((a, b) => a.start - b.start);
    if (!starts.length || starts[0].start > 1)
      starts.unshift({ v: "", t: "", start: 1 });
    return starts.map((s, i) => ({
      ...s,
      verses: chapter.verses.filter(
        v =>
          v.v >= s.start &&
          (i + 1 >= starts.length || v.v < starts[i + 1].start)
      ),
    }));
  }, [chapter]);

  const read = (n: number) => p.read.includes(n);
  const toggleRead = (n: number) =>
    place.set(x => ({
      ...x,
      read: x.read.includes(n)
        ? x.read.filter(y => y !== n)
        : [...x.read, n].sort((a, b) => a - b),
    }));

  return (
    <Layout>
      <SEOMeta
        title="The Wisdom Books Explorer: Proverbs by Theme"
        description="Every verse of Proverbs gathered under twenty themes, a chapter for each day of the month, and the Study Bible's notes beside each chapter."
        url="https://www.livewellbyjamesbell.co/tools/wisdom-books"
        noindex
      />

      <ToolHead
        path="/tools/wisdom-books"
        title="The Wisdom Books Explorer"
        line="All of Proverbs, read three ways: today's chapter, every verse on one theme, or chapter by chapter, with the Study Bible's outline and notes beside each chapter."
        time="Five minutes for a chapter; as long as you like for a theme"
        keeps="The chapters you mark read and the lines you keep stay in this browser and are never sent anywhere."
        plate="book"
      >
        <p className="ts-note">
          Ecclesiastes is here too, by its own themes and chapter by chapter:
          choose the book below.
        </p>
      </ToolHead>

      {indexFailed ? (
        <LoadFailed
          what={`${name} by theme`}
          onRetry={() => {
            setIndexFailed(false);
            setIndexNonce(n => n + 1);
          }}
          backHref="/tools/wisdom-finder"
          backLabel="Back to the Wisdom Finder"
        />
      ) : (
        <>
          <section className="ts-band wb-pick" aria-label="How to read">
            <div className="ts-col">
              <QuestionCard
                question="Which book?"
                options={WB_BOOKS.map(b => ({
                  value: b.id,
                  label: b.name,
                  hint:
                    b.id === "proverbs"
                      ? "Thirty-one chapters of sayings on wisdom and folly, gathered under twenty themes."
                      : "Twelve chapters of the Teacher's search under the sun, gathered under sixteen themes of its own.",
                }))}
                value={book}
                onChange={v => {
                  setOpen(null);
                  main.set(x => ({ ...x, book: v as WbBook }));
                }}
              />
              <QuestionCard
                question={`How would you like to read ${name}?`}
                options={[
                  ...(isProverbs
                    ? [
                        {
                          value: "today",
                          label: `Today's chapter: Proverbs ${today}`,
                          hint: "One chapter for each day of the month, the whole chapter.",
                        },
                      ]
                    : []),
                  {
                    value: "theme",
                    label: "By theme",
                    hint: index
                      ? `${index.themes.length} themes, every verse on each, in the order the book gives them.`
                      : "Every verse on one theme, in the order the book gives them.",
                  },
                  {
                    value: "chapter",
                    label: "Chapter by chapter",
                    hint: isProverbs
                      ? "Thirty-one chapters, each under the Study Bible's outline."
                      : "Twelve chapters, each under the Study Bible's outline.",
                  },
                ]}
                value={!isProverbs && p.way === "today" ? null : p.way}
                onChange={v => {
                  setOpen(null);
                  place.set(x => ({ ...x, way: v as Way }));
                }}
              />
              {p.read.length > 0 && (
                <p className="ts-count" style={{ marginTop: "var(--s-2)" }}>
                  {p.read.length} of {total} chapters marked read
                </p>
              )}
              {place.saveFailed && (
                <p className="ts-save-failed">{SAVE_FAILED}</p>
              )}
            </div>
          </section>

          {p.way === "theme" && index && (
            <section
              className="ts-band ts-band--warm wb-pick"
              aria-label="Choose a theme"
            >
              <div className="ts-col">
                <QuestionCard
                  question="Which theme?"
                  options={index.themes.map(t => ({
                    value: t.id,
                    label: t.name,
                    hint: `${t.count} verses. ${t.line}`,
                  }))}
                  value={p.theme}
                  onChange={id => {
                    setOpen(null);
                    place.set(x => ({ ...x, theme: id }));
                  }}
                  columns={2}
                  numbered={false}
                />
              </div>
            </section>
          )}

          {p.way === "chapter" && index && (
            <section
              className="ts-band ts-band--warm wb-pick"
              aria-labelledby="wb-chapters-h"
            >
              <div className="ts-col">
                <h2 id="wb-chapters-h" className="ts-r__title">
                  Choose a chapter
                </h2>
                <ul className="wb-chapters">
                  {index.chapters.map(c => (
                    <li key={c.n}>
                      <button
                        type="button"
                        className="wb-chapters__btn"
                        aria-pressed={p.chapter === c.n}
                        onClick={() => goChapter(c.n)}
                        title={c.title}
                      >
                        <span aria-hidden="true">{c.n}</span>
                        <span className="sr-only">
                          {name} {c.n}: {c.title}
                          {read(c.n) ? ", marked read" : ""}
                        </span>
                        {read(c.n) && (
                          <Check
                            className="wb-chapters__read"
                            size={12}
                            strokeWidth={2.25}
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* The view: a chapter (today's or the chosen one), or a theme. */}
          {shownChapter !== null && (
            <section className="ts-band wb-view" aria-labelledby="wb-view-h">
              <div className="ts-col">
                {chapters.failed === shownChapter ? (
                  <LoadFailed
                    what={`${name} ${shownChapter}`}
                    onRetry={chapters.retry}
                  />
                ) : !chapter ? (
                  <p className="ts-count" role="status">
                    Opening {name} {shownChapter}…
                  </p>
                ) : (
                  <>
                    <p className="wb-kicker">
                      {p.way === "today" && isProverbs
                        ? `Today's chapter · Proverbs ${chapter.n}`
                        : `${name} ${chapter.n} of ${total}`}
                    </p>
                    <h2
                      id="wb-view-h"
                      className="ts-part__title"
                      tabIndex={-1}
                      style={{ marginTop: 0 }}
                    >
                      {chapter.title}
                    </h2>
                    <p className="ts-part__line">{chapter.summary}</p>
                    <p className="wb-source">
                      Title, summary and outline from the Study Bible's notes on{" "}
                      {name} {chapter.n}.
                    </p>
                    {sections.map(s =>
                      s.verses.length ? (
                        <div key={`${s.start}`} className="wb-sec">
                          {s.t && (
                            <h3 className="wb-sec__title">
                              {s.t} <span className="wb-sec__range">{s.v}</span>
                            </h3>
                          )}
                          <ol className="wb-verses">
                            {s.verses.map(v => (
                              <li
                                key={v.v}
                                id={`p-${chapter.n}-${v.v}`}
                                className="wb-verse"
                              >
                                <span
                                  className="wb-verse__n"
                                  aria-hidden="true"
                                >
                                  {v.v}
                                </span>
                                <div className="wb-verse__body">
                                  <p className="wb-verse__text">
                                    <span className="sr-only">
                                      Verse {v.v}.{" "}
                                    </span>
                                    {v.t}
                                  </p>
                                  <div className="wb-verse__tools">
                                    {v.themes
                                      .filter(id => id !== "heading")
                                      .map(id => (
                                        <button
                                          key={id}
                                          type="button"
                                          className="wb-chip"
                                          onClick={() => goTheme(id)}
                                        >
                                          {themeName.get(id) ?? id}
                                        </button>
                                      ))}
                                    <KeepButton
                                      refOf={ref}
                                      verse={{ c: chapter.n, v: v.v, t: v.t }}
                                      kept={isKeptLine(chapter.n, v.v)}
                                      onToggle={() =>
                                        toggleKeep({
                                          c: chapter.n,
                                          v: v.v,
                                          t: v.t,
                                        })
                                      }
                                    />
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ol>
                        </div>
                      ) : null
                    )}
                    <div className="wb-done">
                      <label className="wb-done__label">
                        <input
                          type="checkbox"
                          checked={read(chapter.n)}
                          onChange={() => toggleRead(chapter.n)}
                        />{" "}
                        I have read {name} {chapter.n}
                      </label>
                      <Link
                        href={studyHref(chapter.n, undefined, book)}
                        className="btn--text"
                      >
                        <BookOpen
                          size={16}
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />{" "}
                        The Study Bible's notes on {name} {chapter.n}
                      </Link>
                    </div>
                    <div className="ts-nav no-print">
                      {chapter.n > 1 ? (
                        <button
                          type="button"
                          className="btn--text"
                          onClick={() => goChapter(chapter.n - 1)}
                        >
                          <ChevronLeft
                            size={16}
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />{" "}
                          {name} {chapter.n - 1}
                        </button>
                      ) : (
                        <span />
                      )}
                      {chapter.n < total && (
                        <button
                          type="button"
                          className="btn--text"
                          onClick={() => goChapter(chapter.n + 1)}
                        >
                          {name} {chapter.n + 1}{" "}
                          <ChevronRight
                            size={16}
                            strokeWidth={1.75}
                            aria-hidden="true"
                          />
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            </section>
          )}

          {p.way === "theme" && theme && (
            <section className="ts-band wb-view" aria-labelledby="wb-view-h">
              <div className="ts-col">
                <p className="wb-kicker">
                  A theme in {name} · {theme.count} verses
                </p>
                <h2
                  id="wb-view-h"
                  className="ts-part__title"
                  tabIndex={-1}
                  style={{ marginTop: 0 }}
                >
                  {theme.name}
                </h2>
                <p className="ts-part__line">{theme.line}</p>
                {theme.note && (
                  <aside
                    className="wb-note"
                    aria-label={`From the Study Bible: ${theme.note.title}`}
                  >
                    <p className="wb-note__kicker">
                      From the Study Bible's introduction to {name}:{" "}
                      {theme.note.title}
                    </p>
                    <p>{theme.note.body}</p>
                  </aside>
                )}
                {themeFailed === theme.id ? (
                  <LoadFailed
                    what={theme.name}
                    onRetry={() => {
                      setThemeFailed(null);
                      setThemeNonce(n => n + 1);
                    }}
                  />
                ) : !themeFile ||
                  themeFile.id !== theme.id ||
                  themeFile.book !== book ? (
                  <p className="ts-count" role="status">
                    Gathering the verses…
                  </p>
                ) : (
                  <ol className="wb-tverses">
                    {themeFile.verses.map(v => {
                      const key = `${v.c}:${v.v}`;
                      const isOpen = open === key;
                      const around = isOpen ? chapters.get(v.c) : null;
                      return (
                        <li key={key} className="wb-tverse">
                          <button
                            type="button"
                            className="wb-tverse__ref"
                            aria-expanded={isOpen}
                            aria-controls={`wb-around-${v.c}-${v.v}`}
                            onClick={() => {
                              setOpen(isOpen ? null : key);
                              if (!isOpen) chapters.load(v.c);
                            }}
                          >
                            {ref(v.c, v.v)}
                            <span className="sr-only">, </span>
                            <span className="wb-tverse__hint">
                              {isOpen ? "Close" : "The verses around it"}
                            </span>
                          </button>
                          <p className="wb-tverse__text">{v.t}</p>
                          <div
                            id={`wb-around-${v.c}-${v.v}`}
                            hidden={!isOpen}
                            className="wb-around"
                          >
                            {isOpen &&
                              (around ? (
                                <>
                                  <ol className="wb-around__list">
                                    {around.verses
                                      .filter(
                                        x => x.v >= v.v - 2 && x.v <= v.v + 2
                                      )
                                      .map(x => (
                                        <li
                                          key={x.v}
                                          aria-current={
                                            x.v === v.v ? "true" : undefined
                                          }
                                        >
                                          <span className="wb-verse__n">
                                            {x.v}
                                          </span>{" "}
                                          {x.t}
                                        </li>
                                      ))}
                                  </ol>
                                  <p className="wb-around__links">
                                    <button
                                      type="button"
                                      className="btn--text"
                                      onClick={() => goChapter(v.c)}
                                    >
                                      Read all of {name} {v.c} here
                                    </button>
                                    <Link
                                      href={studyHref(v.c, undefined, book)}
                                      className="btn--text"
                                    >
                                      Notes on {name} {v.c}
                                    </Link>
                                  </p>
                                </>
                              ) : (
                                <p className="ts-count" role="status">
                                  Opening {name} {v.c}…
                                </p>
                              ))}
                          </div>
                          <div className="wb-verse__tools">
                            <KeepButton
                              refOf={ref}
                              verse={v}
                              kept={isKeptLine(v.c, v.v)}
                              onToggle={() => toggleKeep(v)}
                            />
                          </div>
                        </li>
                      );
                    })}
                  </ol>
                )}
                <ResultNext
                  title="Go deeper"
                  steps={theme.deeper.map(d => ({
                    kind: "Wisdom",
                    label: d.label,
                    href: `/wisdom/${d.id}`,
                  }))}
                />
              </div>
            </section>
          )}

          {p.kept.length > 0 && (
            <section
              className="ts-band ts-band--warm"
              aria-labelledby="wb-kept-h"
            >
              <div className="ts-col">
                <ResultSection title="Lines you are keeping" id="wb-kept">
                  <p className="ts-count" style={{ marginTop: 0 }}>
                    These stay in this browser until you let them go.
                  </p>
                  <ul className="wb-kept">
                    {p.kept.map(k => (
                      <li key={`${k.c}:${k.v}`}>
                        <blockquote>
                          <p>{k.t}</p>
                        </blockquote>
                        <p className="wb-kept__ref">
                          {ref(k.c, k.v)}
                          <button
                            type="button"
                            className="wb-kept__drop no-print"
                            onClick={() => toggleKeep(k)}
                          >
                            <X size={14} strokeWidth={2} aria-hidden="true" />
                            <span className="sr-only">
                              Stop keeping {ref(k.c, k.v)}
                            </span>
                          </button>
                        </p>
                      </li>
                    ))}
                  </ul>
                </ResultSection>
              </div>
            </section>
          )}

          {index && (
            <section className="ts-band wb-teach" aria-labelledby="wb-teach-h">
              <div className="ts-col">
                <h2 id="wb-teach-h" className="ts-r__title">
                  {isProverbs ? "How to read a proverb" : `How to read ${name}`}
                </h2>
                <p className="wb-source">
                  In the words of the Study Bible's notes on {name}.
                </p>
                <div className="ts-r__prose">
                  {index.teaching.reading.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                {index.teaching.pair && (
                  <>
                    <h3 className="wb-sec__title">{index.teaching.pair.q}</h3>
                    <div className="wb-pair">
                      {index.teaching.pair.verses.map(v => (
                        <figure key={v.v} className="ts-verse">
                          <blockquote>
                            <p>{v.t}</p>
                          </blockquote>
                          <figcaption className="wb-kept__ref">
                            {ref(v.c, v.v)}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                    <div className="ts-r__prose">
                      {index.teaching.pair.a.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </>
                )}
                {index.teaching.hard?.map(h => (
                  <div key={h.c}>
                    <h3 className="wb-sec__title">
                      {h.q}{" "}
                      <span className="wb-sec__range">
                        From the notes on {name} {h.c}
                      </span>
                    </h3>
                    <div className="ts-r__prose">
                      {h.a.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  </div>
                ))}
                <p className="wb-more">
                  The wisdom books teach; the Psalms pray.{" "}
                  <Link href="/tools/pray-the-psalms">Pray the Psalms</Link> finds a psalm for where you are and lets you pray it slowly.
                </p>
                <ResultActions
                  title="The Wisdom Books Explorer"
                  summary="Proverbs by theme and by day, with the Study Bible's notes."
                  onStartOver={() => {
                    setOpen(null);
                    place.clear();
                  }}
                  startOverClears="the chapters you marked read and the lines you kept"
                />
              </div>
            </section>
          )}
        </>
      )}
    </Layout>
  );
}

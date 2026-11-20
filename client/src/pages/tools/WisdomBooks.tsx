/**
 * The Wisdom Books Explorer (/tools/wisdom-books): the book of Proverbs read
 * three ways. Today's chapter (the day of the month, the old habit of a
 * chapter a day), every verse on one of twenty themes in book order, or the
 * book chapter by chapter. Each chapter is laid out under the Study Bible's
 * own outline, title and summary; any verse in a theme opens to the verses
 * around it; and a fixed panel teaches, in the Study Bible's own words, how
 * to read a proverb (a pattern, not a promise; Proverbs 26:4-5 side by side).
 *
 * Content as data (client/public/wisdom-books/, built and checked by
 * scripts/build-wisdom-books-index.mjs and scripts/validate-wisdom-books.mjs):
 * the BSB word for word, the notes word for word, the themes tagged by hand.
 * Not listed on the Tools door or in any menu until James names it; reachable
 * by its address and from the Wisdom Finder, and noindex.
 *
 * Built on the tool shell: ToolHead, QuestionCard, useToolProgress
 * (`livewell-progress-wisdom-books`: the way in, the theme, the chapter,
 * chapters marked read, lines kept), ResultSection, ResultNext, ResultActions.
 */
import { useEffect, useMemo, useState } from "react";
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
  fetchWbChapter,
  fetchWbIndex,
  fetchWbTheme,
  outlineStart,
  studyHref,
  todaysChapter,
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
const ref = (c: number, v: number) => `Proverbs ${c}:${v}`;

function useChapter(n: number | null) {
  const [cache, setCache] = useState<Map<number, WbChapter>>(new Map());
  const [failed, setFailed] = useState<number | null>(null);
  const [nonce, setNonce] = useState(0);
  useEffect(() => {
    if (n === null || cache.has(n)) return;
    let stale = false;
    fetchWbChapter(n)
      .then(d => {
        if (!stale) setCache(m => new Map(m).set(n, d));
      })
      .catch(() => {
        if (!stale) setFailed(n);
      });
    return () => {
      stale = true;
    };
  }, [n, cache, nonce]);
  return {
    get: (c: number) => cache.get(c) ?? null,
    load: (c: number) =>
      !cache.has(c) &&
      fetchWbChapter(c)
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
}: {
  verse: Kept;
  kept: boolean;
  onToggle: () => void;
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
      <span className="sr-only"> ({ref(verse.c, verse.v)})</span>
    </button>
  );
}

export default function WisdomBooks() {
  const today = todaysChapter();
  const place = useToolProgress<Place>("wisdom-books", isPlace, {
    way: null,
    theme: null,
    chapter: today,
    read: [],
    kept: [],
  });
  const p = place.value;
  const [index, setIndex] = useState<WbIndex | null>(null);
  const [indexFailed, setIndexFailed] = useState(false);
  const [indexNonce, setIndexNonce] = useState(0);
  const [themeFile, setThemeFile] = useState<WbThemeFile | null>(null);
  const [themeFailed, setThemeFailed] = useState<string | null>(null);
  const [themeNonce, setThemeNonce] = useState(0);
  const [open, setOpen] = useState<string | null>(null);

  const shownChapter =
    p.way === "today" ? today : p.way === "chapter" ? p.chapter : null;
  const chapters = useChapter(shownChapter);
  const chapter = shownChapter !== null ? chapters.get(shownChapter) : null;

  useEffect(() => {
    let stale = false;
    fetchWbIndex()
      .then(d => !stale && setIndex(d))
      .catch(() => !stale && setIndexFailed(true));
    return () => {
      stale = true;
    };
  }, [indexNonce]);

  useEffect(() => {
    if (p.way !== "theme" || !p.theme) return;
    if (themeFile?.id === p.theme) return;
    let stale = false;
    const id = p.theme;
    fetchWbTheme(id)
      .then(d => !stale && setThemeFile(d))
      .catch(() => !stale && setThemeFailed(id));
    return () => {
      stale = true;
    };
  }, [p.way, p.theme, themeFile, themeNonce]);

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
    requestAnimationFrame(() => {
      const h = document.getElementById("wb-view-h");
      h?.scrollIntoView?.({ block: "start" });
      h?.focus({ preventScroll: true });
    });
  };
  const goTheme = (id: string) => {
    setOpen(null);
    place.set(x => ({ ...x, way: "theme", theme: id }));
    requestAnimationFrame(() => {
      const h = document.getElementById("wb-view-h");
      h?.scrollIntoView?.({ block: "start" });
      h?.focus({ preventScroll: true });
    });
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
      />

      {indexFailed ? (
        <LoadFailed
          what="Proverbs by theme"
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
                question="How would you like to read Proverbs?"
                options={[
                  {
                    value: "today",
                    label: `Today's chapter: Proverbs ${today}`,
                    hint: "One chapter for each day of the month, the whole chapter.",
                  },
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
                    hint: "Thirty-one chapters, each under the Study Bible's outline.",
                  },
                ]}
                value={p.way}
                onChange={v => {
                  setOpen(null);
                  place.set(x => ({ ...x, way: v as Way }));
                }}
              />
              {p.read.length > 0 && (
                <p className="ts-count" style={{ marginTop: "var(--s-2)" }}>
                  {p.read.length} of 31 chapters marked read
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
                          Proverbs {c.n}: {c.title}
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
                    what={`Proverbs ${shownChapter}`}
                    onRetry={chapters.retry}
                  />
                ) : !chapter ? (
                  <p className="ts-count" role="status">
                    Opening Proverbs {shownChapter}…
                  </p>
                ) : (
                  <>
                    <p className="wb-kicker">
                      {p.way === "today"
                        ? `Today's chapter · Proverbs ${chapter.n}`
                        : `Proverbs ${chapter.n} of 31`}
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
                      Title, summary and outline from the Study Bible's notes on
                      Proverbs {chapter.n}.
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
                        I have read Proverbs {chapter.n}
                      </label>
                      <Link href={studyHref(chapter.n)} className="btn--text">
                        <BookOpen
                          size={16}
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />{" "}
                        The Study Bible's notes on Proverbs {chapter.n}
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
                          Proverbs {chapter.n - 1}
                        </button>
                      ) : (
                        <span />
                      )}
                      {chapter.n < 31 && (
                        <button
                          type="button"
                          className="btn--text"
                          onClick={() => goChapter(chapter.n + 1)}
                        >
                          Proverbs {chapter.n + 1}{" "}
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
                  A theme in Proverbs · {theme.count} verses
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
                      From the Study Bible's introduction to Proverbs:{" "}
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
                ) : !themeFile || themeFile.id !== theme.id ? (
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
                                      Read all of Proverbs {v.c} here
                                    </button>
                                    <Link
                                      href={studyHref(v.c)}
                                      className="btn--text"
                                    >
                                      Notes on Proverbs {v.c}
                                    </Link>
                                  </p>
                                </>
                              ) : (
                                <p className="ts-count" role="status">
                                  Opening Proverbs {v.c}…
                                </p>
                              ))}
                          </div>
                          <div className="wb-verse__tools">
                            <KeepButton
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
                  How to read a proverb
                </h2>
                <p className="wb-source">
                  In the words of the Study Bible's notes on Proverbs.
                </p>
                <div className="ts-r__prose">
                  {index.teaching.reading.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
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

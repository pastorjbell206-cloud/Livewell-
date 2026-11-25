/**
 * The 66 books in their seven sections (the Study Bible's front page, the
 * centrepiece; TOOLS-PLAN unit 17). A fuller version of Home's shelf: the
 * same spines in the same hand, set in two cases (Old and New Testament) and
 * parted into the Law, History, Poetry and wisdom, the Prophets, the Gospels
 * and Acts, the Letters and Revelation, each section named under its books.
 *
 * Touch a spine, or slide a finger along a shelf, and the card under the case
 * names the book, its place, its kind and chapters and its one line, with
 * "Open" and every chapter. The legend lights one kind of writing. "As a
 * list" turns the drawing into the plain list of 66 links.
 *
 * Keyboard: the case is one tab stop; the arrow keys, Home and End move along
 * it. The spines are narrower than 44px on a phone (66 books in one screen's
 * width cannot be wider); every book is also reachable by 44px controls: the
 * previous and next buttons, the legend and the list.
 */
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Link } from "wouter";
import { BookOpen, ChevronLeft, ChevronRight, LayoutList, Library, List } from "lucide-react";

import type { BibleBook } from "@/lib/bible";
import PlateFrame from "@/components/art/PlateFrame";
import { CANON_SECTIONS, GENRE_NAME, KINDS, KIND_OF, fetchBookMeta, growOf, heightOf, type BookMeta, type Kind } from "./bookFacts";

export default function BookCase({ books, start = "john" }: { books: BibleBook[]; start?: string }) {
  const [cur, setCur] = useState(() => Math.max(0, books.findIndex((b) => b.slug === start)));
  const [meta, setMeta] = useState<Record<string, BookMeta> | null>(null);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [kind, setKind] = useState<Kind | null>(null);
  const [chaptersOpen, setChaptersOpen] = useState(false);
  const [asList, setAsList] = useState(false);
  const spines = useRef<(HTMLButtonElement | null)[]>([]);
  const drag = useRef(false);

  useEffect(() => {
    let live = true;
    fetchBookMeta()
      .then((m) => {
        if (!live) return;
        setMeta(m);
        setFailed(false);
      })
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, [nonce]);

  // A spine shows its name only where the name fits inside it.
  const fit = useCallback(() => {
    const all = spines.current.filter((s): s is HTMLButtonElement => !!s);
    for (const s of all) s.classList.add("is-named");
    const fits = all.map((s) => {
      const label = s.firstElementChild as HTMLElement | null;
      return !!label && s.offsetWidth >= 15 && label.offsetHeight <= s.offsetHeight - 10;
    });
    all.forEach((s, i) => s.classList.toggle("is-named", fits[i]));
  }, []);
  useLayoutEffect(() => {
    if (asList) return;
    fit();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(fit);
    const box = spines.current[0]?.closest(".bc-case");
    if (box) ro.observe(box);
    return () => ro.disconnect();
  }, [fit, asList]);
  // The page's stylesheet and fonts can arrive after the first measure; measure again then.
  useEffect(() => {
    if (asList) return;
    let live = true;
    const id = requestAnimationFrame(fit);
    const t = window.setTimeout(fit, 400);
    document.fonts?.ready.then(() => live && fit());
    return () => {
      live = false;
      cancelAnimationFrame(id);
      window.clearTimeout(t);
    };
  }, [fit, asList, meta]);

  const show = (i: number, focus = false) => {
    const n = (i + books.length) % books.length;
    setCur(n);
    setChaptersOpen(false);
    if (focus) spines.current[n]?.focus();
  };

  const onKey = (e: KeyboardEvent) => {
    const to = { ArrowRight: cur + 1, ArrowDown: cur + 1, ArrowLeft: cur - 1, ArrowUp: cur - 1, Home: 0, End: books.length - 1 }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    show(Math.max(0, Math.min(books.length - 1, to)), true);
  };

  const at = (e: PointerEvent) => {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const s = el instanceof Element ? el.closest<HTMLElement>("[data-book]") : null;
    if (s && s.dataset.book) {
      const i = Number(s.dataset.book);
      if (i !== cur) show(i);
    }
  };
  const dragOn = {
    onPointerDown: (e: PointerEvent) => {
      drag.current = true;
      at(e);
    },
    onPointerMove: (e: PointerEvent) => drag.current && at(e),
    onPointerUp: () => (drag.current = false),
    onPointerCancel: () => (drag.current = false),
    onPointerLeave: () => (drag.current = false),
  };

  const book = books[cur];
  const m = meta?.[book.name];
  const kindOf = (b: BibleBook) => (meta ? KIND_OF[meta[b.name]?.genre ?? ""] : undefined);

  const testament = (t: "OT" | "NT", label: string) => {
    const sections = CANON_SECTIONS.filter((s) => books[s.from]?.testament === t);
    const weight = (s: (typeof CANON_SECTIONS)[number]) => books.slice(s.from, s.to + 1).reduce((n, b) => n + growOf(b.chapters), 0);
    return (
      <div className="bc-test">
        <div className="hs-row">
          <span>{label}</span>
          <em>{t === "OT" ? "39 books" : "27 books"}</em>
        </div>
        <div className={`bc-shelf${kind ? " is-filtered" : ""}`} role="group" aria-label={label} onKeyDown={onKey} {...dragOn}>
          {sections.map((s) => (
            <div key={s.id} className="bc-bay" style={{ flexGrow: weight(s) }}>
              {books.slice(s.from, s.to + 1).map((b, k) => {
                const i = s.from + k;
                const bk = kindOf(b);
                return (
                  <button
                    key={b.slug}
                    ref={(el) => {
                      spines.current[i] = el;
                    }}
                    type="button"
                    data-book={i}
                    className={`hs-spine${bk ? ` sp-${bk}` : ""}${bk && bk === kind ? " is-kind" : ""}`}
                    style={{ ["--g" as string]: growOf(b.chapters).toFixed(2), ["--h" as string]: `${heightOf(i)}%` }}
                    aria-pressed={i === cur}
                    aria-label={`${b.name}, ${s.label}, ${b.chapters} ${b.chapters === 1 ? "chapter" : "chapters"}`}
                    tabIndex={i === cur ? 0 : -1}
                    onClick={() => show(i)}
                    onFocus={() => i !== cur && show(i)}
                  >
                    <span aria-hidden="true">{b.name}</span>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="hs-board" aria-hidden="true" />
        <div className="bc-names" aria-hidden="true">
          {sections.map((s) => (
            <span key={s.id} style={{ flexGrow: weight(s) }} className={s.from <= cur && cur <= s.to ? "is-here" : undefined}>
              <b>{s.short}</b>
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bc">
      <div className="bc-tools">
        <div className="hs-legend bc-legend" role="group" aria-label="Show one kind of writing">
          {KINDS.map(({ kind: k, label }) => (
            <button
              key={k}
              type="button"
              className={`home-chip sp-${k}`}
              aria-pressed={kind === k}
              disabled={asList}
              onClick={() => {
                const next = kind === k ? null : k;
                setKind(next);
                if (next && meta) {
                  const first = books.findIndex((b) => KIND_OF[meta[b.name]?.genre ?? ""] === next);
                  if (first >= 0) show(first);
                }
              }}
            >
              <i aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
        <button type="button" className="home-chip bc-view" aria-pressed={asList} onClick={() => setAsList((v) => !v)}>
          {asList ? <Library aria-hidden="true" size={18} strokeWidth={1.75} /> : <LayoutList aria-hidden="true" size={18} strokeWidth={1.75} />}
          {asList ? "As a shelf" : "As a list"}
        </button>
      </div>

      {asList ? (
        <div className="bc-list">
          {CANON_SECTIONS.map((s) => (
            <section key={s.id} aria-label={s.label}>
              <h3 className="bc-list__h">
                {s.label} <span>{s.to - s.from + 1}</span>
              </h3>
              <ul>
                {books.slice(s.from, s.to + 1).map((b) => (
                  <li key={b.slug}>
                    <Link href={`/study/bible/${b.slug}`}>{b.name}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      ) : (
        <>
          <PlateFrame ratio={null}>
            <div className="bc-case">
              {testament("OT", "Old Testament")}
              {testament("NT", "New Testament")}
            </div>
          </PlateFrame>

          <div className="bc-read" aria-live="polite">
            <div className="bc-read__words">
              <p className="hs-name">{book.name}</p>
              <p className="hs-meta">
                {book.testament === "OT" ? "Old" : "New"} Testament · book {cur + 1} of 66
                <br />
                {m?.genre ? `${GENRE_NAME[m.genre] ?? m.genre} · ` : ""}
                {book.chapters} {book.chapters === 1 ? "chapter" : "chapters"}
              </p>
              <p className="hs-line">
                {m?.occasion ??
                  (failed ? (
                    <span className="home-failed">
                      This book's line didn't load.
                      <button type="button" onClick={() => setNonce((n) => n + 1)}>
                        Try again
                      </button>
                    </span>
                  ) : null)}
              </p>
            </div>
            <div className="bc-read__do">
              <div className="home-row">
                <Link href={`/study/bible/${book.slug}`} className="home-btn">
                  <BookOpen aria-hidden="true" size={18} strokeWidth={1.75} />
                  Open {book.name}
                </Link>
                <button type="button" className="home-btn home-btn--quiet" aria-expanded={chaptersOpen} aria-label={`Chapters of ${book.name}`} onClick={() => setChaptersOpen((o) => !o)}>
                  <List aria-hidden="true" size={18} strokeWidth={1.75} />
                  <span className="hs-wide">Chapters</span>
                </button>
                <span className="hs-steps">
                  <button type="button" className="home-step" aria-label="Previous book" onClick={() => show(cur - 1)}>
                    <ChevronLeft aria-hidden="true" size={20} />
                  </button>
                  <button type="button" className="home-step" aria-label="Next book" onClick={() => show(cur + 1)}>
                    <ChevronRight aria-hidden="true" size={20} />
                  </button>
                </span>
              </div>
              {chaptersOpen && (
                <nav className="hs-chapters" aria-label={`Chapters of ${book.name}`}>
                  {Array.from({ length: book.chapters }, (_, k) => (
                    <Link key={k} href={`/study/bible/${book.slug}/${k + 1}`}>
                      {k + 1}
                    </Link>
                  ))}
                </nav>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * The 66 books on one shelf (Home, the Study Bible section).
 *
 * Every book is a spine: its width grows with its chapters, its colour is its
 * kind of writing. Touch a spine (or slide a finger along the shelf) and the
 * readout beside it names the book, where it sits, how long it is, and the
 * one line of its purpose, with "Read" and its chapters. The legend lights up
 * one kind at a time. Keyboard: the shelf is one tab stop; the arrow keys,
 * Home and End move along it.
 *
 * The books come from the committed table (lib/scripture-ref, the same as
 * /bible/books.json), so the shelf draws at once; each book's kind and line
 * come from /theology/bible-books.json, the Study Bible's own introductions.
 * Opens on John, where the site tells a new reader to begin.
 */
import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { Link } from "wouter";
import { BookOpen, ChevronLeft, ChevronRight, List } from "lucide-react";

import { SCRIPTURE_BOOKS } from "@/lib/scripture-ref";
import { fetchJson } from "@/lib/fetch-json";
import PlateFrame from "@/components/art/PlateFrame";

interface BookMeta {
  book: string;
  genre: string;
  occasion: string;
}

type Kind = "story" | "song" | "prophet" | "gospel" | "letter";

/** The site's eight genres, folded into five kinds a reader can see at a glance. */
const KIND_OF: Record<string, Kind> = {
  Narrative: "story",
  Law: "story",
  Poetry: "song",
  Wisdom: "song",
  Prophecy: "prophet",
  Apocalyptic: "prophet",
  Gospel: "gospel",
  Epistle: "letter",
};

const KINDS: { kind: Kind; label: string }[] = [
  { kind: "story", label: "Law and story" },
  { kind: "song", label: "Poetry and wisdom" },
  { kind: "prophet", label: "Prophets and visions" },
  { kind: "gospel", label: "Gospels" },
  { kind: "letter", label: "Letters" },
];

const JOHN = SCRIPTURE_BOOKS.findIndex((b) => b.slug === "john");

const isMeta = (x: unknown): x is { books: BookMeta[] } =>
  !!x && typeof x === "object" && Array.isArray((x as { books?: unknown }).books);

/** A steady, varied height for each spine, so the shelf looks like books and not a bar chart. */
const heightOf = (i: number) => 74 + ((i * 37) % 7) * 4;
const growOf = (chapters: number) => (4 + Math.sqrt(chapters)).toFixed(2);

export default function BibleShelf() {
  const [cur, setCur] = useState(JOHN);
  const [meta, setMeta] = useState<Record<string, BookMeta> | null>(null);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [kind, setKind] = useState<Kind | null>(null);
  const [chaptersOpen, setChaptersOpen] = useState(false);
  const spines = useRef<(HTMLButtonElement | null)[]>([]);
  const drag = useRef(false);

  useEffect(() => {
    let live = true;
    fetchJson("/theology/bible-books.json", isMeta)
      .then((d) => {
        if (!live) return;
        setMeta(Object.fromEntries(d.books.map((b) => [b.book, b])));
        setFailed(false);
      })
      .catch(() => live && setFailed(true));
    return () => {
      live = false;
    };
  }, [nonce]);

  // A spine shows its name only where the name fits inside it.
  const fit = useCallback(() => {
    // Write, then read every spine, then write: two layouts, not sixty-six.
    const all = spines.current.filter((s): s is HTMLButtonElement => !!s);
    for (const s of all) s.classList.add("is-named");
    const fits = all.map((s) => {
      const label = s.firstElementChild as HTMLElement | null;
      return !!label && s.offsetWidth >= 15 && label.offsetHeight <= s.offsetHeight - 10;
    });
    all.forEach((s, i) => s.classList.toggle("is-named", fits[i]));
  }, []);
  useLayoutEffect(() => {
    fit();
    if (typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(fit);
    const first = spines.current[0]?.parentElement;
    if (first) ro.observe(first);
    return () => ro.disconnect();
  }, [fit]);

  const show = (i: number, focus = false) => {
    const n = (i + SCRIPTURE_BOOKS.length) % SCRIPTURE_BOOKS.length;
    setCur(n);
    setChaptersOpen(false);
    if (focus) spines.current[n]?.focus();
  };

  const onKey = (e: KeyboardEvent) => {
    const to = { ArrowRight: cur + 1, ArrowDown: cur + 1, ArrowLeft: cur - 1, ArrowUp: cur - 1, Home: 0, End: SCRIPTURE_BOOKS.length - 1 }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    show(Math.max(0, Math.min(SCRIPTURE_BOOKS.length - 1, to)), true);
  };

  // Slide a finger (or a held mouse) along the shelf and the readout follows.
  const at = (e: PointerEvent) => {
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const s = el instanceof Element ? el.closest<HTMLElement>("[data-book]") : null;
    if (s && s.dataset.book) {
      const i = Number(s.dataset.book);
      if (i !== cur) show(i);
    }
  };

  const book = SCRIPTURE_BOOKS[cur];
  const m = meta?.[book.name];
  const genre = m?.genre ?? "";

  const shelf = (testament: "OT" | "NT", label: string) => (
    <>
      <div className="hs-row">
        <span>{label}</span>
        <em>{testament === "OT" ? "39 books" : "27 books"}</em>
      </div>
      <div
        className={`hs-shelf${kind ? " is-filtered" : ""}`}
        role="group"
        aria-label={label}
        onKeyDown={onKey}
        onPointerDown={(e) => {
          drag.current = true;
          at(e);
        }}
        onPointerMove={(e) => drag.current && at(e)}
        onPointerUp={() => (drag.current = false)}
        onPointerCancel={() => (drag.current = false)}
        onPointerLeave={() => (drag.current = false)}
      >
        {SCRIPTURE_BOOKS.map((b, i) => {
          if (b.testament !== testament) return null;
          const k = meta ? KIND_OF[meta[b.name]?.genre ?? ""] : undefined;
          return (
            <button
              key={b.slug}
              ref={(el) => {
                spines.current[i] = el;
              }}
              type="button"
              data-book={i}
              className={`hs-spine${k ? ` sp-${k}` : ""}${k && k === kind ? " is-kind" : ""}`}
              style={{ ["--g" as string]: growOf(b.chapters), ["--h" as string]: `${heightOf(i)}%` }}
              aria-pressed={i === cur}
              aria-label={`${b.name}, ${b.chapters} ${b.chapters === 1 ? "chapter" : "chapters"}`}
              tabIndex={i === cur ? 0 : -1}
              onClick={() => show(i)}
              onFocus={() => i !== cur && show(i)}
            >
              <span aria-hidden="true">{b.name}</span>
            </button>
          );
        })}
      </div>
      <div className="hs-board" aria-hidden="true" />
    </>
  );

  return (
    <div className="hs">
      <div>
        <PlateFrame ratio={null}>
          <div className="hs-case">
            {shelf("OT", "Old Testament")}
            {shelf("NT", "New Testament")}
          </div>
        </PlateFrame>
        <div className="hs-legend" role="group" aria-label="Show one kind of writing">
          {KINDS.map(({ kind: k, label }) => (
            <button
              key={k}
              type="button"
              className={`home-chip sp-${k}`}
              aria-pressed={kind === k}
              onClick={() => {
                const next = kind === k ? null : k;
                setKind(next);
                if (next && meta) {
                  const first = SCRIPTURE_BOOKS.findIndex((b) => KIND_OF[meta[b.name]?.genre ?? ""] === next);
                  if (first >= 0) show(first);
                }
              }}
            >
              <i aria-hidden="true" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="hs-read" aria-live="polite">
        <p className="hs-name">{book.name}</p>
        <p className="hs-meta">
          {book.testament === "OT" ? "Old" : "New"} Testament · book {cur + 1} of 66
          <br />
          {genre ? `${genre} · ` : ""}
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
        <div className="home-row">
          <Link href={`/study/bible/${book.slug}`} className="home-btn">
            <BookOpen aria-hidden="true" size={18} strokeWidth={1.75} />
            Read {book.name}
          </Link>
          <button type="button" className="home-btn home-btn--quiet" aria-expanded={chaptersOpen} aria-label="Chapters" onClick={() => setChaptersOpen((o) => !o)}>
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
  );
}

/**
 * A book at a glance (TOOLS-PLAN units 17 and 33): the drawing at the top of
 * every book's page, fed only by what the site's own files hold.
 *
 * - Where it sits: the 66 books as a strip of marks, coloured by kind, with
 *   this one raised; the books before and after are one tap away.
 * - Its kind (theology/bible-books.json) and its chapters (books.json).
 * - Who wrote it and when: the first sentence of the introduction's own
 *   "Who wrote it" and "When", word for word, with a jump to the whole note.
 * - How it is built: the introduction's outline as a band, each part as wide
 *   as the stretch of the book it covers. Touch a part for its title and
 *   summary and a link to start reading where it starts. The band is one tab
 *   stop; the arrow keys, Home and End move along it. The same parts are
 *   listed under it as links, for a screen reader and for print.
 */
import { useMemo, useRef, useState, type KeyboardEvent } from "react";
import { Link } from "wouter";
import { ArrowRight, BookOpen, ChevronLeft, ChevronRight, Eye, Feather, Hourglass, Layers, Mail, Megaphone, Music, ScrollText, Footprints, Sparkles, type LucideIcon } from "lucide-react";

import { chapterBookName, chapterHref, type BibleBook } from "@/lib/bible";
import type { BookIntro } from "@/lib/bible-notes";
import { GENRE_NAME, KIND_OF, firstSentence, outlineBand, sectionOf, type BookMeta } from "./bookFacts";

const GENRE_ICON: Record<string, LucideIcon> = {
  Narrative: Footprints,
  Law: ScrollText,
  Poetry: Music,
  Wisdom: Sparkles,
  Prophecy: Megaphone,
  Apocalyptic: Eye,
  Gospel: BookOpen,
  Epistle: Mail,
};

export default function BookGlance({
  books,
  book,
  intro,
  meta,
}: {
  books: BibleBook[];
  book: BibleBook;
  intro: BookIntro | null;
  meta: Record<string, BookMeta> | null;
}) {
  const at = books.findIndex((b) => b.code === book.code);
  const prev = at > 0 ? books[at - 1] : null;
  const next = at < books.length - 1 ? books[at + 1] : null;
  const genre = meta?.[book.name]?.genre ?? "";
  const GenreIcon = GENRE_ICON[genre] ?? Layers;
  const section = sectionOf(at);

  return (
    <section className="bg-glance" aria-label={`${book.name} at a glance`}>
      <div className="bg-glance__in">
        {/* WHERE IT SITS */}
        <div className="bg-where">
          <p className="bg-label">
            Book {at + 1} of 66 · {section.label}
          </p>
          <div className="bg-strip" aria-hidden="true">
            {books.map((b, i) => {
              const k = meta ? KIND_OF[meta[b.name]?.genre ?? ""] : undefined;
              return (
                <span
                  key={b.code}
                  className={`bg-mark${k ? ` sp-${k}` : ""}${i === at ? " is-here" : ""}${i === 39 ? " is-nt" : ""}`}
                />
              );
            })}
          </div>
          <div className="bg-strip-ends" aria-hidden="true">
            <span>Genesis</span>
            <span>Revelation</span>
          </div>
          <nav className="bg-steps" aria-label="The books on either side">
            {prev ? (
              <Link href={`/study/bible/${prev.slug}`} className="bg-step">
                <ChevronLeft aria-hidden="true" size={18} strokeWidth={1.75} />
                {prev.name}
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link href={`/study/bible/${next.slug}`} className="bg-step bg-step--next">
                {next.name}
                <ChevronRight aria-hidden="true" size={18} strokeWidth={1.75} />
              </Link>
            )}
          </nav>
        </div>

        {/* THE FACTS */}
        <ul className="bg-facts">
          <li className="bg-fact">
            <span className="bg-fact__icon" aria-hidden="true">
              <GenreIcon size={22} strokeWidth={1.75} />
            </span>
            <span className="bg-fact__k">Kind</span>
            <span className="bg-fact__v">{genre ? GENRE_NAME[genre] ?? genre : " "}</span>
          </li>
          <li className="bg-fact">
            <span className="bg-fact__icon" aria-hidden="true">
              <Layers size={22} strokeWidth={1.75} />
            </span>
            <span className="bg-fact__k">Chapters</span>
            <span className="bg-fact__v">{book.chapters}</span>
          </li>
          {intro?.author && (
            <li className="bg-fact bg-fact--note">
              <span className="bg-fact__icon" aria-hidden="true">
                <Feather size={22} strokeWidth={1.75} />
              </span>
              <span className="bg-fact__k">Who wrote it</span>
              <span className="bg-fact__q">{firstSentence(intro.author)}</span>
              <a href="#who" className="bg-more">
                The whole note
              </a>
            </li>
          )}
          {intro?.date && (
            <li className="bg-fact bg-fact--note">
              <span className="bg-fact__icon" aria-hidden="true">
                <Hourglass size={22} strokeWidth={1.75} />
              </span>
              <span className="bg-fact__k">When</span>
              <span className="bg-fact__q">{firstSentence(intro.date)}</span>
              <a href="#when" className="bg-more">
                The whole note
              </a>
            </li>
          )}
        </ul>

        {/* HOW IT IS BUILT */}
        {intro && intro.structure.length > 0 && <OutlineBand book={book} intro={intro} />}
      </div>
    </section>
  );
}

function OutlineBand({ book, intro }: { book: BibleBook; intro: BookIntro }) {
  const parts = useMemo(() => outlineBand(intro.structure, book.chapters), [intro, book.chapters]);
  const [cur, setCur] = useState(0);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  if (parts.length === 0) return null;
  const part = parts[Math.min(cur, parts.length - 1)];
  const where = `${chapterBookName(book)} ${part.verse ? `${part.chapter}:${part.verse}` : part.chapter}`;
  const label = (r: string) => `${book.name} ${r.replace(/-/g, "–")}`;

  const go = (i: number, focus = false) => {
    const n = Math.max(0, Math.min(parts.length - 1, i));
    setCur(n);
    if (focus) refs.current[n]?.focus();
  };
  const onKey = (e: KeyboardEvent) => {
    const to = { ArrowRight: cur + 1, ArrowDown: cur + 1, ArrowLeft: cur - 1, ArrowUp: cur - 1, Home: 0, End: parts.length - 1 }[e.key];
    if (to === undefined) return;
    e.preventDefault();
    go(to, true);
  };

  return (
    <div className="bg-build">
      <p className="bg-label" id="bg-build-label">
        How it is built · {parts.length} parts
      </p>
      <div className="bg-band" role="group" aria-labelledby="bg-build-label" onKeyDown={onKey}>
        {parts.map((p, i) => (
          <button
            key={p.range}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            className={`bg-part bg-part--${i % 3}`}
            style={{ flexGrow: p.share * 1000 }}
            aria-pressed={i === cur}
            aria-label={`Part ${i + 1}: ${p.title}, ${label(p.range)}`}
            tabIndex={i === cur ? 0 : -1}
            onClick={() => go(i)}
          >
            <span aria-hidden="true">{i + 1}</span>
          </button>
        ))}
      </div>
      <div className="bg-ruler" aria-hidden="true">
        <span>{book.chapters === 1 ? "Verse 1" : "Chapter 1"}</span>
        <span>{book.chapters === 1 ? "The end" : `Chapter ${book.chapters}`}</span>
      </div>

      <div className="bg-part-read" aria-live="polite">
        <p className="bg-part-read__range">
          Part {cur + 1} · {label(part.range)}
        </p>
        <p className="bg-part-read__title">{part.title}</p>
        <p className="bg-part-read__sum">{part.summary}</p>
        <div className="bg-part-read__row">
          <Link href={chapterHref(book.slug, part.chapter, part.verse)} className="home-btn">
            <BookOpen aria-hidden="true" size={18} strokeWidth={1.75} />
            Start at {where}
          </Link>
          <span className="hs-steps">
            <button type="button" className="home-step" aria-label="The part before" disabled={cur === 0} onClick={() => go(cur - 1)}>
              <ChevronLeft aria-hidden="true" size={20} />
            </button>
            <button type="button" className="home-step" aria-label="The next part" disabled={cur === parts.length - 1} onClick={() => go(cur + 1)}>
              <ChevronRight aria-hidden="true" size={20} />
            </button>
          </span>
        </div>
      </div>

      <ol className="bg-parts" aria-label={`The parts of ${book.name}`}>
        {parts.map((p, i) => (
          <li key={p.range}>
            <Link href={chapterHref(book.slug, p.chapter, p.verse)} aria-current={i === cur ? "true" : undefined}>
              <span className="bg-parts__n">{i + 1}</span>
              <span className="bg-parts__t">{p.title}</span>
              <span className="bg-parts__r">{p.range.replace(/-/g, "–")}</span>
              <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}

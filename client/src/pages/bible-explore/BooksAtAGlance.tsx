/**
 * /study/books-at-a-glance: the 66 books at a glance. Each book is drawn as
 * one band divided into the parts of its own outline (intro.json
 * `structure`, gathered by scripts/build-bible-glance-index.mjs into
 * /bible/explore/books-at-a-glance.json), each part as wide as the stretch of
 * the book it covers, with the part's own title and summary beside it. Every
 * word is the book page's.
 *
 * The band is the book page's own (the .bg-band and .bg-part of its "at a
 * glance" drawing, and its rule for a part's width, outlineBand), so a book
 * looks the same here as on its own page. A part of the band opens the
 * chapter it starts at. The same parts are listed beside the band as links,
 * with their summaries: that list is the way through for a keyboard and a
 * screen reader, so the band itself is kept out of their way.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import { LoadFailed } from "@/components/LoadFailed";
import { chapterBookName, chapterHref } from "@/lib/bible";
import { fetchGlance, type GlanceBook, type GlanceData } from "@/lib/bibleExplore";
import { outlineBand } from "../study-bible/bookFacts";
import { Band, Status, useLoad } from "../study-bible/shared";
import { TestamentChips, jumpTo, useStaged, type Testament } from "./shared";
import "../study-bible/bible.css";
import "./explore.css";

const PARTS: ["OT" | "NT", string][] = [
  ["OT", "Old Testament"],
  ["NT", "New Testament"],
];
const dash = (range: string) => range.replace(/-/g, "–");

function BookBand({ book, far }: { book: GlanceBook; far: boolean }) {
  const parts = useMemo(() => outlineBand(book.parts, book.chapters), [book]);
  const name = chapterBookName(book);
  const where = (p: (typeof parts)[number]) => `${name} ${p.verse ? `${p.chapter}:${p.verse}` : p.chapter}`;
  return (
    <section className={`bx-glance${far ? " bx-far" : ""}`} aria-labelledby={`glance-${book.slug}`}>
      <div className="bx-glance__head">
        <h3 id={`glance-${book.slug}`} tabIndex={-1}>
          <Link href={`/study/bible/${book.slug}#glance`}>{book.name}</Link>
        </h3>
        <p>
          {book.chapters === 1 ? "1 chapter" : `${book.chapters} chapters`} · {parts.length} parts
        </p>
        {/* The drawing: for a finger or a mouse. The list beside it says the same, as links. */}
        <div className="bg-band bx-glance__band" aria-hidden="true">
          {parts.map((p, i) => (
            <Link key={p.range} href={chapterHref(book.slug, p.chapter, p.verse)} className={`bg-part bg-part--${i % 3}`} style={{ flexGrow: p.share * 1000 }} tabIndex={-1} title={`${p.title} (${book.name} ${dash(p.range)})`}>
              <span>{i + 1}</span>
            </Link>
          ))}
        </div>
        <div className="bg-ruler" aria-hidden="true">
          <span>{book.chapters === 1 ? "Verse 1" : "Chapter 1"}</span>
          <span>{book.chapters === 1 ? "The end" : `Chapter ${book.chapters}`}</span>
        </div>
      </div>
      <ol className="bx-glance__parts" aria-label={`The parts of ${book.name}`}>
        {parts.map((p, i) => (
          <li key={p.range}>
            <span className={`bx-glance__n bg-part--${i % 3}`} aria-hidden="true">
              {i + 1}
            </span>
            <div>
              <h4>
                <Link href={chapterHref(book.slug, p.chapter, p.verse)}>{p.title}</Link>
              </h4>
              <p className="bx-glance__range">
                {book.name} {dash(p.range)}
                <span className="sr-only">, opens at {where(p)}</span>
              </p>
              <p>{p.summary}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function GlanceView({ data }: { data: GlanceData }) {
  const [testament, setTestament] = useState<Testament>("all");
  const all = useStaged();
  const shown = data.books.filter((b) => testament === "all" || b.testament === testament);
  const count = data.books.reduce((n, b) => n + b.parts.length, 0);
  // The first books are drawn at once; the rest follow, and are laid out as they near the screen.
  const FIRST = 3;

  return (
    <>
      <Band id="glance">
        <p className="bx-lede">
          All {data.books.length} books, each drawn as one band in {count} parts, from the outline on its own page.
        </p>
        <p className="bx-note">A part is as wide as the stretch of its book it covers. Choose a part to open the chapter where it starts.</p>
        <div className="bx-filters">
          <TestamentChips value={testament} onChange={setTestament} />
          <div className="bx-field">
            <label htmlFor="bx-glance-book">Go to a book</label>
            <select
              id="bx-glance-book"
              value=""
              onChange={(e) => {
                if (e.target.value) jumpTo(`glance-${e.target.value}`);
              }}
            >
              <option value="">Choose a book</option>
              {shown.map((b) => (
                <option key={b.slug} value={b.slug}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Band>

      {PARTS.filter(([t]) => shown.some((b) => b.testament === t)).map(([t, name], i) => {
        const books = shown.filter((b) => b.testament === t);
        return (
          <Band key={t} tone={i % 2 ? "bone" : "warm"}>
            <div className="bx-band__head">
              <h2 id={`glance-${t.toLowerCase()}`}>{name}</h2>
              <p>{books.length} books</p>
            </div>
            {books
              .filter((_, k) => all || (i === 0 && k < FIRST))
              .map((b, k) => (
                <BookBand key={b.slug} book={b} far={i > 0 || k >= FIRST} />
              ))}
          </Band>
        );
      })}
    </>
  );
}

export default function BooksAtAGlance() {
  const { data, retry } = useLoad("glance", fetchGlance);
  return (
    <Layout>
      <SEOMeta
        title="The 66 Books of the Bible at a Glance"
        description="Every book of the Bible drawn as one band, divided into the parts of its outline, with each part's title and summary. Choose a part to open its chapter."
        url="https://www.livewellbyjamesbell.co/study/books-at-a-glance"
      />
      <InnerHead path="/study/books-at-a-glance" title="The 66 books at a glance" line="Every book drawn as one band, part by part. Choose a part to open its chapter." plate="books" />
      {data === undefined && (
        <div data-lw-loading>
          <Status>Loading the books…</Status>
        </div>
      )}
      {data === null && <LoadFailed what="The books" onRetry={retry} backHref="/study" backLabel="Back to Study the Bible" />}
      {data && <GlanceView data={data} />}
    </Layout>
  );
}

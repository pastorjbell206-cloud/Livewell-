/**
 * A book's page (/study/bible/:book), as the simpler pages have it
 * (2026-11-27): the page top with one main action, "Start at John 1", and a
 * quiet second, "Pick a chapter"; then the chapters as tiles; the book's
 * film, if it has one; the book at a glance (BookGlance: where it sits, its
 * kind, who wrote it and when as the notes put it, and its outline as a
 * band); the chapters to start with; the guide to the book, each part a row
 * that opens in place (BookTeaching); the longest notes (the text, how it has
 * been read, further reading), which also open on a tap; and the next step.
 * Every word the page had is still on it.
 */
import type { ReactNode } from "react";
import { Link } from "wouter";
import { ChevronDown } from "lucide-react";

import { SEOMeta } from "@/components/SEOMeta";
import PageHead from "@/components/art/PageHead";
import { fetchCatalogue } from "@/lib/catalogue";
import { chapterBookName, chapterHref, type BibleBook } from "@/lib/bible";
import {
  fetchDoctrines,
  fetchIntro,
  fetchNotesIndex,
  fetchStory,
  fetchStoryline,
  itemsForPassage,
  spreadKinds,
  type BookIntro,
} from "@/lib/bible-notes";
import { Band, H2, H3, Pill, Prose, RelatedList, kicker, useLoad } from "./shared";
import BookGlance from "./BookGlance";
import BookTeaching from "./BookTeaching";
import FilmsHere from "@/components/FilmsHere";
import NextStep from "@/components/art/NextStep";
import { useOpenFolds } from "@/lib/openFold";
import { fetchBookMeta } from "./bookFacts";
import "../home/home.css";
import "./bible.css";

function More({ title, children }: { title: string; children: ReactNode }) {
  return (
    <details className="bk-more">
      <summary>
        <span>{title}</span>
        <ChevronDown aria-hidden="true" size={20} strokeWidth={1.75} />
      </summary>
      <div className="bk-more__body">{children}</div>
    </details>
  );
}

export default function BookFront({ books, book }: { books: BibleBook[]; book: BibleBook }) {
  const { data: intro } = useLoad<BookIntro>(`intro-${book.slug}`, () => fetchIntro(book.slug));
  const { data: meta } = useLoad("book-meta", fetchBookMeta);
  const { data: index } = useLoad("notes-index", fetchNotesIndex);
  const { data: act } = useLoad(`act-${book.slug}`, () =>
    Promise.all([fetchStory(), fetchStoryline()]).then(([story, line]) => {
      const a = story.acts.find((x) => x.path.some((r) => r.book === book.slug));
      const l = a && line.find((x) => x.id === a.id);
      return l ? { id: l.id, label: l.act, title: l.title } : null;
    }),
  );
  const { data: related } = useLoad(`book-related-${book.slug}`, () =>
    fetchCatalogue().then((c) => spreadKinds(itemsForPassage(c.items, book.slug), 8)),
  );
  const { data: doctrines } = useLoad("doctrines", fetchDoctrines);
  const titles = index?.titles[book.slug] ?? [];
  const testament = book.testament === "OT" ? "The Old Testament" : "The New Testament";
  const teaching = intro?.teaching;
  // "Start at John 1" ("Start at Psalm 1"): the one main action, at the top and at the end.
  const startLabel = book.chapters === 1 ? `Read ${book.name}` : `Start at ${chapterBookName(book)} 1`;
  // A link to a part of the guide (#who from the glance, #map) opens its row first.
  useOpenFolds(intro !== undefined);
  const hasMore = !!(intro && (teaching || intro.text || intro.reception || intro.furtherReading?.length));

  return (
    <>
      {intro ? (
        <SEOMeta title={`${book.name}: Introduction, Outline, and Study Notes`} description={intro.tagline} url={`https://www.livewellbyjamesbell.co/study/bible/${book.slug}`} />
      ) : (
        <SEOMeta title={`${book.name}: Study Notes, Hebrew and Greek`} description={`Every chapter of ${book.name} with study notes and the original language beneath every word.`} url={`https://www.livewellbyjamesbell.co/study/bible/${book.slug}`} />
      )}
      {/* Held on a first load until the drawing's data has arrived (lib/prerender-hold.ts). */}
      {(intro === undefined || act === undefined || meta === undefined) && <span hidden data-lw-loading />}

      <PageHead
        door="The Study Bible"
        doorHref="/study/bible"
        title={book.name}
        line={intro?.tagline}
        plate="book"
        className="bk-head"
        action={
          <>
            <Link href={chapterHref(book.slug, 1)} className="btn">
              {startLabel}
            </Link>
            {book.chapters > 1 && (
              <a href="#chapters" className="btn btn--quiet">
                Pick a chapter
              </a>
            )}
          </>
        }
      >
        <p className="bk-facts">
          <span>{testament}</span>
          {act && (
            <span>
              In the story: <Link href={`/study/bible/story/${act.id}`}>{act.label}, {act.title}</Link>
            </span>
          )}
        </p>
      </PageHead>

      <section id="chapters" className="bk-chapters" aria-labelledby="bk-chapters-title">
        <div className="home-wrap">
          <h2 id="bk-chapters-title" className="bk-h2">
            {book.chapters === 1 ? "Read it" : `The ${book.chapters} chapters`}
          </h2>
          <ol className="bk-tiles" aria-label={`Chapters of ${book.name}`}>
            {Array.from({ length: book.chapters }, (_, i) => i + 1).map((n) => {
              const title = titles[n - 1];
              return (
                <li key={n}>
                  <Link href={chapterHref(book.slug, n)} aria-label={`${book.name} chapter ${n}${title ? `: ${title}` : ""}`} title={title ?? undefined}>
                    {n}
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* The Bible Explorer's film for this book, if one is made: offered from
          the film's own data (its "book"), never from a list here. It sits
          below the chapters, so its late arrival moves nothing in the first
          screen. */}
      <div className="home-wrap" style={{ paddingInline: "var(--gutter)" }}>
        <FilmsHere path={`/study/bible/${book.slug}`} />
      </div>

      <div id="glance" className="bk-anchor">
        <BookGlance books={books} book={book} intro={intro ?? null} meta={meta ?? null} />
      </div>

      {intro && (
        <>
          {!teaching && (
            <>
            <Band tone="warm">
              <H2>What this book is</H2>
              <Prose text={intro.overview} />
            </Band>
            <Band>
              <div className="bk-grid">
                <div id="who" className="bk-anchor">
                  <H3>Who wrote it</H3>
                  <Prose text={intro.author} size={16} />
                </div>
                <div id="when" className="bk-anchor">
                  <H3>When</H3>
                  <Prose text={intro.date} size={16} />
                </div>
                <div>
                  <H3>The world it was written in</H3>
                  <Prose text={intro.setting} size={16} />
                </div>
                <div>
                  <H3>Why it was written</H3>
                  <Prose text={intro.purpose} size={16} />
                </div>
              </div>
            </Band>
            <Band tone="warm">
              <H2>Where it sits in the story</H2>
              <Prose text={intro.story} />
              <div style={{ height: "var(--s-4)" }} />
              <H2>{book.testament === "OT" ? "How it points to Christ" : "What it shows of Christ"}</H2>
              <Prose text={intro.christ} />
            </Band>
            <Band>
              <H2>Themes to follow</H2>
              <ul className="bk-themes">
                {intro.themes.map((t, i) => (
                  <li key={t.title}>
                    <span className="bk-themes__n" aria-hidden="true">
                      {i + 1}
                    </span>
                    <H3>{t.title}</H3>
                    <p>{t.body}</p>
                  </li>
                ))}
              </ul>
            </Band>
            </>
          )}
          <Band tone="warm">
            <H2>Chapters to start with</H2>
            <ul className="bk-keys">
              {intro.keyChapters.map((k) => (
                <li key={k.ch}>
                  <Link href={chapterHref(book.slug, k.ch)} className="bk-keys__ch">
                    {book.name} {k.ch}
                  </Link>
                  <span>{k.why}</span>
                </li>
              ))}
            </ul>
            {!teaching && (
              <>
                <H2>How to read it well</H2>
                <Prose text={intro.reading} />
              </>
            )}
            {intro.doctrines.length > 0 && (
              <>
                <div style={{ ...kicker, margin: "var(--s-4) 0 10px" }}>Doctrines it teaches</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {intro.doctrines.map((d) => (
                    <Pill key={d} href={`/study/bible/doctrines/${d}`}>
                      {doctrines?.find((x) => x.id === d)?.name ?? d}
                    </Pill>
                  ))}
                </div>
              </>
            )}
          </Band>
          {teaching && <BookTeaching book={book} teaching={teaching} />}
          {hasMore && (
            <Band>
              <H2>Going further</H2>
              <div className="bk-mores">
                {teaching && (
                  <More title={`The fuller introduction to ${book.name}`}>
                    {(
                      [
                        ["What this book is", intro.overview],
                        ["Who wrote it", intro.author],
                        ["When", intro.date],
                        ["The world it was written in", intro.setting],
                        ["Why it was written", intro.purpose],
                        ["Where it sits in the story", intro.story],
                        [book.testament === "OT" ? "How it points to Christ" : "What it shows of Christ", intro.christ],
                        ["How to read it well", intro.reading],
                      ] as const
                    ).map(([h, text]) => (
                      <div key={h}>
                        <H3>{h}</H3>
                        <Prose text={text} size={16} />
                      </div>
                    ))}
                    <H3>Themes to follow</H3>
                    {intro.themes.map((t) => (
                      <p key={t.title} className="bk-more__theme">
                        <strong>{t.title}.</strong> {t.body}
                      </p>
                    ))}
                  </More>
                )}
                {intro.text && (
                  <More title={`The text of ${book.name}`}>
                    <Prose text={intro.text} />
                  </More>
                )}
                {intro.reception && (
                  <More title={`How ${book.name} has been read`}>
                    <Prose text={intro.reception} />
                  </More>
                )}
                {intro.furtherReading && intro.furtherReading.length > 0 && (
                  <More title="Further reading">
                    {(
                      [
                        ["first", "To start with"],
                        ["pastor", "For the pastor's shelf"],
                        ["scholar", "For deeper study"],
                      ] as const
                    ).map(([tier, label]) => {
                      const list = intro.furtherReading!.filter((r) => r.tier === tier);
                      if (list.length === 0) return null;
                      return (
                        <div key={tier} style={{ marginBottom: "var(--s-3)" }}>
                          <div style={{ ...kicker, marginBottom: "8px" }}>{label}</div>
                          <ul className="bk-reading">
                            {list.map((r) => (
                              <li key={`${r.author}|${r.title}`}>
                                {r.author}, <i>{r.title}</i>
                                {r.series ? ` (${r.series}${r.year ? `, ${r.year}` : ""})` : r.year ? ` (${r.year})` : ""}. <span>{r.note}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </More>
                )}
              </div>
            </Band>
          )}
        </>
      )}

      {related && related.length > 0 && (
        <Band tone={hasMore || !intro ? "warm" : "bone"}>
          <H2>{book.name} on LiveWell</H2>
          <RelatedList items={related} />
        </Band>
      )}

      <NextStep
        tone={related && related.length > 0 && (hasMore || !intro) ? "bone" : "warm"}
        title={`Read ${book.name} with notes`}
        line={book.chapters === 1 ? "With notes beside the text." : "Start at chapter 1, with notes beside the text."}
        action={
          <Link href={chapterHref(book.slug, 1)} className="btn">
            {startLabel}
          </Link>
        }
        second={
          <Link href="/study/bible" className="btn btn--quiet">
            All 66 books
          </Link>
        }
      />
    </>
  );
}

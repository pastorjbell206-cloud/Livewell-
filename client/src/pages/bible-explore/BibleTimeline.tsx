/**
 * /study/timeline: the Bible's timeline. Every book page's timeline entries
 * (intro.json `teaching.timeline`) in one list down one line of time, gathered
 * by scripts/build-bible-timeline-index.mjs into /bible/explore/timeline.json.
 *
 * Every date and sentence is its own book's, word for word. The page adds no
 * claim: it lists an entry at the first year its own "when" names, in plain
 * stretches of years, and lists apart the entries a book gives no year. Where
 * more than one book tells of one event, their entries stand side by side,
 * and when they do not date it alike the page says so and chooses none.
 *
 * It is a list all the way down (the line is drawn by CSS), so a keyboard and
 * a screen reader get the same page a mouse does.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import { LoadFailed } from "@/components/LoadFailed";
import { chapterBookName, chapterHref } from "@/lib/bible";
import { fetchTimeline, nameList, type ExploreBook, type TimelineData, type TimelineEntry, type TimelineKind } from "@/lib/bibleExplore";
import { Band, Status, useLoad } from "../study-bible/shared";
import { NotYet, TestamentChips, type Testament } from "./shared";
import "../study-bible/bible.css";
import "./explore.css";

type Kind = "all" | TimelineKind;

const KINDS: [Kind, string][] = [
  ["all", "Everything"],
  ["story", "The story the books tell"],
  ["world", "The world around them"],
  ["book", "How the books came to be"],
];
const KIND_NAME: Record<TimelineKind, string> = { story: "The story", world: "The world around it", book: "How the book came to be" };

function Entry({ e, book }: { e: TimelineEntry; book: ExploreBook }) {
  return (
    <li data-kind={e.kind} id={e.id}>
      <span className="bk-tl__when">
        <span className="bx-entry__book">{book.name}</span>
        {e.when}
      </span>
      <span className="bk-tl__what">
        <span className="sr-only">{KIND_NAME[e.kind]}. </span>
        {e.what}
        <span className="bx-entry__meta">
          {e.ch ? (
            <Link href={chapterHref(book.slug, e.ch, e.v)}>
              {chapterBookName(book)} {e.ch}
              {e.v ? `:${e.v}` : ""}
            </Link>
          ) : null}
          <Link href={`/study/bible/${book.slug}#timeline`}>On the {book.name} page</Link>
          {e.placed === "order" && (
            <span className="bx-entry__how">{book.name} gives no year here. It is listed after the entry before it on the {book.name} page.</span>
          )}
        </span>
      </span>
    </li>
  );
}

export function TimelineView({ data, initialBook = "" }: { data: TimelineData; initialBook?: string }) {
  const [testament, setTestament] = useState<Testament>("all");
  const [bookSlug, setBookSlug] = useState(data.books.some((b) => b.slug === initialBook) ? initialBook : "");
  const [kind, setKind] = useState<Kind>("all");

  const books = useMemo(() => new Map(data.books.map((b) => [b.slug, b])), [data.books]);
  const groups = useMemo(() => new Map(data.groups.map((g) => [g.id, g])), [data.groups]);
  const byId = useMemo(() => new Map(data.entries.map((e) => [e.id, e])), [data.entries]);

  const shown = useMemo(
    () =>
      data.entries.filter((e) => {
        const b = books.get(e.book);
        if (!b) return false;
        if (bookSlug ? e.book !== bookSlug : testament !== "all" && b.testament !== testament) return false;
        return kind === "all" || e.kind === kind;
      }),
    [data.entries, books, bookSlug, testament, kind],
  );
  const shownIds = useMemo(() => new Set(shown.map((e) => e.id)), [shown]);
  const most = Math.max(1, ...data.bands.map((b) => shown.filter((e) => e.band === b.id).length));
  const narrowed = testament !== "all" || bookSlug !== "" || kind !== "all";
  const reset = () => {
    setTestament("all");
    setBookSlug("");
    setKind("all");
  };

  // An event more than one book tells of is drawn once, where its first entry falls.
  const drawn = new Set<string>();
  const rows = (band: string) =>
    shown
      .filter((e) => e.band === band)
      .map((e) => {
        const g = e.group ? groups.get(e.group) : undefined;
        const b = books.get(e.book)!;
        if (!g) return <Entry key={e.id} e={e} book={b} />;
        if (drawn.has(g.id)) return null;
        drawn.add(g.id);
        const members = g.entries.map((id) => byId.get(id)).filter((m): m is TimelineEntry => !!m);
        const here = members.filter((m) => shownIds.has(m.id));
        const names = Array.from(new Set(members.map((m) => books.get(m.book)?.name ?? m.book)));
        return (
          <li key={g.id} className="bx-same" data-differ={g.differ || undefined}>
            <div className="bx-same__box">
              <p className="bx-same__head">
                <strong>
                  {names.length} books mark this: {nameList(names)}.
                </strong>{" "}
                {g.differ ? "They do not date it alike. Each is shown as its own book gives it, and this page does not choose between them." : "They date it alike."}
              </p>
              <ol className="bk-tl">
                {here.map((m) => (
                  <Entry key={m.id} e={m} book={books.get(m.book)!} />
                ))}
              </ol>
            </div>
          </li>
        );
      });

  return (
    <>
      <Band id="line">
        <p className="bx-lede">
          {data.entries.length} entries from the pages of {data.books.length} books, each in its own book's words. Where two books date one event differently, both are shown and neither is chosen.
        </p>
        <NotYet without={data.without} what="timeline" />

        <div className="bx-filters">
          <TestamentChips
            value={bookSlug ? "all" : testament}
            onChange={(t) => {
              setTestament(t);
              setBookSlug("");
            }}
          />
          <div className="bx-field">
            <label htmlFor="bx-book">One book</label>
            <select id="bx-book" value={bookSlug} onChange={(ev) => setBookSlug(ev.target.value)}>
              <option value="">Every book</option>
              {data.books.map((b) => (
                <option key={b.slug} value={b.slug}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
          <div className="bk-tl__chips bx-chips" role="group" aria-label="Show on the timeline">
            {KINDS.map(([k, label]) => (
              <button key={k} type="button" data-kind={k === "all" ? undefined : k} aria-pressed={kind === k} onClick={() => setKind(k)}>
                {label}
              </button>
            ))}
          </div>
          <p className="bx-count" role="status">
            Showing {shown.length} of {data.entries.length} entries.
          </p>
        </div>

        {shown.length === 0 ? (
          <p className="bx-note">
            Nothing on the timeline matches that.{" "}
            <button type="button" className="bx-reset" onClick={reset}>
              Show everything
            </button>
          </p>
        ) : (
          <nav aria-label="The line of time">
            <ol className="bx-line">
              {data.bands.map((b) => {
                const n = shown.filter((e) => e.band === b.id).length;
                const row = (
                  <>
                    <span className="bx-line__name">{b.name}</span>
                    <span className="bx-line__bar" aria-hidden="true">
                      <i style={{ ["--n" as string]: n / most }} />
                    </span>
                    <span className="bx-line__n">
                      {n}
                      <span className="sr-only"> entries</span>
                    </span>
                  </>
                );
                return <li key={b.id}>{n ? <a href={`#${b.id}`}>{row}</a> : <span className="bx-line__row">{row}</span>}</li>;
              })}
            </ol>
          </nav>
        )}
      </Band>

      {data.bands
        .filter((b) => shown.some((e) => e.band === b.id))
        .map((b, i) => (
          <Band key={b.id} tone={i % 2 ? "bone" : "warm"}>
            <div className="bx-band__head">
              <h2 id={b.id} tabIndex={-1}>
                {b.name}
              </h2>
              <p>
                {b.id === "no-year"
                  ? "The books give these no year, so they are not placed on the line. They are in the Bible's order."
                  : "Listed by the first year each book's own words name."}
              </p>
            </div>
            <ol className="bk-tl bx-tl">{rows(b.id)}</ol>
            <p className="bx-top">
              <a href="#line">Back to the line of time</a>
              {narrowed && (
                <>
                  {" "}
                  <button type="button" className="bx-reset" onClick={reset}>
                    Show everything
                  </button>
                </>
              )}
            </p>
          </Band>
        ))}
    </>
  );
}

export default function BibleTimeline() {
  const { data, retry } = useLoad("timeline", fetchTimeline);
  const initialBook = typeof window === "undefined" ? "" : (new URLSearchParams(window.location.search).get("book") ?? "");
  return (
    <Layout>
      <SEOMeta
        title="The Bible's Timeline: Every Book's Dates on One Line"
        description="Every date the Study Bible's book pages give, on one line of time: the story each book tells, the world around it, and how the book came to be, with links."
        url="https://www.livewellbyjamesbell.co/study/timeline"
      />
      <InnerHead path="/study/timeline" title="The Bible's timeline" line="Every date the book pages give, on one line of time. Each entry opens its book." plate="sundial" />
      {data === undefined && (
        <div data-lw-loading>
          <Status>Loading the timeline…</Status>
        </div>
      )}
      {data === null && <LoadFailed what="The timeline" onRetry={retry} backHref="/study" backLabel="Back to Study the Bible" />}
      {data && <TimelineView data={data} initialBook={initialBook} />}
    </Layout>
  );
}

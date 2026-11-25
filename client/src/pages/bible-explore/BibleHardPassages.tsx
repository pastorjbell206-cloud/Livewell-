/**
 * /study/hard-passages: every passage a book page lists as hard (intro.json
 * `teaching.hard`), gathered by scripts/build-bible-hard-index.mjs into
 * /bible/explore/hard-passages.json, book by book, in each book's own order
 * and words.
 *
 * Care. These passages include violence, abuse and despair. So: the page
 * opens with a way to Find Help, in the catalogue's own words; and a passage
 * is never shown without the link to the chapter where its note faces the
 * question (the build leaves out any whose chapter has no note). The book
 * pages give these passages no kinds, so none are invented: they are listed
 * by book, and the page says so.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { LifeBuoy, MessageCircleQuestion } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import { LoadFailed } from "@/components/LoadFailed";
import { chapterBookName, chapterHref } from "@/lib/bible";
import { fetchHard, type HardData } from "@/lib/bibleExplore";
import { HELP_ENTRY } from "@/lib/siteCatalog";
import { Band, Status, useLoad } from "../study-bible/shared";
import { NotYet, TestamentChips, useStaged, type Testament } from "./shared";
import "../study-bible/bible.css";
import "./explore.css";

const fold = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[‘’']/g, "");
const PARTS: ["OT" | "NT", string][] = [
  ["OT", "Old Testament"],
  ["NT", "New Testament"],
];

/**
 * The way to help, kept on the page wherever a reader is in it. The words are
 * not this page's: they are the Study Bible notes' own care lines, whole
 * (data.care), with "Find Help" in them made the link. Should the notes ever
 * stop saying them, the catalogue's own line for Find Help stands in.
 */
export function CareLine({ lines }: { lines: string[] }) {
  const helpLink = <Link href={HELP_ENTRY.href}>{HELP_ENTRY.name}</Link>;
  return (
    <aside className="bx-care" aria-label={HELP_ENTRY.name}>
      <LifeBuoy aria-hidden="true" size={22} strokeWidth={1.75} />
      <div>
        {lines.length === 0 && (
          <p>
            {helpLink}: {HELP_ENTRY.line.charAt(0).toLowerCase() + HELP_ENTRY.line.slice(1)}
          </p>
        )}
        {lines.map((line) => {
          const at = line.lastIndexOf(HELP_ENTRY.name);
          return (
            <p key={line}>
              {at < 0 ? line : line.slice(0, at)}
              {at < 0 ? <> {helpLink}</> : helpLink}
              {at < 0 ? null : line.slice(at + HELP_ENTRY.name.length)}
            </p>
          );
        })}
      </div>
    </aside>
  );
}

export function HardView({ data }: { data: HardData }) {
  const [query, setQuery] = useState("");
  const [testament, setTestament] = useState<Testament>("all");
  const count = data.books.reduce((n, b) => n + b.items.length, 0);
  const all = useStaged();

  const q = fold(query.trim());
  const shown = useMemo(
    () =>
      data.books
        .filter((b) => testament === "all" || b.testament === testament)
        .map((b) => ({ ...b, items: q ? b.items.filter((h) => fold(`${b.name} ${h.ref} ${h.line}`).includes(q)) : b.items }))
        .filter((b) => b.items.length > 0),
    [data.books, testament, q],
  );
  const total = shown.reduce((n, b) => n + b.items.length, 0);

  return (
    <>
      <Band id="hard">
        <p className="bx-lede">
          {count} passages from the pages of {data.books.length} books: the places where readers often stop and ask.
        </p>
        <p className="bx-note">Each one opens its chapter, where the notes face the question.</p>
        <CareLine lines={data.care} />
        <p className="bx-note">The book pages do not sort these passages by kind, so they are listed by book, in the Bible's order.</p>
        <NotYet without={data.without} what="list of hard passages" />

        <div className="bx-filters">
          <div className="bx-field">
            <label htmlFor="bx-hard">Find a passage</label>
            <input id="bx-hard" type="search" value={query} onChange={(e) => setQuery(e.target.value)} autoComplete="off" placeholder="A book, a verse or a word" />
          </div>
          <TestamentChips value={testament} onChange={setTestament} />
          <p className="bx-count" role="status">
            Showing {total} of {count} passages.
          </p>
        </div>

        {total === 0 ? (
          <p className="bx-note">
            No hard passage matches that.{" "}
            <button
              type="button"
              className="bx-reset"
              onClick={() => {
                setQuery("");
                setTestament("all");
              }}
            >
              Show every passage
            </button>
          </p>
        ) : (
          <nav aria-label="Books">
            <ul className="bx-books">
              {shown.map((b) => (
                <li key={b.slug}>
                  <a href={`#hard-${b.slug}`}>
                    {b.name} <span>{b.items.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </Band>

      {PARTS.filter(([t]) => shown.some((b) => b.testament === t)).filter((_, i) => all || i === 0).map(([t, name], i) => (
        <Band key={t} tone={i % 2 ? "bone" : "warm"}>
          <div className="bx-band__head">
            <h2 id={`hard-${t.toLowerCase()}`}>{name}</h2>
          </div>
          {shown
            .filter((b) => b.testament === t)
            .map((b) => (
              <section key={b.slug} className="bx-hardbook" aria-labelledby={`hard-${b.slug}`}>
                <h3 id={`hard-${b.slug}`} tabIndex={-1}>
                  <Link href={`/study/bible/${b.slug}#hard-passages`}>{b.name}</Link>
                </h3>
                <ul className="bk-hard">
                  {b.items.map((h) => (
                    <li key={h.ref}>
                      <MessageCircleQuestion aria-hidden="true" size={20} strokeWidth={1.75} />
                      <Link href={chapterHref(b.slug, h.ch, h.v)}>
                        {chapterBookName(b)} {h.ref}
                      </Link>
                      <span>{h.line}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          <CareLine lines={data.care} />
          <p className="bx-top">
            <a href="#hard">Back to the top of the list</a>
          </p>
        </Band>
      ))}
    </>
  );
}

export default function BibleHardPassages() {
  const { data, retry } = useLoad("hard", fetchHard);
  return (
    <Layout>
      <SEOMeta
        title="Hard Passages of the Bible, Book by Book"
        description="The passages where readers stop and ask, gathered from the Study Bible's book pages. Each one opens its chapter, where the notes face the question plainly."
        url="https://www.livewellbyjamesbell.co/study/hard-passages"
      />
      <InnerHead path="/study/hard-passages" title="Hard passages" line="The places where readers stop and ask. Each one opens the chapter where its note faces the question." plate="lantern" />
      {data === undefined && (
        <div data-lw-loading>
          <Status>Loading the hard passages…</Status>
        </div>
      )}
      {data === null && <LoadFailed what="The hard passages" onRetry={retry} backHref="/study" backLabel="Back to Study the Bible" />}
      {data && <HardView data={data} />}
    </Layout>
  );
}

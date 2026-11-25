/**
 * /study/cross-references: follow a verse through the Bible. Choose a verse
 * and see the verses the Study Bible links from it, grouped by book, each in
 * the Berean Standard Bible and each opening its chapter; and, on request,
 * one more step outward: the verses linked from any one of those.
 *
 * The links are the Study Bible's own (each verse's cross-references in its
 * chapter file, from OpenBible.info, credited as the Study Bible credits
 * them), copied into one small file a chapter by
 * scripts/build-bible-xref-index.mjs. The verses offered to start from are
 * chosen by count, the ones the most other verses link to, not by hand.
 * Nothing is said about why two verses are linked: the data does not say.
 */
import { useState, type FormEvent } from "react";
import { Link, useLocation, useSearch } from "wouter";
import { ChevronDown } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import { LoadFailed } from "@/components/LoadFailed";
import { BIBLE_TRANSLATION, chapterHref, fetchBooks, fetchChapterText, parseRef, type BibleBook } from "@/lib/bible";
import { fetchXref, fetchXrefExamples, type XrefExamples } from "@/lib/bibleStudy";
import { parseScriptureRef } from "@/lib/scripture-ref";
import CrossRefList from "../study-bible/CrossRefs";
import { Band, Credits, Status, useLoad } from "../study-bible/shared";
import "../study-bible/bible.css";
import "./explore.css";

const HERE = "/study/cross-references";
export const followHref = (ref: string) => `${HERE}?ref=${ref}`;
const rangeEnd = (raw: string) => {
  const m = raw.match(/-(\d+)$/);
  return m ? +m[1] : null;
};
const firstVerse = (raw: string) => raw.replace(/-\d+$/, "");

/** A verse's (or a short range's) words, from the chapter's small text file. */
function Words({ slug, chapter, from, to }: { slug: string; chapter: number; from: number; to: number }) {
  const { data } = useLoad(`${slug}/${chapter}`, () => fetchChapterText(slug, chapter));
  if (data === undefined) return <p className="bx-verse__t bx-verse__wait">Opening the verse…</p>;
  const verses = data?.verses.filter((v) => v.v >= from && v.v <= to && v.t) ?? [];
  if (!verses.length) return <p className="bx-verse__t bx-verse__wait">The verse's words did not load. Its chapter still opens.</p>;
  return (
    <p className="bx-verse__t">
      {verses.map((v) => (
        <span key={v.v}>
          {verses.length > 1 && <sup>{v.v}</sup>}
          {v.t}{" "}
        </span>
      ))}
    </p>
  );
}

/** One linked verse, with the way to its chapter, and one more step outward on request. */
function Linked({ raw, books }: { raw: string; books: BibleBook[] }) {
  const ref = parseRef(raw, books);
  const [open, setOpen] = useState(false);
  const start = firstVerse(raw);
  const next = useLoad(open && ref ? `xref-${start}` : null, async () => (await fetchXref(ref!.slug, ref!.chapter))[String(ref!.verse)] ?? []);
  if (!ref) return null;
  const panel = `further-${raw.replace(/\W/g, "-")}`;
  return (
    <li>
      <Link href={chapterHref(ref.slug, ref.chapter, ref.verse)}>{ref.label}</Link>
      <Words slug={ref.slug} chapter={ref.chapter} from={ref.verse} to={rangeEnd(raw) ?? ref.verse} />
      <p className="bx-follow__more">
        <button type="button" className="bx-follow__step" aria-expanded={open} aria-controls={panel} onClick={() => setOpen((o) => !o)}>
          One step further
          <ChevronDown aria-hidden="true" size={16} strokeWidth={1.75} />
        </button>
        <Link href={followHref(start)}>Follow {ref.label.replace(/–\d+$/, "")} from here</Link>
      </p>
      <div id={panel} hidden={!open} className="bx-follow__further">
        {open && next.data === undefined && <p className="bx-verse__wait">Opening its links…</p>}
        {open && next.data === null && (
          <p className="bx-verse__wait">
            Its links did not load.{" "}
            <button type="button" className="bx-reset" onClick={next.retry}>
              Try again
            </button>
          </p>
        )}
        {open && next.data && (
          <>
            <p className="bx-count">
              {next.data.length === 0 ? "" : `${next.data.length} ${next.data.length === 1 ? "verse" : "verses"} linked from ${ref.label.replace(/–\d+$/, "")}. Choose one to read it.`}
            </p>
            <CrossRefList refs={next.data} books={books} />
          </>
        )}
      </div>
    </li>
  );
}

export function FollowView({ refCode, books, examples }: { refCode: string | null; books: BibleBook[]; examples: XrefExamples }) {
  const [, navigate] = useLocation();
  const from = refCode ? parseRef(refCode, books) : null;
  const [value, setValue] = useState("");
  const [missed, setMissed] = useState<string | null>(null);
  const links = useLoad(from ? `xref-${from.slug}.${from.chapter}.${from.verse}` : null, async () => (await fetchXref(from!.slug, from!.chapter))[String(from!.verse)] ?? []);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const q = value.trim();
    if (!q) return;
    const r = parseScriptureRef(q);
    const p = r?.parts[0];
    // A verse is needed: a whole chapter ("John 3") or a book has no one verse to follow.
    if (!r || !p || p.v2 === Infinity) return setMissed(q);
    setMissed(null);
    navigate(followHref(`${r.book.code}.${p.c1}.${p.v1}`));
  };

  const groups = (() => {
    const by = new Map<string, string[]>();
    for (const raw of links.data ?? []) {
      const p = parseRef(raw, books);
      if (!p) continue;
      by.set(p.slug, [...(by.get(p.slug) ?? []), raw]);
    }
    // In the Bible's order.
    return books.filter((b) => by.has(b.slug)).map((b) => ({ book: b, refs: by.get(b.slug)! }));
  })();
  const count = groups.reduce((n, g) => n + g.refs.length, 0);

  return (
    <>
      <Band id="choose">
        <form className="bx-filters" role="search" aria-label="Choose a verse" onSubmit={submit}>
          <div className="bx-field">
            <label htmlFor="bx-follow">A verse</label>
            <input id="bx-follow" type="text" value={value} onChange={(e) => setValue(e.target.value)} autoComplete="off" spellCheck={false} placeholder="John 3:16" />
            <button type="submit" className="btn">
              Follow it
            </button>
          </div>
          <p className="bx-count" role="status">
            {missed ? `“${missed}” is not a verse this can follow. Name one verse, such as John 3:16 or Psalm 23:1.` : refCode && !from ? "That is not a verse of the Bible. Name one, such as John 3:16." : ""}
          </p>
        </form>

        {!from && (
          <>
            <p className="bx-lede">
              {examples.links.toLocaleString("en-US")} links between verses, from {examples.verses.toLocaleString("en-US")} verses.
            </p>
            <p className="bx-note">Name a verse above, or start from one of these: the {examples.examples.length} verses the most other verses link to, by the Study Bible's own count.</p>
            <ol className="bx-verses bx-follow__starts">
              {examples.examples.map((x) => {
                const p = parseRef(x.ref, books);
                return p ? (
                  <li key={x.ref}>
                    <Link href={followHref(x.ref)}>{p.label}</Link>
                    <p className="bx-verse__t">{x.t}</p>
                    <p className="bx-verse__g">{x.into} verses link to it.</p>
                  </li>
                ) : null;
              })}
            </ol>
          </>
        )}

        {from && (
          <div className="bx-follow__from">
            <h2 id="from" tabIndex={-1}>
              {from.label}
            </h2>
            <Words slug={from.slug} chapter={from.chapter} from={from.verse} to={from.verse} />
            <p className="bx-top">
              <Link href={chapterHref(from.slug, from.chapter, from.verse)}>Open {from.label} in the Study Bible</Link>
              <Link href={HERE}>Choose another verse</Link>
            </p>
          </div>
        )}
      </Band>

      {from && (
        <Band tone="warm" id="linked">
          {links.data === undefined && <Status>Loading its links…</Status>}
          {links.data === null && <LoadFailed what="The verse's links" onRetry={links.retry} backHref={HERE} backLabel="Choose another verse" />}
          {links.data && (
            <>
              <div className="bx-band__head">
                <h2>The verses linked from it</h2>
                <p>
                  {count === 0 ? "The Study Bible lists no cross-references for this verse." : `${count} ${count === 1 ? "verse" : "verses"} in ${groups.length === 1 ? "one book" : `${groups.length} books`}, in the ${BIBLE_TRANSLATION}. Each opens its chapter.`}
                </p>
              </div>
              {groups.map((g) => (
                <section key={g.book.slug} className="bx-follow__book" aria-labelledby={`linked-${g.book.slug}`}>
                  <h3 id={`linked-${g.book.slug}`}>{g.book.name}</h3>
                  <ul className="bx-verses">
                    {g.refs.map((raw) => (
                      <Linked key={raw} raw={raw} books={books} />
                    ))}
                  </ul>
                </section>
              ))}
            </>
          )}
        </Band>
      )}
    </>
  );
}

export default function FollowVerse() {
  const search = useSearch();
  const refCode = new URLSearchParams(search).get("ref");
  const { data, retry } = useLoad("follow", async () => {
    const [books, examples] = await Promise.all([fetchBooks(), fetchXrefExamples()]);
    return { books, examples };
  });
  return (
    <Layout>
      <SEOMeta
        title="Follow a Verse Through the Bible: Cross-References"
        description="Choose a verse and see the verses the Study Bible links from it, grouped by book, each in the Berean Standard Bible, with one more step outward on request."
        url="https://www.livewellbyjamesbell.co/study/cross-references"
      />
      <InnerHead path="/study/cross-references" title="Follow a verse through the Bible" line="Choose a verse and see the verses the Study Bible links from it, book by book." plate="compass" />
      {data === undefined && (
        <div data-lw-loading>
          <Status>Loading the cross-references…</Status>
        </div>
      )}
      {data === null && <LoadFailed what="The cross-references" onRetry={retry} backHref="/study" backLabel="Back to Study the Bible" />}
      {data && <FollowView key={refCode ?? ""} refCode={refCode} books={data.books} examples={data.examples} />}
      {data && <Credits />}
    </Layout>
  );
}

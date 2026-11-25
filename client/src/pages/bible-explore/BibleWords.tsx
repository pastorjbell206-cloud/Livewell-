/**
 * /study/words: key words of the Bible. Every word a book page stops to
 * explain (intro.json `teaching.words`), gathered by
 * scripts/build-bible-words-index.mjs into /bible/explore/words.json: one
 * entry per word, with each book's own explanation under it and the way to
 * that book and the chapters its sentence names.
 *
 * The book pages carry no language field. A word is listed under Hebrew,
 * Aramaic or Greek only when a book's own sentence names that language
 * ("Greek euangelion, good news"); the rest are listed by testament, and the
 * page says the book pages name no language for them. It does not guess.
 */
import { useMemo, useState } from "react";
import { Link } from "wouter";
import { KeyRound } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import { LoadFailed } from "@/components/LoadFailed";
import { chapterBookName, chapterHref } from "@/lib/bible";
import { fetchWords, type ExploreBook, type KeyWord, type WordsData } from "@/lib/bibleExplore";
import { Band, Status, useLoad } from "../study-bible/shared";
import { NotYet, TestamentChips, useStaged, type Testament } from "./shared";
import "../study-bible/bible.css";
import "./explore.css";

type GroupId = "hebrew" | "aramaic" | "greek" | "ot" | "nt";

/** The groups, in order. A word sits in each language group its books' sentences name. */
export const WORD_GROUPS: { id: GroupId; name: string; note: string; has: (w: KeyWord) => boolean }[] = [
  { id: "hebrew", name: "Hebrew", note: "A book page names the Hebrew behind each of these.", has: (w) => w.langs.includes("hebrew") },
  { id: "aramaic", name: "Aramaic", note: "A book page names the Aramaic behind each of these.", has: (w) => w.langs.includes("aramaic") },
  { id: "greek", name: "Greek", note: "A book page names the Greek behind each of these.", has: (w) => w.langs.includes("greek") },
  { id: "ot", name: "More key words in Old Testament books", note: "The book pages explain these and name no language for them.", has: (w) => w.langs.length === 0 && w.testaments.includes("OT") },
  { id: "nt", name: "More key words in New Testament books", note: "The book pages explain these and name no language for them.", has: (w) => w.langs.length === 0 && w.testaments.includes("NT") },
];

const fold = (s: string) => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[‘’']/g, "");

function Word({ w, books, id }: { w: KeyWord; books: Map<string, ExploreBook>; id?: string }) {
  return (
    <li id={id}>
      <KeyRound aria-hidden="true" size={18} strokeWidth={1.75} />
      <h3>{w.word}</h3>
      {w.entries.map((e) => {
        const b = books.get(e.book);
        if (!b) return null;
        return (
          <div key={e.book} className="bx-word__entry">
            <p>{e.line}</p>
            <p className="bx-entry__meta">
              <Link href={`/study/bible/${b.slug}#key-words`}>On the {b.name} page</Link>
              {e.word && <span>as {e.word}</span>}
              {e.refs.map((r) => (
                <Link key={`${r.ch}:${r.v ?? ""}`} href={chapterHref(b.slug, r.ch, r.v)}>
                  {chapterBookName(b)} {r.ch}
                  {r.v ? `:${r.v}` : ""}
                </Link>
              ))}
            </p>
          </div>
        );
      })}
    </li>
  );
}

export function WordsView({ data }: { data: WordsData }) {
  const [query, setQuery] = useState("");
  const [testament, setTestament] = useState<Testament>("all");
  const [group, setGroup] = useState<GroupId | "all">("all");
  const books = useMemo(() => new Map(data.books.map((b) => [b.slug, b])), [data.books]);
  const all = useStaged();

  const q = fold(query.trim());
  const shown = useMemo(
    () =>
      data.words.filter((w) => {
        if (testament !== "all" && !w.testaments.includes(testament)) return false;
        if (!q) return true;
        return fold(w.word).includes(q) || w.entries.some((e) => fold(e.line).includes(q) || fold(e.word ?? "").includes(q));
      }),
    [data.words, testament, q],
  );
  const groups = WORD_GROUPS.map((g) => ({ ...g, all: data.words.filter(g.has).length, words: shown.filter(g.has) })).filter((g) => g.all > 0);
  const open = groups.filter((g) => (group === "all" || g.id === group) && g.words.length > 0);
  const total = new Set(open.flatMap((g) => g.words.map((w) => w.id))).size;
  const reset = () => {
    setQuery("");
    setTestament("all");
    setGroup("all");
  };
  // A word in two groups keeps its address on the first.
  const placed = new Set<string>();

  return (
    <>
      <Band id="words">
        {/* Two short paragraphs, not one tall one: a tall one here becomes the page's largest paint, counted late. */}
        <p className="bx-lede">
          {data.words.length} words from the pages of {data.books.length} books, each explained in its own book's words.
        </p>
        <p className="bx-note">Where more than one book explains a word, each explanation is given.</p>
        <NotYet without={data.without} what="key words" />

        <div className="bx-filters">
          <div className="bx-field">
            <label htmlFor="bx-word">Find a word</label>
            <input id="bx-word" type="search" value={query} onChange={(e) => setQuery(e.target.value)} autoComplete="off" placeholder="A word, in English, Hebrew or Greek" />
          </div>
          <div className="bk-tl__chips bx-chips" role="group" aria-label="Language">
            <button type="button" aria-pressed={group === "all"} onClick={() => setGroup("all")}>
              Every word
            </button>
            {groups.map((g) => (
              <button key={g.id} type="button" aria-pressed={group === g.id} onClick={() => setGroup(g.id)}>
                {g.id === "ot" ? "More, Old Testament" : g.id === "nt" ? "More, New Testament" : g.name}
              </button>
            ))}
          </div>
          <TestamentChips value={testament} onChange={setTestament} />
          <p className="bx-count" role="status">
            Showing {total} of {data.words.length} words.
          </p>
        </div>
        {total === 0 && (
          <p className="bx-note">
            No key word matches that.{" "}
            <button type="button" className="bx-reset" onClick={reset}>
              Show every word
            </button>
          </p>
        )}
      </Band>

      {open.filter((_, i) => all || i === 0).map((g, i) => (
        <Band key={g.id} tone={i % 2 ? "bone" : "warm"}>
          <div className="bx-band__head">
            <h2 id={`words-${g.id}`}>{g.name}</h2>
            <p>
              {g.words.length} {g.words.length === 1 ? "word" : "words"}. {g.note}
            </p>
          </div>
          <ul className={`bk-words bx-words${i ? " bx-far" : ""}`}>
            {g.words.map((w) => {
              const first = !placed.has(w.id);
              placed.add(w.id);
              return <Word key={w.id} w={w} books={books} id={first ? w.id : undefined} />;
            })}
          </ul>
        </Band>
      ))}
    </>
  );
}

export default function BibleWords() {
  const { data, retry } = useLoad("words", fetchWords);
  return (
    <Layout>
      <SEOMeta
        title="Key Words of the Bible, in Hebrew and Greek"
        description="Every key word the Study Bible's book pages explain, in one searchable list: the Hebrew and Greek behind the English, each in its own book's words, with links."
        url="https://www.livewellbyjamesbell.co/study/words"
      />
      <InnerHead path="/study/words" title="Key words of the Bible" line="The words the book pages stop to explain, in one list. Search it, or go by language." plate="lens" />
      {data === undefined && (
        <div data-lw-loading>
          <Status>Loading the key words…</Status>
        </div>
      )}
      {data === null && <LoadFailed what="The key words" onRetry={retry} backHref="/study" backLabel="Back to Study the Bible" />}
      {data && <WordsView data={data} />}
    </Layout>
  );
}

/**
 * /study/word and /study/word/<strong>: study a Bible word.
 *
 * Find a Hebrew or Greek word by its English meaning, its transliteration or
 * its Strong's number; then see its dictionary entry exactly as the Study
 * Bible shows it (through safeDefinition), how often it is used, the books it
 * is used in as a bar for each, and its verses in the Berean Standard Bible,
 * each opening its chapter.
 *
 * Only what the Study Bible's data holds is shown, and no commentary is
 * written. The entry is the lexicon's (bible/lex/). The counts by book and
 * the full list of verses are counted from the Study Bible's own chapters by
 * scripts/build-bible-word-index.mjs (the lexicon lists 60 verses at most),
 * in small files (lib/bibleStudy.ts). A word is marked in a verse only where
 * the sentence holds the Study Bible's word-for-word meaning whole; the
 * meaning is given beside every verse either way.
 *
 * A word's own page is not in the sitemap and is marked noindex: there are
 * some 17,000 of them, each a dictionary entry and a list. The finder is the
 * page a search engine is given.
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "wouter";
import { Search } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import { LoadFailed } from "@/components/LoadFailed";
import { BIBLE_TRANSLATION, chapterBookName, chapterHref, fetchBooks, fetchChapterText, langOf, lookupLex, plainGloss, safeDefinition, type BibleBook, type LexEntry } from "@/lib/bible";
import { fetchWordIndex, fetchWordPage, fetchWordUse, findWords, markMeaning, strongKey, strongLabel, wordHref, type FoundWord, type WordIndex, type WordRow, type WordUse } from "@/lib/bibleStudy";
import { Band, Credits, Status, useLoad } from "../study-bible/shared";
import "../study-bible/bible.css";
import "./explore.css";

const LANG = { H: "Hebrew", G: "Greek" } as const;
const SCRIPT = { H: "he", G: "grc" } as const;
const STEP = 20;

/* The finder ----------------------------------------------------------- */

export function WordFinder({ index, note }: { index: WordIndex; note?: string }) {
  const [query, setQuery] = useState("");
  const [found, setFound] = useState<{ q: string; rows: FoundWord[] } | null>(null);
  const [failed, setFailed] = useState(false);
  const q = query.trim();

  useEffect(() => {
    if (q.length < 2) return;
    let stale = false;
    setFailed(false);
    const byNumber = async (): Promise<FoundWord[]> => {
      // A number alone could be either language's: both are looked up, and only a word the dictionary has is offered.
      const keys = /^\d{1,4}[A-Za-z]?$/.test(q) ? [strongKey(`H${q}`), strongKey(`G${q}`)] : [strongKey(q)];
      const out: FoundWord[] = [];
      for (const k of keys) {
        const hit = k ? await lookupLex(k) : null;
        if (hit) out.push([hit.key, hit.entry.l, hit.entry.tr, hit.entry.g, hit.entry.n]);
      }
      return out;
    };
    (/^[HhGg]?\d/.test(q) ? byNumber() : findWords(q, index))
      .then((rows) => !stale && setFound({ q, rows }))
      .catch(() => !stale && setFailed(true));
    return () => {
      stale = true;
    };
  }, [q, index]);

  const rows = found && found.q === q ? found.rows : null;
  return (
    <Band id="find">
      {note && (
        <p className="bx-note" role="alert">
          {note}
        </p>
      )}
      <p className="bx-lede">
        {index.words.H.toLocaleString("en-US")} Hebrew and Aramaic words and {index.words.G.toLocaleString("en-US")} Greek words, every one the Study Bible's text uses.
      </p>
      <p className="bx-note">Find a word by its English meaning, its transliteration or its Strong's number. Each has its dictionary entry, the books that use it and its verses.</p>
      <div className="bx-filters">
        <div className="bx-field">
          <label htmlFor="bx-find-word">Find a word</label>
          <input id="bx-find-word" type="search" value={query} onChange={(e) => setQuery(e.target.value)} autoComplete="off" spellCheck={false} placeholder="love, agapē, chesed, G26, H2617" />
        </div>
        <p className="bx-count" role="status">
          {q.length < 2 ? "Type two letters or more, or a number." : failed ? "The words did not load. Check your connection and type again." : rows === null ? "Looking…" : rows.length === 0 ? "No word in the Study Bible's dictionary matches that." : rows.length > 60 ? `${rows.length} words match. The 60 used most are listed.` : `${rows.length} ${rows.length === 1 ? "word matches" : "words match"}.`}
        </p>
      </div>
      {rows && rows.length > 0 && (
        <ul className="bx-found" aria-label="Words that match">
          {rows.slice(0, 60).map(([key, lemma, tr, meaning, n]) => {
            const lang = langOf(key) ?? "G";
            return (
              <li key={key}>
                <Link href={wordHref(key)}>
                  <span className="bx-found__lemma" lang={SCRIPT[lang]} dir={lang === "H" ? "rtl" : undefined}>
                    {lemma}
                  </span>
                  <span className="bx-found__words">
                    <strong>{plainGloss(meaning)}</strong>
                    <span>
                      <i>{tr}</i> · {LANG[lang]} · {strongLabel(key)} · {n === 1 ? "once" : `${n.toLocaleString("en-US")} times`}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
      <p className="lw-newline">
        <Search aria-hidden="true" size={20} strokeWidth={1.75} />
        <span>
          Not sure which word? <Link href="/study/words">Key words of the Bible</Link> lists the words the book pages explain.
        </span>
      </p>
    </Band>
  );
}

/* One word -------------------------------------------------------------- */

/** One verse: its reference as the link to its chapter, its words in the BSB with the meaning marked, and the meaning. */
function Verse({ row, use, books }: { row: WordRow; use: WordUse; books: BibleBook[] }) {
  const [b, c, v, ...gi] = row;
  const book = books[b];
  const { data } = useLoad(`${book.slug}/${c}`, () => fetchChapterText(book.slug, c));
  const meanings = Array.from(new Set(gi.map((i) => plainGloss(use.g[i] ?? "")).filter(Boolean)));
  const text = data?.verses.find((x) => x.v === v)?.t;
  return (
    <li>
      <Link href={chapterHref(book.slug, c, v)}>
        {chapterBookName(book)} {c}:{v}
      </Link>
      <p className="bx-verse__t">
        {data === undefined ? <span className="bx-verse__wait">Opening the verse…</span> : !text ? <span className="bx-verse__wait">The verse's words did not load. Its chapter still opens.</span> : markMeaning(text, meanings).map((part, i) => (part.mark ? <mark key={i}>{part.text}</mark> : <span key={i}>{part.text}</span>))}
      </p>
      <p className="bx-verse__g">
        Here: {meanings.map((m) => `“${m}”`).join(", ")}
      </p>
    </li>
  );
}

function Verses({ strong, use, books }: { strong: string; use: WordUse; books: BibleBook[] }) {
  const [book, setBook] = useState<number | null>(null);
  const [shown, setShown] = useState(STEP);
  const [paged, setPaged] = useState<{ key: string; rows: WordRow[] } | null>(null);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);
  // The verses' chapters are asked for only once the entry has painted, so the
  // entry (the page's largest text) is not held behind twenty small fetches.
  const [painted, setPainted] = useState(false);
  useEffect(() => {
    let t = 0;
    const f = requestAnimationFrame(() => {
      t = window.setTimeout(() => setPainted(true), 0);
    });
    return () => {
      cancelAnimationFrame(f);
      clearTimeout(t);
    };
  }, []);
  const page = 300;

  // Where the wanted verses sit among the word's rows.
  const total = use.v ? (book === null ? use.v.length : use.v.filter((r) => r[0] === book).length) : book === null ? (use.vn ?? 0) : (() => {
    const at = (use.s ?? []).findIndex(([b]) => b === book);
    if (at < 0) return 0;
    return ((use.s ?? [])[at + 1]?.[1] ?? use.vn ?? 0) - (use.s ?? [])[at][1];
  })();
  const start = use.v || book === null ? 0 : ((use.s ?? []).find(([b]) => b === book)?.[1] ?? 0);
  const want = Math.min(shown, total);
  const key = `${strong}:${book}:${want}`;

  useEffect(() => {
    if (use.v || want === 0 || !painted) return;
    let stale = false;
    const first = Math.floor(start / page);
    const last = Math.floor((start + want - 1) / page);
    Promise.all(Array.from({ length: last - first + 1 }, (_, i) => fetchWordPage(strong, first + i)))
      .then((pages) => !stale && setPaged({ key, rows: pages.flat().slice(start - first * page, start - first * page + want) }))
      .catch(() => !stale && setFailed(true));
    return () => {
      stale = true;
    };
    // `key` names everything this reads.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, nonce, painted]);

  const rows = use.v ? (book === null ? use.v : use.v.filter((r) => r[0] === book)).slice(0, want) : paged?.key === key ? paged.rows : null;
  const most = Math.max(1, ...use.b.map(([, n]) => n));
  const choose = (b: number | null) => {
    setBook(b);
    setShown(STEP);
    setFailed(false);
  };

  return (
    <>
      <Band tone="warm" id="books">
        <div className="bx-band__head">
          <h2>The books that use it</h2>
          <p>
            {use.b.length === 1 ? "One book" : `${use.b.length} books`}. Choose a book to see its verses.
          </p>
        </div>
        <ol className="bx-bars">
          {use.b.map(([b, n]) => (
            <li key={b}>
              <button type="button" aria-pressed={book === b} onClick={() => choose(book === b ? null : b)}>
                <span className="bx-line__name">{books[b].name}</span>
                <span className="bx-line__bar" aria-hidden="true">
                  <i style={{ ["--n" as string]: n / most }} />
                </span>
                <span className="bx-line__n">
                  {n.toLocaleString("en-US")}
                  <span className="sr-only"> {n === 1 ? "time" : "times"}</span>
                </span>
              </button>
            </li>
          ))}
        </ol>
      </Band>

      <Band id="verses">
        <div className="bx-band__head">
          <h2>{book === null ? "Its verses" : `Its verses in ${books[book].name}`}</h2>
          <p>
            {total.toLocaleString("en-US")} {total === 1 ? "verse" : "verses"}, in the {BIBLE_TRANSLATION}. Each opens its chapter.
          </p>
        </div>
        <p className="bx-note">The word is marked where the sentence holds the Study Bible's word-for-word meaning. That meaning is given under every verse.</p>
        {book !== null && (
          <p className="bx-top">
            <button type="button" className="bx-reset" onClick={() => choose(null)}>
              Every book
            </button>
          </p>
        )}
        {failed ? (
          <LoadFailed
            what="The verses"
            onRetry={() => {
              setFailed(false);
              setNonce((n) => n + 1);
            }}
          />
        ) : rows === null || !painted ? (
          <Status>Loading the verses…</Status>
        ) : (
          <ol className="bx-verses">
            {rows.map((r) => (
              <Verse key={`${r[0]}.${r[1]}.${r[2]}`} row={r} use={use} books={books} />
            ))}
          </ol>
        )}
        {!failed && want < total && (
          <p className="bx-top">
            <button type="button" className="bx-reset" onClick={() => setShown((n) => n + STEP)}>
              Show {Math.min(STEP, total - want)} more
            </button>
            <span className="bx-count">
              {want.toLocaleString("en-US")} of {total.toLocaleString("en-US")} shown.
            </span>
          </p>
        )}
      </Band>
    </>
  );
}

export function WordView({ strong, entry, use, books }: { strong: string; entry: LexEntry; use: WordUse | null; books: BibleBook[] }) {
  const lang = langOf(strong) ?? "G";
  const where = lang === "H" ? "the Hebrew Old Testament" : "the Greek New Testament";
  const definition = useMemo(() => safeDefinition(entry.d), [entry.d]);
  return (
    <>
      <Band id="entry">
        <div className="bx-band__head">
          <h2>Dictionary</h2>
          <p>
            {strongLabel(strong)} · {LANG[lang]}
            {entry.rel ? ` · ${entry.rel}` : ""}
          </p>
        </div>
        <p className="bx-entry__head">
          <span lang={SCRIPT[lang]} dir={lang === "H" ? "rtl" : undefined}>
            {entry.l}
          </span>{" "}
          <i>{entry.tr}</i> · {entry.g}
        </p>
        <div className="bx-def" dangerouslySetInnerHTML={{ __html: definition }} />
        <p className="bx-count bx-uses">
          {use ? (
            <>
              {use.n === 1 ? "Used once" : `Used ${use.n.toLocaleString("en-US")} times`} in {where}, in {use.b.length === 1 ? "one book" : `${use.b.length} books`}.
              {entry.n !== use.n && ` The dictionary's own count is ${entry.n.toLocaleString("en-US")}; the Study Bible's chapters hold ${use.n.toLocaleString("en-US")}, and those are the ones shown here.`}
            </>
          ) : (
            "The Study Bible's chapters hold no verse for this word."
          )}
        </p>
        <p className="bx-top">
          <Link href="/study/word">Find another word</Link>
        </p>
      </Band>
      {use && <Verses strong={strong} use={use} books={books} />}
    </>
  );
}

/* The page -------------------------------------------------------------- */

function Finder({ note }: { note?: string }) {
  const { data, retry } = useLoad("word-index", fetchWordIndex);
  return (
    <>
      <SEOMeta
        title="Study a Bible Word in Hebrew or Greek"
        description="Look up any Hebrew or Greek word of the Bible by its English meaning or Strong's number: its dictionary entry, the books that use it, and every verse."
        url="https://www.livewellbyjamesbell.co/study/word"
      />
      <InnerHead path="/study/word" title="Study a Bible word" line="Look up a Hebrew or Greek word: its dictionary entry, the books that use it, and its verses." plate="lens" />
      {data === undefined && (
        <div data-lw-loading>
          <Status>Loading the word finder…</Status>
        </div>
      )}
      {data === null && <LoadFailed what="The word finder" onRetry={retry} backHref="/study" backLabel="Back to Study the Bible" />}
      {data && <WordFinder index={data} note={note} />}
      {data && <Credits />}
    </>
  );
}

function Word({ strong }: { strong: string }) {
  const { data, retry } = useLoad(`word-${strong}`, async () => {
    const [lex, index, books] = await Promise.all([lookupLex(strong), fetchWordIndex(), fetchBooks()]);
    // The dictionary may file the word under its plain number; its uses are under the same key.
    return { lex, index, books, use: lex ? await fetchWordUse(lex.key, index) : null };
  });
  const lang = langOf(strong) ?? "G";
  return (
    <>
      <SEOMeta
        title={data?.lex ? `${data.lex.entry.tr}: ${plainGloss(data.lex.entry.g)} (${strongLabel(data.lex.key)})` : `Study a Bible word: ${strongLabel(strong)}`}
        description={`The ${LANG[lang]} word ${strongLabel(strong)} in the Study Bible: its dictionary entry, the books that use it, and its verses in the Berean Standard Bible.`}
        url={`https://www.livewellbyjamesbell.co/study/word/${strong}`}
        noindex
      />
      <InnerHead
        path="/study/word"
        title={
          data?.lex ? (
            <>
              <span lang={SCRIPT[lang]} dir={lang === "H" ? "rtl" : undefined}>
                {data.lex.entry.l}
              </span>{" "}
              <span className="bx-h1-tr">{data.lex.entry.tr}</span>
            </>
          ) : (
            `Study a Bible word: ${strongLabel(strong)}`
          )
        }
        line={data?.lex ? `“${plainGloss(data.lex.entry.g)}”. Its dictionary entry, the books that use it, and its verses.` : undefined}
      />
      {data === undefined && (
        <div data-lw-loading>
          <Status>Looking the word up…</Status>
        </div>
      )}
      {data === null && <LoadFailed what="The word" onRetry={retry} backHref="/study/word" backLabel="Find a word" />}
      {data && !data.lex && <WordFinder index={data.index} note={`The Study Bible's dictionary has no word numbered ${strongLabel(strong)}. Look for it by its meaning.`} />}
      {data?.lex && <WordView strong={data.lex.key} entry={data.lex.entry} use={data.use} books={data.books} />}
      {data && <Credits />}
    </>
  );
}

export default function StudyWord() {
  const params = useParams<{ strong?: string }>();
  const strong = params.strong ? strongKey(params.strong) : null;
  return <Layout>{strong ? <Word key={strong} strong={strong} /> : <Finder note={params.strong ? "That is not a Strong's number. A number looks like G26 or H2617." : undefined} />}</Layout>;
}

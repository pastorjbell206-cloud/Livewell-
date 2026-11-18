/**
 * The Bible word search on a page: a hook that loads the Bible's words the
 * first time a search needs them, the list of matching verses, and the short
 * preview the site search shows ("In the Bible's own words").
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";

import { chapterHref, fetchBooks, type BibleBook } from "@/lib/bible";
import { highlightParts, loadBibleCorpus, searchCorpus, searchWordsOf, type BibleHit, type BibleSearchResult } from "@/lib/bible-search";
import { kicker, quietLink } from "@/pages/study-bible/shared";

type Loaded = { books: BibleBook[]; corpus: Awaited<ReturnType<typeof loadBibleCorpus>> };

/** A query worth a search: at least one word of two letters or more. */
export const worthSearching = (q: string) => searchWordsOf(q).some((w) => w.length > 1);

export const bibleSearchHref = (q: string) => `/study/bible/search?q=${encodeURIComponent(q.trim())}`;

/**
 * Searches the Bible's words for `query`. Nothing loads until a query is
 * worth searching; `result` is null until the words have arrived.
 */
export function useBibleSearch(query: string): { books: BibleBook[] | null; result: BibleSearchResult | null; loading: boolean; failed: boolean; retry: () => void } {
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);
  const wanted = worthSearching(query);

  useEffect(() => {
    if (!wanted || loaded) return;
    let stale = false;
    fetchBooks()
      .then((books) => loadBibleCorpus(books).then((corpus) => { if (!stale) setLoaded({ books, corpus }); }))
      .catch(() => { if (!stale) setFailed(true); });
    return () => { stale = true; };
  }, [wanted, loaded, nonce]);

  const result = useMemo(() => (loaded && wanted ? searchCorpus(loaded.corpus, query) : null), [loaded, wanted, query]);
  return {
    books: loaded?.books ?? null,
    result,
    loading: wanted && !loaded && !failed,
    failed: wanted && !loaded && failed,
    retry: () => { setFailed(false); setNonce((n) => n + 1); },
  };
}

/** One matching verse: its reference as the link, then its words with the matches set apart. */
export function HitRow({ hit, books, words }: { hit: BibleHit; books: BibleBook[]; words: string[] }) {
  const name = books[hit.book]?.name ?? hit.slug;
  return (
    <li style={{ padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
      <Link href={chapterHref(hit.slug, hit.chapter, hit.verse)} style={{ ...quietLink, display: "inline-flex", alignItems: "center", minHeight: "32px", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600 }}>
        {name} {hit.chapter}:{hit.verse}
      </Link>
      <p style={{ margin: "2px 0 0", fontFamily: "var(--B)", fontSize: "16.5px", lineHeight: 1.7, color: "var(--ink)", maxWidth: "68ch" }}>
        {highlightParts(hit.text, words).map((p, i) =>
          p.hit ? <mark key={i} style={{ background: "none", color: "inherit", fontWeight: 600, boxShadow: "inset 0 -2px 0 var(--mustard)" }}>{p.text}</mark> : <span key={i}>{p.text}</span>
        )}
      </p>
    </li>
  );
}

const PREVIEW = 3;

/**
 * For the site search: the first few verses that hold the words, and a link
 * to all of them. Renders nothing when the Bible has no such verse, so the
 * rest of the results are not pushed down by an empty heading.
 */
export default function BibleMatchesPreview({ query }: { query: string }) {
  const { books, result, loading } = useBibleSearch(query);
  if (loading) {
    return <p role="status" style={{ margin: "0 0 var(--s-5)", fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)" }}>Looking through the Bible for “{query.trim()}”…</p>;
  }
  if (!books || !result || result.hits.length === 0) return null;
  const n = result.hits.length;
  return (
    <section aria-label="Verses in the Bible" style={{ margin: "0 0 var(--s-5)" }}>
      <p style={{ ...kicker, fontSize: "12px", letterSpacing: "0.18em", margin: "0 0 8px" }}>In the Bible’s own words</p>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid var(--border)" }}>
        {result.hits.slice(0, PREVIEW).map((h) => <HitRow key={`${h.slug}.${h.chapter}.${h.verse}`} hit={h} books={books} words={result.words} />)}
      </ul>
      <p style={{ margin: "12px 0 0", fontFamily: "var(--U)", fontSize: "14px" }}>
        <Link href={bibleSearchHref(query)} style={{ ...quietLink, display: "inline-flex", alignItems: "center", minHeight: "44px", fontWeight: 600 }}>
          {n > PREVIEW ? `See all ${n.toLocaleString("en-US")} verses` : "Open the Bible search"}
        </Link>
      </p>
    </section>
  );
}

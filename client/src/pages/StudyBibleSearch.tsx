/**
 * /study/bible/search — search the Bible's words.
 *
 * "born again" lists John 3:3 and the verses beside it; a reference ("John
 * 3:16") is offered as the passage itself, ahead of any verse that happens to
 * hold its words. The words searched are the Berean Standard Bible's, loaded
 * the first time someone searches (lib/bible-search.ts).
 */
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Link } from "wouter";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { LoadFailed } from "@/components/LoadFailed";
import { BIBLE_TRANSLATION } from "@/lib/bible";
import * as scriptureRef from "@/lib/scripture-ref";
import { passageFor } from "@/lib/siteSearch";
import { HitRow, useBibleSearch, worthSearching } from "@/pages/study-bible/BibleSearchResults";
import { Credits, Hero, Lede, card, kicker, quietLink, wrap } from "@/pages/study-bible/shared";

const PAGE = 40;
type Part = "all" | "OT" | "NT";

const readQuery = () => (typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get("q") ?? "");

export default function StudyBibleSearch() {
  const [query, setQuery] = useState(readQuery);
  const [part, setPart] = useState<Part>("all");
  const [bookSlug, setBookSlug] = useState("");
  const [shown, setShown] = useState(PAGE);
  // A new search starts from the top of its own list, with no filter left over.
  const [shownFor, setShownFor] = useState(query);
  if (shownFor !== query) {
    setShownFor(query);
    setShown(PAGE);
    setBookSlug("");
    setPart("all");
  }

  // Keep the address in step, so Back and a shared link return to the same search.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = query.trim() ? `/study/bible/search?q=${encodeURIComponent(query.trim())}` : "/study/bible/search";
    if (window.location.pathname + window.location.search !== url) window.history.replaceState(window.history.state, "", url);
  }, [query]);

  const { books, result, loading, failed, retry } = useBibleSearch(query);
  const passage = useMemo(() => (query.trim() ? passageFor(query, scriptureRef) : null), [query]);

  const inPart = useMemo(() => {
    if (!result || !books) return [];
    return part === "all" ? result.hits : result.hits.filter((h) => books[h.book]?.testament === part);
  }, [result, books, part]);
  const byBook = useMemo(() => {
    const m = new Map<string, number>();
    for (const h of inPart) m.set(h.slug, (m.get(h.slug) ?? 0) + 1);
    return m;
  }, [inPart]);
  const hits = bookSlug ? inPart.filter((h) => h.slug === bookSlug) : inPart;
  const visible = hits.slice(0, shown);
  const firstApart = visible.findIndex((h) => !h.phrase);
  const count = (p: Part) => (!result || !books ? 0 : p === "all" ? result.hits.length : result.hits.filter((h) => books[h.book]?.testament === p).length);
  const q = query.trim();
  const verses = (n: number) => `${n.toLocaleString("en-US")} verse${n === 1 ? "" : "s"}`;

  return (
    <Layout>
      <SEOMeta
        title="Search the Bible: Find Any Word or Phrase"
        description="Type a word or a phrase and see every verse of the Bible that holds it, in the Berean Standard Bible, each one a tap from its chapter and its study notes."
        url="https://www.livewellbyjamesbell.co/study/bible/search"
      />
      <Hero eyebrow="The Study Bible" eyebrowHref="/study/bible" title="Search the Bible">
        <Lede>Type a word or a phrase and every verse that holds it is listed here, in the Bible’s own order. The words searched are the {BIBLE_TRANSLATION}’s.</Lede>
        <form role="search" aria-label="Search the Bible" onSubmit={(e) => e.preventDefault()} style={{ marginTop: "var(--s-4)", maxWidth: "520px" }}>
          <label htmlFor="bible-search-q" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0,0,0,0)" }}>A word or a phrase</label>
          <input
            id="bible-search-q"
            type="search"
            autoComplete="off"
            spellCheck={false}
            placeholder="born again, shepherd, fear not"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ width: "100%", minHeight: "48px", padding: "0 18px", border: "1px solid var(--border)", borderRadius: "999px", background: "var(--card)", color: "var(--ink)", fontFamily: "var(--U)", fontSize: "17px" }}
          />
        </form>
      </Hero>

      <section style={{ background: "var(--bone)", padding: "0 var(--gutter) var(--s-6)", minHeight: "40vh" }}>
        <div style={wrap}>
          {passage && (
            <Link href={passage.href} style={{ ...card, display: "block", padding: "14px var(--s-4)", margin: "0 0 var(--s-4)", borderLeft: "2px solid var(--mustard)", textDecoration: "none", backgroundImage: "none", color: "var(--ink)" }}>
              <span style={kicker}>Open the passage</span>
              <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "1.4rem", marginTop: "2px" }}>{passage.label}</span>
            </Link>
          )}

          {!worthSearching(query) ? (
            <p style={{ fontFamily: "var(--B)", fontSize: "16.5px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "62ch", margin: 0 }}>
              The search looks for whole words, the way a concordance does, so “love” and “loved” are two searches. When you type more than one word, the verses that hold them side by side come first. To open a passage you already know, type its reference, such as John 3:16.
            </p>
          ) : failed ? (
            <LoadFailed what="The Bible search" onRetry={retry} backHref="/study/bible" backLabel="Back to the Study Bible" />
          ) : loading || !result || !books ? (
            <p role="status" style={{ fontFamily: "var(--B)", color: "var(--ink-muted)", margin: 0 }}>Opening the Bible…</p>
          ) : result.hits.length === 0 ? (
            <div style={{ maxWidth: "62ch" }}>
              <p role="status" style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.7, color: "var(--ink)", margin: "0 0 10px" }}>
                No verse in the {BIBLE_TRANSLATION} holds {result.words.length > 1 ? "all the words of " : ""}“{q}”.
              </p>
              <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)", margin: 0 }}>
                The search looks for whole words, so try fewer words or another form of the word. Other translations choose other words, too: a phrase you know from one of them may be worded differently here. You can also{" "}
                <Link href={`/search?q=${encodeURIComponent(q)}`} style={quietLink}>search the rest of the site for it</Link>.
              </p>
            </div>
          ) : (
            <>
              <p role="status" style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.6, color: "var(--ink)", margin: "0 0 14px" }}>
                {result.words.length === 1
                  ? `“${q}” is in ${verses(result.hits.length)}.`
                  : result.phraseCount === result.hits.length
                    ? `“${q}” is in ${verses(result.hits.length)}.`
                    : result.phraseCount === 0
                      ? `No verse has these words side by side. ${verses(result.hits.length)} ${result.hits.length === 1 ? "has" : "have"} every one of them.`
                      : `“${q}” is in ${verses(result.phraseCount)}. ${verses(result.hits.length - result.phraseCount)} more ${result.hits.length - result.phraseCount === 1 ? "has" : "have"} every word, apart.`}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", margin: "0 0 var(--s-3)" }}>
                <div role="group" aria-label="Which part of the Bible" style={{ display: "inline-flex", flexWrap: "wrap", gap: "6px" }}>
                  {([["all", "The whole Bible"], ["OT", "Old Testament"], ["NT", "New Testament"]] as const).map(([p, label]) => {
                    const on = part === p;
                    return (
                      <button key={p} type="button" aria-pressed={on} onClick={() => { setPart(p); setBookSlug(""); setShown(PAGE); }} style={{ minHeight: "40px", padding: "0 14px", borderRadius: "999px", border: `1px solid ${on ? "var(--ink)" : "var(--border)"}`, background: on ? "var(--ink)" : "var(--card)", color: on ? "var(--bone)" : "var(--ink)", cursor: "pointer", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600 }}>
                        {label} ({count(p).toLocaleString("en-US")})
                      </button>
                    );
                  })}
                </div>
                {byBook.size > 1 && (
                  <>
                    <label htmlFor="bible-search-book" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0,0,0,0)" }}>One book</label>
                    <select id="bible-search-book" value={bookSlug} onChange={(e) => { setBookSlug(e.target.value); setShown(PAGE); }} style={{ minHeight: "40px", padding: "0 12px", border: "1px solid var(--border)", borderRadius: "999px", background: "var(--card)", color: "var(--ink)", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600 }}>
                      <option value="">Every book</option>
                      {books.filter((b) => byBook.has(b.slug)).map((b) => <option key={b.slug} value={b.slug}>{b.name} ({byBook.get(b.slug)})</option>)}
                    </select>
                  </>
                )}
              </div>
              {hits.length === 0 ? (
                <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)", margin: 0 }}>None of them are in this part of the Bible.</p>
              ) : (
                <ol style={{ listStyle: "none", margin: 0, padding: 0, borderTop: "1px solid var(--border)" }}>
                  {visible.map((h, i) => (
                    <FragmentRow key={`${h.slug}.${h.chapter}.${h.verse}`} divider={i === firstApart && result.phraseCount > 0 && firstApart > 0}>
                      <HitRow hit={h} books={books} words={result.words} />
                    </FragmentRow>
                  ))}
                </ol>
              )}
              {hits.length > shown && (
                <p style={{ margin: "var(--s-4) 0 0" }}>
                  <button type="button" className="btn btn--quiet" onClick={() => setShown((n) => n + PAGE)}>
                    Show {Math.min(PAGE, hits.length - shown)} more of {hits.length.toLocaleString("en-US")}
                  </button>
                </p>
              )}
            </>
          )}
        </div>
      </section>
      <Credits />
    </Layout>
  );
}

/** A row, with the line that separates "side by side" from "every word, apart" above it when it is the first of the second kind. */
function FragmentRow({ divider, children }: { divider: boolean; children: ReactNode }) {
  return (
    <>
      {divider && <li style={{ ...kicker, padding: "var(--s-4) 0 6px", borderBottom: "1px solid var(--border)" }}>Every word, apart</li>}
      {children}
    </>
  );
}

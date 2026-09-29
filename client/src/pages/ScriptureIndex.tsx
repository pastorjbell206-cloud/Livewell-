/**
 * /scripture-index            the sixty-six books, each with how often the site discusses it
 * /scripture-index/:book      one book: every chapter the site takes up, every page that
 *                             does, and the verses it cites, with the Study Bible chapter
 *
 * The data is generated from the site's own pages by
 * scripts/build-reference-indexes.mjs (client/public/indexes/). When the whole
 * index grows past its size budget the builder splits it per book; this page
 * reads either shape.
 */
import { useEffect, useState, type CSSProperties } from "react";
import { Link, useRoute } from "wouter";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { LoadFailed } from "@/components/LoadFailed";
import { fetchJson } from "@/lib/fetch-json";

export interface IndexRef {
  title: string;
  url: string;
  kind: string;
  verses: string[];
  span?: string;
}
export interface IndexBook {
  slug: string;
  name: string;
  testament: "OT" | "NT";
  chapterCount: number;
  count: number;
  places: number;
  chaptersIndexed: number;
  chapters?: Record<string, IndexRef[]>;
}
interface ScriptureIndexData {
  split: boolean;
  books: IndexBook[];
}
interface BookFile {
  slug: string;
  name: string;
  chapters: Record<string, IndexRef[]>;
}

const isIndex = (x: unknown): x is ScriptureIndexData =>
  !!x && typeof x === "object" && Array.isArray((x as ScriptureIndexData).books);
const isBookFile = (x: unknown): x is BookFile =>
  !!x && typeof x === "object" && typeof (x as BookFile).chapters === "object" && (x as BookFile).chapters !== null;

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const card: CSSProperties = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
};
const kindLabel: CSSProperties = {
  fontFamily: "var(--U)",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: "var(--ink-muted)",
};
const quietLink: CSSProperties = {
  color: "var(--ink)",
  textDecoration: "underline",
  textDecorationColor: "var(--mustard)",
  textUnderlineOffset: "3px",
  backgroundImage: "none",
};
const h1: CSSProperties = {
  fontFamily: "var(--F)",
  fontSize: "clamp(2.3rem, 5.4vw, 3.8rem)",
  fontWeight: 400,
  letterSpacing: "-0.02em",
  lineHeight: 1.05,
  color: "var(--ink)",
  margin: "0 0 16px",
};
const h2: CSSProperties = {
  fontFamily: "var(--F)",
  fontSize: "clamp(1.6rem, 3.2vw, 2.1rem)",
  fontWeight: 400,
  letterSpacing: "-0.02em",
  color: "var(--ink)",
  margin: "0 0 var(--s-3)",
};
const lede: CSSProperties = {
  fontFamily: "var(--B)",
  fontSize: "1.08rem",
  lineHeight: 1.7,
  color: "var(--ink-muted)",
  maxWidth: "66ch",
  margin: 0,
};

/** "vv. 18–25, 28", "v. 16", "chs. 9–11", or "the chapter". */
export function versesLabel(r: IndexRef): string {
  if (r.verses.length) {
    const many = r.verses.length > 1 || r.verses[0].includes("–");
    return `${many ? "vv." : "v."} ${r.verses.join(", ")}`;
  }
  return r.span ? `chs. ${r.span}` : "the chapter";
}

const plural = (n: number, one: string, many = `${one}s`) => `${n.toLocaleString()} ${n === 1 ? one : many}`;

export default function ScriptureIndex() {
  const [, params] = useRoute("/scripture-index/:book");
  const slug = params?.book;
  const [data, setData] = useState<ScriptureIndexData | null>(null);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let stale = false;
    fetchJson("/indexes/scripture-index.json", isIndex)
      .then((d) => {
        if (!stale) setData(d);
      })
      .catch(() => {
        if (!stale) setFailed(true);
      });
    return () => {
      stale = true;
    };
  }, [nonce]);

  const retry = () => {
    setFailed(false);
    setNonce((n) => n + 1);
  };
  const book = slug && data ? data.books.find((b) => b.slug === slug) : undefined;

  return (
    <Layout>
      <SEOMeta
        title="Scripture Index: Every Passage the Site Discusses"
        description="A Scripture index to LiveWell, book by book and chapter by chapter: every essay, doctrine, study guide, and history that takes up a passage, with a link to read the chapter itself."
        url="https://www.livewellbyjamesbell.co/scripture-index"
      />
      {failed && !data ? (
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
          <LoadFailed what="The Scripture index" onRetry={retry} backHref="/study/bible" backLabel="The Study Bible" />
        </section>
      ) : !data ? (
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)", minHeight: "40vh" }}>
          <p style={{ ...wrap, fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Loading the index…</p>
        </section>
      ) : slug && !book ? (
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
          <div style={wrap}>
            <p style={{ fontFamily: "var(--B)", color: "var(--ink)" }}>That book isn't in the Bible's table of contents.</p>
            <Link href="/scripture-index" style={quietLink}>
              All sixty-six books
            </Link>
          </div>
        </section>
      ) : book ? (
        <BookView book={book} split={data.split} />
      ) : (
        <BookList books={data.books} />
      )}
    </Layout>
  );
}

// ── the sixty-six books ───────────────────────────────────────────────────

function BookList({ books }: { books: IndexBook[] }) {
  const total = books.reduce((n, b) => n + b.count, 0);
  return (
    <>
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "14px" }}>
            Reference
          </div>
          <h1 style={h1}>Scripture Index</h1>
          <p style={lede}>
            Every passage of Scripture this site takes up, book by book, the way a commentary keeps its index at the back. Choose a book to see each chapter, the essays, doctrines, study guides, and histories that discuss it, and the verses they cite. Each chapter links to the Study Bible, so you can read the passage itself before you read anyone on it.
          </p>
          <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", margin: "var(--s-3) 0 0" }}>
            {`${plural(total, "entry", "entries")} across the canon. `}
            <Link href="/scholars" style={quietLink}>
              The index of scholars and witnesses
            </Link>
          </p>
        </div>
      </section>
      {(["OT", "NT"] as const).map((t) => (
        <section key={t} style={{ background: t === "OT" ? "var(--bone-warm)" : "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
          <div style={wrap}>
            <h2 style={h2}>{t === "OT" ? "The Old Testament" : "The New Testament"}</h2>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "8px",
              }}
            >
              {books
                .filter((b) => b.testament === t)
                .map((b) => (
                  <li key={b.slug}>
                    {b.count ? (
                      <Link
                        href={`/scripture-index/${b.slug}`}
                        style={{ ...card, display: "grid", gap: "2px", height: "100%", padding: "10px 14px", color: "var(--ink)", textDecoration: "none", backgroundImage: "none" }}
                      >
                        <span style={{ fontFamily: "var(--U)", fontSize: "14.5px", fontWeight: 600 }}>{b.name}</span>
                        <span style={{ fontFamily: "var(--U)", fontSize: "12.5px", color: "var(--ink-muted)" }}>
                          {`${plural(b.places, "page")} · ${b.chaptersIndexed} of ${b.chapterCount} ch.`}
                        </span>
                      </Link>
                    ) : (
                      <div style={{ display: "grid", gap: "2px", height: "100%", padding: "10px 14px", border: "1px dashed var(--border)", borderRadius: "var(--radius-sm)" }}>
                        <span style={{ fontFamily: "var(--U)", fontSize: "14.5px", fontWeight: 600, color: "var(--ink-muted)" }}>{b.name}</span>
                        <span style={{ fontFamily: "var(--U)", fontSize: "12.5px", color: "var(--ink-muted)" }}>Not yet discussed</span>
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          </div>
        </section>
      ))}
    </>
  );
}

// ── one book ──────────────────────────────────────────────────────────────

function useBookChapters(book: IndexBook, split: boolean) {
  // Unsplit, the chapters arrived with the index; split, each book is its own file.
  const [loaded, setLoaded] = useState<{ slug: string; chapters: Record<string, IndexRef[]> } | null>(null);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);
  useEffect(() => {
    if (!split) return;
    let stale = false;
    fetchJson(`/indexes/scripture/${book.slug}.json`, isBookFile)
      .then((d) => {
        if (!stale) setLoaded({ slug: book.slug, chapters: d.chapters });
      })
      .catch(() => {
        if (!stale) setFailed(true);
      });
    return () => {
      stale = true;
    };
  }, [book.slug, split, nonce]);
  return {
    chapters: !split ? (book.chapters ?? {}) : loaded?.slug === book.slug ? loaded.chapters : null,
    failed,
    retry: () => {
      setFailed(false);
      setNonce((n) => n + 1);
    },
  };
}

function BookView({ book, split }: { book: IndexBook; split: boolean }) {
  const { chapters, failed, retry } = useBookChapters(book, split);
  const nums = chapters ? Object.keys(chapters).map(Number).sort((a, b) => a - b) : [];
  return (
    <>
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
        <div style={wrap}>
          <Link href="/scripture-index" style={{ ...quietLink, fontFamily: "var(--U)", fontSize: "14px" }}>
            Scripture Index
          </Link>
          <h1 style={{ ...h1, marginTop: "var(--s-3)" }}>{book.name}</h1>
          <p style={lede}>
            {book.count
              ? `Discussed on ${plural(book.places, "page")} across ${book.chaptersIndexed} of its ${plural(book.chapterCount, "chapter")}. Each chapter below lists every place the site takes it up, with the verses cited, and a link to read the chapter in the Study Bible.`
              : "The site does not discuss this book yet. You can still read it, with notes on every chapter, in the Study Bible."}
          </p>
          <p style={{ margin: "var(--s-3) 0 0", fontFamily: "var(--U)", fontSize: "14px" }}>
            <Link href={`/study/bible/${book.slug}`} style={quietLink}>
              {`${book.name} in the Study Bible`}
            </Link>
          </p>
          {nums.length > 1 && (
            <nav aria-label={`Chapters of ${book.name}`} style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "var(--s-4)" }}>
              {nums.map((n) => (
                <a
                  key={n}
                  href={`#ch-${n}`}
                  style={{ ...card, minWidth: "40px", padding: "6px 10px", textAlign: "center", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--ink)", textDecoration: "none", backgroundImage: "none" }}
                >
                  {n}
                </a>
              ))}
            </nav>
          )}
        </div>
      </section>
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4) var(--s-7)" }}>
        <div style={{ ...wrap, display: "grid", gap: "var(--s-5)" }}>
          {failed && !chapters ? (
            <LoadFailed what={`The index for ${book.name}`} onRetry={retry} backHref="/scripture-index" backLabel="All the books" />
          ) : !chapters ? (
            <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Loading…</p>
          ) : (
            nums.map((n) => <ChapterBlock key={n} book={book} chapter={n} refs={chapters[String(n)] ?? []} />)
          )}
        </div>
      </section>
    </>
  );
}

function ChapterBlock({ book, chapter, refs }: { book: IndexBook; chapter: number; refs: IndexRef[] }) {
  return (
    <article id={`ch-${chapter}`} style={{ scrollMarginTop: "80px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "8px 16px", borderBottom: "1px solid var(--border)", paddingBottom: "8px", marginBottom: "12px" }}>
        <h2 style={{ ...h2, fontSize: "clamp(1.4rem, 2.6vw, 1.75rem)", margin: 0 }}>{`${book.name} ${chapter}`}</h2>
        <Link href={`/study/bible/${book.slug}/${chapter}`} style={{ ...quietLink, fontFamily: "var(--U)", fontSize: "13.5px" }}>
          {`Read ${book.name} ${chapter}`}
        </Link>
      </div>
      <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "10px" }}>
        {refs.map((r) => (
          <li key={r.url} style={{ display: "grid", gap: "2px" }}>
            <span style={kindLabel}>{r.kind}</span>
            <span style={{ fontFamily: "var(--B)", fontSize: "15.5px", lineHeight: 1.5 }}>
              <Link href={r.url} style={quietLink}>
                {r.title}
              </Link>
              <span style={{ color: "var(--ink-muted)", fontSize: "14px" }}>{`  ·  ${versesLabel(r)}`}</span>
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

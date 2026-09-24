/**
 * /study/bible/doctrines       the doctrines the Study Bible's notes trace
 * /study/bible/doctrines/:id   one doctrine: what it is, every chapter whose
 *                              notes teach it, and LiveWell's writing on it
 *
 * The vocabulary is /bible/doctrines.json; the chapter lists come from the
 * notes themselves via /bible/notes-index.json.
 */
import { useMemo } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { LoadFailed } from "@/components/LoadFailed";
import { chapterHref, fetchBooks, type BibleBook } from "@/lib/bible";
import { fetchDoctrines, fetchNotesIndex, spreadKinds, type Doctrine, type NotesIndex } from "@/lib/bible-notes";
import { buildIndex, fetchCatalogue, search, type CatalogueItem } from "@/lib/catalogue";
import { Band, Credits, H2, Hero, Lede, Prose, RelatedList, Status, card, kicker, quietLink, useLoad, wrap } from "@/pages/study-bible/shared";

type Data = { doctrines: Doctrine[]; index: NotesIndex; books: BibleBook[] };
const loadAll = (): Promise<Data> =>
  Promise.all([fetchDoctrines(), fetchNotesIndex(), fetchBooks()]).then(([doctrines, index, books]) => ({ doctrines, index, books }));

export default function StudyBibleDoctrines() {
  const [, params] = useRoute("/study/bible/doctrines/:id");
  const { data, retry } = useLoad("doctrines", loadAll);
  return (
    <Layout>
      {!params && (
        <SEOMeta
          title="The Doctrines of the Bible, Traced Chapter by Chapter"
          description="What the whole Bible teaches about God, creation, sin, covenant, Christ, salvation, the Spirit, the church, and the last things, with every chapter that teaches each one."
          url="https://www.livewellbyjamesbell.co/study/bible/doctrines"
        />
      )}
      {data === null ? (
        <div style={{ padding: "var(--s-6) var(--s-4)" }}>
          <LoadFailed what="The doctrines" onRetry={retry} backHref="/study/bible" backLabel="Back to the Study Bible" />
        </div>
      ) : data === undefined ? (
        <Status>Opening the doctrines…</Status>
      ) : params ? (
        <DoctrinePage data={data} id={params.id} />
      ) : (
        <DoctrineIndex data={data} />
      )}
      <Credits />
    </Layout>
  );
}

function DoctrineIndex({ data }: { data: Data }) {
  return (
    <>
      <Hero eyebrow="The Study Bible" eyebrowHref="/study/bible" title="The Doctrines of the Bible">
        <Lede>
          A doctrine is what the whole Bible teaches on one subject, gathered from every place it speaks. Each one below opens to a short account of it and every chapter whose notes show it being taught, so you can watch it grow from Genesis to Revelation.
        </Lede>
      </Hero>
      <Band tone="warm">
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
          {data.doctrines.map((d) => {
            const n = data.index.doctrines[d.id]?.length ?? 0;
            return (
              <li key={d.id}>
                <Link href={`/study/bible/doctrines/${d.id}`} style={{ ...card, display: "grid", gap: "6px", height: "100%", padding: "var(--s-4)", textDecoration: "none", backgroundImage: "none", color: "var(--ink)" }}>
                  <span style={{ fontFamily: "var(--F)", fontSize: "1.4rem", lineHeight: 1.15 }}>{d.name}</span>
                  <span style={{ fontFamily: "var(--B)", fontSize: "14.5px", lineHeight: 1.55, color: "var(--ink-muted)" }}>{firstSentence(d.summary)}</span>
                  {n > 0 && <span style={{ ...kicker, marginTop: "4px" }}>{n} chapter{n === 1 ? "" : "s"}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </Band>
    </>
  );
}

const firstSentence = (s: string) => (s.match(/^.*?[.?](?=\s|$)/)?.[0] ?? s);

function DoctrinePage({ data, id }: { data: Data; id: string }) {
  const i = data.doctrines.findIndex((d) => d.id === id);
  const d = data.doctrines[i];
  const { data: related } = useLoad<CatalogueItem[]>(d ? `doctrine-${d.id}` : null, () =>
    fetchCatalogue().then((c) => {
      const own = d?.page ? c.items.filter((it) => it.href === `/theology/doctrine/${d.page}`) : [];
      const hits = search(buildIndex(c.items), d?.terms ?? "").results;
      return spreadKinds([...own, ...hits], 8);
    })
  );

  const byBook = useMemo(() => {
    const keys = d ? data.index.doctrines[d.id] ?? [] : [];
    const groups = new Map<string, number[]>();
    for (const k of keys) {
      const [slug, c] = k.split("/");
      groups.set(slug, [...(groups.get(slug) ?? []), +c]);
    }
    return data.books.filter((b) => groups.has(b.slug)).map((b) => ({ book: b, chapters: groups.get(b.slug)! }));
  }, [d, data.index, data.books]);

  if (!d) {
    return (
      <div style={{ ...wrap, padding: "var(--s-6) var(--s-4)" }}>
        <p style={{ fontFamily: "var(--B)" }}>That doctrine isn't in the Study Bible's list.</p>
        <Link href="/study/bible/doctrines" style={quietLink}>All the doctrines</Link>
      </div>
    );
  }
  const total = byBook.reduce((n, g) => n + g.chapters.length, 0);
  const prev = data.doctrines[i - 1];
  const next = data.doctrines[i + 1];

  return (
    <>
      <SEOMeta title={`${d.name}: What the Bible Teaches`} description={firstSentence(d.summary)} url={`https://www.livewellbyjamesbell.co/study/bible/doctrines/${d.id}`} />
      <Hero eyebrow="The Doctrines of the Bible" eyebrowHref="/study/bible/doctrines" title={d.name}>
        <Prose text={d.summary} size={18} />
        {d.page && (
          <p style={{ margin: "4px 0 0", fontFamily: "var(--U)", fontSize: "14px" }}>
            <Link href={`/theology/doctrine/${d.page}`} style={quietLink}>The full study of this doctrine, with every major view</Link>
          </p>
        )}
      </Hero>

      <Band tone="warm">
        <H2>Where the Bible teaches it</H2>
        {total === 0 ? (
          <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>The chapter notes for this doctrine are still being written.</p>
        ) : (
          <>
            <p style={{ maxWidth: "68ch", margin: "0 0 var(--s-4)", fontFamily: "var(--U)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>
              {total} chapter{total === 1 ? "" : "s"} across {byBook.length} book{byBook.length === 1 ? "" : "s"}, in Bible order. Each opens with a note on how the chapter teaches it.
            </p>
            <div style={{ display: "grid", gap: "var(--s-4)" }}>
              {byBook.map(({ book, chapters }) => (
                <section key={book.slug} aria-label={book.name}>
                  <h3 style={{ fontFamily: "var(--F)", fontSize: "1.3rem", fontWeight: 500, margin: "0 0 8px" }}>{book.name}</h3>
                  <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "6px" }}>
                    {chapters.map((c) => (
                      <li key={c}>
                        <Link href={`${chapterHref(book.slug, c)}#notes`} style={{ ...card, display: "block", padding: "8px 12px", textDecoration: "none", backgroundImage: "none", color: "var(--ink)" }}>
                          <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600 }}>{book.name} {c}</span>
                          <span style={{ display: "block", fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.4, color: "var(--ink-muted)" }}>{data.index.titles[book.slug]?.[c - 1] ?? ""}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </section>
              ))}
            </div>
          </>
        )}
      </Band>

      {related && related.length > 0 && (
        <Band>
          <H2>On LiveWell</H2>
          <RelatedList items={related} />
        </Band>
      )}

      <nav aria-label="Doctrines" style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)", borderTop: "1px solid var(--border)" }}>
        <div style={{ ...wrap, display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
          {prev ? <Link href={`/study/bible/doctrines/${prev.id}`} style={{ ...quietLink, display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--U)", fontSize: "14px", textDecoration: "none" }}><ArrowLeft size={16} aria-hidden /> {prev.name}</Link> : <span />}
          {next ? <Link href={`/study/bible/doctrines/${next.id}`} style={{ ...quietLink, display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--U)", fontSize: "14px", textDecoration: "none" }}>{next.name} <ArrowRight size={16} aria-hidden /></Link> : null}
        </div>
      </nav>
    </>
  );
}

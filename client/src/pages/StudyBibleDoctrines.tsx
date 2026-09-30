/**
 * /study/bible/doctrines       the doctrines the Study Bible traces, by locus
 * /study/bible/doctrines/:id   one doctrine: its study (the Old Testament, the
 *                              New, key texts, the church's confession, where
 *                              Christians differ), every verse whose notes
 *                              teach it, every chapter, and LiveWell's writing
 *
 * The vocabulary is /bible/doctrines.json, the studies /bible/doctrines/<id>.json,
 * the verse lists /bible/doctrine-verses/<id>.json, and the chapter lists
 * /bible/notes-index.json.
 */
import { useMemo, type ReactNode } from "react";
import { Link, useRoute } from "wouter";
import { ArrowLeft, ArrowRight } from "lucide-react";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { LoadFailed } from "@/components/LoadFailed";
import { chapterHref, fetchBooks, type BibleBook } from "@/lib/bible";
import {
  fetchDoctrineVerses,
  fetchDoctrines,
  fetchLoci,
  fetchNotesIndex,
  fetchStudy,
  refHref,
  spreadKinds,
  type Doctrine,
  type DoctrineStudy,
  type DoctrineVerse,
  type Locus,
  type NotesIndex,
} from "@/lib/bible-notes";
import { buildIndex, fetchCatalogue, search, type CatalogueItem } from "@/lib/catalogue";
import { Band, Credits, H2, H3, Hero, Lede, Prose, RelatedList, Status, card, kicker, quietLink, useLoad, wrap } from "@/pages/study-bible/shared";

type Data = { doctrines: Doctrine[]; loci: Locus[]; index: NotesIndex; books: BibleBook[] };
const loadAll = (): Promise<Data> =>
  Promise.all([fetchDoctrines(), fetchLoci(), fetchNotesIndex(), fetchBooks()]).then(([doctrines, loci, index, books]) => ({ doctrines, loci, index, books }));

export default function StudyBibleDoctrines() {
  const [, params] = useRoute("/study/bible/doctrines/:id");
  const { data, retry } = useLoad("doctrines-page", loadAll);
  return (
    <Layout>
      {!params && (
        <SEOMeta
          title="The Doctrines of the Bible, Traced Verse by Verse"
          description="What the whole Bible teaches about God, creation, sin, Christ, salvation, the Spirit, the church, and the last things: each doctrine studied through both testaments and the church's history, with every verse that teaches it."
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
          A doctrine is what the whole Bible teaches on one subject, gathered from every place it speaks. Each one below opens to a study of how it unfolds from the Old Testament to the New, how the church has confessed it, and where Christians differ, followed by every verse whose notes show it being taught.
        </Lede>
      </Hero>
      {data.loci.map((l, i) => {
        const list = data.doctrines.filter((d) => d.locus === l.id);
        if (list.length === 0) return null;
        return (
          <Band key={l.id} tone={i % 2 === 0 ? "warm" : "bone"}>
            <H2>{l.name}</H2>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
              {list.map((d) => {
                const n = data.index.doctrineVerses?.[d.id] ?? 0;
                return (
                  <li key={d.id}>
                    <Link href={`/study/bible/doctrines/${d.id}`} style={{ ...card, display: "grid", gap: "6px", height: "100%", padding: "var(--s-4)", textDecoration: "none", backgroundImage: "none", color: "var(--ink)" }}>
                      <span style={{ fontFamily: "var(--F)", fontSize: "1.4rem", lineHeight: 1.15 }}>{d.name}</span>
                      <span style={{ fontFamily: "var(--B)", fontSize: "14.5px", lineHeight: 1.55, color: "var(--ink-muted)" }}>{firstSentence(d.summary)}</span>
                      {n > 0 && <span style={{ ...kicker, marginTop: "4px" }}>{n.toLocaleString()} verse note{n === 1 ? "" : "s"}</span>}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Band>
        );
      })}
    </>
  );
}

const firstSentence = (s: string) => (s.match(/^.*?[.?](?=\s|$)/)?.[0] ?? s);

/** "genesis/1" → the book and chapter, in canonical order. */
function groupVerses(list: DoctrineVerse[], books: BibleBook[]) {
  const groups = new Map<string, DoctrineVerse[]>();
  for (const x of list) {
    const slug = x.k.split("/")[0];
    groups.set(slug, [...(groups.get(slug) ?? []), x]);
  }
  return books.filter((b) => groups.has(b.slug)).map((b) => ({ book: b, verses: groups.get(b.slug)! }));
}

function Toc({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-label="On this page" style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "var(--s-4)" }}>
      {items.map((t) => (
        <a key={t.id} href={`#${t.id}`} style={{ display: "inline-flex", alignItems: "center", minHeight: "36px", padding: "0 14px", border: "1px solid var(--border)", borderRadius: "999px", background: "var(--card)", color: "var(--ink)", textDecoration: "none", fontFamily: "var(--U)", fontSize: "13px" }}>
          {t.label}
        </a>
      ))}
    </nav>
  );
}

function Section({ id, tone, title, children }: { id: string; tone: "bone" | "warm"; title: string; children: ReactNode }) {
  return (
    <Band tone={tone} id={id}>
      <H2>{title}</H2>
      {children}
    </Band>
  );
}

function DoctrinePage({ data, id }: { data: Data; id: string }) {
  const i = data.doctrines.findIndex((d) => d.id === id);
  const d = data.doctrines[i];
  const { data: study } = useLoad<DoctrineStudy>(d ? `study-${d.id}` : null, () => fetchStudy(d!.id));
  const { data: verses } = useLoad<DoctrineVerse[]>(d && (data.index.doctrineVerses?.[d.id] ?? 0) > 0 ? `dv-${d.id}` : null, () => fetchDoctrineVerses(d!.id));
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
  const verseGroups = useMemo(() => (verses ? groupVerses(verses, data.books) : []), [verses, data.books]);

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
  const locus = data.loci.find((l) => l.id === d.locus);
  const bookName = (slug: string) => data.books.find((b) => b.slug === slug)?.name ?? slug;

  const toc = [
    ...(study
      ? [
          { id: "what", label: "What it is" },
          { id: "ot", label: "Old Testament" },
          { id: "nt", label: "New Testament" },
          { id: "texts", label: "Key texts" },
          { id: "history", label: "The church's confession" },
          { id: "differ", label: "Where Christians differ" },
        ]
      : []),
    ...(verses && verses.length ? [{ id: "verses", label: "Verse by verse" }] : []),
  ];
  let band = 0;
  const tone = (): "bone" | "warm" => (band++ % 2 === 0 ? "warm" : "bone");

  return (
    <>
      <SEOMeta title={`${d.name}: What the Bible Teaches`} description={firstSentence(d.summary)} url={`https://www.livewellbyjamesbell.co/study/bible/doctrines/${d.id}`} />
      <Hero eyebrow={locus ? `The Doctrines of the Bible · ${locus.name}` : "The Doctrines of the Bible"} eyebrowHref="/study/bible/doctrines" title={d.name}>
        <Prose text={d.summary} size={18} />
        {d.page && (
          <p style={{ margin: "4px 0 0", fontFamily: "var(--U)", fontSize: "14px" }}>
            <Link href={`/theology/doctrine/${d.page}`} style={quietLink}>The systematic study of this doctrine, with every major view</Link>
          </p>
        )}
        {toc.length > 1 && <Toc items={toc} />}
      </Hero>

      {study && (
        <>
          <Section id="what" tone={tone()} title="What it is">
            <Prose text={study.definition} />
          </Section>
          <Section id="ot" tone={tone()} title="In the Old Testament">
            <Prose text={study.ot} />
          </Section>
          <Section id="nt" tone={tone()} title="In the New Testament">
            <Prose text={study.nt} />
          </Section>
          <Section id="texts" tone={tone()} title="Key texts">
            <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gap: "10px", maxWidth: "72ch" }}>
              {study.keyTexts.map((k) => {
                const href = refHref(k.ref, data.books);
                return (
                  <li key={k.ref} style={{ ...card, padding: "12px var(--s-4)" }}>
                    <div style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 700, marginBottom: "4px" }}>{href ? <Link href={href} style={quietLink}>{k.ref}</Link> : k.ref}</div>
                    <p style={{ margin: 0, fontFamily: "var(--B)", fontSize: "15.5px", lineHeight: 1.65, color: "var(--ink)" }}>{k.why}</p>
                  </li>
                );
              })}
            </ol>
          </Section>
          <Section id="history" tone={tone()} title="How the church has confessed it">
            <Prose text={study.history} />
          </Section>
          <Section id="differ" tone={tone()} title="Where Christians differ">
            <div style={{ display: "grid", gap: "12px", maxWidth: "72ch" }}>
              {study.differ.map((x) => (
                <div key={x.view} style={{ ...card, padding: "14px var(--s-4)" }}>
                  <H3>{x.view}</H3>
                  <Prose text={x.body} size={16} />
                </div>
              ))}
            </div>
          </Section>
          <Section id="errors" tone={tone()} title="Misunderstandings the church has rejected">
            <Prose text={study.errors} />
          </Section>
          <Section id="life" tone={tone()} title="Why it matters">
            <Prose text={study.life} />
            <h3 style={{ fontFamily: "var(--F)", fontSize: "1.3rem", fontWeight: 500, margin: "var(--s-4) 0 8px" }}>For study or a group</h3>
            <ol style={{ margin: 0, paddingLeft: "1.3em", display: "grid", gap: "8px", maxWidth: "68ch" }}>
              {study.questions.map((q, n) => <li key={n} style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.65 }}>{q}</li>)}
            </ol>
          </Section>
        </>
      )}

      {verseGroups.length > 0 && (
        <Section id="verses" tone={tone()} title="Verse by verse through the Bible">
          <p style={{ maxWidth: "68ch", margin: "0 0 var(--s-4)", fontFamily: "var(--U)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>
            {verses!.length.toLocaleString()} notes across {verseGroups.length} book{verseGroups.length === 1 ? "" : "s"}, in Bible order, each on what that verse contributes. Open a book to read them.
          </p>
          <div style={{ display: "grid", gap: "6px", maxWidth: "76ch" }}>
            {verseGroups.map(({ book, verses: vs }) => (
              <details key={book.slug} className="sb-section" style={{ ...card, padding: "0 var(--s-4)" }}>
                <summary style={{ cursor: "pointer", minHeight: "48px", display: "flex", alignItems: "center", gap: "10px", fontFamily: "var(--F)", fontSize: "1.2rem", color: "var(--ink)" }}>
                  {book.name} <span style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--ink-muted)" }}>{vs.length}</span>
                </summary>
                <ol style={{ listStyle: "none", margin: 0, padding: "0 0 var(--s-3)", display: "grid", gap: "10px" }}>
                  {vs.map((x) => {
                    const [slug, c] = x.k.split("/");
                    const first = x.v.split("-")[0];
                    return (
                      <li key={`${x.k}:${x.v}`} style={{ borderTop: "1px solid var(--border)", paddingTop: "8px" }}>
                        <Link href={chapterHref(slug, +c, +first)} style={{ ...quietLink, fontFamily: "var(--U)", fontSize: "13.5px", fontWeight: 700 }}>
                          {bookName(slug)} {c}:{x.v.replace("-", "–")}
                        </Link>
                        <p style={{ margin: "4px 0 0", fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, color: "var(--ink)" }}>{x.note}</p>
                      </li>
                    );
                  })}
                </ol>
              </details>
            ))}
          </div>
        </Section>
      )}

      {total > 0 && (
        <Section id="chapters" tone={tone()} title="Chapters that teach it">
          <p style={{ maxWidth: "68ch", margin: "0 0 var(--s-4)", fontFamily: "var(--U)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)" }}>
            {total} chapter{total === 1 ? "" : "s"} across {byBook.length} book{byBook.length === 1 ? "" : "s"} whose chapter notes treat it as a main teaching, in Bible order.
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
        </Section>
      )}

      {related && related.length > 0 && (
        <Section id="livewell" tone={tone()} title="On LiveWell">
          <RelatedList items={related} />
        </Section>
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

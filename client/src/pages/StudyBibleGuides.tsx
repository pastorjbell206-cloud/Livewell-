/**
 * /study/bible/guides       the Study Bible's guides: orientation for newcomers,
 *                           how to read each kind of writing, and reference tables
 * /study/bible/guides/:id   one guide: sections of prose, tables, and passages
 *
 * Content is /bible/guides/index.json (the groups) and /bible/guides/<id>.json.
 */
import { Link, useRoute } from "wouter";

import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { LoadFailed } from "@/components/LoadFailed";
import { fetchBooks, type BibleBook } from "@/lib/bible";
import { fetchGuide, fetchGuideIndex, refHref, type Guide, type GuideIndex } from "@/lib/bible-notes";
import { Band, Credits, H2, Hero, Lede, Prose, Status, card, kicker, quietLink, useLoad, wrap } from "@/pages/study-bible/shared";

export default function StudyBibleGuides() {
  const [, params] = useRoute("/study/bible/guides/:id");
  const { data, retry } = useLoad("guides-page", () => Promise.all([fetchGuideIndex(), fetchBooks()]).then(([index, books]) => ({ index, books })));
  return (
    <Layout>
      {!params && (
        <SEOMeta
          title="Guides to Reading the Bible"
          description="Start here if you are new to the Bible: what it is, how the books were chosen, how we got the text, why translations differ, how to read each kind of writing, and reference tables for the ancient world."
          url="https://www.livewellbyjamesbell.co/study/bible/guides"
        />
      )}
      {data === null ? (
        <div style={{ padding: "var(--s-6) var(--s-4)" }}>
          <LoadFailed what="The guides" onRetry={retry} backHref="/study/bible" backLabel="Back to the Study Bible" />
        </div>
      ) : data === undefined ? (
        <Status>Opening the guides…</Status>
      ) : params ? (
        <GuidePage id={params.id} index={data.index} books={data.books} />
      ) : (
        <GuideIndexPage index={data.index} />
      )}
      <Credits />
    </Layout>
  );
}

function GuideIndexPage({ index }: { index: GuideIndex }) {
  return (
    <>
      <Hero eyebrow="The Study Bible" eyebrowHref="/study/bible" title="Guides to Reading the Bible">
        <Lede>
          The Bible is a library written over a thousand years in three languages. These guides give you what a first-year seminary course would: where the books came from, how the text reached us, how to read each kind of writing, and the facts of the ancient world the writers took for granted.
        </Lede>
      </Hero>
      {index.groups.map((g, i) => (
        <Band key={g.id} tone={i % 2 === 0 ? "warm" : "bone"}>
          <H2>{g.name}</H2>
          {g.intro && <p style={{ maxWidth: "68ch", margin: "0 0 var(--s-4)", fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink-muted)" }}>{g.intro}</p>}
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "12px" }}>
            {g.guides.map((x) => (
              <li key={x.id}>
                <Link href={`/study/bible/guides/${x.id}`} style={{ ...card, display: "grid", gap: "6px", height: "100%", padding: "var(--s-4)", textDecoration: "none", backgroundImage: "none", color: "var(--ink)" }}>
                  <span style={{ fontFamily: "var(--F)", fontSize: "1.35rem", lineHeight: 1.15 }}>{x.title}</span>
                  <span style={{ fontFamily: "var(--B)", fontSize: "14.5px", lineHeight: 1.55, color: "var(--ink-muted)" }}>{x.summary}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Band>
      ))}
    </>
  );
}

function GuidePage({ id, index, books }: { id: string; index: GuideIndex; books: BibleBook[] }) {
  const { data: guide, retry } = useLoad<Guide>(`guide-${id}`, () => fetchGuide(id));
  const group = index.groups.find((g) => g.guides.some((x) => x.id === id));
  const all = index.groups.flatMap((g) => g.guides);
  const i = all.findIndex((x) => x.id === id);
  if (guide === null) {
    return (
      <div style={{ ...wrap, padding: "var(--s-6) var(--s-4)" }}>
        <LoadFailed what="This guide" onRetry={retry} backHref="/study/bible/guides" backLabel="All the guides" />
      </div>
    );
  }
  if (guide === undefined) return <Status>Opening the guide…</Status>;
  return (
    <>
      <SEOMeta title={guide.title} description={guide.summary} url={`https://www.livewellbyjamesbell.co/study/bible/guides/${id}`} type="article" />
      <Hero eyebrow={group ? `Guides · ${group.name}` : "Guides"} eyebrowHref="/study/bible/guides" title={guide.title}>
        <Lede>{guide.summary}</Lede>
        {guide.sections.length > 3 && (
          <nav aria-label="On this page" style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "var(--s-4)" }}>
            {guide.sections.map((s, n) => (
              <a key={n} href={`#s${n}`} style={{ display: "inline-flex", alignItems: "center", minHeight: "36px", padding: "0 14px", border: "1px solid var(--border)", borderRadius: "999px", background: "var(--card)", color: "var(--ink)", textDecoration: "none", fontFamily: "var(--U)", fontSize: "13px" }}>{s.h}</a>
            ))}
          </nav>
        )}
      </Hero>
      {guide.sections.map((s, n) => (
        <Band key={n} tone={n % 2 === 0 ? "warm" : "bone"} id={`s${n}`}>
          <H2>{s.h}</H2>
          <Prose text={s.body} />
          {s.table && (
            <div style={{ overflowX: "auto", margin: "var(--s-3) 0 0" }}>
              <table style={{ borderCollapse: "collapse", minWidth: "min(100%, 560px)", fontFamily: "var(--U)", fontSize: "14px", lineHeight: 1.5, color: "var(--ink)", background: "var(--card)" }}>
                {s.table.caption && <caption style={{ ...kicker, textAlign: "left", padding: "0 0 8px" }}>{s.table.caption}</caption>}
                <thead>
                  <tr>{s.table.columns.map((c) => <th key={c} scope="col" style={{ textAlign: "left", padding: "8px 12px", borderBottom: "2px solid var(--ink)", fontWeight: 600 }}>{c}</th>)}</tr>
                </thead>
                <tbody>
                  {s.table.rows.map((r, k) => (
                    <tr key={k}>{r.map((cell, j) => <td key={j} style={{ padding: "8px 12px", borderBottom: "1px solid var(--border)", verticalAlign: "top" }}>{cell}</td>)}</tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {s.refs && s.refs.length > 0 && (
            <p style={{ margin: "var(--s-3) 0 0", fontFamily: "var(--U)", fontSize: "13.5px", lineHeight: 1.9, color: "var(--ink-muted)" }}>
              Read:{" "}
              {s.refs.map((r, k) => {
                const href = refHref(r, books);
                return (
                  <span key={r}>
                    {href ? <Link href={href} style={quietLink}>{r}</Link> : r}
                    {k < s.refs!.length - 1 ? " · " : ""}
                  </span>
                );
              })}
            </p>
          )}
        </Band>
      ))}
      <nav aria-label="Guides" style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)", borderTop: "1px solid var(--border)" }}>
        <div style={{ ...wrap, display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap", fontFamily: "var(--U)", fontSize: "14px" }}>
          {all[i - 1] ? <Link href={`/study/bible/guides/${all[i - 1].id}`} style={quietLink}>{all[i - 1].title}</Link> : <span />}
          <Link href="/study/bible/guides" style={quietLink}>All the guides</Link>
          {all[i + 1] ? <Link href={`/study/bible/guides/${all[i + 1].id}`} style={quietLink}>{all[i + 1].title}</Link> : <span />}
        </div>
      </nav>
    </>
  );
}

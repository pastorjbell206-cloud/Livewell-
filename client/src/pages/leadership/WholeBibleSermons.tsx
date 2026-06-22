/**
 * Whole-Bible Sermon Series (/leadership/bible-sermons). A Genesis-to-Revelation
 * grid: every one of the 66 books with a ready-to-preach series — the marquee
 * books fully authored (big idea, Christ connection, a preaching arc), the rest
 * with the big idea + Christ connection and an outline in progress. Plus topical
 * and seasonal series. Data: /leadership/whole-bible-sermons.json.
 */
import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SITE_URL } from "@/lib/site";

const wrap = { maxWidth: "var(--w-content)", margin: "0 auto" } as const;
const eyebrow: React.CSSProperties = {
  fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, textTransform: "uppercase",
  letterSpacing: "0.18em", color: "var(--mustard-text)",
};

interface Book { id: string; name: string; testament: "OT" | "NT"; group: string; chapters: number }
interface Sermon { n: string; text: string; title: string; idea: string; verdict: string }
interface Series { book: string; slug: string; title: string; headline: string; bigIdea: string; christConnection: string; sermons: Sermon[] }
interface Topical { id: string; title: string; slug: string; headline: string; parts: number }
interface Data { books: Book[]; series: Record<string, Series>; topical: Topical[] }

const GROUP_ORDER = ["Pentateuch", "History", "Wisdom", "Major Prophets", "Minor Prophets", "Gospels", "Pauline", "General", "Apocalyptic"];

export default function WholeBibleSermons() {
  const [data, setData] = useState<Data | null>(null);
  const [, params] = useRoute("/leadership/bible-sermons/:bookId");
  const bookId = params?.bookId;

  useEffect(() => {
    fetch("/leadership/whole-bible-sermons.json", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d && setData(d))
      .catch(() => {});
  }, []);

  if (!data) {
    return (
      <Layout>
        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)", minHeight: "50vh" }}>
          <div style={wrap}><p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>Loading the library…</p></div>
        </section>
      </Layout>
    );
  }

  // ---- Per-book detail view ----
  if (bookId) {
    const book = data.books.find((b) => b.id === bookId);
    if (!book) {
      return (
        <Layout>
          <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)", minHeight: "50vh" }}>
            <div style={wrap}>
              <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>That book wasn’t found.</p>
              <Link href="/leadership/bible-sermons" style={{ fontFamily: "var(--U)", color: "var(--mustard-text)" }}>Back to the whole-Bible library</Link>
            </div>
          </section>
        </Layout>
      );
    }
    const s = data.series[bookId];
    return (
      <Layout>
        <SEOMeta
          title={`${book.name} Sermon Series — Free Outlines & Big Idea`}
          description={s ? s.bigIdea : `A free expository sermon series through ${book.name} — the big idea, the Christ connection, and a preaching arc across all ${book.chapters} chapters.`}
          url={`${SITE_URL}/leadership/bible-sermons/${book.id}`}
          structuredData={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
            { "@type": "ListItem", position: 1, name: "Leadership", item: `${SITE_URL}/leadership` },
            { "@type": "ListItem", position: 2, name: "Sermon Series", item: `${SITE_URL}/leadership/bible-sermons` },
            { "@type": "ListItem", position: 3, name: book.name, item: `${SITE_URL}/leadership/bible-sermons/${book.id}` },
          ] }}
        />
        <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
          <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
            <Link href="/leadership/bible-sermons" style={{ ...eyebrow, color: "var(--mustard)", textDecoration: "none" }}>← Whole-Bible Library · {book.group}</Link>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 4.6vw, 50px)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", margin: "14px 0 12px" }}>
              {book.name}
            </h1>
            {s && <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontStyle: "italic", color: "rgba(245,240,230,.82)", margin: 0, maxWidth: "54ch" }}>{s.headline}</p>}
          </div>
        </section>

        <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
          <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
            <div style={eyebrow}>The big idea</div>
            <p style={{ fontFamily: "var(--F)", fontSize: "24px", lineHeight: 1.4, color: "var(--ink)", margin: "10px 0 28px" }}>
              {s ? s.bigIdea : `An expository walk through ${book.name} — ${book.chapters} chapters in the ${book.group}.`}
            </p>
            <div style={{ background: "var(--bone-warm)", borderLeft: "3px solid var(--mustard)", padding: "18px 22px", marginBottom: "var(--s-5)" }}>
              <div style={eyebrow}>The Christ connection</div>
              <p style={{ fontFamily: "var(--B)", fontSize: "17px", lineHeight: 1.7, color: "var(--ink)", margin: "8px 0 0" }}>
                {s ? s.christConnection : `How ${book.name} anticipates or proclaims Christ — every command exposing our need for the one who kept it for us.`}
              </p>
            </div>

            {s && s.sermons.length > 0 ? (
              <>
                <div style={eyebrow}>The preaching arc</div>
                <ol style={{ listStyle: "none", margin: "14px 0 0", padding: 0 }}>
                  {s.sermons.map((sermon, i) => (
                    <li key={i} style={{ padding: "18px 0", borderBottom: "1px solid var(--border)" }}>
                      <div style={{ display: "flex", gap: "16px", alignItems: "baseline" }}>
                        <span style={{ fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, color: "var(--mustard-text)", flex: "0 0 40px" }}>{String(sermon.n).padStart(2, "0")}</span>
                        <div>
                          <h3 style={{ fontFamily: "var(--F)", fontSize: "22px", fontWeight: 500, color: "var(--ink)", margin: "0 0 2px", lineHeight: 1.2 }}>{sermon.title}</h3>
                          <p style={{ fontFamily: "var(--U)", fontSize: "12px", letterSpacing: "0.06em", color: "var(--ink-muted)", margin: "0 0 8px" }}>{sermon.text}</p>
                          <p style={{ fontFamily: "var(--B)", fontSize: "15.5px", lineHeight: 1.65, color: "var(--ink)", margin: "0 0 6px" }}>{sermon.idea}</p>
                          <p style={{ fontFamily: "var(--F)", fontSize: "16px", fontStyle: "italic", color: "var(--mustard-text)", margin: 0 }}>{sermon.verdict}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </>
            ) : (
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)", fontStyle: "italic" }}>
                The full preaching arc for {book.name} is being written. The big idea and Christ connection above are ready to build from today.
              </p>
            )}
          </div>
        </section>
      </Layout>
    );
  }

  // ---- Whole-Bible grid view ----
  const byTestament = (t: "OT" | "NT") => {
    const groups = GROUP_ORDER.filter((g) => data.books.some((b) => b.testament === t && b.group === g));
    return groups.map((g) => [g, data.books.filter((b) => b.testament === t && b.group === g)] as const);
  };

  const BookCard = ({ b }: { b: Book }) => {
    const authored = Boolean(data.series[b.id]);
    return (
      <Link href={`/leadership/bible-sermons/${b.id}`} style={{ display: "block", background: "#FFFFFF", border: "1px solid var(--border)", borderTop: `2px solid ${authored ? "var(--mustard)" : "var(--border)"}`, padding: "12px 14px", textDecoration: "none" }}>
        <div style={{ fontFamily: "var(--F)", fontSize: "18px", color: "var(--ink)", lineHeight: 1.2 }}>{b.name}</div>
        <div style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.04em", color: authored ? "var(--mustard-text)" : "var(--ink-muted)", marginTop: "6px" }}>
          {authored ? "Full series" : `${b.chapters} ch · outline`}
        </div>
      </Link>
    );
  };

  return (
    <Layout>
      <SEOMeta
        title="Sermon Series for Every Book of the Bible — Free Outlines"
        description="Free, Christ-centered sermon series for all 66 books of the Bible — the big idea, the Christ connection, and a ready-to-preach arc for each, plus topical and seasonal series."
        url={`${SITE_URL}/leadership/bible-sermons`}
      />
      <section style={{ background: "var(--charcoal)", color: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-5)" }}>
        <div style={wrap}>
          <div style={{ ...eyebrow, color: "var(--mustard)" }}>Leadership Formation · For preachers</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5vw, 56px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", margin: "16px 0 16px", maxWidth: "18ch" }}>
            A sermon series for every book of the Bible
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "62ch" }}>
            All sixty-six books, Genesis to Revelation — each with the one big idea, the line that runs to Christ, and a preaching arc you can start this Sunday. The marquee books are fully written; the rest give you the spine to build on. Free, for the men who carry the weight of the pulpit.
          </p>
        </div>
      </section>

      {(["OT", "NT"] as const).map((t) => (
        <section key={t} style={{ background: t === "OT" ? "var(--bone)" : "var(--bone-warm)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
          <div style={wrap}>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", margin: "0 0 4px" }}>
              {t === "OT" ? "Old Testament" : "New Testament"}
            </h2>
            <div style={{ width: "36px", height: "2px", background: "var(--mustard)", marginBottom: "var(--s-4)" }} />
            {byTestament(t).map(([group, books]) => (
              <div key={group} style={{ marginBottom: "var(--s-4)" }}>
                <div style={{ ...eyebrow, marginBottom: "12px" }}>{group}</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "10px" }}>
                  {books.map((b) => <BookCard key={b.id} b={b} />)}
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section style={{ background: "var(--ink)", color: "var(--bone)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={wrap}>
          <div style={{ ...eyebrow, color: "var(--mustard)" }}>Beyond the books</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3vw, 32px)", fontWeight: 400, color: "var(--bone)", margin: "10px 0 var(--s-4)" }}>
            Topical &amp; seasonal series
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "var(--s-3)" }}>
            {data.topical.map((s) => (
              <div key={s.id} style={{ background: "var(--panel, #1d1b15)", border: "1px solid rgba(245,240,230,0.12)", padding: "var(--s-3)" }}>
                <div style={{ fontFamily: "var(--F)", fontSize: "20px", color: "var(--bone)", lineHeight: 1.2, marginBottom: "6px" }}>{s.title}</div>
                <div style={{ fontFamily: "var(--F)", fontSize: "15px", fontStyle: "italic", color: "rgba(245,240,230,0.7)", marginBottom: "10px" }}>{s.headline}</div>
                <div style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.06em", color: "var(--mustard)" }}>{s.parts} parts</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}

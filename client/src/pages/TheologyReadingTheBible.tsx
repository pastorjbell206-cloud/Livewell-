/**
 * How culture reads the Bible (/theology/reading-the-bible). James,
 * 2026-11-25: show "how culture interprets the Bible for them", "cultural
 * interpreters", and "how different places in different regions and
 * different times in history ... have culturally interpreted the Bible".
 *
 * Three parts, all read from data:
 *   - the eras: six history essays in order (client/public/history/essays/,
 *     titles and blurbs from essays-index.json), each opening its own page;
 *   - the interpreters: scholars who help a reader see the lens, each with
 *     the real book in which they showed it, paraphrased, never quoted;
 *   - the guides: the site's existing pages that apply this to texts.
 * Data: /theology/reading-the-bible.json. The History door lists this page
 * beside Christian traditions (lib/siteCatalog.ts).
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import InnerHead from "@/components/art/InnerHead";
import { LoadFailed } from "@/components/LoadFailed";
import { StatementBand } from "@/components/EditorialBlocks";
import { Prose } from "@/lib/prose";
import { fetchJson } from "@/lib/fetch-json";
import { Status, useLoad } from "./study-bible/shared";

export interface Interpreter {
  name: string;
  dates: string;
  work: string;
  year: string;
  saw: string;
}
export interface ReadingData {
  intro: string;
  eras: string[];
  interpreters: Interpreter[];
  guides: { href: string; title: string }[];
}
interface EssayEntry {
  slug: string;
  title: string;
  blurb: string;
  dateRange: string;
}

export const isReadingData = (d: unknown): d is ReadingData => {
  const x = d as ReadingData;
  return !!x && typeof x.intro === "string" && Array.isArray(x.eras) && Array.isArray(x.interpreters) && Array.isArray(x.guides);
};
const isEssayIndex = (d: unknown): d is { essays: EssayEntry[] } => Array.isArray((d as { essays?: unknown })?.essays);

async function load() {
  const [page, index] = await Promise.all([
    fetchJson("/theology/reading-the-bible.json", isReadingData),
    fetchJson("/history/essays-index.json", isEssayIndex),
  ]);
  const bySlug = new Map(index.essays.map((e) => [e.slug, e]));
  return { page, eras: page.eras.map((s) => bySlug.get(s)).filter((e): e is EssayEntry => !!e) };
}

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;
const h2 = { fontFamily: "var(--F)", fontSize: "var(--fs-h2)", fontWeight: 400, color: "var(--ink)", marginBottom: "var(--s-3)" } as const;

export default function TheologyReadingTheBible() {
  const { data, retry } = useLoad("reading", load);
  return (
    <Layout>
      <SEOMeta
        title="How Culture Reads the Bible: Eras, Regions and Interpreters"
        description="How Alexandria and Antioch, the medieval church, the Reformers, the Enlightenment, the American slavery debate and the churches of the global South have read the same Bible, and the scholars who help us see our own lens."
        url="https://www.livewellbyjamesbell.co/theology/reading-the-bible"
      />
      <InnerHead path="/theology/reading-the-bible" title="How culture reads the Bible" line="The same Bible, read in different centuries and places, and the scholars who help us see the lens we read through." plate="lens" />

      {data === undefined && (
        <div data-lw-loading>
          <Status>Loading…</Status>
        </div>
      )}
      {data === null && <LoadFailed what="This page" onRetry={retry} backHref="/theology/history" backLabel="Back to church history" />}

      {data && (
        <>
          <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--gutter) var(--s-4)" }}>
            <div style={{ ...wrap, maxWidth: "var(--w-prose)" }}>
              <Prose text={data.page.intro} />
            </div>
          </section>

          <section aria-labelledby="rb-eras" style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--gutter)" }}>
            <div style={wrap}>
              <p className="eyebrow">Six moments, in order</p>
              <h2 id="rb-eras" style={h2}>How the church has read the Bible</h2>
              <ol className="rb-eras" style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "12px", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))" }}>
                {data.eras.map((e, i) => (
                  <li key={e.slug}>
                    <Link href={`/theology/history/${e.slug}`} className="ed-card" style={{ display: "block", height: "100%", textDecoration: "none", padding: "var(--s-3)" }}>
                      <span className="eyebrow" style={{ display: "block", marginBottom: "6px" }}>
                        {i + 1}. {e.dateRange}
                      </span>
                      <span style={{ display: "block", fontFamily: "var(--F)", fontSize: "22px", fontWeight: 500, lineHeight: 1.25, color: "var(--ink)", marginBottom: "8px" }}>{e.title}</span>
                      <span style={{ display: "block", fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink-muted)" }}>{e.blurb}</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          <StatementBand tone="dark" eyebrow="The lens" width="34ch">
            It is far easier to see another age's lens than to see our own.
          </StatementBand>

          <section aria-labelledby="rb-interpreters" style={{ background: "var(--bone)", padding: "var(--s-5) var(--gutter)" }}>
            <div style={wrap}>
              <p className="eyebrow">Cultural interpreters</p>
              <h2 id="rb-interpreters" style={h2}>The scholars who help us see the lens</h2>
              <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.7, color: "var(--ink)", maxWidth: "68ch", marginBottom: "var(--s-4)" }}>
                Each of these writers, from a different century or continent, showed how culture shapes the way Christians hear Scripture. The book named is where they showed it; what they saw is put in our words.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "12px", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))" }}>
                {data.page.interpreters.map((p) => (
                  <li key={p.name} style={{ background: "var(--card)", border: "1px solid var(--border)", borderTop: "2px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "var(--s-3)" }}>
                    <h3 style={{ fontFamily: "var(--F)", fontSize: "21px", fontWeight: 500, color: "var(--ink)", lineHeight: 1.25 }}>{p.name}</h3>
                    {p.dates && <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", marginTop: "2px" }}>{p.dates}</p>}
                    <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.55, color: "var(--ink)", marginTop: "10px" }}>
                      <cite>{p.work}</cite> ({p.year})
                    </p>
                    <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.65, color: "var(--ink-muted)", marginTop: "8px" }}>{p.saw}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section aria-labelledby="rb-guides" style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--gutter) var(--s-6)" }}>
            <div style={wrap}>
              <p className="eyebrow">Apply it to the text</p>
              <h2 id="rb-guides" style={h2}>Guides on reading past your own culture</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "8px" }}>
                {data.page.guides.map((g) => (
                  <li key={g.href}>
                    <Link href={g.href} style={{ fontFamily: "var(--B)", fontSize: "17px", color: "var(--ink)", textDecoration: "underline", textDecorationColor: "var(--mustard)", textUnderlineOffset: "3px" }}>
                      {g.title}
                    </Link>
                  </li>
                ))}
              </ul>
              <p style={{ marginTop: "var(--s-4)", display: "flex", gap: "20px", flexWrap: "wrap" }}>
                <Link href="/theology/traditions" className="pg-action pg-action--quiet">Christian traditions</Link>
                <Link href="/theology/history" className="pg-action pg-action--quiet">Church history</Link>
              </p>
            </div>
          </section>
        </>
      )}
    </Layout>
  );
}

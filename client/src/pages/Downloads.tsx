/**
 * /downloads — every downloadable file on the site, on one shelf.
 *
 * Reads the Library catalogue (/catalogue/index.json, built on every deploy by
 * scripts/build-catalogue.mjs), so the shelf lists exactly what the Library
 * lists and neither can drift: the free Hard Issues booklets (PDF + EPUB), a
 * leader's guide and participant handout for every study, a printable for
 * every Reading Scripture in Context guide, the Find Help printables, the
 * plan booklets, Bible reading plans, worksheets, workbooks, and card sets,
 * each with its file size once the deploy has built it. The books themselves
 * are sold, so they appear last as links to their pages, never as files.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { FileText } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { LoadFailed } from "@/components/LoadFailed";
import { fetchCatalogue, formatBytes, kindRank, type Catalogue, type CatalogueFile, type CatalogueItem } from "@/lib/catalogue";
import { SendButton } from "@/components/TakeItWithYou";
import { hasWordStarts, queryWords } from "@/lib/siteSearch";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

/** Section copy for each kind that carries files; wording from the pages that own them. */
const SHELVES: Record<string, { label: string; blurb: string }> = {
  Booklet: {
    label: "The Hard Issues booklets",
    blurb: "Ten free booklets for the men who lead the church: five on eldership and five on governing the local church. Each as a PDF and an EPUB.",
  },
  "Study guide": {
    label: "Study guides and curriculum",
    blurb: "Every study ships two printables: a leader's guide with the full teaching and the reasoning behind each question, and a participant handout for the room.",
  },
  "Care page": {
    label: "Find Help printables",
    blurb: "For every care page: a one-page guide, prayer cards, Scripture cards, and a worksheet for the week, in US Letter and A4.",
  },
  "Care plan": {
    label: "Eight-week plans, as booklets",
    blurb: "Every care plan printed as a booklet, one week to a page with room to write, in US Letter and A4.",
  },
  Worksheet: {
    label: "Worksheets to print",
    blurb: "Pages for the work that happens on paper: a worry log, a weekly prayer list, a month of prayer journal pages, a rule of life, a budget, a grief journal page, a plan for the first holidays after a loss, a conversation guide for couples, and, for church leaders, a referral list and a first response for when someone says they are not safe at home.",
  },
  Workbook: {
    label: "Workbooks",
    blurb: "Longer printables for a couple or a small group to work through over several sessions, with Scripture printed in full and room for each person to write.",
  },
  "Card set": {
    label: "Cards to cut and keep",
    blurb: "Scripture to carry, one verse for each hard place, and cards for the family table, each passage in full from the Berean Standard Bible.",
  },
  "Reading plan": {
    label: "Bible reading plans",
    blurb: "From a month in the Psalms to the whole Bible in a year, each day balanced by length, to print and keep in your Bible.",
  },
  Family: {
    label: "For families",
    blurb: "The Thanksgiving, Advent, and Holy Week family devotions as printable booklets, one day to a page.",
  },
  "Context guide": {
    label: "Reading Scripture in context",
    blurb: "The historical and cultural background a passage assumes you already know. One printable per guide.",
  },
};

const idFor = (kind: string) => kind.toLowerCase().replace(/[^a-z0-9]+/g, "-");

/**
 * A card's files, one line per document: "One-page guide (Letter)" and
 * "One-page guide (A4)" become "One-page guide: Letter · A4". Files with no
 * paper size in the label (a leader's guide, a PDF and an EPUB) share a line.
 */
export function fileLines(files: CatalogueFile[]): { name: string; files: { label: string; file: CatalogueFile }[] }[] {
  const lines: { name: string; files: { label: string; file: CatalogueFile }[] }[] = [];
  for (const file of files) {
    const m = file.label.match(/^(.*\S)\s*\((Letter|A4)\)$/);
    const name = m ? m[1] : "";
    const label = m ? m[2] : file.label;
    const line = lines.find((l) => l.name === name);
    if (line) line.files.push({ label, file });
    else lines.push({ name, files: [{ label, file }] });
  }
  return lines;
}

export default function Downloads() {
  const [catalogue, setCatalogue] = useState<Catalogue | null>(null);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);
  const [query, setQuery] = useState("");

  useEffect(() => {
    let stale = false;
    fetchCatalogue()
      .then((c) => { if (!stale) setCatalogue(c); })
      .catch(() => { if (!stale) setFailed(true); });
    return () => { stale = true; };
  }, [nonce]);

  const { shelves, books } = useMemo(() => {
    const byKind = new Map<string, CatalogueItem[]>();
    const books: CatalogueItem[] = [];
    for (const it of catalogue?.items ?? []) {
      if (it.kind === "Book") books.push(it);
      if (!it.files?.length) continue;
      byKind.set(it.kind, [...(byKind.get(it.kind) ?? []), it]);
    }
    const shelves = Array.from(byKind.entries())
      .sort((a, b) => kindRank(a[0]) - kindRank(b[0]))
      .map(([kind, rows]) => ({
        id: idFor(kind),
        label: SHELVES[kind]?.label ?? kind,
        blurb: SHELVES[kind]?.blurb ?? "",
        rows: [...rows].sort((a, b) => a.title.localeCompare(b.title)),
      }));
    return { shelves, books };
  }, [catalogue]);

  // Find a printable: every word of the query in the item, its shelf, or its file names.
  const words = queryWords(query);
  const q = query.trim();
  const visible = useMemo(() => {
    const words = queryWords(q);
    return words.length
        ? shelves
            .map((s) => ({
              ...s,
              rows: s.rows.filter((r) => {
                return hasWordStarts(`${r.title} ${r.summary ?? ""} ${s.label} ${(r.files ?? []).map((f) => f.label).join(" ")}`, words);
              }),
            }))
            .filter((s) => s.rows.length)
        : shelves;
  }, [shelves, q]);
  const matchCount = visible.reduce((n, s) => n + s.rows.length, 0);

  const fileCount = shelves.reduce((n, s) => n + s.rows.reduce((m, r) => m + (r.files?.length ?? 0), 0), 0);
  const jump = [...shelves.map((s) => ({ id: s.id, label: s.label, n: s.rows.length })), ...(books.length ? [{ id: "books", label: "The books", n: books.length }] : [])];

  return (
    <Layout>
      <SEOMeta
        title="Free Downloads: Study Guides, Curriculum, and Printable PDFs"
        description="Every printable in one place, free: study guides, Find Help guides and worksheets, plan booklets, Bible reading plans, workbooks, and Scripture cards."
        url="https://www.livewellbyjamesbell.co/downloads"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ marginBottom: "14px", color: "var(--mustard)" }}>Downloads</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.5vw, 56px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "16px", maxWidth: "20ch" }}>
            Every printable, in one place
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.7, color: "rgba(245,240,230,0.8)", maxWidth: "62ch" }}>
            {fileCount > 0
              ? `${fileCount} files, free, nothing gated. Print them, hand them out, teach from them.`
              : "Study guides, Find Help printables, plan booklets, and more. Free, and nothing is gated."}
          </p>
          <label htmlFor="dl-find" style={{ display: "block", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--charcoal-fg)", margin: "var(--s-4) 0 8px" }}>
            Find a printable
          </label>
          <input
            id="dl-find"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Try: grief, marriage, Romans"
            autoComplete="off"
            style={{ width: "100%", maxWidth: "560px", minHeight: "52px", padding: "12px 16px", fontSize: "17px", fontFamily: "var(--B)", borderRadius: "var(--radius-sm)", border: "1px solid var(--charcoal-line)", background: "var(--charcoal-fg)", color: "var(--charcoal)" }}
          />
          <p style={{ fontFamily: "var(--U)", fontSize: "14px", lineHeight: 1.6, color: "var(--charcoal-fg-muted)", margin: "12px 0 0", maxWidth: "62ch" }}>
            Tap a file to open it; your phone's viewer can save or print it. In the US, choose Letter; most other countries use A4.
          </p>
        </div>
      </section>

      {jump.length > 1 && !words.length && (
        <nav aria-label="Jump to a section" style={{ background: "var(--bone-warm)", padding: "var(--s-4)", borderBottom: "1px solid var(--border)" }}>
          <div style={{ ...wrap, display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {jump.map((j) => (
              <a
                key={j.id}
                href={`#${j.id}`}
                style={{
                  fontFamily: "var(--U)", fontSize: "12.5px", fontWeight: 600,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "var(--ink)", textDecoration: "none",
                  border: "1px solid var(--border)", borderRadius: "999px",
                  padding: "8px 16px", background: "var(--card)",
                }}
              >
                {j.label} <span style={{ color: "var(--ink-muted)" }}>{j.n}</span>
              </a>
            ))}
          </div>
        </nav>
      )}

      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-7)" }}>
        <div style={wrap} id="downloads-top">
          {/* Always on the page, so a screen reader hears each new count. */}
          <p role="status" style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted)", margin: words.length > 0 && catalogue ? "0 0 var(--s-4)" : 0 }}>
            {words.length > 0 && catalogue
              ? matchCount
                ? `${matchCount} ${matchCount === 1 ? "printable matches" : "printables match"} "${query.trim()}".`
                : <>Nothing here matches "{query.trim()}". Try another word, or <Link href={`/search?q=${encodeURIComponent(query.trim())}`} style={{ color: "var(--mustard-text)", fontWeight: 600 }}>search the whole site</Link>.</>
              : null}
          </p>
          {failed && !catalogue && (
            <LoadFailed
              what="The download list"
              onRetry={() => { setFailed(false); setNonce((n) => n + 1); }}
              backHref="/studyguides"
              backLabel="Read the study guides online"
            />
          )}
          {!failed && !catalogue && (
            <p role="status" style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)" }}>Gathering the files…</p>
          )}

          {visible.map((s) => (
            <div key={s.id} id={s.id} style={{ marginBottom: "var(--s-7)", scrollMarginTop: "80px" }}>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.15, marginBottom: "8px" }}>
                {s.label}
              </h2>
              {s.blurb && (
                <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "64ch", marginBottom: "var(--s-5)" }}>
                  {s.blurb}
                </p>
              )}

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))", gap: "12px" }}>
                {s.rows.map((r) => (
                  <div key={`${r.href}|${r.title}`} style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "16px 18px" }}>
                    <div style={{ fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, color: "var(--ink)", lineHeight: 1.25, marginBottom: r.kind === "Booklet" && r.summary ? "4px" : "10px" }}>
                      {r.title}
                    </div>
                    {r.summary && r.kind === "Booklet" && (
                      <div style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.6, color: "var(--ink-muted)", marginBottom: "10px" }}>{r.summary}</div>
                    )}
                    {fileLines(r.files ?? []).map((line) => (
                      <div key={line.name || "files"} style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.4 }}>
                        {line.name && <span style={{ marginRight: "8px" }}>{line.name}:</span>}
                        {line.files.map(({ label, file }, i) => (
                          <span key={file.href}>
                            {i > 0 && <span aria-hidden style={{ margin: "0 8px" }}>·</span>}
                            {/* Opens in the browser's viewer (which can save, share, or print it) instead of forcing a download. */}
                            <a
                              href={file.href}
                              target="_blank"
                              rel="noopener"
                              aria-label={`${r.title}: ${line.name ? `${line.name}, ` : ""}${label}`}
                              style={{
                                display: "inline-flex", alignItems: "center", gap: "5px", minHeight: "44px",
                                fontSize: "14px", fontWeight: 600,
                                color: "var(--mustard-text)", textDecoration: "none",
                              }}
                            >
                              <FileText size={13} aria-hidden />
                              <span style={{ borderBottom: "1px solid var(--mustard)" }}>{label}</span>
                              {file.bytes ? <span style={{ fontWeight: 400, color: "var(--ink-muted)" }}>{formatBytes(file.bytes)}</span> : null}
                            </a>
                          </span>
                        ))}
                      </div>
                    ))}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "10px", flexWrap: "wrap", marginTop: "6px" }}>
                      {r.kind !== "Booklet" ? (
                        <Link href={r.href} style={{ display: "inline-flex", alignItems: "center", minHeight: "44px", fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)" }}>
                          {r.kind === "Worksheet" || r.kind === "Workbook" || r.kind === "Card set" ? "The page it goes with" : "Read online"}
                        </Link>
                      ) : <span />}
                      {r.files?.[0] && <SendButton title={r.title} href={r.files[0].href} summary={`${r.title}, free from LiveWell`} />}
                    </div>
                  </div>
                ))}
              </div>
              {!words.length && (
                <p style={{ marginTop: "var(--s-3)" }}>
                  <a href="#downloads-top" style={{ display: "inline-flex", alignItems: "center", minHeight: "44px", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--mustard-text)" }}>Back to the top</a>
                </p>
              )}
            </div>
          ))}

          {books.length > 0 && (
            <div id="books" style={{ scrollMarginTop: "80px" }}>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.15, marginBottom: "8px" }}>
                The books
              </h2>
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "64ch", marginBottom: "var(--s-5)" }}>
                The books James Bell wrote himself are for purchase, not download.
              </p>
              <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))", gap: "12px" }}>
                {books.map((b) => (
                  <li key={b.href}>
                    <Link href={b.href} style={{ display: "block", height: "100%", boxSizing: "border-box", background: "var(--card)", border: "1px solid var(--border)", borderLeft: "3px solid var(--mustard)", borderRadius: "var(--radius-sm)", padding: "16px 18px", textDecoration: "none" }}>
                      <div style={{ fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, color: "var(--ink)", lineHeight: 1.25 }}>{b.title}</div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

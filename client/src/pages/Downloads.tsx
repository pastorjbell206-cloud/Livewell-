/**
 * /downloads — every downloadable file on the site, on one shelf.
 *
 * Reads the Library catalogue (/catalogue/index.json, built on every deploy by
 * scripts/build-catalogue.mjs), so the shelf lists exactly what the Library
 * lists and neither can drift: the free Hard Issues booklets (PDF + EPUB), a
 * leader's guide and participant handout for every study, a printable for
 * every Reading Scripture in Context guide, each with its file size once the
 * deploy has built it. The books themselves are sold, so they appear last as
 * links to their pages, never as files.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { Download } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { LoadFailed } from "@/components/LoadFailed";
import { fetchCatalogue, formatBytes, kindRank, type Catalogue, type CatalogueItem } from "@/lib/catalogue";

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
  "Context guide": {
    label: "Reading Scripture in context",
    blurb: "The historical and cultural background a passage assumes you already know. One printable per guide.",
  },
};

const idFor = (kind: string) => kind.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function Downloads() {
  const [catalogue, setCatalogue] = useState<Catalogue | null>(null);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);

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

  const fileCount = shelves.reduce((n, s) => n + s.rows.reduce((m, r) => m + (r.files?.length ?? 0), 0), 0);
  const jump = [...shelves.map((s) => ({ id: s.id, label: s.label, n: s.rows.length })), ...(books.length ? [{ id: "books", label: "The books", n: books.length }] : [])];

  return (
    <Layout>
      <SEOMeta
        title="Free Downloads: Study Guides, Curriculum, and Printable PDFs"
        description="Every printable file in one place: leader's guides and participant handouts for each study, plus Reading Scripture in Context printables. All free."
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
              : "Study guides, booklets, and context printables. Free, and nothing is gated."}
          </p>
          <p style={{ fontFamily: "var(--U)", fontSize: "14px", marginTop: "14px" }}>
            <Link href="/explore?dl=1" style={{ color: "var(--bone)", textDecoration: "none", borderBottom: "1px solid var(--mustard)" }}>
              Search them in the Library
            </Link>
          </p>
        </div>
      </section>

      {jump.length > 1 && (
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
        <div style={wrap}>
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

          {shelves.map((s) => (
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
                      <div style={{ fontFamily: "var(--B)", fontSize: "13.5px", lineHeight: 1.5, color: "var(--ink-muted)", marginBottom: "10px" }}>{r.summary}</div>
                    )}
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 14px", alignItems: "center" }}>
                      {r.files?.map((file) => (
                        <a
                          key={file.href}
                          href={file.href}
                          download
                          style={{
                            display: "inline-flex", alignItems: "center", gap: "5px", minHeight: "32px",
                            fontFamily: "var(--U)", fontSize: "12.5px", fontWeight: 600,
                            color: "var(--mustard-text)", textDecoration: "none",
                            borderBottom: "1px solid var(--mustard)", paddingBottom: "1px",
                          }}
                        >
                          <Download size={12} aria-hidden />
                          {file.label}
                          {file.bytes ? <span style={{ fontWeight: 400, color: "var(--ink-muted)" }}>{formatBytes(file.bytes)}</span> : null}
                        </a>
                      ))}
                      {r.kind !== "Booklet" && (
                        <Link href={r.href} style={{ fontFamily: "var(--U)", fontSize: "12.5px", color: "var(--ink-muted)", textDecoration: "none" }}>
                          Read online
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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

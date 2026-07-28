/**
 * /downloads — every printable file on the site, in one place.
 *
 * The build generates roughly 167 PDFs on every deploy: a leader guide and a
 * participant handout for each study, a printable for each Reading Scripture in
 * Context guide. Before this page
 * they were reachable only from deep inside the individual guide pages, so a
 * reader looking for "the curriculum" or "the PDFs" had no way to see that any
 * of it existed.
 *
 * Built from the same manifests the PDF builder reads, so the list can never
 * drift from what actually ships. Each family fails soft: a manifest that will
 * not load simply omits its section rather than breaking the page.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { fetchJson } from "@/lib/fetch-json";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface Row {
  title: string;
  /** One or more downloadable files for this row. */
  files: { label: string; href: string }[];
  /** Where the reader can read it online instead. */
  readHref?: string;
}

interface Family {
  id: string;
  label: string;
  blurb: string;
  rows: Row[];
}

const hasSlugTitle = (x: unknown): x is { slug: string; title: string } =>
  typeof x === "object" && x !== null &&
  typeof (x as Record<string, unknown>).slug === "string" &&
  typeof (x as Record<string, unknown>).title === "string";

const isGuideIndex = (x: unknown): x is { guides: { slug: string; title: string }[] } =>
  typeof x === "object" && x !== null && Array.isArray((x as { guides?: unknown }).guides);

const isSeriesIndex = (x: unknown): x is ({ id: string; title: string }[] | { series: { id: string; title: string }[] }) =>
  Array.isArray(x) || (typeof x === "object" && x !== null && Array.isArray((x as { series?: unknown }).series));

export default function Downloads() {
  const [studies, setStudies] = useState<Row[] | null>(null);
  const [context, setContext] = useState<Row[] | null>(null);

  useEffect(() => {
    let stale = false;
    fetchJson("/studyguides/index.json", isGuideIndex)
      .then((d) => {
        if (stale) return;
        setStudies(
          d.guides.filter(hasSlugTitle).map((g) => ({
            title: g.title,
            readHref: `/studyguides/${g.slug}`,
            files: [
              { label: "Leader's guide", href: `/downloads/studyguides/${g.slug}-leader.pdf` },
              { label: "Participant handout", href: `/downloads/studyguides/${g.slug}-participant.pdf` },
            ],
          }))
        );
      })
      .catch(() => { if (!stale) setStudies([]); });

    fetchJson("/context/guides-index.json", isGuideIndex)
      .then((d) => {
        if (stale) return;
        setContext(
          d.guides.filter(hasSlugTitle).map((g) => ({
            title: g.title,
            readHref: `/resources/context/${g.slug}`,
            files: [{ label: "Printable PDF", href: `/downloads/context/${g.slug}.pdf` }],
          }))
        );
      })
      .catch(() => { if (!stale) setContext([]); });


    return () => { stale = true; };
  }, []);

  const families: Family[] = useMemo(() => {
    const out: Family[] = [];
    if (studies?.length) {
      out.push({
        id: "studies",
        label: "Study guides and curriculum",
        blurb: "Every study ships two printables: a leader's guide with the full teaching and the reasoning behind each question, and a participant handout for the room.",
        rows: studies,
      });
    }
    if (context?.length) {
      out.push({
        id: "context",
        label: "Reading Scripture in context",
        blurb: "The historical and cultural background a passage assumes you already know. One printable per guide.",
        rows: context,
      });
    }
    return out;
  }, [studies, context]);

  const loading = studies === null && context === null;
  const fileCount = families.reduce((n, f) => n + f.rows.reduce((m, r) => m + r.files.length, 0), 0);

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
              : "Study guides and context printables. Free, and nothing is gated."}
          </p>
        </div>
      </section>

      {families.length > 1 && (
        <nav aria-label="Jump to a section" style={{ background: "var(--bone-warm)", padding: "var(--s-4)", borderBottom: "1px solid var(--border)" }}>
          <div style={{ ...wrap, display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {families.map((f) => (
              <a
                key={f.id}
                href={`#${f.id}`}
                style={{
                  fontFamily: "var(--U)", fontSize: "12.5px", fontWeight: 600,
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  color: "var(--ink)", textDecoration: "none",
                  border: "1px solid var(--border)", borderRadius: "999px",
                  padding: "8px 16px", background: "var(--card)",
                }}
              >
                {f.label} <span style={{ color: "var(--ink-muted)" }}>{f.rows.length}</span>
              </a>
            ))}
          </div>
        </nav>
      )}

      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-4) var(--s-7)" }}>
        <div style={wrap}>
          {loading && (
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)" }}>Gathering the files…</p>
          )}

          {!loading && families.length === 0 && (
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)" }}>
              The download list could not be loaded just now. The study guides are still readable{" "}
              <Link href="/studyguides" style={{ color: "var(--mustard-text)", fontWeight: 600 }}>here</Link>.
            </p>
          )}

          {families.map((f) => (
            <div key={f.id} id={f.id} style={{ marginBottom: "var(--s-7)", scrollMarginTop: "80px" }}>
              <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 32px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", lineHeight: 1.15, marginBottom: "8px" }}>
                {f.label}
              </h2>
              <p style={{ fontFamily: "var(--B)", fontSize: "15px", lineHeight: 1.7, color: "var(--ink-muted)", maxWidth: "64ch", marginBottom: "var(--s-5)" }}>
                {f.blurb}
              </p>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(340px, 100%), 1fr))", gap: "12px" }}>
                {f.rows.map((r) => (
                  <div
                    key={r.title}
                    style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "16px 18px" }}
                  >
                    <div style={{ fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, color: "var(--ink)", lineHeight: 1.25, marginBottom: "10px" }}>
                      {r.title}
                    </div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", alignItems: "center" }}>
                      {r.files.map((file) => (
                        <a
                          key={file.href}
                          href={file.href}
                          download
                          style={{
                            fontFamily: "var(--U)", fontSize: "12.5px", fontWeight: 600,
                            color: "var(--mustard-text)", textDecoration: "none",
                            borderBottom: "1px solid var(--mustard)", paddingBottom: "1px",
                          }}
                        >
                          {file.label}
                        </a>
                      ))}
                      {r.readHref && (
                        <Link
                          href={r.readHref}
                          style={{ fontFamily: "var(--U)", fontSize: "12.5px", color: "var(--ink-muted)", textDecoration: "none" }}
                        >
                          Read online
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

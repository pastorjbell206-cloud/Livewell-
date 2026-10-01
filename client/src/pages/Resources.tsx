/**
 * The Resource Hub (/resources). Curated libraries on top (Reading Scripture
 * in Context is the flagship), then the database-driven downloads with search,
 * category, and format filters. Downloads are managed in /admin/resources.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { CardGrid } from "@/components/editorial/CardGrid";
import { trpc } from "@/lib/trpc";
import { useMemo, useState } from "react";
import { Download, Loader2, Search, X } from "lucide-react";
import { Link } from "wouter";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

const FORMAT_LABELS: Record<string, string> = {
  pdf: "PDF",
  docx: "Word Document",
  xlsx: "Spreadsheet",
  pptx: "Presentation",
  zip: "ZIP Archive",
};

const LIBRARIES = [
  {
    href: "/resources/context",
    eyebrow: "The signature library",
    title: "Reading Scripture in Context",
    desc: "The Ancient Near East, Second Temple Judaism, the Greco-Roman world, honor and shame, and how to read the Bible apart from American political assumptions. Sourced to real scholarship.",
    flagship: true,
  },
  {
    href: "/studyguides",
    eyebrow: "For group leaders",
    title: "Study Guides",
    desc: "Run a class on Sunday without a week of prep: a leader's guide with timing and the answer behind every question, a participant handout, a facilitator script, and free printable PDFs. The whole collection in one place.",
  },
  {
    href: "/resources/creeds",
    eyebrow: "The church's memory",
    title: "Creeds, Confessions, and Classics",
    desc: "The full texts of the creeds and confessions with plain-language notes on what the loaded phrases meant to the people who wrote them.",
  },
  {
    href: "/resources/hard-issues-series",
    eyebrow: "For elders · Free from PCN",
    title: "The Hard Issues Series",
    desc: "Five free booklets for elder teams: what elders are for, the biblical qualifications, finding and installing elders, handling disagreement, and removing an elder. Free PDF and EPUB.",
  },
  {
    href: "/family/devotions",
    eyebrow: "For the household",
    title: "Family Devotions",
    desc: "Fifty-two weekly devotions plus Advent and Holy Week, and a builder that makes a fifteen-minute devotion for your kids' ages.",
  },
  {
    href: "/tools",
    eyebrow: "Interactive",
    title: "Ministry Tools",
    desc: "The verse finder, prayer generator, assessments, and study tools. Built to be used on a Tuesday, not admired on a Sunday.",
  },
  {
    href: "/reading-paths",
    eyebrow: "Where to start",
    title: "Reading Paths",
    desc: "Guided routes through the writing and the books, ordered so each piece builds on the last.",
  },
];

/** The flagship leads the page with room of its own; the rest sit as cards. */
const FLAGSHIP = LIBRARIES.find((lib) => lib.flagship);
const SHELF = LIBRARIES.filter((lib) => !lib.flagship);

export default function Resources() {
  const resourcesQuery = trpc.resources.listPublished.useQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);

  const categories = useMemo(() => {
    const unique = new Set(resourcesQuery.data?.map((r) => r.category).filter(Boolean) || []);
    return ["all", ...Array.from(unique)] as string[];
  }, [resourcesQuery.data]);

  const formats = useMemo(() => {
    const unique = new Set(resourcesQuery.data?.map((r) => r.fileType).filter(Boolean) || []);
    return Array.from(unique) as string[];
  }, [resourcesQuery.data]);

  const filteredResources = useMemo(() => {
    if (!resourcesQuery.data) return [];
    return resourcesQuery.data.filter((resource) => {
      const matchesSearch =
        resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        resource.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory;
      const matchesFormat = selectedFormats.length === 0 || (resource.fileType && selectedFormats.includes(resource.fileType));
      return matchesSearch && matchesCategory && matchesFormat;
    });
  }, [resourcesQuery.data, searchTerm, selectedCategory, selectedFormats]);

  const toggleFormat = (format: string) => {
    setSelectedFormats((prev) =>
      prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]
    );
  };

  const hasActiveFilters = searchTerm !== "" || selectedCategory !== "all" || selectedFormats.length > 0;

  return (
    <Layout>
      <SEOMeta
        title="Resources — Study Guides, Libraries, and Ministry Tools"
        description="Free resources for disciples, pastors, and leaders: the Reading Scripture in Context library, study guides, creeds and confessions, family devotions, and downloads."
        url="https://www.livewellbyjamesbell.co/resources"
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>Resources</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(34px, 5.4vw, 58px)", fontWeight: 400, lineHeight: 1.04, letterSpacing: "-0.025em", marginBottom: "18px", maxWidth: "20ch" }}>
            Tools that have earned their place
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "62ch" }}>
            Libraries, guides, devotions, and downloads for people who want to follow Jesus with their whole mind. Everything here is free. None of it is filler.
          </p>
        </div>
      </section>

      {/* CURATED LIBRARIES. The flagship keeps its charcoal ground as the one
          lead, given room; the other libraries are cards. The page has no
          section heading above them, so every library title is an h2, level
          with "Downloads". */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
        <div style={wrap}>
          {FLAGSHIP && (
            <Link
              href={FLAGSHIP.href}
              className="ed-card ed-card--dark"
              style={{ background: "var(--charcoal)", borderTop: "2px solid var(--mustard)", padding: "clamp(28px, 4vw, 48px)", gap: "14px", marginBottom: "clamp(16px, 2vw, 24px)" }}
            >
              <span className="eyebrow" style={{ color: "var(--mustard)" }}>{FLAGSHIP.eyebrow}</span>
              <h2 className="ed-card-title" style={{ fontSize: "clamp(1.9rem, 1.3rem + 1.9vw, 2.8rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em" }}>
                {FLAGSHIP.title}
              </h2>
              <p className="ed-card-dek" style={{ fontSize: "1.0625rem", lineHeight: 1.7, maxWidth: "64ch" }}>{FLAGSHIP.desc}</p>
              <div className="ed-card-foot" style={{ justifyContent: "flex-start" }}>
                <span>Open the library</span>
                {/* .ed-arrow has no dark-card color of its own, so it would
                    fall back to --ink-muted on charcoal; keep it legible. */}
                <span className="ed-arrow" aria-hidden style={{ color: "var(--charcoal-fg)" }}>→</span>
              </div>
            </Link>
          )}
          <CardGrid
            headingAs="h2"
            label="Libraries"
            items={SHELF.map((lib) => ({ href: lib.href, title: lib.title, dek: lib.desc, kicker: lib.eyebrow }))}
          />
        </div>
      </section>

      {/* DOWNLOADS */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px, 3.4vw, 34px)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "6px" }}>Downloads</h2>
          <div style={{ width: "36px", height: "2px", background: "var(--mustard)", marginBottom: "var(--s-3)" }} />

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center", marginBottom: "var(--s-3)" }}>
            <div style={{ position: "relative", flex: "1 1 240px", maxWidth: "420px" }}>
              <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--ink-muted)" }} />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search downloads"
                aria-label="Search downloads"
                style={{ width: "100%", boxSizing: "border-box", padding: "10px 12px 10px 36px", fontFamily: "var(--U)", fontSize: "14px", background: "var(--card)", border: "1px solid rgba(20,17,12,0.15)", borderRadius: "2px", color: "var(--ink)", outline: "none" }}
              />
            </div>
            {/* The site's filter chips (.ed-chip): the pressed state inverts
                ink and bone, so it reads in both themes. Format chips keep
                their dashed edge to tell the two filter kinds apart. */}
            {categories.length > 1 && (
              <div className="ed-chips" role="group" aria-label="Filter downloads by category" style={{ margin: 0 }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className="ed-chip"
                    onClick={() => setSelectedCategory(cat)}
                    aria-pressed={selectedCategory === cat}
                  >
                    {cat === "all" ? "All" : cat}
                  </button>
                ))}
              </div>
            )}
            {formats.length > 1 && (
              <div className="ed-chips" role="group" aria-label="Filter downloads by format" style={{ margin: 0 }}>
                {formats.map((f) => (
                  <button
                    key={f}
                    type="button"
                    className="ed-chip"
                    onClick={() => toggleFormat(f)}
                    aria-pressed={selectedFormats.includes(f)}
                    style={{ borderStyle: "dashed" }}
                  >
                    {FORMAT_LABELS[f] || f.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={() => { setSearchTerm(""); setSelectedCategory("all"); setSelectedFormats([]); }}
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, padding: "8px 12px", borderRadius: "var(--radius-sm)", cursor: "pointer", border: "none", background: "transparent", color: "var(--mustard-text)" }}
              >
                <X size={14} /> Clear filters
              </button>
            )}
          </div>

          {!resourcesQuery.isLoading && resourcesQuery.data && resourcesQuery.data.length > 0 && (
            <p role="status" style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: "0 0 var(--s-2)" }}>
              {`Showing ${filteredResources.length} of ${resourcesQuery.data.length}`}
            </p>
          )}

          {resourcesQuery.isLoading ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "var(--s-4) 0", fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)" }}>
              <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> Loading downloads
            </div>
          ) : filteredResources.length === 0 ? (
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)", padding: "var(--s-3) 0" }}>
              {hasActiveFilters ? "Nothing matches those filters." : "Downloadable study guides and worksheets are on the way. The libraries above are open now."}
            </p>
          ) : (
            /* Two columns at 900px and up, one below, divided by hairlines.
               Each entry stays a plain block with its own Download link to
               the file (the row itself is not a link). The button is ink with
               bone text, the pressed-chip pairing, so it inverts correctly in
               dark mode instead of vanishing into the ground. */
            <ul className="ed-index ed-index--2" aria-label="Downloads">
              {filteredResources.map((r) => (
                <li key={r.id}>
                  <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: "10px", padding: "22px 0 24px" }}>
                    {/* Category and format share the kicker line, so the title
                        always gets the full column, even on a phone. */}
                    {(r.category || r.fileType) && (
                      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "8px 12px" }}>
                        {r.category ? <span className="ed-kicker" style={{ marginBottom: 0 }}>{r.category}</span> : <span />}
                        {r.fileType && (
                          <span style={{ fontFamily: "var(--mono)", fontSize: "12.5px", letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--ink-muted)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "2px 8px", whiteSpace: "nowrap" }}>
                            {FORMAT_LABELS[r.fileType] || r.fileType.toUpperCase()}
                          </span>
                        )}
                      </div>
                    )}
                    <h3 className="ed-title">{r.title}</h3>
                    {r.description && (
                      <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.6, color: "var(--ink-muted)", margin: 0, maxWidth: "62ch" }}>{r.description}</p>
                    )}
                    {r.url && (
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ display: "inline-flex", alignItems: "center", gap: "8px", alignSelf: "flex-start", marginTop: "4px", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--bone)", background: "var(--ink)", borderRadius: "var(--radius-sm)", padding: "10px 16px", textDecoration: "none" }}
                      >
                        <Download size={15} aria-hidden /> Download
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* CLOSING */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-5) var(--s-4)", color: "var(--charcoal-fg)", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--F)", fontSize: "17px", fontStyle: "italic", lineHeight: 1.6, color: "rgba(245,240,230,0.85)", marginBottom: "20px" }}>
            Looking for the writing itself? The essays and the books are the spine of everything here.
          </p>
          <div style={{ display: "flex", gap: "20px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/writing" style={{ fontFamily: "var(--U)", fontSize: "13.5px", fontWeight: 600, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>Read the essays</Link>
            <Link href="/books" style={{ fontFamily: "var(--U)", fontSize: "13.5px", fontWeight: 600, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>Browse the books</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

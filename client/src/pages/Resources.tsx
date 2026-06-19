/**
 * The Resource Hub (/resources). Curated libraries on top (Reading Scripture
 * in Context is the flagship), then the database-driven downloads with search,
 * category, and format filters. Downloads are managed in /admin/resources.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
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
    href: "/studyguides/christian-nationalism",
    eyebrow: "For group leaders",
    title: "Leader's Toolkits",
    desc: "Run a class on Sunday with zero prep: a leader's guide with timing and the answer behind every question, a participant handout, a facilitator script, and printable PDFs.",
  },
  {
    href: "/resources/creeds",
    eyebrow: "The church's memory",
    title: "Creeds, Confessions, and Classics",
    desc: "The full texts of the creeds and confessions with plain-language notes on what the loaded phrases meant to the people who wrote them.",
  },
  {
    href: "/discipleship",
    eyebrow: "The guided path",
    title: "The Discipleship Pathway",
    desc: "Four stages from new believer to disciple-maker, with concrete steps and a tracker that remembers where you are.",
  },
  {
    href: "/resources/hard-issues-series",
    eyebrow: "For elders · Free from PCN",
    title: "The Hard Issues Series",
    desc: "Five free booklets for elder teams: what elders are for, the biblical qualifications, finding and installing elders, handling disagreement, and removing an elder. Free PDF and EPUB.",
  },
  {
    href: "/leadership/library",
    eyebrow: "For leaders and teachers",
    title: "The Leadership Library",
    desc: "Over a hundred articles on preaching, exegesis, formation, church leadership, and pastoral care. Searchable by category.",
  },
  {
    href: "/leadership/sermon-series",
    eyebrow: "For preachers",
    title: "The Sermon Series Library",
    desc: "Complete series plans, book by book and topic by topic, with the arc of each series and every sermon's text, idea, and aim.",
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
        description="Free resources for disciples, pastors, and leaders: the Reading Scripture in Context library, leadership and sermon series libraries, family devotions, study guides, and downloads."
        url="https://www.livewellbyjamesbell.co/resources"
      />

      {/* HERO */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--bone)" }}>
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

      {/* CURATED LIBRARIES */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
        <div style={wrap}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))", gap: "var(--s-3)" }}>
            {LIBRARIES.map((lib) => (
              <Link
                key={lib.href}
                href={lib.href}
                style={{
                  display: "block",
                  textDecoration: "none",
                  padding: "var(--s-4)",
                  background: lib.flagship ? "var(--charcoal)" : "#FFFFFF",
                  border: "1px solid rgba(20,17,12,0.08)",
                  borderTop: "2px solid var(--mustard)",
                  gridColumn: lib.flagship ? "1 / -1" : undefined,
                }}
              >
                <div className="eyebrow" style={{ color: lib.flagship ? "var(--mustard)" : "var(--mustard-text)", marginBottom: "10px" }}>{lib.eyebrow}</div>
                <div style={{ fontFamily: "var(--F)", fontSize: lib.flagship ? "clamp(24px, 3.4vw, 32px)" : "21px", lineHeight: 1.2, color: lib.flagship ? "var(--bone)" : "var(--ink)", marginBottom: "10px" }}>{lib.title}</div>
                <p style={{ fontFamily: "var(--B)", fontSize: "14.5px", lineHeight: 1.65, color: lib.flagship ? "rgba(245,240,230,0.78)" : "var(--ink-muted)", maxWidth: lib.flagship ? "70ch" : undefined, margin: 0 }}>{lib.desc}</p>
              </Link>
            ))}
          </div>
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
                style={{ width: "100%", padding: "10px 12px 10px 36px", fontFamily: "var(--U)", fontSize: "14px", background: "#FFFFFF", border: "1px solid rgba(20,17,12,0.15)", borderRadius: "2px", color: "var(--ink)", outline: "none" }}
              />
            </div>
            {categories.length > 1 && (
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{ fontFamily: "var(--U)", fontSize: "12.5px", fontWeight: 600, padding: "7px 12px", borderRadius: "2px", cursor: "pointer", border: "1px solid rgba(20,17,12,0.18)", background: selectedCategory === cat ? "var(--charcoal)" : "transparent", color: selectedCategory === cat ? "var(--bone)" : "var(--ink)" }}
                  >
                    {cat === "all" ? "All" : cat}
                  </button>
                ))}
              </div>
            )}
            {formats.length > 1 && (
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {formats.map((f) => (
                  <button
                    key={f}
                    onClick={() => toggleFormat(f)}
                    style={{ fontFamily: "var(--U)", fontSize: "12.5px", fontWeight: 600, padding: "7px 12px", borderRadius: "2px", cursor: "pointer", border: "1px dashed rgba(20,17,12,0.25)", background: selectedFormats.includes(f) ? "var(--charcoal)" : "transparent", color: selectedFormats.includes(f) ? "var(--bone)" : "var(--ink-muted)" }}
                  >
                    {FORMAT_LABELS[f] || f.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
            {hasActiveFilters && (
              <button
                onClick={() => { setSearchTerm(""); setSelectedCategory("all"); setSelectedFormats([]); }}
                style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontFamily: "var(--U)", fontSize: "12.5px", fontWeight: 600, padding: "7px 12px", borderRadius: "2px", cursor: "pointer", border: "none", background: "transparent", color: "var(--mustard-text)" }}
              >
                <X size={14} /> Clear filters
              </button>
            )}
          </div>

          {resourcesQuery.isLoading ? (
            <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "var(--s-4) 0", fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)" }}>
              <Loader2 size={18} style={{ animation: "spin 1s linear infinite" }} /> Loading downloads
            </div>
          ) : filteredResources.length === 0 ? (
            <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)", padding: "var(--s-3) 0" }}>
              {hasActiveFilters ? "Nothing matches those filters." : "Downloadable study guides and worksheets are on the way. The libraries above are open now."}
            </p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "var(--s-3)" }}>
              {filteredResources.map((r) => (
                <div key={r.id} style={{ background: "#FFFFFF", border: "1px solid rgba(20,17,12,0.08)", padding: "var(--s-3)", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "10px" }}>
                    <div style={{ fontFamily: "var(--F)", fontSize: "18px", lineHeight: 1.3, color: "var(--ink)" }}>{r.title}</div>
                    {r.fileType && (
                      <span style={{ fontFamily: "var(--M, monospace)", fontSize: "10.5px", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--ink-muted)", border: "1px solid rgba(20,17,12,0.15)", padding: "2px 6px", whiteSpace: "nowrap" }}>
                        {FORMAT_LABELS[r.fileType] || r.fileType.toUpperCase()}
                      </span>
                    )}
                  </div>
                  {r.description && <p style={{ fontFamily: "var(--B)", fontSize: "13.5px", lineHeight: 1.6, color: "var(--ink-muted)", margin: 0, flex: 1 }}>{r.description}</p>}
                  {r.category && <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard-text)" }}>{r.category}</div>}
                  {r.url && (
                    <a
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, color: "var(--bone)", background: "var(--charcoal)", padding: "9px 14px", textDecoration: "none", alignSelf: "flex-start" }}
                    >
                      <Download size={14} /> Download
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CLOSING */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-5) var(--s-4)", color: "var(--bone)", textAlign: "center" }}>
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

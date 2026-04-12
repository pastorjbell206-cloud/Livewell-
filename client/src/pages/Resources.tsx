import { SEOMeta } from "@/components/SEOMeta";
import { trpc } from "@/lib/trpc";
import { useMemo, useState } from "react";
import { Download, Loader2, BookOpen, Search, X, ChevronDown } from "lucide-react";
import { Link } from "wouter";

const FORMAT_LABELS: Record<string, string> = {
  "pdf": "PDF",
  "docx": "Word Document",
  "xlsx": "Spreadsheet",
  "pptx": "Presentation",
  "zip": "ZIP Archive",
};

export default function Resources() {
  const resourcesQuery = trpc.resources.listPublished.useQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = useMemo(() => {
    const unique = new Set(resourcesQuery.data?.map((r) => r.category).filter(Boolean) || []);
    return [
      { label: "All", value: "all" },
      ...Array.from(unique).map((cat) => ({
        label: cat as string,
        value: cat as string,
      })),
    ];
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

  const clearAllFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedFormats([]);
  };

  const hasActiveFilters = selectedCategory !== "all" || selectedFormats.length > 0;

  if (resourcesQuery.isLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--paper)" }}>
        <Loader2 size={32} style={{ color: "var(--gold)", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  return (
    <>
      <SEOMeta
        title="Resources"
        description="Tools, guides, and materials for Christian leaders, pastors, and individuals. Discussion guides, sermon frameworks, and pastoral resources."
        keywords="resources, guides, tools, Christian leadership, pastoral resources"
      />
      <div>
        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero__inner" style={{ gridTemplateColumns: "1fr" }}>
            <div>
              <div className="kicker">
                <div className="kicker-line"></div>
                <div className="kicker-txt">TOOLS & RESOURCES</div>
              </div>
              <h1 className="hero-h">
                Tools that have <strong>earned their place</strong>
              </h1>
              <p className="hero-sub">
                Discussion guides, sermon frameworks, pastoral tools, and practical materials for individuals, pastors, and leaders.
              </p>
            </div>
          </div>
        </section>

        {/* SEARCH & FILTERS SECTION */}
        <section style={{ background: "var(--paper)", padding: "40px 0", borderBottom: "1px solid var(--border)" }}>
          <div className="wrap">
            {/* Search Bar */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ position: "relative" }}>
                <Search
                  size={20}
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--ink3)"
                  }}
                />
                <input
                  type="text"
                  placeholder="Search resources by title or topic..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    width: "100%",
                    paddingLeft: "40px",
                    paddingRight: "16px",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    border: "1px solid var(--border)",
                    background: "white",
                    color: "var(--ink)",
                    fontSize: "15px",
                    outline: "none",
                    transition: "border-color 0.2s"
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--gold)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
                />
              </div>
            </div>

            {/* Filter Toggle & Results */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
              <button
                onClick={() => setShowFilters(!showFilters)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "14px",
                  color: "var(--ink)",
                  padding: "0"
                }}
              >
                <ChevronDown
                  size={18}
                  style={{
                    transition: "transform 0.25s",
                    transform: showFilters ? "rotate(180deg)" : "rotate(0deg)"
                  }}
                />
                Filters {hasActiveFilters && `(${(selectedCategory !== "all" ? 1 : 0) + selectedFormats.length})`}
              </button>
              <p style={{ fontSize: "14px", color: "var(--ink3)" }}>
                {filteredResources.length} {filteredResources.length === 1 ? "resource" : "resources"}
              </p>
            </div>

            {/* Filters */}
            {showFilters && (
              <div style={{ paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
                {/* Category Filter */}
                {categories.length > 0 && (
                  <div style={{ marginBottom: "24px" }}>
                    <h3 style={{
                      fontWeight: "600",
                      color: "var(--ink)",
                      marginBottom: "12px",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em"
                    }}>
                      By Category
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {categories.map((cat) => (
                        <button
                          key={cat.value}
                          onClick={() => setSelectedCategory(cat.value)}
                          style={{
                            padding: "6px 12px",
                            fontSize: "12px",
                            fontWeight: "600",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            border: "1px solid var(--border)",
                            background: selectedCategory === cat.value ? "var(--ink)" : "white",
                            color: selectedCategory === cat.value ? "white" : "var(--ink)",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            borderRadius: "2px"
                          }}
                          onMouseEnter={(e) => {
                            if (selectedCategory !== cat.value) {
                              e.currentTarget.style.background = "var(--cream)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedCategory !== cat.value) {
                              e.currentTarget.style.background = "white";
                            }
                          }}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* File Type Filter */}
                {formats.length > 0 && (
                  <div style={{ marginBottom: "24px" }}>
                    <h3 style={{
                      fontWeight: "600",
                      color: "var(--ink)",
                      marginBottom: "12px",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em"
                    }}>
                      By File Type
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {formats.map((format) => (
                        <button
                          key={format}
                          onClick={() => toggleFormat(format)}
                          style={{
                            padding: "6px 12px",
                            fontSize: "12px",
                            fontWeight: "600",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            border: "1px solid var(--border)",
                            background: selectedFormats.includes(format) ? "var(--ink)" : "white",
                            color: selectedFormats.includes(format) ? "white" : "var(--ink)",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            borderRadius: "2px"
                          }}
                          onMouseEnter={(e) => {
                            if (!selectedFormats.includes(format)) {
                              e.currentTarget.style.background = "var(--cream)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!selectedFormats.includes(format)) {
                              e.currentTarget.style.background = "white";
                            }
                          }}
                        >
                          {FORMAT_LABELS[format] || format}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button
                    onClick={clearAllFilters}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: "var(--gold)",
                      fontWeight: "600",
                      fontSize: "14px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: "0"
                    }}
                  >
                    <X size={16} />
                    Clear All Filters
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* RESOURCES GRID */}
        <section className="section">
          <div className="wrap">
            {filteredResources.length > 0 ? (
              <div className="grid grid-3">
                {filteredResources.map((resource: any) => (
                  <a
                    key={resource.id}
                    href={resource.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card">
                      <div className="card-body">
                        {/* Category */}
                        {resource.category && (
                          <div className="card-cat">{resource.category}</div>
                        )}

                        {/* Title */}
                        <h3 className="card-title">{resource.title}</h3>

                        {/* Description */}
                        {resource.description && (
                          <p className="card-desc">{resource.description}</p>
                        )}

                        {/* File Type & Download */}
                        <div className="card-meta" style={{ paddingTop: "12px", borderTop: "1px solid var(--border)" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <Download size={14} />
                            <span>{FORMAT_LABELS[resource.fileType] || resource.fileType}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", paddingTop: "60px", paddingBottom: "60px" }}>
                <p style={{ fontSize: "17px", color: "var(--ink3)", marginBottom: "24px" }}>
                  No resources match your filters.
                </p>
                <button
                  onClick={clearAllFilters}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "var(--gold)",
                    fontWeight: "600",
                    fontSize: "14px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "0"
                  }}
                >
                  <X size={16} />
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* CTA SECTION */}
        <section className="section" style={{ background: "var(--cream)" }}>
          <div className="wrap" style={{ textAlign: "center" }}>
            <h2 className="section-title">Looking for more?</h2>
            <p className="section-sub" style={{ margin: "0 auto 32px" }}>
              Browse our complete collection of articles, books, and learning paths.
            </p>
            <div className="hero-ctas">
              <Link href="/writing">
                <button className="btn-gold">Explore Articles</button>
              </Link>
              <Link href="/reading-paths">
                <button className="btn-ghost">Browse Reading Paths</button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

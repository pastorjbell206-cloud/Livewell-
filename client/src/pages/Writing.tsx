import { trpc } from "@/lib/trpc";
import { SEOMeta } from "@/components/SEOMeta";
import { useState, useMemo } from "react";
import { Clock, Search, X, ChevronDown, ArrowRight } from "lucide-react";
import { Link } from "wouter";

const TOPIC_COLORS: Record<string, string> = {
  "theology": "#2D4A3E",
  "justice": "#8B4545",
  "pastoral-ministry": "#6B8E6F",
  "marriage": "#B8963E",
  "parenting": "#9B8BA8",
  "finances": "#6B9B8B",
  "devotionals": "#8B9B6F",
};

const FORMAT_LABELS: Record<string, string> = {
  "article": "Article",
  "book-chapter": "Book Chapter",
  "study-guide": "Study Guide",
  "sermon-series": "Sermon Series",
  "devotional": "Devotional",
  "podcast": "Podcast",
};

const AUDIENCE_LABELS: Record<string, string> = {
  "pastors": "For Pastors",
  "leaders": "For Leaders",
  "families": "For Families",
  "couples": "For Couples",
  "seekers": "For Seekers",
  "small-groups": "For Small Groups",
  "everyone": "For Everyone",
};

const DIFFICULTY_LABELS: Record<string, string> = {
  "beginner": "Beginner",
  "intermediate": "Intermediate",
  "advanced": "Advanced",
};

export default function Writing() {
  const postsQuery = trpc.posts.listPublished.useQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedAudiences, setSelectedAudiences] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Get unique values from data
  const topics = useMemo(() => {
    const unique = new Set(postsQuery.data?.map((p) => p.topic).filter(Boolean) || []);
    return Array.from(unique) as string[];
  }, [postsQuery.data]);

  const formats = useMemo(() => {
    const unique = new Set(postsQuery.data?.map((p) => p.format).filter(Boolean) || []);
    return Array.from(unique) as string[];
  }, [postsQuery.data]);

  const audiences = useMemo(() => {
    const unique = new Set(postsQuery.data?.map((p) => p.audience).filter(Boolean) || []);
    return Array.from(unique) as string[];
  }, [postsQuery.data]);

  const difficulties = useMemo(() => {
    const unique = new Set(postsQuery.data?.map((p) => p.difficulty).filter(Boolean) || []);
    return Array.from(unique) as string[];
  }, [postsQuery.data]);

  const filteredPosts = useMemo(() => {
    if (!postsQuery.data) return [];
    return postsQuery.data.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTopic = selectedTopics.length === 0 || (post.topic && selectedTopics.includes(post.topic));
      const matchesFormat = selectedFormats.length === 0 || (post.format && selectedFormats.includes(post.format));
      const matchesAudience = selectedAudiences.length === 0 || (post.audience && selectedAudiences.includes(post.audience));
      const matchesDifficulty = selectedDifficulty.length === 0 || (post.difficulty && selectedDifficulty.includes(post.difficulty));
      return matchesSearch && matchesTopic && matchesFormat && matchesAudience && matchesDifficulty;
    });
  }, [postsQuery.data, searchTerm, selectedTopics, selectedFormats, selectedAudiences, selectedDifficulty]);

  const hasActiveFilters = selectedTopics.length > 0 || selectedFormats.length > 0 || selectedAudiences.length > 0 || selectedDifficulty.length > 0;

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  };

  const toggleFormat = (format: string) => {
    setSelectedFormats((prev) =>
      prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]
    );
  };

  const toggleAudience = (audience: string) => {
    setSelectedAudiences((prev) =>
      prev.includes(audience) ? prev.filter((a) => a !== audience) : [...prev, audience]
    );
  };

  const toggleDifficulty = (difficulty: string) => {
    setSelectedDifficulty((prev) =>
      prev.includes(difficulty) ? prev.filter((d) => d !== difficulty) : [...prev, difficulty]
    );
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedTopics([]);
    setSelectedFormats([]);
    setSelectedAudiences([]);
    setSelectedDifficulty([]);
  };

  return (
    <>
      <SEOMeta
        title="Writing"
        description="Essays and articles on faith, theology, culture, and Christian living by James Bell"
        keywords="essays, articles, theology, faith, Christian life, culture"
      />
      <div>
        {/* HERO SECTION */}
        <section className="hero">
          <div className="hero__inner" style={{ gridTemplateColumns: "1fr" }}>
            <div>
              <div className="kicker">
                <div className="kicker-line"></div>
                <div className="kicker-txt">ESSAYS & ARTICLES</div>
              </div>
              <h1 className="hero-h">
                Writing by James Bell
              </h1>
              <p className="hero-sub">
                {filteredPosts.length}+ essays exploring theology, justice, pastoral ministry, marriage, parenting, finances, and the Christian life. Find articles by topic, format, and audience.
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
                  placeholder="Search articles..."
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
                Filters
              </button>
              <p style={{ fontSize: "14px", color: "var(--ink3)" }}>
                {filteredPosts.length} {filteredPosts.length === 1 ? "article" : "articles"}
              </p>
            </div>

            {/* Filters */}
            {showFilters && (
              <div style={{ paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
                {/* Topics */}
                {topics.length > 0 && (
                  <div style={{ marginBottom: "24px" }}>
                    <h3 style={{
                      fontWeight: "600",
                      color: "var(--ink)",
                      marginBottom: "12px",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em"
                    }}>
                      By Topic
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {topics.map((topic) => (
                        <button
                          key={topic}
                          onClick={() => toggleTopic(topic)}
                          style={{
                            padding: "6px 12px",
                            fontSize: "12px",
                            fontWeight: "600",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            border: "1px solid var(--border)",
                            background: selectedTopics.includes(topic) ? "var(--ink)" : "white",
                            color: selectedTopics.includes(topic) ? "white" : "var(--ink)",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            borderRadius: "2px"
                          }}
                          onMouseEnter={(e) => {
                            if (!selectedTopics.includes(topic)) {
                              e.currentTarget.style.background = "var(--cream)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!selectedTopics.includes(topic)) {
                              e.currentTarget.style.background = "white";
                            }
                          }}
                        >
                          {topic.replace(/-/g, " ")}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Formats */}
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
                      By Format
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

                {/* Audiences */}
                {audiences.length > 0 && (
                  <div style={{ marginBottom: "24px" }}>
                    <h3 style={{
                      fontWeight: "600",
                      color: "var(--ink)",
                      marginBottom: "12px",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em"
                    }}>
                      For Whom
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {audiences.map((audience) => (
                        <button
                          key={audience}
                          onClick={() => toggleAudience(audience)}
                          style={{
                            padding: "6px 12px",
                            fontSize: "12px",
                            fontWeight: "600",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            border: "1px solid var(--border)",
                            background: selectedAudiences.includes(audience) ? "var(--ink)" : "white",
                            color: selectedAudiences.includes(audience) ? "white" : "var(--ink)",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            borderRadius: "2px"
                          }}
                          onMouseEnter={(e) => {
                            if (!selectedAudiences.includes(audience)) {
                              e.currentTarget.style.background = "var(--cream)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!selectedAudiences.includes(audience)) {
                              e.currentTarget.style.background = "white";
                            }
                          }}
                        >
                          {AUDIENCE_LABELS[audience] || audience}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Difficulty */}
                {difficulties.length > 0 && (
                  <div style={{ marginBottom: "24px" }}>
                    <h3 style={{
                      fontWeight: "600",
                      color: "var(--ink)",
                      marginBottom: "12px",
                      fontSize: "12px",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em"
                    }}>
                      Difficulty
                    </h3>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                      {difficulties.map((difficulty) => (
                        <button
                          key={difficulty}
                          onClick={() => toggleDifficulty(difficulty)}
                          style={{
                            padding: "6px 12px",
                            fontSize: "12px",
                            fontWeight: "600",
                            textTransform: "uppercase",
                            letterSpacing: "0.05em",
                            border: "1px solid var(--border)",
                            background: selectedDifficulty.includes(difficulty) ? "var(--ink)" : "white",
                            color: selectedDifficulty.includes(difficulty) ? "white" : "var(--ink)",
                            cursor: "pointer",
                            transition: "all 0.2s",
                            borderRadius: "2px"
                          }}
                          onMouseEnter={(e) => {
                            if (!selectedDifficulty.includes(difficulty)) {
                              e.currentTarget.style.background = "var(--cream)";
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (!selectedDifficulty.includes(difficulty)) {
                              e.currentTarget.style.background = "white";
                            }
                          }}
                        >
                          {DIFFICULTY_LABELS[difficulty] || difficulty}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
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

        {/* ARTICLES GRID */}
        <section className="section">
          <div className="wrap">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-3">
                {filteredPosts.map((post: any) => (
                  <Link key={post.id} href={`/writing/${post.slug}`}>
                    <div className="card">
                      {/* Article Card */}
                      <div
                        className="card-body"
                        style={{
                          borderLeft: `4px solid ${TOPIC_COLORS[post.topic] || "var(--gold)"}`,
                          display: "flex",
                          flexDirection: "column",
                          height: "100%"
                        }}
                      >
                        {/* Topic Badge */}
                        {post.topic && (
                          <div
                            className="card-cat"
                            style={{
                              background: TOPIC_COLORS[post.topic] || "var(--gold)",
                              color: "white",
                              display: "inline-block",
                              marginBottom: "12px"
                            }}
                          >
                            {post.topic.replace(/-/g, " ")}
                          </div>
                        )}

                        {/* Title */}
                        <h3 className="card-title" style={{ flex: "1" }}>
                          {post.title}
                        </h3>

                        {/* Excerpt */}
                        <p className="card-desc" style={{ flex: "1" }}>
                          {post.excerpt || post.body.substring(0, 150)}...
                        </p>

                        {/* Meta */}
                        <div className="card-meta" style={{ paddingTop: "12px", borderTop: "1px solid var(--border)" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                            <Clock size={14} />
                            <span>{post.readingTimeMinutes || 5} min</span>
                          </div>
                          {post.difficulty && (
                            <span style={{ fontSize: "11px", textTransform: "uppercase", fontWeight: "600", letterSpacing: "0.05em" }}>
                              {DIFFICULTY_LABELS[post.difficulty] || post.difficulty}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", paddingTop: "60px", paddingBottom: "60px" }}>
                <p style={{ fontSize: "17px", color: "var(--ink3)", marginBottom: "24px" }}>
                  No articles match your filters.
                </p>
                <button
                  onClick={clearFilters}
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
                  Clear Filters
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

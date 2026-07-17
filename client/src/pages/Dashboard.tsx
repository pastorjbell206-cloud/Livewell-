import { useState, useMemo } from "react";
import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useFormationTracker } from "@/hooks/useFormationTracker";

/* ── Reading paths (mirrored from ReadingPaths.tsx for progress tracking) ── */

interface PathArticle {
  title: string;
  slug: string;
}

interface ReadingPath {
  slug: string;
  title: string;
  articles: PathArticle[];
}

const READING_PATHS: ReadingPath[] = [
  {
    slug: "marriage-drifting",
    title: "When Your Marriage Is Drifting",
    articles: [
      { title: "Your Marriage Is a Ministry Too", slug: "your-marriage-is-ministry-too" },
      { title: "Protecting Your Marriage When Ministry Demands Everything", slug: "protecting-marriage-ministry-demands" },
      { title: "What Your Spouse Wishes You Knew About Life in the Parsonage", slug: "spouse-wishes-knew-parsonage" },
      { title: "How to Be Present at Home When Your Mind Never Leaves the Church", slug: "present-at-home-mind-never-leaves" },
      { title: "Conflict Is Not Failure", slug: "conflict-is-not-failure" },
      { title: "The Examined Life", slug: "the-examined-life" },
    ],
  },
  {
    slug: "faith-crisis",
    title: "Faith in Crisis — A Path Through Doubt",
    articles: [
      { title: "The Monster in the Mirror", slug: "the-monster-in-the-mirror" },
      { title: "You Are Not the Exception", slug: "you-are-not-the-exception" },
      { title: "Truth in a Post-Truth World", slug: "truth-in-post-truth-world" },
      { title: "The Holy Spirit Is Not a Feeling", slug: "holy-spirit-not-feeling" },
      { title: "The Incarnation Changes Everything", slug: "incarnation-changes-everything" },
      { title: "The Hope of Resurrection", slug: "hope-of-resurrection" },
    ],
  },
  {
    slug: "pastor-nobody-sees",
    title: "The Pastor Nobody Sees",
    articles: [
      { title: "Why Pastors Quit (And How to Stay)", slug: "why-pastors-quit-and-how-to-stay" },
      { title: "The Slow Burn: How Ministry Exhaustion Sneaks Up on You", slug: "slow-burn-ministry-exhaustion" },
      { title: "The Hidden Pain of the Successful Pastor", slug: "hidden-pain-successful-pastor" },
      { title: "The Danger of Pastoral Isolation", slug: "danger-pastoral-isolation" },
      { title: "It’s Okay to See a Counselor", slug: "okay-to-see-counselor" },
    ],
  },
  {
    slug: "raising-children",
    title: "Raising Children Who Think Theologically",
    articles: [
      { title: "The Pastor’s Kids Are Watching — What Are They Seeing?", slug: "pastors-kids-watching-what-seeing" },
      { title: "The Kingdom of God Is Not What You Think It Is", slug: "kingdom-of-god-not-what-you-think" },
      { title: "The Psalms as Prayer — Not Just Poetry", slug: "psalms-as-prayer-not-poetry" },
      { title: "Eschatology Matters — Why the End Shapes How We Live Now", slug: "eschatology-matters-end-shapes-now" },
      { title: "Sabbath Is Resistance", slug: "sabbath-is-resistance" },
    ],
  },
  {
    slug: "justice-kingdom",
    title: "Justice and the Kingdom — Where Faith Meets the World",
    articles: [
      { title: "Where the Church Was Silent", slug: "where-church-was-silent" },
      { title: "Justice Is Not a Political Category: It Is a Theological One", slug: "justice-not-political-theological" },
      { title: "Complicity Is Not Innocence", slug: "complicity-not-innocence" },
      { title: "Mishpat and Tsedaqah", slug: "mishpat-tsedaqah" },
      { title: "The Prophetic Pastor", slug: "prophetic-pastor" },
    ],
  },
];

/* ── Suggested tools / articles for the "Suggested Next" section ── */

const SUGGESTED_TOOLS = [
  { slug: "deep-bible", title: "Deep Bible Study Companion", href: "/tools/deep-bible" },
  { slug: "theology-quiz", title: "Theology Quiz", href: "/tools/theology-quiz" },
  { slug: "life-audit", title: "Life Audit", href: "/tools/life-audit" },
  { slug: "rule-of-life", title: "Rule of Life Builder", href: "/tools/rule-of-life" },
];

const SUGGESTED_ARTICLES = [
  { slug: "the-examined-life", title: "The Examined Life", href: "/writing/the-examined-life" },
  { slug: "the-monster-in-the-mirror", title: "The Monster in the Mirror", href: "/writing/the-monster-in-the-mirror" },
  { slug: "incarnation-changes-everything", title: "The Incarnation Changes Everything", href: "/writing/incarnation-changes-everything" },
];

/* ── Helpers ── */

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  return "Good evening";
}

function relativeTime(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

/* ── Component ── */

export default function Dashboard() {
  const {
    data,
    stats,
    addNote,
    removeNote,
  } = useFormationTracker();

  const [noteText, setNoteText] = useState("");
  const [noteSlug, setNoteSlug] = useState("");

  /* ── Computed data ── */

  // Reading path progress
  const pathProgress = useMemo(() => {
    const readSlugs = new Set(data.articlesRead.map((a) => a.slug));
    return READING_PATHS.map((path) => {
      const read = path.articles.filter((a) => readSlugs.has(a.slug)).length;
      const total = path.articles.length;
      const started = data.pathsStarted.some((p) => p.slug === path.slug);
      const completed = data.pathsCompleted.some((p) => p.slug === path.slug);
      const nextUnread = path.articles.find((a) => !readSlugs.has(a.slug));
      return { ...path, read, total, started, completed, nextUnread };
    });
  }, [data]);

  const startedPaths = pathProgress.filter((p) => p.started);
  const unstartedPaths = pathProgress.filter((p) => !p.started);

  // Recent activity timeline (last 10)
  const timeline = useMemo(() => {
    type TimelineEntry = { type: string; title: string; slug: string; at: string; href: string };
    const entries: TimelineEntry[] = [];
    for (const a of data.articlesRead)
      entries.push({ type: "Article", title: a.title, slug: a.slug, at: a.readAt, href: `/writing/${a.slug}` });
    for (const t of data.toolsUsed)
      entries.push({ type: "Tool", title: t.title, slug: t.slug, at: t.usedAt, href: `/tools/${t.slug}` });
    for (const b of data.bibleBooks)
      entries.push({ type: "Bible Book", title: b.name, slug: b.name, at: b.studiedAt, href: `/tools/deep-bible` });
    for (const p of data.pathsStarted)
      entries.push({ type: "Path Started", title: p.title, slug: p.slug, at: p.startedAt, href: `/reading-paths` });
    for (const p of data.pathsCompleted)
      entries.push({ type: "Path Completed", title: p.title, slug: p.slug, at: p.completedAt, href: `/reading-paths` });
    entries.sort((a, b) => (a.at > b.at ? -1 : 1));
    return entries.slice(0, 10);
  }, [data]);

  // Suggestions
  const suggestions = useMemo(() => {
    const items: { title: string; description: string; href: string }[] = [];
    const readSlugs = new Set(data.articlesRead.map((a) => a.slug));
    const usedToolSlugs = new Set(data.toolsUsed.map((t) => t.slug));

    // If no activity, suggest Start Here
    if (
      data.articlesRead.length === 0 &&
      data.toolsUsed.length === 0 &&
      data.pathsStarted.length === 0
    ) {
      items.push({
        title: "Start Here Diagnostic",
        description:
          "Not sure where to begin? This diagnostic helps you find the right starting point based on what you are carrying.",
        href: "/start-here",
      });
    }

    // Suggest unstarted paths
    for (const p of unstartedPaths) {
      if (items.length >= 3) break;
      items.push({
        title: p.title,
        description: `A reading path with ${p.total} essays. Begin where the weight is heaviest.`,
        href: "/reading-paths",
      });
    }

    // Suggest tools not yet used
    for (const tool of SUGGESTED_TOOLS) {
      if (items.length >= 4) break;
      if (!usedToolSlugs.has(tool.slug)) {
        items.push({
          title: tool.title,
          description: "A tool to deepen your study and self-examination.",
          href: tool.href,
        });
      }
    }

    // Suggest articles not yet read
    for (const article of SUGGESTED_ARTICLES) {
      if (items.length >= 5) break;
      if (!readSlugs.has(article.slug)) {
        items.push({
          title: article.title,
          description: "An essay worth sitting with.",
          href: article.href,
        });
      }
    }

    return items;
  }, [data, unstartedPaths]);

  /* ── Styles ── */

  const eyebrow: React.CSSProperties = {
    fontFamily: "var(--U)",
    fontSize: "0.75rem",
    fontWeight: 500,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    // AA-passing on the light sections; the dark hero overrides to var(--mustard).
    color: "var(--mustard-text)",
    marginBottom: "1rem",
  };

  const sectionHeading: React.CSSProperties = {
    fontFamily: "var(--F)",
    fontSize: "clamp(1.5rem, 3.5vw, 2rem)",
    fontWeight: 400,
    color: "var(--ink)",
    letterSpacing: "-0.01em",
    marginBottom: "2rem",
  };

  const cardStyle: React.CSSProperties = {
    background: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: "2px",
    padding: "1.5rem",
  };

  const handleAddNote = () => {
    const trimmed = noteText.trim();
    if (!trimmed) return;
    addNote(trimmed, noteSlug || "general");
    setNoteText("");
    setNoteSlug("");
  };

  return (
    <Layout>
      <SEOMeta
        title="Your Formation — LiveWell by James Bell"
        description="Track your reading, tools, and growth across LiveWell. A personal dashboard for your theological formation."
        keywords="dashboard, formation tracker, reading progress, theology"
      />

      {/* ── SECTION 1: Hero ── */}
      <section
        style={{
          background: "var(--charcoal)",
          padding: "4.5rem 1.5rem 3.5rem",
        }}
      >
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ ...eyebrow, color: "var(--mustard)" }}>YOUR FORMATION</div>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(2rem, 5vw, 3rem)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--charcoal-fg)",
              marginBottom: "0.5rem",
            }}
          >
            {getGreeting()}
          </h1>
          <p
            style={{
              fontFamily: "var(--U)",
              fontSize: "0.95rem",
              color: "var(--charcoal-fg)",
              opacity: 0.5,
              marginBottom: "2.5rem",
              lineHeight: 1.7,
            }}
          >
            {stats.lastActive
              ? `Last active ${relativeTime(stats.lastActive)}`
              : "Your reading begins here. Everything you engage with is tracked in this room."}
          </p>

          {/* Stats row */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
              gap: "1rem",
            }}
          >
            {[
              { n: stats.totalArticles, label: "Articles Read" },
              { n: stats.totalTools, label: "Tools Used" },
              { n: stats.totalBooks, label: "Books Studied" },
              { n: stats.pathsCompleted, label: "Paths Completed" },
              { n: stats.streak, label: "Day Streak", accent: true },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "2px",
                  padding: "1.25rem 1rem",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--F)",
                    fontSize: "2rem",
                    fontWeight: 600,
                    color: s.accent ? "var(--mustard)" : "var(--charcoal-fg)",
                    lineHeight: 1,
                    marginBottom: "0.35rem",
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    fontFamily: "var(--U)",
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 2: Reading Paths ── */}
      <section style={{ background: "var(--bone)", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={eyebrow}>READING PATHS</div>
          <h2 style={sectionHeading}>Your progress</h2>

          {startedPaths.length === 0 && (
            <div
              style={{
                ...cardStyle,
                textAlign: "center",
                padding: "3rem 1.5rem",
                marginBottom: "2rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "0.95rem",
                  color: "var(--ink-muted)",
                  lineHeight: 1.7,
                  marginBottom: "1.5rem",
                }}
              >
                You have not started any reading paths yet. Each path is a
                curated sequence of essays built for a specific season.
              </p>
              <Link
                href="/reading-paths"
                style={{
                  display: "inline-block",
                  padding: "0.75rem 1.5rem",
                  background: "var(--charcoal)",
                  color: "var(--charcoal-fg)",
                  fontFamily: "var(--U)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  borderRadius: "2px",
                  textDecoration: "none",
                }}
              >
                Browse reading paths
              </Link>
            </div>
          )}

          {startedPaths.map((path) => {
            const pct = path.total > 0 ? (path.read / path.total) * 100 : 0;
            return (
              <div key={path.slug} style={{ ...cardStyle, marginBottom: "1rem" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    marginBottom: "0.75rem",
                    flexWrap: "wrap",
                    gap: "0.5rem",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--F)",
                      fontSize: "1.15rem",
                      fontWeight: 400,
                      color: "var(--ink)",
                      margin: 0,
                    }}
                  >
                    {path.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--U)",
                      fontSize: "0.75rem",
                      color: "var(--ink-muted)",
                    }}
                  >
                    {path.read} of {path.total} read
                  </span>
                </div>

                {/* Progress bar */}
                <div
                  style={{
                    width: "100%",
                    height: "4px",
                    background: "var(--bone-warm)",
                    borderRadius: "2px",
                    overflow: "hidden",
                    marginBottom: "1rem",
                  }}
                >
                  <div
                    style={{
                      width: `${pct}%`,
                      height: "100%",
                      background: path.completed
                        ? "var(--ok)"
                        : "var(--mustard)",
                      borderRadius: "2px",
                      transition: "width 0.4s var(--ease)",
                    }}
                  />
                </div>

                {path.completed ? (
                  <span
                    style={{
                      fontFamily: "var(--U)",
                      fontSize: "0.8rem",
                      color: "var(--ok)",
                      fontWeight: 500,
                    }}
                  >
                    Completed
                  </span>
                ) : path.nextUnread ? (
                  <Link
                    href={`/writing/${path.nextUnread.slug}`}
                    style={{
                      fontFamily: "var(--U)",
                      fontSize: "0.8rem",
                      color: "var(--ink)",
                      borderBottom: "1px solid var(--mustard)",
                      textDecoration: "none",
                    }}
                  >
                    Continue reading: {path.nextUnread.title}
                  </Link>
                ) : null}
              </div>
            );
          })}

          {/* Suggested paths not started */}
          {unstartedPaths.length > 0 && (
            <>
              <h3
                style={{
                  fontFamily: "var(--F)",
                  fontSize: "1.15rem",
                  fontWeight: 400,
                  color: "var(--ink)",
                  marginTop: "2.5rem",
                  marginBottom: "1rem",
                }}
              >
                Paths to explore
              </h3>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "1rem",
                }}
              >
                {unstartedPaths.map((path) => (
                  <Link
                    key={path.slug}
                    href="/reading-paths"
                    style={{
                      ...cardStyle,
                      textDecoration: "none",
                      display: "block",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                  >
                    <h4
                      style={{
                        fontFamily: "var(--F)",
                        fontSize: "1.05rem",
                        fontWeight: 400,
                        color: "var(--ink)",
                        margin: "0 0 0.5rem 0",
                        lineHeight: 1.3,
                      }}
                    >
                      {path.title}
                    </h4>
                    <span
                      style={{
                        fontFamily: "var(--U)",
                        fontSize: "0.75rem",
                        color: "var(--ink-muted)",
                      }}
                    >
                      {path.total} essays
                    </span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── SECTION 3: Recent Activity ── */}
      <section style={{ background: "var(--bone-warm)", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={eyebrow}>RECENT ACTIVITY</div>
          <h2 style={sectionHeading}>What you have been reading</h2>

          {timeline.length === 0 ? (
            <div
              style={{
                ...cardStyle,
                textAlign: "center",
                padding: "3rem 1.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "0.95rem",
                  color: "var(--ink-muted)",
                  lineHeight: 1.7,
                }}
              >
                No activity yet. Read an essay, use a tool, or start a reading
                path, and your history will appear here.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
              {timeline.map((entry, i) => (
                <Link
                  key={`${entry.slug}-${entry.at}-${i}`}
                  href={entry.href}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "1rem",
                    padding: "1rem 0",
                    borderBottom: "1px solid var(--border)",
                    textDecoration: "none",
                    transition: "opacity 0.2s",
                  }}
                >
                  {/* Type badge */}
                  <span
                    style={{
                      fontFamily: "var(--U)",
                      fontSize: "0.6rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "var(--mustard-text)",
                      background: "rgba(212,160,23,0.08)",
                      padding: "0.2rem 0.5rem",
                      borderRadius: "2px",
                      whiteSpace: "nowrap",
                      marginTop: "0.15rem",
                      flexShrink: 0,
                    }}
                  >
                    {entry.type}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--F)",
                      fontSize: "1rem",
                      color: "var(--ink)",
                      flex: 1,
                      lineHeight: 1.4,
                    }}
                  >
                    {entry.title}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--U)",
                      fontSize: "0.7rem",
                      color: "var(--ink-muted)",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                      marginTop: "0.15rem",
                    }}
                  >
                    {relativeTime(entry.at)}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── SECTION 4: Your Notes ── */}
      <section style={{ background: "var(--bone)", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={eyebrow}>YOUR NOTES</div>
          <h2 style={sectionHeading}>Things worth remembering</h2>

          {/* Add note form */}
          <div style={{ ...cardStyle, marginBottom: "1.5rem" }}>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Write a note — a thought from your reading, a question you are sitting with, a conviction that will not let you go."
              rows={3}
              style={{
                width: "100%",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                padding: "0.75rem",
                fontFamily: "var(--B)",
                fontSize: "0.9rem",
                lineHeight: 1.7,
                color: "var(--ink)",
                background: "var(--bone)",
                resize: "vertical",
                outline: "none",
                boxSizing: "border-box",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--mustard)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                marginTop: "0.75rem",
                flexWrap: "wrap",
              }}
            >
              <input
                type="text"
                value={noteSlug}
                onChange={(e) => setNoteSlug(e.target.value)}
                placeholder="Article slug (optional)"
                style={{
                  flex: 1,
                  minWidth: "180px",
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  padding: "0.5rem 0.75rem",
                  fontFamily: "var(--U)",
                  fontSize: "0.8rem",
                  color: "var(--ink)",
                  background: "var(--bone)",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "var(--mustard)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              />
              <button
                onClick={handleAddNote}
                disabled={!noteText.trim()}
                style={{
                  padding: "0.55rem 1.5rem",
                  background: noteText.trim()
                    ? "var(--charcoal)"
                    : "var(--bone-muted)",
                  color: noteText.trim()
                    ? "var(--bone)"
                    : "var(--ink-muted)",
                  fontFamily: "var(--U)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  borderRadius: "2px",
                  border: "none",
                  cursor: noteText.trim() ? "pointer" : "default",
                  transition: "background 0.2s",
                }}
              >
                Save note
              </button>
            </div>
          </div>

          {/* Existing notes */}
          {data.savedNotes.length === 0 ? (
            <p
              style={{
                fontFamily: "var(--U)",
                fontSize: "0.85rem",
                color: "var(--ink-muted)",
                lineHeight: 1.7,
                textAlign: "center",
                padding: "2rem 0",
              }}
            >
              No notes yet. The best reading leaves something behind.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {[...data.savedNotes].reverse().map((note) => (
                <div key={note.id} style={cardStyle}>
                  <p
                    style={{
                      fontFamily: "var(--B)",
                      fontSize: "0.9rem",
                      color: "var(--ink)",
                      lineHeight: 1.7,
                      margin: "0 0 0.75rem 0",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {note.text}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "0.5rem",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--U)",
                        fontSize: "0.7rem",
                        color: "var(--ink-muted)",
                      }}
                    >
                      {note.articleSlug !== "general" ? (
                        <Link
                          href={`/writing/${note.articleSlug}`}
                          style={{
                            color: "var(--ink-muted)",
                            borderBottom: "1px solid var(--mustard)",
                            textDecoration: "none",
                          }}
                        >
                          {note.articleSlug}
                        </Link>
                      ) : (
                        "General"
                      )}
                      {" · "}
                      {relativeTime(note.createdAt)}
                    </span>
                    <button
                      onClick={() => removeNote(note.id)}
                      style={{
                        fontFamily: "var(--U)",
                        fontSize: "0.7rem",
                        color: "var(--alert)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: "0.2rem 0.4rem",
                        transition: "opacity 0.2s",
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── SECTION 5: Suggested Next ── */}
      <section style={{ background: "var(--bone-warm)", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={eyebrow}>SUGGESTED NEXT</div>
          <h2 style={sectionHeading}>Where to go from here</h2>

          {suggestions.length === 0 ? (
            <div
              style={{
                ...cardStyle,
                textAlign: "center",
                padding: "3rem 1.5rem",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "0.95rem",
                  color: "var(--ink-muted)",
                  lineHeight: 1.7,
                }}
              >
                You have engaged with everything we would suggest. Keep reading.
                The work is never done.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                gap: "1rem",
              }}
            >
              {suggestions.map((s) => (
                <Link
                  key={s.href + s.title}
                  href={s.href}
                  style={{
                    ...cardStyle,
                    textDecoration: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.5rem",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--F)",
                      fontSize: "1.1rem",
                      fontWeight: 400,
                      color: "var(--ink)",
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--U)",
                      fontSize: "0.8rem",
                      color: "var(--ink-muted)",
                      lineHeight: 1.6,
                      margin: 0,
                    }}
                  >
                    {s.description}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

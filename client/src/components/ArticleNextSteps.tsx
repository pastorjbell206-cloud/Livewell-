/**
 * ArticleNextSteps — contextual next-actions panel rendered at the bottom of
 * every article. Three sections:
 *
 *   1. Related Tool — a CTA to the most relevant interactive tool based on
 *      the article's pillar/topic.
 *   2. Read Next — the next article in the reading path (or same-pillar
 *      recommendations when the article is not on a path).
 *   3. Start a Path — surfaces the most relevant reading path so a single
 *      article can become an entry point to sustained engagement.
 *
 * All styles are inline, referencing CSS variables from index.css.
 */

import { useMemo } from "react";
import { Link } from "wouter";
import { READING_PATHS } from "@/data/reading-paths-post-christian";
import { pillarForPost, PILLARS_V2 } from "@/lib/taxonomy";
import { trpc } from "@/lib/trpc";

// ─── Tool mapping ────────────────────────────────────────────────────

interface ToolRec {
  name: string;
  description: string;
  href: string;
}

const TOOL_MAP: Record<string, ToolRec> = {
  "deep-bible": {
    name: "Deep Bible Companion",
    description:
      "Ask a question, get a serious answer — with context, scholarship, and the full weight of the text.",
    href: "/tools/deep-bible",
  },
  "theology-quiz": {
    name: "Theology Quiz",
    description:
      "Discover where you land on the theological map — and why it matters.",
    href: "/tools/theology-quiz",
  },
  "marriage-assessment": {
    name: "Marriage Assessment",
    description:
      "A serious diagnostic for the covenant relationship — not tips, but an honest read of where you are.",
    href: "/tools/marriage-assessment",
  },
  "life-audit": {
    name: "Life Audit",
    description:
      "A structured look at the life you are actually living versus the one you say you want.",
    href: "/tools/life-audit",
  },
  "parenting-guide": {
    name: "Parenting Guide",
    description:
      "Biblical wisdom for the long work of forming people inside a household.",
    href: "/tools/parenting-guide",
  },
  "start-here": {
    name: "Start Here",
    description:
      "Not sure where to begin? This diagnostic finds the right entry point for you.",
    href: "/start",
  },
  "bible-on-topic": {
    name: "What Does the Bible Say?",
    description:
      "Find what Scripture actually says about a topic — with context, not proof-texts.",
    href: "/tools/bible-on",
  },
  "church-health": {
    name: "Church Health Diagnostic",
    description:
      "An honest look at the institution you serve — its strengths, blind spots, and structural risks.",
    href: "/tools/church-health",
  },
};

/** Keywords in slugs that map to specific tools. Order matters: first match wins. */
const SLUG_TOOL_RULES: Array<{ keywords: string[]; toolKey: string }> = [
  { keywords: ["deconstruction", "leaving", "exvangelical", "nones", "reconstructing"], toolKey: "start-here" },
  { keywords: ["marriage", "interfaith-marriage", "covenant"], toolKey: "marriage-assessment" },
  { keywords: ["parenting", "raising-kids", "family"], toolKey: "parenting-guide" },
  { keywords: ["burnout"], toolKey: "emotional-health" },
  { keywords: ["leadership", "megachurch", "church-health", "toxic-masculinity"], toolKey: "church-health" },
  { keywords: ["suffering", "doubt", "bible", "genesis", "miracles", "scripture", "god-real", "historical-jesus"], toolKey: "deep-bible" },
  { keywords: ["denomination", "calvinism", "arminianism", "liturgical", "creeds", "charismatic", "schism", "reformation"], toolKey: "theology-quiz" },
  { keywords: ["politics", "culture-war", "purity", "prosperity", "race", "colonialism", "abuse"], toolKey: "bible-on-topic" },
];

/** Pillar-based fallback when no slug keyword matches. */
const PILLAR_TOOL_FALLBACK: Record<string, string> = {
  "capture-by-the-right": "bible-on-topic",
  "capture-by-the-left": "bible-on-topic",
  "reading-scripture-past-our-politics": "deep-bible",
  "after-christendom-pillar": "theology-quiz",
  "the-pastoral-angle": "emotional-health",
  "living-well-after-christendom": "life-audit",
};

function getToolForArticle(slug: string, pillarSlug: string | undefined): ToolRec {
  // 1. Check slug keywords
  for (const rule of SLUG_TOOL_RULES) {
    if (rule.keywords.some((kw) => slug.includes(kw))) {
      return TOOL_MAP[rule.toolKey];
    }
  }
  // 2. Pillar fallback
  if (pillarSlug && PILLAR_TOOL_FALLBACK[pillarSlug]) {
    return TOOL_MAP[PILLAR_TOOL_FALLBACK[pillarSlug]];
  }
  // 3. Default
  return TOOL_MAP["deep-bible"];
}

// ─── Reading path helpers ────────────────────────────────────────────

interface PathPosition {
  pathTitle: string;
  pathSlug: string;
  totalArticles: number;
  currentIndex: number;
  next: { title: string; slug: string } | null;
}

function findPathPositions(articleSlug: string): PathPosition[] {
  const results: PathPosition[] = [];
  for (const path of READING_PATHS) {
    const idx = path.articles.findIndex((a) => a.slug === articleSlug);
    if (idx === -1) continue;
    const nextArticle =
      idx < path.articles.length - 1 ? path.articles[idx + 1] : null;
    results.push({
      pathTitle: path.title,
      pathSlug: path.slug,
      totalArticles: path.articles.length,
      currentIndex: idx,
      next: nextArticle ? { title: nextArticle.title, slug: nextArticle.slug } : null,
    });
  }
  return results;
}

/** Find the best reading path to suggest based on pillar. */
function suggestPath(pillarSlug: string | undefined): typeof READING_PATHS[number] | null {
  const pillarPathMap: Record<string, string> = {
    "capture-by-the-right": "church-reckoning",
    "capture-by-the-left": "faith-in-secular-world",
    "reading-scripture-past-our-politics": "know-your-tradition",
    "after-christendom-pillar": "story-of-christianity",
    "the-pastoral-angle": "when-the-church-hurts",
    "living-well-after-christendom": "faith-in-secular-world",
  };
  const targetSlug = pillarSlug ? pillarPathMap[pillarSlug] : undefined;
  if (targetSlug) {
    return READING_PATHS.find((p) => p.slug === targetSlug) ?? READING_PATHS[0];
  }
  // Default to The Skeptic's Path
  return READING_PATHS.find((p) => p.slug === "skeptics-path") ?? READING_PATHS[0];
}

// ─── Styles ──────────────────────────────────────────────────────────

const sectionStyle: React.CSSProperties = {
  maxWidth: "var(--w-prose)",
  margin: "0 auto",
  padding: "var(--s-6) var(--s-4)",
};

const eyebrowStyle: React.CSSProperties = {
  fontFamily: "var(--U)",
  fontSize: "11px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.18em",
  color: "var(--mustard-text)",
  marginBottom: "20px",
};

const cardStyle: React.CSSProperties = {
  background: "var(--bone)",
  border: "1px solid var(--border)",
  borderLeft: "3px solid var(--mustard)",
  borderRadius: "var(--radius-sm)",
  padding: "24px 28px",
};

const headingStyle: React.CSSProperties = {
  fontFamily: "var(--F)",
  fontSize: "22px",
  fontWeight: 500,
  color: "var(--ink)",
  lineHeight: 1.25,
  letterSpacing: "-0.01em",
  marginBottom: "8px",
};

const bodyTextStyle: React.CSSProperties = {
  fontFamily: "var(--B)",
  fontSize: "15px",
  lineHeight: 1.7,
  color: "var(--ink-muted)",
  marginBottom: "16px",
};

const ctaButtonStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  background: "var(--charcoal)",
  color: "var(--charcoal-fg)",
  fontFamily: "var(--U)",
  fontSize: "13px",
  fontWeight: 600,
  letterSpacing: "0.04em",
  padding: "12px 24px",
  borderRadius: "var(--radius-sm)",
  border: "none",
  borderBottom: "2px solid var(--mustard)",
  textDecoration: "none",
  cursor: "pointer",
  transition: "background 0.2s",
};

const subtleLinkStyle: React.CSSProperties = {
  fontFamily: "var(--U)",
  fontSize: "13px",
  fontWeight: 600,
  color: "var(--ink)",
  textDecoration: "none",
  borderBottom: "1px solid var(--mustard)",
  transition: "color 0.2s",
};

// ─── Component ───────────────────────────────────────────────────────

interface ArticleNextStepsProps {
  articleSlug: string;
  articlePillar: string;
}

export default function ArticleNextSteps({
  articleSlug,
  articlePillar,
}: ArticleNextStepsProps) {
  const pillar = pillarForPost({ slug: articleSlug, pillar: articlePillar });
  const pillarSlug = pillar?.slug;

  const tool = useMemo(
    () => getToolForArticle(articleSlug, pillarSlug),
    [articleSlug, pillarSlug]
  );

  const pathPositions = useMemo(() => findPathPositions(articleSlug), [articleSlug]);
  const isOnPath = pathPositions.length > 0;

  const suggestedPath = useMemo(
    () => (isOnPath ? null : suggestPath(pillarSlug)),
    [isOnPath, pillarSlug]
  );

  // For same-pillar recommendations when not on a path
  const indexQuery = trpc.posts.listForIndex.useQuery();
  const samePillarArticles = useMemo(() => {
    if (isOnPath || !pillar) return [];
    return (indexQuery.data ?? [])
      .filter(
        (p) =>
          p.slug !== articleSlug &&
          pillarForPost(p)?.id === pillar.id
      )
      .slice(0, 3);
  }, [indexQuery.data, articleSlug, pillar, isOnPath]);

  return (
    <section
      style={{
        background: "var(--bone-warm)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={sectionStyle}>
        {/* ── Section 1: Related Tool ── */}
        <div style={{ marginBottom: "var(--s-5)" }}>
          <div style={eyebrowStyle}>Related Tool</div>
          <div style={cardStyle}>
            <h3 style={headingStyle}>{tool.name}</h3>
            <p style={bodyTextStyle}>{tool.description}</p>
            <Link href={tool.href} style={ctaButtonStyle}>
              Open Tool
              <span aria-hidden style={{ fontSize: "14px" }}>
                &rarr;
              </span>
            </Link>
          </div>
        </div>

        {/* ── Section 2: Read Next ── */}
        <div style={{ marginBottom: "var(--s-5)" }}>
          <div style={eyebrowStyle}>Read Next</div>
          {isOnPath ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              {pathPositions.map((pos) => (
                <div key={pos.pathSlug} style={cardStyle}>
                  <div
                    style={{
                      fontFamily: "var(--U)",
                      fontSize: "12px",
                      color: "var(--ink-muted)",
                      marginBottom: "12px",
                    }}
                  >
                    You are on{" "}
                    <Link
                      href={`/reading-paths#${pos.pathSlug}`}
                      style={{
                        color: "var(--ink)",
                        fontWeight: 600,
                        borderBottom: "1px solid var(--mustard)",
                        textDecoration: "none",
                      }}
                    >
                      {pos.pathTitle}
                    </Link>{" "}
                    &mdash; article {pos.currentIndex + 1} of{" "}
                    {pos.totalArticles}
                  </div>
                  {pos.next ? (
                    <div>
                      <div
                        style={{
                          fontFamily: "var(--U)",
                          fontSize: "11px",
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.14em",
                          color: "var(--mustard-text)",
                          marginBottom: "6px",
                        }}
                      >
                        Next
                      </div>
                      <Link
                        href={`/writing/${pos.next.slug}`}
                        style={{
                          ...headingStyle,
                          display: "block",
                          textDecoration: "none",
                          marginBottom: 0,
                        }}
                      >
                        {pos.next.title}
                      </Link>
                    </div>
                  ) : (
                    <p
                      style={{
                        fontFamily: "var(--B)",
                        fontSize: "15px",
                        lineHeight: 1.7,
                        color: "var(--ink-muted)",
                        fontStyle: "italic",
                        margin: 0,
                      }}
                    >
                      You have finished this path. The weight of it stays with
                      you.
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : samePillarArticles.length > 0 ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {samePillarArticles.map((article) => (
                <Link
                  key={article.slug}
                  href={`/writing/${article.slug}`}
                  style={{
                    ...cardStyle,
                    display: "block",
                    textDecoration: "none",
                    transition: "border-color 0.2s",
                  }}
                >
                  {pillar && (
                    <div
                      style={{
                        fontFamily: "var(--U)",
                        fontSize: "10px",
                        fontWeight: 600,
                        color: "var(--mustard-text)",
                        textTransform: "uppercase",
                        letterSpacing: "0.18em",
                        marginBottom: "8px",
                      }}
                    >
                      {pillar.short}
                    </div>
                  )}
                  <h3
                    style={{
                      ...headingStyle,
                      marginBottom: 0,
                    }}
                  >
                    {article.title}
                  </h3>
                </Link>
              ))}
            </div>
          ) : (
            <p
              style={{
                fontFamily: "var(--B)",
                fontSize: "15px",
                color: "var(--ink-muted)",
                lineHeight: 1.7,
              }}
            >
              More essays in this pillar are coming.
            </p>
          )}
        </div>

        {/* ── Section 3: Start a Path (only if not already on one) ── */}
        {!isOnPath && suggestedPath && (
          <div>
            <div style={eyebrowStyle}>Start a Path</div>
            <div
              style={{
                ...cardStyle,
                background: "var(--card)",
                borderLeft: "3px solid var(--mustard)",
              }}
            >
              <h3 style={headingStyle}>{suggestedPath.title}</h3>
              <p
                style={{
                  fontFamily: "var(--B)",
                  fontSize: "14px",
                  lineHeight: 1.7,
                  color: "var(--ink-muted)",
                  marginBottom: "4px",
                }}
              >
                A {suggestedPath.articles.length}-article guided reading
                sequence.
              </p>
              <p
                style={{
                  fontFamily: "var(--U)",
                  fontSize: "12px",
                  color: "var(--ink-muted)",
                  marginBottom: "16px",
                }}
              >
                {suggestedPath.estimatedTime}
              </p>
              <Link
                href={`/reading-paths#${suggestedPath.slug}`}
                style={subtleLinkStyle}
              >
                Start from the beginning &rarr;
              </Link>
            </div>
          </div>
        )}

        {/* If on a path, suggest exploring other paths */}
        {isOnPath && (
          <div>
            <div style={eyebrowStyle}>Explore More Paths</div>
            <Link
              href="/reading-paths"
              style={subtleLinkStyle}
            >
              See all {READING_PATHS.length} reading paths &rarr;
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

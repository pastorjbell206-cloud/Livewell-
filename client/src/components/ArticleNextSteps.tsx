/**
 * ArticleNextSteps — the end-of-essay panel, deliberately holding at most one
 * prominent ask.
 *
 * A reader who has just finished three thousand words is at peak intent, and
 * the old panel spent that intent on nine asks stacked above the book, the
 * related essays, and the newsletter: an "Argue it yourself" card, a Related
 * Tool card, a Read Next list, "Start a Path", "Explore More Paths". Four of
 * them said the same thing in four voices. Nine asks is no ask.
 *
 * The lead is now chosen by where the reader actually is:
 *
 *   - Mid reading path — the next essay in that path, alone, as the one earned
 *     next step. The book demotes to a quiet line beneath it.
 *   - Not on a path — this panel renders only quiet links, ceding the lead to
 *     KeepReadingBook: the book that carries the essay's argument.
 *
 * Everything else survives as a quiet link rather than a card, including the
 * Test the Case flow, which is genuinely essay-specific but must not compete
 * with the primary. The matched tool appears only on a real match:
 * getToolForArticle returns null rather than falling back to a default.
 *
 * All styles are inline, referencing CSS variables from index.css.
 */

import { useMemo } from "react";
import { Link } from "wouter";
import { READING_PATHS } from "@/data/reading-paths-post-christian";
import { pillarForPost } from "@/lib/taxonomy";
import { caseForEssay } from "@/data/argumentCases";

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
  "pastor-burnout": {
    name: "Pastor Burnout Diagnostic",
    description:
      "An honest assessment of the cost you are carrying — and whether it is sustainable.",
    href: "/tools/pastor-burnout",
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
  { keywords: ["burnout", "pastor-burnout"], toolKey: "pastor-burnout" },
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
  "the-pastoral-angle": "pastor-burnout",
  "living-well-after-christendom": "life-audit",
};

/**
 * The matched tool for an essay, or null when nothing genuinely matches.
 * There is deliberately no catch-all default: an unmatched tool at the end of
 * an essay is a non-sequitur, and a generic CTA costs more than it earns.
 */
function getToolForArticle(
  slug: string,
  pillarSlug: string | undefined
): ToolRec | null {
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
  return null;
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

/**
 * Whether this essay sits inside a reading path. The page uses this to decide
 * which single ask leads at the end of an essay: mid-path, the next essay in
 * that path; otherwise, the book that carries the argument.
 */
export function isArticleOnPath(articleSlug: string): boolean {
  return findPathPositions(articleSlug).length > 0;
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

  // The Test the Case flow built from this essay, when there is one.
  const argumentCase = useMemo(() => caseForEssay(articleSlug), [articleSlug]);

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

  // Off a path, the book that carries this essay's argument leads instead
  // (KeepReadingBook). This panel drops to quiet links so the two do not
  // compete at the moment the reader is most ready to act.
  if (!isOnPath) {
    if (!suggestedPath && !tool && !argumentCase) return null;
    return (
      <section
        style={{
          background: "var(--bone-warm)",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div
          style={{
            ...sectionStyle,
            display: "flex",
            gap: "var(--s-4)",
            flexWrap: "wrap",
          }}
        >
          {argumentCase && (
            <Link
              href={`/tools/test-the-case?case=${argumentCase.slug}`}
              style={subtleLinkStyle}
            >
              Argue it yourself &rarr;
            </Link>
          )}
          {suggestedPath && (
            <Link
              href={`/reading-paths#${suggestedPath.slug}`}
              style={subtleLinkStyle}
            >
              Start the path: {suggestedPath.title} &rarr;
            </Link>
          )}
          {tool && (
            <Link href={tool.href} style={subtleLinkStyle}>
              {tool.name} &rarr;
            </Link>
          )}
        </div>
      </section>
    );
  }

  // On a path, the next essay in that path is the one earned next step, so it
  // carries the section alone.
  return (
    <section
      style={{
        background: "var(--bone-warm)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={sectionStyle}>
        <div style={eyebrowStyle}>Read next</div>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
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
                &mdash; article {pos.currentIndex + 1} of {pos.totalArticles}
              </div>
              {pos.next ? (
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
                  You have finished this path. The weight of it stays with you.
                </p>
              )}
            </div>
          ))}
        </div>
        <div
          style={{
            marginTop: "var(--s-4)",
            display: "flex",
            gap: "var(--s-4)",
            flexWrap: "wrap",
          }}
        >
          {argumentCase && (
            <Link
              href={`/tools/test-the-case?case=${argumentCase.slug}`}
              style={subtleLinkStyle}
            >
              Argue it yourself &rarr;
            </Link>
          )}
          <Link href="/reading-paths" style={subtleLinkStyle}>
            All {READING_PATHS.length} reading paths &rarr;
          </Link>
          {tool && (
            <Link href={tool.href} style={subtleLinkStyle}>
              {tool.name} &rarr;
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}

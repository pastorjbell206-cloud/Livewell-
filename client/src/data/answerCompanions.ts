/**
 * What stands beside an Honest Answer (/answers): the tools that take the same
 * question further, listed only where they truly match.
 *
 *   - Test the Case: matched by the essay itself. A published case built from
 *     the answer's essay (argumentCases.essaySlugs) is the same argument,
 *     worked one step at a time.
 *   - A tool that does a job the question raises: client/src/data/tool-offers.json
 *     (lib/toolOffers), at most two, named as lib/toolsList names them.
 *   - Compare the views and "Which View Am I?": matched by hand below, and
 *     only where the answer is about a question on which Christians hold the
 *     views that page lays out. A near miss is left off (the Trinity page
 *     compares views on the Son's submission, which is not "how can God be
 *     three and one?").
 *
 * answerCompanions.test.ts checks every slug against the answers, the doctrine
 * index and the quiz file.
 */
import { caseForEssay } from "./argumentCases";
import { DOCTRINE_INDEX } from "@/lib/theology";
import { toolsOfferedAt } from "@/lib/toolOffers";

/** answer slug → the doctrine Compare opens on, and the quiz Which View opens on. */
export const ANSWER_VIEWS: Record<string, { compare?: string; whichView?: string }> = {
  "does-god-choose-us-or-do-we-choose-him": { compare: "soteriology", whichView: "soteriology" },
  "can-you-lose-your-salvation": { compare: "soteriology", whichView: "soteriology" },
  "how-should-a-christian-read-genesis-1": { compare: "origins", whichView: "origins" },
  "if-god-is-good-why-suffering": { compare: "theodicy" },
  "why-does-god-allow-natural-disasters": { compare: "theodicy" },
};

/**
 * answer slug → the Find Help page for a reader who is living the question,
 * not only asking it. Listed only where the answer touches fear, despair or
 * harm, or a faith coming apart, so the way to real help sits under it. The
 * last four are the answers a doubter reads on the road for someone who has
 * stepped back (/start) and among the skeptic's first questions; each now
 * points to the page written for that state (the walk of 2026-11-23,
 * finding 9).
 */
export const ANSWER_CARE: Record<string, { slug: string; label: string }> = {
  "what-does-the-bible-say-about-anxiety": { slug: "anxiety", label: "I can't stop worrying" },
  "is-anxiety-a-spiritual-failure": { slug: "anxiety", label: "I can't stop worrying" },
  "what-does-the-bible-say-about-divorce-and-remarriage": { slug: "divorce", label: "My marriage has ended" },
  "if-god-is-good-why-suffering": { slug: "suffering", label: "Why would God let this happen?" },
  "can-life-mean-anything-without-god": { slug: "purpose", label: "What's the point of my life?" },
  "what-if-christianity-is-wrong": { slug: "doubt", label: "I'm not sure I believe anymore" },
  "done-with-church-but-not-jesus": { slug: "church-hurt", label: "The church hurt me" },
  "can-you-be-a-christian-without-church": { slug: "church-hurt", label: "The church hurt me" },
  "what-happens-after-deconstruction": { slug: "deconstructing", label: "I'm deconstructing my faith" },
};

export interface Companion { lead: string; label: string; href: string }

/** The lines to print under an answer, in order. Empty when nothing truly matches. */
export function companionsFor(answer: { slug: string; essaySlug: string }): Companion[] {
  const out: Companion[] = [];
  const c = caseForEssay(answer.essaySlug);
  if (c) out.push({ lead: "Argue it one step at a time:", label: `Test the Case, “${c.title}”`, href: `/tools/test-the-case?case=${c.slug}` });
  const views = ANSWER_VIEWS[answer.slug];
  const doctrine = views?.compare ? DOCTRINE_INDEX.find((d) => d.slug === views.compare && d.ready) : undefined;
  if (doctrine) out.push({ lead: "See the views side by side:", label: `Compare the views, “${doctrine.title}”`, href: `/theology/compare?doctrine=${doctrine.slug}` });
  if (views?.whichView) out.push({ lead: "Find out where you lean:", label: "Which View Am I?", href: `/theology/which-view?topic=${views.whichView}` });
  // A tool that does a job this question raises (data/tool-offers.json), by its one name.
  for (const tool of toolsOfferedAt("answers", answer.slug)) {
    if (!out.some((c) => c.href.split(/[?#]/)[0] === tool.href)) out.push({ lead: "A tool for this:", label: tool.name, href: tool.href });
  }
  const care = ANSWER_CARE[answer.slug];
  if (care) out.push({ lead: "If you're living this right now:", label: `Find Help, “${care.label}”`, href: `/help/${care.slug}` });
  return out;
}

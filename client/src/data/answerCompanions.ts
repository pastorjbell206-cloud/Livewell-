/**
 * What stands beside an Honest Answer (/answers): the tools that take the same
 * question further, listed only where they truly match.
 *
 *   - Test the Case: matched by the essay itself. A published case built from
 *     the answer's essay (argumentCases.essaySlugs) is the same argument,
 *     worked one step at a time.
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

/** answer slug → the doctrine Compare opens on, and the quiz Which View opens on. */
export const ANSWER_VIEWS: Record<string, { compare?: string; whichView?: string }> = {
  "does-god-choose-us-or-do-we-choose-him": { compare: "soteriology", whichView: "soteriology" },
  "can-you-lose-your-salvation": { compare: "soteriology", whichView: "soteriology" },
  "how-should-a-christian-read-genesis-1": { compare: "origins", whichView: "origins" },
  "if-god-is-good-why-suffering": { compare: "theodicy" },
  "why-does-god-allow-natural-disasters": { compare: "theodicy" },
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
  return out;
}

/**
 * The ask box on the Questions door (/topics): a question typed in a
 * person's own words, matched to the one page on the site that answers it
 * best. Plain word matching over what is already written (the Honest
 * Answers and the rows of the topics index); nothing is sent anywhere and
 * nothing is generated. When no page fits, it says so.
 */
import { ANSWERS, type Answer } from "@/data/answers";
import { normalizeText, searchWords } from "@/lib/siteSearch";

export const answerHref = (slug: string) => `/answers/${slug}`;

const ANSWER_SLUGS = new Set(ANSWERS.map((a) => a.slug));

/** An answer's address: "/answers#slug" (the old anchor) becomes the answer's own page. */
export function toAnswerPage(href: string): string {
  const m = /^\/answers#([a-z0-9-]+)$/.exec(href);
  return m && ANSWER_SLUGS.has(m[1]) ? answerHref(m[1]) : href;
}

/** The answer an address names, by its page or its old anchor. */
export function answerOfHref(href: string): Answer | undefined {
  const m = /^\/answers(?:\/|#)([a-z0-9-]+)$/.exec(href);
  return m ? ANSWERS.find((a) => a.slug === m[1]) : undefined;
}

export interface AskCandidate {
  question: string;
  href: string;
  /** Words people use for it, matched as strongly as the question. */
  keywords: string;
  /** The page's own text, matched more weakly. */
  body: string;
  answer?: Answer;
}

/** The Honest Answers as candidates. */
export function answerCandidates(): AskCandidate[] {
  return ANSWERS.map((a) => ({
    question: a.question,
    href: answerHref(a.slug),
    keywords: a.askedAs ?? "",
    body: a.paragraphs.join(" "),
    answer: a,
  }));
}

/** A light stem, so "suffering" meets "suffer" and "miracles" meets "miracle". */
function stem(w: string): string {
  if (w.length > 5 && w.endsWith("ing")) return w.slice(0, -3);
  if (w.length > 4 && /ie[sd]$/.test(w)) return `${w.slice(0, -3)}y`;
  if (w.length > 3 && /[^su]s$/.test(w)) return w.slice(0, -1);
  return w;
}

const has = (hay: string, w: string) => hay.includes(` ${w}`) || hay.includes(` ${stem(w)}`);

/** How well a candidate answers what was typed: 0 when it holds none of the words. */
export function askScore(c: AskCandidate, q: string): number {
  const words = searchWords(q).filter((w) => w.length > 2);
  if (!words.length) return 0;
  const title = ` ${normalizeText(c.question)} ${normalizeText(c.keywords)}`;
  const body = ` ${normalizeText(c.body)}`;
  let score = 0;
  let hit = 0;
  for (const w of words) {
    if (has(title, w)) {
      score += 3;
      hit++;
    } else if (has(body, w)) {
      score += 1;
      hit++;
    }
  }
  // At least half the words must be found, and one of them in the question,
  // or the match is a coincidence of common words.
  if (hit * 2 < words.length || score < 3) return 0;
  // The whole question as typed, found in the question or the words people use for it.
  const phrase = normalizeText(q);
  const bonus = phrase.includes(" ") && title.includes(` ${phrase}`) ? 2 : 0;
  return score / words.length + bonus;
}

/** The candidates that answer what was typed, best first (stable for equal scores). */
export function ask(candidates: AskCandidate[], q: string): AskCandidate[] {
  return candidates
    .map((c, i) => ({ c, i, s: askScore(c, q) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .map((x) => x.c);
}

/** The first sentences of an answer, whole, up to about `max` characters. */
export function answerStart(text: string, max = 160): string {
  const sentences = text.match(/[^.?!]+[.?!]+["”’)]*(\s|$)/g) ?? [text];
  let out = "";
  for (const s of sentences) {
    if (out && (out + s).length > max) break;
    out += s;
  }
  return out.trim();
}

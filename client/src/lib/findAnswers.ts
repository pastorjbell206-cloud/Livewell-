/**
 * The find box on /answers: which Honest Answers hold the words a reader
 * typed. Plain word matching on the question and the answer, with no index to
 * build and nothing sent anywhere.
 */
import { ANSWERS } from "@/data/answers";

/** Lower case, no punctuation, so "God's" finds "gods" and "can't" finds "cant". */
const plain = (s: string) => s.toLowerCase().replace(/[’']/g, "").replace(/[^a-z0-9]+/g, " ").trim();

/** Each answer's searchable text, built once: the question first, then the answer. */
const HAYSTACK = ANSWERS.map((a) => ({ slug: a.slug, question: ` ${plain(a.question)} `, body: ` ${plain(a.paragraphs.join(" "))} ` }));

/** The answers that hold every word typed, those with the words in the question first. */
export function findAnswers(query: string): string[] {
  const words = plain(query).split(" ").filter(Boolean);
  if (!words.length) return ANSWERS.map((a) => a.slug);
  const inQuestion: string[] = [];
  const inBody: string[] = [];
  for (const h of HAYSTACK) {
    if (words.every((w) => h.question.includes(` ${w}`))) inQuestion.push(h.slug);
    else if (words.every((w) => h.question.includes(` ${w}`) || h.body.includes(` ${w}`))) inBody.push(h.slug);
  }
  return [...inQuestion, ...inBody];
}

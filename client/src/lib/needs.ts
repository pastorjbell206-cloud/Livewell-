/**
 * needs — the Find Help registry on the client: types for the need files in
 * client/public/needs/ (docs/grow/CARE-PAGE-SPEC.md), the search that lets a
 * reader type what they are facing in their own words, and the Study Bible
 * link for a Scripture reference.
 */
import sensitive from "@/data/sensitive-pages.json";
import type { CrisisTopic } from "@/components/CrisisBlock";

export type ReaderState = "crisis" | "carrying" | "grow" | "helping" | "leading";
export type Sensitivity = "crisis" | "high" | "ordinary";

export interface KitLink { href: string; label: string; kind?: string }

export interface NeedEntry {
  slug: string;
  title: string;
  summary: string;
  askedAs: string[];
  states: ReaderState[];
  sensitivity: Sensitivity;
  crisisTopics?: string[];
  page: boolean;
  rank: number;
  seoTitle?: string;
  description?: string;
  /** Starter entries (no care page yet) carry their links here. */
  kit?: { read: KitLink[] };
  related?: string[];
}

export interface NeedsIndex { needs: NeedEntry[] }

export interface CarePageData extends NeedEntry {
  seoTitle: string;
  description: string;
  answer: string;
  happening: string;
  scripture: { intro: string; passages: { ref: string; text: string; reading: string }[] };
  whyHard: string;
  thisWeek: { intro: string; steps: { title: string; body: string }[] };
  moreHelp: { body: string; signs: string[]; firstCall: string; cost: string };
  helping: { body: string; say: string[]; dontSay: string[]; next: string };
  prayer: string;
  kit: {
    plan?: KitLink;
    selfCheck?: KitLink;
    tool?: KitLink;
    guides?: KitLink[];
    read: (KitLink & { kind: string })[];
  };
  faq: { q: string; a: string }[];
}

export const READER_STATES: { id: ReaderState; label: string; blurb: string }[] = [
  { id: "crisis", label: "I'm in trouble right now", blurb: "Safety first, one clear next step, and a person to call." },
  { id: "carrying", label: "I'm carrying something", blurb: "A weight that has lasted weeks or years, understood before it is fixed." },
  { id: "grow", label: "I want to grow", blurb: "Not in crisis. A plan, a practice, and company for the road." },
  { id: "helping", label: "I'm helping someone", blurb: "What to say, what never to say, and when to bring in someone else." },
  { id: "leading", label: "I'm leading a group", blurb: "Studies with leader notes, for a small group or a class." },
];

const STOP = new Set(["i", "im", "i'm", "my", "me", "a", "an", "the", "to", "and", "of", "is", "it", "in", "for", "about", "what", "do", "does", "how", "can", "cant", "can't", "dont", "don't", "am", "so", "be", "with", "that", "this", "on", "just", "feel", "feeling", "bible", "verses", "verse", "god", "say", "says"]);

export function words(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[’']/g, "")
    .split(/[^a-z0-9]+/)
    .filter((w) => w && !STOP.has(w));
}

/** A light stem so "worrying", "worried", and "worries" meet "worry". */
function stem(w: string): string {
  return w
    .replace(/(ies|ied)$/, "y")
    .replace(/(ing|ed|es|s)$/, "")
    .replace(/(.)\1$/, "$1");
}

/**
 * Rank needs for what a reader typed. Whole-phrase matches on an askedAs
 * phrase or the title count most, then shared words (stemmed). Ties keep the
 * demand-map order.
 */
export function searchNeeds(query: string, needs: NeedEntry[]): NeedEntry[] {
  const q = query.trim().toLowerCase().replace(/[’']/g, "");
  if (q.length < 2) return [];
  const qs = new Set(words(q).map(stem));
  const scored = needs.map((n) => {
    let score = 0;
    const phrases = [n.title, ...n.askedAs].map((p) => p.toLowerCase().replace(/[’']/g, ""));
    for (const p of phrases) {
      if (p === q) score += 12;
      else if (p.includes(q) || (q.length > 6 && q.includes(p))) score += 6;
    }
    const hay = new Set(words([n.title, n.summary, ...n.askedAs].join(" ")).map(stem));
    qs.forEach((w) => { if (hay.has(w)) score += 2; });
    return { n, score };
  });
  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score || a.n.rank - b.n.rank)
    .map((s) => s.n);
}

/** "Psalm 23:4" -> "/study/bible/psalms/23"; null when the reference will not parse. */
export function studyBibleHref(ref: string): string | null {
  const m = ref.trim().match(/^((?:[1-3]\s)?[A-Za-z][A-Za-z ]*?)\s+(\d+)/);
  if (!m) return null;
  let book = m[1].toLowerCase().replace(/\s+/g, " ");
  if (book === "psalm") book = "psalms";
  if (book === "song of songs") book = "song of solomon";
  return `/study/bible/${book.replace(/ /g, "-")}/${m[2]}`;
}

/**
 * Library pages on heavy subjects carry the compact help block
 * (docs/grow/GROW-PROMPT.md, Wave 0): the life pages and study guides a
 * reader in pain is most likely to be reading. The lists live in
 * data/sensitive-pages.json so the study guide PDFs use the same ones.
 */
export const SENSITIVE_LIFE = new Set<string>(sensitive.life);
export const SENSITIVE_GUIDES = new Set<string>(sensitive.studyguides);

/**
 * Wisdom topics on heavy subjects, with the lines each calls for. `lead`
 * topics show the full help block under the title (a reader typing "suicidal
 * thoughts" should not scroll for it); `end` topics show it after the reading.
 */
export const SENSITIVE_WISDOM: Record<string, { topics: CrisisTopic[]; lead: boolean }> = Object.fromEntries([
  ...Object.entries(sensitive.wisdom.lead).map(([id, topics]) => [id, { topics: topics as CrisisTopic[], lead: true }]),
  ...Object.entries(sensitive.wisdom.end).map(([id, topics]) => [id, { topics: topics as CrisisTopic[], lead: false }]),
]);

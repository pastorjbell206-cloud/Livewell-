/**
 * Topics (MASTER-PLAN 4): the hard questions of life in post-Christian
 * America, each answered once.
 *
 * /topics is one list of questions in the words people type; each row opens
 * the one best page the site has (a topic page, a care page, an Honest
 * Answer, a study guide). A topic page (/topics/:slug) is one question with
 * one assembled answer across formats: a short answer, the essay to read
 * first, Scripture read in its world, a witness from church history, a
 * devotion for the family table, and what to use.
 *
 * Data: client/public/topics/<slug>.json (hand-built, at most six) and
 * client/public/topics/index.json (scripts/build-topics-index.mjs), held by
 * scripts/validate-topics.mjs. An essay that is not public yet is never shown:
 * the page shows its named stand-in until the shelf (lib/shelf) says it is.
 */
import type { CrisisTopic } from "@/components/CrisisBlock";
import { isPublicEssayHref, overrideMeta } from "@/lib/shelf";

export const TOPICS_INDEX_URL = "/topics/index.json";
export const topicFileUrl = (slug: string) => `/topics/${encodeURIComponent(slug)}.json`;
export const topicHref = (slug: string) => `/topics/${slug}`;

export interface TopicLink {
  href: string;
  label: string;
  line?: string;
}

export interface TopicPassage {
  ref: string;
  line: string;
  /** The context guide that reads this passage in its world. */
  context?: TopicLink;
}

export interface TopicSide {
  line: string;
  essay: TopicLink;
  path: TopicLink;
}

export interface TopicCare extends TopicLink {
  /** Shown as help lines only on a page flagged sensitive. */
  crisis?: CrisisTopic[];
}

export interface Topic {
  slug: string;
  /** The question, as asked: the page's H1. */
  title: string;
  description: string;
  askedAs: string[];
  /** The short answer, 150 to 250 words, in paragraphs. */
  short: string[];
  /** The essay to read first, shown once it is public. */
  essay: TopicLink | null;
  /** What the page shows until then (or instead, when there is no essay). */
  essayStandIn?: TopicLink;
  alsoEssays: TopicLink[];
  /** The shelf section this page is the companion to. */
  section?: { slug: string; label: string; line: string };
  /** On a politics page: the same test, asked of both directions. */
  bothWays?: { right: TopicSide; left: TopicSide };
  scripture: TopicPassage[];
  witness: { name: string; line: string; href: string; label: string };
  /** A family devotion id, or "tonight" for whatever tonight's devotion is. */
  table: { devotion: string; label: string; line: string; also?: TopicLink[] };
  use: { plan?: TopicLink; study?: TopicLink; tools: TopicLink[]; paths?: TopicLink[] };
  care?: TopicCare[];
  politics: boolean;
  sensitive: boolean;
}

export interface TopicsIndexRow {
  askedAs: string;
  href: string;
  kind: string;
  line: string;
  /** What the row opens while href (an essay) is not public. */
  standIn?: string;
  standInKind?: string;
  /** A second door on the same row (Test the Case beside the Honest Answers). */
  also?: TopicLink;
}

export interface TopicsIndex {
  pages: { slug: string; title: string; description: string; askedAs: string[]; href: string }[];
  rows: TopicsIndexRow[];
}

const isObject = (x: unknown): x is Record<string, unknown> => !!x && typeof x === "object" && !Array.isArray(x);
const isText = (x: unknown): x is string => typeof x === "string" && x.trim().length > 0;
const isLink = (x: unknown): x is TopicLink => isObject(x) && isText(x.href) && isText(x.label);

export function isTopic(x: unknown): x is Topic {
  if (!isObject(x)) return false;
  return (
    isText(x.slug) &&
    isText(x.title) &&
    Array.isArray(x.short) &&
    x.short.every(isText) &&
    (x.essay === null || isLink(x.essay)) &&
    (x.essayStandIn === undefined || isLink(x.essayStandIn)) &&
    Array.isArray(x.alsoEssays) &&
    x.alsoEssays.every(isLink) &&
    Array.isArray(x.scripture) &&
    x.scripture.every((p) => isObject(p) && isText(p.ref) && isText(p.line)) &&
    isObject(x.witness) &&
    isText(x.witness.href) &&
    isObject(x.table) &&
    isText(x.table.devotion) &&
    isObject(x.use) &&
    Array.isArray(x.use.tools)
  );
}

export function isTopicsIndex(x: unknown): x is TopicsIndex {
  return (
    isObject(x) &&
    Array.isArray(x.pages) &&
    Array.isArray(x.rows) &&
    x.rows.every((r) => isObject(r) && isText(r.askedAs) && isText(r.href))
  );
}

/** What kind of page an address opens (the same rule as scripts/lib/topics.mjs). */
export function kindOf(href: string): string {
  if (href.startsWith("/topics/")) return "topic";
  if (href.startsWith("/help/") || href === "/help") return "care";
  if (href.startsWith("/answers")) return "answer";
  if (href.startsWith("/writing")) return "essay";
  if (href.startsWith("/studyguides/")) return "study";
  if (href.startsWith("/plans/")) return "plan";
  if (href.startsWith("/theology/") || href.startsWith("/resources/creeds")) return "history";
  if (href.startsWith("/tools/") || href.startsWith("/nation/") || href.startsWith("/disruption/")) return "tool";
  if (href.startsWith("/pathways/")) return "path";
  return "page";
}

/** The small label over a row: what the reader will land on. */
export const KIND_LABEL: Record<string, string> = {
  topic: "Topic",
  care: "Find Help",
  answer: "Honest answers",
  essay: "Essay",
  study: "Study guide",
  plan: "Eight-week plan",
  history: "Church history",
  tool: "Tool",
  path: "Guided path",
  page: "",
};

export const kindLabel = (href: string) => KIND_LABEL[kindOf(href)] ?? "";

/** Where a row goes now: its essay once public, else its stand-in. */
export function rowTarget(row: TopicsIndexRow): string {
  return row.standIn && !isPublicEssayHref(row.href) ? row.standIn : row.href;
}

/** The lead a topic page shows: its essay once public, else the stand-in. */
export function leadOf(topic: Topic): { link: TopicLink; standIn: boolean } | null {
  if (topic.essay && isPublicEssayHref(topic.essay.href)) return { link: withRewrite(topic.essay), standIn: false };
  if (topic.essayStandIn) return { link: withRewrite(topic.essayStandIn), standIn: true };
  return null;
}

/** Further essays, only the public ones. */
export function publicEssays(links: TopicLink[]): TopicLink[] {
  return links.filter((l) => isPublicEssayHref(l.href)).map(withRewrite);
}

/** The essay's slug, when the link is to an essay. */
export function essaySlug(href: string): string | null {
  const m = /^\/writing\/([^/?#]+)$/.exec(href);
  return m ? decodeURIComponent(m[1]) : null;
}

/** A rewritten essay's own title and opening line win over the topic's copy of them. */
function withRewrite(link: TopicLink): TopicLink {
  const meta = overrideMeta(essaySlug(link.href));
  return meta ? { ...link, label: meta.title || link.label, line: meta.excerpt || link.line } : link;
}

/** Minutes to read a rewritten essay's body (the essay page's own rule). */
export function readingMinutes(body: string): number {
  return Math.max(1, Math.round(body.split(/\s+/).filter(Boolean).length / 225));
}

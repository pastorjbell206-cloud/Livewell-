/**
 * What a reader has started, read from what the site already keeps in this
 * browser, for "Pick up where you left off" on /my-library.
 *
 * Each tool owns its own storage key (lib/storage callers across the site);
 * this module only reads them, through guarded parsing, so a corrupt or
 * unfamiliar value is skipped instead of breaking the page. Nothing here
 * writes, and nothing leaves the device.
 */
import { isArrayOf, readStoredJSON } from "@/lib/storage";
import { isPublicEssay, shelfEntry } from "@/lib/shelf";

export interface ProgressRow {
  href: string;
  title: string;
  /** What it is, in plain words. */
  kind: string;
  /** Where the reader is: "3 of 8 weeks walked", "Last taken Oct 3"... */
  detail: string;
  /** For ordering: the most recent activity we know of (ISO), or "". */
  when: string;
}

/** The self-checks that keep a history (components/SelfCheckHistory, key livewell-history-<id>). */
export const SELF_CHECKS: Record<string, { title: string; href: string }> = {
  diagnostic: { title: "Where Are You With God? A Self-Check", href: "/diagnostic" },
  "life-audit": { title: "Life Audit", href: "/tools/life-audit" },
  "emotional-health": { title: "Emotional Health Self-Check", href: "/tools/emotional-health" },
  "spiritual-gifts": { title: "Spiritual Gifts Self-Check", href: "/tools/spiritual-gifts" },
  marriage: { title: "Marriage Health Self-Check", href: "/tools/marriage-assessment" },
  "financial-health": { title: "Financial Health Check", href: "/tools/financial-health" },
};

const isString = (x: unknown): x is string => typeof x === "string";
const isObject = (x: unknown): x is Record<string, unknown> => !!x && typeof x === "object" && !Array.isArray(x);
const isRuns = isArrayOf((x): x is { date: string } => isObject(x) && typeof x.date === "string");
const isPlanProgress = (x: unknown): x is { startedAt: string; done: Record<string, unknown> } =>
  isObject(x) && typeof x.startedAt === "string" && isObject(x.done);
const isList = (x: unknown): x is unknown[] => Array.isArray(x);
const hasList = (field: string) => (x: unknown): x is Record<string, unknown[]> => isObject(x) && Array.isArray(x[field]);

function storageKeys(): string[] {
  try {
    const keys: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k) keys.push(k);
    }
    return keys;
  } catch {
    return [];
  }
}

function shortDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function humanize(slug: string): string {
  const words = slug.replace(/[-_]+/g, " ").trim();
  return words ? words[0].toUpperCase() + words.slice(1) : slug;
}

const plural = (n: number, one: string, many = `${one}s`) => `${n} ${n === 1 ? one : many}`;

/**
 * Everything in progress, most recent first.
 * `planTitles` maps a care plan's slug to its title (from /plans/plans-index.json).
 */
export function collectProgress(planTitles: Record<string, string> = {}): ProgressRow[] {
  if (typeof window === "undefined") return [];
  const rows: ProgressRow[] = [];
  const keys = storageKeys();

  // Eight-week plans (pages/plans/CarePlan.tsx, key lw-plan-<slug>).
  for (const key of keys) {
    const m = key.match(/^lw-plan-(.+)$/);
    if (!m) continue;
    const p = readStoredJSON(key, isPlanProgress, null);
    if (!p) continue;
    const walked = Object.values(p.done).filter(Boolean).length;
    rows.push({
      href: `/plans/${m[1]}`,
      title: planTitles[m[1]] ?? humanize(m[1]),
      kind: "Eight-week plan",
      detail: walked >= 8 ? "All 8 weeks walked" : walked ? `${walked} of 8 weeks walked` : "Started",
      when: p.startedAt,
    });
  }

  // Self-checks with a saved history (components/SelfCheckHistory).
  for (const [id, meta] of Object.entries(SELF_CHECKS)) {
    const runs = readStoredJSON(`livewell-history-${id}`, isRuns, []);
    if (!runs.length) continue;
    const last = runs[runs.length - 1].date;
    rows.push({ ...meta, kind: "Self-check", detail: `Last taken ${shortDate(last)}${runs.length > 1 ? `, ${plural(runs.length, "time")} in all` : ""}`, when: last });
  }

  // The companion tools and Scripture memory, each with its own key.
  const worries = readStoredJSON("livewell-worry-journal", isList, []);
  if (worries.length) rows.push({ href: "/tools/worry-journal", title: "The Worry Journal", kind: "Tool", detail: plural(worries.length, "entry", "entries"), when: "" });
  const prayer = readStoredJSON("livewell-prayer-planner", hasList("items"), { items: [] });
  if (prayer.items.length) rows.push({ href: "/tools/prayer-planner", title: "The Prayer Planner", kind: "Tool", detail: `${plural(prayer.items.length, "person or need", "people and needs")} you pray for`, when: "" });
  const connection = readStoredJSON("livewell-connection-planner", hasList("people"), { people: [] });
  if (connection.people.length) rows.push({ href: "/tools/connection-planner", title: "The Connection Planner", kind: "Tool", detail: `${plural(connection.people.length, "person", "people")} you're reaching toward`, when: "" });
  const memorized = readStoredJSON("livewell-scripture-memorized", isList, []);
  if (memorized.length) rows.push({ href: "/tools/scripture-memory", title: "Scripture Memory System", kind: "Tool", detail: `${plural(memorized.length, "verse")} memorized`, when: "" });

  // The Study Bible (lib/bible-notes, key livewell-progress-bible).
  const chapters = readStoredJSON("livewell-progress-bible", isArrayOf(isString), []);
  if (chapters.length) rows.push({ href: "/study/bible", title: "The Study Bible", kind: "Study", detail: `${plural(chapters.length, "chapter")} marked read`, when: "" });

  return rows.sort((a, b) => b.when.localeCompare(a.when));
}

/**
 * The self-checks that keep their answers part-way through, each on its own
 * page's key, by SELF_CHECKS id. Each saves { answers, savedAt } as the reader
 * goes and once more on finishing, just before its result is recorded.
 */
export const SELF_CHECK_DRAFTS: Record<string, string> = {
  "life-audit": "livewell-progress-life-audit",
  "emotional-health": "livewell-progress-emotional-health",
  "spiritual-gifts": "livewell-progress-spiritual-gifts",
  marriage: "livewell-progress-marriage-assessment",
  "financial-health": "livewell-progress-financial-health",
};

/** One thing to pick up again: where it opens, how to name it after "Continue", and when it was last touched. */
export interface ContinueItem {
  href: string;
  /** "the Life Audit", "your eight-week plan". */
  label: string;
  when: string;
}

const isDraft = (x: unknown): x is { answers: Record<string, unknown>; savedAt: string } =>
  isObject(x) && typeof x.savedAt === "string" && isObject(x.answers);

/**
 * The one thing on this device to continue, for Home: an eight-week plan not
 * yet walked through, or a self-check left part-way (answers saved after its
 * last finished result, or never finished). The most recent wins; null when
 * there is nothing. Essays are not offered, because the site remembers only
 * the essays a reader finished (lib/readProgress), never one begun.
 */
export function continueHere(): ContinueItem | null {
  if (typeof window === "undefined") return null;
  const items: ContinueItem[] = [];

  for (const key of storageKeys()) {
    const m = key.match(/^lw-plan-(.+)$/);
    if (!m) continue;
    const p = readStoredJSON(key, isPlanProgress, null);
    if (p && Object.values(p.done).filter(Boolean).length < 8) items.push({ href: `/plans/${m[1]}`, label: "your eight-week plan", when: p.startedAt });
  }

  for (const [id, key] of Object.entries(SELF_CHECK_DRAFTS)) {
    const draft = readStoredJSON(key, isDraft, null);
    if (!draft || Object.keys(draft.answers).length === 0) continue;
    const runs = readStoredJSON(`livewell-history-${id}`, isRuns, []);
    const finished = runs.length > 0 && runs[runs.length - 1].date >= draft.savedAt;
    if (!finished) items.push({ href: SELF_CHECKS[id].href, label: `the ${SELF_CHECKS[id].title}`, when: draft.savedAt });
  }

  return items.sort((a, b) => b.when.localeCompare(a.when))[0] ?? null;
}

/** Saved verses, prayers, quotes, and wisdom entries, shown in full at /tools/saved. */
export function savedSnippetCount(): number {
  const n = (key: string) => readStoredJSON(key, isList, []).length;
  return n("livewell-saved-verses") + n("livewell-saved-prayers") + n("livewell-quotes-saved-v1") + n("livewell-wisdom-saved-v1");
}

/** The essays read most recently that are still on the public shelf, newest first. */
export function recentEssays(limit = 5): { href: string; title: string }[] {
  const read = readStoredJSON("livewell-read-essays", isArrayOf(isString), []);
  const out: { href: string; title: string }[] = [];
  for (let i = read.length - 1; i >= 0 && out.length < limit; i--) {
    const slug = read[i];
    const entry = shelfEntry(slug);
    if (entry && isPublicEssay(slug)) out.push({ href: `/writing/${slug}`, title: entry.title });
  }
  return out;
}

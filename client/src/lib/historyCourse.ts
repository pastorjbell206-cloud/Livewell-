/**
 * Church history as a course (/theology/history): the pure pieces the hub, the
 * essay page and the timeline share.
 *
 *   - the course order: the fourteen essays that run from Pentecost to today
 *     are numbered in client/public/history/essays-index.json ("course"), and
 *     the eight longer essays carry the era they sit under ("under"). Both are
 *     written by scripts/build-history-index.mjs;
 *   - a stable anchor for every person, council and heresy on the hub, so a
 *     name anywhere on the site can land on its entry;
 *   - the names an essay may link: an entry's full name, plus the short forms
 *     listed by hand below. A short form is listed only where it cannot mean
 *     someone else in these essays ("Gregory" is three people, so it is not);
 *   - years read out of the date strings the libraries already hold, so the
 *     timeline can say who was alive and which essay covers a year.
 */

export interface EraEvent { year: string; title: string; note: string }
export interface Era { id: string; name: string; range: string; summary: string; events: EraEvent[] }
export interface Council { name: string; year: string; place: string; ecumenical: boolean; calledOver: string; decided: string; gaveUs: string; rejected: string }
export interface Heresy { name: string; era: string; claim: string; whyItAppealed: string; theChurchSaid: string; answeredBy: string; stillSeenAs: string }
export interface Figure { name: string; dates: string; era: string; place: string; role: string; summary: string; whyTheyMatter: string }
export interface HistoryEssayEntry {
  slug: string; title: string; blurb: string; era: string; dateRange: string;
  /** Position in the course, from 1. Absent on the longer essays. */
  course?: number;
  /** The timeline era a longer essay sits under. */
  under?: string;
  /** How many checked source cards the essay has. */
  sources?: number;
}

export const HISTORY_HUB = "/theology/history";

export type EntryKind = "person" | "council" | "heresy";

/** The anchor of an entry on the hub: person-augustine-of-hippo. */
export function entryId(kind: EntryKind, name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/,.*$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${kind}-${slug}`;
}

export const entryHref = (kind: EntryKind, name: string) => `${HISTORY_HUB}#${entryId(kind, name)}`;

/** Which tab an anchor belongs to, or null when it is not an entry anchor. */
export function kindOfAnchor(id: string): EntryKind | null {
  const m = id.match(/^(person|council|heresy)-/);
  return m ? (m[1] as EntryKind) : null;
}

/* ---------------------------------------------------------------- course */

export function courseEssays(essays: HistoryEssayEntry[]): HistoryEssayEntry[] {
  return essays.filter((e) => typeof e.course === "number").sort((a, b) => a.course! - b.course!);
}

export function deeperEssays(essays: HistoryEssayEntry[], eraName?: string): HistoryEssayEntry[] {
  return essays.filter((e) => typeof e.course !== "number" && (eraName === undefined || e.under === eraName));
}

export interface CoursePlace {
  entry: HistoryEssayEntry;
  total: number;
  prev: HistoryEssayEntry | null;
  next: HistoryEssayEntry | null;
  /** For a longer essay: the course essays of the era it sits under. */
  alongside: HistoryEssayEntry[];
}

/** Where an essay sits: its number and neighbours, or what it goes deeper on. */
export function coursePlace(essays: HistoryEssayEntry[], slug: string): CoursePlace | null {
  const entry = essays.find((e) => e.slug === slug);
  if (!entry) return null;
  const course = courseEssays(essays);
  if (typeof entry.course === "number") {
    const i = course.findIndex((e) => e.slug === slug);
    return { entry, total: course.length, prev: course[i - 1] ?? null, next: course[i + 1] ?? null, alongside: [] };
  }
  return { entry, total: course.length, prev: null, next: null, alongside: course.filter((e) => e.era === entry.under) };
}

/** The key the reader's place in the course is kept under (lib/storage). */
export const COURSE_PLACE_KEY = "livewell-progress-history-course";
export const isCoursePlace = (x: unknown): x is { slug: string } =>
  !!x && typeof x === "object" && typeof (x as { slug?: unknown }).slug === "string";

/* ----------------------------------------------------------------- years */

/** "around 35 to 108" → 35..108; "325" → 325..325; "from around 1525" → 1525..null. */
export function yearSpan(s: string | undefined): { start: number; end: number | null } | null {
  if (!s) return null;
  const nums = (s.match(/\d{2,4}/g) || []).map(Number);
  if (!nums.length) return null;
  if (/^\s*from\b/i.test(s)) return { start: nums[0], end: null };
  return { start: nums[0], end: nums[1] ?? nums[0] };
}

/** An era's first and last year. "to today" runs to the year given. */
export function eraSpan(era: Pick<Era, "range">, thisYear: number): { start: number; end: number } {
  const nums = (era.range.match(/\d+/g) || []).map(Number);
  const start = nums[0] ?? 0;
  return { start, end: /today/i.test(era.range) ? thisYear : (nums[1] ?? start) };
}

/** The years an essay covers, read from "AD 64-313", "to AD 1054", "AD 1900 to today". */
export function essaySpan(e: Pick<HistoryEssayEntry, "dateRange" | "era" | "under">, eras: Era[], thisYear: number): { start: number; end: number } | null {
  const nums = (e.dateRange.match(/\d{2,4}/g) || []).map(Number);
  if (!nums.length) return null;
  if (/today|present/i.test(e.dateRange)) return { start: nums[0], end: thisYear };
  if (nums.length === 1) {
    // "to AD 1054": the essay runs up to that year from the start of its era.
    const era = eras.find((x) => x.name === (e.under ?? e.era));
    const start = /^\s*to\b/i.test(e.dateRange) && era ? eraSpan(era, thisYear).start : nums[0];
    return { start, end: nums[0] };
  }
  return { start: nums[0], end: nums[1] };
}

export interface TimelineStop {
  /** The year as a number, for ordering and for "who was alive". */
  year: number;
  /** The year as the library words it: "around 112", "today". */
  label: string;
  events: EraEvent[];
  councils: Council[];
}

/**
 * The dated years of every era, in order: its events and the councils that
 * met in it. A council on the seam between two eras (1054) goes with the era
 * that already has an event in that year, else with the later era.
 */
export function timelineStops(eras: Era[], councils: Council[], thisYear: number): TimelineStop[][] {
  const maps = eras.map((era) => {
    const byYear = new Map<number, TimelineStop>();
    for (const ev of era.events) {
      const y = /today/i.test(ev.year) ? thisYear : yearSpan(ev.year)?.start;
      if (y == null) continue;
      if (!byYear.has(y)) byYear.set(y, { year: y, label: ev.year.replace(/\s+to\s+\d+$/, ""), events: [], councils: [] });
      byYear.get(y)!.events.push(ev);
    }
    return byYear;
  });
  for (const c of councils) {
    const y = yearSpan(c.year)?.start;
    if (y == null) continue;
    let i = maps.findIndex((m) => m.has(y));
    if (i < 0) {
      i = eras.findIndex((era, n) => {
        const b = eraSpan(era, thisYear);
        return y >= b.start && (y < b.end || (n === eras.length - 1 && y <= b.end));
      });
    }
    if (i < 0) continue;
    if (!maps[i].has(y)) maps[i].set(y, { year: y, label: c.year, events: [], councils: [] });
    maps[i].get(y)!.councils.push(c);
  }
  return maps.map((m) => Array.from(m.values()).sort((a, b) => a.year - b.year));
}

/** The people in the list who were alive in a year. A movement with no end year runs to the end of its era. */
export function aliveIn(year: number, figures: Figure[], eras: Era[], thisYear: number): Figure[] {
  return figures.filter((f) => {
    const s = yearSpan(f.dates);
    if (!s) return false;
    let end = s.end;
    if (end == null) {
      const era = eras.find((e) => { const b = eraSpan(e, thisYear); return s.start >= b.start && s.start < b.end; });
      end = era ? eraSpan(era, thisYear).end : s.start;
    }
    return year >= s.start && year <= end;
  });
}

/** The essays whose years hold this one, the course first. */
export function essaysCovering(year: number, essays: HistoryEssayEntry[], eras: Era[], thisYear: number): HistoryEssayEntry[] {
  const hit = essays.filter((e) => {
    const s = essaySpan(e, eras, thisYear);
    return !!s && year >= s.start && year <= s.end;
  });
  return [...courseEssays(hit), ...deeperEssays(hit)];
}

/* ----------------------------------------------------------------- names */

/**
 * Short forms an essay may use for an entry. Only forms that cannot mean
 * anyone else in these essays are listed: no bare "Gregory" (three of them),
 * "John", "Ignatius" (of Antioch or of Loyola), "Francis", "Teresa", "Wesley"
 * (John or Charles) or "Lewis". An entry not listed links by its full name
 * only. historyCourse.test.ts checks every key against the libraries.
 */
export const SHORT_NAMES: Record<string, string[]> = {
  "Polycarp of Smyrna": ["Polycarp"],
  "Justin Martyr": ["Justin"],
  "Irenaeus of Lyon": ["Irenaeus of Lyons", "Irenaeus"],
  "Tertullian": ["Tertullian of Carthage"],
  "Origen of Alexandria": ["Origen"],
  "Athanasius of Alexandria": ["Athanasius"],
  "Basil the Great": ["Basil of Caesarea", "Basil"],
  "Ambrose of Milan": ["Ambrose"],
  "John Chrysostom": ["Chrysostom"],
  "Augustine of Hippo": ["Augustine"],
  "Benedict of Nursia": ["Benedict"],
  "Anselm of Canterbury": ["Anselm"],
  "Bernard of Clairvaux": ["Bernard"],
  "Thomas Aquinas": ["Aquinas"],
  "John Wycliffe": ["Wycliffe"],
  "Jan Hus": ["Hus"],
  "Martin Luther": ["Luther"],
  "John Calvin": ["Calvin"],
  "William Tyndale": ["Tyndale"],
  "Thomas Cranmer": ["Cranmer"],
  "The Anabaptists": ["Anabaptists"],
  "John Bunyan": ["Bunyan"],
  "William Carey": ["Carey"],
  "Charles Spurgeon": ["Spurgeon"],
  "Dietrich Bonhoeffer": ["Bonhoeffer"],
  "C.S. Lewis": ["C. S. Lewis"],
  "First Council of Nicaea": ["Council of Nicaea", "Nicaea"],
  "Council of Chalcedon": ["Chalcedon"],
  "Council of Trent": ["Trent"],
  "First Vatican Council": ["Vatican I"],
  "Second Vatican Council": ["Vatican II"],
};

/**
 * Entries an essay never links by name, because the name is also used for
 * something else: "the Great Schism" is 1054 in the councils list and the
 * rival popes of 1378 in the medieval essays.
 */
export const NEVER_LINKED = new Set(["The Great Schism"]);

interface NameTarget {
  href: string;
  name: string;
  /** A person's years, so a short form is not linked in a sentence about another century. */
  life?: { start: number; end: number };
}

export interface NameIndex {
  /** Every linkable form, longest first, as one pattern. */
  pattern: RegExp | null;
  /** form → the entry it names */
  byForm: Map<string, NameTarget>;
}

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

export function buildNameIndex(figures: Pick<Figure, "name" | "dates">[], councils: Pick<Council, "name">[]): NameIndex {
  const byForm = new Map<string, NameTarget>();
  const add = (kind: EntryKind, name: string, dates?: string) => {
    if (NEVER_LINKED.has(name)) return;
    const span = yearSpan(dates);
    const target: NameTarget = { href: entryHref(kind, name), name, life: span && span.end != null ? { start: span.start, end: span.end } : undefined };
    for (const form of [name, ...(SHORT_NAMES[name] ?? [])]) if (!byForm.has(form)) byForm.set(form, target);
  };
  for (const f of figures) add("person", f.name, f.dates);
  for (const c of councils) add("council", c.name);
  const forms = Array.from(byForm.keys()).sort((a, b) => b.length - a.length);
  if (!forms.length) return { pattern: null, byForm };
  // A form stands alone: not inside a longer word, not the first half of
  // another person's name ("Augustine of Canterbury", "Benedict XVI",
  // "Martin Luther King"), and not a possessive of someone else.
  const pattern = new RegExp(
    `(${forms.map(escapeRe).join("|")})(?![A-Za-z])(?! of [A-Z])(?! [IVX]+\\b)(?! King\\b)(?! the [A-Z])`,
    "g",
  );
  return { pattern, byForm };
}

export type NamePiece = string | { text: string; href: string; name: string };

/**
 * True when a short form sits in a sentence dated outside the person's life:
 * "In 597 he sent Augustine" is Augustine of Canterbury, not the bishop of
 * Hippo who died in 430. Such a mention is left as plain text. It costs a few
 * true links ("reading Luther's preface" in 1738) and never makes a false one.
 */
function datedElsewhere(text: string, at: number, life: { start: number; end: number }): boolean {
  const from = Math.max(text.lastIndexOf(". ", at), text.lastIndexOf("? ", at), text.lastIndexOf("! ", at), text.lastIndexOf("\n", at)) + 1;
  const stop = text.slice(at).search(/[.?!](\s|$)/);
  const sentence = text.slice(from, stop < 0 ? text.length : at + stop);
  return (sentence.match(/\b\d{3,4}\b/g) || []).map(Number).some((y) => y < life.start - 5 || y > life.end + 5);
}

/**
 * Split a paragraph into plain text and linked names. Each entry is linked
 * once per `seen` set (pass one set per section), at its first mention.
 */
export function splitNames(text: string, index: NameIndex, seen: Set<string>): NamePiece[] {
  if (!index.pattern) return [text];
  const out: NamePiece[] = [];
  let last = 0;
  index.pattern.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = index.pattern.exec(text))) {
    // Not inside a longer word. Checked here, not with a lookbehind: older
    // Safari cannot parse one and would throw when the pattern is built.
    if (m.index > 0 && /[A-Za-z]/.test(text[m.index - 1])) continue;
    const target = index.byForm.get(m[1]);
    if (!target || seen.has(target.name)) continue;
    if (m[1] !== target.name && target.life && datedElsewhere(text, m.index, target.life)) continue;
    seen.add(target.name);
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push({ text: m[1], href: target.href, name: target.name });
    last = m.index + m[1].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/* --------------------------------------------------------------- sources */

/** One checked excerpt from a public-domain text (client/public/history/sources). */
export interface SourceCard {
  type: "source";
  /** The essay section it stands under. */
  section: string;
  about: string;
  author: string;
  work: string;
  reference: string;
  translation: string;
  corpus: string;
  inNote?: boolean;
  excerpt: string;
}

export const isSourcesFile = (x: unknown): x is { essay: string; cards: SourceCard[] } => {
  const d = x as { cards?: unknown };
  return !!d && typeof d === "object" && Array.isArray(d.cards) &&
    d.cards.every((c) => !!c && typeof c === "object" && typeof (c as SourceCard).excerpt === "string" && typeof (c as SourceCard).section === "string");
};

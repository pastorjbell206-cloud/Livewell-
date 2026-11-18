/**
 * What the Study Bible's front page and a book's page draw from: the seven
 * sections of the canon, each book's kind of writing, and a book's outline
 * turned into a band of sections. Every value here is read from the site's
 * own files (bible/books.json, theology/bible-books.json and each book's
 * intro.json); nothing about a book is written here.
 */
import { fetchJson } from "@/lib/fetch-json";

/** The traditional sections of the Protestant canon, by position in books.json. */
export const CANON_SECTIONS: { id: string; label: string; short: string; from: number; to: number }[] = [
  { id: "law", label: "The Law", short: "Law", from: 0, to: 4 },
  { id: "history", label: "History", short: "History", from: 5, to: 16 },
  { id: "poetry", label: "Poetry and wisdom", short: "Poetry", from: 17, to: 21 },
  { id: "prophets", label: "The Prophets", short: "Prophets", from: 22, to: 38 },
  { id: "gospels", label: "Gospels and Acts", short: "Gospels", from: 39, to: 43 },
  { id: "letters", label: "The Letters", short: "Letters", from: 44, to: 64 },
  { id: "revelation", label: "Revelation", short: "Revelation", from: 65, to: 65 },
];

export const sectionOf = (index: number) => CANON_SECTIONS.find((s) => index >= s.from && index <= s.to) ?? CANON_SECTIONS[0];

/** One book's line in theology/bible-books.json (the Study Bible's short facts). */
export interface BookMeta {
  book: string;
  genre: string;
  occasion: string;
}

const isMeta = (x: unknown): x is { books: BookMeta[] } =>
  !!x && typeof x === "object" && Array.isArray((x as { books?: unknown }).books);

let metaOnce: Promise<Record<string, BookMeta>> | null = null;
/** Each book's kind and one line, by book name. Fetched once. */
export function fetchBookMeta(): Promise<Record<string, BookMeta>> {
  if (!metaOnce) {
    metaOnce = fetchJson("/theology/bible-books.json", isMeta)
      .then((d) => Object.fromEntries(d.books.map((b) => [b.book, b])))
      .catch((e) => {
        metaOnce = null;
        throw e;
      });
  }
  return metaOnce;
}

export type Kind = "story" | "song" | "prophet" | "gospel" | "letter";

/** The site's eight genres, folded into the five kinds the shelf on Home colours. */
export const KIND_OF: Record<string, Kind> = {
  Narrative: "story",
  Law: "story",
  Poetry: "song",
  Wisdom: "song",
  Prophecy: "prophet",
  Apocalyptic: "prophet",
  Gospel: "gospel",
  Epistle: "letter",
};

export const KINDS: { kind: Kind; label: string }[] = [
  { kind: "story", label: "Law and story" },
  { kind: "song", label: "Poetry and wisdom" },
  { kind: "prophet", label: "Prophets and visions" },
  { kind: "gospel", label: "Gospels" },
  { kind: "letter", label: "Letters" },
];

/** The genre's name in plain words. */
export const GENRE_NAME: Record<string, string> = {
  Narrative: "Story",
  Law: "Law",
  Poetry: "Poetry",
  Wisdom: "Wisdom",
  Prophecy: "Prophecy",
  Apocalyptic: "Apocalyptic",
  Gospel: "Gospel",
  Epistle: "Letter",
};

/** A spine's width on a shelf grows with the book's chapters, gently. */
export const growOf = (chapters: number) => 4 + Math.sqrt(chapters);

/** A steady, varied height for each spine, so a shelf looks like books and not a bar chart. */
export const heightOf = (i: number) => 74 + ((i * 37) % 7) * 4;

/** The first sentence of a note, exactly as written. */
export function firstSentence(text: string | undefined): string {
  const t = String(text ?? "").replace(/\s+/g, " ").trim();
  // A full stop that ends a sentence is followed by a space and a capital or an opening quote.
  const m = t.match(/^(.+?[.?!])(?=\s+["“‘(A-Z])/);
  return m ? m[1] : t;
}

// ── a book's outline as a band ─────────────────────────────────────────────

export interface OutlinePart {
  range: string;
  title: string;
  summary: string;
}

export interface BandPart extends OutlinePart {
  /** Where the part starts and how much of the book it covers, as fractions of the whole (0 to 1). */
  start: number;
  share: number;
  /** The chapter (and, in a one-chapter book or a part that starts mid-chapter, the verse) it starts at. */
  chapter: number;
  verse?: number;
}

/** A part's place in its book: chapter and verse where it starts, and where it ends. */
function parseRange(range: string, oneChapter: boolean) {
  const m = range.match(/^(\d+)(?::(\d+))?(?:-(\d+)(?::(\d+))?)?$/);
  if (!m) return null;
  const a = +m[1];
  const b = m[2] !== undefined ? +m[2] : undefined;
  const c = m[3] !== undefined ? +m[3] : undefined;
  const d = m[4] !== undefined ? +m[4] : undefined;
  if (oneChapter) {
    // "1:4-7" or "4-7": verses of the book's one chapter.
    const from = b !== undefined ? b : a;
    const to = b !== undefined ? (c ?? b) : (c ?? a);
    return { chapter: 1, verse: from, end: to };
  }
  if (b === undefined) return { chapter: a, verse: undefined, end: c ?? a };
  // "11:10-26" stays inside chapter 11; "1:1-2:3" runs into chapter 2.
  return { chapter: a, verse: b, end: d !== undefined ? (c as number) : a };
}

/**
 * A book's outline (its intro.json "structure") as a band of parts. A part's
 * width is how much of the book it covers: chapters, with a part that starts
 * part-way into a chapter placed by its verse (a chapter counted as about
 * thirty verses, which is close enough for a drawing). In a one-chapter book
 * the parts are measured in verses. The band always runs the whole book.
 */
export function outlineBand(parts: OutlinePart[], chapters: number): BandPart[] {
  const oneChapter = chapters === 1;
  const parsed = parts.map((p) => ({ p, r: parseRange(p.range, oneChapter) }));
  if (parsed.length === 0 || parsed.some((x) => !x.r)) return [];
  const total = oneChapter ? Math.max(...parsed.map((x) => x.r!.end)) : chapters;
  const starts: number[] = [];
  for (const { r } of parsed) {
    const raw = oneChapter
      ? r!.verse! - 1
      : r!.chapter - 1 + (r!.verse && r!.verse > 1 ? Math.min(0.95, (r!.verse - 1) / 30) : 0);
    const prev = starts.length ? starts[starts.length - 1] : -Infinity;
    starts.push(Math.max(raw, prev + total * 0.004));
  }
  starts[0] = 0;
  return parsed.map(({ p, r }, i) => {
    const end = i + 1 < starts.length ? starts[i + 1] : total;
    return {
      ...p,
      start: starts[i] / total,
      share: Math.max(0, end - starts[i]) / total,
      chapter: r!.chapter,
      verse: oneChapter || (r!.verse && r!.verse > 1) ? r!.verse : undefined,
    };
  });
}

/** "1:1-2:3" read aloud: "1:1 to 2:3". */
export const rangeWords = (range: string) => range.replace(/-/g, " to ");

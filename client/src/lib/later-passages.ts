/**
 * The two long passages the Berean Standard Bible prints but the earliest
 * manuscripts do not include: Mark 16:9-20 and John 7:53-8:11. The chapter
 * data flags each of their verses `later` and keeps its words; the reader
 * prints the words and sets a plain bracketed line before the first verse and
 * after the last, so the reader can see where the passage begins and ends.
 *
 * The wording follows the site's own notes on Mark 16, John 7 and John 8.
 * A verse the critical text leaves out altogether (Acts 8:37 and the rest)
 * has no words, and keeps its own "[Not in the earliest manuscripts]" line.
 * A test holds this table to the flags in client/public/bible/text.
 */

export interface LaterPassage {
  book: string;
  /** [chapter, verse] of the first and last verse. */
  from: [number, number];
  to: [number, number];
  /** How the passage is named in the notes. */
  name: string;
}

export const LATER_PASSAGES: LaterPassage[] = [
  { book: "mark", from: [16, 9], to: [16, 20], name: "Mark 16:9-20" },
  { book: "john", from: [7, 53], to: [8, 11], name: "John 7:53-8:11" },
];

export interface LaterMarks {
  /** Verse number → the line set before it. */
  before: Map<number, string>;
  /** Verse number → the line set after it. */
  after: Map<number, string>;
}

const inside = (p: LaterPassage, c: number, v: number) =>
  (c > p.from[0] || (c === p.from[0] && v >= p.from[1])) && (c < p.to[0] || (c === p.to[0] && v <= p.to[1]));

/**
 * The lines a chapter shows: the opening line before the first of the
 * passage's verses the chapter holds (so a reader who opens John 8 sees it
 * too), and the closing line after its last verse, in the chapter where the
 * passage ends (and only when its last verse is shown).
 */
export function laterMarks(bookSlug: string, chapter: number, verses: { v: number; t: string }[]): LaterMarks {
  const before = new Map<number, string>();
  const after = new Map<number, string>();
  for (const p of LATER_PASSAGES) {
    if (p.book !== bookSlug) continue;
    const here = verses.filter((x) => x.t && inside(p, chapter, x.v));
    if (!here.length) continue;
    before.set(here[0].v, `[The earliest manuscripts do not include ${p.name}.]`);
    if (chapter === p.to[0] && here[here.length - 1].v === p.to[1]) after.set(here[here.length - 1].v, `[End of ${p.name}.]`);
  }
  return before.size || after.size ? { before, after } : NONE;
}

/** The passage a printed verse belongs to, if any (the verse panel's line). */
export function laterPassageOf(bookSlug: string, chapter: number, verse: number): LaterPassage | null {
  return LATER_PASSAGES.find((p) => p.book === bookSlug && inside(p, chapter, verse)) ?? null;
}

/** The style of the line, shared by every reader that prints it. */
export const LATER_LINE_STYLE = {
  display: "block",
  margin: "0.5em 0",
  fontFamily: "var(--U)",
  fontSize: "14px",
  fontStyle: "italic",
  lineHeight: 1.5,
  color: "var(--ink-muted)",
} as const;

const NONE: LaterMarks = { before: new Map(), after: new Map() };

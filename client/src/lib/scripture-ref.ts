/**
 * The site's one Scripture reference parser (master plan 7.1).
 *
 *   parseScriptureRef("jn 3 16")      -> John, [{ c1: 3, v1: 16, c2: 3, v2: 16 }]
 *   parseScriptureRef("1 cor 13")     -> 1 Corinthians, [{ c1: 13, v1: 1, c2: 13, v2: Infinity }]
 *   parseScriptureRef("Hezekiah 1:1") -> null
 *
 * It reads "Book C", "Book C-C", "Book C:V", "Book C:V-V", "Book C:V-C:V",
 * verse lists within a chapter ("Psalm 71:9, 17-18"), chapters joined by
 * semicolons ("Romans 5:1; 8:28"), loose spacing ("jn 3 16"), "." between
 * chapter and verse ("John 3.16"), a part of a verse ("Romans 3:23b", read as
 * the whole verse), and a lone number in a one-chapter book as a verse
 * ("Jude 3"). Book names come from data/scripture-books.json with the
 * abbreviations people write (jn, rom, 1 cor, ps, prov, gen, matt, mk, lk).
 * Anything else, or a chapter or verse that cannot exist, is null.
 *
 * scripts/lib/bsb.mjs reads the same book table with the same grammar, and
 * scripture-ref.test.ts runs both on one fixture list: change one, change both.
 * The Study Bible's own codes ("Jhn.3.16") stay with parseRef in lib/bible.ts.
 */
import BOOK_TABLE from "@/data/scripture-books.json";
import { chapterHref, type BibleBook } from "@/lib/bible";

type BookRow = BibleBook & { aliases: string[] };

/** One stretch of text, from c1:v1 through c2:v2; v2 is Infinity when it runs to the chapter's end. */
export interface RefSpan {
  c1: number;
  v1: number;
  c2: number;
  v2: number;
}

export interface ScriptureRef {
  book: BibleBook;
  parts: RefSpan[];
}

/** The sixty-six books in canon order, the same table as /bible/books.json. */
export const SCRIPTURE_BOOKS: readonly BibleBook[] = (BOOK_TABLE as BookRow[]).map((r) => ({
  code: r.code,
  slug: r.slug,
  name: r.name,
  testament: r.testament,
  chapters: r.chapters,
}));

/** A book name as the alias table stores it: "1 Cor." and "I Corinthians" become "1 cor" and "1 corinthians". */
export function bookKey(name: string): string {
  return name
    .toLowerCase()
    .replace(/\./g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^(?:first|1st|i) /, "1 ")
    .replace(/^(?:second|2nd|ii) /, "2 ")
    .replace(/^(?:third|3rd|iii) /, "3 ")
    .replace(/^([1-3])(?=[a-z])/, "$1 ");
}

const BY_KEY = new Map<string, BibleBook>();
(BOOK_TABLE as BookRow[]).forEach((row, i) => {
  for (const a of [row.name, row.slug.replace(/-/g, " "), row.code, ...row.aliases]) BY_KEY.set(bookKey(a), SCRIPTURE_BOOKS[i]);
});

/** "Ps", "1 cor", "Song of Songs" -> the book; null when no book goes by that name. */
export function findBook(name: string): BibleBook | null {
  return BY_KEY.get(bookKey(name)) ?? null;
}

/** The book (letters, with an optional 1-3 in front), then everything from the first digit after it. */
const SPLIT = /^(.*?[a-z][a-z.]*)\s*(\d[\s\S]*)$/i;
const CHAPTERS = /^(\d+)(?:-(\d+))?$/;
/** A verse may carry a part letter ("23b"); the span is the whole verse. */
const VERSES = /^(\d+)[a-c]?(?:-(?:(\d+):)?(\d+)[a-c]?)?$/;

/** A Scripture reference -> its book and the stretches of text it names; null when it is not one. */
export function parseScriptureRef(input: string): ScriptureRef | null {
  if (typeof input !== "string") return null;
  const m = input.trim().replace(/[‐-―−]/g, "-").match(SPLIT);
  if (!m) return null;
  const book = findBook(m[1]);
  if (!book) return null;
  const loc = m[2]
    .replace(/\s*([:.,;-])\s*/g, "$1")
    .replace(/^(\d+)\s+(?=\d)/, "$1:")
    .replace(/(\d)\.(?=\d)/g, "$1:");
  if (/[^\d:,;a-c-]/.test(loc)) return null;
  const parts: RefSpan[] = [];
  for (const seg of loc.split(";")) {
    const colon = seg.indexOf(":");
    if (colon < 0) {
      const r = seg.match(CHAPTERS);
      if (!r) return null;
      const a = Number(r[1]);
      const b = r[2] ? Number(r[2]) : a;
      // A one-chapter book is cited by verse: "Jude 3" is Jude 1:3, "Jude 1" the whole letter.
      if (book.chapters === 1 && seg !== "1") parts.push({ c1: 1, v1: a, c2: 1, v2: b });
      else parts.push({ c1: a, v1: 1, c2: b, v2: Infinity });
      continue;
    }
    const chap = seg.slice(0, colon);
    if (!/^\d+$/.test(chap)) return null;
    let c = Number(chap);
    for (const v of seg.slice(colon + 1).split(",")) {
      const r = v.match(VERSES);
      if (!r) return null;
      const v1 = Number(r[1]);
      const c2 = r[2] ? Number(r[2]) : c;
      const v2 = r[3] ? Number(r[3]) : v1;
      parts.push({ c1: c, v1, c2, v2 });
      c = c2;
    }
  }
  for (const p of parts) {
    if (p.c1 < 1 || p.c2 > book.chapters || p.c2 < p.c1 || p.v1 < 1 || p.v2 < 1) return null;
    if (p.c2 === p.c1 && p.v2 < p.v1) return null;
  }
  return parts.length ? { book, parts } : null;
}

/** A parsed reference as the site prints it: "John 3:16", "Psalm 23:1–3", "Romans 7:24–8:1, 5". */
export function formatRef(ref: ScriptureRef): string {
  const { book, parts } = ref;
  const oneChapter = parts.every((p) => p.c1 === parts[0].c1 && p.c2 === parts[0].c1);
  const name = book.slug === "psalms" && oneChapter ? "Psalm" : book.name;
  let out = "";
  let at = 0; // the chapter the last verse span ended in; 0 after a whole chapter
  for (const p of parts) {
    if (p.v2 === Infinity) {
      out += `${out ? "; " : ""}${p.c1}${p.c2 > p.c1 ? `–${p.c2}` : ""}`;
      at = 0;
      continue;
    }
    const end = p.c2 !== p.c1 ? `–${p.c2}:${p.v2}` : p.v2 !== p.v1 ? `–${p.v2}` : "";
    out += !out ? `${p.c1}:${p.v1}${end}` : p.c1 === at ? `, ${p.v1}${end}` : `; ${p.c1}:${p.v1}${end}`;
    at = p.c2;
  }
  return `${name} ${out}`;
}

/**
 * The Study Bible page for a reference: its first chapter, at its first verse
 * when it names one (`verse: false` for the chapter's top). Null when it is
 * not a reference.
 */
export function refHref(ref: string | ScriptureRef, opts: { verse?: boolean } = {}): string | null {
  const r = typeof ref === "string" ? parseScriptureRef(ref) : ref;
  if (!r) return null;
  const p = r.parts[0];
  return chapterHref(r.book.slug, p.c1, opts.verse === false || p.v2 === Infinity ? undefined : p.v1);
}

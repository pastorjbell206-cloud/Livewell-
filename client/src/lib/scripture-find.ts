/**
 * Finding Scripture references inside running text, so a page can make them
 * live (VerseRef, master plan 7.1): "as Paul says in Romans 8:28, ..." ->
 * "as Paul says in " + [Romans 8:28] + ", ...".
 *
 * The finder only proposes; the site's one parser decides. Every candidate
 * goes through parseScriptureRef, and anything it cannot read stays text. To
 * keep ordinary prose from turning into links, a candidate needs a capitalized
 * book name, and a short form ("Rom", "1 Cor.", "Ps") needs a chapter and
 * verse ("Rom 8:28"); a full name may stand with a chapter alone ("Romans 8",
 * "Psalm 23", "Matthew 5-7"). It reads verse ranges and lists ("Psalm 71:9,
 * 17-18"), cross-chapter ranges ("Romans 7:24-8:1"), chapters joined by
 * semicolons ("Romans 5:1; 8:28"), and one "and" in the same book ("Malachi
 * 3:1-4 and 4:5-6", "Genesis 5 and 11").
 */
import BOOK_TABLE from "@/data/scripture-books.json";
import { parseScriptureRef, type ScriptureRef } from "@/lib/scripture-ref";

/** A stretch of text that reads as a reference: where it is, what it says, and what it names. */
export interface FoundRef {
  start: number;
  end: number;
  /** The words as written ("Rom. 8:28"). */
  text: string;
  /** What the parser was given ("Rom. 8:28", or "Malachi 3:1-4; 4:5-6" for "Malachi 3:1-4 and 4:5-6"). */
  reference: string;
  ref: ScriptureRef;
}

type Row = { name: string; code: string; aliases: string[] };

const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
/** "1 Corinthians" -> "Corinthians"; the numeral is matched separately. */
const base = (name: string) => name.replace(/^[1-3]\s?/, "");
const capitalized = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const alternation = (names: Set<string>) =>
  Array.from(names)
    .sort((a, b) => b.length - a.length)
    .map((n) => escape(n).replace(/ /g, "\\s+"))
    .join("|");

const FULL = new Set<string>(["Psalm", "Song of Songs"]);
const SHORT = new Set<string>();
for (const row of BOOK_TABLE as Row[]) {
  FULL.add(base(row.name));
  for (const a of [row.code, ...row.aliases]) {
    const b = capitalized(base(a));
    if (b.length > 1) SHORT.add(b);
  }
}
FULL.forEach((f) => SHORT.delete(f));

const N = "\\d{1,3}";
const DASH = "\\s?[-‐‑‒–—]\\s?";
const VERSE = `${N}[a-c]?`;
const SPAN = `${VERSE}(?:${DASH}(?:${N}:)?${VERSE})?`;
/** A verse list goes on only while each item is a number that is not the start of the next reference ("2 Cor"). */
const MORE = `(?:,\\s?${SPAN}(?![\\d:])(?!\\s?[A-Z]))*`;
const CV = `${N}:${SPAN}${MORE}(?:;\\s?${N}:${SPAN}${MORE})*`;
const C = `${N}(?:${DASH}${N})?`;
const PREFIX = "(?:[1-3]\\s?|(?:I{1,3}|First|Second|Third)\\s)";
/** Nothing word-like may run on from the end of a reference ("Proverbs 4:26: “Make ...” is fine). */
const END = "(?![A-Za-z0-9]|:\\d)";
/** "and 4:5-6", "and 23-26", "and 11" (never "and 2 Samuel"). */
const AND = `\\s+(?:and|&)\\s+(${N}:${SPAN}|${C})(?![\\d:])(?!\\s?[A-Z])`;

const FULL_RE = `\\b(${PREFIX}?(?:${alternation(FULL)}))\\s(${CV}|${C})${END}`;
const SHORT_RE = `\\b(${PREFIX}?(?:${alternation(SHORT)})\\.?)\\s?(${CV})${END}`;
const FIND = new RegExp(`${FULL_RE}|${SHORT_RE}`, "g");
const AND_RE = new RegExp(`^${AND}`);

/** Every reference in a stretch of text, in order; a candidate the parser cannot read is left out. */
export function findScriptureRefs(text: string): FoundRef[] {
  if (typeof text !== "string" || !/\d/.test(text)) return [];
  const out: FoundRef[] = [];
  FIND.lastIndex = 0;
  for (let m = FIND.exec(text); m; m = FIND.exec(text)) {
    const book = m[1] ?? m[3];
    const loc = m[2] ?? m[4];
    const reference = `${book} ${loc}`.replace(/\s+/g, " ");
    const ref = parseScriptureRef(reference);
    if (!ref) continue;
    let found: FoundRef = { start: m.index, end: m.index + m[0].length, text: m[0], reference, ref };
    // One "and" in the same book: verses after a verse ("23:1-9 and 23-26"), otherwise a new chapter.
    const and = text.slice(found.end).match(AND_RE);
    if (and) {
      const joined = `${reference}${!and[1].includes(":") && loc.includes(":") ? ", " : "; "}${and[1]}`;
      const both = parseScriptureRef(joined);
      if (both) {
        const end = found.end + and[0].length;
        found = { start: found.start, end, text: text.slice(found.start, end), reference: joined, ref: both };
      }
    }
    out.push(found);
    FIND.lastIndex = found.end;
  }
  return out;
}

/** Text cut at its references: plain strings between found references, in order. */
export function splitScriptureRefs(text: string): (string | FoundRef)[] {
  const found = findScriptureRefs(text);
  if (!found.length) return text ? [text] : [];
  const parts: (string | FoundRef)[] = [];
  let at = 0;
  for (const f of found) {
    if (f.start > at) parts.push(text.slice(at, f.start));
    parts.push(f);
    at = f.end;
  }
  if (at < text.length) parts.push(text.slice(at));
  return parts;
}

/**
 * The words a Scripture reference names, for the verse sheet (VerseRef): read
 * from the text-only chapter shards, never the full Study Bible chapters. The
 * same selection as passage() in scripts/lib/bsb.mjs.
 */
import { fetchChapterText, type BibleTextChapter } from "@/lib/bible";
import type { ScriptureRef } from "@/lib/scripture-ref";

/** A sheet shows a passage of up to this many chapters; a longer one is read in the Study Bible. */
export const SHEET_MAX_CHAPTERS = 3;

export interface PassageVerse {
  c: number;
  v: number;
  t: string;
  /** The critical text omits this verse (its text is empty). */
  later?: boolean;
}

/** The chapters a reference touches, in reading order, each once. */
export function chaptersOf(ref: ScriptureRef): number[] {
  const out: number[] = [];
  for (const p of ref.parts) for (let c = p.c1; c <= p.c2; c++) if (!out.includes(c)) out.push(c);
  return out;
}

/** The verses a reference names, in order, from its chapters' text. */
export function selectVerses(ref: ScriptureRef, chapters: Map<number, BibleTextChapter>): PassageVerse[] {
  const out: PassageVerse[] = [];
  for (const p of ref.parts) {
    for (let c = p.c1; c <= p.c2; c++) {
      for (const v of chapters.get(c)?.verses ?? []) {
        const after = c > p.c1 || v.v >= p.v1;
        const before = c < p.c2 || v.v <= p.v2;
        if (after && before) out.push(v.later ? { c, v: v.v, t: v.t, later: true } : { c, v: v.v, t: v.t });
      }
    }
  }
  return out;
}

/**
 * Fetch and select a reference's verses; null when the passage is longer than
 * a sheet should hold. An empty list means the chapter has no such verse
 * ("John 3:99" parses, since the parser does not know verse counts).
 */
export async function loadPassage(ref: ScriptureRef): Promise<PassageVerse[] | null> {
  const list = chaptersOf(ref);
  if (list.length > SHEET_MAX_CHAPTERS) return null;
  const texts = await Promise.all(list.map((c) => fetchChapterText(ref.book.slug, c)));
  return selectVerses(ref, new Map(list.map((c, i) => [c, texts[i]])));
}

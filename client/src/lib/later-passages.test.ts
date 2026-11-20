/**
 * The bracketed lines at Mark 16:9-20 and John 7:53-8:11 (lib/later-passages):
 * the table agrees with the flags in the Bible text, the lines fall where the
 * passages begin and end, and every other chapter gets none.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { LATER_PASSAGES, laterMarks, laterPassageOf } from "./later-passages";

const TEXT = path.resolve(__dirname, "../../public/bible/text");
const chapter = (book: string, c: number) =>
  JSON.parse(fs.readFileSync(path.join(TEXT, book, `${c}.json`), "utf8")) as { verses: { v: number; t: string; later?: boolean }[] };

describe("later passages", () => {
  it("names exactly the printed verses the data flags as later", () => {
    const flagged: string[] = [];
    for (const book of fs.readdirSync(TEXT)) {
      for (const f of fs.readdirSync(path.join(TEXT, book))) {
        const c = Number(f.replace(".json", ""));
        for (const v of chapter(book, c).verses) if (v.later && v.t) flagged.push(`${book} ${c}:${v.v}`);
      }
    }
    const named: string[] = [];
    for (const p of LATER_PASSAGES)
      for (let c = p.from[0]; c <= p.to[0]; c++)
        for (const v of chapter(p.book, c).verses)
          if (laterPassageOf(p.book, c, v.v) === p) named.push(`${p.book} ${c}:${v.v}`);
    expect(named.sort()).toEqual(flagged.sort());
    expect(flagged).toHaveLength(24);
  });

  it("opens and closes Mark 16:9-20 in Mark 16", () => {
    const m = laterMarks("mark", 16, chapter("mark", 16).verses);
    expect([...m.before]).toEqual([[9, "[The earliest manuscripts do not include Mark 16:9-20.]"]]);
    expect([...m.after]).toEqual([[20, "[End of Mark 16:9-20.]"]]);
  });

  it("opens John 7:53-8:11 in John 7 and again in John 8, and closes it after 8:11", () => {
    const seven = laterMarks("john", 7, chapter("john", 7).verses);
    expect([...seven.before]).toEqual([[53, "[The earliest manuscripts do not include John 7:53-8:11.]"]]);
    expect(seven.after.size).toBe(0);
    const eight = laterMarks("john", 8, chapter("john", 8).verses);
    expect([...eight.before]).toEqual([[1, "[The earliest manuscripts do not include John 7:53-8:11.]"]]);
    expect([...eight.after]).toEqual([[11, "[End of John 7:53-8:11.]"]]);
  });

  it("gives every other chapter no line at all", () => {
    for (const [book, c] of [["john", 3], ["mark", 15], ["mark", 7], ["acts", 8], ["genesis", 1], ["luke", 22]] as const) {
      const m = laterMarks(book, c, chapter(book, c).verses);
      expect(m.before.size + m.after.size, `${book} ${c}`).toBe(0);
    }
  });
});

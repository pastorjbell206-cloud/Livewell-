/**
 * The reference finder proposes, the parser decides: references in running
 * text are found where they are written, read as the parser reads them, and
 * prose that only looks like a reference stays prose.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
import { findScriptureRefs, splitScriptureRefs } from "./scripture-find";
import { formatRef } from "./scripture-ref";

const texts = (s: string) => findScriptureRefs(s).map((f) => f.text);
const read = (s: string) => findScriptureRefs(s).map((f) => formatRef(f.ref));

describe("findScriptureRefs", () => {
  it("finds references in a sentence, as written", () => {
    const s = "In the Berean Standard Bible it reads: “if My people ... heal their land” (2 Chronicles 7:14). Compare John 3:16-17 and Romans 8.";
    expect(texts(s)).toEqual(["2 Chronicles 7:14", "John 3:16-17", "Romans 8"]);
    const [first] = findScriptureRefs(s);
    expect(s.slice(first.start, first.end)).toBe("2 Chronicles 7:14");
    expect(first.ref.book.slug).toBe("2-chronicles");
  });

  it("reads ranges, lists, chapter ranges, and semicolons", () => {
    expect(read("Psalm 71:9, 17-18 says it twice.")).toEqual(["Psalm 71:9, 17–18"]);
    expect(read("See Romans 7:24-8:1 for the turn.")).toEqual(["Romans 7:24–8:1"]);
    expect(read("Read Matthew 5–7 in one sitting.")).toEqual(["Matthew 5–7"]);
    expect(read("(Romans 5:1; 8:28)")).toEqual(["Romans 5:1; 8:28"]);
    expect(read("(Deuteronomy 11:16-17; 28:21-24, 38)")).toEqual(["Deuteronomy 11:16–17; 28:21–24, 38"]);
  });

  it("joins one 'and' in the same book, and never across books", () => {
    expect(read("Malachi 3:1-4 and 4:5-6")).toEqual(["Malachi 3:1–4; 4:5–6"]);
    expect(read("Psalm 136:1-9 and 23-26")).toEqual(["Psalm 136:1–9, 23–26"]);
    expect(read("the genealogies of Genesis 5 and 11")).toEqual(["Genesis 5; 11"]);
    expect(texts("Genesis 1 and 2 Samuel 7 tell it")).toEqual(["Genesis 1", "2 Samuel 7"]);
    expect(texts("John 1:1 and John 1:14")).toEqual(["John 1:1", "John 1:14"]);
  });

  it("does not swallow the numeral of the next book", () => {
    expect(texts("John 11:17-27, 1 Corinthians 15:50-58, Psalm 23")).toEqual(["John 11:17-27", "1 Corinthians 15:50-58", "Psalm 23"]);
    expect(texts("Romans 8:28, 2 Cor 4:17")).toEqual(["Romans 8:28", "2 Cor 4:17"]);
  });

  it("knows numbered books written every way", () => {
    expect(read("1 John 4:8, 1John 4:19, I John 1:9, First Corinthians 13, II Kings 22")).toEqual([
      "1 John 4:8",
      "1 John 4:19",
      "1 John 1:9",
      "1 Corinthians 13",
      "2 Kings 22",
    ]);
  });

  it("takes a short form only with a chapter and verse", () => {
    expect(read("Rom 8:28, Ps 23:1, 1 Cor. 13:4, Jn 3:16, Isa 53:5")).toEqual([
      "Romans 8:28",
      "Psalm 23:1",
      "1 Corinthians 13:4",
      "John 3:16",
      "Isaiah 53:5",
    ]);
    expect(texts("Gen 1 and Ex 3 are not references here, and Num 4 is a number.")).toEqual([]);
  });

  it("reads a one-chapter book by verse", () => {
    expect(read("Jude 3 and Philemon 15-16")).toEqual(["Jude 1:3", "Philemon 1:15–16"]);
  });

  it("lets a reference end at a colon before a quotation", () => {
    expect(texts("the father in Proverbs 4:26: “Make straight paths”")).toEqual(["Proverbs 4:26"]);
  });

  it("leaves prose, dates, and books outside the canon alone", () => {
    expect(texts("In 325 the bishops met; by 451 Chalcedon had spoken.")).toEqual([]);
    expect(texts("Chapter 11 of the confession, Article 6, Question 2")).toEqual([]);
    expect(texts("Wisdom 2:12-20 and 2 Maccabees 12:39-45")).toEqual([]);
    expect(texts("Psalm 151 and John 22:1 do not exist")).toEqual([]);
    expect(texts("Johnson 3:16 and Marks 2:1")).toEqual([]);
    expect(texts("lowercase john 3:16 is a search query, not prose")).toEqual([]);
    expect(texts("Psalm 23:1as")).toEqual([]);
  });

  it("finds every reference the context guides' key texts hold", () => {
    const dir = path.resolve(__dirname, "../../public/context/guides");
    let n = 0;
    for (const f of fs.readdirSync(dir).filter((x) => x.endsWith(".json"))) {
      const g = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8")) as { keyTexts?: string[] };
      for (const t of g.keyTexts ?? []) {
        n++;
        expect(texts(t), `${f}: ${t}`).toEqual([t]);
      }
    }
    expect(n).toBeGreaterThan(40);
  });
});

describe("splitScriptureRefs", () => {
  it("returns the text around each reference, in order, losing nothing", () => {
    const s = "Paul wrote Romans 13:1-7 to a church in Rome.";
    const parts = splitScriptureRefs(s);
    expect(parts.map((p) => (typeof p === "string" ? p : `[${p.text}]`)).join("")).toBe("Paul wrote [Romans 13:1-7] to a church in Rome.");
  });

  it("returns the text alone when it holds no reference", () => {
    expect(splitScriptureRefs("No verses here.")).toEqual(["No verses here."]);
    expect(splitScriptureRefs("")).toEqual([]);
  });
});

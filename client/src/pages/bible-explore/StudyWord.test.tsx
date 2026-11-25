/**
 * /study/word: the word index says only what the Study Bible's chapters
 * hold; the page shows the dictionary entry as the Study Bible does, a bar
 * for each book, and the verses, each opening its chapter.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders } from "@/test/harness";
import { safeDefinition, type BibleBook, type BibleChapter, type LexEntry } from "@/lib/bible";
import { findWords, markMeaning, strongKey, strongLabel, type WordIndex, type WordRow, type WordUse } from "@/lib/bibleStudy";
import { WordFinder, WordView } from "./StudyWord";

const PUBLIC = path.resolve(__dirname, "../../../../client/public");
const json = (file: string) => JSON.parse(fs.readFileSync(path.join(PUBLIC, file), "utf8"));
const BOOKS: BibleBook[] = json("bible/books.json");
const INDEX: WordIndex = json("bible/words/index.json");
const lexOf = (key: string): LexEntry => json(`bible/lex/${key[0]}/${Math.floor(parseInt(key.slice(1, 5), 10) / 250)}.json`)[key];
const useOf = (key: string): WordUse => json(`bible/words/occ/${key[0]}/${Math.floor(parseInt(key.slice(1, 5), 10) / INDEX.bucket)}.json`)[key];

function publicFetch(): typeof fetch {
  return vi.fn(async (input: RequestInfo | URL) => {
    const file = path.join(PUBLIC, String(input).split("?")[0]);
    if (!file.startsWith(PUBLIC) || !fs.existsSync(file)) return new Response("", { status: 404 });
    return new Response(fs.readFileSync(file, "utf8"), { status: 200, headers: { "content-type": "application/json" } });
  }) as unknown as typeof fetch;
}

afterEach(() => vi.unstubAllGlobals());

describe("the word index", () => {
  it("counts a word, book by book and verse by verse, exactly as the Study Bible's chapters hold it", () => {
    // agapaō, a word the lexicon's own list of 60 verses cuts short.
    const key = "G0025";
    const use = useOf(key);
    const rows: WordRow[] = use.v ?? Array.from({ length: use.p! }, (_, i) => json(`bible/words/occ/G/p/${key}-${i}.json`) as WordRow[]).flat();
    let n = 0;
    const byBook = new Map<number, number>();
    const verses: string[] = [];
    BOOKS.forEach((b, bi) => {
      if (b.testament !== "NT") return;
      for (let c = 1; c <= b.chapters; c++) {
        for (const v of (json(`bible/ch/${b.slug}/${c}.json`) as BibleChapter).verses) {
          if (v.later) continue;
          const here = v.w.filter((w) => w[3] === key).length;
          if (!here) continue;
          n += here;
          byBook.set(bi, (byBook.get(bi) ?? 0) + here);
          verses.push(`${bi}.${c}.${v.v}`);
        }
      }
    });
    expect(use.n).toBe(n);
    expect(use.b).toEqual(Array.from(byBook.entries()));
    expect(rows.map((r) => `${r[0]}.${r[1]}.${r[2]}`)).toEqual(verses);
    expect(rows.length).toBeGreaterThan(lexOf(key).r.length);
    // Each row names the meanings the word has in that verse.
    const [b, c, v, ...gi] = rows[0];
    const first = (json(`bible/ch/${BOOKS[b].slug}/${c}.json`) as BibleChapter).verses.find((x) => x.v === v)!;
    expect(gi.map((i) => use.g[i])).toEqual(first.w.filter((w) => w[3] === key).map((w) => w[2]));
  });

  it("splits a common word into pages, with the row each book begins at", () => {
    const key = "G2316"; // theos
    const use = useOf(key);
    expect(use.v).toBeUndefined();
    expect(use.p).toBe(Math.ceil(use.vn! / INDEX.page));
    const rows = Array.from({ length: use.p! }, (_, i) => json(`bible/words/occ/G/p/${key}-${i}.json`) as WordRow[]);
    expect(rows.slice(0, -1).every((p) => p.length === INDEX.page)).toBe(true);
    const flat = rows.flat();
    expect(flat).toHaveLength(use.vn!);
    for (const [book, start] of use.s!) {
      expect(flat[start][0]).toBe(book);
      if (start > 0) expect(flat[start - 1][0]).not.toBe(book);
    }
    expect(use.b.reduce((t, [, k]) => t + k, 0)).toBe(use.n);
  });

  it("keeps every file small, and lists the files that exist so none is asked for and not found", () => {
    const walk = (dir: string): string[] => fs.readdirSync(dir, { withFileTypes: true }).flatMap((d) => (d.isDirectory() ? walk(path.join(dir, d.name)) : [path.join(dir, d.name)]));
    const files = walk(path.join(PUBLIC, "bible/words"));
    for (const f of files) expect(fs.statSync(f).size, f).toBeLessThan(100_000);
    for (const b of INDEX.buckets) expect(fs.existsSync(path.join(PUBLIC, `bible/words/occ/${b}.json`)), b).toBe(true);
    for (const k of INDEX.find) expect(fs.existsSync(path.join(PUBLIC, `bible/words/find/${k}.json`)), k).toBe(true);
  });

  it("reads a Strong's number however it is typed, and nothing else", () => {
    expect(strongKey("g26")).toBe("G0026");
    expect(strongKey("H2617")).toBe("H2617");
    expect(strongKey("h7225g")).toBe("H7225G");
    expect(strongKey("love")).toBeNull();
    expect(strongKey("G12345")).toBeNull();
    expect(strongLabel("G0026")).toBe("G26");
  });

  it("marks the word only where the sentence holds its word-for-word meaning", () => {
    expect(markMeaning("In the beginning God created the heavens and the earth.", ["he created"]).filter((p) => p.mark).map((p) => p.text)).toEqual(["created"]);
    expect(markMeaning("For God so loved the world", ["only begotten"]).some((p) => p.mark)).toBe(false);
    expect(markMeaning("Beloved, let us love one another", ["love"]).filter((p) => p.mark).map((p) => p.text)).toEqual(["love"]);
    expect(markMeaning("abc", ["love"]).map((p) => p.text).join("")).toBe("abc");
    // "loyalty your": the sentence says "kindness", so nothing is marked, least of all "your".
    expect(markMeaning("Your servant has found favor in your sight, and you have shown me great kindness", ["loyalty your"]).some((p) => p.mark)).toBe(false);
    expect(markMeaning("show your loyalty to me", ["is loyalty your"]).filter((p) => p.mark).map((p) => p.text)).toEqual(["loyalty"]);
  });
});

describe("finding a word", () => {
  it("finds a word by its meaning, by its transliteration and by its number", async () => {
    vi.stubGlobal("fetch", publicFetch());
    const love = await findWords("love", INDEX);
    expect(love.map((r) => r[0])).toContain("G0026");
    expect(love.every((r) => /\blove/i.test(r[3]) || r[2].toLowerCase().startsWith("love"))).toBe(true);
    expect((await findWords("agape", INDEX))[0][0]).toBe("G0026");
    expect(await findWords("zzqq", INDEX)).toEqual([]);

    renderWithProviders(<WordFinder index={INDEX} />);
    expect(screen.getByText(new RegExp(`${INDEX.words.G.toLocaleString("en-US")} Greek words`))).toBeTruthy();
    fireEvent.change(screen.getByLabelText("Find a word"), { target: { value: "G26" } });
    const list = await screen.findByRole("list", { name: "Words that match" });
    const link = within(list).getByRole("link");
    expect(link.getAttribute("href")).toBe("/study/word/G0026");
    expect(link.textContent).toContain(lexOf("G0026").tr);
    fireEvent.change(screen.getByLabelText("Find a word"), { target: { value: "lovingkind" } });
    await waitFor(() => expect(screen.getByRole("status").textContent).toMatch(/match/));
  });
});

describe("a word's page", () => {
  it("shows the dictionary entry exactly as the Study Bible does, the count, a bar for each book, and verses that open their chapters", async () => {
    vi.stubGlobal("fetch", publicFetch());
    const key = "G0026";
    const entry = lexOf(key);
    const use = useOf(key);
    renderWithProviders(<WordView strong={key} entry={entry} use={use} books={BOOKS} />);
    // The entry is the lexicon's own, through the Study Bible's filter, with nothing added.
    const holder = document.createElement("div");
    holder.innerHTML = safeDefinition(entry.d);
    expect(document.querySelector(".bx-def")!.innerHTML).toBe(holder.innerHTML);
    expect(screen.getByText(new RegExp(`Used ${use.n.toLocaleString("en-US")} times in the Greek New Testament, in ${use.b.length} books`))).toBeTruthy();
    // A bar for each book, as a button.
    const bars = within(document.querySelector(".bx-bars") as HTMLElement).getAllByRole("button");
    expect(bars).toHaveLength(use.b.length);
    expect(bars.map((b) => b.querySelector(".bx-line__name")!.textContent)).toEqual(use.b.map(([b]) => BOOKS[b].name));
    // Verses: twenty at a time, each a link to its chapter and verse, with its words in the BSB.
    const rows = use.v!;
    await waitFor(() => expect(document.querySelectorAll(".bx-verses li")).toHaveLength(20));
    const first = document.querySelector(".bx-verses li") as HTMLElement;
    const [b, c, v] = rows[0];
    expect(within(first).getByRole("link").getAttribute("href")).toBe(`/study/bible/${BOOKS[b].slug}/${c}#v${v}`);
    const text = (json(`bible/text/${BOOKS[b].slug}/${c}.json`) as { verses: { v: number; t: string }[] }).verses.find((x) => x.v === v)!.t;
    await waitFor(() => expect(first.querySelector(".bx-verse__t")!.textContent).toBe(text));
    fireEvent.click(screen.getByRole("button", { name: "Show 20 more" }));
    await waitFor(() => expect(document.querySelectorAll(".bx-verses li")).toHaveLength(40));
    // One book's verses.
    const [book, count] = use.b[use.b.length - 1];
    fireEvent.click(bars[bars.length - 1]);
    await waitFor(() => expect(screen.getByRole("heading", { level: 2, name: `Its verses in ${BOOKS[book].name}` })).toBeTruthy());
    const inBook = rows.filter((r) => r[0] === book);
    expect(inBook.reduce((n, r) => n + r.length - 3, 0)).toBe(count);
    expect(document.querySelectorAll(".bx-verses li")).toHaveLength(Math.min(20, inBook.length));
  });

  it("reads a common word's verses a page at a time, and one book's from the page that holds them", async () => {
    const fetched: string[] = [];
    const real = publicFetch();
    vi.stubGlobal("fetch", vi.fn((input: RequestInfo | URL) => (fetched.push(String(input)), real(input))));
    const key = "G2316";
    const use = useOf(key);
    renderWithProviders(<WordView strong={key} entry={lexOf(key)} use={use} books={BOOKS} />);
    await waitFor(() => expect(document.querySelectorAll(".bx-verses li")).toHaveLength(20));
    expect(fetched.filter((u) => u.includes("/occ/G/p/"))).toEqual([`/bible/words/occ/G/p/${key}-0.json`]);
    // Revelation is the last book: its verses are on the last pages.
    const [book, start] = use.s![use.s!.length - 1];
    fireEvent.click(screen.getByRole("button", { name: new RegExp(`^${BOOKS[book].name}`) }));
    await waitFor(() => expect(document.querySelector(".bx-verses li a")!.textContent).toMatch(new RegExp(`^${BOOKS[book].name} `)));
    expect(fetched).toContain(`/bible/words/occ/G/p/${key}-${Math.floor(start / INDEX.page)}.json`);
  });

  it("says so plainly when the dictionary's count and the chapters' differ, and when the chapters hold no verse", () => {
    const entry = lexOf("H0053");
    const use = useOf("H0053");
    expect(entry.n).not.toBe(use.n);
    const { unmount } = renderWithProviders(<WordView strong="H0053" entry={entry} use={use} books={BOOKS} />);
    expect(screen.getByText(new RegExp(`The dictionary's own count is ${entry.n}; the Study Bible's chapters hold ${use.n}`))).toBeTruthy();
    unmount();
    renderWithProviders(<WordView strong="H0025" entry={lexOf("H0025")} use={null} books={BOOKS} />);
    expect(screen.getByText("The Study Bible's chapters hold no verse for this word.")).toBeTruthy();
    expect(document.querySelector(".bx-bars")).toBeNull();
  });
});

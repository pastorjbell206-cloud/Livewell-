/**
 * /study/words: every key word of the book pages, each with its books' own
 * explanation; a language is named only where a book's sentence names it.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import fs from "node:fs";
import path from "node:path";

import { renderWithProviders } from "@/test/harness";
import { isWords, type WordsData } from "@/lib/bibleExplore";
import type { BookIntro } from "@/lib/bible-notes";
// @ts-expect-error a plain .mjs build library, read here to hold its rules
import { buildWords } from "../../../../scripts/lib/bible-explore.mjs";
import BibleWords, { WORD_GROUPS, WordsView } from "./BibleWords";

const PUBLIC = path.resolve(__dirname, "../../../../client/public");
const json = (file: string) => JSON.parse(fs.readFileSync(path.join(PUBLIC, file), "utf8"));
const DATA: WordsData = json("bible/explore/words.json");
const BOOKS: { slug: string; name: string; chapters: number }[] = json("bible/books.json");

afterEach(() => vi.unstubAllGlobals());

describe("the key words' data", () => {
  it("is what the build makes from the book pages today, and passes the page's guard", () => {
    expect(isWords(DATA)).toBe(true);
    expect(buildWords().data).toEqual(DATA);
    expect(isWords({ ...DATA, words: [] })).toBe(false);
    expect(new Set(DATA.words.map((w) => w.id)).size).toBe(DATA.words.length);
  });

  it("holds every key word of every book page, with the book's own explanation word for word", () => {
    let n = 0;
    for (const b of BOOKS) {
      const intro: BookIntro = json(`bible/notes/${b.slug}/intro.json`);
      const src = intro.teaching?.words ?? [];
      expect(DATA.without.includes(b.name), b.slug).toBe(src.length === 0);
      for (const w of src) {
        const hit = DATA.words.filter((x) => x.entries.some((e) => e.book === b.slug && e.line === w.line && (e.word ?? x.word) === w.word));
        expect(hit, `${b.slug}: ${w.word}`).toHaveLength(1);
      }
      n += src.length;
    }
    expect(DATA.words.reduce((t, w) => t + w.entries.length, 0)).toBe(n);
  });

  it("names a language only where a book's own sentence names it, and links only to chapters the book has", () => {
    for (const w of DATA.words) {
      const text = w.entries.map((e) => e.line).join(" ");
      expect(w.langs.includes("hebrew"), w.word).toBe(/\bHebrew\b/.test(text));
      expect(w.langs.includes("greek"), w.word).toBe(/\bGreek\b/.test(text));
      expect(w.langs.includes("aramaic"), w.word).toBe(/\bAramaic\b/.test(text));
      for (const e of w.entries) {
        const b = BOOKS.find((x) => x.slug === e.book)!;
        for (const r of e.refs) expect(r.ch >= 1 && r.ch <= b.chapters, `${w.word} in ${b.slug}`).toBe(true);
      }
      // Every word is in at least one group.
      expect(WORD_GROUPS.some((g) => g.has(w)), w.word).toBe(true);
    }
  });
});

describe("the way from a key word to the Study Bible's word", () => {
  const lex = (key: string) => json(`bible/lex/${key[0]}/${Math.floor(parseInt(key.slice(1, 5), 10) / 250)}.json`)[key] as { tr: string } | undefined;
  const letters = (x: string) => x.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z]/g, "");

  it("is given only where the sentence names the word's own transliteration after its language, and the book uses the word", () => {
    const linked = DATA.words.flatMap((w) => w.entries.filter((e) => e.strong).map((e) => ({ w, e })));
    expect(linked.length).toBeGreaterThan(50);
    for (const { w, e } of linked) {
      const entry = lex(e.strong!);
      expect(entry, `${w.word}: ${e.strong}`).toBeTruthy();
      const lang = e.strong![0] === "G" ? "Greek" : "(?:Hebrew|Aramaic)";
      const named = Array.from(e.line.matchAll(new RegExp(`\\b${lang} ([\\p{Ll}][\\p{L}\\p{M}'ʾʿ’.-]*)`, "gu"))).map((m) => letters(m[1]));
      expect(named, `${w.word} in ${e.book}`).toContain(letters(entry!.tr));
      // The Study Bible's own text uses that word in that very book.
      const at = BOOKS.findIndex((b) => b.slug === e.book);
      const use = json(`bible/words/occ/${e.strong![0]}/${Math.floor(parseInt(e.strong!.slice(1, 5), 10) / 100)}.json`)[e.strong!] as { b: [number, number][] };
      expect(use.b.some(([b]) => b === at), `${e.strong} in ${e.book}`).toBe(true);
    }
  });

  it("is withheld where two dictionary words are spelled alike, however likely one of them looks", () => {
    // Every linked transliteration belongs to one dictionary word only.
    const all = new Map<string, number>();
    for (const lang of ["H", "G"]) {
      for (const f of fs.readdirSync(path.join(PUBLIC, "bible/lex", lang))) {
        for (const [k, e] of Object.entries(json(`bible/lex/${lang}/${f}`) as Record<string, { tr: string }>)) all.set(`${k[0]}:${letters(e.tr)}`, (all.get(`${k[0]}:${letters(e.tr)}`) ?? 0) + 1);
      }
    }
    for (const w of DATA.words) for (const e of w.entries) if (e.strong) expect(all.get(`${e.strong[0]}:${letters(lex(e.strong)!.tr)}`), `${w.word}: ${e.strong}`).toBe(1);
  });

  it("is a link on the page, by the word's number", () => {
    renderWithProviders(<WordsView data={DATA} />);
    const gospel = DATA.words.find((w) => w.entries.some((e) => e.strong))!;
    const e = gospel.entries.find((x) => x.strong)!;
    const card = document.getElementById(gospel.id)!;
    const link = within(card).getAllByRole("link", { name: /^Study this word/ })[0];
    expect(link.getAttribute("href")).toBe(`/study/word/${e.strong}`);
  });
});

describe("the key words page", () => {
  it("lists every word under its group, with the way to its book", () => {
    renderWithProviders(<WordsView data={DATA} />);
    for (const g of WORD_GROUPS) {
      const words = DATA.words.filter(g.has);
      if (!words.length) continue;
      const head = screen.getByRole("heading", { level: 2, name: g.name });
      const section = head.closest("section") as HTMLElement;
      expect(within(section).getAllByRole("heading", { level: 3 })).toHaveLength(words.length);
    }
    const gospel = DATA.words.find((w) => w.word === "Gospel")!;
    const card = document.getElementById(gospel.id)!;
    expect(gospel.entries.length).toBeGreaterThan(1);
    for (const e of gospel.entries) expect(within(card).getByText(e.line)).toBeTruthy();
    expect(within(card).getByRole("link", { name: "On the Mark page" }).getAttribute("href")).toBe("/study/bible/mark#key-words");
    expect(within(card).getByRole("link", { name: "Mark 1:1" }).getAttribute("href")).toBe("/study/bible/mark/1#v1");
  });

  it("finds a word by its English, or by the Hebrew or Greek its book gives", () => {
    renderWithProviders(<WordsView data={DATA} />);
    fireEvent.change(screen.getByLabelText("Find a word"), { target: { value: "euangelion" } });
    const shown = Array.from(document.querySelectorAll(".bk-words h3")).map((h) => h.textContent);
    expect(shown).toContain("Gospel");
    expect(shown.length).toBeLessThan(20);
    fireEvent.change(screen.getByLabelText("Find a word"), { target: { value: "zzzz" } });
    expect(screen.getByText(/No key word matches that/)).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Show every word" }));
    expect(screen.getByRole("status").textContent).toBe(`Showing ${DATA.words.length} of ${DATA.words.length} words.`);
  });

  it("narrows to one language and to one testament", () => {
    renderWithProviders(<WordsView data={DATA} />);
    fireEvent.click(screen.getByRole("button", { name: "Hebrew" }));
    expect(document.querySelectorAll(".bk-words > li")).toHaveLength(DATA.words.filter((w) => w.langs.includes("hebrew")).length);
    fireEvent.click(screen.getByRole("button", { name: "New Testament" }));
    expect(document.querySelectorAll(".bk-words > li")).toHaveLength(DATA.words.filter((w) => w.langs.includes("hebrew") && w.testaments.includes("NT")).length);
  });

  it("loads its file, and says so plainly when the file does not come", async () => {
    const answer = (body: unknown) =>
      vi.fn(async (input: RequestInfo | URL) =>
        String(input).includes("/bible/explore/words.json") ? new Response(JSON.stringify(body), { status: 200 }) : new Response("{}", { status: 503 }),
      );
    vi.stubGlobal("fetch", answer(DATA));
    const { unmount } = renderWithProviders(<BibleWords />);
    expect(screen.getByRole("heading", { level: 1, name: "Key words of the Bible" })).toBeTruthy();
    await waitFor(() => expect(screen.getByLabelText("Find a word")).toBeTruthy());
    unmount();
    vi.stubGlobal("fetch", answer({ v: 1 }));
    renderWithProviders(<BibleWords />);
    await waitFor(() => expect(document.querySelector("[data-lw-failed]")).toBeTruthy());
  });
});

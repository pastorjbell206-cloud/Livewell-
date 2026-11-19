// @vitest-environment node
/**
 * The passage index (scripts/build-passage-index.mjs): what it holds for John
 * 3, that it never lists an essay that is not public, and that every address
 * in it is a real route on the site.
 */
import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { PASSAGE_KINDS, groupRows, isPassageRows, type PassageRow } from "./passageIndex";
// @ts-expect-error: plain JavaScript build helpers, no types
import { resolveHref } from "../../../scripts/lib/site-routes.mjs";
// @ts-expect-error: plain JavaScript build helpers, no types
import { loadEssayShelf } from "../../../scripts/lib/shelf.mjs";

const DIR = path.resolve(__dirname, "../../public/index/chapters");
const BOOKS: { slug: string; chapters: number }[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../public/bible/books.json"), "utf8"));

function allFiles(): { key: string; rows: PassageRow[] }[] {
  const out: { key: string; rows: PassageRow[] }[] = [];
  for (const book of fs.readdirSync(DIR)) {
    for (const f of fs.readdirSync(path.join(DIR, book))) {
      out.push({ key: `${book}/${f.replace(/\.json$/, "")}`, rows: JSON.parse(fs.readFileSync(path.join(DIR, book, f), "utf8")) });
    }
  }
  return out;
}

const files = allFiles();
const read = (key: string) => files.find((f) => f.key === key)?.rows;

describe("the passage index", () => {
  it("has John 3, with the kinds its libraries name it under", () => {
    const rows = read("john/3")!;
    expect(rows).toBeTruthy();
    const kinds = new Set(rows.map((r) => r.k));
    // An Honest Answer quotes John 3:16; New Birth has John 3:1-8 as a key text;
    // two study guides take a session's key Scripture from it; two catechism
    // questions have it as their proof text; the passage guide covers it.
    for (const k of ["question", "doctrine", "guide", "catechism", "tool"] as const) expect(kinds.has(k)).toBe(true);
    expect(rows).toContainEqual({ k: "doctrine", t: "New Birth", h: "/study/bible/doctrines/regeneration", p: "John 3:1–8" });
    expect(rows).toContainEqual(expect.objectContaining({ k: "catechism", h: "/family/catechism#q42" }));
  });

  it("names only real chapters, in the right shape and kind order", () => {
    const order = PASSAGE_KINDS.map((x) => x.k);
    for (const { key, rows } of files) {
      const [slug, n] = key.split("/");
      const book = BOOKS.find((b) => b.slug === slug);
      expect(book, key).toBeTruthy();
      expect(+n >= 1 && +n <= book!.chapters, key).toBe(true);
      expect(isPassageRows(rows), key).toBe(true);
      expect(rows.length, key).toBeGreaterThan(0);
      const ranks = rows.map((r) => order.indexOf(r.k));
      expect(ranks, key).toEqual([...ranks].sort((a, b) => a - b));
    }
  });

  it("never links to an essay that is not public", () => {
    const shelf = loadEssayShelf();
    for (const { key, rows } of files) {
      for (const r of rows.filter((x) => x.k === "essay")) {
        const slug = r.h.replace(/^\/writing\//, "");
        expect(shelf.isPublic(slug), `${key}: ${r.h}`).toBe(true);
      }
    }
  });

  it("links only to real routes on the site", () => {
    const seen = new Set<string>();
    for (const { rows } of files) for (const r of rows) seen.add(r.h);
    // site-routes has no manifest for the doctrine studies; they are checked against their own list.
    const doctrines = new Set<string>(JSON.parse(fs.readFileSync(path.resolve(__dirname, "../../public/bible/doctrines.json"), "utf8")).doctrines.map((d: { id: string }) => d.id));
    const real = (h: string) => {
      const m = h.match(/^\/study\/bible\/doctrines\/([a-z0-9-]+)$/);
      return m ? doctrines.has(m[1]) && fs.existsSync(path.resolve(__dirname, `../../public/bible/doctrines/${m[1]}.json`)) : resolveHref(h).status === "ok";
    };
    const bad = [...seen].filter((h) => !real(h));
    expect(bad).toEqual([]);
  });

  it("lists exactly the chapters that have a file (index/chapters.json)", () => {
    const list: Record<string, number[]> = JSON.parse(fs.readFileSync(path.resolve(DIR, "../chapters.json"), "utf8"));
    const listed = Object.entries(list).flatMap(([slug, ns]) => ns.map((n) => `${slug}/${n}`)).sort();
    expect(listed).toEqual(files.map((f) => f.key).sort());
    expect(list.matthew).not.toContain(8);
    expect(list.john).toContain(3);
  });

  it("groups a chapter's rows by kind, in order, leaving out kinds with nothing", () => {
    const groups = groupRows(read("john/3")!);
    expect(groups[0].name).toBe("Honest Answers");
    expect(groups.every((g) => g.rows.length > 0)).toBe(true);
    expect(groupRows([])).toEqual([]);
  });
});

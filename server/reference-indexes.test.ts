import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { liveEssays, extractScripture, KINDS } from "../scripts/build-reference-indexes.mjs";

// The Scripture index and the index of scholars (/scripture-index, /scholars)
// are generated from the site's own pages by scripts/build-reference-indexes.mjs.
// This keeps the committed outputs honest: they parse, every book is a real
// book named as the Study Bible names it, and every link lands on a live page.

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pub = (p: string) => path.join(root, "client/public", p);
const readJson = (p: string) => JSON.parse(readFileSync(pub(p), "utf8"));

type Ref = { title: string; url: string; kind: string; verses?: string[] };
type Book = { slug: string; name: string; testament: string; chapterCount: number; count: number; chapters?: Record<string, Ref[]> };

const BIBLE: { slug: string; name: string; chapters: number }[] = readJson("bible/books.json");
const manifest = readJson("indexes/manifest.json");
const scripture: { split: boolean; books: Book[] } = readJson("indexes/scripture-index.json");
const scholars: { name: string; sortKey: string; works: { title: string; citedIn: Ref[] }[]; discussedIn: Ref[] }[] =
  readJson("indexes/scholar-index.json").scholars;

const chaptersOf = (b: Book): Record<string, Ref[]> =>
  scripture.split ? readJson(`indexes/scripture/${b.slug}.json`).chapters : (b.chapters ?? {});

/** The route patterns in App.tsx's route table. */
const routes: string[] = [...readFileSync(path.join(root, "client/src/App.tsx"), "utf8").matchAll(/path="([^"]+)"/g)].map((m) => m[1]);
const routeMatches = (url: string) => {
  const p = url.split(/[?#]/)[0];
  return routes.some((r) => {
    const re = new RegExp(`^${r.replace(/:[A-Za-z]+/g, "[^/]+")}$`);
    return re.test(p);
  });
};

const live = new Set<string>((liveEssays() as { slug: string }[]).map((e) => e.slug));
const argumentSlugs = new Set(
  [...readFileSync(path.join(root, "client/src/data/argumentCases.ts"), "utf8").matchAll(/^\s{2}slug:\s*"([^"]+)"/gm)].map((m) => m[1])
);

/** Why a url is not a live page, or null when it is. */
function deadLink(url: string): string | null {
  if (!routeMatches(url)) return "no route in App.tsx";
  let m: RegExpMatchArray | null;
  if ((m = url.match(/^\/writing\/([a-z0-9-]+)$/))) return live.has(m[1]) ? null : "essay is not live";
  if ((m = url.match(/^\/theology\/doctrine\/([a-z0-9-]+)$/))) return existsSync(pub(`theology/${m[1]}.json`)) ? null : "no doctrine file";
  if ((m = url.match(/^\/studyguides\/([a-z0-9-]+)$/))) return existsSync(pub(`studyguides/${m[1]}.json`)) ? null : "no study guide file";
  if ((m = url.match(/^\/theology\/history\/([a-z0-9-]+)$/))) return existsSync(pub(`history/essays/${m[1]}.json`)) ? null : "no history file";
  if ((m = url.match(/^\/tools\/test-the-case\?case=([a-z0-9-]+)$/))) return argumentSlugs.has(m[1]) ? null : "no such case";
  return "unrecognized kind of link";
}

describe("reference indexes", () => {
  it("has a manifest that agrees with the files", () => {
    expect(manifest.scripture.split).toBe(scripture.split);
    expect(manifest.scholars.count).toBe(scholars.length);
    expect(manifest.scripture.passages).toBeGreaterThan(1000);
    expect(scholars.length).toBeGreaterThan(200);
  });

  it("lists the sixty-six books in canonical order under their Study Bible names", () => {
    expect(scripture.books.map((b) => b.slug)).toEqual(BIBLE.map((b) => b.slug));
    scripture.books.forEach((b, i) => {
      expect(b.name).toBe(BIBLE[i].name);
      expect(b.chapterCount).toBe(BIBLE[i].chapters);
    });
  });

  it("indexes only chapters that exist, with sorted, deduplicated entries", () => {
    for (const b of scripture.books) {
      const chapters = chaptersOf(b);
      let count = 0;
      for (const [ch, refs] of Object.entries(chapters)) {
        const n = Number(ch);
        expect(Number.isInteger(n) && n >= 1 && n <= b.chapterCount, `${b.name} ${ch}`).toBe(true);
        expect(refs.length).toBeGreaterThan(0);
        expect(new Set(refs.map((r) => r.url)).size, `${b.name} ${ch} duplicate pages`).toBe(refs.length);
        for (const r of refs) expect(KINDS).toContain(r.kind);
        count += refs.length;
      }
      expect(count, b.name).toBe(b.count);
    }
  });

  it("links every Scripture entry to a live page", () => {
    const dead: string[] = [];
    for (const b of scripture.books)
      for (const refs of Object.values(chaptersOf(b)))
        for (const r of refs) {
          const why = deadLink(r.url);
          if (why) dead.push(`${r.url} (${why})`);
        }
    expect([...new Set(dead)]).toEqual([]);
  });

  it("links every scholar entry to a live page, A to Z", () => {
    const dead: string[] = [];
    for (const s of scholars) {
      expect(s.name.trim()).toBe(s.name);
      expect(s.works.length, s.name).toBeGreaterThan(0);
      for (const r of [...s.works.flatMap((w) => w.citedIn), ...s.discussedIn]) {
        const why = deadLink(r.url);
        if (why) dead.push(`${r.url} (${why})`);
      }
    }
    expect([...new Set(dead)]).toEqual([]);
    const keys = scholars.map((s) => s.sortKey);
    expect(keys).toEqual([...keys].sort((a, b) => a.localeCompare(b)));
  });

  it("reads references the way a reader writes them, and skips names that are not books", () => {
    const refs = (t: string) => (extractScripture(t) as { slug: string; chapter: number; verses: string | null }[]).map((r) => `${r.slug} ${r.chapter}${r.verses ? `:${r.verses}` : ""}`);
    expect(refs("Romans 8:18–25, 28; 12:1–2")).toEqual(["romans 8:18–25", "romans 8:28", "romans 12:1–2"]);
    expect(refs("1 Cor. 13 and First Peter 2:9")).toEqual(["1-corinthians 13", "1-peter 2:9"]);
    expect(refs("Psalm 23")).toEqual(["psalms 23"]);
    expect(refs("Philemon 16")).toEqual(["philemon 1:16"]);
    expect(refs("in John 17 Jesus prays")).toEqual(["john 17"]);
    expect(refs("Mark 2 things he said")).toEqual([]);
    expect(refs("Mark said it twice")).toEqual([]);
    expect(refs("Acts 29 network")).toEqual([]);
    expect(refs("John 3:16, 2 Corinthians 5:17")).toEqual(["john 3:16", "2-corinthians 5:17"]);
  });
});

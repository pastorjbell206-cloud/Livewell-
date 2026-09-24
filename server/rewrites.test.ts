import { describe, it, expect } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
// @ts-expect-error — plain ESM script, no types.
import { parseRewrite, loadRewrites, loadAllRewrites, loadRetirements, applyToLibrary, applyToRedirects } from "../scripts/apply-rewrites.mjs";

// The rewrites James asked for (docs/rewrites/STANDARD.md). The standard's
// judgment calls (depth, fairness, voice) are read, not tested; what can be
// checked mechanically is checked here, for every file in content/rewrites/,
// along with the plumbing that makes a rewrite outrank the old text.

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const readJson = (rel: string) => JSON.parse(readFileSync(path.join(repoRoot, rel), "utf8"));

const FORBIDDEN = /\b(delve\w*|leverag\w*|unlock\w*|transformative|navigat\w*|tapestry|foster(?!\s+(care|child|parent|famil|home))\w*|unpack\w*|landscape\w*|nuanced|multifaceted|authentic\w*|journey\w*|holistic)\b/i;
const PHRASES = /in today.s world|now more than ever|here.s the thing|I want to be real with you|God.s got this|lean into|hold space|do the work|your truth|your feelings are valid|showing up|here is what I mean|let me explain/i;

describe("the rewrite plumbing", () => {
  it("parses front matter with inline and dash lists", () => {
    const r = parseRewrite('---\nslug: a\ntitle: "A: b"\nreplaces: [b, c]\nsources:\n  - "X, Y (2000)"\n  - "Z (1999)"\n---\n\nBody here.\n');
    expect(r).toMatchObject({ slug: "a", title: "A: b", replaces: ["b", "c"], sources: ["X, Y (2000)", "Z (1999)"], body: "Body here." });
  });

  it("rewrites the kept record, removes merged ones, and refuses contradictions", () => {
    const lib = [
      { slug: "a", title: "Old", body: "old", publishedAt: "2025-01-01", id: 1 },
      { slug: "b", title: "B", body: "b", id: 2 },
      { slug: "c", title: "C", body: "c", id: 3 },
    ];
    const { records, index } = applyToLibrary(lib, [{ slug: "a", title: "New", excerpt: "E", body: "one two three", replaces: ["b"] }], "2026-09-24T00:00:00.000Z");
    expect(records.map((r: any) => r.slug)).toEqual(["a", "c"]);
    expect(records[0]).toMatchObject({ slug: "a", id: 1, title: "New", body: "one two three", publishedAt: "2025-01-01", updatedAt: "2026-09-24T00:00:00.000Z" });
    expect(index).toEqual({ rewritten: ["a"], merged: { b: "a" } });
    expect(() => applyToLibrary(lib, [{ slug: "z", body: "x", replaces: [] }])).toThrow(/no library record/);
    expect(() => applyToLibrary(lib, [{ slug: "a", body: "x", replaces: ["c"] }, { slug: "b", body: "y", replaces: ["c"] }])).toThrow(/merged into both/);
  });

  it("redirects merged addresses, re-aims chains, and frees rewritten addresses", () => {
    const next = applyToRedirects(
      [
        { source: "/writing/a", destination: "/theology", permanent: true },
        { source: "/writing/old", destination: "/writing/b", permanent: true },
        { source: "/writing/b", destination: "/justice", permanent: true },
      ],
      { rewritten: ["a"], merged: { b: "a" } },
    );
    expect(next).toEqual([
      { source: "/writing/old", destination: "/writing/a", permanent: true },
      { source: "/writing/b", destination: "/writing/a", permanent: true },
    ]);
  });
});

describe("retired duplicates", () => {
  const retire = loadRetirements(repoRoot);
  const lib = readJson("content/static-library.generated.json");
  const slugs = new Set(lib.map((r: any) => r.slug));
  const redirects: any[] = readJson("vercel.json").redirects;
  for (const [from, to] of Object.entries(retire)) {
    it(`${from} is retired into ${to}`, () => {
      expect(slugs.has(from), `${from} still in the library`).toBe(false);
      expect(slugs.has(to as string), `${to} is not in the library`).toBe(true);
      expect(redirects.some((r) => r.source === `/writing/${from}` && r.destination === `/writing/${to}`)).toBe(true);
      expect(readJson("content/rewrites.generated.json").merged[from]).toBe(to);
    });
  }
});

describe("every rewrite meets the checkable parts of the standard", () => {
  const rewrites = loadRewrites(repoRoot);
  const lib = readJson("content/static-library.generated.json");
  const bySlug = new Map(lib.map((r: any) => [r.slug, r]));
  const index = readJson("content/rewrites.generated.json");
  const redirects: any[] = readJson("vercel.json").redirects;

  it("applies only reviewed rewrites", () => {
    const reviewed = new Set(rewrites.map((r: any) => r.slug));
    for (const r of loadAllRewrites(repoRoot)) {
      if (!reviewed.has(r.slug)) expect(index.rewritten, `${r.slug} is unreviewed but applied`).not.toContain(r.slug);
    }
  });

  it("the generated index matches the reviewed files, and the API carries the same copy", () => {
    expect(index.rewritten).toEqual(rewrites.map((r: any) => r.slug).sort());
    expect(readJson("api/rewrites.json")).toEqual(index);
  });

  for (const rw of rewrites) {
    describe(rw.slug, () => {
      const plain = String(rw.body);
      const wordCount = plain.split(/\s+/).filter(Boolean).length;

      it("has a search-sized title, a deck, a description and named sources", () => {
        expect(rw.title?.length, "title").toBeGreaterThan(10);
        expect(rw.title.length, "title over 65 characters").toBeLessThanOrEqual(65);
        expect(rw.excerpt?.length, "deck").toBeGreaterThan(40);
        expect(rw.metaDescription?.length, "description length").toBeGreaterThanOrEqual(110);
        expect(rw.metaDescription.length, "description length").toBeLessThanOrEqual(155);
        expect(Array.isArray(rw.sources) && rw.sources.length, "at least five named sources").toBeGreaterThanOrEqual(5);
      });

      it("is long enough to develop the argument, in sections", () => {
        expect(wordCount).toBeGreaterThanOrEqual(2800);
        expect(wordCount).toBeLessThanOrEqual(5200);
        // Sections are h2 (`##`): the page title is the h1, and a jump to h3
        // fails axe's heading-order rule (CI's quality job audits an essay).
        expect((plain.match(/^##\s/gm) || []).length).toBeGreaterThanOrEqual(3);
        expect(plain, "sections must be ## (h2), not ###").not.toMatch(/^###\s/m);
      });

      it("keeps the mechanics: no em-dash, no forbidden language, exclamations only inside quotations", () => {
        const all = `${rw.title}\n${rw.excerpt}\n${rw.metaDescription}\n${plain}`;
        // The em-dash is banned; an en-dash is right in a verse range (5:21–33) but not as a clause dash.
        expect(all).not.toMatch(/—/);
        expect(all).not.toMatch(/\s–\s/);
        // Proper names are not prose: Pew's Religious Landscape Study keeps its name.
        expect(all.replace(/Religious Landscape Study/g, "")).not.toMatch(FORBIDDEN);
        // Phrases are checked outside quotations: Revelation 2:5 (ESV) says "do the works".
        const outsideQuotes = all.replace(/"[^"]*"|“[^”]*”/g, "");
        expect(outsideQuotes).not.toMatch(PHRASES);
        expect(outsideQuotes).not.toMatch(/!/);
      });

      it("claims no ministry tenure but the true one", () => {
        expect(plain).not.toMatch(/\b(fifteen|twenty|ten|eleven|thirteen|fourteen|\d+)\s+years\s+(as\s+(a\s+)?pastor|of\s+(pastoral\s+)?ministry|at\s+(First\s+Baptist|Fenton))/i);
      });

      it("is applied: the library carries it, merged addresses redirect to it, and its own address resolves", () => {
        const rec: any = bySlug.get(rw.slug);
        expect(rec, "library record").toBeTruthy();
        expect(rec.body).toBe(rw.body);
        expect(rec.title).toBe(rw.title);
        for (const from of rw.replaces) {
          expect(bySlug.has(from), `${from} still in the library`).toBe(false);
          expect(redirects.some((r) => r.source === `/writing/${from}` && r.destination === `/writing/${rw.slug}`), `${from} redirect`).toBe(true);
        }
        expect(redirects.some((r) => r.source === `/writing/${rw.slug}`), "the rewritten essay's own address redirects away").toBe(false);
      });

      it("reaches the public essay file when one has been built", () => {
        const file = path.join(repoRoot, `client/public/essays/${rw.slug}.json`);
        if (!existsSync(file)) return;
        const pub = JSON.parse(readFileSync(file, "utf8"));
        expect(pub.title).toBe(rw.title);
        expect(pub.metaDescription).toBe(rw.metaDescription);
      });
    });
  }
});
